---
layout: doc
title: "$channelNSFW — fonction BDScript"
category: "Infos sur les entités"
function_name: channelNSFW
syntax: $channelNSFW[(channelID)]
description: "Retourne \"true\" si le salon est marqué NSFW, \"false\" sinon."
locale: fr
lang: fr
content_language: fr
translation_key: doc-channelnsfw
permalink: /fr/docs/channelnsfw/
sidebar_context: docs_fr
category_key: "Entity Info"
---

# $channelNSFW

La fonction `$channelNSFW` vérifie si un salon Discord est marqué **NSFW** (Not Safe For Work). Elle retourne `"true"` ou `"false"` sous forme de chaîne.

## Syntaxe

```
$channelNSFW[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. S'il est omis, le salon actuel est utilisé. Un ID qui n'est pas un nombre positif lève `Invalid channel ID.`, un salon inconnu lève `Channel not found.` |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | `"true"` si le salon est NSFW, `"false"` sinon. |

## Exemples

### Vérification simple

```bdfd
$if[$channelNSFW==true]
  $sendMessage[⚠️ This channel is marked as NSFW. Sensitive content is allowed.]
$else
  $sendMessage[This channel is safe for work (SFW).]
$endif
```

### Bloquer une commande dans un salon NSFW

```bdfd
$if[$channelNSFW==true]
  $sendMessage[This command cannot be used in NSFW channels.]
  $stop
$endif
```

### Vérifier un salon précis

```bdfd
$if[$channelNSFW[123456789012345678]==true]
  $sendMessage[The target channel is NSFW.]
$endif
```

## Remarques

- La valeur retournée est une **chaîne** `"true"` ou `"false"`, et non un booléen.
- Le drapeau est lu pour tout salon de serveur ; un salon qui n'est pas un salon de serveur (un message privé) donne toujours `false`.
- Utile pour restreindre l'accès à certaines commandes selon le type de salon.
