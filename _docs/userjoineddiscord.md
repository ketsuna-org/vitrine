---
layout: doc
title: $userJoinedDiscord
translation_key: docs
category: "Entity Info"
function_name: userJoinedDiscord
syntax: $userJoinedDiscord
description: Retourne la date de création du compte Discord de l'utilisateur (date d'inscription sur la plateforme).
parameters: []
returns:
  - type: date/string
    description: La date de création du compte Discord.
related:
  - $userJoined
  - $userID
  - $userInfo
examples:
  - description: Obtenir la date de création du compte
    code: $userJoinedDiscord
  - description: Afficher l'âge du compte
    code: |
      $title[Âge du compte]
      $description[Votre compte Discord a été créé le **$userJoinedDiscord**]
      $color[#5865F2]
      $sendMessage[]
---

# $userJoinedDiscord

La variable `$userJoinedDiscord` retourne la **date de création** du compte Discord de l'utilisateur — c'est-à-dire la date à laquelle il s'est inscrit sur la plateforme Discord.

## Syntaxe

```
$userJoinedDiscord
```

## Valeur de retour

- **Type** : Date/chaîne de caractères
- La date d'enregistrement du compte sur Discord

## Comportement

- `$userJoinedDiscord` ne prend **aucun argument**.
- La date est dérivée du **snowflake** de l'ID utilisateur (les premiers bits encodent un timestamp Epoch).
- Fonctionne pour tout utilisateur dont l'ID est connu, même sans membership serveur.

## Exemples

### Afficher l'âge du compte

```bdfd
$title[Informations du compte]
$description[
**Nom :** $userName
**Compte créé le :** $userJoinedDiscord
**Membre depuis le :** $userJoined
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier un compte récent

```bdfd
$if[$userJoinedDiscord < 01/01/2024]
  $sendMessage[Compte créé avant 2024.]
$else
  $sendMessage[Compte récent.]
$endif
```

## Notes

- `$userJoinedDiscord` = date de création du **compte** sur Discord.
- `$userJoined` = date d'arrivée sur le **serveur**.
- L'ID Discord (snowflake) encode la date de création, donc cette information est toujours disponible.
