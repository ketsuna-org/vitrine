---
layout: doc
title: $serverFeatures[]
translation_key: docs
category: "Entity Info"
function_name: serverFeatures
syntax: $serverFeatures[(unused)]
description: Returns the server features list supplied by the host in the guild.features context variable, or an empty string.
---

# $serverFeatures[] — Server Features

`$serverFeatures[]` returns the text of the `guild.features` context variable supplied by the host. The engine does not query Discord for the features and does not know their names.

## Syntax

```
$serverFeatures[(unused)]
```

## Parameters

One optional argument is accepted but ignored: the features of another server cannot be read.

## Return Value

- **Type**: `string`
- The text of `guild.features` as supplied by the host; when the bot runner builds it, it is the list of feature codes of the current server joined with commas (for example `COMMUNITY,NEWS`).
- Empty string if the host supplied none.

## Examples

### Display features

```bdfd
$sendMessage[🛠️ Active Features: $serverFeatures]
```

### Detect a feature

```bdfd
$if[$checkContains[$serverFeatures;COMMUNITY]==true]
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
```

### Multiple checks

```bdfd
$var[features;$serverFeatures]
$if[$checkContains[$var[features];NEWS]==true]
  $sendMessage[📢 Announcement channels enabled]
$endif
$if[$checkContains[$var[features];VANITY_URL]==true]
  $sendMessage[🔗 Custom URL: discord.gg/$serverVanityURL]
$endif
$if[$checkContains[$var[features];ANIMATED_ICON]==true]
  $sendMessage[🎬 Animated icon available]
$endif
```

## Notes

- The features list is returned as a single string, not an array.
- Use `$checkContains[]` to check the presence of a specific feature; the comparison is case-sensitive.
- The feature codes used in the examples (`COMMUNITY`, `NEWS`, `VANITY_URL`, `ANIMATED_ICON`) are the codes Discord uses; the engine itself does not validate them.
