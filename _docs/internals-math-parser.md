---
layout: doc
translation_key: docs
category: "Internals"
---

# Parser d'Expressions Mathématiques — `math_parser.dart`

Ce document décrit le parseur d'expressions mathématiques utilisé par la fonction `$calculate` et ses variantes. Il s'agit d'un parseur récursif descendant (recursive-descent) qui évalue des expressions arithmétiques en respectant les règles de précédence standard.

```
┌──────────────────────────────────────────────────────────────────┐
│              VUE D'ENSEMBLE                                      │
│                                                                  │
│  ┌─────────────────┐     ┌──────────────────────┐               │
│  │  Source BDFD    │     │  Points d'entrée     │               │
│  │                 │     │                      │               │
│  │  $calculate[    │────▶│  1. _inlineCalculate │               │
│  │    2 + 3 * 4    │     │     (compile-time)   │               │
│  │  ]              │     │                      │               │
│  │                 │     │  2. ((calculate[     │               │
│  │  ((calculate[   │────▶│     ... ]))          │               │
│  │    2 + 3 * 4    │     │     (runtime via     │               │
│  │  ]))            │     │     OperationsExp.)  │               │
│  │                 │     │                      │               │
│  │  Visual Action  │────▶│  3. Calculate block  │               │
│  │  "Calculate"    │     │     (visual editor)  │               │
│  │                 │     │                      │               │
│  └─────────────────┘     └──────┬───────────────┘               │
│                                 │                                │
│                                 ▼                                │
│                    ┌────────────────────────┐                    │
│                    │  MathExpressionParser  │                    │
│                    │  (139 lignes)          │                    │
│                    │                        │                    │
│                    │  evaluate(expression)  │                    │
│                    │    │                   │                    │
│                    │    ├─ _expression()    │                    │
│                    │    ├─ _term()          │                    │
│                    │    ├─ _factor()        │                    │
│                    │    ├─ _unary()         │                    │
│                    │    └─ _primary()       │                    │
│                    └────────────────────────┘                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 1. Architecture du Parseur

### 1.1 Classe Principale

```dart
/// Recursive-descent math expression parser.
///
/// Supports +, -, *, /, %, ^, **, parentheses, and unary minus.
/// Used by BDFD $calculate (compile-time), ((calculate[...])) (runtime),
/// and the Calculate visual action block.
class MathExpressionParser {
  final String _input;
  int _pos = 0;

  MathExpressionParser(this._input);

  /// Returns the evaluated result, or null if the expression is invalid.
  double? parse() {
    final result = _expression();
    if (_pos < _input.length) return null; // trailing garbage → null
    return result;
  }
  // ...
}
```

Le parseur est **sans état externe** — il ne garde qu'un pointeur de position (`_pos`) dans la chaîne d'entrée. Le constructeur prend la chaîne à parser, et la méthode `parse()` retourne un `double?` (null si l'expression est invalide).

### 1.2 Méthode Statique d'Entrée

```dart
/// Convenience: evaluates [expression] and returns the result, or null if invalid.
static double? evaluate(String expression) {
  final cleaned = expression.replaceAll(' ', '');
  if (cleaned.isEmpty) return null;
  return MathExpressionParser(cleaned).parse();
}
```

La méthode statique `evaluate()` est le point d'entrée utilisé par le reste du code. Elle nettoie les espaces puis délègue au parseur.

---

## 2. Grammaire Formelle

Le parseur implémente une grammaire en **ordre de précédence décroissant** (du moins prioritaire au plus prioritaire) :

```
┌──────────────────────────────────────────────────────────────────┐
│  GRAMMAIRE BNF                                                   │
│                                                                  │
│  expression  → term ( ( '+' | '-' ) term )*                     │
│                                                                  │
│  term        → factor ( ( '*' | '/' | '%' ) factor )*           │
│                                                                  │
│  factor      → unary ( ( '^' | '**' ) unary )*                  │
│                                                                  │
│  unary       → '-' unary                                         │
│              | '+' unary                                         │
│              | primary                                           │
│                                                                  │
│  primary     → '(' expression ')'                                │
│              | number                                            │
│                                                                  │
│  number      → '-'? digit+ ( '.' digit+ )?                      │
└──────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────┐
│  TABLE DE PRÉCÉDENCE                                             │
│                                                                  │
│  Niveau  Opérateurs       Associativité    Méthode              │
│  ──────  ───────────────  ──────────────  ────────────────────  │
│  1       +  -              Gauche           _expression()        │
│  2       *  /  %           Gauche           _term()              │
│  3       ^  **             Droite           _factor()            │
│  4       - unaire          Droite           _unary()             │
│  5       ( )  nombres      —                _primary()           │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Implémentation Détaillée

