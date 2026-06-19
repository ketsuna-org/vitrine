---
layout: doc
title: "Systems — JsonVariableStore (implémentation in-memory)"
translation_key: docs
category: systems
description: >
  Documentation de la classe JsonVariableStore : implémentation in-memory de VariableDatabase
  adossée à des Dart Maps. Utilisée par le CLI runner et comme fallback app.
---

# Systems — JsonVariableStore (implémentation in-memory)

`JsonVariableStore` est l'implémentation in-memory de l'interface `VariableDatabase`. Elle stocke toutes les données dans des `Map` Dart, sans aucune persistance disque. Elle est utilisée dans deux contextes principaux :

- **CLI runner** : quand le bot est chargé depuis un fichier ZIP de configuration
- **Fallback app** : quand la base SQLite est indisponible

## Stockage interne

La classe utilise quatre maps :

```dart
final Map<String, dynamic> _globalVariables = {};
final Map<String, int> _globalExpirations = {};  // timestamp millisecondes
final Map<String, Map<String, Map<String, dynamic>>> _scopedVariables = {};
final Map<String, Map<String, Map<String, int>>> _scopedExpirations = {};  // timestamp ms
```

| Map | Structure | Contenu |
|---|---|---|
| `_globalVariables` | `key → value` | Variables globales |
| `_globalExpirations` | `key → timestamp` | Timestamps d'expiration des variables globales (ms) |
| `_scopedVariables` | `scope → contextId → key → value` | Variables scopées |
| `_scopedExpirations` | `scope → contextId → key → timestamp` | Timestamps d'expiration scopés (ms) |

## Constructeurs

### `JsonVariableStore()`

Constructeur par défaut. Initialise les quatre maps vides. Point d'entrée standard pour le CLI runner.

### `JsonVariableStore.fromMaps({Map<String, dynamic>? globalVariables, Map<String, Map<String, Map<String, dynamic>>>? scopedVariables})`

Constructeur nommé qui pré-remplit le store depuis des maps existantes (ex: chargement depuis `BotConfig` ou un fichier JSON). Les maps fournies sont copiées (deep copy partielle via `Map.from` pour les valeurs scopées) pour éviter les effets de bord.

Les expirations ne sont pas chargées via ce constructeur — seules les valeurs le sont. Les TTL doivent être réappliqués via des appels `set*Variable()` ultérieurs.

## Opérations globales

### `getGlobalVariables(botId)`

Parcourt `_globalVariables`. Pour chaque entrée, vérifie si une expiration existe et est dépassée. Les entrées expirées sont supprimées des deux maps (`_globalVariables` et `_globalExpirations`). Retourne les variables non expirées.

### `getGlobalVariable(botId, key)`

Vérifie l'expiration. Si expirée, supprime la variable et retourne `null`. Sinon retourne la valeur.

### `setGlobalVariable(botId, key, value, {String? ttl})`

1. Normalise la valeur via `_normalizeVariableValue()`
2. Stocke dans `_globalVariables`
3. Parse le TTL via `_parseTtl()` : si valide, stocke le timestamp d'expiration dans `_globalExpirations` ; sinon supprime toute expiration existante pour cette clé

### `renameGlobalVariable(botId, oldKey, newKey)`

Si `oldKey` existe :
1. Récupère et supprime la valeur de `_globalVariables[oldKey]`
2. Stocke dans `_globalVariables[newKey]`
3. Transfère l'expiration de `_globalExpirations[oldKey]` vers `_globalExpirations[newKey]`

Si `oldKey` n'existe pas, ne fait rien.

### `removeGlobalVariable(botId, key)`

Supprime la clé de `_globalVariables` et `_globalExpirations`.

## Opérations scopées

### `getScopedVariables(botId, scope, contextId)`

1. Récupère `_scopedVariables[scope][contextId]` (map vide par défaut)
2. Récupère `_scopedExpirations[scope][contextId]` (map vide par défaut)
3. Parcourt toutes les entrées, vérifie l'expiration
4. Les entrées expirées sont supprimées via `removeScopedVariable()` et la map d'expirations
5. Retourne les variables non expirées

### `getScopedVariable(botId, scope, contextId, key)`

