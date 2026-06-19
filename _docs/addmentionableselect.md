---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addMentionableSelect

Crée un menu de sélection d'entités mentionnables. Permet aux utilisateurs de choisir parmi les utilisateurs ET les rôles du serveur.

## Syntaxe

```
$addMentionableSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `customId` | Identifiant personnalisé pour l'interaction | Oui |
| `placeholder` | Texte affiché quand rien n'est sélectionné | Oui |
| `minValues` | Nombre minimum d'entités à sélectionner (défaut : 1) | Non |
| `maxValues` | Nombre maximum d'entités à sélectionner (défaut : 1) | Non |
| `disabled` | `true` pour désactiver le menu, `false` (défaut) | Non |

## Description

Un **mentionable select** combine la sélection d'utilisateurs et de rôles en un seul menu. L'utilisateur peut choisir indifféremment des membres ou des rôles du serveur.

Les valeurs retournées sont des IDs. Utilisez `$roleExists` pour déterminer si un ID correspond à un rôle ou à un utilisateur.

## Exemples

### Sélection simple

```
$addMentionableSelect[menu_mention;Choisissez un membre ou un rôle]
$sendMessage[Sélectionnez une cible]
```

### Sélection multiple

```
$addMentionableSelect[menu_targets;Cibles multiples;1;10]
$sendMessage[Sélectionnez jusqu'à 10 cibles]
```

### Menu désactivé

```
$addMentionableSelect[menu_mention_off;Indisponible;1;1;true]
$sendMessage[Menu désactivé]
```

## Gestion de l'interaction

```
$onInteraction
$if[$customID==menu_mention]
  $if[$roleExists[$message]==true]
    $sendMessage[Rôle sélectionné : <@&$message>]
  $else
    $sendMessage[Utilisateur sélectionné : <@$message>]
  $endif
$endif
```

## Différence avec UserSelect et RoleSelect

| Fonction | Sélectionne |
|----------|-------------|
| `$addUserSelect` | Uniquement des utilisateurs |
| `$addRoleSelect` | Uniquement des rôles |
| `$addMentionableSelect` | Utilisateurs ET rôles |

## Notes

- Pratique pour les commandes de modération, giveaway, ou systèmes de permission.
- Utilisez `$roleExists` pour distinguer rôles et utilisateurs dans les valeurs retournées.
- Un seul select menu par ligne d'action.
