---
layout: doc
title: $channelID
translation_key: docs
category: "Entity Info"
function_name: channelID
syntax: $channelID
description: Retourne l'ID du salon Discord dans lequel la commande est exécutée.
returns:
  - type: snowflake
    description: L'ID du salon courant sous forme de chaîne.
related:
  - $channelName
  - $channelType
  - $channelCategoryID
  - $findChannel
examples:
  - description: Obtenir l'ID du salon courant
    code: |
      $sendMessage[Vous êtes dans le salon : $channelID]
  - description: Utiliser l'ID dans un lien de salon
    code: |
      $sendMessage[Salon : https://discord.com/channels/$guildID/$channelID]
---

# $channelID

La fonction `$channelID` retourne l'**identifiant unique** (snowflake) du salon Discord dans lequel la commande est actuellement exécutée.

## Syntaxe

```
$channelID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` | L'ID du salon courant, sous forme de chaîne de chiffres (ex: `123456789012345678`). |

## Exemples

### Afficher l'ID du salon

```bdfd
$sendMessage[ID de ce salon : $channelID]
```

### Lien direct vers le salon

```bdfd
$sendMessage[Lien du salon : https://discord.com/channels/$guildID/$channelID]
```

### Comparaison avec un salon spécifique

```bdfd
$if[$channelID==123456789012345678]
  $sendMessage[Ceci est le salon principal !]
$else
  $sendMessage[Vous êtes dans le salon $channelID]
$endif
```

## Notes

- L'ID retourné est celui du salon où la commande a été **déclenchée**, même si le bot interagit ensuite avec d'autres salons.
- En messages privés (DM), `$channelID` retourne l'ID du canal DM.
- Utile à combiner avec `$findChannel` ou `$channelSendMessage` pour des opérations multi-salons.
