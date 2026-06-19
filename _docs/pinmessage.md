---
layout: doc
title: $pinMessage
translation_key: docs
category: "Moderation"
function_name: pinMessage
syntax: $pinMessage[messageID]
description: Épingle un message dans le canal courant. Le message apparaîtra dans la liste des messages épinglés du canal.
---

# $pinMessage

La fonction `$pinMessage[]` permet d'**épingler un message** dans son canal. Les messages épinglés apparaissent dans la section dédiée du canal.

## Syntaxe

```
$pinMessage[messageID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message à épingler. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Le bot doit avoir la permission `MANAGE_MESSAGES`.
- Maximum 50 messages épinglés par canal.
- L'épinglage fonctionne dans le canal où le message se trouve.

## Exemples

### Épingler une annonce

```bdfd
$title[📢 Annonce importante]
$description[$noMentionMessage]
$color[#FEE75C]
$sendMessage[]
$pinMessage[$messageID]
```

### Épingler un message spécifique

```bdfd
$pinMessage[$mentionedMessage]
$sendMessage[Message épinglé !]
```

### Épinglage conditionnel

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $pinMessage[$noMentionMessage]
  $addCmdReactions[📌]
$else
  $sendMessage[Seuls les administrateurs peuvent épingler.]
$endif
```

## Notes

- Discord notifie les utilisateurs concernés lorsqu'un message est épinglé.
- Pour désépingler, utilisez `$unpinMessage[]`.
- Les messages épinglés restent visibles même après des années.
