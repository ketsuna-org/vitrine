---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addButton

Ajoute un bouton interactif au message (style legacy). Permet de contrôler le placement via le paramètre `newRow`.

## Syntaxe

```
$addButton[newRow;customIdOrURL;label;(style);(disabled);(emoji);(messageId)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `newRow` | `"yes"` crée une nouvelle ligne avant le bouton, `"no"` ajoute à la ligne courante | Oui |
| `customIdOrURL` | ID personnalisé pour gérer le clic, ou URL pour un bouton lien | Oui |
| `label` | Texte affiché sur le bouton | Oui |
| `style` | Style du bouton : `primary` (défaut), `secondary`, `success`, `danger`, `link` | Non |
| `disabled` | `true` pour désactiver le bouton, `false` (défaut) | Non |
| `emoji` | Emoji à afficher avant le label | Non |
| `messageId` | ID du message cible (pour l'édition) | Non |

## Styles disponibles

| Style | Couleur | Usage typique |
|-------|---------|---------------|
| `primary` | Bleu/violet | Action principale |
| `secondary` | Gris | Action secondaire |
| `success` | Vert | Confirmation |
| `danger` | Rouge | Action destructive |
| `link` | Gris (lien) | URL externe |

## Exemples

### Bouton simple

```
$addButton[no;mon_bouton;Cliquez ici;primary;false;😊]
$sendMessage[Appuyez sur le bouton]
```

### Nouvelle ligne avec deux boutons

```
$addButton[no;btn_ok;✅ Valider;success]
$addButton[no;btn_no;❌ Refuser;danger]
$sendMessage[Choisissez une option]
```

### Bouton désactivé avec emoji

```
$addButton[no;btn_lock;🔒 Verrouillé;secondary;true]
$sendMessage[Action non disponible]
```

## Notes

- Ce style legacy est conservé pour rétrocompatibilité.
- Pour les nouveaux bots, privilégiez `$addButtonCV2` qui offre une API plus propre.
- Le paramètre `newRow` permet de contrôler finement la disposition.
- Max 5 boutons par ligne d'action.
