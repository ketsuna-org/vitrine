---
layout: doc
title: $dbPing[]
translation_key: docs
category: "Database"
function_name: dbPing
syntax: $dbPing[(full)]
description: "Returns the response time of the variable store in milliseconds."
---
# $dbPing — Returns the response time of the variable store in milliseconds.

## Syntax

```
$dbPing[(full)]
```

## Parameters

- **full** *(Boolean, optional)* — Accepted for compatibility

## Return Value

- Number.

## Usage

```
$dbPing[full] → result
```

## Example

```bdfd
$sendMessage[$dbPing[full]]
```
