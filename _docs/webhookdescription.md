---
layout: doc
title: $webhookDescription
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDescription
syntax: $webhookDescription[text]
description: Définit la description (corps) de l'embed pour le prochain message envoyé via $webhookSend.
parameters:
  - name: text
    description: Le texte de description de l'embed. Supporte le markdown et les sauts de ligne. Maximum 4096 caractères.
returns:
  - type: aucun
    description: Ne retourne rien. Définit la description du prochain embed webhook.
related:
  - $webhookTitle
  - $webhookFooter
  - $webhookColor
  - $webhookSend
examples:
  - description: Description simple
    code: $webhookDescription[Ceci est la description de l'embed.]
  - description: Description multiligne
    code: |
      $webhookDescription[
      Ligne 1
      Ligne 2
      Ligne 3
      ]
---

# $webhookDescription

La fonction `$webhookDescription[]` permet de **définir la description** (corps principal) de l'embed pour le prochain message webhook.

## Syntaxe

```
$webhookDescription[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le contenu de la description de l'embed. Supporte markdown, mentions, émojis. Max 4096 caractères. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Elle définit la description du prochain embed.

## Comportement

- La description apparaît sous le titre de l'embed.
- Supporte le markdown complet : gras, italique, liens, listes, code, etc.
- Les sauts de ligne sont préservés.
- La description est réinitialisée après chaque `$webhookSend[]`.

## Exemples

### Description simple

```bdfd
$webhookTitle[Statistiques du serveur]
$webhookDescription[
**Membres :** $membersCount
**En ligne :** $onlineMembers
**Bots :** $botCount
**Boost :** Niveau $boostLevel
]
$webhookColor[#5865F2]
$webhookSend[$webhookURL;]
```

### Description avec formatage

```bdfd
$webhookTitle[Rapport de modération]
$webhookDescription[
**Modérateur :** $username
**Action :** Bannissement
**Utilisateur :** $userName[$mentioned[1]]
**Raison :** $message[2]

*Action effectuée le $date[$day]/$date[$month]/$date[$year]*
]
$webhookColor[#ED4245]
$webhookSend[$logHook;]
```

### Description conditionnelle

```bdfd
$if[$checkContains[$message;!report]==true]
  $webhookTitle[Nouveau signalement]
  $webhookDescription[
  **Signalé par :** $username
  **Utilisateur signalé :** $userName[$mentioned[1]]
  **Raison :** $noMentionMessage
  ]
  $webhookColor[#FEE75C]
  $webhookSend[$reportHook;]
$endif
```

## Notes

- Maximum 4096 caractères pour la description.
- La description est le corps principal de l'embed.
- Combinez titre + description + couleur pour un embed visuellement complet.
