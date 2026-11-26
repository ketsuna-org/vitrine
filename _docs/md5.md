---
layout: doc
title: $md5[]
translation_key: docs
category: "Math & Text"
function_name: md5
syntax: $md5[text;(encoding)]
description: "MD5 digest of a text."
---
# $md5 — MD5 digest of a text.

## Syntax

```
$md5[text;(encoding)]
```

## Parameters

- **text** *(text, required)* — The text.
- **encoding** *(text, optional)* — hex (default) or base64.

## Return Value

- string.

## Usage

```
$md5[a] → "0cc175b9c0f1b6a831c399e269772661"
```

## Example

```bdfd
$sendMessage[$md5[a]]
```
