---
layout: doc
title: $channelExists
translation_key: docs
category: "Entity Info"
function_name: channelExists
syntax: $channelExists[channelID]
description: Vérifie si un salon Discord existe sur le serveur. Retourne "true" ou "false".
---

# $channelExists

La fonction `$channelExists` vérifie si un **salon Discord existe** sur le serveur à partir de son ID. Utile pour s'assurer qu'un salon cible est toujours valide avant d'interagir avec.

## Syntaxe

```
$channelExists[channelID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du salon à vérifier. Obligatoire. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | `"true"` si le salon existe sur le serveur, `"false"` sinon. |

## Exemples

### Vérification simple

```bdfd
$if[$channelExists[123456789012345678]==true]
  $sendMessage[Le salon est valide.]
$else
  $sendMessage[Le salon n'existe pas.]
$endif
```

### Vérifier avant d'envoyer un message

```bdfd
$if[$channelExists[123456789012345678]==true]
  $channelSendMessage[123456789012345678;Message automatique]
$else
  $sendMessage[Le salon de logs n'existe plus !]
$endif
```

## Notes

- La valeur retournée est une chaîne `"true"` ou `"false"`.
- Ne vérifie que les salons du serveur courant.
- Utile dans les systèmes de logs ou de configuration où les IDs sont stockés.
