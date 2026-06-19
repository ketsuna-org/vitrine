---
layout: doc
title: "Architecture — Le Transpiler BDFD"
translation_key: docs
category: "Architecture"
description: >
  Documentation détaillée du transpiler BDFD. Décrit les trois phases de compilation
  (lexer, parser, transpiler), l'architecture en part files, les modes d'évaluation
  compile-time vs runtime, et le système de placeholders.
---

# Architecture — Le Transpiler BDFD

Le transpiler est le composant qui transforme un script source écrit en langage BDFD (Bot Designer For Discord) en une liste d'objets `Action` exécutables par le moteur de runtime.

## Vue d'ensemble

```
┌───────────────────────────────────────────────────────────────────┐
│                    CHAÎNE DE COMPILATION BDFD                       │
│                                                                     │
│  "$sendMessage[Hello $username]"                                    │
│         │                                                           │
│         ▼                                                           │
│  ┌─────────────┐     ┌─────────────┐     ┌────────────────────┐    │
│  │   LEXER      │────▶│   PARSER     │────▶│   TRANSPILER        │   │
│  │              │     │              │     │                      │   │
│  │ Source text  │     │ Tokens       │     │ AST                 │   │
│  │ → Tokens     │     │ → AST        │     │ → List<Action>      │   │
│  │              │     │              │     │ → BdfdTranspileResult│   │
│  └─────────────┘     └─────────────┘     └────────────────────┘    │
│                                                                     │
│  Fichiers:         Fichiers:            Fichiers (part system):     │
│  bdfd_lexer.dart   bdfd_parser.dart     bdfd_ast_transpiler.dart   │
│                     bdfd_ast.dart        core.dart                  │
│                                          dispatch.dart              │
│                                          inline_runtime.dart        │
│                                          runtime_builders.dart      │
│                                          action_builders.dart       │
│                                          inline_helpers.dart        │
│                                          models.dart                │
│                                          control_flow.dart          │
│                                          image_canvas.dart          │
└───────────────────────────────────────────────────────────────────┘
```

---

## Phase 1 : Lexer (`bdfd_lexer.dart`)

Le lexer prend le code source BDFD brut (une chaîne de caractères) et le découpe en tokens.

### Types de tokens

| Token | Regex / Pattern | Exemple |
|-------|----------------|---------|
| `FUNCTION_CALL` | `$nomFonction[` | `$sendMessage[` |
| `ARGUMENT_START` | `[` | Début des arguments |
| `ARGUMENT_SEPARATOR` | `;` | Séparateur d'arguments |
| `ARGUMENT_END` | `]` | Fin des arguments |
| `RAW_TEXT` | Texte hors tokens | `Hello ` |
| `VARIABLE_REF` | `$varName` (sans crochets) | `$username` |

### Processus

```
Source: "$sendMessage[Hello $username]"

Tokens:
  FUNCTION_CALL("sendMessage")
  ARGUMENT_START
  RAW_TEXT("Hello ")
  VARIABLE_REF("username")
  ARGUMENT_END
  EOF
```

Le lexer gère également les échappements (`\$`, `\[`, `\]`) et le nesting de crochets pour les fonctions imbriquées.

---

## Phase 2 : Parser (`bdfd_parser.dart` + `bdfd_ast.dart`)

Le parser consomme le flux de tokens et construit un **Abstract Syntax Tree** (AST).

### Modèle de nœuds AST

```
BdfdScriptAst
  └── List<BdfdNode>
        ├── BdfdFunctionCallAst
        │     ├── name: String           (ex: "sendMessage")
        │     ├── arguments: List<BdfdNode>
        │     │     ├── BdfdTextAst("Hello ")
        │     │     └── BdfdVariableAst("username")
        │     └── rawArguments: String   (arguments non parsés)
        │
        ├── BdfdTextAst                  (texte brut)
        ├── BdfdVariableAst              (référence de variable)
        └── BdfdBlockAst                 (bloc $if/$else, $for, $try)
              ├── condition: BdfdNode
              ├── body: BdfdScriptAst
              └── elseBody: BdfdScriptAst?
```

### Nesting

Le parser supporte le nesting profond : une fonction peut contenir d'autres fonctions dans ses arguments.

