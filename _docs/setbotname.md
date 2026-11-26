---
layout: doc
title: $setBotName[]
translation_key: docs
category: "Moderation"
function_name: setBotName
syntax: $setBotName[name]
description: "Sets the bot name."
---
# $setBotName — Sets the bot name.

## Syntax

```
$setBotName[name]
```

## Parameters

- **name** *(text, required)* — The new name

## Return Value

- Boolean.

## Usage

```
$setBotName[name] → result
```

## Example

```bdfd
$setBotName[Robo]
$sendMessage[Done]
```
