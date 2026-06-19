---
layout: doc
title: $lastMessageID
translation_key: docs
category: "Entity Info"
function_name: lastMessageID
syntax: $lastMessageID[(channelID)]
description: Retourne l'ID du dernier message envoyé dans le salon courant ou dans un salon spécifié.
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon cible. Si omis, utilise le salon courant."
returns:
  - type: snowflake (string)
    description: L'ID du dernier message du salon.
related:
  - $messageID
  - $message
  - $channelID
  - $lastPinTimestamp
examples:
  - description: Dernier message du salon
    code: $sendMessage[Dernier message ID : $lastMessageID]
  - description: Dernier message d'un autre salon
    code: $sendMessage[Dernier message : $lastMessageID[123456789012345678]]
---

# $lastMessageID

La fonction `$lastMessageID` retourne l'**ID du dernier message** envoyé dans un salon Discord. Par défaut, elle cible le salon courant.

## Syntaxe

```
$lastMessageID[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID du dernier message du salon. |

## Exemples

### Dernier message du salon courant

```bdfd
$sendMessage[Dernier message dans ce salon : $lastMessageID]
```

### Dernier message d'un salon spécifique

```bdfd
$sendMessage[Activité dans #annonces : dernier message $lastMessageID[123456789012345678]]
```

### Vérifier l'activité récente

```bdfd
$if[$lastMessageID==$messageID]
  $sendMessage[Votre message est le dernier du salon !]
$endif
```

### Lien du dernier message

```bdfd
$sendMessage[Dernier message : https://discord.com/channels/$guildID/$channelID/$lastMessageID]
```

## Notes

- Si le salon est vide (aucun message), le comportement peut varier.
- Utile pour surveiller l'activité ou lier le dernier message.
- Le bot doit avoir accès au salon pour obtenir cette information.
