---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addRoleSelect

Adds a select menu of the server's roles to the response message. The user can choose one or several roles.

## Syntax

```text
$addRoleSelect[customId;(placeholder);(minValues);(maxValues);(disabled);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom ID that identifies the menu when it is used (1 to 100 characters). | Yes |
| `placeholder` | Text displayed when nothing is selected. | No |
| `minValues` | Minimum number of roles to select, integer from 0 to 25 (default: 1, also when empty). | No |
| `maxValues` | Maximum number of roles to select, integer from 1 to 25 (default: 1, also when empty). It must not be lower than `minValues` (`Minimum cannot exceed maximum.`). | No |
| `disabled` | `yes`/`true` to disable the menu, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). The menu is added to that message instead of the response being built. | No |

## Description

The selected role IDs are read, in the script run for the interaction, with `$getRoleSelectRoleID[index]`, `$getRoleSelectRoleIDs[separator;(limit)]` and `$getRoleSelectRoleCount`.

The menu always gets its own action row, and a message holds at most 5 rows (`A message supports at most 5 component rows.`). Do not write `$addActionRow` before a select menu: the empty row it creates stays in the message and the response fails with `Invalid component row size.`

The menu belongs to the **response message** of the script (the text written in the script and the embed functions), not to a message sent with `$sendMessage[]`.

## Examples

### Role assignment

```bdfd
Select your main role
$addRoleSelect[menu_role;Choose your role]
```

### Multiple self-roles

```bdfd
Choose the notifications to receive
$addRoleSelect[menu_notifs;Notifications;1;3]
```

### Disabled menu

```bdfd
Registrations are closed
$addRoleSelect[menu_role_disabled;Selection closed;1;1;yes]
```

## Handling the interaction

The script run when the menu is used reads the choice and identifies the menu with `$customID`:

```bdfd
$if[$customID==menu_role]
  $giveRole[$authorID;$getRoleSelectRoleID[1]]
  You have received the role <@&$getRoleSelectRoleID[1]>!
$endif
```

## Notes

- The values are Discord role IDs; use `<@&ID>` to mention a role.
- A single select menu per action row.
