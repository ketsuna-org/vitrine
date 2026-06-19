---
layout: doc
title: $botName
translation_key: docs
category: "Entity Info"
function_name: botName
syntax: $botName
description: Retourne le nom d'utilisateur du bot.
parameters: []
returns:
  - type: string
    description: Le nom d'utilisateur du bot.
related:
  - $botID
  - $botOwnerID
  - $botAvatar
examples:
  - description: Afficher le nom du bot
    code: |
      $sendMessage[Je suis $botName !]
  - description: Dans un embed
    code: |
      $title[$botName - Informations]
      $description[Bot officiel du serveur]
      $sendMessage[]
---

# $botName

La fonction `$botName` **retourne le nom d'utilisateur actuel du bot** tel qu'il apparaît sur Discord.

## Syntaxe

```
$botName
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : String
- Le nom d'utilisateur du bot (ex: `MonSuperBot`).

## Comportement

- Retourne le username du bot, pas le nom d'affichage serveur (nickname).
- Le nom est celui configuré dans le portail développeur Discord.
- Se met à jour automatiquement si le bot est renommé.

## Exemples

### Message de bienvenue

```bdfd
$title[👋 Bienvenue sur $serverName !]
$description[
Je suis **$botName**, votre assistant.
Tapez `!help` pour voir mes commandes.
]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

### Page d'information

```bdfd
$title[🤖 À propos de $botName]
$addField[Nom;$botName;yes]
$addField[ID;$botID;yes]
$addField[Propriétaire;<@$botOwnerID>;yes]
$addField[Commandes;$commandsCount;yes]
$addField[Node;$botNode;yes]
$thumbnail[$botAvatar]
$color[#57F287]
$sendMessage[]
```

### Présentation

```bdfd
$sendMessage[Bonjour ! Je suis $botName, un bot polyvalent créé avec BDFD. 💪]
```

## Notes

- `$botName` est en lecture seule.
- Pour changer le nom du bot, utilisez `$changeUsername[]`.
- Pour obtenir l'ID du bot, utilisez `$botID`.
- Pour l'avatar, utilisez `$botAvatar`.
