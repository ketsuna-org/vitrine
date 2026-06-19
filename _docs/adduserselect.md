---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addUserSelect

Crée un menu de sélection d'utilisateurs. Permet aux utilisateurs de choisir un ou plusieurs membres du serveur depuis une liste déroulante.

## Syntaxe

```
$addUserSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Paramètres

| Paramètre | Description | Obligatoire |
|-----------|-------------|:-----------:|
| `customId` | Identifiant personnalisé pour l'interaction | Oui |
| `placeholder` | Texte affiché quand rien n'est sélectionné | Oui |
| `minValues` | Nombre minimum d'utilisateurs à sélectionner (défaut : 1) | Non |
| `maxValues` | Nombre maximum d'utilisateurs à sélectionner (défaut : 1) | Non |
| `disabled` | `true` pour désactiver le menu, `false` (défaut) | Non |

## Description

Un **user select** affiche une liste des membres du serveur. L'utilisateur peut en sélectionner un ou plusieurs. Les IDs des utilisateurs sélectionnés sont retournés dans `$onInteraction`.

## Exemples

### Sélection d'un utilisateur

```
$addUserSelect[menu_user;Choisissez un membre]
$sendMessage[Sélectionnez un utilisateur]
```

### Sélection multiple

```
$addUserSelect[menu_mods;Choisissez des modérateurs;1;5]
$sendMessage[Sélectionnez 1 à 5 modérateurs]
```

### Menu désactivé

```
$addUserSelect[menu_user_disabled;Sélection désactivée;1;1;true]
$sendMessage[Ce menu est temporairement indisponible]
```

## Gestion de l'interaction

```
$onInteraction
$if[$customID==menu_user]
  $sendMessage[Utilisateur sélectionné : <@$message>]
$endif

$if[$customID==menu_mods]
  $sendMessage[Modérateurs sélectionnés : $message]
$endif
```

## Notes

- Les valeurs retournées sont des IDs d'utilisateurs Discord.
- Utilisez `<@ID>` pour mentionner l'utilisateur dans un message.
- Pour la sélection multiple, les IDs sont séparés par des virgules (ou selon la configuration du bot).
- Un seul select menu par ligne d'action.
