---
layout: doc
title: $threadMessageCount
translation_key: docs
category: "Moderation"
function_name: threadMessageCount
syntax: $threadMessageCount[threadID]
description: Returns the number total de messages dans un fil de discussion (thread). Inclut les messages du thread only, pas ceux du canal parent.
---

# $threadMessageCount

The function `$threadMessageCount[]` allows **compter the namebre de messages** dans un fil de discussion.

## Syntax

```
$threadMessageCount[threadID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread à analyser. |

## Return Value

- **Type** : Integer
- The namebre total de messages in the thread.
- `0` if the thread est vide or inaccessible.

## Behavior

- Counts only les messages in the thread, pas ceux du canal parent.
- Inclut les messages système (création du thread, ajout de members, etc.).
- The bot doit avoir accès au thread pour compter les messages.

## Examples

### Statistiques de thread

```bdfd
$title[Statistiques du thread]
$description[
**Messages :** $threadMessageCount[$threadID]
**Members :** $threadUserCount[$threadID]
]
$color[#5865F2]
$sendMessage[]
```

### Vérification d'activité

```bdfd
$let[msgCount;$threadMessageCount[$threadID]]
$if[$msgCount<=1]
  $channelSendMessage[$threadID;Ce thread semble inactif. N'hésitez pas à poser vos questions !]
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

- Utile for the statistiques and la gestion automatique des threads.
- Les messages deleteds are not comptés.
- Pour the namebre de members, utilisez `$threadUserCount[]`.
