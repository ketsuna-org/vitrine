---
layout: doc
title: $logQuota
translation_key: docs
category: "Flags & Debug"
function_name: logQuota
syntax: $logQuota
description: Displays information on the remaining log quota for the BDFD application. Useful for monitoring consumption.
---
# $logQuota

The function `$logQuota` returns the **log quota information** of your BDFD application.

## Syntax

```
$logQuota
```

## Parameters

None.

## Return Value

- **Type** : String / Number
- The number of remaining logs or the percentage of used quota.

## Behavior

- Returns log consumption statistics.
- Useful for monitoring if you are approaching your plan's limit.
- The exact value depends on the BDFD plan (free, premium, etc.).

## Examples

### Display the quota

```bdfd
$sendMessage[Logs remaining: $logQuota]
```

### Low quota alert

```bdfd
$if[$logQuota<100]
  $sendMessage[⚠️ Warning: low log quota ($logQuota remaining).]
$else
  $sendMessage[Logs remaining: $logQuota]
$endif
```

### Admin dashboard

```bdfd
$title[📊 Bot Status]
$description[
**Logs Remaining**: $logQuota
**RAM Used**: $ram
**Uptime**: $uptime
]
$color[#FEE75C]
$sendMessage[]
```

## Notes

- The log quota varies according to your BDFD subscription.
- Every `$log[]` call consumes a log.
- Monitor your quota to avoid losing logs in production.

