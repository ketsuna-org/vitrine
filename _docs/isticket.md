---
layout: doc
title: $isTicket
translation_key: docs
category: "Math & Text"
function_name: isTicket
syntax: $isTicket
description: Checks if le canal courant est un canal of ticket ouvert with $newTicket.
---

# $isTicket

The function `$isTicket` **vérifie if the canal courant est un ticket** created via the function `$newTicket[]` of BDFD. The tickets sont canaux éphémères utilisés for the support.

## Syntax

```
$isTicket
```

## Parameters

Aucun.

## Return Value

- **Type** : Boolean
- `true` if the canal courant est un ticket BDFD.
- `false` si ce is not un ticket (canal normal, DM, etc.).

## Behavior

- Reconnaît only les tickets createds via `$newTicket[]`.
- Utile pour restrict or adapter commands to the context ticket.
- Les tickets sont identifiés par un marqueur internal BDFD.

## Examples

### Command réservée to the tickets

```bdfd
$if[$isTicket==false]
  $sendMessage[❌ Cette command ne can be utilisée que in a ticket.]
  $stop
$endif

;; Logique of the command
$sendMessage[📋 Traitement of the ticket in progress...]
```

### Bouton of fermeture contextuel

```bdfd
$if[$isTicket==true]
  $addButton[close;Fermer le ticket;danger]
  $sendMessage[📌 Ticket actif - Utilisez le bouton ci-dessous pour fermer.]
$else
  $sendMessage[❌ Vous n'êtes pas in a canal of ticket.]
$endif
```

### Information of the canal

```bdfd
$title[📋 Info Canal]
$description[
**Nom :** $channelName
**ID :** $channelID
**Ticket :** $if[$isTicket==true]✅ Oui$else❌ Non$endif
**NSFW :** $if[$isNSFW==true]🔞 Oui$else✅ Non$endif
]
$sendMessage[]
```

## Notes

- Ne détecte que les tickets createds par `$newTicket[]`.
- Pour fermer un ticket, utilisez `$closeTicket[]`.
- Pour create a ticket, utilisez `$newTicket[]`.
- Functionne only in a server (pas en DM).
