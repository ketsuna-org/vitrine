---
layout: doc
title: $trimContent
translation_key: docs
category: "Text Manipulation"
function_name: trimContent
syntax: $trimContent[text]
description: Supprime les espaces en début and fin d'un text (trim). Ne modifie pas les espaces à l'intérieur du text.
---
# $trimContent

The function `$trimContent[]` **supprime les espaces** en début and fin d'une string (trim).

## Syntax

```
$trimContent[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text à nettoyer (espaces en début/fin deleteds). |

## Return Value

- **Type** : String
- Le text without espaces au début ni à la fin.

## Behavior

- Ne touche PAS aux espaces between thes mots.
- Supprime espaces, tabulations, and retours à la ligne en début/fin.
- Très utile after une extraction or une concaténation.

## Examples

### Nettoyage simple

```bdfd
$sendMessage[Result : "$trimContent[   Hello World   ]"]
; Displays : Result : "Hello World"
```

### Nettoyer une entrée user

```bdfd
$let[input;$trimContent[$message[2]]]
$sendMessage[Argument nettoyé : "$input"]
```

### Compareason without espaces

```bdfd
$if[$trimContent[$message[1]]==admin]
  $sendMessage[Mode admin enabled.]
$endif
```

### Nettoyage after extraction

```bdfd
$let[extracted;$subString[$message;0;10]]
$let[clean;$trimContent[$extracted]]
$sendMessage[$clean]
```

## Notes

- Plus efficace que `$replaceText[text; ;]` because il ne modifie que les extrémités.
- Pour supprimer all espaces (y compris internals), utilisez `$replaceText[text; ;]`.
- Pour conserver TOUS les espaces, utilisez `$disableInnerSpaceRemoval`.