```
$sendMessage[$if[$getVar[count] > 10]Beaucoup$elsePeu$endif utilisateurs]

AST:
  BdfdFunctionCallAst("sendMessage")
    └── arguments:
          └── BdfdBlockAst("if")
                ├── condition: BinaryOp(>, Var("count"), Literal(10))
                ├── body: BdfdTextAst("Beaucoup")
                └── elseBody: BdfdTextAst("Peu")
```

### Blocs structurels supportés

| Bloc | Syntaxe | Usage |
|------|---------|-------|
| `$if` / `$else` / `$endif` | Conditionnel | Branchement |
| `$for` / `$endFor` | Boucle | Itération |
| `$try` / `$endTry` | Capture d'erreur | Fallback |

---

## Phase 3 : Transpiler (`bdfd_ast_transpiler.dart`)

Le transpiler parcourt l'AST et produit une `List<Action>` via `BdfdAstTranspiler.transpile(script)`.

### Résultat de transpilation

```dart
class BdfdTranspileResult {
  final List<Action> actions;        // Actions à exécuter
  final List<String> warnings;       // Avertissements de compilation
  final Map<String, dynamic> metadata; // Métadonnées (variables, etc.)
}
```

### Structure d'une Action

```dart
class Action {
  final BotCreatorActionType type;   // Type d'action (sendMessage, httpRequest, etc.)
  final Map<String, dynamic> payload; // Données spécifiques à l'action
}
```

Exemple de payload pour `sendMessage` :
```json
{
  "channelId": "((channel))",
  "content": "Hello $username",
  "embeds": [...],
  "components": [...],
  "allowedMentions": {...}
}
```

### `_BdfdAstTranspilationScope`

Classe centrale qui maintient l'état de compilation pendant la transpilation :

| Champ | Rôle |
|-------|------|
| `_pendingHttpHeaders` | Headers HTTP en attente (pour les requêtes HTTP) |
| `_jsonContext` | Contexte JSON courant (pour $jsonParse, $jsonStringify) |
| `_deferredJsonMode` | Mode JSON différé (évaluation au runtime) |
| `_deferredImageMode` | Mode image différé (canvas au runtime) |
| `_pendingResponse` | Accumule les mutations d'embed |

### `_PendingResponse`

Pendant la transpilation, les fonctions qui modifient un embed (title, description, color, footer, etc.) ne créent pas immédiatement une action. Elles s'accumulent dans `_PendingResponse` et sont "flushées" (transformées en une action `sendEmbed`) à la fin du script ou lors d'un appel à `$sendMessage`.

```
$title[Titre]
$description[Description]
$color[#FF0000]
$sendMessage[...]

→ _PendingResponse accumule title, description, color
→ $sendMessage déclenche le flush → Action(sendEmbed) avec les données combinées
```

### Modes d'évaluation

Le transpiler distingue deux modes d'évaluation :

| Mode | Quand | Comportement |
|------|-------|-------------|
| **Compile-time** | Toutes les valeurs sont connues à la compilation | L'action est résolue immédiatement (ex: `$color[#FF0000]`) |
| **Runtime** | Une valeur dépend d'une variable runtime | Un placeholder `((...))` est inséré dans le payload, résolu plus tard par le `WorkflowExecutor` |

```
$sendMessage[Hello $username]
                           ────┬────
                               │
                     Variable runtime → placeholder

Action payload:
  content: "Hello ((username))"   ← sera résolu au runtime
```

---

## Architecture en Part Files

Le transpiler est divisé en 9 fichiers via le système `part` de Dart, tous inclus depuis `bdfd_ast_transpiler.dart` :

### 1. `core.dart`
Classe principale `_BdfdAstTranspilationScope`, gestion de la réponse pendante (`_PendingResponse`), modes différés JSON/Image, contexte de transpilation.

### 2. `dispatch.dart`
Fonction `_transpileStandaloneFunction` : le **switch géant** qui dispatche chaque fonction BDFD vers son handler spécifique.

```
_transpileStandaloneFunction(node, scope) {
  switch (node.name) {
    case 'sendMessage':    → _handleSendMessage()
    case 'httpRequest':    → _handleHttpRequest()
    case 'setVar':         → _handleSetVar()
    case 'banMember':      → _handleBanMember()
    case 'addRole':        → _handleAddRole()
    case 'createChannel':  → _handleCreateChannel()
    case 'if':             → _handleIf()
    case 'for':            → _handleFor()
    // ... 200+ fonctions
  }
}
```

