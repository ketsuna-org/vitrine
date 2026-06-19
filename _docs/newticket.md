---
layout: doc
title: $newTicket
translation_key: docs
category: "Moderation"
function_name: newTicket
syntax: $newTicket[categoryID;(name);(message)]
description: Crée un ticket sous forme d'un nouveau canal texte dans une catégorie. Le créateur du ticket reçoit automatiquement les permissions d'accès.
---

# $newTicket

La fonction `$newTicket[]` permet de **créer un ticket** sous forme d'un canal texte dédié dans une catégorie spécifique.

## Syntaxe

```
$newTicket[categoryID;(name);(message)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `categoryID` | ID de la catégorie où créer le canal de ticket. |
| `name` | Optionnel - Nom du canal. Défaut : `ticket-{username}`. |
| `message` | Optionnel - Message de bienvenue automatique dans le ticket. |

## Valeur de retour

- **Type** : Snowflake (chaîne)
- L'ID du canal de ticket créé.
- Chaîne vide en cas d'échec (permissions, catégorie invalide).

## Comportement

- Le bot doit avoir `MANAGE_CHANNELS` pour créer le canal.
- Le créateur du ticket (l'utilisateur de la commande) reçoit automatiquement accès au canal.
- Les autres membres ne voient pas le ticket par défaut.

## Exemples

### Ticket de support simple

```bdfd
$let[ticket;$newTicket[123456789;support-$username;Bienvenue $username ! \
Un membre de l'équipe vous assistera bientôt. \
Veuillez décrire votre problème en détail.]]
$if[$ticket!=]
  $sendMessage[✅ Ticket créé : <#$ticket>]
$else
  $sendMessage[❌ Erreur lors de la création du ticket.]
$endif
```

### Ticket avec notification staff

```bdfd
$let[ticket;$newTicket[123456789;ticket-$username]]
$if[$ticket!=]
  $channelSendMessage[$staffChannel;📩 Nouveau ticket de $username : <#$ticket>]
  $sendMessage[Votre ticket a été créé : <#$ticket>]
$endif
```

### Ticket avec limite

```bdfd
$let[userTickets;$getUserVar[ticketCount]]
$if[$userTickets>=3]
  $sendMessage[❌ Vous avez déjà 3 tickets ouverts. Veuillez en fermer un avant d'en créer un nouveau.]
$else
  $let[ticket;$newTicket[123456789;ticket-$username]]
  $if[$ticket!=]
    $setUserVar[ticketCount;$sum[$userTickets;1]]
    $sendMessage[✅ Ticket #$sum[$userTickets;1] créé : <#$ticket>]
  $endif
$endif
```

## Notes

- Les tickets sont des canaux texte classiques, pas des threads.
- Les permissions sont automatiquement configurées pour le créateur.
- Pour fermer un ticket, utilisez `$closeTicket[]`.
- Idéal pour les systèmes de support, réclamations et modmails.
