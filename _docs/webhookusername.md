---
layout: doc
title: $webhookUsername
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookUsername
syntax: $webhookUsername[name]
description: Définit le nom d'utilisateur affiché pour le prochain message envoyé via $webhookSend.
---

# $webhookUsername

La fonction `$webhookUsername[]` permet de **définir le nom d'utilisateur** qui sera affiché pour le prochain message envoyé via `$webhookSend[]`.

## Syntaxe

```
$webhookUsername[name]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom à afficher. Maximum 80 caractères. Supporte les émojis et variables. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Elle définit le nom pour le prochain `$webhookSend[]`.

## Comportement

- Le nom remplace le nom par défaut du webhook pour cet envoi.
- Le nom est réinitialisé après chaque `$webhookSend[]`.
- Si aucun nom n'est défini, le nom original du webhook est utilisé.

## Exemples

### Nom fixe

```bdfd
$webhookUsername[📢 Annonces du serveur]
$webhookContent[Nouvelle mise à jour disponible !]
$webhookSend[$webhookURL;]
```

### Nom dynamique

```bdfd
$webhookUsername[$username (via webhook)]
$webhookAvatarURL[$authorAvatar]
$webhookContent[$message]
$webhookSend[$webhookURL;]
```

### Anonymisation

```bdfd
$webhookUsername[Message anonyme]
$webhookAvatarURL[https://cdn.example.com/anonymous.png]
$webhookContent[$noMentionMessage]
$webhookSend[$confessionHook;]
```

## Notes

- Le nom ne peut pas dépasser 80 caractères.
- Les webhooks avec des noms usurpant des rôles officiels (Admin, Modérateur) peuvent être trompeurs — utilisez-les de manière éthique.
- Combinez avec `$webhookAvatarURL[]` pour une personnalisation complète.
