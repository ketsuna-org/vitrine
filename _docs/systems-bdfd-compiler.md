---
layout: doc
title: "Système — BDFD Compiler"
translation_key: docs
category: systems
description: >
  Documentation du pipeline de compilation BDFD complet : Lexer → Parser → Transpiler.
  Couvre le cache de compilation, l'agrégation des diagnostics, l'injection du profil
  de debug et les helpers de calcul ligne/colonne.
---

# Système — BDFD Compiler

Le **BdfdCompiler** est le pipeline central de compilation BDFD, orchestrant la transformation d'un code source BDFD brut en une liste d'actions exécutables. Il est implémenté dans `packages/shared/lib/utils/bdfd_compiler.dart` (180 lignes).

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE COMPILATION BDFD                   │
│                                                                   │
│  1. Vérification du cache                                         │
│  2. Lexer  : BdfdLexer().tokenize(source)      → lexerResult      │
│  3. Parser : BdfdParser().parseTokens(tokens)   → parserResult     │
│  4. Transpiler : BdfdAstTranspiler().transpile(ast) → transpileResult │
│  5. Injection debugProfile (compilationMs, sourceLength, ...)      │
│  6. Agrégation des diagnostics (3 phases → unifiés)               │
│  7. Stockage dans le cache (version lightweight)                  │
│  8. Retour du BdfdCompileResult                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Types de diagnostics

### `BdfdCompileDiagnosticSeverity` (enum)

Sévérité d'un diagnostic. Deux valeurs possibles :

| Valeur    | Description                               |
|-----------|-------------------------------------------|
| `warning` | Avertissement, n'empêche pas l'exécution  |
| `error`   | Erreur bloquante                          |

### `BdfdCompileDiagnosticStage` (enum)

Phase du pipeline ayant produit le diagnostic :

| Valeur      | Phase concernée                       |
|-------------|---------------------------------------|
| `lexer`     | Analyse lexicale (tokenisation)       |
| `parser`    | Analyse syntaxique (construction AST) |
| `transpiler`| Transpilation (AST → Actions)         |

### `BdfdCompileDiagnostic` (class)

Représente un diagnostic produit durant la compilation. Unifie les diagnostics de toutes les phases du pipeline.

| Champ         | Type                                | Description                                           |
|---------------|-------------------------------------|-------------------------------------------------------|
| `message`     | `String`                            | Message descriptif de l'erreur ou avertissement       |
| `severity`    | `BdfdCompileDiagnosticSeverity`     | Niveau de sévérité (`warning` ou `error`)             |
| `stage`       | `BdfdCompileDiagnosticStage`        | Phase du pipeline (`lexer`, `parser`, `transpiler`)   |
| `start`       | `int?`                              | Offset de début dans le source (optionnel)            |
| `end`         | `int?`                              | Offset de fin dans le source (optionnel)              |
| `line`        | `int?`                              | Numéro de ligne (optionnel)                           |
| `column`      | `int?`                              | Numéro de colonne (optionnel)                         |
| `functionName`| `String?`                           | Nom de la fonction concernée (optionnel, transpiler)  |

---

## BdfdCompileResult

Le résultat complet d'une compilation, contenant les résultats intermédiaires et le produit final.

| Champ            | Type                             | Description                                     |
|------------------|----------------------------------|-------------------------------------------------|
| `source`         | `String`                         | Code source original compilé                    |
| `lexerResult`    | `BdfdLexerResult?`               | Résultat de la phase de tokenisation            |
| `parserResult`   | `BdfdParserResult?`              | Résultat de la phase de parsing                 |
| `transpileResult`| `BdfdTranspileResult?`           | Résultat de la phase de transpilation           |
| `ast`            | `BdfdScriptAst?`                  | AST produit par le parser                       |
| `actions`        | `List<Action>`                   | Liste des actions exécutables (immuable)        |
| `diagnostics`    | `List<BdfdCompileDiagnostic>`    | Liste unifiée des diagnostics (immuable)        |

### `hasErrors`

Getter qui vérifie si au moins un diagnostic de sévérité `error` est présent :

```dart
bool get hasErrors => diagnostics.any(
  (diagnostic) => diagnostic.severity == BdfdCompileDiagnosticSeverity.error,
);
```

### `toLightweight()`

Produit une version allégée du résultat pour le cache, en supprimant les résultats intermédiaires (`lexerResult`, `parserResult`, `transpileResult`, `ast`). Seules les `actions` et les `diagnostics` sont conservées :

