---
layout: doc
translation_key: docs
category: "Internals"
---

# Pipeline de Compilation BDFD : Lexer → Parser → AST

Ce document décrit en détail l'architecture de la chaîne de compilation du langage BDFD (Bot Designer For Discord). Le pipeline transforme une chaîne source en un arbre syntaxique abstrait (AST) prêt à être interprété par le transpileur.

```
┌──────────────────────────────────────────────────────────────────┐
│                     PIPELINE COMPLET                             │
│                                                                  │
│  Source BDFD                                                     │
│     │                                                            │
│     ▼                                                            │
│  ┌──────────┐    ┌──────────┐    ┌───────────┐    ┌───────────┐ │
│  │  LEXER   │───▶│  TOKENS  │───▶│  PARSER   │───▶│    AST    │ │
│  │ 437 loc  │    │  (liste) │    │  189 loc  │    │  40 loc   │ │
│  └──────────┘    └──────────┘    └───────────┘    └───────────┘ │
│       │                                               │          │
│       ▼                                               ▼          │
│  Diagnostics                                     Diagnostics     │
│  (crochets non fermés,                     (erreurs syntaxiques) │
│   tokens inattendus)                                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## 1. Le Lexer (`bdfd_lexer.dart` — 437 lignes)

Le lexer est la première étape de la compilation. Il prend une chaîne de caractères brute et produit un flux de tokens. Cette étape est **pure** : elle ne connaît pas la grammaire ni la sémantique du langage, elle se contente de reconnaître des motifs lexicaux.

### 1.1 API Publique

```dart
// Point d'entrée : méthode statique tokenize()
BdfdLexerResult tokenize(String source) {
  final scanner = _BdfdScanner(source);
  return scanner.scan();
}
```

Le `BdfdLexerResult` encapsule :
- `tokens` : `List<BdfdToken>` (immuable après construction)
- `diagnostics` : `List<BdfdLexerDiagnostic>` (avertissements et erreurs lexicales)
- `hasErrors` : booléen pratique pour vérifier l'absence d'erreurs

### 1.2 Les Types de Tokens

```
┌──────────────────────────────────────────────────────────────────┐
│                    BDFD TOKEN TYPES                              │
│                                                                  │
│  Token             Déclencheur          Exemple                  │
│  ───────────────── ──────────────────── ──────────────────────── │
│  text              Texte brut          "Hello "                  │
│  function          $ suivi d'une       $sendMessage              │
│                    lettre ou underscore                           │
│  openBracket       [ après une         [                         │
│                    fonction (contextuel)                          │
│  closeBracket      ] avec stack        ]                         │
│                    de brackets non vide                           │
│  semicolon         ; dans un bloc      ;                         │
│                    de fonction                                    │
│  eof               Fin du flux         <fin>                     │
└──────────────────────────────────────────────────────────────────┘
```

Chaque token (`BdfdToken`) porte des métadonnées de positionnement :

```dart
class BdfdToken {
  final BdfdTokenType type;   // type du token
  final String lexeme;         // texte source exact
  final int start;             // offset début dans la source
  final int end;               // offset fin dans la source
  final int line;              // numéro de ligne (1-based)
  final int column;            // colonne de début (1-based)
}
```

### 1.3 Le Scanner Interne (`_BdfdScanner`)

Le scanner parcourt la source **caractère par caractère**. Contrairement à une approche par expressions régulières, ce scanner impératif garde un contrôle total sur le contexte.

```
┌──────────────────────────────────────────────────────────┐
│              DIAGRAMME DE FLUX DU SCANNER                │
│                                                          │
│  Début                                                   │
│   │                                                      │
│   ▼                                                      │
│  ┌────────────┐  oui  ┌───────────────────┐             │
│  │ Échappement │─────▶│ Avancer 2 car.    │──▶ suite   │
│  │ \$, \[, etc │       │ (le \ est ignoré) │             │
│  └────────────┘       └───────────────────┘             │
│   │ non                                                  │
│   ▼                                                      │
│  ┌────────────┐  oui  ┌───────────────────┐             │
│  │ $ + lettre ?│─────▶│ _scanFunction()   │──▶ suite   │
│  └────────────┘       │ ➜ token function   │             │
│   │ non               └───────────────────┘             │
│   ▼                                                      │
│  ┌────────────┐  oui  ┌───────────────────┐             │
│  │ [ ouvert ? │─────▶│ _scanOpenBracket()│──▶ suite   │
│  └────────────┘       │ (si contexte ok)   │             │
│   │ non               └───────────────────┘             │
│   ▼                                                      │
│  ┌────────────┐  oui  ┌───────────────────┐             │
│  │ ] fermé ?  │─────▶│_scanCloseBracket()│──▶ suite   │
│  └────────────┘       │ (si bracket stack) │             │
│   │ non               └───────────────────┘             │
│   ▼                                                      │
│  ┌────────────┐  oui  ┌───────────────────┐             │
│  │ ; avec     │─────▶│ _scanSemicolon()  │──▶ suite   │
│  │ bracket ?  │       └───────────────────┘             │
│  └────────────┘                                         │
│   │ non                                                  │
│   ▼                                                      │
│  ┌────────────────────────┐                              │
│  │ _scanText()             │                              │
│  │ Accumule jusqu'au       │                              │
│  │ prochain $, ], ; ou fin │                              │
│  └────────────────────────┘                              │
│   │                                                      │
│   ▼                                                      │
│  EOF atteint → Ajouter token eof + diagnostics           │
│  brackets non fermés                                     │
└──────────────────────────────────────────────────────────┘
```

**Gestion des crochets balancés :** Le scanner maintient une pile `_bdfdBracketStack` qui lui permet de distinguer les crochets fonctionnels `]$` `]$` des crochets littéraux (comme dans les liens Markdown `[texte](url)` ou les tableaux JSON `[1,2,3]`). Cette pile de cadres (`_BdfdBracketFrame`) suit également un compteur `literalBracketDepth` pour les crochets imbriqués à l'intérieur d'un argument de fonction.

```dart
class _BdfdBracketFrame {
  final String functionLexeme;
  final int start;
  final int end;
  final int line;
  final int column;
  int literalBracketDepth = 0;  // brackets littéraux dans l'argument
}
```

**Reconnaissance de fonctions — recherche du plus long préfixe (longest match) :**

```dart
// Après avoir extrait l'identifiant complet ($sendMessage),
// on cherche la plus longue correspondance dans allBdfdFunctions :
String? match;
for (var i = normalized.length; i > 0; i--) {
  if (allBdfdFunctions.contains(normalized.substring(0, i))) {
    match = fullId.substring(0, i);
    break;
  }
}
// Si match trouvé : backtrack des caractères en trop
// Sinon : si identifiant non vide, tokeniser quand même comme fonction
//         (pour supporter $i, $j, variables dynamiques)
// Sinon : le $ est traité comme texte littéral
```

### 1.4 Exemples de Tokenisation

```
┌──────────────────────────────────────────────────────────────────────────┐
│  EXEMPLE 1 : Fonction simple                                             │
│                                                                          │
│  Source:  $sendMessage[Hello]                                            │
│                                                                          │
│  Tokens produits:                                                        │
│  [0] function     "$sendMessage"  (start:0, end:12)                     │
│  [1] openBracket  "["             (start:12, end:13)                    │
│  [2] text         "Hello"         (start:13, end:18)                    │
│  [3] closeBracket "]"             (start:18, end:19)                    │
│  [4] eof          ""              (start:19, end:19)                    │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  EXEMPLE 2 : Texte + Fonction + Texte                                    │
│                                                                          │
│  Source:  Hello $sendMessage[World]                                      │
│                                                                          │
│  Tokens produits:                                                        │
│  [0] text         "Hello "       (start:0, end:6)                       │
│  [1] function     "$sendMessage" (start:6, end:18)                      │
│  [2] openBracket  "["            (start:18, end:19)                     │
│  [3] text         "World"        (start:19, end:24)                     │
│  [4] closeBracket "]"            (start:24, end:25)                     │
│  [5] eof          ""             (start:25, end:25)                     │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  EXEMPLE 3 : Arguments séparés par point-virgule                         │
│                                                                          │
│  Source:  $addField[name;value]                                          │
│                                                                          │
│  Tokens produits:                                                        │
│  [0] function     "$addField"    (start:0, end:9)                       │
│  [1] openBracket  "["            (start:9, end:10)                      │
│  [2] text         "name"         (start:10, end:14)                     │
│  [3] semicolon    ";"            (start:14, end:15)                     │
│  [4] text         "value"        (start:15, end:20)                     │
│  [5] closeBracket "]"            (start:20, end:21)                     │
│  [6] eof          ""             (start:21, end:21)                     │
└──────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────┐
│  EXEMPLE 4 : Nesting — fonction dans fonction                             │
│                                                                          │
│  Source:  $sendMessage[$getUserVar[name]]                                │
│                                                                          │
│  Tokens produits:                                                        │
│  [0] function     "$sendMessage"   (start:0, end:12)                    │
│  [1] openBracket  "["              (start:12, end:13)                   │
│  [2] function     "$getUserVar"    (start:13, end:25)                   │
│  [3] openBracket  "["              (start:25, end:26)                   │
│  [4] text         "name"           (start:26, end:30)                   │
│  [5] closeBracket "]"              (start:30, end:31)                   │
│  [6] closeBracket "]"              (start:31, end:32)                   │
│  [7] eof          ""               (start:32, end:32)                   │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Le Parser (`bdfd_parser.dart` — 189 lignes)

