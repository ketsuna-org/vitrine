---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addSeparator

Adds a separator visuel in the action row courante. Utile pour espacer or regrouper visually of components.

## Syntax

```
$addSeparator[(divider);(spacing)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `divider` | `"yes"` to display a row de séparation, `"no"` (default) | No |
| `spacing` | Taille de l'espacement en pixels (values : `sm`, `md`, `lg`) | No |

## Description

`$addSeparator` insère un espace or a row de séparation between thes components d'une même action row. Il ne crée no new row — pour cela, use `$addActionRow`.

## Options de spacing

| Value | Taille approximative |
|--------|---------------------|
| `sm` | Petit espacement |
| `md` | Espacement moyen |
| `lg` | Grand espacement |

## Examples

### Separator simple

```
$addActionRow
$addButtonCV2[btn_left;Gauche;primary]
$addSeparator
$addButtonCV2[btn_right;Droite;secondary]
$sendMessage[Buttons espacés]
```

### Avec ligne de séparation

```
$addActionRow
$addButtonCV2[btn_1;Option A;success]
$addSeparator[yes]
$addButtonCV2[btn_2;Option B;danger]
$sendMessage[Options separatedes par a row]
```

### Espacement large

```
$addActionRow
$addTextDisplay[Text to the left]
$addSeparator[no;lg]
$addTextDisplay[Text à droite]
$sendMessage[Text bien espacé]
```

## Notes

- Le separator s'insère in the action row courante.
- Ne compte pas dans the limit de 5 components par ligne.
- La ligne de séparation (`divider: yes`) est une fine ligne horizontal.
- Compatible avec all components : buttons, select menus, text displays.
