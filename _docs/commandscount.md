---
layout: doc
title: $commandsCount
translation_key: docs
category: "Entity Info"
function_name: commandsCount
syntax: $commandsCount
description: Retourne le nombre total de commandes (prefix + slash) du bot.
parameters: []
returns:
  - type: integer
    description: Nombre total de commandes enregistrées.
related:
  - $slashCommandsCount
  - $botCommands
  - $commandName
examples:
  - description: Afficher le nombre
    code: |
      $sendMessage[Commandes totales : $commandsCount]
  - description: Dans un embed info
    code: |
      $title[$botName]
      $description[Commandes : $commandsCount]
      $sendMessage[]
---

# $commandsCount

La fonction `$commandsCount` **retourne le nombre total de commandes** enregistrées sur le bot, incluant les commandes prefix et slash.

## Syntaxe

```
$commandsCount
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Integer
- Le nombre total de commandes (ex: `42`).

## Comportement

- Compte toutes les commandes, qu'elles soient prefix ou slash.
- Se met à jour automatiquement quand des commandes sont ajoutées/supprimées.
- Inclut les commandes dans tous les dossiers.

## Exemples

### Page d'information du bot

```bdfd
$title[🤖 $botName]
$addField[📊 Statistiques;;yes]
$addField[Total commandes;$commandsCount;yes]
$addField[Slash;$slashCommandsCount;yes]
$addField[Prefix;$math[$commandsCount-$slashCommandsCount];yes]
$thumbnail[$botAvatar]
$color[#5865F2]
$sendMessage[]
```

### Comparaison serveurs/commandes

```bdfd
$title[📈 Statistiques globales]
$description[
**Serveurs :** $guildCount
**Utilisateurs :** $membersCount
**Commandes :** $commandsCount
**Slash :** $slashCommandsCount
**Runtime :** $nodeVersion
]
$sendMessage[]
```

### Annonce de mise à jour

```bdfd
$sendMessage[🎉 **Mise à jour !**
Le bot dispose maintenant de **$commandsCount commandes** !

Tapez `/help` pour les découvrir.]
```

### Limite de commandes (premium)

```bdfd
$if[$premiumExpireTime==]
  $if[$commandsCount>=50]
    $sendMessage[⚠️ Limite de 50 commandes atteinte (version gratuite).
    Passez premium pour débloquer plus de commandes.]
  $else
    $sendMessage[📊 $commandsCount/50 commandes utilisées.]
  $endif
$else
  $sendMessage[💎 $commandsCount commandes (Premium - illimité).]
$endif
```

## Notes

- Inclut toutes les commandes (prefix ET slash).
- Pour les commandes slash uniquement, utilisez `$slashCommandsCount`.
- Pour la liste des noms, utilisez `$botCommands`.
- La limite varie selon l'abonnement (gratuit/premium).
