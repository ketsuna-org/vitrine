---
layout: doc
title: $newTicket
translation_key: docs
category: "Moderation"
function_name: newTicket
syntax: $newTicket[categoryID;(name);(message)]
description: Creates a ticket sous forme of un new canal text in a catégorie. The créateur of the ticket receives automatically les permissions of accès.
---

# $newTicket

The function `$newTicket[]` allows **create a ticket** sous forme of un canal text dédié in a catégorie specific.

## Syntax

```
$newTicket[categoryID;(name);(message)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | ID of the catégorie où create the canal of ticket. |
| `name` | Optional - Name of the canal. Default: `ticket-{username}`. |
| `message` | Optional - Message of bienvenue automatique in the ticket. |

## Return Value

- **Type** : Snowflake (string)
- The ID of the canal of ticket created.
- String vide en cas of échec (permissions, catégorie invalid).

## Behavior

- The bot doit avoir `MANAGE_CHANNELS` pour create the canal.
- Le créateur of the ticket (the user of the command) receives automatically accès to the canal.
- Les autres members ne voient pas le ticket default.

## Examples

### Ticket of support simple

```bdfd
$let[ticket;$newTicket[123456789;support-$username;Bienvenue $username ! \
A member of l'équipe vous assistera bientôt. \
Veuillez décrire votre problème en détail.]]
$if[$ticket!=]
  $sendMessage[✅ Ticket created : <#$ticket>]
$else
  $sendMessage[❌ Error during la création of the ticket.]
$endif
```

### Ticket with notification staff

```bdfd
$let[ticket;$newTicket[123456789;ticket-$username]]
$if[$ticket!=]
  $channelSendMessage[$staffChannel;📩 New ticket of $username : <#$ticket>]
  $sendMessage[Votre ticket was created : <#$ticket>]
$endif
```

### Ticket with limit

```bdfd
$let[userTickets;$getUserVar[ticketCount]]
$if[$userTickets>=3]
  $sendMessage[❌ Vous avez déjà 3 tickets ouverts. Veuillez en fermer un before of en create a new.]
$else
  $let[ticket;$newTicket[123456789;ticket-$username]]
  $if[$ticket!=]
    $setUserVar[ticketCount;$sum[$userTickets;1]]
    $sendMessage[✅ Ticket #$sum[$userTickets;1] created : <#$ticket>]
  $endif
$endif
```

## Notes

- Les tickets sont canaux text classiques, pas threads.
- Les permissions sont automatically configuredes for the créateur.
- Pour fermer un ticket, utilisez `$closeTicket[]`.
- Idéal for the systèmes of support, réclamations and modmails.
