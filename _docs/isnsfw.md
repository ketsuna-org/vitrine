---
layout: doc
title: $isNSFW
translation_key: docs
category: "Math & Text"
function_name: isNSFW
syntax: $isNSFW[channelID]
description: Checks if un canal est marqué comme NSFW.
---

# $isNSFW

The function `$isNSFW[channelID]` **vérifie if a canal Discord est marqué comme NSFW** (Not Safe For Work).

## Syntax

```
$isNSFW[channelID]
```

Ou without parameter for the canal courant :

```
$isNSFW
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional - The ID of the canal. Default: canal où the command est executed. |

## Return Value

- **Type** : Boolean
- `true` if the canal est marqué NSFW.
- `false` if the canal is not NSFW or est introuvable.

## Behavior

- Checks l'attribute `nsfw` du canal Discord.
- Les canaux NSFW sont restreints aux users moreover de 18 ans.
- Functionne only in thes servers (pas en DM).

## Examples

### Command restreinte

```bdfd
$if[$isNSFW==true]
  ;; Afficher le contenu NSFW
  $sendMessage[🔞 Contenu NSFW...]
$else
  $sendMessage[❌ Cette command ne can be utilisée que dans un canal NSFW.]
$endif
```

### Information canal

```bdfd
$title[📺 Informations du canal]
$description[
**Nom :** $channelName
**ID :** $channelID
**NSFW :** $if[$isNSFW==true]🔞 Oui$else✅ Non$endif
**Catégorie :** $channelCategory
]
$sendMessage[]
```

### Vérification d'un autre canal

```bdfd
$var[canal;$message[1]]
$if[$isNSFW[$var[canal]]==true]
  $sendMessage[🔞 Le canal <#$var[canal]> est NSFW.]
$else
  $sendMessage[✅ Le canal <#$var[canal]> is not NSFW.]
$endif
```

## Notes

- Sans parameter, vérifie le canal où the command est executed.
- En DM, the function retourne toudays `false`.
- Pour modifier le status NSFW d'un canal, utilisez `$modifyChannel[]`.
