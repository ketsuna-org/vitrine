---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addUserSelect

Adds a select menu of users to the response message. The user can choose one or several users.

## Syntax

```text
$addUserSelect[customId;(placeholder);(minValues);(maxValues);(disabled);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom ID that identifies the menu when it is used (1 to 100 characters). | Yes |
| `placeholder` | Text displayed when nothing is selected. | No |
| `minValues` | Minimum number of users to select, integer from 0 to 25 (default: 1, also when empty). | No |
| `maxValues` | Maximum number of users to select, integer from 1 to 25 (default: 1, also when empty). It must not be lower than `minValues` (`Minimum cannot exceed maximum.`). | No |
| `disabled` | `yes`/`true` to disable the menu, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). The menu is added to that message instead of the response being built. | No |

## Description

The selected user IDs are read, in the script run for the interaction, with `$getUserSelectUserID[index]`, `$getUserSelectUserIDs[separator;(limit)]` and `$getUserSelectUserCount`.

The menu always gets its own action row, and a message holds at most 5 rows (`A message supports at most 5 component rows.`). Do not write `$addActionRow` before a select menu: the empty row it creates stays in the message and the response fails with `Invalid component row size.`

The menu belongs to the **response message** of the script (the text written in the script and the embed functions), not to a message sent with `$sendMessage[]`.

## Examples

### Selection of a user

```bdfd
Select a user
$addUserSelect[menu_user;Choose a member]
```

### Multiple selection

```bdfd
Select 1 to 5 moderators
$addUserSelect[menu_mods;Choose moderators;1;5]
```

### Disabled menu

```bdfd
This menu is temporarily unavailable
$addUserSelect[menu_user_disabled;Selection disabled;1;1;yes]
```

## Handling the interaction

The script run when the menu is used reads the choice and identifies the menu with `$customID`:

```bdfd
$if[$customID==menu_user]
  Selected user: <@$getUserSelectUserID[1]>
$endif

$if[$customID==menu_mods]
  Selected moderators: $getUserSelectUserIDs[, ]
$endif
```

## Notes

- The values are Discord user IDs; use `<@ID>` to mention a user.
- `$getUserSelectUserIDs[separator;(limit)]` joins the IDs with the separator you give.
- A single select menu per action row.
