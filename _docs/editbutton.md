---
layout: doc
title: $editButton
translation_key: docs
category: "Components"
function_name: editButton
syntax: $editButton[idOrUrl;label;(style);(disabled);(emoji)]
description: Modifie un bouton existant d'un message. Permet de changer le label, le style, l'état désactivé et l'emoji d'un bouton.
---
# $editButton

La fonction `$editButton[]` permet de **modifier un bouton** existant sur un message.

## Syntaxe

```
$editButton[idOrUrl;label;(style);(disabled);(emoji)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `idOrUrl` | Custom ID du bouton (ou URL pour les Link buttons). |
| `label` | Nouveau texte affiché sur le bouton. |
| `style` | *(Optionnel)* Style : `primary`, `secondary`, `success`, `danger`, `link`. |
| `disabled` | *(Optionnel)* `true` pour griser le bouton, `false` (défaut). |
| `emoji` | *(Optionnel)* Emoji à afficher à gauche du label. |

## Comportement

- Le bouton ciblé doit exister dans le message en cours d'édition.
- La modification est appliquée lors de l'édition du message (via `$editMessage` ou similaire).
- Tous les paramètres sauf `idOrUrl` et `label` sont optionnels.

## Exemples

### Désactiver un bouton après clic

```bdfd
$editButton[accept;✅ Accepté;success;true;✅]
$editButton[refuse;❌ Refusé;danger;true;❌]
```

### Changer le style d'un bouton

```bdfd
$editButton[action;En cours...;secondary;true;⏳]
```

### Réinitialiser un bouton

```bdfd
$editButton[reset;🔄 Recommencer;primary;false;🔄]
```

## Notes

- Fonctionne avec `$onInteraction` pour les mises à jour dynamiques.
- Pour les Link buttons, utilisez l'URL comme premier paramètre.
- Utilisez avec `$editMessage` pour appliquer les changements.
