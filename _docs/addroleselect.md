---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addRoleSelect

Creates a select menu de roles. Allows users to choisir un or multipthe roles of the server since a list déroulante.

## Syntax

```
$addRoleSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number of roles à selectionner (default: 1) | No |
| `maxValues` | Maximum number of roles à selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |

## Description

A **role select** displays la list of roles of the server. The user peut en selectionner un or several. The IDs of roles selectionnés sont retournés dans `$onInteraction`.

Idéal for systèmes de self-roles, la selection de départements, or les menus de notification.

## Examples

### Attributeion de role

```
$addRoleSelect[menu_role;Choisissez votre role]
$sendMessage[Selectionnez votre role principal]
```

### Self-roles multiple

```
$addRoleSelect[menu_notifs;Notifications;1;3]
$sendMessage[Choisissez les notifications à recevoir]
```

### Disabled menu

```
$addRoleSelect[menu_role_disabled;Selection fermée;1;1;true]
$sendMessage[Les inscriptions sont closes]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_role]
  $giveRole[$authorID;$message]
  $sendMessage[Vous avez received the role <@&$message> !]
$endif
```

## Notes

- Les values retournées sont of IDs de roles Discord.
- Use `<@&ID>` to mention a role.
- Seuls les roles only the bot peut gérer apparaîtront (hiérarchie of roles).
- Parfait for systèmes de self-roles and menus d'inscription.
