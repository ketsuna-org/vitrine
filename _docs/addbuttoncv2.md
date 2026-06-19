---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addButtonCV2

Ajoute a button interactif au message en utilisant le style Component V2. Ce bouton est toudays added à la action row courante.

## Syntax

```
$addButtonCV2[customIdOrURL;label;(style);(disabled);(emoji)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customIdOrURL` | ID custom to manage le clic, or URL pour a button link | Yes |
| `label` | Text displayed on the button | Yes |
| `style` | Style : `primary` (default), `secondary`, `success`, `danger`, `link` | No |
| `disabled` | `true` to disable le bouton, `false` (default) | No |
| `emoji` | Emoji to display before le label | No |

## Difference from $addButton

Contrairement à `$addButton` (legacy), `$addButtonCV2` ne possède no parameter `newRow`. Pour organize les buttons sur multiple lignes, use `$addActionRow` before each groupe.

## Examples

### Simple button

```
$addButtonCV2[mon_bouton;Cliquez ici;primary]
$sendMessage[Appuyez on the bouton]
```

### Multiple buttons sur of rows distinctes

```
$addActionRow
$addButtonCV2[btn_yes;✅ Oui;success]
$addButtonCV2[btn_no;❌ Non;danger]

$addActionRow
$addButtonCV2[btn_maybe;🤔 Peut-être;secondary]
$sendMessage[Faites votre choix]
```

### Link button

```
$addButtonCV2[https://discord.com;Site Discord;link;false;🌐]
$sendMessage[Visitez le site]
```

### Disabled button

```
$addButtonCV2[btn_disabled;Inavailable;primary;true;🚫]
$sendMessage[Functionnalité à venir]
```

## Handling interactions

The clics sur les buttons sont gérés via l'event `$onInteraction` :

```
$onInteraction
$if[$customID==mon_bouton]
  $sendMessage[Vous avez cliqué !]
$endif
```

## Notes

- Pas de parameter `newRow` : use `$addActionRow` for the placement.
- Max 5 buttons par action row.
- API recommendede for newx développements.
