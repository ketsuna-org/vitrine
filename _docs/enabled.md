---
layout: doc
title: $enabled
translation_key: docs
category: "Commands"
function_name: enabled
syntax: $enabled[yes/no]
description: Active ou désactive une commande. Quand désactivée (no), la commande n'est plus exécutable par les utilisateurs.
parameters:
  - name: yes/no
    description: '"yes" pour activer, "no" pour désactiver la commande.'
returns:
  - type: void
    description: Change l'état. Ne retourne rien.
related:
  - $deleteCommand
  - $onlyIf
  - $disableInnerSpaceRemoval
examples:
  - description: Désactiver une commande
    code: $enabled[no]
  - description: Réactiver une commande
    code: $enabled[yes]
---
# $enabled

La fonction `$enabled[]` permet d'**activer ou désactiver** la commande dans laquelle elle est placée.

## Syntaxe

```
$enabled[yes/no]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `yes/no` | `yes` pour activer la commande, `no` pour la désactiver. |

## Valeur de retour

Aucune.

## Comportement

- `$enabled[no]` rend la commande invisible et inexécutable.
- `$enabled[yes]` la réactive.
- Peut être combiné avec des conditions pour une activation contextuelle.

## Exemples

### Désactiver temporairement

```bdfd
$enabled[no]
```

### Activation conditionnelle par rôle

```bdfd
$if[$hasRole[$authorID;Admin]==true]
  $enabled[yes]
$else
  $enabled[no]
$endif
```

### Commande de maintenance

```bdfd
$var[maintenance;$getVar[maintenance]]
$if[$var[maintenance]==true]
  $if[$hasRole[$authorID;Staff]==true]
    $enabled[yes]
  $else
    $enabled[no]
  $endif
$else
  $enabled[yes]
$endif
```

## Notes

- Une commande désactivée n'apparaît pas dans les suggestions.
- Contrairement à `$onlyIf[]` qui laisse la commande visible mais bloque l'exécution, `$enabled[no]` la masque totalement.
- Utile pour les commandes en maintenance ou saisonnières.
