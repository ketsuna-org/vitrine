---
layout: doc
title: $unBan
translation_key: docs
category: "Moderation"
function_name: unBan
syntax: $unBan[userID]
description: Débans a user of the server en utilisant son ID. The user pourra rejoindre the server to new with ae new invite.
---

# $unBan

The function `$unBan[]` allows **débannir un user** of the server en utilisant son ID Discord. A fois débanni, the user pourra rejoindre the server with ae new invite.

## Syntax

```
$unBan[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID Discord of the user to débannir. |

## Return Value

- **Type** : String (vide en cas of success)
- String vide if the déban réussit.
- Error message si the user is not banni or si the bot manque of permissions.

## Behavior

- The bot doit avoir la permission `BAN_MEMBERS`.
- The user must be in the list bans of the server.
- The ID can be récupéré via `$mentioned[]`, `$findUser[]` or tout autre moyen.
- The user ne receives pas of notification of déban.

## Examples

### Déban simple

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $unBan[$mentioned[1]]
  $sendMessage[✅ **$userName[$mentioned[1]]** was débanni.]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Déban with confirmation

```bdfd
$let[target;$mentioned[1]]

$if[$isBanned[$target]==true]
  $unBan[$target]
  $title[🔓 Déban]
  $description[
  **User :** $userName[$target] ($target)
  **Oldne reason :** $getBanReason[$target]
  **Débanni par :** $userName[$authorID]
  ]
  $color[#57F287]
  $sendMessage[]
$else
  $sendMessage[❌ Cet user is not banni.]
$endif
```

### Command with ID manuel

```bdfd
$if[$message!=]
  $let[exists;$userExists[$message]]
  $if[$exists==true]
    $unBan[$message]
    $sendMessage[✅ User **$message** débanni.]
  $elseif[$isBanned[$message]==true]
    $unBan[$message]
    $sendMessage[✅ User **$message** débanni.]
  $else
    $sendMessage[❌ ID invalid or user non banni.]
  $endif
$else
  $sendMessage[Veuillez provide a ID user.]
$endif
```

## Notes

- The user débanni ne rejoint pas automatically the server ; il doit use ae invite.
- Ne functionne que si the user est in the list bans.
- The ID est le seul moyen fiable, because un user banni is not on the server.
