---
layout: doc
title: $clear
translation_key: docs
category: "Moderation"
function_name: clear
syntax: $clear[amount;(userID);(removePinned)]
description: Supprime a namebre spécifié of messages in the channel.
---

# $clear

The `$clear` function **supprime a namebre spécifié of messages** in the channel courant. Cette function est dédiée to la suppression of messages (modération), to not confondre with the function variable `$clear` of the même nom. The bot must have the permission `ManageMessages`.

## Syntax

```
$clear[amount;(userID);(removePinned)]
```

## Parameters

| Parameter | Description |
|---|---|
| `amount` | Number of messages to delete (1-100). Required. |
| `userID` | Optional. Filtre : ne supprime que les messages of cet user. |
| `removePinned` | Optional. `"yes"` pour inclure les messages épinglés. Default `"no"`. |

## Return value

None. The messages are deleted.

## Examples

### Suppression simple

```bdfd
$clear[50]
$sendMessage[🧹 50 messages have been nettoyés.]
```

### Suppression ciblée par user

```bdfd
$clear[100;$mentioned[1]]
$sendMessage[🧹 Messages of <@$mentioned[1]> deleteds.]
```

### Command of nettoyage with vérification

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !clear <number>]
  $stop
$endif

$if[$isAdmin==true]
  $clear[$message[1]]
  $sendMessage[🧹 $message[1] messages deleteds.]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Suppression incluant les épinglés

```bdfd
$clear[10;;yes]
$sendMessage[10 messages deleteds (épinglés included).]
```

## Notes

- The bot must have the permission `ManageMessages`.
- Maximum 100 messages par call (limitation Discord).
- Les messages of more than 14 days cannot être deleteds par the API Discord.
- `removePinned` by default `"no"` : les messages épinglés are ignored.
- Si `userID` est omitted, laissez le point-virgule vide (ex: `$clear[10;;yes]`).
- Cette function `$clear` est dédiée to la modération. Pour vider a variable, voir `$clear` in the catégorie Variables.
