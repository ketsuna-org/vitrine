---
layout: doc
title: $editSelectMenuOption
translation_key: docs
category: "Components & Interactions"
function_name: editSelectMenuOption
syntax: $editSelectMenuOption[menuId;label;value;description;(default);(emoji);(messageID)]
description: Modifies an individual option in an existing string select menu.
---

# $editSelectMenuOption

The `$editSelectMenuOption[]` function **modifies an existing option** of a string select menu.

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
| `default` | *(Optional)* `yes`/`true` if the option is pre-selected; `no`/`false`/empty by default. Only one default option is allowed per menu ("Only one default option is supported."). |
| `emoji` | *(Optional)* Emoji of the option (empty by default). |
| `messageID` | *(Optional)* ID of an existing message sent by the bot (a positive integer). If omitted or empty, the menu is searched in the string select of the modal being built, then in the response being built and, in the script run for a click, in the clicked message. |

## Return value

An empty string. The option is modified (it is replaced entirely).

## Behavior

- The targeted option is identified by its `value` only (not by an index); if no option has this value, the error "Select option not found." is raised.
- The parent menu must be a string select menu that exists, otherwise "Component <id> not found.". If the modal being built contains a select menu with this custom ID, that modal select is edited instead (it must be of type `string`, otherwise "Only string selects take options.").
- **Without `messageID`**, the menu is first searched among the components added earlier in the same script. In the script run for a click on a button or a menu, if it is not there, **the clicked message is edited**.
- With `messageID`, the engine reads that message's components and applies the edit when the response is flushed. Only messages sent by the bot, in the current channel, can be edited (`Only bot-authored message components can be edited.`); an ephemeral message cannot be edited by its ID.
- **Components V2 messages can be edited**: the menu is found at any depth and the layout of the message is kept.
- The label, description, default flag, and emoji of the option are all replaced. The `value` itself cannot be changed.

## Examples

### Mark an option as selected

Workflow with the event `interactionCreate` and the custom ID filter (`customIdFilter`) `langMenu`: without `messageID`, the clicked message is edited. `$customID` only exists in the script run for the click, never in the slash command.

```bdfd
$editSelectMenuOption[langMenu;English;en;English language;yes;🇬🇧]
```

With a message ID:

```bdfd
$editSelectMenuOption[langMenu;English;en;English language;yes;🇬🇧;123456789012345678]
```

### Update the label

```bdfd
$editSelectMenuOption[roleMenu;Moderator;mod;Moderation role;no;🛡️;123456789012345678]
```

### Edit an option of the response being built

```bdfd
$newSelectMenu[actionMenu;1;1;Action]
$addSelectMenuOption[actionMenu;Old name;act;;no]
$editSelectMenuOption[actionMenu;New name;act;Renamed option;no]
Choose an action
```

## Notes

- Use with `$editSelectMenu[]` for a complete update of the menu.
- The `value` parameter is used to identify the target option.
- To add options, use `$addSelectMenuOption[]`; to remove one, `$removeSelectMenuOption`.
