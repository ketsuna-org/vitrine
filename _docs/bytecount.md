---
layout: doc
title: $byteCount
translation_key: docs
category: "Entity Info"
function_name: byteCount
syntax: $byteCount[text]
description: Calculates and retourne the namebre of octets (bytes) of a string of text. Utile pour check the size of a message before envoi.
---

# $byteCount

The `$byteCount[]` function **calculer the namebre of octets** (bytes) of un text donné. Utile pour check thes limits of taille of messages Discord or évaluer le poids of datas.

## Syntax

```
$byteCount[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | Le text dont on souhaite connaître the size en octets. |

## Return value

- **Type** : String (number)
- The namebre of octets que represents le text.

## Behavior

- Counts the octets, pas les becauseactères (un becauseactère Unicode peut valoir multiple octets).
- Les becauseactères ASCII comptent pour 1 octet, les emojis and becauseactères accentués pour plus.
- Utile for the validation of datas before stockage or envoi.

## Examples

### Vérification before envoi

```bdfd
$let[size;$byteCount[$message]]
$if[$size>2000]
  $sendMessage[⚠️ Message trop long ($size octets). Limit Discord : 2000 becauseactères.]
$else
  $sendMessage[$message]
$endif
```

### Vérification of datas stockées

```bdfd
$let[data;$getVar[userData]]
$let[size;$byteCount[$data]]

$title[📦 Datas user]
$description[
**Taille :** $size octets ($math[$size/1024] Ko)
**Number of characters :** $length[$data]
]
$sendMessage[]
```

### Compareason of tailles

```bdfd
$let[ascii;$byteCount[Hello World]]
$let[unicode;$byteCount[Héllö Wörld]]
$let[emoji;$byteCount[Hello 👋]]

ASCII : $ascii octets
Unicode (accents) : $unicode octets
Avec emoji : $emoji octets
```

## Notes

- `$byteCount` diffère of `$length` : `$length` compte les becauseactères, `$byteCount` compte les octets.
- Avec of the text ASCII pur, les two values sont identicals.
- Discord limit les messages to 2000 becauseactères (pas of octets), mais cette function reste utile for calculs of stockage.
