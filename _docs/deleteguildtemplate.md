---
layout: doc
title: $deleteGuildTemplate[]
translation_key: docs
category: "Moderation"
function_name: deleteGuildTemplate
syntax: $deleteGuildTemplate[templatecode]
description: "Deletes template from a guild, returns bool"
---
# $deleteGuildTemplate — Deletes template from a guild, returns bool

## Syntax

```
$deleteGuildTemplate[templatecode]
```

## Parameters

- **templatecode** *(text, required)* — The code of the template to delete

## Return Value

- Boolean.

## Usage

```
$deleteGuildTemplate[templatecode] → result
```

## Example

```bdfd
$sendMessage[$deleteGuildTemplate[abc123]]
```
