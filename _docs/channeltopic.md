---
layout: doc
title: $channelTopic
translation_key: docs
category: "Entity Info"
function_name: channelTopic
syntax: $channelTopic
description: Returns the topic of the current Discord channel.
---

# $channelTopic

The `$channelTopic` function returns the **topic** of the channel where the command is executed. The topic is the text displayed at the top of the channel, generally used to describe its purpose.

## Syntax

```
$channelTopic
```

## Parameters

None. The function takes no argument and always reads the current channel (`$channelTopic[...]` with an argument is refused).

## Return value

| Type | Description |
|---|---|
| `string` | The topic of the channel. Returns an empty string if no topic is set or if the channel type has no topic. |

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
$title[#$channelName[$channelID]]
$description[Topic: $channelTopic]
$color[#5865F2]
```

## Notes

- Topics are returned for text, announcement, forum and media channels.
- For other channel types (voice, categories, threads, etc.), the function returns an empty string.
- The function raises an error if the current channel cannot be resolved.
