---
layout: doc
title: $mute
translation_key: docs
category: "Moderation"
function_name: mute
syntax: $mute[userID;(reason)]
description: Rend muet un user on the server.
---

# $mute

The function `$mute` **rend muet un user** on the server Discord. Cela l'empêche of parler in thes channels vocaux. The bot doit avoir la permission `MuteMembers`.

## Syntax

```
$mute[userID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to rendre muet. Required. |
| `reason` | Optional. The reason of la sourdine. |

## Return Value

Aucune. The user est rendu muet.

## Examples

### Mute simple

```bdfd
$mute[$mentioned[1];Spam vocal]
$sendMessage[<@$mentioned[1]> was rendu muet pour spam vocal.]
```

### Mute with command modération

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !mute <@mention> <reason>]
  $stop
$endif

$mute[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[🔇 <@$mentioned[1]> est now muet.]
```

### Vérification before mute

```bdfd
$if[$isAdmin==true]
  $mute[$mentioned[1];Non-respect règles vocales]
  $sendMessage[Member rendu muet.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- The bot doit avoir la permission `MuteMembers`.
- Le mute empêche of parler en vocal, pas of écrire in thes channels textuels.
- Pour empêcher l'envoi of messages, créez un role without permission of écriture and utilisez `$giveRole`.
- Pour retirer le mute, utilisez `$unmute`.
- Pour un silence temporary, utilisez `$timeout`.
