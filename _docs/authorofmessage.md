---
layout: doc
title: $authorOfMessage
translation_key: docs
category: "Messages & DM"
function_name: authorOfMessage
syntax: $authorOfMessage[messageID]
description: Retourne l'ID de l'auteur d'un message spécifique, identifié par son ID.
---
# $authorOfMessage

La fonction `$authorOfMessage[]` retourne l'**ID de l'auteur** d'un message donné.

## Syntaxe

```
$authorOfMessage[messageID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message cible. |

## Valeur de retour

- **Type** : Snowflake (chaîne)
- L'ID de l'utilisateur auteur du message.
- Chaîne vide si le message est introuvable.

## Exemples

### Récupérer l'auteur

```bdfd
$let[author;$authorOfMessage[$message[1]]]
$sendMessage[Ce message a été envoyé par <@$author>]
```

### Vérifier le propriétaire d'un message

```bdfd
$if[$authorOfMessage[$messageID]==$authorID]
  $sendMessage[Ce message vous appartient.]
$else
  $sendMessage[Ce message ne vous appartient pas.]
$endif
```

### Log de suppression

```bdfd
$let[msgID;$message[1]]
$let[author;$authorOfMessage[$msgID]]
$channelSendMessage[123456789;Message $msgID supprimé — Auteur : <@$author>]
```

### Commande info message

```bdfd
$let[msgID;$message[1]]
$let[author;$authorOfMessage[$msgID]]
$title[📋 Info Message]
$description[
**ID** : $msgID
**Auteur** : <@$author> ($author)
**Contenu** : $getMessage[$msgID]
]
$sendMessage[]
```

## Notes

- Le bot doit avoir accès au canal contenant le message.
- Les messages en DM peuvent être consultés si le bot y a accès.
- Pour le message courant, `$authorID` est plus direct.
