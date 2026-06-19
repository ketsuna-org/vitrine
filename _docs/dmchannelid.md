---
layout: doc
title: $dmChannelID
translation_key: docs
category: "Messages & DM"
function_name: dmChannelID
syntax: $dmChannelID[userID]
description: Récupère l'ID du canal DM (conversation privée) entre le bot et un utilisateur. Crée le canal DM automatiquement s'il n'existe pas encore.
parameters:
  - name: userID
    description: L'ID de l'utilisateur cible.
returns:
  - type: snowflake (string)
    description: L'ID du canal DM entre le bot et l'utilisateur.
related:
  - $dm
  - $channelID
  - $useChannel
examples:
  - description: Récupérer l'ID DM et l'utiliser
    code: |
      $let[dmID;$dmChannelID[$authorID]]
      $sendMessage[Votre canal DM : $dmID]
---
# $dmChannelID

La fonction `$dmChannelID[]` retourne l'**ID du canal DM** (conversation privée) entre le bot et un utilisateur donné.

## Syntaxe

```
$dmChannelID[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur dont on veut le canal DM. |

## Valeur de retour

- **Type** : Snowflake (chaîne)
- L'ID du canal DM.
- Crée automatiquement le DM si nécessaire.

## Comportement

- Crée le canal DM si la conversation n'existe pas encore.
- Utile pour combiner avec `$useChannel[]` ou `$channelSendMessage[]`.
- N'échoue pas si l'utilisateur a fermé ses DMs (le canal est créé, mais l'envoi peut échouer).

## Exemples

### Récupérer l'ID DM

```bdfd
$let[dmChannel;$dmChannelID[$authorID]]
$sendMessage[Votre conversation privée avec le bot : $dmChannel]
```

### Envoyer dans le DM via useChannel

```bdfd
$useChannel[$dmChannelID[$authorID]]
$sendMessage[Ce message est envoyé en privé.]
```

### Logging de canal DM

```bdfd
$log[DM ouvert avec <@$authorID> - Canal : $dmChannelID[$authorID]]
```

## Notes

- Le canal DM est persistant une fois créé par Discord.
- Pour envoyer un message privé, `$dm[]` est plus simple.
- Utilisez `$dmChannelID[]` quand vous avez besoin de l'ID pour d'autres opérations.
