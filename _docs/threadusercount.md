---
layout: doc
title: $threadUserCount
translation_key: docs
category: "Moderation"
function_name: threadUserCount
syntax: $threadUserCount[threadID]
description: Returns the number of members in a fil of discussion (thread). Utile pour suivre la participation to the discussions.
---

# $threadUserCount

The function `$threadUserCount[]` allows **count the namebre of members** présents in a fil of discussion.

## Syntax

```
$threadUserCount[threadID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread to analyser. |

## Return Value

- **Type** : Integer
- The namebre of members in the thread.
- `0` if the thread est vide or inaccessible.

## Behavior

- Counts all users ayant rejoint le thread (public) or y ayant été ajoutés (private).
- Inclut the bot lui-même s'il a rejoint le thread.
- The bot doit avoir accès to the thread.

## Examples

### Résumé of thread

```bdfd
$title[Activité of the thread]
$description[
**Members :** $threadUserCount[$threadID] participants
**Messages :** $threadMessageCount[$threadID] messages
]
$color[#57F287]
$sendMessage[]
```

### Alerte of popularité

```bdfd
$let[userCount;$threadUserCount[$threadID]]
$if[$userCount>=10]
  $sendMessage[Ce thread a attiré $userCount participants ! 🔥]
$endif
```

### Surveillance of participation

```bdfd
$let[members;$threadUserCount[$threadID]]
$let[messages;$threadMessageCount[$threadID]]
$let[ratio;$round[$divide[$messages;$members]]]
$sendMessage[Moyenne of $ratio messages par participant.]
```

## Notes

- Dans les threads publics, le compte inclut all users ayant ouvert le thread.
- Utile with `$threadMessageCount[]` pour évaluer l'engagement.
- Les members qui quittent un thread public ne sont plus comptés.
