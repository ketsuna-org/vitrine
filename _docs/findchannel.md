---
layout: doc
title: $findChannel
translation_key: docs
category: "Entity Info"
function_name: findChannel
syntax: $findChannel[query]
description: Searches for a channel by partial or full name and returns its ID. Case-insensitive.
---

# $findChannel

The `$findChannel` function searches for a Discord channel by its **partial or full name** and returns its ID. The search is case-insensitive.

## Syntax

```
$findChannel[query]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | The name or part of the name of the channel to search for. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the channel found, or an empty string (`""`) if no channel matches. |

## Examples

### Partial Name Search

```bdfd
$sendMessage[Channel matching "gen": $findChannel[gen]]
```

### Send a message in a found channel

```bdfd
$channelSendMessage[$findChannel[logs];New event logged.]
```

### Verify if the channel exists

```bdfd
$if[$findChannel[announcements]!=]
  $sendMessage[Channel announcements found: <#$findChannel[announcements]>]
$else
  $sendMessage[No channel matches "announcements".]
$endif
```

### Usage as a fallback

```bdfd
$if[$channelIDFromName[general]!=]
  $sendMessage[General channel: $channelIDFromName[general]]
$else
  $sendMessage[Extended search: $findChannel[gen]]
$endif
```

## Notes

- If multiple channels match, the **first** one found is returned.
- For an exact search, use `$channelIDFromName` instead.
- Useful when the user does not know the exact name of the channel.
- The `#` prefix should not be included in the query.
