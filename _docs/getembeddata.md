---
layout: doc
title: $getEmbedData
translation_key: docs
category: "Entity Info"
function_name: getEmbedData
syntax: $getEmbedData[messageID;embedIndex;field]
description: Extrait les données d'un champ spécifique d'un embed dans un message. Permet de lire le titre, la description, les champs, etc. d'un embed existant.
parameters:
  - name: messageID
    description: L'ID du message contenant l'embed.
  - name: embedIndex
    description: L'index de l'embed dans le message (1 = premier embed).
  - name: field
    description: Le champ à extraire (title, description, footer, author, color, field:<nom>, image, thumbnail, url, timestamp).
returns:
  - type: string
    description: La valeur du champ demandé, ou chaîne vide si le champ n'existe pas.
related:
  - $getMessage
  - $message
  - $embedSuppress
examples:
  - description: Lire le titre du premier embed
    code: $getEmbedData[$messageID;1;title]
  - description: Lire un champ spécifique
    code: $getEmbedData[$messageID;1;field:Score]
---

# $getEmbedData

La fonction `$getEmbedData[]` permet d'**extraire les données d'un embed** présent dans un message Discord. Extrêmement utile pour lire et réutiliser le contenu d'embeds existants.

## Syntaxe

```
$getEmbedData[messageID;embedIndex;field]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message contenant l'embed. |
| `embedIndex` | L'index de l'embed (1 = premier, 2 = deuxième...). |
| `field` | Le champ à extraire parmi : `title`, `description`, `footer`, `author`, `color`, `field:<nom>`, `image`, `thumbnail`, `url`, `timestamp`. |

## Valeur de retour

- **Type** : String
- La valeur du champ extrait de l'embed.
- Chaîne vide si le champ n'existe pas ou si l'index est invalide.

## Comportement

- Lit les embeds d'un message existant (y compris ceux envoyés par d'autres bots).
- Pour les champs nommés (`fields`), utilisez la syntaxe `field:Nom du champ`.
- L'index d'embed commence à 1.

## Exemples

### Lire le titre et la description

```bdfd
$let[title;$getEmbedData[$messageID;1;title]]
$let[desc;$getEmbedData[$messageID;1;description]]

$title[📋 Embed détecté]
$description[
**Titre :** $title
**Description :** $desc
]
$sendMessage[]
```

### Extraire un champ nommé

```bdfd
$let[score;$getEmbedData[$messageID;1;field:Score]]
$if[$score!=]
  Le score est : **$score**
$else
  Champ "Score" non trouvé.
$endif
```

### Récupérer les médias

```bdfd
$let[image;$getEmbedData[$noMentionMessage;1;image]]
$let[thumb;$getEmbedData[$noMentionMessage;1;thumbnail]]

$if[$image!=]
  $image[$image]
$endif
$if[$thumb!=]
  $thumbnail[$thumb]
$endif
```

### Re-créer un embed

```bdfd
$let[title;$getEmbedData[$messageID;1;title]]
$let[desc;$getEmbedData[$messageID;1;description]]
$let[footer;$getEmbedData[$messageID;1;footer]]
$let[color;$getEmbedData[$messageID;1;color]]

$title[$title]
$description[$desc]
$footer[$footer]
$color[$color]
$sendMessage[]
```

## Notes

- Fonctionne sur les messages de n'importe quel auteur (utilisateurs, bots, webhooks).
- Le message doit être dans un canal accessible par le bot.
- La valeur `color` est retournée au format hexadécimal (#RRGGBB).
