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

The argument is required: `$isNSFW` without brackets is refused ("Invalid argument count"). To test the current channel pass `$channelID`, or use `$channelNSFW`, whose argument is optional.

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required, exactly one argument. A positive integer channel ID, otherwise the error "Invalid channel ID." is raised. |

## Return Value

- **Type** : Boolean
- `"true"` if the channel is marked NSFW.
- `"false"` if the channel is not NSFW, or is not a server channel (a DM channel).
- If no channel with this ID can be fetched, the command stops with the error "Channel not found."; the function does not return `false` in that case.

## Behavior

- Fetches the channel by ID from Discord and reads its `nsfw` attribute.
- Only server channels can be NSFW; any other channel (for example a DM) gives `false`.

## Examples

### Restricted command

```bdfd
$if[$isNSFW[$channelID]==true]
  $sendMessage[🔞 NSFW content...]
$else
  $sendMessage[❌ This command can only be used in an NSFW channel.]
$endif
```

### Channel information

```bdfd
$title[📺 Channel information]
$description[
**Name:** $channelName[$channelID]
**ID:** $channelID
**NSFW:** $if[$isNSFW[$channelID]==true;🔞 Yes;✅ No]
**Category:** $channelCategoryID[$channelID]
]
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

- To check the channel where the command is executed, pass `$channelID`.
- A DM channel gives `false`.
- To modify the NSFW status of a channel, use `$modifyChannel[]`.
