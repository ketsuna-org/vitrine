---
layout: doc
title: $syncGuildTemplate[]
translation_key: docs
category: "Moderation"
function_name: syncGuildTemplate
syntax: $syncGuildTemplate[templatecode]
description: "Syncs this template to the current state of the guild, returns bool"
---
# $syncGuildTemplate — Syncs this template to the current state of the guild, returns bool

## Syntax

```
$syncGuildTemplate[templatecode]
```

## Parameters

- **templatecode** *(text, required)* — The code of the template to sync

## Return Value

- Boolean.

## Usage

```
$syncGuildTemplate[templatecode] → result
```

## Example

```bdfd
$sendMessage[$syncGuildTemplate[abc123]]
```
