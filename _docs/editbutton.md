---
layout: doc
title: $editButton
translation_key: docs
category: "Components"
function_name: editButton
syntax: $editButton[idOrUrl;label;(style);(disabled);(emoji)]
description: Modifies a button existing of a message. Allows changer le label, le style, the state disabled and the emoji of a button.
---
# $editButton

The `$editButton[]` function **modifier a button** existing on a message.

## Syntax

```
$editButton[idOrUrl;label;(style);(disabled);(emoji)]
```

## Parameters

| Parameter | Description |
|---|---|
| `idOrUrl` | Custom ID of the bouton (or URL for Link buttons). |
| `label` | New text displayed on the bouton. |
| `style` | *(Optional)* Style : `primary`, `secondary`, `success`, `danger`, `link`. |
| `disabled` | *(Optional)* `true` pour griser le bouton, `false` (default). |
| `emoji` | *(Optional)* Emoji to display to the left of the label. |

## Behavior

- Le bouton ciblé doit exister in the message in progress of édition.
- La modification est appliquée during l'édition of the message (via `$editMessage` or similar).
- All parameters except `idOrUrl` and `label` are optional.

## Examples

### Désenable a button after clic

```bdfd
$editButton[accept;✅ Accepté;success;true;✅]
$editButton[refuse;❌ Refusé;danger;true;❌]
```

### Changer le style of a button

```bdfd
$editButton[action;In progress...;secondary;true;⏳]
```

### Réinitialiser a button

```bdfd
$editButton[reset;🔄 Recommencer;primary;false;🔄]
```

## Notes

- Works with `$onInteraction` for mises to day dynamics.
- For Link buttons, use the URL like first parameter.
- Use with `$editMessage` pour appliquer les changements.
