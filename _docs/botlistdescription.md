---
layout: doc
title: $botListDescription
translation_key: docs
category: "Entity Info"
function_name: botListDescription
syntax: $botListDescription[text]
description: Sets or returns the description of the bot displayede in the list bots BDFD.
---

# $botListDescription

The `$botListDescription[text]` function **définit or returns the description of the bot** telle qu'elle apparaît on the list public bots BDFD (bot list).

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
- Si called with parameter : rien (la description est mise to day).

## Behavior

- La description est visible on the page public of the bot in the BDFD Bot List.
- Limit of becauseactères : generally 200-300 becauseactères.
- Le markdown basique can be supporté according to the list.

## Examples

### Définir la description

```bdfd
$var[desc;$message[1]]
$if[$var[desc]==]
  $sendMessage[❌ Usage: !setdesc <description>]
  $stop
$endif

$botListDescription[$var[desc]]
$sendMessage[✅ Description of the bot mise to day !]
```

### Display la description currentle

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
  $sendEphemeral[❌ Réservé to the owner.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==set]
  $botListDescription[$message[2]]
  $sendMessage[✅ Description mise to day.]
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
- Pour hide the bot of la list, use `$botListHide`.
- La mise to day peut prendre quelques minutes before of être visible.
