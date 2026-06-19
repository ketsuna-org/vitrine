---
layout: doc
title: $serverFeatures[]
translation_key: docs
category: "Entity Info"
function_name: serverFeatures
syntax: $serverFeatures
description: Returns the list of enabled premium features on the Discord server (partnership features, verification, experiments, etc.).
---

# $serverFeatures[] — Server Features

`$serverFeatures[]` returns the list of special features enabled on the Discord server. These "features" include partnership benefits, community server features, and experimental capabilities.

## Syntax

```
$serverFeatures
```

## Parameters

No parameters.

## Return Value

- **Type**: `string` (list)
- A string containing the codes of enabled features, separated by commas.

## Common Features

| Code | Description |
|------|-------------|
| `NEWS` | Announcement channel enabled |
| `VANITY_URL` | Custom invite URL |
| `ANIMATED_ICON` | Animated icon (boost level 1) |
| `BANNER` | Server banner (boost level 2) |
| `INVITE_SPLASH` | Custom invite splash image |
| `COMMUNITY` | Community server enabled |
| `DISCOVERABLE` | Server listed in Server Discovery |
| `MEMBER_VERIFICATION_GATE_ENABLED` | Rules screening screen enabled |
| `WELCOME_SCREEN_ENABLED` | Welcome screen enabled |
| `PREVIEW_ENABLED` | Server preview enabled before joining |
| `TICKETED_EVENTS_ENABLED` | Ticketed events enabled |
| `MONETIZATION_ENABLED` | Monetization enabled |
| `PRIVATE_THREADS` | Private threads enabled |
| `THREADS_ENABLED` | Threads enabled |

## Usage

### Display features

```bdfd
$sendMessage[🛠️ Active Features: $serverFeatures]
```

### Detect a feature

```bdfd
$if[$serverFeatures$contains[COMMUNITY]]
  $sendMessage[✅ This server is a community server.]
$else
  $sendMessage[ℹ️ This server is not configured as a community.]
$endif
```

### Diagnostic Embed

```bdfd
$title[🔍 Diagnostic — $serverName]
$addField[Features;$serverFeatures;yes]
$addField[Boost Level;$boostLevel;yes]
$addField[Members;$membersCount;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Multiple checks

```bdfd
$var[features;$serverFeatures]
$if[$var[features]$contains[NEWS]]
  $sendMessage[📢 Announcement channels enabled]
$endif
$if[$var[features]$contains[VANITY_URL]]
  $sendMessage[🔗 Custom URL: discord.gg/$serverVanityURL]
$endif
$if[$var[features]$contains[ANIMATED_ICON]]
  $sendMessage[🎬 Animated icon available]
$endif
```

## Notes

- The features list is returned as a single comma-separated string, not an array.
- Use `$contains[]` to check the presence of a specific feature.
- Available features depend on the boost level and the status of the server (e.g. partnered, verified).
- Some features can be enabled manually in the server settings (e.g. COMMUNITY).
