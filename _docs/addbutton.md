---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addButton

Ajoute a button interactif to the message (legacy style). Allows controler le placement via le parameter `newRow`.

## Syntax

```
$addButton[newRow;customIdOrURL;label;(style);(disabled);(emoji);(messageId)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `newRow` | `"yes"` crée une new row before le bouton, `"no"` ajoute to la ligne courante | Yes |
| `customIdOrURL` | ID custom to manage le clic, or URL pour a button link | Yes |
| `label` | Text displayed on the button | Yes |
| `style` | Style of the bouton : `primary` (default), `secondary`, `success`, `danger`, `link` | No |
| `disabled` | `true` to disable le bouton, `false` (default) | No |
| `emoji` | Emoji to display before le label | No |
| `messageId` | ID of the message target (for the édition) | No |

## Available styles

| Style | Couleur | Usage typique |
|-------|---------|---------------|
| `primary` | Bleu/violet | Action main |
| `secondary` | Gris | Action secondary |
| `success` | Vert | Confirmation |
| `danger` | Rouge | Action destructive |
| `link` | Gris (link) | URL external |

## Examples

### Simple button

```
$addButton[no;mon_bouton;Cliquez ici;primary;false;😊]
$sendMessage[Appuyez on the bouton]
```

### New ligne with two buttons

```
$addButton[no;btn_ok;✅ Validr;success]
$addButton[no;btn_no;❌ Refuser;danger]
$sendMessage[Choisissez une option]
```

### Bouton disabled with emoji

```
$addButton[no;btn_lock;🔒 Verrouillé;secondary;true]
$sendMessage[Action non available]
```

## Notes

- Ce legacy style is kept pour rétrocompatibilité.
- For newx bots, prefer `$addButtonCV2` qui offre une API plus propre.
- Le parameter `newRow` allows controlling finement la disposition.
- Max 5 buttons par action row.
