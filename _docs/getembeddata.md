---
layout: doc
title: $getEmbedData
translation_key: docs
category: "Entity Info"
function_name: getEmbedData
syntax: $getEmbedData[messageID;embedIndex;field]
description: Extracted les datas of un champ specific of an embed in a message. Allows lire le titre, la description, les champs, etc. of an embed existing.
---

# $getEmbedData

The function `$getEmbedData[]` allows to **extraire les datas of an embed** présent in a message Discord. Extrêmement utile pour lire and réuse the contenu of embeds existings.

## Syntax

```
$getEmbedData[messageID;embedIndex;field]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message contenant the embed. |
| `embedIndex` | L'index of the embed (1 = first, 2 = twoième...). |
| `field` | Le champ to extraire parmi : `title`, `description`, `footer`, `author`, `color`, `field:<nom>`, `image`, `thumbnail`, `url`, `timestamp`. |

## Return Value

- **Type** : String
- The value of the field extracted of the embed.
- String vide if the champ n'existe pas or si l'index est invalid.

## Behavior

- Reads thes embeds of a message existing (y compris ceux sents par of autres bots).
- Pour les champs nommés (`fields`), utilisez la syntaxe `field:Nom of the field`.
- L'index of embed commence to 1.

## Examples

### Lire le titre and la description

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
  Champ "Score" non found.
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

### Re-create a embed

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

- Functionne on the messages of n'importe quel auteur (users, bots, webhooks).
- The message must be in a canal accessible par the bot.
- The value `color` est retournée to the format hexadecimal (#RRGGBB).
