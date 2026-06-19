---
layout: doc
title: $isNSFW
translation_key: docs
category: "Math & Text"
function_name: isNSFW
syntax: $isNSFW[channelID]
description: Checks if a channel is marked as NSFW.
---

# $isNSFW

The function `$isNSFW[channelID]` **checks if a Discord channel is marked as NSFW** (Not Safe For Work).

## Syntax

```
$isNSFW[channelID]
```

Or without parameter for the current channel:

```
$isNSFW
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional - The ID of the channel. Default: channel where the command is executed. |

## Return Value

- **Type** : Boolean
- `true` if the channel is marked NSFW.
- `false` if the channel is not NSFW or is not found.

## Behavior

- Checks the `nsfw` attribute of the Discord channel.
- NSFW channels are restricted to users over 18 years old.
- Works only in servers (not in DM).

## Examples

### Restricted command

```bdfd
$if[$isNSFW==true]
  ;; Display NSFW content
  $sendMessage[🔞 NSFW content...]
$else
  $sendMessage[❌ This command can only be used in an NSFW channel.]
$endif
```

### Channel information

```bdfd
$title[📺 Channel information]
$description[
**Name:** $channelName
**ID:** $channelID
**NSFW:** $if[$isNSFW==true]🔞 Yes$else✅ No$endif
**Category:** $channelCategory
]
$sendMessage[]
```

### Check another channel

```bdfd
$var[channel;$message[1]]
$if[$isNSFW[$var[channel]]==true]
  $sendMessage[🔞 Channel <#$var[channel]> is NSFW.]
$else
  $sendMessage[✅ Channel <#$var[channel]> is not NSFW.]
$endif
```

## Notes

- Without parameter, checks the channel where the command is executed.
- In DM, the function always returns `false`.
- To modify the NSFW status of a channel, use `$modifyChannel[]`.
