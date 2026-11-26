---
layout: doc
title: $setVolume[]
translation_key: docs
category: "Music"
function_name: setVolume
syntax: $setVolume[amount]
description: "Sets the volume (0 to 200)."
---
# $setVolume — Sets the volume (0 to 200).

## Syntax

```
$setVolume[amount]
```

## Parameters

- **amount** *(Number, required)* — Volume

## Return Value

- None.

## Usage

```
$setVolume[amount] → result
```

## Example

```bdfd
$sendMessage[$setVolume[amount]]
```