### 3.1 Niveau 1 — `_expression()` : Addition et Soustraction

```dart
double? _expression() {
  var left = _term();                    // Parser le premier terme
  if (left == null) return null;

  while (_pos < _input.length) {
    final op = _input[_pos];
    if (op != '+' && op != '-') break;  // Stop si pas + ou -
    _pos++;
    final right = _term();              // Parser le terme droit
    if (right == null) return null;
    left = op == '+' ? left! + right : left! - right;
  }
  return left;
}
```

**Trace d'exemple :**

```
"2 + 3 - 1"
  → term("2") = 2
  → op='+', term("3") = 3 → left = 2 + 3 = 5
  → op='-', term("1") = 1 → left = 5 - 1 = 4
  → fin, retourne 4
```

### 3.2 Niveau 2 — `_term()` : Multiplication, Division, Modulo

```dart
double? _term() {
  var left = _factor();
  if (left == null) return null;

  while (_pos < _input.length) {
    final op = _input[_pos];
    if (op != '*' && op != '/' && op != '%') break;
    _pos++;
    final right = _factor();
    if (right == null) return null;
    if (op == '*') {
      left = left! * right;
    } else if (op == '/') {
      left = right != 0 ? left! / right : 0;   // Protection /0
    } else {
      left = right != 0 ? left! % right : 0;   // Protection %0
    }
  }
  return left;
}
```

**Protection division par zéro :** Si le diviseur est nul, l'opération retourne 0 au lieu de lancer une exception. Cette décision de conception évite les crashes pour les scripts utilisateurs mal formés.

```
┌──────────────────────────────────────────────────────────────────┐
│  EXEMPLE AVEC DIVISION PAR ZÉRO                                  │
│                                                                  │
│  "10 / 0"                                                        │
│    → term("10") = 10                                            │
│    → op='/', term("0") = 0                                       │
│    → right == 0 → left = 0  (au lieu de Infinity/exception)     │
│    → retourne 0                                                  │
│                                                                  │
│  "10 % 0"                                                        │
│    → term("10") = 10                                            │
│    → op='%', term("0") = 0                                       │
│    → right == 0 → left = 0                                      │
│    → retourne 0                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 3.3 Niveau 3 — `_factor()` : Puissance

```dart
double? _factor() {
  var left = _unary();
  if (left == null) return null;

  while (_pos < _input.length) {
    final ch = _input[_pos];
    if (ch != '^' && ch != '*') break;
    if (ch == '*') {
      // Vérifier que c'est bien '**' et pas juste '*'
      if (_pos + 1 >= _input.length || _input[_pos + 1] != '*') break;
      _pos++; // Sauter le second *
    }
    _pos++;
    final right = _unary();
    if (right == null) return null;
    left = math.pow(left!, right).toDouble();
  }
  return left;
}
```

**Note :** L'opérateur `^` utilise `math.pow()` de `dart:math`, qui gère également les exposants fractionnaires et négatifs.

**Protection :** `math.pow(0, -1)` retourne `Infinity` plutôt que de lancer une exception, mais le résultat est ensuite passé dans `format()` pour décider du formatage.

```
┌──────────────────────────────────────────────────────────────────┐
│  EXEMPLES DE PUISSANCE                                           │
│                                                                  │
│  "2 ^ 3"   → math.pow(2, 3)  = 8.0                              │
│  "2 ** 4"  → math.pow(2, 4)  = 16.0                             │
│  "9 ** 0.5" → math.pow(9, 0.5) = 3.0  (racine carrée)          │
│  "2 ^ -1"  → math.pow(2, -1) = 0.5                              │
│  "0 ^ -2"  → Infinity (traité par format())                     │
└──────────────────────────────────────────────────────────────────┘
```

### 3.4 Niveau 4 — `_unary()` : Moins et Plus Unaires

```dart
double? _unary() {
  if (_pos >= _input.length) return null;
  if (_input[_pos] == '-') {
    _pos++;
    final value = _unary();     // Appel récursif pour -(-x) etc.
    return value != null ? -value : null;
  }
  if (_input[_pos] == '+') {
    _pos++;
    return _unary();            // +x est simplement ignoré
  }
  return _primary();
}
```

La récursion permet de gérer des expressions comme `--5` (= 5) ou `-+-+3` (= 3).

```
┌──────────────────────────────────────────────────────────────────┐
│  EXEMPLES UNAIRES                                                │
│                                                                  │
│  "-5"       → _unary() voit '-', récursion → _primary()=5      │
│               → retourne -5                                      │
│                                                                  │
│  "--3"      → _unary() voit '-', récursion                      │
│               → _unary() voit '-', récursion                     │
│               → _primary()=3                                     │
│               → retourne -3, puis -(-3) = 3                     │
│                                                                  │
│  "-(2+3)"  → _unary() voit '-', récursion                       │
│               → _primary() voit '(' → _expression()=5           │
│               → retourne -5                                      │
└──────────────────────────────────────────────────────────────────┘
```

### 3.5 Niveau 5 — `_primary()` : Nombres et Parenthèses

```dart
double? _primary() {
  if (_pos >= _input.length) return null;

  // Parenthèses
  if (_input[_pos] == '(') {
    _pos++;
    final result = _expression();
    if (_pos < _input.length && _input[_pos] == ')') {
      _pos++;
      return result;
    }
    return null;  // Parenthèse fermante manquante
  }

  // Nombre (avec signe négatif optionnel)
  final start = _pos;
  if (_pos < _input.length && _input[_pos] == '-') _pos++;
  while (_pos < _input.length &&
      (_isDigit(_input[_pos]) || _input[_pos] == '.')) {
    _pos++;
  }
  if (_pos == start + 1 && _input[start] == '-') return null; // '-' isolé
  if (_pos == start) return null;
  return double.tryParse(_input.substring(start, _pos));
}

