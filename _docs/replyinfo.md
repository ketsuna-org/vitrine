---
layout: doc
title: $replyInfo[]
translation_key: docs
category: "Embed & Message"
function_name: replyInfo
syntax: $replyInfo[text;(ephemeral)]
description: "A information message as a styled embed (ℹ️, color `#5865F2`). `$error` is already used by the engine, hence these names."
---
# $replyInfo — A information message as a styled embed (ℹ️, color `#5865F2`)

## Syntax

```
$replyInfo[text;(ephemeral)]
```

## Parameters

- **text** *(text, required)* — The message, up to 4000 characters.
- **ephemeral** *(`yes` or `no`, optional)* — `yes`: only the member sees it. Default: `no`.

## Return Value

- empty.

## Usage

```
$replyInfo[Done!]
```

## Example

```bdfd
$replyInfo[Done!]
```
