---
layout: doc
title: $commandFolder
translation_key: docs
category: "Entity Info"
function_name: commandFolder
syntax: $commandFolder
description: Returns the name of the folder contenant la command in progress of execution.
---

# $commandFolder

The `$commandFolder` function **retourne the name of the folder** in thequel la command in progress est organisée on the console BDFD.

## Syntax

```
$commandFolder
```

## Parameters

Aucun.

## Return value

- **Type** : String
- The name of the folder (ex: `Modération`, `Fun`, `Admin`, `Utils`).

## Behavior

- Les folders sont définis in the organisateur of commands BDFD.
- Utile to organize les logs, l'aide, or les permissions.
- Returns a string vide if the command est to la racine.

## Examples

### Log organisé

```bdfd
$log[📂 [$commandFolder] $userName a executed $commandName]
```

### Aide contextuelle

```bdfd
$title[📖 $commandName]
$addField[📂 Catégorie;$commandFolder;yes]
$addField[⚡ Type;$commandType;yes]
$addField[🔤 Trigger;$commandTrigger;yes]
$description[
Aide complete of the command...
]
$sendMessage[]
```

### Permissions par folder

```bdfd
$if[$commandFolder==Admin]
  $if[$hasRole[$roleID[Admin]]==false]
    $sendEphemeral[❌ Les commands of the folder Admin sont réservées.]
    $stop
  $endif
$endif

;; Command executede normalement
$sendMessage[✅ Command executede.]
```

### Page of accueil par folder

```bdfd
$if[$commandFolder==Modération]
  $sendMessage[🛡️ **Modération** - Commands of gestion of the server.]
$elseif[$commandFolder==Fun]
  $sendMessage[🎮 **Fun** - Commands of divertissement.]
$elseif[$commandFolder==Utils]
  $sendMessage[🔧 **Utilitaires** - Commands pratiques.]
$else
  $sendMessage[📂 Folder : $commandFolder]
$endif
```

## Notes

- The name of the folder est celui set in the console BDFD.
- Utile for the structuration commands and les permissions.
- String vide if the command is not in a folder.
