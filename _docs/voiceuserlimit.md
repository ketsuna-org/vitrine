---
layout: doc
title: $voiceUserLimit
translation_key: docs
category: "Moderation"
function_name: voiceUserLimit
syntax: $voiceUserLimit[(channelID)]
description: Gets the limit of users of a channel vocal. Returns the number maximum of users pouvant se connecter simultanément.
---

# $voiceUserLimit

The function `$voiceUserLimit[]` allows **récupérer la limit of users** configurede on a channel vocal Discord.

## Syntax

```
$voiceUserLimit[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional - The ID of the channel vocal. Par default, the channel où se trouve l'auteur. |

## Return Value

- **Type** : String (number)
- The namebre maximum of users alloweds in the channel.
- `0` signifie illimité (pas of limit).

## Behavior

- Si no channelID n'est fourni and que l'auteur is not in a channel vocal, retourne `0` or une error.
- La limit est définie during la création/modification of the channel.
- Utile pour check the capacité before of rejoindre or of inviter.

## Examples

### Vérification of capacité

```bdfd
$let[limit;$voiceUserLimit]
$let[users;$voiceMembersCount]

$if[$limit==0]
  Channel illimité — **$users** user(s) connected(s).
$else
  Channel : **$users / $limit** users.
  $if[$users>=$limit]
    ⚠️ Channel plein !
  $else
    ✅ $math[$limit-$users] place(s) available(s).
  $endif
$endif
```

### Information channel vocal

```bdfd
$title[🔊 $channelName[$voiceChannelID]]
$description[
**Connecteds :** $voiceMembersCount
**Limit :** $if[$voiceUserLimit==0]Illimité$else$voiceUserLimit$endif
**Bitrate :** $voiceBitrate kbps
]
$color[#5865F2]
$sendMessage[]
```

### Vérification for a channel specific

```bdfd
$let[target;$channelID[Channel Gaming]]
$let[limit;$voiceUserLimit[$target]]
$let[users;$voiceMembersCount[$target]]

$if[$users<$limit]
  $sendMessage[✅ Vous pouvez rejoindre <#$target>.]
$else
  $sendMessage[❌ <#$target> est plein ($users/$limit).]
$endif
```

## Notes

- `0` = pas of limit (illimité), ce qui est the value default channels vocaux.
- La limit maximale est of 99 users.
- Functionne only with thes channels of type vocal (`$channelType` = 2).
