---
layout: doc
title: $unBanID
translation_key: docs
category: "Moderation"
function_name: unBanID
syntax: $unBanID[userID]
description: Débans a user of the server en utilisant only son ID. Functionne de manière similar à $unBan mais optimisé for the IDs bruts.
---

# $unBanID

The function `$unBanID[]` allows **débannir un user par son ID**. Similar à `$unBan[]`, it is optimisée for the cas où seul the ID brut is available.

## Syntax

```
$unBanID[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID Discord of the user à débannir. |

## Return Value

- **Type** : String (vide en cas de success)
- String vide if the déban réussit.
- Error message si échec (user non banni, permissions insuffisantes, etc.).

## Behavior

- Functionne de manière identical à `$unBan[]`.
- The bot doit avoir la permission `BAN_MEMBERS`.
- Accepte only un ID brut (pas de mention).

## Examples

### Déban dethen une list

```bdfd
$let[bans;$getBanList[, ]]
$textSplit[$bans;, ]
  $let[userID;$splitText[$index]]
  $if[$checkCondition[$userID==$mentioned[1]]==true]
    $unBanID[$userID]
    ✅ **$userName[$userID]** was débanni.
    $break
  $endif
$endTextSplit
```

### Déban programmé

```bdfd
$let[target;$noMentionMessage]
$if[$isBanned[$target]==true]
  $unBanID[$target]
  $title[🔓 Déban automatique]
  $description[
  The user **$target** was débanni (fin de the duration de ban).
  ]
  $color[#57F287]
  $sendMessage[$channelID[mod-logs]]
$endif
```

## Notes

- `$unBanID[]` est interchangeable avec `$unBan[]` for the IDs bruts.
- La différence est minime ; préférez `$unBan[]` qui gère also les mentions.
- Utile for the scripts internals où seul the ID est connu.
