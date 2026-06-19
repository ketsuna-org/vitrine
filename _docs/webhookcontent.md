---
layout: doc
title: $webhookContent
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookContent
syntax: $webhookContent[text]
description: Définit le contenu textuel du prochain message envoyé via $webhookSend. Alternative au second paramètre de $webhookSend.
---

# $webhookContent

La fonction `$webhookContent[]` permet de **définir le contenu textuel** d'un message webhook, comme alternative au second paramètre de `$webhookSend[]`.

## Syntaxe

```
$webhookContent[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le texte du message. Supporte le markdown, les émojis et les mentions. Maximum 2000 caractères. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Elle définit le contenu pour le prochain `$webhookSend[]`.

## Comportement

- Le contenu défini remplace le second paramètre de `$webhookSend[]`.
- Supporte tout le formatage markdown Discord.
- Si `$webhookContent[]` et `$webhookSend[url;texte]` sont tous deux utilisés, le contenu de `$webhookContent[]` est prioritaire.

## Exemples

### Contenu simple

```bdfd
$webhookContent[Ceci est un message envoyé via webhook !]
$webhookSend[$webhookURL;]
```

### Contenu formaté

```bdfd
$webhookUsername[Annonces]
$webhookAvatarURL[$serverIcon]
$webhookContent[📢 **Nouvelle annonce** de $username !
>>> $message]
$webhookSend[$webhookURL;]
```

### Avec embed et contenu

```bdfd
$webhookContent[Voici les détails ci-dessous :]
$webhookTitle[Détails importants]
$webhookDescription[Les informations détaillées se trouvent ici.]
$webhookColor[#FEE75C]
$webhookSend[$webhookURL;]
```

## Notes

- La limite est de 2000 caractères pour le contenu texte.
- Le contenu texte apparaît au-dessus de l'embed s'il y en a un.
- Utilisez `>>> ` pour créer un bloc de citation dans le contenu.
