---
layout: doc
title: $startThread
translation_key: docs
category: "Moderation"
function_name: startThread
syntax: $startThread[name;(autoArchiveDuration);(messageID)]
description: Creates a fil de discussion (thread) à partir of the message courant or of a message spécifié. The threads permettent des conversations organisées en sous-canaux.
---

# $startThread

The function `$startThread[]` allows **créer un fil de discussion** (thread) dans un canal. The threads sont des sous-conversations organisées.

## Syntax

```
$startThread[name;(autoArchiveDuration);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the thread (1 à 100 becauseactères). |
| `autoArchiveDuration` | Optional - Durée d'inactivité before archivage : 60, 1440 (24h), 4320 (3j), 10080 (7j). Default: 1440. |
| `messageID` | Optional - ID of the message source. Par default, the message déclencheur. |

## Return Value

- **Type** : Snowflake (string)
- The ID of the thread newment created.
- String vide en cas d'échec (permissions insuffisantes or canal non compatible).

## Behavior

- Les threads ne can be createds que in thes canaux text (pas en vocal or annonce).
- The bot doit avoir la permission `CREATE_PUBLIC_THREADS` or `CREATE_PRIVATE_THREADS`.
- Le thread est created comme thread public default (visible par all).

## Examples

### Thread de support

```bdfd
$let[thread;$startThread[Support - $username;10080]]
$if[$thread!=]
  $channelSendMessage[$thread;Bienvenue dans votre fil de support, $username ! A modérateur vous répondra bientôt.]
  $sendMessage[Fil de support created : <#$thread>]
$else
  $sendMessage[Impossible de créer le thread. Permissions missinges.]
$endif
```

### Thread automatique

```bdfd
$if[$checkContains[$message;!discussion]==true]
  $let[topic;$message[1]]
  $let[thread;$startThread[$topic;4320]]
  $if[$thread!=]
    $threadAddMember[$thread;$authorID]
    $sendMessage[Discussion createde : <#$thread>]
  $endif
$endif
```

## Notes

- Les threads archivés can be dé-archivés avec `$editThread[]`.
- Les threads privates nécessitent `CREATE_PRIVATE_THREADS`.
- The name du thread can be modified ultérieurement avec `$editThread[]`.
