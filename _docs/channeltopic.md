---
layout: doc
title: $channelTopic
translation_key: docs
category: "Entity Info"
function_name: channelTopic
syntax: $channelTopic[(channelID)]
description: Returns the topic of a Discord text channel.
---

# $channelTopic

The `$channelTopic` function returns the **topic** of a Discord text channel. The topic is the text displayed at the top of the channel, generally used to describe its purpose.

## Syntax

```
$channelTopic[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return value

| Type | Description |
|---|---|
| `string` | The topic of the channel. Returns an empty string if no topic is set or if the channel is not a text channel. |

## Examples

### Display the topic

```bdfd
$sendMessage[**Channel Topic:** $channelTopic]
```

### Check if a topic exists

```bdfd
$if[$channelTopic!=]
  $sendMessage[Topic: $channelTopic]
$else
  $sendMessage[This channel does not have a topic.]
$endif
```

### Topic in an embed

```bdfd
$title[#$channelName]
$description[Topic: $channelTopic]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Only works for channels of type `text` and `news`.
- For voice channels, categories, etc., the function returns an empty string.
- Maximum length of a topic is 1024 characters.
