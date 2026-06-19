---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addButtonCV2

Ajoute un bouton interactif au message en utilisant le style Component V2. Ce bouton est toujours ajouté à la ligne d'action courante.

## Syntaxe

```
$addButtonCV2[customIdOrURL;label;(style);(disabled);(emoji)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `customIdOrURL` | ID personnalisé pour gérer le clic, ou URL pour un bouton lien | Oui |
| `label` | Texte affiché sur le bouton | Oui |
| `style` | Style : `primary` (défaut), `secondary`, `success`, `danger`, `link` | Non |
| `disabled` | `true` pour désactiver le bouton, `false` (défaut) | Non |
| `emoji` | Emoji à afficher avant le label | Non |

## Différence avec $addButton

Contrairement à `$addButton` (legacy), `$addButtonCV2` ne possède pas de paramètre `newRow`. Pour organiser les boutons sur plusieurs lignes, utilisez `$addActionRow` avant chaque groupe.

## Exemples

### Bouton simple

```
$addButtonCV2[mon_bouton;Cliquez ici;primary]
$sendMessage[Appuyez sur le bouton]
```

### Plusieurs boutons sur des lignes distinctes

```
$addActionRow
$addButtonCV2[btn_yes;✅ Oui;success]
$addButtonCV2[btn_no;❌ Non;danger]

$addActionRow
$addButtonCV2[btn_maybe;🤔 Peut-être;secondary]
$sendMessage[Faites votre choix]
```

### Bouton lien

```
$addButtonCV2[https://discord.com;Site Discord;link;false;🌐]
$sendMessage[Visitez le site]
```

### Bouton désactivé

```
$addButtonCV2[btn_disabled;Indisponible;primary;true;🚫]
$sendMessage[Fonctionnalité à venir]
```

## Gestion des interactions

Les clics sur les boutons sont gérés via l'événement `$onInteraction` :

```
$onInteraction
$if[$customID==mon_bouton]
  $sendMessage[Vous avez cliqué !]
$endif
```

## Notes

- Pas de paramètre `newRow` : utilisez `$addActionRow` pour le placement.
- Max 5 boutons par ligne d'action.
- API recommandée pour les nouveaux développements.