Le parser consomme la liste de tokens produite par le lexer et construit l'arbre syntaxique abstrait (AST). Il implémente un parseur **récursif descendant** avec une technique de descente récursive simple.

### 2.1 API Publique

```dart
class BdfdParser {
  BdfdParserResult parseTokens(List<BdfdToken> tokens) {
    final parser = _BdfdTokenParser(tokens);
    return parser.parse();
  }
}
```

Le `BdfdParserResult` contient :
- `ast` : `BdfdScriptAst` — le nœud racine de l'AST
- `diagnostics` : `List<BdfdParserDiagnostic>` — erreurs de parsing
- `hasErrors` : booléen

### 2.2 Le Parseur Interne (`_BdfdTokenParser`)

Le parseur maintient un index dans la liste de tokens et applique des règles récursives pour construire l'AST.

```
┌──────────────────────────────────────────────────────────────────┐
│              ALGORITHME DE PARSING RÉCURSIF DESCENDANT           │
│                                                                  │
│  parse()                                                        │
│   │                                                              │
│   └─▶ _parseNodesUntil({eof})                                   │
│        │                                                         │
│        └─▶ Boucle : tant que pas EOF et pas terminateur          │
│             │                                                    │
│             └─▶ _parseNode()                                     │
│                  │                                               │
│                  ├─ text ──────▶ BdfdTextAst(token.lexeme)      │
│                  │                                               │
│                  ├─ function ──▶ _parseFunctionCall(token)       │
│                  │               │                               │
│                  │               ├─ Si [ suit :                  │
│                  │               │   │                           │
│                  │               │   └─ Boucle jusqu'à ] :       │
│                  │               │       ├─ ; → nouvel argument   │
│                  │               │       └─ _parseNode() →       │
│                  │               │           dans l'argument     │
│                  │               │                               │
│                  │               └─ Retour :                     │
│                  │                   BdfdFunctionCallAst(        │
│                  │                     name, [arg1, arg2, ...])  │
│                  │                                               │
│                  └─ autre ─────▶ BdfdTextAst (fallback)          │
│                                                                  │
│  L'APPEL RÉCURSIF À _parseNode() PERMET LE NESTING ILLIMITÉ      │
└──────────────────────────────────────────────────────────────────┘
```

