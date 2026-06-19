---
layout: doc
title: $channelExists
translation_key: docs
category: "Entity Info"
function_name: channelExists
syntax: $channelExists[channelID]
description: Checks if a channel Discord existe on the server. Returns "true" or "false".
---

# $channelExists

The `$channelExists` function vérifie if a **channel Discord existe** on the server from its ID. Utile pour s'assurer qu'a channel cible est toudays valid before d'interagir avec.

## Syntax

```
$channelExists[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel à vérifier. Required. |

## Return value

| Type | Description |
|---|---|
| `string` | `"true"` if the channel existe on the server, `"false"` otherwise. |

## Examples

### Vérification simple

```bdfd
$if[$channelExists[123456789012345678]==true]
  $sendMessage[The channel est valid.]
$else
  $sendMessage[The channel does not exist.]
$endif
```

### Vérifier before d'envoyer a message

```bdfd
$if[$channelExists[123456789012345678]==true]
  $channelSendMessage[123456789012345678;Message automatique]
$else
  $sendMessage[The channel de logs n'existe plus !]
$endif
```

## Notes

- La value retournée est a string `"true"` or `"false"`.
- Ne vérifie que les channels of the server courant.
- Utile in thes systèmes de logs or de configuration où les IDs sont stockés.
