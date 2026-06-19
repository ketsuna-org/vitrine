---
layout: doc
title: $allowRoleMentions[]
translation_key: docs
category: "Embed & Message"
function_name: allowRoleMentions
syntax: $allowRoleMentions
description: Autorise les mentions de roles in the message in progress. Without this call, les mentions de roles in the contenu of the message ne notifieront pas les members.
---

# $allowRoleMentions[] — Autoriser les Mentions de Roles

`$allowRoleMentions[]` active la notification des members lorsqu'a role est mentionné in the message. Without this call, les tags de roles comme `<@&roleId>` are displayed mais ne déclenchent **pas** de notification.

## Syntax

```
$allowRoleMentions
```

## Parameters

No parameters.

## Return value

Active l'permission de mention de roles for the prochain message sent. The roles mentionnés in the contenu notifieront leurs members.

## Usage

### Annonce avec ping

```bdfd
$allowRoleMentions
$sendMessage[<@&$roleID[Modo]> Un rapport has been soumis, merci de vérifier.]
```

### Notification d'event

```bdfd
$allowRoleMentions
$title[🎉 Event of the server]
$description[<@&$roleID[Event_Ping]> Un new event commence dans 1 hour !]
$addField[Détails;Tournoi hebdomadaire;yes]
$addField[Récompense;5000 pièces d'or;yes]
$color[#F1C40F]
```

### Rcall avec mention

```bdfd
$allowRoleMentions
$sendMessage[⏰ <@&$roleID[Staff]> Réunion staff dans 10 minutes !]
```

### Message conditionnel

```bdfd
$if[$var[important]==yes]
$allowRoleMentions
$sendMessage[<@&$roleID[Everyone_Important]> Alerte critique !]
$else
$noMentions
$sendMessage[Mise à day mineure available]
$endif
```

## Notes

- Without `$allowRoleMentions[]`, les roles mentionnés apparaissent comme text mais without notification.
- L'effet s'applique only au prochain message sent (via `$sendMessage` or functions d'envoi).
- Pour interdire explicitement toute mention, use `$noMentions[]`.
- `$allowRoleMentions[]` n'affecte que les **mentions de roles**. For users, use `$allowUserMentions[]`.
- Pratique for annonces importantes tout en évitant les pings abusifs in thes messages ordinaires.
