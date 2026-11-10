---
layout: doc
title: $accountAge[]
translation_key: docs
category: "Server Helpers"
function_name: accountAge
syntax: $accountAge[userID;(unit)]
description: "Age of a Discord account, computed from the user ID (no request is made)."
---
# $accountAge — Age of a Discord account, computed from the user ID (no request is made)

## Syntax

```
$accountAge[userID;(unit)]
```

## Parameters

- **userID** *(ID, required)* — Any user ID.
- **unit** *(`y` `d` `h` `m` or `s`, optional)* — Whole units elapsed. Default: `d` (days). A year is 365 days.

## Return Value

- number.

## Usage

```
$accountAge[$authorID] → "1204"
```

## Example

```bdfd
$sendMessage[$accountAge[$authorID]]
```
