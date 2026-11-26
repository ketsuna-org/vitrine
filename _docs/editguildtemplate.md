---
layout: doc
title: $editGuildTemplate[]
translation_key: docs
category: "Moderation"
function_name: editGuildTemplate
syntax: $editGuildTemplate[templatecode;(name);(description)]
description: "Edits template on a guild, returns bool"
---
# $editGuildTemplate — Edits template on a guild, returns bool

## Syntax

```
$editGuildTemplate[templatecode;(name);(description)]
```

## Parameters

- **templatecode** *(text, required)* — The code of the template to edit
- **name** *(text, optional)* — The new name for the template
- **description** *(text, optional)* — The new description for the template

## Return Value

- Boolean.

## Usage

```
$editGuildTemplate[templatecode;(name);(description)] → result
```

## Example

```bdfd
$sendMessage[$editGuildTemplate[abc123;New name]]
```
