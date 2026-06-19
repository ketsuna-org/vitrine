---
layout: doc
title: $editThread
translation_key: docs
category: "Moderation"
function_name: editThread
syntax: $editThread[threadID;name;(archived);(locked);(autoArchiveDuration)]
description: "Modifies thes propertys of un fil of discussion existing : nom, status of archivage, verrouillage and durée of archivage automatique."
---

# $editThread

The `$editThread[]` function **modifier les propertys of un thread** existing : nom, archivage, verrouillage and durée of archivage.

## Syntax

```
$editThread[threadID;name;(archived);(locked);(autoArchiveDuration)]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread to modify. |
| `name` | New nom of the thread (1 to 100 becauseactères). |
| `archived` | Optional - `true` pour archiver, `false` pour désarchiver. |
| `locked` | Optional - `true` pour verrouiller, `false` pour déverrouiller. |
| `autoArchiveDuration` | Optional - New durée : 60, 1440, 4320 or 10080 minutes. |

## Return value

Cette function does not return a value.

## Behavior

- The bot must have the permission `MANAGE_THREADS`.
- L'archivage cache le thread of la list threads actifs.
- Le verrouillage empêche les newx messages in the thread.

## Examples

### Fermer un thread of support

```bdfd
$editThread[$threadID;[$resolved] Support;true;true]
$channelSendMessage[$threadID;Ce thread has been marqué like resolved and verrouillé.]
$sendMessage[Thread fermé.]
```

### Désarchiver un thread

```bdfd
$editThread[$threadID;Support actif;false;false;10080]
$channelSendMessage[$threadID;Thread réouvert pour discussion.]
```

### Renommer according to the sujet

```bdfd
$let[newName;[FAQ] $noMentionMessage]
$editThread[$threadID;$newName]
$sendMessage[Thread renommé en : $newName]
```

## Notes

- Un thread archivé cannot recevoir of newx messages tant qu'il is not désarchivé.
- Les threads verrouillés can be déverrouillés with `locked=false`.
- The duration of archivage is ignorede if the thread est déjà archivé manually.
