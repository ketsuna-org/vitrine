---
layout: doc
title: $premiumExpireTime
translation_key: docs
category: "Entity Info"
function_name: premiumExpireTime
syntax: $premiumExpireTime
description: Returns the expiration date of the bot's BDFD premium subscription.
---

# $premiumExpireTime

The `$premiumExpireTime` function **returns the expiration date of the bot's BDFD premium subscription**. Premium unlocks advanced features (more commands, more servers, etc.).

## Syntax

```
$premiumExpireTime
```

## Parameters

None.

## Return Value

- **Type**: String
- Expiration date in timestamp format if the bot is premium.
- Empty string if the bot has no premium subscription.

## Behavior

- Returns a date only if a premium subscription is active.
- After expiration, premium features are disabled.
- The format is an ISO 8601 timestamp.

## Examples

### Status check

```bdfd
$var[premium;$premiumExpireTime]
$if[$var[premium]==]
  $sendMessage[❌ This bot has no active premium subscription.]
$else
  $var[days;$dateDiff[$var[premium]]]
  $sendMessage[💎 **Premium active!**
  > Expires on: $formatDate[$var[premium];DD/MM/YYYY]
  > Days remaining: $var[days] days]
$endif
```

### Renewal alert

```bdfd
$var[premium;$premiumExpireTime]
$if[$var[premium]==]
  $stop
$endif

$var[days;$dateDiff[$var[premium]]]
$if[$var[days]<=3]
  $sendDM[$botOwnerID;🚨 **$botName Premium** expires in $var[days] days! Remember to renew.]
$endif
```

### Owner dashboard

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Reserved for the owner.]
  $stop
$endif

$title[📊 $botName Dashboard]
$addField[🟢 Status;Online;yes]
$addField[📅 Hosting;$if[$hostingExpireTime==]Free$else$hostingExpireTime$endif;yes]
$addField[💎 Premium;$if[$premiumExpireTime==]❌ None$elseExpires $formatDate[$premiumExpireTime;DD/MM/YYYY]$endif;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📝 Language;$scriptLanguage;yes]
$color[$if[$premiumExpireTime==]#ED4245$else#57F287$endif]
$sendMessage[]
```

## Notes

- Empty string = no premium.
- For hosting, use `$hostingExpireTime`.
- BDFD premium offers: more commands, more servers, excludedsive features.
- `$dateDiff[$premiumExpireTime]` returns the number of days remaining.