static bool _isDigit(String c) =>
    c.codeUnitAt(0) >= 48 && c.codeUnitAt(0) <= 57;
```

**Validation avancée du nombre :**
- `_pos == start + 1 && _input[start] == '-'` : détecte un signe moins isolé (comme `"5+-"`) et retourne null
- `double.tryParse()` gère les formats valides comme `123`, `45.67`, `-89.01`

---

## 4. Fonctions Utilitaires

### 4.1 `format()` — Formatage du Résultat

```dart
/// Formats a numeric result, optionally preserving decimals.
///
/// When [enableDecimals] is false (default), whole-number doubles are
/// truncated to int (BDFD default behaviour). When true, the full precision
/// is preserved.
static dynamic format(num value, {bool enableDecimals = false}) {
  if (enableDecimals) return value;
  if (value is int) return value;
  if (value is double && value == value.roundToDouble() && value.abs() < 1e15) {
    return value.toInt();  // 14.0 → 14
  }
  if (value.isNaN || value.isInfinite) return value.toString();
  return value;
}
```

```
┌──────────────────────────────────────────────────────────────────┐
│  COMPORTEMENT DE format()                                        │
│                                                                  │
│  Entrée          enableDecimals    Sortie         Type           │
│  ──────────────  ────────────────  ─────────────  ────────────── │
│  14.0            false             14             int            │
│  3.14            false             3.14           double         │
│  14.0            true              14.0           double         │
│  1000000000000000.0  false         1e15           double (>1e15) │
│  NaN             false             "NaN"          String         │
│  Infinity        false             "Infinity"     String         │
│  42              false             42             int            │
└──────────────────────────────────────────────────────────────────┘
```

### 4.2 `_isDigit()` — Test de Chiffre

Méthode statique simple qui teste si un caractère est un chiffre (0-9) via son point de code Unicode :

```dart
static bool _isDigit(String c) =>
    c.codeUnitAt(0) >= 48 && c.codeUnitAt(0) <= 57;
