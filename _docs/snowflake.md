---
layout: doc
title: $snowflake[]
translation_key: docs
category: "Math & Text"
function_name: snowflake
syntax: $snowflake
description: "Generates a unique Discord snowflake."
---
# $snowflake — Generates a unique Discord snowflake.

## Syntax

```
$snowflake
```

## Parameters

None.

## Return Value

- string.

## Usage

```
$snowflake → "1234567890123456789"
```

## Example

```bdfd
$sendMessage[$snowflake]
```