**Points clés :**
- Le parseur n'a pas de grammaire formelle complexe — le BDFD est un langage de macros relativement simple
- La récursion est gérée naturellement : quand on rencontre une fonction pendant le parsing des arguments d'une autre fonction, on appelle récursivement `_parseNode()`
- Les tokens inattendus (crochet isolé, point-virgule hors contexte) sont convertis en texte littéral avec un diagnostic

```dart
bool _match(BdfdTokenType type) {
  if (!_check(type)) return false;
  _advance();
  return true;
}

// Utilisé pour avancer dans le flux de tokens
BdfdToken _advance() {
  if (!_isAtEnd) _index += 1;
  return tokens[_index - 1];
}
```

### 2.3 Gestion des Terminateurs

La méthode `_parseNodesUntil(terminators)` est la pierre angulaire du parsing par blocs :

```dart
List<BdfdAstNode> _parseNodesUntil(Set<BdfdTokenType> terminators) {
  final nodes = <BdfdAstNode>[];
  while (!_isAtEnd && !terminators.contains(_current.type)) {
    final node = _parseNode();
    if (node != null) {
      nodes.add(node);
      continue;
    }
    // Token inattendu → diagnostic + avancement
    final token = _advance();
    _diagnostics.add(BdfdParserDiagnostic(
      message: 'Unexpected token ${token.type.name} while parsing script.',
      start: token.start, end: token.end,
      line: token.line, column: token.column,
    ));
  }
  return nodes;
}
```

