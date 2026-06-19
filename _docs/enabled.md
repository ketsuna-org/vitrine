---
layout: doc
title: $enabled
translation_key: docs
category: "Commands"
function_name: enabled
syntax: $enabled[yes/no]
description: Active or désactive une command. Quand désenablede (no), la command is no longer exécutable par users.
---
# $enabled

The `$enabled[]` function **activer or désactiver** la command in thequelle elle is placede.

## Syntax

```
$enabled[yes/no]
```

## Parameters

| Parameter | Description |
|---|---|
| `yes/no` | `yes` to enable la command, `no` for the désactiver. |

## Return value

None.

## Behavior

- `$enabled[no]` rend la command invisible and inexécutable.
- `$enabled[yes]` la réactive.
- Can be combiné with conditions for ae activation contextuelle.

## Examples

### Désactiver temporarily

```bdfd
$enabled[no]
```

### Activation conditionnelle par role

```bdfd
$if[$hasRole[$authorID;Admin]==true]
  $enabled[yes]
$else
  $enabled[no]
$endif
```

### Command de maintenance

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

- Une command désenablede n'apparaît pas in thes suggestions.
- Contrairement à `$onlyIf[]` qui laisse la command visible mais bloque l'execution, `$enabled[no]` la masque totalement.
- Utile for commands en maintenance or saisonnières.
