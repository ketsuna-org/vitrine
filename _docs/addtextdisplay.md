---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addTextDisplay

Ajoute a component of text displayed in an action row. Allows display of the text static parmi les components interactifs.

## Syntax

```
$addTextDisplay[content]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `content` | Text to display in the composant | Yes |

## Description

`$addTextDisplay` allows insérer of the text non-interactif in an action row, to the côtés of buttons and menus. This allows creating layouts plus riches with labels, descriptions, or indicateurs.

## Examples

### Label before a button

```
$addActionRow
$addTextDisplay[Status :]
$addButtonCV2[btn_status;Activer;success]
$sendMessage[Controles]
```

### Label before un select

```
$addActionRow
$addTextDisplay[Role :]
$addRoleSelect[menu_role;Choisissez a role]
$sendMessage[Configuration]
```

### Text formatted with multiple components

```
$addActionRow
$addTextDisplay[Volume]
$addSeparator[no;sm]
$addButtonCV2[vol_down;➖;secondary]
$addButtonCV2[vol_mute;🔇;secondary]
$addButtonCV2[vol_up;➕;secondary]
$sendMessage[Controle of the volume]
```

### Indicateur of state

```
$addActionRow
$addTextDisplay[🔴 Offline]
$addSeparator[no;md]
$addButtonCV2[btn_refresh;Rafraîchir;primary]
$sendMessage[State of the service]
```

## Notes

- Le text est purement décoratif and non interactif.
- Ne compte pas in the limit of 5 components interactifs par ligne (à check according to the version BDFD).
- Utile to add labels or descriptions next to of components.
- Le contenu can include of emojis pour enrichir l'affichage.
