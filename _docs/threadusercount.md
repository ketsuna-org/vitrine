---
layout: doc
title: $threadUserCount
translation_key: docs
category: "Moderation"
function_name: threadUserCount
syntax: $threadUserCount[threadID]
description: Returns the number de members dans un fil de discussion (thread). Utile pour suivre la participation aux discussions.
---

# $threadUserCount

The function `$threadUserCount[]` allows **compter the namebre de members** présents dans un fil de discussion.

## Syntax

```
$threadUserCount[threadID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread à analyser. |

## Return Value

- **Type** : Integer
- The namebre de members in the thread.
- `0` if the thread est vide or inaccessible.

## Behavior

- Counts all users ayant rejoint le thread (public) or y ayant été ajoutés (private).
- Inclut the bot lui-même s'il a rejoint le thread.
- The bot doit avoir accès au thread.

## Examples

### Résumé de thread

```bdfd
$title[Activité du thread]
$description[
**Members :** $threadUserCount[$threadID] participants
**Messages :** $threadMessageCount[$threadID] messages
]
$color[#57F287]
$sendMessage[]
```

### Alerte de popularité

```bdfd
$let[userCount;$threadUserCount[$threadID]]
$if[$userCount>=10]
  $sendMessage[Ce thread a attiré $userCount participants ! 🔥]
$endif
```

### Surveillance de participation

```bdfd
$let[members;$threadUserCount[$threadID]]
$let[messages;$threadMessageCount[$threadID]]
$let[ratio;$round[$divide[$messages;$members]]]
$sendMessage[Moyenne de $ratio messages par participant.]
```

## Notes

- Dans les threads publics, le compte inclut all users ayant ouvert le thread.
- Utile avec `$threadMessageCount[]` pour évaluer l'engagement.
- Les members qui quittent un thread public ne sont plus comptés.
