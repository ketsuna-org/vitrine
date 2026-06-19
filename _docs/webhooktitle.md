---
layout: doc
title: $webhookTitle
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookTitle
syntax: $webhookTitle[text]
description: Définit le titre de l'embed pour le prochain message envoyé via $webhookSend.
---

# $webhookTitle

La fonction `$webhookTitle[]` permet de **définir le titre** de l'embed pour le prochain message webhook.

## Syntaxe

```
$webhookTitle[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le titre de l'embed. Maximum 256 caractères. Supporte les émojis et les variables. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Elle définit le titre du prochain embed.

## Comportement

- Le titre apparaît en haut de l'embed, en texte plus grand et en gras.
- Si aucun titre n'est défini mais qu'une description l'est, l'embed sera créé sans titre.
- Le titre est réinitialisé après chaque `$webhookSend[]`.

## Exemples

### Titre dynamique

```bdfd
$webhookTitle[🔨 Action de modération]
$webhookDescription[
**Action :** $message[1]
**Utilisateur :** $userName[$mentioned[1]]
**Raison :** $noMentionMessage
]
$webhookColor[#ED4245]
$webhookFooter[Modération • $username]
$webhookSend[$modHook;]
```

### Titre avec émoji

```bdfd
$webhookTitle[✅ Tâche terminée]
$webhookDescription[La sauvegarde automatique des données a été effectuée avec succès.]
$webhookColor[#57F287]
$webhookSend[$webhookURL;]
```

### Embeds multiples (conceptuel)

```bdfd
$webhookTitle[Premier embed]
$webhookDescription[Contenu du premier embed.]
$webhookSend[$webhookURL;]

$webhookTitle[Second embed]
$webhookDescription[Contenu du second embed.]
$webhookColor[#FEE75C]
$webhookSend[$webhookURL;]
```

## Notes

- Maximum 256 caractères pour le titre.
- Le titre est en gras et plus grand que la description.
- Un embed peut exister sans titre (description uniquement), mais un titre seul (sans description) fonctionne aussi.
