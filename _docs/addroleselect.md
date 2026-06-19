---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addRoleSelect

Creates a select menu of roles. Allows users to choisir un or multipthe roles of the server since a list déroulante.

## Syntax

```
$addRoleSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number of roles to selectionner (default: 1) | No |
| `maxValues` | Maximum number of roles to selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |

## Description

A **role select** displays la list of roles of the server. The user peut en selectionner un or several. The IDs of roles selectionnés sont retournés in `$onInteraction`.

Idéal for systèmes of self-roles, la selection of départements, or les menus of notification.

## Examples

### Attributeion of role

```
$addRoleSelect[menu_role;Choisissez votre role]
$sendMessage[Selectionnez votre role principal]
```

### Self-roles multiple

```
$addRoleSelect[menu_notifs;Notifications;1;3]
$sendMessage[Choisissez les notifications to recevoir]
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

- Les values retournées sont of IDs of roles Discord.
- Use `<@&ID>` to mention a role.
- Seuls les roles only the bot peut gérer apparaîtront (hiérarchie of roles).
- Parfait for systèmes of self-roles and menus of inscription.
