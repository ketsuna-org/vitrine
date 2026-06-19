---
layout: doc
title: $threadMessageCount
translation_key: docs
category: "Moderation"
function_name: threadMessageCount
syntax: $threadMessageCount[threadID]
description: Returns the number total of messages in a fil of discussion (thread). Inclut les messages of the thread only, pas ceux of the canal parent.
---

# $threadMessageCount

The function `$threadMessageCount[]` allows **count the namebre of messages** in a fil of discussion.

## Syntax

```
$threadMessageCount[threadID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread to analyser. |

## Return Value

- **Type** : Integer
- The namebre total of messages in the thread.
- `0` if the thread est vide or inaccessible.

## Behavior

- Counts only les messages in the thread, pas ceux of the canal parent.
- Inclut les messages système (création of the thread, ajout of members, etc.).
- The bot doit avoir accès to the thread pour count thes messages.

## Examples

### Statistiques of thread

```bdfd
$title[Statistiques of the thread]
$description[
**Messages :** $threadMessageCount[$threadID]
**Members :** $threadUserCount[$threadID]
]
$color[#5865F2]
$sendMessage[]
```

### Vérification of activité

```bdfd
$let[msgCount;$threadMessageCount[$threadID]]
$if[$msgCount<=1]
  $channelSendMessage[$threadID;Ce thread semble inactif. N'hésitez pas to poser vos questions !]
$endif
```

### Archivage auto

```bdfd
$let[msgCount;$threadMessageCount[$threadID]]
$if[$msgCount>=100]
  $editThread[$threadID;[$threadName];true;true]
  $sendMessage[Thread archivé automatically (100 messages atteints).]
$endif
```

## Notes

- Utile for the statistiques and la gestion automatique threads.
- Les messages deleteds are not comptés.
- Pour the namebre of members, utilisez `$threadUserCount[]`.
