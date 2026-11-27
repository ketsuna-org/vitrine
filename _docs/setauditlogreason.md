---
layout: doc
title: $setAuditLogReason[]
translation_key: docs
category: "Moderation"
function_name: setAuditLogReason
syntax: $setAuditLogReason[reason]
description: "Sets the reason for audit log entries."
---
# $setAuditLogReason — Sets the reason for audit log entries.

## Syntax

```
$setAuditLogReason[reason]
```

## Parameters

- **reason** *(text, required)* — The reason to set

## Return Value

- string.

## Usage

```
$setAuditLogReason[reason] → result
```

## Example

```bdfd
$setAuditLogReason[Cleanup]
$sendMessage[Done]
```
