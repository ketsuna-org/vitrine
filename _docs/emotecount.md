---
layout: doc
title: $emojiCount / $emoteCount
translation_key: docs
category: "Moderation"
function_name: emojiCount
syntax: $emojiCount[(guildID)] / $emoteCount
description: Returns the number of custom emojis of a server. $emojiCount accepts an optional server ID; $emoteCount takes no argument and counts the current server.
---

# $emojiCount / $emoteCount

`$emojiCount` and `$emoteCount` **return the number of custom emojis** of a server.

## Syntax

```
$emojiCount[(guildID)]
```
or
```
$emoteCount
```

## Parameters

| Function | Parameter | Description |
|---|---|---|
| `$emojiCount` | `guildID` | Optional. The server to count. If omitted or empty, the current server is used. A non-numeric or non-positive value raises the error `Invalid guild ID.` |
| `$emoteCount` | none | Always counts the current server. Any argument is rejected. |

## Return value

- **Type**: String (number)
- The number of custom emojis returned by Discord for the server (static and animated emojis are both in the list).

## Behavior

- Without an argument, the two functions give the same result.
- With a `guildID`, the bot must be able to list the emojis of that server; otherwise an error is raised.
- Outside a server, without a `guildID`, an error is raised.

## Examples

### Emoji statistics

```bdfd
$title[🎨 Server Emojis]
$description[**Total number:** $emojiCount]
$color[#5865F2]
```

### Count for another server

```bdfd
$sendMessage[Emojis on server $message[1]: $emojiCount[$message[1]]]
```

### Display using alias

```bdfd
$title[📊 Server Info]
$description[
**Members:** $membersCount
**Channels:** $channelCount
**Roles:** $roleCount
**Emojis:** $emoteCount
]
```

## Notes

- `$emoteCount` does not accept the optional server ID of `$emojiCount`.
