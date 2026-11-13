---
layout: doc
title: $replySuccess[]
translation_key: docs
category: "Embed & Message"
function_name: replySuccess
syntax: $replySuccess[text;(ephemeral)]
description: "A success message as a styled embed (✅, color `#57F287`). `$error` is already used by the engine, hence these names."
---
# $replySuccess — A success message as a styled embed (✅, color `#57F287`)

## Syntax

```
$replySuccess[text;(ephemeral)]
```

## Parameters

- **text** *(text, required)* — The message, up to 4000 characters.
- **ephemeral** *(`yes` or `no`, optional)* — `yes`: only the member sees it. Default: `no`.

## Return Value

- empty.

## Usage

```
$replySuccess[Done!]
```

## Example

```bdfd
$replySuccess[Done!]
```
