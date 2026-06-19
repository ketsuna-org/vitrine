---
layout: doc
title: $allowRoleMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowRoleMentions
syntax: $allowRoleMentions
description: Autorise les mentions of roles in the message in progress. Without this call, les mentions of roles in the contenu of the message ne notifieront pas les members.
---

# $allowRoleMentions[] — Autoriser les Mentions of Roles

`$allowRoleMentions[]` active la notification members lorsqu'a role est mentionné in the message. Without this call, les tags of roles like `<@&roleId>` are displayed mais ne déclenchent **pas** of notification.

## Syntax

```
$allowRoleMentions
```

## Parameters

No parameters.

## Return value

Active l'permission of mention of roles for the prochain message sent. The roles mentionnés in the contenu notifieront leurs members.

## Usage

### Annonce with ping

```bdfd
$allowRoleMentions
$sendMessage[<@&$roleID[Modo]> Un rapport has been soumis, merci of vérifier.]
```

### Notification of event

```bdfd
$allowRoleMentions
$title[🎉 Event of the server]
$description[<@&$roleID[Event_Ping]> Un new event commence in 1 hour !]
$addField[Détails;Tournoi hebdomadaire;yes]
$addField[Récompense;5000 pièces of or;yes]
$color[#F1C40F]
```

### Rcall with mention

```bdfd
$allowRoleMentions
$sendMessage[⏰ <@&$roleID[Staff]> Réunion staff in 10 minutes !]
```

### Message conditionnel

```bdfd
$if[$var[important]==yes]
$allowRoleMentions
$sendMessage[<@&$roleID[Everyone_Important]> Alerte critique !]
$else
$noMentions
$sendMessage[Mise to day mineure available]
$endif
```

## Notes

- Without `$allowRoleMentions[]`, les roles mentionnés apparaissent like text mais without notification.
- L'effet s'applique only to the prochain message sent (via `$sendMessage` or functions of envoi).
- Pour interdire explicitement toute mention, use `$noMentions[]`.
- `$allowRoleMentions[]` n'affecte que les **mentions of roles**. For users, use `$allowUserMentions[]`.
- Pratique for annonces importantes tout en évitant les pings abusifs in thes messages ordinaires.
