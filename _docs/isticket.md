---
layout: doc
title: $isTicket
translation_key: docs
category: "Math & Text"
function_name: isTicket
syntax: $isTicket
description: Vérifie si le canal courant est un canal de ticket ouvert avec $newTicket.
parameters: []
returns:
  - type: boolean
    description: true si le canal est un ticket BDFD, false sinon.
related:
  - $newTicket
  - $closeTicket
  - $isNSFW
  - $isSlash
examples:
  - description: Vérifier si on est dans un ticket
    code: |
      $if[$isTicket==true]
        $sendMessage[Ce canal est un ticket.]
      $endif
  - description: Restreindre une commande aux tickets
    code: |
      $if[$isTicket==false]
        $sendMessage[Cette commande est réservée aux tickets.]
        $stop
      $endif
---

# $isTicket

La fonction `$isTicket` **vérifie si le canal courant est un ticket** créé via la fonction `$newTicket[]` de BDFD. Les tickets sont des canaux éphémères utilisés pour le support.

## Syntaxe

```
$isTicket
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Booléen
- `true` si le canal courant est un ticket BDFD.
- `false` si ce n'est pas un ticket (canal normal, DM, etc.).

## Comportement

- Reconnaît uniquement les tickets créés via `$newTicket[]`.
- Utile pour restreindre ou adapter des commandes au contexte ticket.
- Les tickets sont identifiés par un marqueur interne BDFD.

## Exemples

### Commande réservée aux tickets

```bdfd
$if[$isTicket==false]
  $sendMessage[❌ Cette commande ne peut être utilisée que dans un ticket.]
  $stop
$endif

;; Logique de la commande
$sendMessage[📋 Traitement du ticket en cours...]
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

- Ne détecte que les tickets créés par `$newTicket[]`.
- Pour fermer un ticket, utilisez `$closeTicket[]`.
- Pour créer un ticket, utilisez `$newTicket[]`.
- Fonctionne uniquement dans un serveur (pas en DM).
