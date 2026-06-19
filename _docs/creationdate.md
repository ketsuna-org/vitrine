---
layout: doc
title: $creationDate
translation_key: docs
category: "Entity Info"
function_name: creationDate
syntax: $creationDate[entityID]
description: Retourne la date de création d'une entité Discord (utilisateur, serveur, rôle, salon, etc.) à partir de son ID.
---

# $creationDate

La fonction `$creationDate[]` permet de **récupérer la date de création** d'une entité Discord à partir de son ID (Snowflake). Fonctionne pour les utilisateurs, serveurs, rôles, salons, etc.

## Syntaxe

```
$creationDate[entityID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `entityID` | L'ID Discord de l'entité (utilisateur, serveur, rôle, salon, message...). |

## Valeur de retour

- **Type** : String
- La date de création au format `JJ/MM/AAAA`.
- Extraite du timestamp contenu dans le Snowflake ID Discord.

## Comportement

- Les IDs Discord (Snowflakes) contiennent un timestamp de création.
- La fonction extrait ce timestamp et le formate en date lisible.
- Fonctionne pour tout type d'entité Discord disposant d'un ID.

## Exemples

### Fiche utilisateur

```bdfd
$title[👤 $userName[$authorID]]
$description[
**Compte créé le :** $creationDate[$authorID]
**A rejoint le :** $memberJoinDate[$authorID]
**ID :** $authorID
]
$thumbnail[$userAvatar[$authorID]]
$sendMessage[]
```

### Info serveur

```bdfd
$title[📋 $serverName]
$description[
**Créé le :** $creationDate[$guildID]
**Propriétaire :** $userName[$ownerID]
**Membres :** $membersCount
]
$thumbnail[$serverIcon]
$sendMessage[]
```

### Comparaison d'ancienneté

```bdfd
$let[creation;$creationDate[$authorID]]
Votre compte Discord a été créé le **$creation**.
```

## Notes

- La précision est à la milliseconde près (le timestamp est inclus dans le Snowflake).
- Le format peut varier selon les paramètres régionaux du bot.
- Fonctionne uniquement avec des IDs Discord valides.
