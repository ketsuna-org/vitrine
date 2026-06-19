---
layout: doc
title: $startThread
translation_key: docs
category: "Moderation"
function_name: startThread
syntax: $startThread[name;(autoArchiveDuration);(messageID)]
description: Creates a fil of discussion (thread) from the message courant or of a message spécifié. The threads allow conversations organisées en sous-canaux.
---

# $startThread

The function `$startThread[]` allows **create a fil of discussion** (thread) in a canal. The threads sont sous-conversations organisées.

## Syntax

```
$startThread[name;(autoArchiveDuration);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the thread (1 to 100 becauseactères). |
| `autoArchiveDuration` | Optional - Durée of inactivité before archivage : 60, 1440 (24h), 4320 (3j), 10080 (7j). Default: 1440. |
| `messageID` | Optional - ID of the message source. Par default, the message déclencheur. |

## Return Value

- **Type** : Snowflake (string)
- The ID of the thread newment created.
- String vide en cas of échec (permissions insuffisantes or canal non compatible).

## Behavior

- Les threads ne can be createds que in thes canaux text (pas en vocal or annonce).
- The bot doit avoir la permission `CREATE_PUBLIC_THREADS` or `CREATE_PRIVATE_THREADS`.
- Le thread est created like thread public default (visible par all).

## Examples

### Thread of support

```bdfd
$let[thread;$startThread[Support - $username;10080]]
$if[$thread!=]
  $channelSendMessage[$thread;Bienvenue in votre fil of support, $username ! A modérateur vous répondra bientôt.]
  $sendMessage[Fil of support created : <#$thread>]
$else
  $sendMessage[Impossible of create the thread. Permissions missinges.]
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

- Les threads archivés can be dé-archivés with `$editThread[]`.
- Les threads privates nécessitent `CREATE_PRIVATE_THREADS`.
- The name of the thread can be modified ultérieurement with `$editThread[]`.
