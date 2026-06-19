---
layout: doc
title: $memberPerms
translation_key: docs
category: "Entity Info"
function_name: memberPerms
syntax: $memberPerms
description: Retourne la liste des permissions effectives du membre sur le serveur. Équivalent à $userPerms.
parameters: []
returns:
  - type: list/array
    description: Liste des noms de permissions du membre sur le serveur.
related:
  - $userPerms
  - $memberID
  - $memberNick
  - $isAdmin
examples:
  - description: Obtenir les permissions du membre
    code: $memberPerms
  - description: Vérifier une permission spécifique
    code: |
      $if[$checkContains[$memberPerms;BanMembers]==true]
        $sendMessage[Vous pouvez bannir des membres.]
      $endif
---

# $memberPerms

La variable `$memberPerms` retourne la **liste des permissions effectives** du membre sur le serveur actuel. Elle est équivalente à `$userPerms`.

## Syntaxe

```
$memberPerms
```

## Valeur de retour

- **Type** : Liste de noms de permissions (en anglais), séparés par des virgules
- Exemple : `SendMessages, ReadMessageHistory, AddReactions, ManageMessages`

## Comportement

- `$memberPerms` ne prend **aucun argument**.
- Retourne les permissions combinées de tous les rôles du membre et des overwrites de salon.
- Fonctionnellement identique à `$userPerms` pour l'utilisateur déclencheur.

## Exemples

### Afficher les permissions

```bdfd
$title[Permissions de $memberNick]
$description[
**Permissions du membre :**
$memberPerms
]
$color[#5865F2]
$sendMessage[]
```

### Commande de modération

```bdfd
$if[$checkContains[$memberPerms;KickMembers]==true]
  $kick[$mentioned]
  $sendMessage[<@$mentioned> a été expulsé.]
$else
  $sendMessage[Permission KickMembers requise.]
$endif
```

## Notes

- `$memberPerms` et `$userPerms` sont interchangeables.
- Les noms de permissions sont en **anglais** (nomenclature API Discord).
- Pour une simple vérification d'administration, utilisez `$isAdmin`.
