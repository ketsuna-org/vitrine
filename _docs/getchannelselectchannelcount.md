---
layout: doc
title: $getChannelSelectChannelCount
translation_key: docs
category: "Components & Interactions"
function_name: getChannelSelectChannelCount
syntax: $getChannelSelectChannelCount
description: Returns how many values were selected in a channel select menu.
---

# $getChannelSelectChannelCount

`$getChannelSelectChannelCount` returns the number of values selected by the user in a channel select menu, as a number.

## Syntax

```text
$getChannelSelectChannelCount
```

It takes no argument.

## Behavior

- Only usable in the callback of a component interaction (a select menu choice). Elsewhere it raises "Select values require a component callback.".
- If the callback carries no channelSelect selection it raises "This callback has no channelSelect selection.".
- To read the selected values themselves, use [$getChannelSelectChannelIDs](/docs/getchannelselectchannelids/).

## Example

```bdfd
$sendMessage[You selected $getChannelSelectChannelCount value(s).]
```
