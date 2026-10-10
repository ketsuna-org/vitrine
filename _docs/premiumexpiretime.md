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
  $sendMessage[💎 **Premium active!**
  > Expires on: $var[premium]]
$endif
```

### Notify the owner

```bdfd
$if[$premiumExpireTime==]
  $stop
$endif

$dm[$botOwnerID]
$sendMessage[💎 **$botName Premium** expires on: $premiumExpireTime. Remember to renew.]
```

### Owner dashboard

```bdfd
$if[$authorID!=$botOwnerID]
  $ephemeral
  $sendMessage[❌ Reserved for the owner.]
  $stop
$endif

$if[$hostingExpireTime==]
  $var[hosting;Free]
$else
  $var[hosting;$hostingExpireTime]
$endif
$if[$premiumExpireTime==]
  $var[premium;❌ None]
  $color[#ED4245]
$else
  $var[premium;$premiumExpireTime]
  $color[#57F287]
$endif

$title[📊 $botName Dashboard]
$addField[🟢 Status;Online;yes]
$addField[📅 Hosting;$var[hosting];yes]
$addField[💎 Premium;$var[premium];yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📝 Language;$scriptLanguage;yes]
```

## Notes

- Empty string = no premium.
- For hosting, use `$hostingExpireTime`.
- BDFD premium offers: more commands, more servers, exclusive features.
- The value is the raw expiration timestamp provided by the host; `$premiumExpireTime` takes no processing.
