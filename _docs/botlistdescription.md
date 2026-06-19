---
layout: doc
title: $botListDescription
translation_key: docs
category: "Entity Info"
function_name: botListDescription
syntax: $botListDescription[text]
description: Définit ou retourne la description du bot affichée dans la liste des bots BDFD.
parameters:
  - name: text
    description: La description à définir. Si omis, retourne la description actuelle.
returns:
  - type: string
    description: La description actuelle si aucun paramètre, ou rien si définition.
related:
  - $botListHide
  - $botName
  - $botID
examples:
  - description: Définir la description
    code: |
      $botListDescription[Bot multifonction avec modération, musique et fun !]
      $sendMessage[Description mise à jour.]
  - description: Afficher la description
    code: |
      $sendMessage[Description : $botListDescription]
---

# $botListDescription

La fonction `$botListDescription[text]` **définit ou retourne la description du bot** telle qu'elle apparaît sur la liste publique des bots BDFD (bot list).

## Syntaxe

```
$botListDescription[text]
```

Pour lire la description actuelle :

```
$botListDescription
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Optionnel - La nouvelle description à définir. Si omis, retourne la description actuelle. |

## Valeur de retour

- **Type** : String
- Si appelée sans paramètre : la description actuelle.
- Si appelée avec paramètre : rien (la description est mise à jour).

## Comportement

- La description est visible sur la page publique du bot dans la BDFD Bot List.
- Limite de caractères : généralement 200-300 caractères.
- Le markdown basique peut être supporté selon la liste.

## Exemples

### Définir la description

```bdfd
$var[desc;$message[1]]
$if[$var[desc]==]
  $sendMessage[❌ Usage: !setdesc <description>]
  $stop
$endif

$botListDescription[$var[desc]]
$sendMessage[✅ Description du bot mise à jour !]
```

### Afficher la description actuelle

```bdfd
$title[📋 Description du bot]
$description[
$botListDescription
]
$footer[Utilisez !setdesc pour modifier]
$sendMessage[]
```

### Commande owner pour gérer la visibilité

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Réservé au propriétaire.]
  $stop
$endif

$var[action;$message[1]]
$if[$var[action]==set]
  $botListDescription[$message[2]]
  $sendMessage[✅ Description mise à jour.]
$elseif[$var[action]==show]
  $sendMessage[📋 **Description actuelle :**
  $botListDescription]
$else
  $sendMessage[❌ Usage: !botlist <set|show> [description]]
$endif
```

## Notes

- Sans paramètre, la fonction retourne la description actuelle.
- Avec paramètre, elle écrase la description précédente.
- Pour masquer le bot de la liste, utilisez `$botListHide`.
- La mise à jour peut prendre quelques minutes avant d'être visible.
