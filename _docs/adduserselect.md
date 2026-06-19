---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addUserSelect

Creates a select menu d'users. Allows users to choisir un or multiple members of the server since a list déroulante.

## Syntax

```
$addUserSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number d'users à selectionner (default: 1) | No |
| `maxValues` | Maximum number d'users à selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |

## Description

A **user select** displays a list des members of the server. The user peut en selectionner un or several. The IDs of users selectionnés sont retournés dans `$onInteraction`.

## Examples

### Selection of a user

```
$addUserSelect[menu_user;Choisissez un member]
$sendMessage[Selectionnez a user]
```

### Selection multiple

```
$addUserSelect[menu_mods;Choisissez des modérateurs;1;5]
$sendMessage[Selectionnez 1 à 5 modérateurs]
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

- Les values retournées sont of IDs d'users Discord.
- Use `<@ID>` to mention the user in a message.
- For the selection multiple, les IDs sont separated by commas (or selon la configuration of the bot).
- A single select menu par action row.
