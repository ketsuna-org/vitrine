---
layout: doc
title: $timeoutFor[]
translation_key: docs
category: "Server Helpers"
function_name: timeoutFor
syntax: $timeoutFor[userID;duration;(reason)]
description: "Times out a member for a written duration, with an optional reason in the audit log."
---
# $timeoutFor — Times out a member for a written duration, with an optional reason in the audit log

## Syntax

```
$timeoutFor[userID;duration;(reason)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **duration** *(text, required)* — `10m`, `2h`, `1d`, `1h30m`… up to 28 days (same syntax as `$parseDuration`).
- **reason** *(text, optional)* — Reason in the audit log.

## Return Value

- empty.

## Usage

```
$timeoutFor[$mentioned[1];10m;Spam]
```

## Example

```bdfd
$timeoutFor[$mentioned[1];10m;Spam]
$sendMessage[Member timed out.]
```
