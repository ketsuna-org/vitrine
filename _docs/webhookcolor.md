---
layout: doc
title: $webhookColor
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookColor
syntax: $webhookColor[hexColor]
description: Sets the couleur of la barre latérale of the embed for the prochain message sent via $webhookSend.
---

# $webhookColor

The function `$webhookColor[]` allows **define the color of the embed** (barre latérale gauche) for the prochain message webhook.

## Syntax

```
$webhookColor[hexColor]
```

## Parameters

| Parameter | Description |
|---|---|
| `hexColor` | Code couleur hexadecimal, with or without the préfixe `#`. Examples: `#FF0000`, `5865F2`, `00FF00`. |

## Return Value

This function ne retourne pas of value. Elle définit the color of the prochain embed.

## Behavior

- The color s'applique to la barre latérale gauche of the embed.
- Si no embed n'est défini (pas of `$webhookTitle` or `$webhookDescription`), the color est ignorée.
- The color est réinitialisée after each `$webhookSend[]`.

## Examples

### Embed colored

```bdfd
$webhookTitle[Success]
$webhookDescription[L'opération was effectuée with success.]
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

- Utilisez couleurs cohérentes for the lisibilité : rouge pour errors, vert pour success, bleu pour info.
- The color default of Discord est `#000000` (pas of barre colored).
- Les couleurs trop claires can be peu visibles en thème clair.
