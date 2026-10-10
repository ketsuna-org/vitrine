---
layout: doc
title: $hostingExpireTime
translation_key: docs
category: "Entity Info"
function_name: hostingExpireTime
syntax: $hostingExpireTime[(unused)]
description: Returns the hosting expiration value supplied by the host application, or an empty string.
---

# $hostingExpireTime

The `$hostingExpireTime` function returns the value of the `hosting.expireTime` context variable supplied by the host application. The engine does not compute or look up any hosting date itself.

## Syntax

```
$hostingExpireTime[(unused)]
```

## Parameters

| Parameter | Description |
|---|---|
| `unused` | Optional - accepted but ignored. |

## Return Value

- **Type**: String
- The text of the `hosting.expireTime` (or `hosting.expiretime`) context variable exactly as the host supplied it; its format is not defined by the engine.
- An empty string if the host supplied no such variable.

## Behavior

- The value is returned unchanged: the engine does not parse, convert or format it.

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

- The function returns an empty string when the host supplies no value.
- For the premium value, use `$premiumExpireTime`, which works the same way with `premium.expireTime`.