```

Cette méthode est intentionnellement limitée aux chiffres ASCII 0-9 pour éviter les ambiguïtés avec les chiffres Unicode d'autres écritures.

---

## 5. Arbre d'Appels — Trace Complète

```
┌──────────────────────────────────────────────────────────────────────┐
│  EXPRESSION : "2 * (3 + 4) ^ 2 - 5"                                  │
│                                                                       │
│  parse()                                                              │
│   │                                                                   │
│   └─ _expression()                                                    │
│       │                                                               │
│       ├─ _term()                                                      │
│       │   ├─ _factor()                                                │
│       │   │   └─ _unary() → _primary() → "2" = 2.0                   │
│       │   │                                                          │
│       │   ├─ op='*' → _factor()                                       │
│       │   │   └─ _unary() → _primary()                               │
│       │   │       └─ '(' → _expression()                             │
│       │   │           ├─ _term() → 3 + 4 = 7.0                       │
│       │   │           └─ ')' → retourne 7.0                          │
│       │   │   → 7.0                                                   │
│       │   │                                                          │
│       │   │   op='^' → _unary() → _primary() → "2" = 2.0             │
│       │   │   → math.pow(7.0, 2.0) = 49.0                            │
│       │   │                                                          │
│       │   └─ left = 2.0 * 49.0 = 98.0                                │
│       │                                                               │
│       ├─ op='-' → _term()                                             │
│       │   └─ _factor() → _unary() → _primary() → "5" = 5.0           │
│       │                                                               │
│       └─ left = 98.0 - 5.0 = 93.0                                    │
│                                                                       │
│   Résultat final : 93.0                                               │
└──────────────────────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────────────────────┐
│  EXPRESSION AVEC ERREUR : "5 + * 3"                                  │
│                                                                       │
│  parse()                                                              │
│   │                                                                   │
│   └─ _expression()                                                    │
│       ├─ _term() → _factor() → _unary() → _primary() → "5" = 5.0    │
│       ├─ op='+' → _term()                                             │
│       │   └─ _factor() → _unary() → _primary()                       │
│       │       └─ '*' n'est pas un nombre ni '(' → retourne null       │
│       │   └─ right == null → retourne null                            │
│       └─ left est null → retourne null                                │
│                                                                       │
│   Résultat final : null (expression invalide)                         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 6. Gestion des Erreurs

Le parseur est conçu pour être **tolérant** — il ne lance jamais d'exception. Au lieu de cela, il retourne `null` pour signaler une expression invalide.

```
┌──────────────────────────────────────────────────────────────────┐
│  SCÉNARIOS D'ERREUR                                              │
│                                                                  │
│  Expression           Comportement          Résultat             │
│  ───────────────────  ────────────────────  ──────────────────── │
│  ""                   cleaned.isEmpty       null                 │
│  "5 + * 3"            _primary() sur '*'    null                 │
│  "5 + "               _term() sur EOF       null                 │
│  "(2 + 3"             parenthèse non fermée  null                 │
│  "5 + abc"            _primary() sur 'a'    null                 │
│  "5 + (3"             ) manquant            null                 │
│  "5 ++ 3"             deuxième + non géré   null                 │
│  "2 ^ 3 extra"        trailing garbage      null                 │
│  "10/0"               division par zéro     0 (protégé)         │
│  "10%0"               modulo par zéro       0 (protégé)         │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Points d'Utilisation dans le Code

```
┌──────────────────────────────────────────────────────────────────┐
│  UTILISATION 1 : Compile-time — _inlineCalculate()               │
│                                                                  │
│  Quand le transpiler rencontre $calculate[...],                  │
│  il évalue l'expression immédiatement :                           │
│                                                                  │
│  Entrée :  $sendMessage[$calculate[2+3*4]]                      │
│  → MathExpressionParser.evaluate("2+3*4")                        │
│  → Retourne 14.0                                                 │
│  → L'AST devient : sendMessage("14")                             │
│                                                                  │
│  Avantage : Aucun calcul à l'exécution, résultat constant        │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  UTILISATION 2 : Runtime — OperationsExpander                    │
│                                                                  │
│  Avec la syntaxe ((calculate[...])), l'expression est évaluée    │
│  à l'exécution, après substitution des variables :               │
│                                                                  │
│  Entrée :  ((calculate[$userVar[x] * 2]))                       │
│  → $userVar[x] est évalué → 5                                    │
│  → MathExpressionParser.evaluate("5*2")                          │
│  → Retourne 10.0                                                 │
│                                                                  │
│  Avantage : Calculs dynamiques dépendant de l'état               │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  UTILISATION 3 : Visual Action "Calculate"                       │
│                                                                  │
│  Dans l'éditeur visuel, le bloc Calculate utilise le même        │
│  parseur pour évaluer les expressions définies graphiquement.    │
│  Le résultat est stocké dans une variable temporaire puis        │
│  utilisé par les blocs suivants.                                 │
│                                                                  │
│  Même parseur, même sémantique, interface différente.            │
└──────────────────────────────────────────────────────────────────┘
```

---

## 8. Diagramme de Flux du Parseur

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FLOW CHART                                      │
│                                                                      │
│                        ┌──────────┐                                  │
│                        │ evaluate │                                  │
│                        │ (static) │                                  │
│                        └────┬─────┘                                  │
│                             │                                        │
│                   Nettoyer les espaces                               │
│                             │                                        │
│                             ▼                                        │
│                     ┌──────────────┐                                 │
│                     │   parse()    │                                 │
│                     └──────┬───────┘                                 │
│                            │                                         │
│                            ▼                                         │
│                    ┌───────────────┐                                 │
│                    │ _expression() │◀────────── boucle + -           │
│                    └───────┬───────┘                                 │
│                            │                                         │
│                            ▼                                         │
│                    ┌───────────────┐                                 │
│                    │    _term()    │◀────────── boucle * / %         │
│                    └───────┬───────┘                                 │
│                            │                                         │
│                            ▼                                         │
│                    ┌───────────────┐                                 │
│                    │   _factor()   │◀────────── boucle ^ **          │
│                    └───────┬───────┘                                 │
│                            │                                         │
│                            ▼                                         │
│                    ┌───────────────┐                                 │
│                    │   _unary()    │◀────── - unaire récursif        │
│                    └───────┬───────┘                                 │
│                            │                                         │
│                            ▼                                         │
│                    ┌───────────────┐                                 │
│                    │  _primary()   │                                 │
│                    │               │                                 │
│                    │  ┌─────────┐  │                                 │
│                    │  │ '(' ?   │──┼──▶ _expression() → attend ')'  │
│                    │  └─────────┘  │                                 │
│                    │  ┌─────────┐  │                                 │
│                    │  │ nombre? │──┼──▶ double.tryParse()            │
│                    │  └─────────┘  │                                 │
│                    │  ┌─────────┐  │                                 │
│                    │  │ autre   │──┼──▶ return null                 │
│                    │  └─────────┘  │                                 │
│                    └───────────────┘                                 │
│                            │                                         │
│                            ▼                                         │
│                      ┌──────────┐                                    │
│                      │ Trailing │                                    │
│                      │ garbage? │── oui ──▶ return null              │
│                      └──────────┘                                    │
│                            │ non                                     │
│                            ▼                                         │
│                      ┌──────────┐                                    │
│                      │  Result  │                                    │
│                      │ double?  │                                    │
│                      └──────────┘                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 9. Caractéristiques Techniques

### 9.1 Performance

- Complexité temporelle : **O(n)** où n est la longueur de l'expression
- Aucune allocation mémoire significative hormis les `double` intermédiaires
- Pas de backtracking — chaque caractère est visité au plus une fois

### 9.2 Limites

```
┌──────────────────────────────────────────────────────────────────┐
│  LIMITATIONS CONNUES                                             │
│                                                                  │
│  • Pas de fonctions trigonométriques (sin, cos, tan)            │
│  • Pas de constantes (pi, e)                                    │
│  • Pas d'opérateurs de comparaison (<, >, ==)                   │
│  • Pas de logique booléenne (AND, OR, NOT)                      │
│  • Pas de variables (sauf via le runtime BDFD qui substitue     │
│    avant d'appeler le parser)                                    │
│  • Uniquement les nombres en base 10                            │
│  • Le signe négatif est supporté mais pas le signe positif      │
│    explicite en début d'expression (contourné par le nettoyage  │
│    du + unaire dans _unary())                                   │
│                                                                  │
│  Ces limitations sont intentionnelles : le parseur est conçu     │
│  pour des calculs simples dans un contexte de macros BDFD,       │
│  pas pour être un moteur de calcul scientifique complet.         │
└──────────────────────────────────────────────────────────────────┘
```

### 9.3 Robustesse

- **Pas d'exceptions** : toutes les erreurs sont converties en `null`
- **Protection /0** : retourne 0 au lieu de Infinity/exception
- **Validation stricte** : le trailing garbage est rejeté
- **Formatage intelligent** : les entiers sont préservés comme `int`, pas comme `double`
