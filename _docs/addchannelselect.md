---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addChannelSelect

Crée un menu de sélection de salons. Permet aux utilisateurs de choisir un ou plusieurs salons du serveur.

## Syntaxe

```
$addChannelSelect[customId;placeholder;(minValues);(maxValues);(disabled);(channelTypes)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `customId` | Identifiant personnalisé pour l'interaction | Oui |
| `placeholder` | Texte affiché quand rien n'est sélectionné | Oui |
| `minValues` | Nombre minimum de salons à sélectionner (défaut : 1) | Non |
| `maxValues` | Nombre maximum de salons à sélectionner (défaut : 1) | Non |
| `disabled` | `true` pour désactiver le menu, `false` (défaut) | Non |
| `channelTypes` | Types de salons affichés, séparés par des virgules | Non |

## Types de salons (channelTypes)

| Type | Description |
|------|-------------|
| `text` | Salons textuels |
| `voice` | Salons vocaux |
| `category` | Catégories |
| `news` | Salons d'annonces |
| `stage` | Salons de scène |
| `forum` | Forums |
| `thread` | Fils de discussion |

Par défaut, tous les types sont affichés.

## Exemples

### Sélection de salon

```
$addChannelSelect[menu_channel;Choisissez un salon]
$sendMessage[Sélectionnez un salon]
```

### Salon textuel uniquement

```
$addChannelSelect[menu_text;Salon textuel;1;1;false;text]
$sendMessage[Choisissez un salon textuel]
```

### Salons vocaux et scènes

```
$addChannelSelect[menu_vocal;Salon vocal;1;3;false;voice,stage]
$sendMessage[Sélectionnez des salons vocaux]
```

### Menu désactivé

```
$addChannelSelect[menu_chan_disabled;Indisponible;1;1;true]
$sendMessage[Ce menu est désactivé]
```

## Gestion de l'interaction

```
$onInteraction
$if[$customID==menu_channel]
  $sendMessage[Salon sélectionné : <#$message>]
$endif
```

## Notes

- Les valeurs retournées sont des IDs de salons Discord.
- Utilisez `<#ID>` pour mentionner un salon.
- Le paramètre `channelTypes` permet de filtrer précisément les salons affichés.
- Pratique pour les commandes de configuration, logs, ou redirections.
