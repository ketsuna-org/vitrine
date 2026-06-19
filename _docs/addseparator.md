---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addSeparator

Ajoute un séparateur visuel dans la ligne d'action courante. Utile pour espacer ou regrouper visuellement des composants.

## Syntaxe

```
$addSeparator[(divider);(spacing)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `divider` | `"yes"` pour afficher une ligne de séparation, `"no"` (défaut) | Non |
| `spacing` | Taille de l'espacement en pixels (valeurs : `sm`, `md`, `lg`) | Non |

## Description

`$addSeparator` insère un espace ou une ligne de séparation entre les composants d'une même ligne d'action. Il ne crée pas de nouvelle ligne — pour cela, utilisez `$addActionRow`.

## Options de spacing

| Valeur | Taille approximative |
|--------|---------------------|
| `sm` | Petit espacement |
| `md` | Espacement moyen |
| `lg` | Grand espacement |

## Exemples

### Séparateur simple

```
$addActionRow
$addButtonCV2[btn_left;Gauche;primary]
$addSeparator
$addButtonCV2[btn_right;Droite;secondary]
$sendMessage[Boutons espacés]
```

### Avec ligne de séparation

```
$addActionRow
$addButtonCV2[btn_1;Option A;success]
$addSeparator[yes]
$addButtonCV2[btn_2;Option B;danger]
$sendMessage[Options séparées par une ligne]
```

### Espacement large

```
$addActionRow
$addTextDisplay[Texte à gauche]
$addSeparator[no;lg]
$addTextDisplay[Texte à droite]
$sendMessage[Texte bien espacé]
```

## Notes

- Le séparateur s'insère dans la ligne d'action courante.
- Ne compte pas dans la limite de 5 composants par ligne.
- La ligne de séparation (`divider: yes`) est une fine ligne horizontale.
- Compatible avec tous les composants : boutons, selects, text displays.