Vérifie d'abord l'expiration dans `_scopedExpirations`. Si expirée, supprime et retourne `null`. Sinon, appelle `getScopedVariables()` pour obtenir la map complète (avec nettoyage) et retourne `values[key]`.

### `setScopedVariable(botId, scope, contextId, key, value, {String? ttl})`

Utilise `putIfAbsent` pour créer les maps intermédiaires si elles n'existent pas :

1. `_scopedVariables.putIfAbsent(scope, () => {})` → crée la map de scope
2. `byScope.putIfAbsent(contextId, () => {})` → crée la map de contextId
3. Stocke la valeur normalisée dans `byId[key]`
4. Si TTL fourni : crée le chemin dans `_scopedExpirations` via `putIfAbsent` et stocke le timestamp
5. Si TTL absent : supprime toute expiration existante pour cette clé

### `renameScopedVariable(botId, scope, contextId, oldKey, newKey)`

Si `oldKey` existe dans le scope + contextId :
1. Récupère et supprime la valeur
2. Stocke sous `newKey`
3. Transfère l'expiration si elle existe (crée les maps intermédiaires si nécessaire)

### `removeScopedVariable(botId, scope, contextId, key)`

Supprime la clé de `_scopedVariables[scope][contextId]` et `_scopedExpirations[scope][contextId]`. Si le contextId est absent, ne fait rien.

### `getScopedVariableTtl(botId, scope, contextId, key)`

Récupère le timestamp d'expiration depuis `_scopedExpirations[scope][contextId][key]`. Calcule le temps restant en millisecondes (`expiresAt - now`). Retourne :

- La durée restante si `> 0`
- `0` si expiré
- `null` si pas de TTL

### `listContextIds(botId, scope, {String? searchKey})`

Récupère `_scopedVariables[scope]`. Si `null`, retourne liste vide. Sinon, filtre les contextIds :

- Sans `searchKey` : retourne tous les contextIds
- Avec `searchKey` : ne retourne que les contextIds ayant au moins une variable dont la clé commence par `searchKey`

## Opérations de requête

### `queryScopedVariableIndex(botId, scope, key, {offset, limit, descending})`

Algorithme leaderboard :

1. Clampe `offset` à `>= 0` et `limit` à `1..25`
2. Parcourt tous les contextIds du scope dans `_scopedVariables`
3. Pour chaque contextId ayant la clé recherchée, vérifie l'expiration (ignore si expiré)
4. Construit les items `{contextId, key, value}`
5. Trie les items avec `_compareVariableValues()` (ordre `descending`)
6. Pagine avec `sublist(offset, end)`
7. Retourne `{items, count: items.length, total: items.length}`

### `queryScopedArray(botId, scope, contextId, key, {offset, limit, descending, filter})`

1. Récupère la variable scopée, la convertit en liste via `_toList()`
2. Si `filter` est fourni, applique `_applyArrayFilter()`
3. Trie la liste avec `_compareVariableValues()`
4. Pagine et retourne `{items, count, total}`

## Opérations Array

Toutes les opérations array utilisent le helper privé `_toList()` qui convertit une valeur en `List<dynamic>` si c'est un `List`, ou `null` sinon.

### `pushScopedArrayElement(botId, scope, contextId, key, element)`

Lit la variable existante, la convertit en liste (ou `[]` si inexistante/non-list), ajoute l'élément, puis réécrit via `setScopedVariable()`.

### `popScopedArrayElement(botId, scope, contextId, key)`

Lit la variable, vérifie qu'elle est une liste non vide. Retire le dernier élément via `removeLast()`, réécrit, et retourne l'élément retiré. Retourne `null` si liste vide ou absente.

### `removeScopedArrayElement(botId, scope, contextId, key, index)`

Lit la variable. Si c'est une liste et que l'index est valide (`>= 0` et `< length`), retire l'élément via `removeAt(index)`, réécrit et retourne l'élément. Sinon `null`.

### `getScopedArrayElement(botId, scope, contextId, key, index)`

Lit la variable. Si c'est une liste et que l'index est valide, retourne `list[index]`. Sinon `null`.

### `getScopedArrayLength(botId, scope, contextId, key)`

