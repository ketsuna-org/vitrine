---
layout: doc
title: $banID
translation_key: docs
category: "Moderation"
function_name: banID
syntax: $banID[userID;(reason)]
description: Bannit un utilisateur par son ID utilisateur.
parameters:
  - name: userID
    description: L'ID de l'utilisateur à bannir. Obligatoire.
  - name: reason
    description: Optionnel. La raison du bannissement.
returns:
  - type: void
    description: Bannit l'utilisateur. Ne retourne rien.
related:
  - $ban
  - $kick
  - $unban
examples:
  - description: Bannir par ID
    code: |
      $banID[123456789012345678;Comportement toxique]
      $sendMessage[Utilisateur banni.]
---

# $banID

La fonction `$banID` **bannit un utilisateur par son ID Discord**, même s'il n'est pas présent sur le serveur. Le bot doit avoir la permission `BanMembers`.

## Syntaxe

```
$banID[userID;(reason)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID Discord de l'utilisateur à bannir. Obligatoire. |
| `reason` | Optionnel. La raison du bannissement. |

## Valeur de retour

Aucune. L'utilisateur est banni du serveur.

## Exemples

### Bannissement par ID simple

```bdfd
$banID[123456789012345678;Raid]
$sendMessage[Utilisateur 123456789012345678 banni pour raid.]
```

### Bannissement préventif

```bdfd
$banID[$message[1]]
$sendMessage[Utilisateur $message[1] banni préventivement.]
```

## Notes

- Permet de bannir un utilisateur qui n'est plus sur le serveur.
- Utile pour les bannissements préventifs.
- Le bot doit avoir la permission `BanMembers`.
- Contrairement à `$ban`, ne permet pas de supprimer les messages.
