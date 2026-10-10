---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addMentionableSelect

Adds a select menu that lists both users and roles to the response message.

## Syntax

```text
$addMentionableSelect[customId;(placeholder);(minValues);(maxValues);(disabled);(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom ID that identifies the menu when it is used (1 to 100 characters). | Yes |
| `placeholder` | Text displayed when nothing is selected. | No |
| `minValues` | Minimum number of users or roles to select, integer from 0 to 25 (default: 1, also when empty). | No |
| `maxValues` | Maximum number of users or roles to select, integer from 1 to 25 (default: 1, also when empty). It must not be lower than `minValues` (`Minimum cannot exceed maximum.`). | No |
| `disabled` | `yes`/`true` to disable the menu, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). The menu is added to that message instead of the response being built. | No |

## Description

The selected IDs are read, in the script run for the interaction, with `$getMentionableSelectUserID[index]`, `$getMentionableSelectUserIDs[separator;(limit)]` and `$getMentionableSelectUserCount`.

When the selection contains at least one user, these functions return **only the selected users**: the roles that were selected at the same time are not part of the list. When only roles are selected, they return the selected role IDs.

The menu always gets its own action row, and a message holds at most 5 rows (`A message supports at most 5 component rows.`). Do not write `$addActionRow` before a select menu: the empty row it creates stays in the message and the response fails with `Invalid component row size.`

The menu belongs to the **response message** of the script (the text written in the script and the embed functions), not to a message sent with `$sendMessage[]`.

## Examples

### Simple selection

```bdfd
Select a target
$addMentionableSelect[menu_mention;Choose a member or a role]
```

### Multiple selection

```bdfd
Select up to 10 targets
$addMentionableSelect[menu_targets;Multiple targets;1;10]
```

### Disabled menu

```bdfd
Menu disabled
$addMentionableSelect[menu_mention_off;Unavailable;1;1;yes]
```

## Handling the interaction

The script run when the menu is used reads the choice and identifies the menu with `$customID`:

```bdfd
$if[$customID==menu_mention]
  Selected: $getMentionableSelectUserIDs[, ]
$endif
```

## Notes

- Use `$roleExists[id]` to find out whether a returned ID is a role.
- A single select menu per action row.
