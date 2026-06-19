---
layout: doc
title: $getAttachments
translation_key: docs
category: "Entity Info"
function_name: getAttachments
syntax: $getAttachments[messageID]
description: Gets thes URLs des pièces jointes of a message spécifique. Returns ae list d'URLs separatedes par des virgules.
---

# $getAttachments

The function `$getAttachments[]` allows **récupérer les URLs des pièces jointes** (images, files, vidéos) of a message Discord.

## Syntax

```
$getAttachments[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message contenant les pièces jointes à récupérer. |

## Return Value

- **Type** : String
- Les URLs completes des pièces jointes, separatedes par `, `.
- String vide si the message ne contains noe pièce jointe.

## Behavior

- Returns all URLs des files attachés au message.
- Works with all types de files supportés par Discord (images, vidéos, documents, etc.).
- Chaque URL est une URL directe vers le file sur les servers Discord.

## Examples

### Récupération simple

```bdfd
$let[atts;$getAttachments[$messageID]]
$if[$atts!=]
  Pièces jointes : $atts
$else
  Aucune pièce jointe dans this message.
$endif
```

### Boucle sur les pièces jointes

```bdfd
$let[atts;$getAttachments[$messageID]]
$if[$atts!=]
  $textSplit[$atts;, ]
    📎 Pièce jointe $index : $splitText[$index]
  $endTextSplit
$endif
```

### Sauvegarde d'image

```bdfd
$let[url;$getAttachments[$noMentionMessage]]
$if[$url!=]
  $let[first;$splitText[$url;, ;1]]
  $image[$first]
  $sendMessage[Image récupérée :]
$else
  $sendMessage[Aucune image founde.]
$endif
```

## Notes

- Les URLs Discord expirent after un certain temps (quelques hours à quelques days).
- Pour un usage permanent, téléchargez and hébergez les files ailleurs.
- Utilisez `$textSplit[]` pour traiter each pièce jointe individuellement.
