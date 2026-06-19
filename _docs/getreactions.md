---
layout: doc
title: $getReactions
translation_key: docs
category: "Moderation"
function_name: getReactions
syntax: $getReactions[channelID;messageID;emoji]
description: Returns the number of reactions for a specific emoji on a given message. Allows counting votes or interactions.
---

# $getReactions

The function `$getReactions[]` retrieves the **number of reactions** for a specific emoji on a given message.

## Syntax

```
$getReactions[channelID;messageID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. |
| `messageID` | The ID of the target message. |
| `emoji` | The emoji to count. Unicode (`👍`) or custom (`<:name:ID>`). |

## Return Value

- **Type**: Integer
- The number of times the emoji was used as a reaction on the message.
- Returns `0` if the emoji is not present.

## Behavior

- Counts ONLY the number of reactions, not specific users.
- A single person can count for 1 even if they reacted several times (only one reaction per emoji per user).
- The bot must have access to the channel to read the reactions.

## Examples

### Poll results

```bdfd
$let[yes;$getReactions[$channelID;$messageID;👍]]
$let[no;$getReactions[$channelID;$messageID;👎]]

$title[Results of the poll]
$description[
**Yes:** $yes vote(s)
**No:** $no vote(s)
**Total:** $sum[$yes;$no] votes
]
$color[#5865F2]
$sendMessage[]
```

### Threshold verification

```bdfd
$let[votes;$getReactions[$channelID;$messageID;✅]]
$if[$votes>=5]
  $sendMessage[Threshold of 5 votes reached! Action executed.]
$else
  $sendMessage[Still $sub[5;$votes] vote(s) needed.]
$endif
```

### Giveaway

```bdfd
$let[participants;$getReactions[$channelID;$giveawayMsg;🎉]]
$if[$participants>0]
  $sendMessage[**$participants** participant(s) in the giveaway!]
$else
  $sendMessage[No participants at the moment.]
$endif
```

## Notes

- The count includes the bot itself if it has reacted.
- Useful for voting systems, polls, and giveaways.
- Alternative methods are required to retrieve the list of users who reacted.