Lit la variable, retourne `list.length` si c'est une liste, `0` sinon.

## Utilitaires privés

### `_normalizeVariableValue(dynamic value)`

Normalise une valeur avant stockage :

| Type d'entrée | Traitement |
|---|---|
| `null` | Préservé tel quel |
| `num` (int, double) | Préservé tel quel |
| `bool` | Préservé tel quel |
| `String` | Préservé tel quel |
| `List` | Conversion récursive de chaque élément |
| `Map` | Conversion récursive des valeurs, clés converties en `String` |
| Autres | Conversion via `.toString()` |

### `_parseTtl(String? ttl, int now)`

Parse une durée au format BDFD en timestamp d'expiration :

1. Si `ttl` est `null` ou vide → retourne `null`
2. Appelle `parseBdfdDuration(ttl)` du module `bdfd_duration_parser`
3. Si le parsing échoue → retourne `null`
4. Sinon → retourne `now + duration.inMilliseconds`

### `_applyArrayFilter(List<dynamic> list, String filter)`

Filtre les éléments d'une liste en appliquant `_matchesArrayFilter()` à chaque élément. Retourne une nouvelle liste filtrée.

### `_matchesArrayFilter(dynamic item, String filter)`

Applique un filtre textuel à un élément :

| Filtre | Comportement |
|---|---|
| `"> N"` | Item > N. Si item n'est pas `num` ou N non parsable → `false` |
| `"< N"` | Item < N. Si item n'est pas `num` ou N non parsable → `false` |
| `">= N"` | Item >= N. Mêmes restrictions numériques |
| `"<= N"` | Item <= N. Mêmes restrictions numériques |
| `"== V"` | Égalité. Si item est `String` → comparaison textuelle. Sinon, tente un parse numérique de V. |
| `"contains V"` | `item.toString().toLowerCase().contains(search.toLowerCase())` |

La sous-chaîne après l'opérateur est lue comme suit :
- `"> "`, `"< "` → `filter.substring(2)`
- `">= "`, `"<= "`, `"== "` → `filter.substring(3)`
- `"contains "` → `filter.substring(9)`

### `_compareVariableValues(dynamic a, dynamic b, bool descending)`

Comparateur générique pour le tri :

1. Si les deux valeurs sont `num` → comparaison numérique (`compareTo`)
2. Si les deux valeurs sont `bool` → `true > false`
3. Sinon → conversion en chaîne via `_valueToComparableString()`, comparaison lexicographique insensible à la casse

Le paramètre `descending` inverse le résultat.

### `_valueToComparableString(dynamic value)`

Convertit une valeur en chaîne comparable :
- `null` → `""`
- `String` → `.toLowerCase()`
- `List` ou `Map` → `jsonEncode(value).toLowerCase()`
- Autres → `.toString().toLowerCase()`

### `_toList(dynamic value)`

Si `value` est un `List` → retourne `List<dynamic>.from(value)`. Sinon → `null`.

## Méthodes d'export

### `exportGlobalVariables()`

Retourne une copie de `_globalVariables` via `Map.from()`. Utilisé pour la sérialisation JSON et les sauvegardes.

### `exportScopedVariables()`

Retourne une copie profonde partielle de `_scopedVariables` au format `Map<String, Map<String, Map<String, dynamic>>>` (identique au format accepté par `JsonVariableStore.fromMaps()`).

## `deleteAllForBot(botId)`

Vide complètement `_globalVariables` et `_scopedVariables` via `.clear()`. Note : les maps d'expirations ne sont pas explicitement nettoyées, mais deviennent inaccessibles puisque les valeurs correspondantes n'existent plus.

## Cas d'usage

| Contexte | Mécanisme |
|---|---|
| CLI runner (source ZIP) | `JsonVariableStore()` — stockage temporaire le temps de l'exécution |
| Application desktop/mobile (fallback) | `JsonVariableStore()` — utilisé quand SQLite est indisponible |
| Import de config | `JsonVariableStore.fromMaps(globalVariables: ..., scopedVariables: ...)` — initialisation depuis BotConfig |
| Sauvegarde / export | `exportGlobalVariables()` + `exportScopedVariables()` → sérialisation JSON |
