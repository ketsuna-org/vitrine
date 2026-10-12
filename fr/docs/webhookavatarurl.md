---
layout: doc
title: "$webhookAvatarURL — fonction BDScript"
category: "Webhooks et intégrations"
function_name: webhookAvatarURL
syntax: $webhookAvatarURL[webhookURL;url]
description: "Modifie l'avatar du webhook Discord à partir de l'URL d'une image."
locale: fr
lang: fr
content_language: fr
translation_key: doc-webhookavatarurl
permalink: /fr/docs/webhookavatarurl/
sidebar_context: docs_fr
category_key: "Webhooks & Integrations"
---

# $webhookAvatarURL

La fonction `$webhookAvatarURL` **modifie l'avatar du webhook** lui-même. La modification est appliquée immédiatement au webhook Discord ; ce n'est pas un remplacement propre à chaque message.

## Syntaxe

```
$webhookAvatarURL[webhookURL;url]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `webhookURL` | **Obligatoire.** L'URL complète du webhook Discord (`https://discord.com/api/webhooks/ID/TOKEN`). Une URL invalide lève `Invalid Discord webhook URL.` |
| `url` | **Obligatoire.** Une URL `http` ou `https` de l'image. Sinon l'erreur `An HTTP(S) URL is required.` est levée. |

Exactement deux arguments sont requis ; tout autre nombre est refusé (« Invalid argument count »).

## Valeur de retour

Une chaîne vide.

## Comportement

- L'image est téléchargée par le bot lors de l'exécution de la fonction, puis définie comme avatar du webhook. Le téléchargement échoue si la réponse n'est pas HTTP 200, si l'image dépasse 8 Mio, ou si son type de contenu n'est pas PNG, JPEG, GIF ou WEBP.
- L'avatar reste en place jusqu'à une nouvelle modification ; il n'est pas réinitialisé après un envoi.

## Exemples

### Avatar personnalisé

```bdfd
$webhookAvatarURL[https://discord.com/api/webhooks/123456/abcdef;https://cdn.example.com/avatars/notif.png]
```

### Avatar de l'auteur

```bdfd
$webhookAvatarURL[https://discord.com/api/webhooks/123456/abcdef;$authorAvatar]
```
