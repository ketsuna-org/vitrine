---
layout: doc
title: $channelID
translation_key: docs
category: "Entity Info"
function_name: channelID
syntax: $channelID
description: Returns the ID of the channel Discord in thequel la command est executede.
---

# $channelID

The `$channelID` function returns the **unique identifier** (snowflake) of the channel Discord in thequel la command est currently executede.

## Syntax

```
$channelID
```

## Parameters

No parameters.

## Return value

| Type | Description |
|---|---|
| `snowflake` | The ID of the channel courant, sous forme of string of chiffres (ex: `123456789012345678`). |

## Examples

### Display the ID of the channel

```bdfd
$sendMessage[ID of ce channel : $channelID]
```

### Link direct vers the channel

```bdfd
$sendMessage[Link of the channel : https://discord.com/channels/$guildID/$channelID]
```

### Compareason with a channel specific

```bdfd
$if[$channelID==123456789012345678]
  $sendMessage[This is the channel principal !]
$else
  $sendMessage[Vous êtes in the channel $channelID]
$endif
```

## Notes

- The ID retourné est celui of the channel où la command has been **triggerede**, même if the bot interagit then with of autres channels.
- En messages privates (DM), `$channelID` returns the ID of the canal DM.
- Utile to combiner with `$findChannel` or `$channelSendMessage` pour opérations multi-channels.