Cette méthode est également utilisée par les blocs structurels (`$if...$endif`, `$for...$endfor`, `$loop...$endloop`) via le transpileur.

### 2.4 Exemple de Parsing

```
┌──────────────────────────────────────────────────────────────────────┐
│  EXEMPLE : "$sendMessage[Hello $getUserName[$authorID]]"            │
│                                                                      │
│  Étape 1 — Tokens reçus du Lexer :                                  │
│  [function:$sendMessage, openBracket, text:"Hello ",                │
│   function:$getUserName, openBracket, function:$authorID,           │
│   closeBracket, closeBracket, eof]                                   │
│                                                                      │
│  Étape 2 — Arbre de parsing :                                        │
│                                                                      │
│  BdfdScriptAst                                                       │
│   └─ BdfdFunctionCallAst                                             │
│       name: "$sendMessage"                                           │
│       arguments:                                                     │
│        ┌─ [0]: [                                                    │
│        │      BdfdTextAst("Hello ")                                  │
│        │      BdfdFunctionCallAst                                    │
│        │       name: "$getUserName"                                  │
│        │       arguments:                                            │
│        │        └─ [0]: [BdfdFunctionCallAst                         │
│        │                  name:"$authorID"                           │
│        │                  arguments: []]                             │
│        │     ]                                                       │
│        └─                                                           │
│                                                                      │
│  Étape 3 — Transpilation (résultat final) :                          │
│  Action(type:"sendMessage", payload:{                                │
│    content: "Hello " + getUserName(authorID)                         │
│  })                                                                  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. L'AST (`bdfd_ast.dart` — 40 lignes)

L'AST est volontairement minimal. Il définit trois nœuds principaux qui capturent toute la structure du langage BDFD.

### 3.1 Hiérarchie des Nœuds

```
BdfdAstNode (abstract)                     ← classe de base
├── BdfdTextAst                            ← texte brut
│   └── value: String
└── BdfdFunctionCallAst                    ← appel de fonction
    ├── name: String                        ← nom complet avec $
    ├── normalizedName: String              ← nom normalisé (getter)
    └── arguments: List<List<BdfdAstNode>>  ← liste d'arguments
                                              Chaque argument = liste de nœuds
```

```dart
// Nœud de base avec positionnement optionnel
abstract class BdfdAstNode {
  const BdfdAstNode({this.start, this.end});
  final int? start;
  final int? end;
}

// Conteneur racine
class BdfdScriptAst {
  const BdfdScriptAst({required this.nodes});
  final List<BdfdAstNode> nodes;
}

// Texte brut
class BdfdTextAst extends BdfdAstNode {
  const BdfdTextAst(this.value, {super.start, super.end});
  final String value;
}

