---
layout: doc
title: $ram[]
translation_key: docs
category: "Meta"
function_name: ram
syntax: $ram
description: "Memory used by the bot's own process, in MB (never the memory of the machine hosting it)."
---
# $ram — Returns the current ram usage in MB

## Syntax

```
$ram
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$ram → result
```

## Example

```bdfd
$sendMessage[$ram]
```

## Notes

- Only the bot's own process is described. Total memory, processor model, load, network addresses and host names of the machine are never given, because several bots can share a machine.
