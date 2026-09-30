---
layout: doc
title: Support Ticket System — Complete Guide
category: "Blocks"
api_type: general
description: Production-ready Discord ticket system using channel creation, explicit permissions, interactive buttons, and deletion. Complete with mobile Blocks UI and BDFD code.
permalink: /docs/tickets/
---

# Support Ticket System — Complete Guide

Creating a private support ticket system in Discord requires orchestrating **channel creation**, **permission overwrites**, **interactive component messages**, and **lifecycle closure**.

> [!WARNING]
> Do not use legacy BDFD helpers like `$newTicket` and `$closeTicket` for production bots. In the current engine, they create public text channels without private permissions, and `$closeTicket` only archives threads rather than deleting text channels. Use the explicit pattern documented below.

---

## 1. Architecture of a Discord Ticket System

```text
[ Category: 🔒 Support Tickets ]  <-- Denies @everyone View Channel
       │
       ├── [ Ticket Channel: #ticket-12345 ]
       │      ├── Bot & Staff Roles (Inherited: View, Send, Manage)
       │      ├── Ticket Creator (Explicit Overwrite: Allow View, Send, Read History)
       │      │
       │      └── [ Welcome Message with Component V2 Button: "Close Ticket" ]
```

1. **Parent Category**: A dedicated private category where `@everyone` has `View Channel: Deny`. The bot and staff roles have `View Channel: Allow` and `Manage Channels: Allow`.
2. **Channel Creation**: When a user triggers `/ticket`, create a text channel inside this category.
3. **Permission Overwrite**: Add an explicit permission overwrite on the channel for the user who invoked the command (`allow: 68608` = View Channel + Send Messages + Read Message History).
4. **Welcome Message & Close Button**: Send an initial greeting in the new channel featuring an interactive button (`customId: close_ticket`, style: Danger / Red).
5. **Command Response**: Reply to the user's slash command with an ephemeral message confirming creation and linking to `<#channel_id>`.
6. **Closing the Ticket**: When staff or the user clicks the "Close Ticket" button (or runs `/ticket-close`), verify permissions and invoke `removeChannel`.

---

## 2. Visual Blocks Representation (Mobile App UI)

In the Bot Creator mobile editor, this workflow is assembled using visual drag-and-drop blocks:

```text
[ Événement : Commande Slash /ticket ]
   │
   ├── [ Action : Créer un salon textuel ]  ─── Key: ticket_chan
   │      ├── Nom : ticket-((user.id))
   │      ├── Type : Textuel
   │      └── Catégorie : 123456789012345678 (ID Catégorie Support)
   │
   ├── [ Action : Modifier les permissions du salon ]
   │      ├── Salon : ((action.ticket_chan))
   │      ├── Cible : ((user.id))
   │      ├── Type de cible : Membre
   │      ├── Autoriser : 68608 (Voir salon + Écrire + Historique)
   │      └── Refuser : 0
   │
   ├── [ Action : Envoyer un message ]
   │      ├── Salon : ((action.ticket_chan))
   │      ├── Contenu : "Bienvenue <@((user.id))> ! Notre équipe va vous répondre."
   │      └── Boutons :
   │             └── [ Bouton Rouge : "Fermer le ticket" | ID: close_ticket ]
   │
   └── [ Action : Répondre à l'interaction ]  (Terminal)
          ├── Contenu : "Votre ticket a été créé : <#((action.ticket_chan))>"
          └── Éphémère : Oui (Coché)
```

---

## 3. Implementation in Blocks (JSON)

Here is the exact JSON payload executed by the Dart runner for the creation command:

```json
[
  {
    "type": "createChannel",
    "key": "ticket_chan",
    "payload": {
      "name": "ticket-((user.id))",
      "type": "text",
      "categoryId": "123456789012345678"
    }
  },
  {
    "type": "editChannelPermissions",
    "depend_on": ["ticket_chan"],
    "payload": {
      "channelId": "((action.ticket_chan))",
      "targetType": "member",
      "targetId": "((user.id))",
      "allow": "68608",
      "deny": "0"
    }
  },
  {
    "type": "sendMessage",
    "depend_on": ["ticket_chan"],
    "payload": {
      "channelId": "((action.ticket_chan))",
      "content": "Bienvenue <@((user.id))> ! Décrivez votre problème en détail.\nUn membre de l'équipe va vous assister.",
      "components": {
        "items": [
          {
            "type": "actionRow",
            "components": [
              {
                "type": "button",
                "customId": "close_ticket",
                "label": "Fermer le ticket",
                "style": 4
              }
            ]
          }
        ]
      }
    }
  },
  {
    "type": "respondWithMessage",
    "depend_on": ["ticket_chan"],
    "payload": {
      "content": "✅ Votre ticket a été créé avec succès : <#((action.ticket_chan))>",
      "ephemeral": true
    }
  }
]
```

