---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addActionRow

Démarre une nouvelle ligne d'action (action row) pour contenir des boutons ou des menus de sélection.

## Syntaxe

```
$addActionRow[(id)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `id` | Identifiant personnalisé pour la ligne d'action | Non |

## Description

Une **action row** est un conteneur qui regroupe des composants interactifs (boutons, menus de sélection) sur une même ligne horizontale dans un message Discord. Chaque message peut contenir jusqu'à 5 action rows, et chaque action row peut contenir jusqu'à 5 boutons ou 1 menu de sélection.

`$addActionRow` doit être appelée avant d'ajouter des composants (boutons, selects) pour les organiser sur des lignes distinctes.

## Exemples

### Ligne simple

```
$addActionRow
$addButtonCV2[btn_1;Cliquez-moi;primary]
$sendMessage[Voici un bouton !]
```

### Avec ID personnalisé

```
$addActionRow[row_boutons]
$addButtonCV2[btn_ok;OK;success]
$addButtonCV2[btn_cancel;Annuler;danger]
$sendMessage[Confirmez votre choix]
```

### Plusieurs lignes

```
$addActionRow
$addButtonCV2[btn_1;Bouton 1;primary]
$addButtonCV2[btn_2;Bouton 2;primary]

$addActionRow
$addButtonCV2[btn_3;Bouton 3;secondary]
$sendMessage[Deux rangées de boutons]
```

## Notes

- Chaque `$addActionRow` crée une nouvelle ligne. Les composants ajoutés après seront placés sur cette ligne.
- Sans `$addActionRow`, les composants sont placés sur une ligne par défaut.
- Une action row ne peut contenir que des boutons OU un seul menu de sélection, pas les deux.
- Maximum 5 action rows par message.
