---
layout: doc
title: $changeUsername
translation_key: docs
category: "Moderation"
function_name: changeUsername
syntax: $changeUsername[newName]
description: Change the name of user of the bot.
---

# $changeUsername

The `$changeUsername` function **modifie the name of user global** of the bot on Discord. Contrairement to `$setNickname` qui change le pseudo par server, `$changeUsername` change the name of the bot partout.

## Syntax

```
$changeUsername[newName]
```

## Parameters

| Parameter | Description |
|---|---|
| `newName` | Le new nom of user of the bot. Required. |

## Return value

None. The name of user of the bot est modified globalment.

## Examples

### Changement simple

```bdfd
$changeUsername[Mon Super Bot]
$sendMessage[✅ The bot s'callle now "Mon Super Bot".]
```

### Changement conditionnel

```bdfd
$if[$isAdmin==true]
  $changeUsername[$message[1]]
  $sendMessage[Nom of the bot mis to day.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Changement programmé

```bdfd
$changeUsername[Bot of $serverName]
$sendMessage[Nom of the bot adapté to the server.]
```

## Notes

- **Rate limit Discord** : 2 changements of nom par hour maximum.
- The name global est visible on all servers.
- Pour changer le pseudo on a server specific, use `$setNickname`.
- Pour changer the name of un autre user, use `$changeUsernameWithID` (requires of permissions speciales).
- The bot must have un token with the permissions nécessaires.
