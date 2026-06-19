---
layout: doc
title: $webhookCreate
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookCreate
syntax: $webhookCreate[channelID;name;(avatarURL)]
description: Crée un nouveau webhook dans un canal spécifié et retourne son URL. Le webhook créé peut ensuite être utilisé avec $webhookSend pour envoyer des messages.
parameters:
  - name: channelID
    description: L'ID du canal Discord où le webhook doit être créé.
  - name: name
    description: Le nom affiché du webhook.
  - name: avatarURL
    description: (Optionnel) L'URL de l'avatar du webhook. Laissez vide pour utiliser l'avatar par défaut.
returns:
  - type: string
    description: L'URL complète du webhook créé, ou une URL invalide en cas d'échec.
related:
  - $webhookDelete
  - $webhookSend
  - $webhookAvatarURL
examples:
  - description: Créer un webhook simple
    code: $webhookCreate[$channelID;Mon Webhook]
  - description: Créer un webhook avec avatar
    code: $webhookCreate[$channelID;Logger;https://example.com/avatar.png]
---

# $webhookCreate

La fonction `$webhookCreate[]` permet de **créer un nouveau webhook** dans un canal Discord et retourne son URL complète.

## Syntaxe

```
$webhookCreate[channelID;name;(avatarURL)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal où créer le webhook. |
| `name` | Le nom du webhook (2 à 80 caractères). |
| `avatarURL` | Optionnel - URL de l'image d'avatar du webhook. |

## Valeur de retour

- **Type** : String (URL)
- L'URL complète du webhook au format `https://discord.com/api/webhooks/ID/TOKEN`
- Chaîne vide ou erreur si le bot n'a pas la permission `MANAGE_WEBHOOKS`.

## Comportement

- Nécessite la permission `MANAGE_WEBHOOKS` dans le canal cible.
- Le nom doit faire entre 2 et 80 caractères.
- L'avatar doit être une URL valide pointant vers une image (PNG, JPG, GIF, WEBP).
- Un canal peut avoir jusqu'à 10 webhooks (serveur) ou 100 (communauté).

## Exemples

### Création simple

```bdfd
$let[hook;$webhookCreate[$channelID;Logger du serveur]]
$if[$hook!=]
  $webhookSend[$hook;Webhook de logs créé avec succès !]
$else
  $sendMessage[Échec : permission MANAGE_WEBHOOKS requise.]
$endif
```

### Création avec stockage

```bdfd
$let[logHook;$webhookCreate[$channelID;Logs;$serverIcon]]
$setUserVar[logWebhook;$logHook]
$sendMessage[Webhook de logs configuré !]
```

## Notes

- Les webhooks créés par le bot sont liés au bot.
- Un webhook ne peut pas être transféré à un autre canal après création.
- Supprimez les webhooks inutilisés avec `$webhookDelete[]`.
