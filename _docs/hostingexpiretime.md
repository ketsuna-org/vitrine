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
- Can be formatted with `$formatDate[]`.

## Behavior

- Returns the date until which the paid hosting is active.
- Free bots may not have an expiration date.
- Automatically updates after renewal.

## Examples

### Formatted display

```bdfd
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $sendMessage[✅ Free hosting - no expiration.]
$else
  $sendMessage[📅 **Hosting:**
  > Expires on $formatDate[$var[expire];DD/MM/YYYY at HH:mm]
  > Remaining days: $dateDiff[$var[expire]] days]
$endif
```

### Owner alert

```bdfd
$var[expire;$hostingExpireTime]
$if[$var[expire]==]
  $stop
$endif

$var[days;$dateDiff[$var[expire]]]
$if[$var[days]<=3]
  $sendDM[$botOwnerID;🚨 **URGENT** - Hosting for **$botName** expires in $var[days] days!]
$elseif[$var[days]<=7]
  $sendDM[$botOwnerID;⚠️ Hosting for **$botName** expires in $var[days] days.]
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
  $addField[📅 Hosting;Expires on $formatDate[$var[expire];DD/MM/YYYY];yes]
$endif
$addField[💎 Premium;$if[$premiumExpireTime==]No$elseExpires $premiumExpireTime$endif;yes]
$color[$if[$var[expire]==]#57F287$else#FEE75C$endif]
$sendMessage[]
```

## Notes

- If the hosting is free, the function may return an empty string.
- Use `$dateDiff[$hostingExpireTime]` to get the remaining days.
- For premium status, use `$premiumExpireTime`.
- Returned values are in UTC.
