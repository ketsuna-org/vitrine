---
layout: doc
title: $serverOwner[]
translation_key: docs
category: "Entity Info"
function_name: serverOwner
syntax: $serverOwner
description: Retourne l'identifiant (ID) du propriétaire du serveur Discord.
parameters: []
returns:
  type: string
  description: L'ID du propriétaire du serveur.
related:
  - $serverName
  - $serverID
  - $serverInfo
  - $isOwner
examples:
  - description: Mentionner le propriétaire
    code: |
      $sendMessage[Le propriétaire de ce serveur est <@$serverOwner>]
  - description: Vérifier si l'auteur est propriétaire
    code: |
      $if[$authorID==$serverOwner]
      $sendMessage[Vous êtes le propriétaire !]
      $endif
---

# $serverOwner[] — Propriétaire du Serveur

`$serverOwner[]` retourne l'identifiant Discord du propriétaire du serveur. Cet ID peut être utilisé pour mentionner le propriétaire, vérifier des permissions ou restreindre des commandes.

## Syntaxe

```
$serverOwner
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'ID (Snowflake) du propriétaire du serveur.

## Utilisation

### Mention du propriétaire

```bdfd
$sendMessage[👑 Propriétaire du serveur : <@$serverOwner>]
```

### Restreindre une commande au propriétaire

```bdfd
$if[$authorID!=$serverOwner]
$sendMessage[⛔ Seul le propriétaire du serveur peut utiliser cette commande.]
$stop
$endif
$sendMessage[Commande owner exécutée.]
```

### Embed informatif

```bdfd
$title[Informations sur $serverName]
$description[Serveur géré par <@$serverOwner>]
$addField[ID Serveur;$serverID;yes]
$addField[Propriétaire;$serverOwner;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Notification au propriétaire

```bdfd
$sendMessage[<@$serverOwner>, un utilisateur demande votre attention.]
```

## Notes

- Le propriétaire est l'utilisateur qui a créé le serveur ou à qui la propriété a été transférée.
- L'ID du propriétaire est invariant tant que la propriété n'est pas transférée.
- Utilisez `$username[$serverOwner]` pour obtenir le nom du propriétaire sans le mentionner.
- Pour vérifier si l'utilisateur courant est le propriétaire, vous pouvez aussi utiliser `$isOwner[]`.
