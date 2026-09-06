---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addUserSelect

Creates a select menu of users. Allows users to choose one or multiple members of the server from a dropdown list.

## Syntax

```
$addUserSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when nothing is selected | Yes |
| `minValues` | Minimum number of users to select (default: 1) | No |
| `maxValues` | Maximum number of users to select (default: 1) | No |
| `disabled` | `true` to disable the menu, `false` (default) | No |

## Description

A **user select** displays a list of server members. The user can select one or several. The IDs of the selected users are returned in `$onInteraction`.

## Examples

### Selection of a user

```
$addUserSelect[menu_user;Choose a member]
$sendMessage[Select a user]
```

### Multiple selection

```
$addUserSelect[menu_mods;Choose moderators;1;5]
$sendMessage[Select 1 to 5 moderators]
```

### Disabled menu

```
$addUserSelect[menu_user_disabled;Selection disabled;1;1;true]
$sendMessage[This menu is temporarily unavailable]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_user]
  $sendMessage[Selected user: <@$message>]
$endif

$if[$customID==menu_mods]
  $sendMessage[Selected moderators: $message]
$endif
```

## Notes

- The returned values are Discord user IDs.
- Use `<@ID>` to mention the user in a message.
- For multiple selection, the IDs are separated by commas (or according to the configuration of the bot).
- A single select menu per action row.
