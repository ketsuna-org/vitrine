---
layout: doc
title: $repliedMessageID
translation_key: docs
category: "Entity Info"
function_name: repliedMessageID
syntax: $repliedMessageID
description: Retourne l'ID du message auquel l'utilisateur a répondu. Permet de référencer le message source dans une commande déclenchée par une réponse.
---

# $repliedMessageID

La fonction `$repliedMessageID` permet de **récupérer l'ID du message source** lorsqu'un utilisateur répond à un message avec une commande.

## Syntaxe

```
$repliedMessageID
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String (Snowflake ID)
- L'ID du message auquel l'utilisateur a répondu.
- Chaîne vide si la commande n'a pas été déclenchée via une réponse.

## Comportement

- Fonctionne lorsque l'utilisateur fait un clic droit → "Répondre" sur un message et tape la commande.
- Retourne l'ID du message original, pas du message de commande.
- Utile pour les commandes de modération contextuelles.

## Exemples

### Citer le message répondu

```bdfd
$if[$repliedMessageID!=]
  $let[msg;$getMessage[$channelID;$repliedMessageID]]
  $title[📝 Réponse à un message]
  $description[
  **Auteur original :** $userName[$messageAuthorID[$channelID;$repliedMessageID]]
  **Message :** $msg
  ]
  $sendMessage[]
$else
  $sendMessage[Veuillez répondre à un message pour utiliser cette commande.]
$endif
```

### Modération par réponse

```bdfd
$if[$repliedMessageID!=]
  $let[author;$messageAuthorID[$channelID;$repliedMessageID]]
  $title[⚠️ Signalement]
  $description[
  **Message signalé :** ||$getMessage[$channelID;$repliedMessageID]||
  **Auteur :** $userName[$author]
  **Signalé par :** $userName[$authorID]
  ]
  $color[#ED4245]
  $sendMessage[$channelID[mod-logs]]
$else
  $sendMessage[Répondez à un message pour le signaler.]
$endif
```

### Citer et supprimer

```bdfd
$if[$repliedMessageID!=]
  $let[msg;$getMessage[$channelID;$repliedMessageID]]
  $title[🗑️ Message supprimé]
  $description[Message de **$userName[$messageAuthorID[$channelID;$repliedMessageID]]** supprimé.\nContenu : ||$msg||]
  $deleteMessage[$channelID;$repliedMessageID]
  $sendMessage[]
$endif
```

## Notes

- Ne fonctionne que si la commande est déclenchée via une réponse Discord.
- Retourne une chaîne vide dans les autres cas (message normal, slash command, etc.).
- Pratique pour des commandes contextuelles sans avoir à fournir d'ID manuellement.
