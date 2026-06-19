---
layout: doc
title: $channelTopic
translation_key: docs
category: "Entity Info"
function_name: channelTopic
syntax: $channelTopic[(channelID)]
description: Retourne le sujet (topic) d'un salon textuel Discord.
---

# $channelTopic

La fonction `$channelTopic` retourne le **sujet** (topic) d'un salon textuel Discord. Le sujet est le texte affiché en haut du salon, généralement utilisé pour décrire son utilité.

## Syntaxe

```
$channelTopic[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Le sujet du salon. Retourne une chaîne vide si aucun sujet n'est défini ou si le salon n'est pas textuel. |

## Exemples

### Afficher le sujet

```bdfd
$sendMessage[**Sujet du salon :** $channelTopic]
```

### Vérifier si un sujet existe

```bdfd
$if[$channelTopic!=]
  $sendMessage[Sujet : $channelTopic]
$else
  $sendMessage[Ce salon n'a pas de sujet.]
$endif
```

### Sujet dans un embed

```bdfd
$title[#$channelName]
$description[Sujet : $channelTopic]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Ne fonctionne que pour les salons de type `text` et `news`.
- Pour les salons vocaux, les catégories, etc., la fonction retourne une chaîne vide.
- Longueur maximale d'un sujet : 1024 caractères.