// Appel de fonction avec arguments multi-dimensionnels
class BdfdFunctionCallAst extends BdfdAstNode {
  const BdfdFunctionCallAst({
    required this.name,
    this.arguments = const <List<BdfdAstNode>>[],
    super.start, super.end,
  });
  final String name;                              // ex: "$sendMessage"
  final List<List<BdfdAstNode>> arguments;        // ex: [[BdfdTextAst("Hello")]]
  String get normalizedName => normalizeBdfdFunctionName(name);
}
```

### 3.2 Normalisation des Noms de Fonction

La fonction `normalizeBdfdFunctionName()` est cruciale car les noms de fonction BDFD sont **case-insensitive** et commencent par `$` :

```dart
String normalizeBdfdFunctionName(String name) {
  final trimmed = name.trim();
  if (trimmed.startsWith(r'$')) {
    return trimmed.substring(1).toLowerCase();  // "SendMessage" → "sendmessage"
  }
  return trimmed.toLowerCase();
}
```

Cette normalisation est appliquée partout où un nom de fonction est référencé : lookup dans le registre, comparaison de noms, etc.

### 3.3 Structure des Arguments

Les arguments sont de type `List<List<BdfdAstNode>>` — une liste à deux dimensions :

```
┌──────────────────────────────────────────────────────────────┐
│  STRUCTURE DES ARGUMENTS                                     │
│                                                              │
│  $addField[nom;valeur]                                       │
│  ─────────────────────                                       │
│  arguments = [                                               │
│    [BdfdTextAst("nom")],      ← argument 0                  │
│    [BdfdTextAst("valeur")],   ← argument 1                  │
│  ]                                                           │
│                                                              │
│  $if[$getUserVar[x]==5]                                      │
│  ─────────────────────                                       │
│  arguments = [                                               │
│    [                                                         │
│      BdfdFunctionCallAst("$getUserVar", [[BdfdTextAst("x")]]),│
│      BdfdTextAst("=="),                                     │
│      BdfdTextAst("5"),                                      │
│    ]                                                         │
│  ]                                                           │
│                                                              │
│  Cette double imbrication permet de représenter à la fois    │
│  la séparation par ; et le contenu de chaque argument qui    │
│  peut lui-même contenir plusieurs nœuds (texte + fonctions).  │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Pipeline Complet — Traçabilité

Voici le cheminement complet d'une source BDFD à travers les trois étapes :

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ENTRÉE: "Bonjour $sendMessage[$getServerVar[welcome];true;épingle;3s]"  │
│                                                                          │
│  ═══════════════ ÉTAPE 1 : LEXER ═══════════════                        │
│                                                                          │
│  Tokens produits (10 tokens) :                                           │
│  [0] text        "Bonjour "        (0→9)                                │
│  [1] function    "$sendMessage"    (9→21)                                │
│  [2] openBracket "["               (21→22)                               │
│  [3] function    "$getServerVar"   (22→36)                               │
│  [4] openBracket "["               (36→37)                               │
│  [5] text        "welcome"         (37→44)                               │
│  [6] closeBracket "]"              (44→45)                               │
│  [7] semicolon   ";"               (45→46)                               │
│  [8] text        "true;épingle;3s" (46→60)                               │
│  [9] closeBracket "]"              (60→61)                               │
│  [10] eof         ""               (61→61)                               │
│                                                                          │
│  ═══════════════ ÉTAPE 2 : PARSER ═══════════════                       │
│                                                                          │
│  AST produit :                                                           │
│  BdfdScriptAst                                                           │
│   ├─ BdfdTextAst("Bonjour ")                                            │
│   └─ BdfdFunctionCallAst                                                 │
│       name: "$sendMessage"                                               │
│       arguments:                                                         │
│        ├─ [0]: [BdfdFunctionCallAst                                      │
│        │        name:"$getServerVar"                                     │
│        │        arguments:[[BdfdTextAst("welcome")]]]                    │
│        ├─ [1]: [BdfdTextAst("true")]                                     │
│        ├─ [2]: [BdfdTextAst("épingle")]                                  │
│        └─ [3]: [BdfdTextAst("3s")]                                       │
│                                                                          │
│  ═══════════ ÉTAPE 3 : TRANSPILER (hors scope de ce doc) ═══════════════ │
│                                                                          │
│  Actions générées :                                                      │
│  [                                                                       │
│    Action(type:"text",      payload:{content:"Bonjour "}),              │
│    Action(type:"sendMessage", payload:{                                  │
│      content: getServerVar("welcome"),                                   │
│      tts: true,                                                          │
│      reply: true,                                                        │
│      deleteAfter: Duration(seconds: 3)                                   │
│    })                                                                    │
│  ]                                                                       │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Gestion des Erreurs

