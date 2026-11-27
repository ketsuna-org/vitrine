---
layout: doc
title: $fromCharCode[]
translation_key: docs
category: "Math & Text"
function_name: fromCharCode
syntax: $fromCharCode[codes]
description: "Builds text from UTF-16 character codes."
---
# $fromCharCode — Builds text from UTF-16 character codes.

## Syntax

```
$fromCharCode[codes]
```

## Parameters

- **codes** *(number, required)* — One code per argument (or separated by `,`).

## Return Value

- string.

## Usage

```
$fromCharCode[72;105] → "Hi"
```

## Example

```bdfd
$sendMessage[$fromCharCode[72;105]]
```
