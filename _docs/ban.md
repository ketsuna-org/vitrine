---
layout: doc
title: $ban
translation_key: docs
category: "Moderation"
function_name: ban
syntax: $ban[userID;(reason);(deleteMessagesDays)]
description: Bannit un utilisateur du serveur Discord.
parameters:
  - name: userID
    description: L'ID de l'utilisateur à bannir. Obligatoire.
  - name: reason
    description: Optionnel. La raison du bannissement.
  - name: deleteMessagesDays
    description: Optionnel. Nombre de jours de messages à supprimer (0-7). Défaut 0.
returns:
  - type: void
    description: Bannit l'utilisateur. Ne retourne rien.
related:
  - $banID
  - $kick
  - $unban
  - $softban
examples:
  - description: Bannir un utilisateur par mention
    code: |
      $ban[$mentioned[1];Comportement inapproprié;7]
      $sendMessage[<@$mentioned[1]> a été banni.]
  - description: Bannir avec vérification admin
    code: |
      $if[$isAdmin==true]
        $ban[$mentioned[1];Non-respect des règles;0]
        $sendMessage[Utilisateur banni.]
      $else
        $sendMessage[Permission refusée.]
      $endif
---

# $ban

La fonction `$ban` **bannit un utilisateur** du serveur Discord. Le bot doit avoir la permission `BanMembers`.

## Syntaxe

```
$ban[userID;(reason);(deleteMessagesDays)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur à bannir. Obligatoire. |
| `reason` | Optionnel. La raison du bannissement. |
| `deleteMessagesDays` | Optionnel. Nombre de jours (0-7) de messages à supprimer. Défaut `0`. |

## Valeur de retour

Aucune. La fonction bannit l'utilisateur et supprime ses messages si demandé.

## Exemples

### Bannissement simple avec mention

```bdfd
$ban[$mentioned[1];Spam]
$sendMessage[<@$mentioned[1]> a été banni pour spam.]
```

### Bannissement avec suppression de messages

```bdfd
$ban[$findUser[JeanDupont];Harcèlement;7]
$sendMessage[JeanDupont banni — 7 jours de messages supprimés.]
```

### Commande de bannissement avec confirmation

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !ban <@mention> <raison>]
  $stop
$endif

$ban[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[✅ <@$mentioned[1]> banni.]
```

## Notes

- Le bot doit avoir la permission `BanMembers`.
- `deleteMessagesDays` accepte une valeur entre `0` et `7`.
- Le bot ne peut pas bannir un utilisateur ayant un rôle supérieur au sien.
- Pour bannir par ID sans mention, utilisez `$banID`.
