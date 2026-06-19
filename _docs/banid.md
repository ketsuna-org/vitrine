---
layout: doc
title: $banID
translation_key: docs
category: "Moderation"
function_name: banID
syntax: $banID[userID;(reason)]
description: Bans a user par its ID user.
---

# $banID

The `$banID` function **bans a user par its ID Discord**, même s'il is not présent on the server. The bot must have the permission `BanMembers`.

## Syntax

```
$banID[userID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID Discord of the user to ban. Required. |
| `reason` | Optional. The ban reason. |

## Return value

None. The user est banni of the server.

## Examples

### Ban by ID simple

```bdfd
$banID[123456789012345678;Raid]
$sendMessage[User 123456789012345678 banni pour raid.]
```

### Ban préventif

```bdfd
$banID[$message[1]]
$sendMessage[User $message[1] banni préventivement.]
```

## Notes

- Allows bannir a user qui is no longer on the server.
- Utile for bans préventifs.
- The bot must have the permission `BanMembers`.
- Contrairement to `$ban`, ne allows no supprimer les messages.
