---
layout: doc
title: $unmute
translation_key: docs
category: "Moderation"
function_name: unmute
syntax: $unmute[userID]
description: Retire la sourdine of a user.
---

# $unmute

The function `$unmute` **retire la sourdine** of a user on the server Discord, lui permettant of parler to new in thes channels vocaux. The bot doit avoir la permission `MuteMembers`.

## Syntax

```
$unmute[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to réactiver. Required. |

## Return Value

Aucune. The user peut of new parler en vocal.

## Examples

### Réactivation simple

```bdfd
$unmute[$mentioned[1]]
$sendMessage[🔊 <@$mentioned[1]> peut of new parler !]
```

### Réactivation conditionnelle

```bdfd
$if[$isAdmin==true]
  $unmute[$mentioned[1]]
  $sendMessage[Member réenabled en vocal.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- The bot doit avoir la permission `MuteMembers`.
- N'a of effet que si the user est currentlement muet.
- Pour retirer un timeout (silence textuel and vocal temporary), utilisez `$unTimeout`.
