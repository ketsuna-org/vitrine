---
layout: doc
title: $editMentionableSelectMenu[]
translation_key: docs
category: "Components & Interactions"
function_name: editMentionableSelectMenu
syntax: $editMentionableSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles/users...)]
description: "Edits a mentionable select menu"
---
# $editMentionableSelectMenu — Edits a mentionable select menu

## Syntax

```
$editMentionableSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles/users...)]
```

## Parameters

- **oldcustomID** *(id, required)* — The custom id of the menu to edit
- **newcustomID** *(id, required)* — The new custom id to use for this menu
- **placeholder** *(text, optional)* — The placeholder to use for the menu
- **disabled** *(boolean, optional)* — Whether to keep this menu disabled
- **minvalues** *(number, optional)* — The min values to choose for the menu
- **maxvalues** *(number, optional)* — The max values to choose for the menu
- **defaultroles/users...** *(text, optional)* — The default selected roles or users to use

## Return Value

- String.

## Usage

```
$editMentionableSelectMenu[oldcustomID;newcustomID;(placeholder);(disabled);(minvalues);(maxvalues);(defaultroles/users...)] → result
```

## Example

```bdfd
$addMentionableSelectMenu[m]$editMentionableSelectMenu[m;m2;Who;false;1;1;user:20,role:70]
```
