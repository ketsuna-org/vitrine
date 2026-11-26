---
layout: doc
title: $os[]
translation_key: docs
category: "Meta"
function_name: os
syntax: $os
description: "Operating system of the bot's process (linux, windows, android, macos...)."
---
# $os — Returns the operating system name

## Syntax

```
$os
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$os → result
```

## Example

```bdfd
$sendMessage[$os]
```

## Notes

- Only the bot's own process is described. Total memory, processor model, load, network addresses and host names of the machine are never given, because several bots can share a machine.
