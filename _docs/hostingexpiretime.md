---
layout: doc
title: $hostingExpireTime
translation_key: docs
category: "Entity Info"
function_name: hostingExpireTime
syntax: $hostingExpireTime
description: Returns the expiration date of the bot's hosting.
---

# $hostingExpireTime

The `$hostingExpireTime` function **returns the expiration date of the bot's hosting** on the BDFD platform. After this date, the bot will stop running if hosting is not renewed.

## Syntax

```
$hostingExpireTime
```

## Parameters

None.

## Return Value

- **Type**: String
- The expiration date in timestamp format (e.g., `2026-12-31T23:59:59.000Z`).

## Behavior

- Returns the date until which the paid hosting is active.
- Free bots may not have an expiration date.
- Automatically updates after renewal.

## Examples

### Display

```bdfd
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $sendMessage[✅ Free hosting - no expiration.]
$else
  $sendMessage[📅 **Hosting:** expires on $var[expire]]
$endif
```

### Information page

```bdfd
$title[🤖 Status of $botName]
$addField[🟢 Status;Online;yes]
$addField[📦 Node;$botNode;yes]
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $addField[📅 Hosting;✅ Free / Unlimited;yes]
$else
  $addField[📅 Hosting;Expires on $var[expire];yes]
$endif
$var[premium;$premiumExpireTime]
$if[$var[premium]==]
  $addField[💎 Premium;No;yes]
$else
  $addField[💎 Premium;Expires on $var[premium];yes]
$endif
$color[#5865F2]
```

## Notes

- If the hosting is free, the function may return an empty string.
- For premium status, use `$premiumExpireTime`.
- Returned values are in UTC.
