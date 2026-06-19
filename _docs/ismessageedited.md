---
layout: doc
title: $isMessageEdited
translation_key: docs
category: "Entity Info"
function_name: isMessageEdited
syntax: $isMessageEdited
description: Checks if the message déclencheur was édité. Returns "true" or "false".
---

# $isMessageEdited

The function `$isMessageEdited` vérifie si the message déclencheur was **édité** par son auteur. Elle retourne `"true"` or `"false"`.

## Syntax

```
$isMessageEdited
```

## Parameters

Aucun parameter.

## Return Value

| Type | Description |
|---|---|
| `string` | `"true"` si the message was édité, `"false"` otherwise. |

## Examples

### Vérification simple

```bdfd
$if[$isMessageEdited==true]
  $sendMessage[⚠️ This message was modified.]
$else
  $sendMessage[Message original.]
$endif
```

### Log d'édition

```bdfd
$if[$isMessageEdited==true]
  $channelSendMessage[$channelIDFromName[logs];$username a édité son message $messageURL]
$endif
$sendMessage[Command executed.]
```

### Avertissement user

```bdfd
$if[$isMessageEdited==true]
  $sendMessage[Warning: votre command provient of a message édité.]
  $stop
$endif
```

## Notes

- Returns ae string `"true"` or `"false"`, pas un boolean.
- Pour obtenir la date d'édition, utilisez `$messageEditedTimestamp`.
- Utile pour détecter if ae command was modifiede after envoi.
