---
layout: doc
title: $byteCount
translation_key: docs
category: "Entity Info"
function_name: byteCount
syntax: $byteCount[text]
description: Calcule et retourne le nombre d'octets (bytes) d'une chaîne de texte. Utile pour vérifier la taille d'un message avant envoi.
parameters:
  - name: text
    description: Le texte dont on veut calculer la taille en octets.
returns:
  - type: string (number)
    description: Le nombre d'octets du texte fourni.
related:
  - $length
  - $charCount
  - $messageLength
examples:
  - description: Calculer la taille d'un message
    code: $byteCount[$message]
  - description: Calculer la taille d'une variable
    code: $byteCount[$getVar[data]]
---

# $byteCount

La fonction `$byteCount[]` permet de **calculer le nombre d'octets** (bytes) d'un texte donné. Utile pour vérifier les limites de taille des messages Discord ou évaluer le poids de données.

## Syntaxe

```
$byteCount[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le texte dont on souhaite connaître la taille en octets. |

## Valeur de retour

- **Type** : String (nombre)
- Le nombre d'octets que représente le texte.

## Comportement

- Compte les octets, pas les caractères (un caractère Unicode peut valoir plusieurs octets).
- Les caractères ASCII comptent pour 1 octet, les emojis et caractères accentués pour plus.
- Utile pour la validation de données avant stockage ou envoi.

## Exemples

### Vérification avant envoi

```bdfd
$let[size;$byteCount[$message]]
$if[$size>2000]
  $sendMessage[⚠️ Message trop long ($size octets). Limite Discord : 2000 caractères.]
$else
  $sendMessage[$message]
$endif
```

### Vérification de données stockées

```bdfd
$let[data;$getVar[userData]]
$let[size;$byteCount[$data]]

$title[📦 Données utilisateur]
$description[
**Taille :** $size octets ($math[$size/1024] Ko)
**Nombre de caractères :** $length[$data]
]
$sendMessage[]
```

### Comparaison de tailles

```bdfd
$let[ascii;$byteCount[Hello World]]
$let[unicode;$byteCount[Héllö Wörld]]
$let[emoji;$byteCount[Hello 👋]]

ASCII : $ascii octets
Unicode (accents) : $unicode octets
Avec emoji : $emoji octets
```

## Notes

- `$byteCount` diffère de `$length` : `$length` compte les caractères, `$byteCount` compte les octets.
- Avec du texte ASCII pur, les deux valeurs sont identiques.
- Discord limite les messages à 2000 caractères (pas d'octets), mais cette fonction reste utile pour les calculs de stockage.