### Closing the Ticket in Blocks

Attached to an `interactionCreate` event workflow listening for `customId == "close_ticket"` or a `/ticket-close` slash command:

```text
[ Événement : Clic de Bouton (close_ticket) ]
   │
   ├── [ Condition : Le salon actuel est-il un salon de support ? ]
   │      ├── Variable : ((channel.name))
   │      ├── Opérateur : startsWith
   │      └── Valeur : ticket-
   │
   ├── [ Action : Répondre à l'interaction ]
   │      ├── Contenu : "Fermeture du ticket dans 3 secondes..."
   │      └── Éphémère : Non
   │
   ├── [ Action : Attendre ]
   │      └── Durée : 3s
   │
   └── [ Action : Supprimer le salon ]
          └── Salon : ((channel.id))
```

```json
[
  {
    "type": "respondWithMessage",
    "payload": {
      "content": "🔒 Fermeture et suppression du ticket..."
    }
  },
  {
    "type": "wait",
    "payload": {
      "duration": "3s"
    }
  },
  {
    "type": "removeChannel",
    "payload": {
      "channelId": "((channel.id))"
    }
  }
]
```

---

## 4. Implementation in Raw Script (BDFD / BDScript)

For bots configured in BDFD script mode, here is the exact equivalent:

### Command `/ticket` (Slash Command)

```bdfd
;; 1. Créer le salon dans la catégorie Support
$var[ticketChan;$createChannel[ticket-$authorID;text;123456789012345678]]

;; 2. Accorder les permissions au créateur
$modifyChannelPerms[$var[ticketChan];$authorID;+viewchannel;+sendmessages;+readmessagehistory]

;; 3. Envoyer le message de bienvenue avec le bouton de fermeture
$useChannel[$var[ticketChan]]
$title[Support & Assistance]
$description[Bienvenue <@$authorID> !\nVeuillez décrire votre demande.\nPour clore la demande, utilisez le bouton ci-dessous.]
$color[#5865F2]
$addButton[close_ticket;Fermer le ticket;danger]
$sendMessage[]

;; 4. Réponse éphémère à l'interaction slash (automatique via $ephemeral)
$ephemeral
✅ Votre ticket a été ouvert ici : <#$var[ticketChan]>
```

### Event Callback `close_ticket` (Button Click Handler)

Workflow d'événement avec déclencheur `interactionCreate` (ou filtre de bouton `close_ticket`) :

```bdfd
$if[((interaction.customId))==close_ticket]
  Fermeture du ticket en cours...
  $wait[3s]
  $deleteChannels[((channel.id))]
$endif
```

---

## 5. Alternative : Tickets via Private Threads

Si vous ne souhaitez pas créer des salons complets, vous pouvez utiliser des **Threads privés** :

```text
[ Événement : Commande Slash /ticket ]
   │
   ├── [ Action : Créer un fil (Thread) ]  ─── Key: ticket_thread
   │      ├── Salon parent : ((channel.id))
   │      ├── Nom : ticket-((user.username))
   │      └── Type : privateThread
   │
   ├── [ Action : Ajouter un membre au fil ]
   │      ├── Fil : ((action.ticket_thread))
   │      └── Utilisateur : ((user.id))
   │
   └── [ Action : Répondre à l'interaction ]
          ├── Contenu : "Fil de support ouvert : <#((action.ticket_thread))>"
          └── Éphémère : Oui
```

En cas d'utilisation de threads, `$closeTicket` ou le bloc `updateChannel` (`archived: true`, `locked: true`) est alors parfaitement adapté pour archiver le fil sans détruire l'historique !
