---
layout: doc
title: $setNickname
translation_key: docs
category: "Moderation"
function_name: setNickname
syntax: $setNickname[nickname;(userID)]
description: Modifies the pseudo (nickname) of a user on the server.
---

# $setNickname

The function `$setNickname` **modifie le pseudo (surnom)** of a user on the server Discord. The pseudo est propre to each server and n'affecte pas the name of user global. The bot doit avoir la permission `ManageNicknames`.

## Syntax

```
$setNickname[nickname;(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `nickname` | Le new pseudo to appliquer. Required. Laisser vide pour réinitialiser le pseudo. |
| `userID` | Optional. The ID of the user cible. Si omitted, vise the user mentionné. |

## Return Value

Aucune. The pseudo est modified.

## Examples

### Changement simple

```bdfd
$setNickname[Gentil Member;$mentioned[1]]
$sendMessage[Pseudo of <@$mentioned[1]> changé en "Gentil Member".]
```

### Réinitialiser le pseudo

```bdfd
$setNickname[;$mentioned[1]]
$sendMessage[Pseudo of <@$mentioned[1]> réinitialisé.]
```

### Command of modération

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !nick <@mention> <new pseudo>]
  $stop
$endif

$setNickname[$replaceText[$message;-;$mentioned[1];];$mentioned[1]]
$sendMessage[✅ Pseudo modified.]
```

### Attributeion of un pseudo with préfixe

```bdfd
$setNickname[[Member] $username;$mentioned[1]]
$sendMessage[Pseudo formatted appliqué.]
```

## Notes

- The bot doit avoir la permission `ManageNicknames`.
- The bot ne peut pas modifier le pseudo of a user ayant un role supérieur to the sien.
- Pour changer the name of user global of the bot, utilisez `$changeUsername`.
- Laisser `nickname` vide réinitialise le pseudo to the nom of user default.
