---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addTextDisplay

Ajoute un composant de texte affiché dans une ligne d'action. Permet d'afficher du texte statique parmi les composants interactifs.

## Syntaxe

```
$addTextDisplay[content]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `content` | Texte à afficher dans le composant | Oui |

## Description

`$addTextDisplay` permet d'insérer du texte non-interactif dans une ligne d'action, aux côtés des boutons et menus. Cela permet de créer des layouts plus riches avec des labels, descriptions, ou indicateurs.

## Exemples

### Label avant un bouton

```
$addActionRow
$addTextDisplay[Statut :]
$addButtonCV2[btn_status;Activer;success]
$sendMessage[Contrôles]
```

### Label avant un select

```
$addActionRow
$addTextDisplay[Rôle :]
$addRoleSelect[menu_role;Choisissez un rôle]
$sendMessage[Configuration]
```

### Texte formaté avec plusieurs composants

```
$addActionRow
$addTextDisplay[Volume]
$addSeparator[no;sm]
$addButtonCV2[vol_down;➖;secondary]
$addButtonCV2[vol_mute;🔇;secondary]
$addButtonCV2[vol_up;➕;secondary]
$sendMessage[Contrôle du volume]
```

### Indicateur d'état

```
$addActionRow
$addTextDisplay[🔴 Hors ligne]
$addSeparator[no;md]
$addButtonCV2[btn_refresh;Rafraîchir;primary]
$sendMessage[État du service]
```

## Notes

- Le texte est purement décoratif et non interactif.
- Ne compte pas dans la limite de 5 composants interactifs par ligne (à vérifier selon la version BDFD).
- Utile pour ajouter des labels ou descriptions à côté des composants.
- Le contenu peut inclure des emojis pour enrichir l'affichage.
