---
layout: doc
title: $authorPerms
translation_key: docs
category: "Moderation"
function_name: authorPerms
syntax: $authorPerms
description: Retourne la liste des permissions de l'auteur de la commande sur le serveur. Utile pour vérifier dynamiquement ce que l'utilisateur peut faire.
parameters: []
returns:
  - type: string
    description: La liste des permissions de l'auteur, séparées par des virgules.
related:
  - $userPerms
  - $hasPerms
  - $checkUserPerms
  - $checkContains
examples:
  - description: Récupérer ses propres permissions
    code: $authorPerms
---

# $authorPerms

La fonction `$authorPerms` permet de **récupérer la liste des permissions** que possède l'auteur de la commande sur le serveur courant.

## Syntaxe

```
$authorPerms
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String
- Liste des permissions de l'auteur, séparées par `, `.
- Exemple : `SendMessages, ReadMessageHistory, AddReactions, ...`

## Comportement

- Retourne les permissions effectives de l'utilisateur (tenant compte des rôles et des permissions de salon).
- Équivalent à `$userPerms[$authorID]`.
- Les noms de permissions sont en anglais (format API Discord).

## Exemples

### Vérification de permission

```bdfd
$if[$checkContains[$authorPerms;BanMembers]==true]
  $sendMessage[✅ Vous avez la permission de bannir.]
$else
  $sendMessage[❌ Permission "Bannir des membres" manquante.]
$endif
```

### Debug des permissions

```bdfd
$title[🔑 Vos permissions]
$description[
$textSplit[$authorPerms;, ]
  $index. $splitText[$index]
$endTextSplit
]
$sendMessage[]
```

### Commande admin only

```bdfd
$if[$checkContains[$authorPerms;Administrator]==true]
  // Code sensible exécuté
  $sendMessage[✅ Action admin effectuée.]
$elseif[$checkContains[$authorPerms;ManageGuild]==true]
  // Permissions de gestion
  $sendMessage[✅ Action de gestion effectuée.]
$else
  $sendMessage[❌ Permissions insuffisantes.]
$endif
```

### Multi-vérification

```bdfd
$if[$checkContains[$authorPerms;KickMembers]==true]
  $if[$checkContains[$authorPerms;BanMembers]==true]
    $sendMessage[✅ Vous pouvez kick ET bannir.]
  $else
    $sendMessage[⚠️ Vous pouvez kick mais pas bannir.]
  $endif
$else
  $sendMessage[❌ Aucune permission de modération.]
$endif
```

## Notes

- Utilisez `$checkContains[$authorPerms;Permission]` pour tester une permission spécifique.
- Les permissions sont retournées en anglais (noms API Discord).
- `$authorPerms` est un raccourci pour `$userPerms[$authorID]`.
