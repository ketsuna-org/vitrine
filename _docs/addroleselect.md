---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addRoleSelect

Crée un menu de sélection de rôles. Permet aux utilisateurs de choisir un ou plusieurs rôles du serveur depuis une liste déroulante.

## Syntaxe

```
$addRoleSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `customId` | Identifiant personnalisé pour l'interaction | Oui |
| `placeholder` | Texte affiché quand rien n'est sélectionné | Oui |
| `minValues` | Nombre minimum de rôles à sélectionner (défaut : 1) | Non |
| `maxValues` | Nombre maximum de rôles à sélectionner (défaut : 1) | Non |
| `disabled` | `true` pour désactiver le menu, `false` (défaut) | Non |

## Description

Un **role select** affiche la liste des rôles du serveur. L'utilisateur peut en sélectionner un ou plusieurs. Les IDs des rôles sélectionnés sont retournés dans `$onInteraction`.

Idéal pour les systèmes de self-roles, la sélection de départements, ou les menus de notification.

## Exemples

### Attribution de rôle

```
$addRoleSelect[menu_role;Choisissez votre rôle]
$sendMessage[Sélectionnez votre rôle principal]
```

### Self-roles multiples

```
$addRoleSelect[menu_notifs;Notifications;1;3]
$sendMessage[Choisissez les notifications à recevoir]
```

### Menu désactivé

```
$addRoleSelect[menu_role_disabled;Sélection fermée;1;1;true]
$sendMessage[Les inscriptions sont closes]
```

## Gestion de l'interaction

```
$onInteraction
$if[$customID==menu_role]
  $giveRole[$authorID;$message]
  $sendMessage[Vous avez reçu le rôle <@&$message> !]
$endif
```

## Notes

- Les valeurs retournées sont des IDs de rôles Discord.
- Utilisez `<@&ID>` pour mentionner un rôle.
- Seuls les rôles que le bot peut gérer apparaîtront (hiérarchie des rôles).
- Parfait pour les systèmes de self-roles et menus d'inscription.
