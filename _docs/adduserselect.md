---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addUserSelect

Creates a select menu of users. Allows users to choisir un or multiple members of the server since a list déroulante.

## Syntax

```
$addUserSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number of users to selectionner (default: 1) | No |
| `maxValues` | Maximum number of users to selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |

## Description

A **user select** displays a list members of the server. The user peut en selectionner un or several. The IDs of users selectionnés sont retournés in `$onInteraction`.

## Examples

### Selection of a user

```
$addUserSelect[menu_user;Choisissez un member]
$sendMessage[Selectionnez a user]
```

### Selection multiple

```
$addUserSelect[menu_mods;Choisissez modérateurs;1;5]
$sendMessage[Selectionnez 1 to 5 modérateurs]
```

### Disabled menu

```
$addUserSelect[menu_user_disabled;Selection désenablede;1;1;true]
$sendMessage[Ce menu est temporarily inavailable]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_user]
  $sendMessage[User selectionné : <@$message>]
$endif

$if[$customID==menu_mods]
  $sendMessage[Modérateurs selectionnés : $message]
$endif
```

## Notes

- Les values retournées sont of IDs of users Discord.
- Use `<@ID>` to mention the user in a message.
- For the selection multiple, les IDs sont separated by commas (or according to the configuration of the bot).
- A single select menu par action row.
