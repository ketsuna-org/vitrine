---
layout: doc
title: $debug
translation_key: docs
category: "Flags & Debug"
function_name: debug
syntax: $debug
description: Enables the mode debug for the command in progress. Displays information of diagnostic in the console or les logs BDFD.
---
# $debug

The `$debug` function **enables the mode debug** for the execution of the command in progress.

## Syntax

```
$debug
```

## Parameters

Aucun.

## Return value

None.

## Behavior

- Une fois enabled, BDFD displays information of diagnostic supplémentaires.
- Aide to tracer the errors, les values of variables, and the flux of execution.
- Le mode debug is disabled automatically to the end of the command.

## Examples

### Debug simple

```bdfd
$debug
$let[result;$calculate[2+2]]
$sendMessage[Result : $result]
```

### Debug conditionnel

```bdfd
$if[$message[1]==--debug]
  $debug
$endif
$sendMessage[Debug enabled pour cette execution.]
```

### Debug in a command complex

```bdfd
$debug
$var[userData;$getGlobalUserVar[$authorID;xp]]
$sendMessage[XP : $userData]
```

## Notes

- Le debug consomme ressources of log ; ne l'activez pas en production.
- Combinez with `$log[]` pour logs customs.
- Utile pour résoudre les comportements inattendus.
