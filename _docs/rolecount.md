---
layout: doc
title: $roleCount
translation_key: docs
category: "Entity Info"
function_name: roleCount
syntax: $roleCount[(guildID)]
description: Retourne le nombre total de rôles sur le serveur Discord.
parameters:
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: integer
    description: Le nombre de rôles.
related:
  - $roleNames
  - $roleExists
  - $channelCount
  - $categoryCount
examples:
  - description: Nombre de rôles
    code: $sendMessage[Total rôles : $roleCount]
  - description: Comparaison
    code: $sendMessage[$roleCount rôles pour $memberCount membres.]
---

# $roleCount

La fonction `$roleCount` retourne le **nombre total de rôles** présents sur le serveur Discord, incluant le rôle `@everyone`.

## Syntaxe

```
$roleCount[(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `guildID` | Optionnel. L'ID du serveur cible. Si omis, le serveur courant. |

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | Le nombre de rôles sur le serveur. |

## Exemples

### Nombre de rôles

```bdfd
$sendMessage[Ce serveur a $roleCount rôles.]
```

### Statistiques du serveur

```bdfd
$sendMessage[
**Stats du serveur :**
Membres : $memberCount
Rôles : $roleCount
Salons : $channelCount
]
```

### Vérifier la limite de rôles

```bdfd
$if[$roleCount>=250]
  $sendMessage[⚠️ Attention : ce serveur approche de la limite de 250 rôles Discord.]
$endif
```

## Notes

- Inclut le rôle `@everyone` dans le compte.
- La limite Discord est de 250 rôles par serveur.
- Utile pour des statistiques ou des vérifications administratives.