```dart
BdfdCompileResult toLightweight() {
  return BdfdCompileResult(
    source: source,
    lexerResult: null,
    parserResult: null,
    transpileResult: null,
    ast: null,
    actions: actions,
    diagnostics: diagnostics,
  );
}
```

---

## BdfdCompiler (class)

Orchestrateur principal du pipeline de compilation.

### Cache statique

```dart
static final Map<String, BdfdCompileResult> _cache = {};
```

Le cache est une `Map` statique indexée par la chaîne source. Deux comportements :

- **Limite** : maximum 500 entrées. Si le cache dépasse cette limite, il est entièrement vidé (`_cache.clear()`) avant l'insertion suivante.
- **Version lightweight** : les entrées stockées sont des versions allégées (`toLightweight()`) pour économiser la mémoire.
- **`clearCache()`** : méthode statique pour vider manuellement le cache.

### `compile(String source)` → `BdfdCompileResult`

Algorithme complet :

1. **Cache hit** : si `source` est déjà dans le cache, retourne le résultat mis en cache immédiatement.

2. **Stopwatch** : démarre un chronomètre pour mesurer le temps total de compilation.

3. **Pipeline** :
   - **Lexer** : `BdfdLexer().tokenize(source)` produit `lexerResult`
   - **Parser** : `BdfdParser().parseTokens(lexerResult.tokens)` produit `parserResult`
   - **Transpiler** : `BdfdAstTranspiler().transpile(parserResult.ast)` produit `transpileResult`

4. **Injection debugProfile** : parcourt les actions transpilées. Si une action de type `BotCreatorActionType.debugProfile` est trouvée, injecte dans son `payload` :
   - `compilationMs` ← temps écoulé en millisecondes
   - `sourceLength` ← longueur du code source
   - `actionCount` ← nombre total d'actions produites
   
   Seule la **première** action `debugProfile` est enrichie (`break` après injection).

5. **Agrégation des diagnostics** : les diagnostics des trois phases sont unifiés en une liste de `BdfdCompileDiagnostic` :
   - **Lexer** : sévérité forcée à `error`, `line` et `column` proviennent directement du diagnostic du lexer
   - **Parser** : sévérité forcée à `error`, `line` et `column` proviennent directement du diagnostic du parser
   - **Transpiler** : la sévérité est mappée : `BdfdTranspileDiagnosticSeverity.warning` → `BdfdCompileDiagnosticSeverity.warning`, sinon `error`. `line` et `column` sont **calculées** à partir de l'offset via `_lineForOffset` et `_columnForOffset`. Le `functionName` est également propagé.

6. **Construction du résultat** : les listes `actions` et `diagnostics` sont rendues immuables via `List.unmodifiable(...)`.

7. **Mise en cache** : si le cache dépasse 500 entrées, il est vidé. Le résultat est stocké en version `toLightweight()`.

8. **Retour** : le `BdfdCompileResult` complet (avec résultats intermédiaires) est retourné.

---

## Helpers de calcul ligne/colonne

### `_lineForOffset(String source, int? offset)` → `int?`

Calcule le numéro de ligne (1-based) correspondant à un offset dans le source. Parcourt le source caractère par caractère jusqu'à l'offset en comptant les sauts de ligne (`\n`).

Retourne `null` si l'offset est `null`, négatif ou dépasse la longueur du source.

### `_columnForOffset(String source, int? offset)` → `int?`

Calcule le numéro de colonne (1-based) correspondant à un offset dans le source. Parcourt le source jusqu'à l'offset : chaque `\n` réinitialise la colonne à 1, les autres caractères incrémentent.

Retourne `null` si l'offset est `null`, négatif ou dépasse la longueur du source.

---

## Flux complet

```
source: "$sendMessage[Hello]"
  │
  ├─ Cache ? Oui → retour immédiat
  │
  ├─ BdfdLexer().tokenize(source)
  │  └─ lexerResult.tokens: [function($sendMessage), openBracket([), text(Hello), closeBracket(])]
  │
  ├─ BdfdParser().parseTokens(tokens)
  │  └─ parserResult.ast: BdfdScriptAst{ statements: [...] }
  │
  ├─ BdfdAstTranspiler().transpile(ast)
  │  └─ transpileResult.actions: [Action{ type: sendMessage, ... }]
  │
  ├─ Injection debugProfile (si présente)
  │
  ├─ Agrégation diagnostics (lexer + parser + transpiler)
  │
  ├─ Stockage cache (lightweight, max 500)
  │
  └─ BdfdCompileResult{ source, actions, diagnostics, ... }
```
