---
layout: doc
title: $webhookColor
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookColor
syntax: $webhookColor[hexColor]
description: Sets the couleur de la barre latérale of the embed for the prochain message sent via $webhookSend.
---

# $webhookColor

The function `$webhookColor[]` allows **définir the color of the embed** (barre latérale gauche) for the prochain message webhook.

## Syntax

```
$webhookColor[hexColor]
```

## Parameters

| Parameter | Description |
|---|---|
| `hexColor` | Code couleur hexadecimal, avec or without the préfixe `#`. Examples: `#FF0000`, `5865F2`, `00FF00`. |

## Return Value

This function ne retourne pas de value. Elle définit the color du prochain embed.

## Behavior

- The color s'applique à la barre latérale gauche of the embed.
- Si no embed n'est défini (pas de `$webhookTitle` or `$webhookDescription`), the color est ignorée.
- The color est réinitialisée after each `$webhookSend[]`.

## Examples

### Embed coloré

```bdfd
$webhookTitle[Success]
$webhookDescription[L'opération was effectuée avec success.]
$webhookColor[#57F287]
$webhookFooter[✅ Opération réussie]
$webhookSend[$webhookURL;]
```

### Couleurs conditionnelles

```bdfd
$if[$checkContains[$message;error]==true]
  $webhookColor[#ED4245]
  $webhookTitle[Error détectée]
$else
  $webhookColor[#5865F2]
  $webhookTitle[Information]
$endif
$webhookDescription[$message]
$webhookSend[$logHook;]
```

## Notes

- Utilisez des couleurs cohérentes for the lisibilité : rouge pour errors, vert pour success, bleu pour info.
- The color default de Discord est `#000000` (pas de barre colorée).
- Les couleurs trop claires can be peu visibles en thème clair.
