---
layout: doc
title: $allowUserMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowUserMentions
syntax: $allowUserMentions
description: Autorise les mentions of users in the message in progress. Without this call, les mentions of users in the contenu of the message ne notifieront pas les personnes concernées.
---

# $allowUserMentions[] — Autoriser les Mentions of Users

`$allowUserMentions[]` active la notification of users lorsqu'they are mentionnés in the message. Without this call, les tags like `<@userId>` apparaissent visually mais ne déclenchent **pas** of notification.

## Syntax

```
$allowUserMentions
```

## Parameters

No parameters.

## Return value

Active l'permission of mention of users for the prochain message. Users mentionnés recevront une notification.

## Usage

### Notification personnelle

```bdfd
$allowUserMentions
$sendMessage[<@$authorID> Votre profil has been mis to day with success !]
```

### Response to une command

```bdfd
$allowUserMentions
$title[Confirmation]
$description[<@$authorID>, votre command #$var[orderId] has been confirmée.]
$addField[Status;En préparation;yes]
$color[#2ECC71]
```

### Mention multiple

```bdfd
$allowUserMentions
$sendMessage[<@$var[winner1]> and <@$var[winner2]> ont gagné le giveaway ! 🎉]
```

### Combinaison with RoleMentions

```bdfd
$allowUserMentions
$allowRoleMentions
$sendMessage[<@$authorID> a suggéré une idée. <@&$roleID[Admin]> merci of vérifier.]
```

### Conditionnel

```bdfd
$if[$var[notify]==yes]
$allowUserMentions
$sendMessage[<@$var[targetId]> Vous avez un new message !]
$else
$noMentions
$sendMessage[Vous avez un new message (notification silencieuse)]
$endif
```

## Controle mentions

| Function | Effet |
|----------|-------|
| `$allowRoleMentions` | Active les notifications for mentions of roles |
| `$allowUserMentions` | Active les notifications for mentions of users |
| `$allowMentions` | Active all mentions (roles + users) |
| `$noMentions` | Désactive all notifications of mentions |

## Notes

- Without cette function, `<@userId>` s'displays like mention visualle mais without ping sonore/notification.
- L'effet est **ponctuel** : il ne s'applique qu'au prochain message sent.
- For annonces importantes, combinez with `$allowRoleMentions[]`.
- Pour envoyer a message totalement silencieux (même for users mentionnés), use `$noMentions[]`.
- Respectez les règles of votre server concernant les pings abusifs.
