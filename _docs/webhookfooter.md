---
layout: doc
title: $webhookFooter
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookFooter
syntax: $webhookFooter[text]
description: Définit le texte du pied de page (footer) de l'embed pour le prochain message envoyé via $webhookSend.
---

# $webhookFooter

La fonction `$webhookFooter[]` permet de **définir le pied de page** (footer) de l'embed pour le prochain message webhook.

## Syntaxe

```
$webhookFooter[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le texte du footer. Maximum 2048 caractères. Supporte les variables BDFD. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Elle définit le footer du prochain embed.

## Comportement

- Le footer apparaît en bas de l'embed, en texte plus petit et grisé.
- Idéal pour les informations de timestamp, signature ou source.
- Le footer est réinitialisé après chaque `$webhookSend[]`.

## Exemples

### Footer informatif

```bdfd
$webhookTitle[Log de commande]
$webhookDescription[
**Commande :** $commandName
**Utilisateur :** $username ($authorID)
**Canal :** $channelName
]
$webhookFooter[Logger • $date[$day]/$date[$month]/$date[$year] à $date[$hour]:$date[$minute]]
$webhookColor[#5865F2]
$webhookSend[$logHook;]
```

### Footer de signature

```bdfd
$webhookTitle[Bienvenue !]
$webhookDescription[Bienvenue sur **$serverName**, $username ! Nous sommes maintenant $membersCount membres !]
$webhookFooter[Merci de lire le règlement dans $channelName[$rulesChannelID]]
$webhookColor[#57F287]
$webhookSend[$welcomeHook;]
```

## Notes

- Le footer est affiché en texte plus petit et de couleur grise par Discord.
- Maximum 2048 caractères.
- Contrairement au titre et à la description, le footer ne supporte pas le markdown.
