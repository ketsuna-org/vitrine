---
layout: doc
title: $isNewAccount[]
translation_key: docs
category: "Server Helpers"
function_name: isNewAccount
syntax: $isNewAccount[userID;(days)]
description: "Tells whether an account is younger than a number of days. Anti-raid guard."
---
# $isNewAccount — Tells whether an account is younger than a number of days

## Syntax

```
$isNewAccount[userID;(days)]
```

## Parameters

- **userID** *(ID, required)* — The user.
- **days** *(number, optional)* — Default: 7.

## Return Value

- `true` or `false`.

## Usage

```
$onlyIf[$isNewAccount[$authorID;3]==false;Your account is too new.]
```

## Example

```bdfd
$sendMessage[$onlyIf[$isNewAccount[$authorID;3]==false;Your account is too new.]]
```
