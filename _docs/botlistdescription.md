---
layout: doc
title: $botListDescription
translation_key: docs
category: "Entity Info"
function_name: botListDescription
syntax: $botListDescription[text]
description: Sets or returns the description of the bot displayede in the list des bots BDFD.
---

# $botListDescription

The `$botListDescription[text]` function **définit or returns the description of the bot** telle qu'elle apparaît on the list public des bots BDFD (bot list).

## Syntax

```
$botListDescription[text]
```

Pour lire la description currentle :

```
$botListDescription
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Optional - La new description to set. If omitted, returns the description currentle. |

## Return value

- **Type** : String
- Si called without parameter : la description currentle.
- Si called avec parameter : rien (la description est mise à day).

## Behavior

- La description est visible sur the page public of the bot in the BDFD Bot List.
- Limit de becauseactères : generally 200-300 becauseactères.
- Le markdown basique can be supporté selon la list.

## Examples

### Définir la description

```bdfd
$var[desc;$message[1]]
$if[$var[desc]==]
  $sendMessage[❌ Usage: !setdesc <description>]
  $stop
$endif

$botListDescription[$var[desc]]
$sendMessage[✅ Description of the bot mise à day !]
```

### Afficher la description currentle

```bdfd
$title[📋 Description of the bot]
$description[
$botListDescription
]
$footer[Use !setdesc to modify]
$sendMessage[]
```

### Command owner to manage la visibilité

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé au owner.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==set]
  $botListDescription[$message[2]]
  $sendMessage[✅ Description mise à day.]
$elseif[$var[action]==show]
  $sendMessage[📋 **Description currentle :**
  $botListDescription]
$else
  $sendMessage[❌ Usage: !botlist <set|show> [description]]
$endif
```

## Notes

- Without parameter, la function returns the description currentle.
- Avec parameter, elle écrase la description previouse.
- Pour masquer the bot de la list, use `$botListHide`.
- La mise à day peut prendre quelques minutes before d'être visible.
