---
layout: doc
title: $userExists
translation_key: docs
category: "Entity Info"
function_name: userExists
syntax: $userExists[userID/mention]
description: Vérifie si l'utilisateur spécifié (par ID ou mention) existe sur Discord et retourne "true" ou "false".
parameters:
  - name: userID/mention
    description: L'ID ou la mention de l'utilisateur à vérifier.
returns:
  - type: boolean (string)
    description: '"true" si l''utilisateur existe, "false" sinon.'
related:
  - $userID
  - $findUser
  - $isBot
examples:
  - description: Vérifier si un ID utilisateur existe
    code: $userExists[123456789012345678]
  - description: Condition basée sur l'existence
    code: |
      $if[$userExists[$mentioned]==true]
        $sendMessage[L'utilisateur mentionné existe !]
      $else
        $sendMessage[Utilisateur introuvable.]
      $endif
---

# $userExists

La fonction `$userExists[]` vérifie si un utilisateur Discord existe, à partir d'un **ID** ou d'une **mention**.

## Syntaxe

```
$userExists[userID/mention]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID/mention` | L'ID numérique (snowflake) ou la mention (`<@ID>`) de l'utilisateur à vérifier. |

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` si l'utilisateur existe et est connu du bot
- `"false"` si l'ID est invalide ou l'utilisateur introuvable

## Comportement

- La vérification se base sur les utilisateurs accessibles au bot (cache des serveurs partagés).
- Un utilisateur peut exister sur Discord sans être sur le serveur du bot — dans ce cas, le résultat dépend du contexte.

## Exemples

### Vérifier une mention

```bdfd
$if[$userExists[$mentioned]==true]
  $title[Informations sur <@$mentioned>]
  $description[
  **ID :** $mentioned
  **Nom :** $userName[$mentioned]
  ]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Je ne trouve pas cet utilisateur.]
$endif
```

### Vérifier un ID fixe

```bdfd
$if[$userExists[123456789012345678]==true]
  $sendMessage[Le propriétaire existe toujours !]
$endif
```

## Notes

- Utilisez `$userExists[]` pour valider les entrées utilisateur avant d'exécuter des actions qui pourraient échouer.
- `$userExists[]` ne vérifie pas si l'utilisateur est **membre du serveur**, seulement s'il existe sur Discord et est connu du bot.
- Fonction utile pour éviter les erreurs dans les commandes utilisant des IDs fournis par l'utilisateur.
