---
layout: doc
title: $publishMessage
translation_key: docs
category: "Moderation"
function_name: publishMessage
syntax: $publishMessage[messageID]
description: Publie un message dans les serveurs abonnés (fonctionnalité des canaux d'annonce). Permet de diffuser un message au-delà du serveur d'origine.
parameters:
  - name: messageID
    description: L'ID du message à publier (doit être dans un canal d'annonce).
returns:
  - type: aucun
    description: Ne retourne rien. Le message est publié aux serveurs abonnés.
related:
  - $pinMessage
  - $channelSendMessage
  - $getMessage
examples:
  - description: Publier une annonce
    code: $publishMessage[$messageID]
  - description: Publier un message spécifique
    code: $publishMessage[123456789]
---

# $publishMessage

La fonction `$publishMessage[]` permet de **publier un message** d'un canal d'annonce vers tous les serveurs abonnés.

## Syntaxe

```
$publishMessage[messageID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message à publier (doit être dans un canal d'annonce). |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Nécessite un canal de type **annonce** (type 5).
- Le bot doit avoir la permission `MANAGE_MESSAGES` ou `SEND_MESSAGES` dans le canal d'annonce.
- Le message est diffusé à tous les serveurs qui suivent ce canal d'annonce.
- La publication peut prendre quelques secondes.

## Exemples

### Publier une annonce

```bdfd
$title[📢 Mise à jour du bot]
$description[
**Nouvelle version :** 2.0.0
**Changements :**
- Nouvelle commande !help
- Corrections de bugs
- Performance améliorée
]
$color[#5865F2]
$channelSendMessage[$announcementChannel;]
$publishMessage[$messageID]
$sendMessage[Annonce publiée !]
```

### Publication conditionnelle

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $title[Annonce de $username]
  $description[$noMentionMessage]
  $footer[Publié par $username]
  $channelSendMessage[$announcementChannel;]
  $publishMessage[$messageID]
  $sendMessage[✅ Annonce publiée avec succès.]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

## Notes

- Seuls les messages dans les canaux d'annonce peuvent être publiés.
- Les serveurs abonnés voient le message dans leur canal d'annonce dédié.
- La publication est irréversible : le message ne peut pas être "dépublié".
- Idéal pour les mises à jour de bot, changelogs et annonces communautaires.
