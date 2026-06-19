---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addRoleSelect

Creates a select menu of roles. Allows users to choose one or multiple roles on the server from a dropdown list.

## Syntax

```
$addRoleSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when nothing is selected | Yes |
| `minValues` | Minimum number of roles to select (default: 1) | No |
| `maxValues` | Maximum number of roles to select (default: 1) | No |
| `disabled` | `true` to disable the menu, `false` (default) | No |

## Description

A **role select** displays the list of roles on the server. The user can select one or several. The IDs of the selected roles are returned in `$onInteraction`.

Ideal for self-role systems, department selection, or notification menus.

## Examples

### Role assignment

```
$addRoleSelect[menu_role;Choose your role]
$sendMessage[Select your main role]
```

### Multiple self-roles

```
$addRoleSelect[menu_notifs;Notifications;1;3]
$sendMessage[Choose the notifications to receive]
```

### Disabled menu

```
$addRoleSelect[menu_role_disabled;Selection closed;1;1;true]
$sendMessage[Registrations are closed]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_role]
  $giveRole[$authorID;$message]
  $sendMessage[You have received the role <@&$message>!]
$endif
```

## Notes

- The returned values are Discord role IDs.
- Use `<@&ID>` to mention a role.
- Only the roles that the bot can manage will appear (role hierarchy).
- Perfect for self-role systems and registration menus.

