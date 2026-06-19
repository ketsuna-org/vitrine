---
layout: doc
title: $removeLinks
translation_key: docs
category: "Text Manipulation"
function_name: removeLinks
syntax: $removeLinks
description: Supprime toutes les URLs (liens HTTP/HTTPS) d'un texte. Utile pour la modération anti-spam.
parameters: []
returns:
  - type: string
    description: Le texte sans les liens.
related:
  - $removeContains
  - $replaceText
  - $ignoreLinks
examples:
  - description: Supprimer les liens d'un message
    code: "$sendMessage[Message sans liens : $removeLinks]"
---
# $removeLinks

La fonction `$removeLinks` **supprime toutes les URLs** (http://, https://) du message ou du texte courant.

## Syntaxe

```
$removeLinks
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Chaîne
- Le texte sans aucune URL.

## Comportement

- Détecte les URLs commençant par `http://` ou `https://`.
- Supprime l'URL entière, pas seulement le protocole.
- Fonctionne sur le contexte textuel courant (`$message`, `$input`, etc.).

## Exemples

### Nettoyage anti-spam

```bdfd
$sendMessage[Message nettoyé : $removeLinks]
; "Visitez https://spam.com maintenant" → "Visitez  maintenant"
```

### Commande echo sécurisée

```bdfd
$let[safe;$removeLinks]
$sendMessage[$safe]
```

### Comparaison et alerte

```bdfd
$if[$message!=$removeLinks]
  $sendMessage[⚠️ Votre message contenait des liens qui ont été supprimés.]
  $sendMessage[$removeLinks]
$else
  $sendMessage[$message]
$endif
```

### Logs sans liens

```bdfd
$channelSendMessage[123456789;Message de $username : $removeLinks]
```

## Notes

- Pour bloquer complètement les liens (pas seulement les supprimer), utilisez `$ignoreLinks`.
- Pour supprimer d'autres motifs, utilisez `$removeContains[]`.
- Ne supprime pas les liens Discord (mentions de canaux, etc.).
