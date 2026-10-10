---
layout: doc
title: $findChannel
translation_key: docs
category: "Entity Info"
function_name: findChannel
syntax: $findChannel[query]
description: Searches for a channel of the current server by mention, ID or name (case-insensitive, exact name first, then partial) and returns its ID.
---

# $findChannel

The `$findChannel` function searches for a Discord channel of the current server by **mention, ID or name** and returns its ID. Name matching is case-insensitive and may be partial.

## Syntax

```
$findChannel[query]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | A channel mention (`<#ID>`), a channel ID, or the name (or part of the name) of the channel. Surrounding spaces are removed; an empty query returns an empty string. |

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

- A mention or a numerical query is treated as an ID: it returns the ID if a channel with that ID exists in the server, otherwise an empty string (no name search is done for it).
- For a name, a channel whose name equals the query (ignoring case) is preferred; if there is none, the first channel whose name contains the query (ignoring case) is returned.
- Active threads are searched as well as channels.
- If multiple channels match, the **first** one found is returned.
- For an exact, case-sensitive search by name, use `$channelIDFromName` instead.
- Useful when the user does not know the exact name of the channel.
- The `#` prefix should not be included in the query (use a `<#ID>` mention for a mention).
