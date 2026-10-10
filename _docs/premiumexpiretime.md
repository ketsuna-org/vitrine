---
layout: doc
title: $premiumExpireTime
translation_key: docs
category: "Entity Info"
function_name: premiumExpireTime
syntax: $premiumExpireTime[(unused)]
description: Returns the premium expiration value supplied by the host in premium.expireTime, or an empty string.
---

# $premiumExpireTime

The `$premiumExpireTime` function returns the value of the `premium.expireTime` context variable supplied by the host. The engine does not look up any subscription itself.

## Syntax

```
$premiumExpireTime[(unused)]
```

## Parameters

One optional argument is accepted but ignored.

## Return Value

- **Type**: String
- The text of the `premium.expireTime` (or `premium.expiretime`) context variable exactly as the host supplied it; its format is not defined by the engine.
- Empty string if the host supplied none.

## Behavior

- The value is returned unchanged: the engine does not parse, convert or format it.

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

- An empty string means the host supplied no value.
- For hosting, use `$hostingExpireTime`.
