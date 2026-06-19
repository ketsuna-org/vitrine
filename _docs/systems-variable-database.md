---
layout: doc
title: "Systems — VariableDatabase (interface abstraite)"
translation_key: docs
category: systems
description: >
  Documentation de l'interface abstraite VariableDatabase : contrat de stockage pour les
  variables globales et scopées, opérations sur les arrays, requêtes paginées et TTL.
---

# Systems — VariableDatabase (interface abstraite)

`VariableDatabase` est une classe abstraite qui définit le contrat de stockage des variables pour le moteur BDFD Bot Creator. Elle unifie la gestion des variables globales et scopées, le support des TTL (Time-To-Live), et les opérations de type array/leaderboard.

## Implémentations

| Implémentation | Fichier source | Description |
|---|---|---|
| `JsonVariableStore` | `json_variable_store.dart` | Stockage in-memory via Dart Maps. Pas de persistance. Utilisé par le CLI runner et comme fallback app. |
| `SqliteVariableStore` | `sqlite_variable_store.dart` | Stockage SQLite persistant (`variable_stores.db`). Implémentation principale pour l'application desktop/mobile. |
| `SqliteCliVariableStore` | `sqlite_cli_variable_store.dart` | Extension de `SqliteVariableStore` pour le CLI runner avec accès concurrent à la DB SQLite. |

## Signature complète

Toutes les méthodes retournent des `Future` — l'interface est asynchrone pour permettre des implémentations sur disque.

### Variables globales

```
Future<Map<String, dynamic>> getGlobalVariables(String botId)
```
Retourne toutes les variables globales pour un bot donné. Les variables expirées sont filtrées et supprimées.

```
Future<dynamic> getGlobalVariable(String botId, String key)
```
Retourne une variable globale ou `null` si elle n'existe pas ou a expiré.

```
Future<void> setGlobalVariable(String botId, String key, dynamic value, {String? ttl})
```
Définit une variable globale. La valeur est normalisée. Le paramètre optionnel `ttl` accepte une durée au format BDFD (ex: `"5m"`, `"2h"`, `"1d"`).

```
Future<void> renameGlobalVariable(String botId, String oldKey, String newKey)
```
Renomme une variable globale. L'expiration est conservée.

```
Future<void> removeGlobalVariable(String botId, String key)
```
Supprime une variable globale et son expiration associée.

### Variables scopées

Le paramètre `scope` identifie le type de portée (ex: `"guild"`, `"guildMember"`, `"channel"`, `"user"`). Pour le scope `guildMember`, `contextId` est au format `"{guildId}:{userId}"`.

```
Future<Map<String, dynamic>> getScopedVariables(String botId, String scope, String contextId)
```
Retourne toutes les variables d'un scope + contextId. Filtre les expirées.

```
Future<dynamic> getScopedVariable(String botId, String scope, String contextId, String key)
```
Retourne une variable scopée ou `null`.

```
Future<void> setScopedVariable(String botId, String scope, String contextId, String key, dynamic value, {String? ttl})
```
Définit une variable dans un scope + contextId. Les maps intermédiaires sont créées automatiquement si absentes.

```
Future<void> renameScopedVariable(String botId, String scope, String contextId, String oldKey, String newKey)
```
Renomme une variable scopée. Conserve l'expiration.

```
Future<void> removeScopedVariable(String botId, String scope, String contextId, String key)
```
Supprime une variable scopée et son expiration.

### Relevé de contextes

```
Future<List<String>> listContextIds(String botId, String scope, {String? searchKey})
```
Liste tous les `contextId` pour un scope donné. Le filtre optionnel `searchKey` ne retourne que les contextIds contenant au moins une variable dont la clé commence par `searchKey`.

### Requête indexée (leaderboard)

```
Future<Map<String, dynamic>> queryScopedVariableIndex(
  String botId, String scope, String key,
  {int offset = 0, int limit = 25, bool descending = true}
)
```
Parcourt tous les `contextId` d'un scope pour une clé donnée. Retourne un payload paginé et trié :

```json
{
  "items": [
    {"contextId": "...", "key": "...", "value": dynamic}
  ],
  "count": int,
  "total": int
}
```

- `offset` est clampé à `>= 0`
- `limit` est clampé à `1..25`
- `descending` contrôle l'ordre de tri (décroissant par défaut)

Les entrées expirées sont exclues des résultats.

### Opérations Array sur variables scopées

```
Future<void> pushScopedArrayElement(String botId, String scope, String contextId, String key, dynamic element)
```
Ajoute un élément à la fin d'un array scopé. Si la variable n'existe pas ou n'est pas un array, un nouvel array est créé.

```
Future<dynamic> popScopedArrayElement(String botId, String scope, String contextId, String key)
```
Retire et retourne le dernier élément d'un array. Retourne `null` si la variable n'existe pas, n'est pas un array, ou est vide.

```
Future<dynamic> removeScopedArrayElement(String botId, String scope, String contextId, String key, int index)
```
Retire l'élément à l'index donné. Retourne l'élément retiré, ou `null` si hors limites ou non-array.

```
Future<dynamic> getScopedArrayElement(String botId, String scope, String contextId, String key, int index)
```
Retourne l'élément à l'index donné, ou `null` si indisponible.

```
Future<int> getScopedArrayLength(String botId, String scope, String contextId, String key)
```
Retourne la longueur de l'array. Retourne `0` si la variable n'existe pas ou n'est pas un array.

```
Future<Map<String, dynamic>> queryScopedArray(
  String botId, String scope, String contextId, String key,
  {int offset = 0, int limit = 25, bool descending = true, String? filter}
)
```
Requête paginée, triée et optionnellement filtrée sur un array scopé. Même structure de retour que `queryScopedVariableIndex` :

```json
{
  "items": [element1, element2, ...],
  "count": int,
  "total": int
}
```

**Filtres supportés :**

| Syntaxe | Description |
|---|---|
| `"> N"` | Items > N (numérique uniquement) |
| `"< N"` | Items < N (numérique uniquement) |
| `">= N"` | Items >= N (numérique uniquement) |
| `"<= N"` | Items <= N (numérique uniquement) |
| `"== V"` | Items == V (numérique ou chaîne) |
| `"contains V"` | Contient V (comparaison insensible à la casse sur représentation texte) |

Les items non-numériques sont ignorés pour les filtres de comparaison numérique (`>`, `<`, `>=`, `<=`).

### TTL (Time-To-Live)

```
Future<int?> getScopedVariableTtl(String botId, String scope, String contextId, String key)
```
Retourne le TTL restant en millisecondes, ou `null` si la variable n'existe pas ou n'a pas de TTL. Retourne `0` si le TTL est dépassé.

### Administration

```
Future<void> deleteAllForBot(String botId)
```
Supprime toutes les variables (globales et scopées) d'un bot. Équivalent d'une réinitialisation complète du store pour le bot.

## Cycle de vie des variables

1. **Création / Mise à jour** : via `setGlobalVariable()` ou `setScopedVariable()`. La valeur est normalisée (nombres, booléens, chaînes préservés ; List/Map convertis récursivement ; autres types convertis via `toString()`).
2. **Lecture** : via `getGlobalVariable[s]()` ou `getScopedVariable[s]()`. Les variables expirées sont automatiquement nettoyées à la lecture.
3. **TTL** : spécifié lors du `set` au format BDFD (`"30s"`, `"5m"`, `"2h"`, `"7d"`). La durée est parsée via `parseBdfdDuration()` du module `bdfd_duration_parser`.
4. **Suppression** : manuelle via `remove*()` ou automatique lors de l'expiration au moment de la lecture.
