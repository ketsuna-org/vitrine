---
layout: doc
title: $channelCount
translation_key: docs
category: "Entity Info"
function_name: channelCount
syntax: $channelCount[(categoryID)]
description: Returns the total number of channels on the server, or the number of channels in a specific category.
---

# $channelCount

The `$channelCount` function returns the **number of channels** on the Discord server. By providing a category ID, it can also count the channels in a specific category.

## Syntax

```
$channelCount[(categoryID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | Optional. The ID of a category to count only its channels. If omitted, all channels on the server are counted. |

## Return value

| Type | Description |
|---|---|
| `integer` | The number of channels matching the filter. |

## Examples

### Total number of channels

```bdfd
$sendMessage[This server has $channelCount channels.]
```

### Channels in a category

```bdfd
$sendMessage[The category contains $channelCount[123456789012345678] channels.]
```

### Comparison

```bdfd
$if[$channelCount>50]
  $sendMessage[This server is huge! ($channelCount channels)]
$else
  $sendMessage[This server has $channelCount channels.]
$endif
```

## Notes

- Counts all types of channels (text, voice, etc.), except the categories themselves.
- To count categories, use `$categoryCount`.
- Private channels (not visible to the bot) are not counted.
