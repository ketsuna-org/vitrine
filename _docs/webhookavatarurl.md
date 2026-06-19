---
layout: doc
title: $webhookAvatarURL
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookAvatarURL
syntax: $webhookAvatarURL[url]
description: Définit l'URL de l'avatar pour le prochain message envoyé via $webhookSend. Doit être placé avant l'appel à $webhookSend.
---

# $webhookAvatarURL

La fonction `$webhookAvatarURL[]` permet de **définir l'avatar** qui sera utilisé lors du prochain envoi via `$webhookSend[]`.

## Syntaxe

```
$webhookAvatarURL[url]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `url` | L'URL de l'image à utiliser comme avatar. Formats supportés : PNG, JPG, GIF, WEBP. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Elle définit l'avatar pour le prochain appel à `$webhookSend[]` uniquement.

## Comportement

- L'URL doit être accessible publiquement.
- L'image est téléchargée par Discord au moment de l'envoi.
- L'avatar est réinitialisé après chaque `$webhookSend[]`.
- Si l'URL est invalide, l'avatar par défaut du webhook est utilisé.

## Exemples

### Avatar personnalisé

```bdfd
$webhookAvatarURL[https://cdn.example.com/avatars/notif.png]
$webhookUsername[Système]
$webhookContent[Nouvelle notification !]
$webhookSend[$webhookURL;]
```

### Avatar dynamique

```bdfd
$webhookAvatarURL[$authorAvatar]
$webhookUsername[$username]
$webhookContent[$message]
$webhookSend[$webhookURL;]
```

### Avatar de serveur

```bdfd
$webhookAvatarURL[$serverIcon]
$webhookUsername[$serverName]
$webhookTitle[Bienvenue !]
$webhookDescription[Bienvenue sur $serverName, $username !]
$webhookSend[$welcomeHook;]
```

## Notes

- L'avatar défini ne s'applique qu'au **prochain** `$webhookSend[]`.
- Pour des envois répétés avec le même avatar, incluez `$webhookAvatarURL[]` avant chaque `$webhookSend[]`.
- La taille maximale de l'image est de 8 Mo.
