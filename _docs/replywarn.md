---
layout: doc
title: $replyWarn[]
translation_key: docs
category: "Embed & Message"
function_name: replyWarn
syntax: $replyWarn[text;(ephemeral)]
description: "A warning message as a styled embed (⚠️, color `#FEE75C`). `$error` is already used by the engine, hence these names."
---
# $replyWarn — A warning message as a styled embed (⚠️, color `#FEE75C`)

## Syntax

```
$replyWarn[text;(ephemeral)]
```

## Parameters

- **text** *(text, required)* — The message, up to 4000 characters.
- **ephemeral** *(`yes` or `no`, optional)* — `yes`: only the member sees it. Default: `no`.

## Return Value

- empty.

## Usage

```
$replyWarn[Done!]
```

## Example

```bdfd
$replyWarn[Done!]
```
