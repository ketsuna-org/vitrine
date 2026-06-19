---
layout: doc
title: $channelSendMessage
translation_key: docs
category: "Moderation"
function_name: channelSendMessage
syntax: $channelSendMessage[channelID;content]
description: Envoie un message dans un canal spécifique. Contrairement à $sendMessage qui répond dans le canal courant, cette fonction cible n'importe quel canal.
---

# $channelSendMessage

La fonction `$channelSendMessage[]` permet d'**envoyer un message dans un canal spécifique**, différent du canal où la commande a été exécutée.

## Syntaxe

```
$channelSendMessage[channelID;content]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal cible. |
| `content` | Le contenu du message (markdown, mentions, émojis supportés). Max 2000 caractères. |

## Valeur de retour

- **Type** : Snowflake (chaîne)
- L'ID du message envoyé.
- Chaîne vide si échec (canal inaccessible, permissions).

## Comportement

- Le bot doit avoir accès au canal cible et la permission `SEND_MESSAGES`.
- Le message est envoyé comme un message normal du bot.
- Les fonctions d'embed (`$title`, `$description`, etc.) placées avant `$channelSendMessage[]` sont appliquées.

## Exemples

### Logs de modération

```bdfd
$let[logChannel;123456789012345678]
$title[⚠️ Action de modération]
$description[
**Modérateur :** $username
**Action :** Ban
**Utilisateur :** $userName[$mentioned[1]]
**Raison :** $noMentionMessage
]
$color[#ED4245]
$channelSendMessage[$logChannel;]
$sendMessage[Utilisateur banni.]
```

### Notification de bienvenue

```bdfd
$let[welcomeChannel;123456789]
$title[👋 Bienvenue !]
$description[Bienvenue sur **$serverName**, $username ! Tu es le membre #$membersCount !]
$thumbnail[$authorAvatar]
$color[#57F287]
$channelSendMessage[$welcomeChannel;]
```

### Envoi vers un canal mentionné

```bdfd
$if[$mentionedChannels[1]!=]
  $channelSendMessage[$mentionedChannels[1];Message transféré par $username :
>>> $noMentionMessage]
  $sendMessage[Message envoyé dans <#$mentionedChannels[1]>]
$else
  $sendMessage[Aucun canal mentionné.]
$endif
```

## Notes

- `$channelSendMessage[]` ne répond pas à l'utilisateur — combinez avec `$sendMessage[]` pour un feedback.
- Maximum 2000 caractères par message.
- Pour récupérer un message, utilisez `$getMessage[]`.