### 3. `inline_runtime.dart`
Fonction `_transpileInlineFunction` : gère les fonctions qui **retournent une valeur** (utilisables comme arguments d'autres fonctions).

```
Exemples :
  $math[$getVar[x] + 5]
  $textSlice[$message;0;10]
  $getVar[count]
  $channelName[$channelID]
```

### 4. `runtime_builders.dart`
Builders pour les actions qui ne peuvent être résolues qu'au runtime (car dépendent de variables).

### 5. `action_builders.dart`
Builders pour les actions concrètes : modération, channels, rôles, webhooks, réactions, etc.

### 6. `inline_helpers.dart`
Utilitaires pour l'évaluation inline : parsing de nombres, résolution de variables, conversions de types, gestion des placeholders `((...))`.

### 7. `models.dart`
Modèles de données partagés entre toutes les parts : classes pour les placeholders, les résultats intermédiaires, les contextes d'évaluation.

### 8. `control_flow.dart`
Gestion des structures de contrôle :
- `$if` / `$elseIf` / `$else` / `$endif`
- `$for[...]` / `$endFor` (boucles)
- Gardes de type (`$isNumber`, `$isBoolean`, etc.)
- `$stop`, `$skipActions`, `$break`

### 9. `image_canvas.dart`
Gestion du canvas d'image BDFD : `$drawImage`, `$drawText`, `$compositeImages`, `$createImage`, manipulation de buffers d'image.

---

## Diagramme de flux de transpilation

```
                          ┌─────────────────┐
                          │  Source BDFD     │
                          └────────┬────────┘
                                   │
                          ┌────────▼────────┐
                          │     LEXER        │
                          │  bdfd_lexer.dart │
                          └────────┬────────┘
                                   │ Token stream
                          ┌────────▼────────┐
                          │     PARSER       │
                          │ bdfd_parser.dart │
                          └────────┬────────┘
                                   │ AST (BdfdScriptAst)
                          ┌────────▼────────┐
                          │   TRANSPILER     │
                          │   (part files)   │
                          │                  │
                          │  dispatch.dart   │──▶ _transpileStandaloneFunction()
                          │  inline.dart     │──▶ _transpileInlineFunction()
                          │  control_flow.dart│──▶ $if/$for/$try
                          │  action_builders │──▶ Build Action payloads
                          │  runtime_builders│──▶ Build runtime actions
                          │  core.dart       │──▶ Scope + PendingResponse
                          │  image_canvas.dart│──▶ Image canvas
                          │  models.dart     │──▶ Shared models
                          │  helpers.dart    │──▶ Utilities
                          └────────┬────────┘
                                   │ List<Action>
                          ┌────────▼────────┐
                          │ BdfdTranspile   │
                          │ Result          │
                          │  .actions       │
                          │  .warnings      │
                          │  .metadata      │
                          └─────────────────┘
                                   │
                                   ▼
                          ┌─────────────────┐
                          │  WorkflowExecutor│
                          │  executeActions()│
                          └─────────────────┘
```

## Fichiers source référencés

| Fichier | Rôle |
|---------|------|
| `bdfd_lexer.dart` | Tokeniseur — texte source → tokens |
| `bdfd_parser.dart` | Parser — tokens → AST |
| `bdfd_ast.dart` | Définitions des nœuds AST (BdfdScriptAst, BdfdFunctionCallAst, etc.) |
| `bdfd_ast_transpiler.dart` | Fichier maître du transpiler — AST → List<Action> |
| `core.dart` | Scope de transpilation, PendingResponse |
| `dispatch.dart` | Switch géant des fonctions standalone |
| `inline_runtime.dart` | Fonctions qui retournent des valeurs |
| `runtime_builders.dart` | Builders pour actions runtime |
| `action_builders.dart` | Builders pour actions modération/channels/rôles |
| `inline_helpers.dart` | Helpers d'évaluation inline |
| `models.dart` | Modèles de données partagés |
| `control_flow.dart` | $if/$for/$try, stop, skipActions |
| `image_canvas.dart` | Canvas d'image BDFD |
