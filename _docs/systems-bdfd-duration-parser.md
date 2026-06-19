---
layout: doc
title: "Système — BDFD Duration Parser"
translation_key: docs
category: systems
description: >
  Documentation du parseur et formateur de durées BDFD. Couvre le parsing de chaînes
  comme '10s', '1m', '2h', '3d', '1w', '1y', '500ms' et le formatage inverse d'une
  Duration vers une chaîne lisible hiérarchisée.
---

# Système — BDFD Duration Parser

Le **BdfdDurationParser** fournit deux fonctions utilitaires pour convertir entre des chaînes de durée au format BDFD et des objets `Duration` Dart. Il est implémenté dans `packages/shared/lib/utils/bdfd_duration_parser.dart` (71 lignes).

---

## `parseBdfdDuration(String text)` → `Duration?`

Parse une chaîne de durée BDFD en `Duration`. Retourne `null` si le parsing échoue.

### Algorithme

1. **Nettoyage** : trim et mise en minuscules du texte
2. **Vide** : si la chaîne nettoyée est vide → `null`
3. **Extraction du nombre** : capture les digits initiaux via `RegExp(r'^\d+')`. Si aucun nombre trouvé → `null`
4. **Parsing numérique** : `int.tryParse(numberPart)`. Si échec → `null`
5. **Extraction de l'unité** : tout ce qui suit le nombre (trimé)
6. **Mapping d'unité** : switch sur l'unité

### Unités supportées

| Chaîne        | Unité                  | Calcul                     |
|---------------|------------------------|----------------------------|
| `s`           | Secondes               | `Duration(seconds: value)` |
| `sec`         | Secondes               | `Duration(seconds: value)` |
| `seconds`     | Secondes               | `Duration(seconds: value)` |
| `m`           | Minutes                | `Duration(minutes: value)` |
| `min`         | Minutes                | `Duration(minutes: value)` |
| `minutes`     | Minutes                | `Duration(minutes: value)` |
| `h`           | Heures                 | `Duration(hours: value)`   |
| `hour`        | Heures                 | `Duration(hours: value)`   |
| `hours`       | Heures                 | `Duration(hours: value)`   |
| `d`           | Jours                  | `Duration(days: value)`    |
| `day`         | Jours                  | `Duration(days: value)`    |
| `days`        | Jours                  | `Duration(days: value)`    |
| `w`           | Semaines               | `Duration(days: value * 7)`|
| `week`        | Semaines               | `Duration(days: value * 7)`|
| `weeks`       | Semaines               | `Duration(days: value * 7)`|
| `y`           | Années                 | `Duration(days: value * 365)`|
| `year`        | Années                 | `Duration(days: value * 365)`|
| `years`       | Années                 | `Duration(days: value * 365)`|
| `ms`          | Millisecondes          | `Duration(milliseconds: value)` |
| `milliseconds`| Millisecondes          | `Duration(milliseconds: value)` |

### Comportement par défaut

Si l'unité n'est pas reconnue (cas `default` du switch), la valeur est interprétée comme des **secondes** :

```dart
default:
  // Default to seconds if no unit provided
  return Duration(seconds: value);
```

### Exemples

| Entrée        | Résultat                     |
|---------------|------------------------------|
| `"10s"`       | `Duration(seconds: 10)`      |
| `"1m"`        | `Duration(minutes: 1)`       |
| `"2h"`        | `Duration(hours: 2)`         |
| `"3d"`        | `Duration(days: 3)`          |
| `"1w"`        | `Duration(days: 7)`          |
| `"1y"`        | `Duration(days: 365)`        |
| `"500ms"`     | `Duration(milliseconds: 500)`|
| `"30minutes"` | `Duration(minutes: 30)`      |
| `"2 weeks"`   | `Duration(days: 14)`         |
| `"42"`        | `Duration(seconds: 42)`      |
| `""`          | `null`                       |
| `"abc"`       | `null`                       |

---

## `formatBdfdDuration(Duration duration)` → `String`

Formate une `Duration` en chaîne lisible au format BDFD. Utilise une **hiérarchie décroissante** d'unités pour produire la représentation la plus naturelle.

### Algorithme hiérarchique

La fonction teste les unités de la plus grande à la plus petite et s'arrête à la première correspondance :

```
années (≥ 365 jours)
  ↓
semaines (≥ 7 jours)
  ↓
jours (≥ 1 jour)
  ↓
heures (≥ 1 heure)
  ↓
minutes (≥ 1 minute)
  ↓
secondes (fallback)
```

### Gestion du pluriel

Chaque unité applique un suffixe pluriel conditionnel :

```dart
'$years Year${years > 1 ? 's' : ''}'
```

### Exemples

| Duration                          | Résultat              |
|-----------------------------------|-----------------------|
| `Duration(days: 400)`             | `"1 Year"`            |
| `Duration(days: 800)`             | `"2 Years"`           |
| `Duration(days: 14)`              | `"2 Weeks"`           |
| `Duration(days: 7)`               | `"1 Week"`            |
| `Duration(days: 3)`               | `"3 Days"`            |
| `Duration(days: 1)`               | `"1 Day"`             |
| `Duration(hours: 5)`              | `"5 Hours"`           |
| `Duration(hours: 1)`              | `"1 Hour"`            |
| `Duration(minutes: 30)`           | `"30 Minutes"`        |
| `Duration(minutes: 1)`            | `"1 Minute"`          |
| `Duration(seconds: 45)`           | `"45 Seconds"`        |
| `Duration(seconds: 1)`            | `"1 Second"`          |
| `Duration(seconds: 0)`            | `"0 Seconds"`         |

### Précision sur les conversions

- **Années** : division entière `duration.inDays ~/ 365` (pas de gestion des années bissextiles)
- **Semaines** : division entière `duration.inDays ~/ 7`
- Les unités de la classe `Duration` Dart gèrent le reste (heures, minutes, secondes)

---

## Cas d'usage dans le pipeline BDFD

Ces deux fonctions sont utilisées dans le transpiler et les exécuteurs pour :

- **Parser** les arguments de durée des fonctions BDFD comme `$cooldown[10s;message]`, `$mute[userID;1h;reason]`, `$deleteIn[30s]`
- **Formatter** les durées dans les réponses (logs, messages de timeout, affichage de cooldowns)
