---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addMentionableSelect

Creates a select menu of mentionable entities. Allows users to choose between users and roles on the server.

## Syntax

```
$addMentionableSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when nothing is selected | Yes |
| `minValues` | Minimum number of entities to select (default: 1) | No |
| `maxValues` | Maximum number of entities to select (default: 1) | No |
| `disabled` | `true` to disable the menu, `false` (default) | No |

## Description

A **mentionable select** combines the selection of users and roles in a single menu. The user can choose either members or roles of the server.

The returned values are IDs. Use `$roleExists` to determine if an ID corresponds to a role or to a user.

## Examples

### Simple selection

```
$addMentionableSelect[menu_mention;Choose a member or a role]
$sendMessage[Select a target]
```

### Multiple selection

```
$addMentionableSelect[menu_targets;Multiple targets;1;10]
$sendMessage[Select up to 10 targets]
```

### Disabled menu

```
$addMentionableSelect[menu_mention_off;Unavailable;1;1;true]
$sendMessage[Menu disabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_mention]
  $if[$roleExists[$message]==true]
    $sendMessage[Selected role: <@&$message>]
  $else
    $sendMessage[Selected user: <@$message>]
  $endif
$endif
```

## Difference from UserSelect and RoleSelect

| Function | Selects |
|----------|-------------|
| `$addUserSelect` | Only users |
| `$addRoleSelect` | Only roles |
| `$addMentionableSelect` | Users AND roles |

## Notes

- Useful for moderation, giveaway, or permission system commands.
- Use `$roleExists` to distinguish roles and users in the returned values.
- A single select menu per action row.