Chaque étape du pipeline produit ses propres diagnostics, qui sont propagés pour affichage à l'utilisateur.

```
┌──────────────────────────────────────────────────────┐
│  DIAGNOSTICS LEXER                                   │
│                                                      │
│  • Crochet non fermé :                               │
│    "$sendMessage[hello"                               │
│    → "Unclosed bracket for function $sendMessage."   │
│                                                      │
│  • Crochets balancés :                               │
│    Le compteur literalBracketDepth permet de          │
│    distinguer [littéral] de [fonctionnel]            │
│                                                      │
├──────────────────────────────────────────────────────┤
│  DIAGNOSTICS PARSER                                  │
│                                                      │
│  • Token inattendu dans la racine :                  │
│    "Unexpected token closeBracket while parsing      │
│     script."                                         │
│                                                      │
│  • Token inattendu dans les arguments :              │
│    "Unexpected token openBracket inside arguments    │
│     for $sendMessage."                               │
│                                                      │
│  • Crochet fermant manquant :                        │
│    "Expected closing bracket for $sendMessage."      │
└──────────────────────────────────────────────────────┘
```

---

## 6. Architecture des Fichiers

```
┌────────────────────────────────────────────────────────────────┐
│  FICHIERS DU PIPELINE BDFD                                     │
│                                                                │
│  packages/shared/lib/utils/                                    │
│  │                                                             │
│  ├── bdfd_lexer.dart      (437 lignes)                         │
│  │   ├── enum BdfdTokenType                                    │
│  │   ├── class BdfdToken                                       │
│  │   ├── class BdfdLexerDiagnostic                             │
│  │   ├── class BdfdLexerResult                                 │
│  │   ├── class BdfdLexer          ← point d'entrée             │
│  │   ├── class _BdfdScanner       ← moteur de scanning         │
│  │   └── class _BdfdBracketFrame  ← pile de brackets           │
│  │                                                             │
│  ├── bdfd_parser.dart      (189 lignes)                        │
│  │   ├── class BdfdParserDiagnostic                            │
│  │   ├── class BdfdParserResult                                │
│  │   ├── class BdfdParser          ← point d'entrée            │
│  │   └── class _BdfdTokenParser    ← moteur de parsing         │
│  │                                                             │
│  └── bdfd_ast.dart          (40 lignes)                        │
│      ├── abstract class BdfdAstNode                            │
│      ├── class BdfdScriptAst                                   │
│      ├── class BdfdTextAst                                     │
│      ├── class BdfdFunctionCallAst                             │
│      └── String normalizeBdfdFunctionName()                    │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 7. Conventions et Détails d'Implémentation

**Immutabilité :** Tous les résultats (tokens, AST) sont rendus immuables via `List.unmodifiable()` après construction. Cela garantit que le pipeline est fonctionnel et sans effets de bord.

**Pas de références cycliques :** L'AST est un arbre pur, sans références aux parents. Chaque nœud ne connaît que ses enfants.

**Séparation des responsabilités :**
- Le Lexer gère la reconnaissance de motifs (pattern matching)
- Le Parser gère la structure (grammaire)
- Le Transpiler (hors scope) gère la sémantique et la génération de code

**Performance :** Le pipeline complet (Lexer + Parser) parcourt la source exactement une fois par caractère (lexer) puis une fois par token (parser), soit O(n) où n est la taille de la source.
