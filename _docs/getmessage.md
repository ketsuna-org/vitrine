---
layout: doc
title: $getMessage
translation_key: docs
category: "Moderation"
function_name: getMessage
syntax: $getMessage[channelID;messageID]
description: Récupère le contenu textuel d'un message spécifique par son ID de canal et de message.
---

# $getMessage

La fonction `$getMessage[]` permet de **récupérer le contenu textuel** d'un message à partir de son ID de canal et de message.

## Syntaxe

```
$getMessage[channelID;messageID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal contenant le message. |
| `messageID` | L'ID du message à récupérer. |

## Valeur de retour

- **Type** : String
- Le contenu textuel du message.
- Chaîne vide si le message n'existe pas, a été supprimé, ou est inaccessible.

## Comportement

- Retourne uniquement le contenu texte (pas les embeds, pièces jointes, etc.).
- Le bot doit avoir accès au canal et la permission `READ_MESSAGE_HISTORY`.
- Le message doit avoir moins de 14 jours (limitation API Discord pour les messages non épinglés).

## Exemples

### Citer un message

```bdfd
$let[msgContent;$getMessage[$channelID;$noMentionMessage]]
$if[$msgContent!=]
  $title[Message cité]
  $description[>>> $msgContent]
  $footer[Message ID : $noMentionMessage]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Message introuvable.]
$endif
```

### Log de message supprimé

```bdfd
$let[msgContent;$getMessage[$channelID;$messageID]]
$if[$msgContent!=]
  $title[🗑️ Message récupéré]
  $description[
  **Auteur :** $username
  **Contenu :**
>>> $msgContent
  ]
  $color[#ED4245]
  $channelSendMessage[$logChannel;]
$endif
```

### Vérification de contenu

```bdfd
$let[target;$getMessage[$channelID;$message[1]]]
$if[$checkContains[$target;http]==true]
  $sendMessage[⚠️ Ce message contient un lien.]
$else
  $sendMessage[✅ Aucun lien détecté.]
$endif
```

## Notes

- Limité aux 14 derniers jours pour les messages non épinglés (restriction API Discord).
- Ne récupère pas les embeds, seulement le texte brut.
- Utile pour les systèmes de citation, logs et modération.
