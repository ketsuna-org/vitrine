---
layout: doc
title: $messageID
translation_key: docs
category: "Entity Info"
function_name: messageID
syntax: $messageID
description: Retourne l'ID (snowflake) du message déclencheur de la commande.
---

# $messageID

La fonction `$messageID` retourne l'**identifiant unique** (snowflake) du message qui a déclenché l'exécution de la commande.

## Syntaxe

```
$messageID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID du message déclencheur. |

## Exemples

### Afficher l'ID du message

```bdfd
$sendMessage[ID du message : $messageID]
```

### Lien direct vers le message

```bdfd
$sendMessage[Lien du message : https://discord.com/channels/$guildID/$channelID/$messageID]
```

### Log de l'ID

```bdfd
$channelSendMessage[$channelIDFromName[logs];Message $messageID traité par $username.]
```

### Supprimer le message après traitement

```bdfd
$deleteMessage[$channelID;$messageID]
$sendMessage[Message traité et supprimé.]
```

## Notes

- L'ID est unique et permet d'identifier précisément un message.
- Utilisable avec `$deleteMessage`, `$editMessage` ou `$messageURL`.
- Dans les interactions (boutons), `$messageID` retourne l'ID du message d'origine.
