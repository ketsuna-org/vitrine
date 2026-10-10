---
layout: doc
title: $editSelectMenuOption
translation_key: docs
category: "Components & Interactions"
function_name: editSelectMenuOption
syntax: $editSelectMenuOption[menuId;label;value;description;(default);(emoji);(messageID)]
description: Modifies an individual option in an existing select menu.
---

# $editSelectMenuOption

The `$editSelectMenuOption[]` function **modifies an existing option** in a select menu.

## Syntax

```
$editSelectMenuOption[menuId;label;value;description;(default);(emoji);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `menuId` | Required. Custom ID of the parent select menu (1 to 100 characters). |
| `label` | Required. New text displayed for the option (1 to 100 characters). |
| `value` | Required. Value identifying the option to edit (1 to 100 characters). |
| `description` | Required argument, may be empty (0 to 100 characters). |
| `default` | *(Optional)* `yes`/`true` if the option is pre-selected; `no`/`false`/empty by default. Only one default option is allowed per menu. |
| `emoji` | *(Optional)* Emoji of the option (empty by default). |
| `messageID` | *(Optional)* ID of an existing message to edit. If omitted or empty, the response being built (or the string select of the modal being built) is edited. |

## Return value

An empty string. The option is modified (it is replaced entirely).

## Behavior

- The targeted option is identified by its `value` only (not by an index); if no option has this value, the error "Select option not found." is raised.
- The parent string select menu must exist, otherwise "Component <id> not found.".
- The label, description, default flag, and emoji of the option are all replaced.
- A menu supports at most 25 options.

## Examples

### Mark an option as selected

```bdfd
$editSelectMenuOption[langMenu;English;en;English language;true;🇬🇧]
```

### Update the label

```bdfd
$editSelectMenuOption[roleMenu;Moderator;mod;Moderation role;false;🛡️]
```

### Visually disable an option

```bdfd
$editSelectMenuOption[actionMenu;Unavailable;none;This option is no longer available;false;🚫]
```

## Notes

- Use with `$editSelectMenu[]` for a complete update of the menu.
- The `value` parameter is used to identify the target option.
- To add options, use `$addSelectMenuOption[]`.
