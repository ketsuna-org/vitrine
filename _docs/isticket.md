---
layout: doc
title: $isTicket
translation_key: docs
category: "Math & Text"
function_name: isTicket
syntax: $isTicket
description: Checks if le canal courant est un canal de ticket ouvert avec $newTicket.
---

# $isTicket

The function `$isTicket` **vérifie if the canal courant est un ticket** created via the function `$newTicket[]` de BDFD. The tickets sont des canaux éphémères utilisés for the support.

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
- Utile pour restreindre or adapter des commands au context ticket.
- Les tickets sont identifiés par un marqueur internal BDFD.

## Examples

### Command réservée aux tickets

```bdfd
$if[$isTicket==false]
  $sendMessage[❌ Cette command ne can be utilisée que dans un ticket.]
  $stop
$endif

;; Logique of the command
$sendMessage[📋 Traitement du ticket in progress...]
```

### Bouton de fermeture contextuel

```bdfd
$if[$isTicket==true]
  $addButton[close;Fermer le ticket;danger]
  $sendMessage[📌 Ticket actif - Utilisez le bouton ci-dessous pour fermer.]
$else
  $sendMessage[❌ Vous n'êtes pas dans un canal de ticket.]
$endif
```

### Information du canal

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
- Pour créer un ticket, utilisez `$newTicket[]`.
- Functionne only dans un server (pas en DM).
