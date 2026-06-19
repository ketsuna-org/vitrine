---
layout: doc
title: $isMessageEdited
translation_key: docs
category: "Entity Info"
function_name: isMessageEdited
syntax: $isMessageEdited
description: Vérifie si le message déclencheur a été édité. Retourne "true" ou "false".
---

# $isMessageEdited

La fonction `$isMessageEdited` vérifie si le message déclencheur a été **édité** par son auteur. Elle retourne `"true"` ou `"false"`.

## Syntaxe

```
$isMessageEdited
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `string` | `"true"` si le message a été édité, `"false"` sinon. |

## Exemples

### Vérification simple

```bdfd
$if[$isMessageEdited==true]
  $sendMessage[⚠️ Ce message a été modifié.]
$else
  $sendMessage[Message original.]
$endif
```

### Log d'édition

```bdfd
$if[$isMessageEdited==true]
  $channelSendMessage[$channelIDFromName[logs];$username a édité son message $messageURL]
$endif
$sendMessage[Commande exécutée.]
```

### Avertissement utilisateur

```bdfd
$if[$isMessageEdited==true]
  $sendMessage[Attention : votre commande provient d'un message édité.]
  $stop
$endif
```

## Notes

- Retourne une chaîne `"true"` ou `"false"`, pas un booléen.
- Pour obtenir la date d'édition, utilisez `$messageEditedTimestamp`.
- Utile pour détecter si une commande a été modifiée après envoi.
