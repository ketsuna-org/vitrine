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

The function `$setNickname` **modifie le pseudo (surnom)** of a user on the server Discord. The pseudo est propre à each server and n'affecte pas the name d'user global. The bot doit avoir la permission `ManageNicknames`.

## Syntax

```
$setNickname[nickname;(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `nickname` | Le new pseudo à appliquer. Required. Laisser vide pour réinitialiser le pseudo. |
| `userID` | Optional. The ID of the user cible. Si omis, vise the user mentionné. |

## Return Value

Aucune. The pseudo est modified.

## Examples

### Changement simple

```bdfd
$setNickname[Gentil Member;$mentioned[1]]
$sendMessage[Pseudo de <@$mentioned[1]> changé en "Gentil Member".]
```

### Réinitialiser le pseudo

```bdfd
$setNickname[;$mentioned[1]]
$sendMessage[Pseudo de <@$mentioned[1]> réinitialisé.]
```

### Command de modération

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !nick <@mention> <new pseudo>]
  $stop
$endif

$setNickname[$replaceText[$message;-;$mentioned[1];];$mentioned[1]]
$sendMessage[✅ Pseudo modified.]
```

### Attributeion d'un pseudo avec préfixe

```bdfd
$setNickname[[Member] $username;$mentioned[1]]
$sendMessage[Pseudo formatted appliqué.]
```

## Notes

- The bot doit avoir la permission `ManageNicknames`.
- The bot ne peut pas modifier le pseudo of a user ayant un role supérieur au sien.
- Pour changer the name d'user global of the bot, utilisez `$changeUsername`.
- Laisser `nickname` vide réinitialise le pseudo au nom d'user default.
