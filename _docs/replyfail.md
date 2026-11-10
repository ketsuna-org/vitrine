---
layout: doc
title: $replyFail[]
translation_key: docs
category: "Embed & Message"
function_name: replyFail
syntax: $replyFail[text;(ephemeral)]
description: "A failure message as a styled embed (❌, color `#ED4245`). `$error` is already used by the engine, hence these names."
---
# $replyFail — A failure message as a styled embed (❌, color `#ED4245`)

## Syntax

```
$replyFail[text;(ephemeral)]
```

## Parameters

- **text** *(text, required)* — The message, up to 4000 characters.
- **ephemeral** *(`yes` or `no`, optional)* — `yes`: only the member sees it. Default: `no`.

## Return Value

- empty.

## Usage

```
$replyFail[Done!]
```

## Example

```bdfd
$sendMessage[$replyFail[Done!]]
```
