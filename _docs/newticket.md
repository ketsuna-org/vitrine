---
layout: doc
title: $newTicket
translation_key: docs
category: "Moderation"
function_name: newTicket
syntax: $newTicket[categoryID;(name);(message)]
description: Creates a ticket sous forme d'un new canal text dans une catégorie. The créateur du ticket receives automatically les permissions d'accès.
---

# $newTicket

The function `$newTicket[]` allows **créer un ticket** sous forme d'un canal text dédié dans une catégorie spécifique.

## Syntax

```
$newTicket[categoryID;(name);(message)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | ID of the catégorie où créer le canal de ticket. |
| `name` | Optional - Name of the canal. Default: `ticket-{username}`. |
| `message` | Optional - Message de bienvenue automatique in the ticket. |

## Return Value

- **Type** : Snowflake (string)
- The ID of the canal de ticket created.
- String vide en cas d'échec (permissions, catégorie invalid).

## Behavior

- The bot doit avoir `MANAGE_CHANNELS` pour créer le canal.
- Le créateur du ticket (the user of the command) receives automatically accès au canal.
- Les autres members ne voient pas le ticket default.

## Examples

### Ticket de support simple

```bdfd
$let[ticket;$newTicket[123456789;support-$username;Bienvenue $username ! \
A member de l'équipe vous assistera bientôt. \
Veuillez décrire votre problème en détail.]]
$if[$ticket!=]
  $sendMessage[✅ Ticket created : <#$ticket>]
$else
  $sendMessage[❌ Error during la création du ticket.]
$endif
```

### Ticket avec notification staff

```bdfd
$let[ticket;$newTicket[123456789;ticket-$username]]
$if[$ticket!=]
  $channelSendMessage[$staffChannel;📩 New ticket de $username : <#$ticket>]
  $sendMessage[Votre ticket was created : <#$ticket>]
$endif
```

### Ticket avec limit

```bdfd
$let[userTickets;$getUserVar[ticketCount]]
$if[$userTickets>=3]
  $sendMessage[❌ Vous avez déjà 3 tickets ouverts. Veuillez en fermer un before d'en créer un new.]
$else
  $let[ticket;$newTicket[123456789;ticket-$username]]
  $if[$ticket!=]
    $setUserVar[ticketCount;$sum[$userTickets;1]]
    $sendMessage[✅ Ticket #$sum[$userTickets;1] created : <#$ticket>]
  $endif
$endif
```

## Notes

- Les tickets sont des canaux text classiques, pas des threads.
- Les permissions sont automatically configuredes for the créateur.
- Pour fermer un ticket, utilisez `$closeTicket[]`.
- Idéal for the systèmes de support, réclamations and modmails.
