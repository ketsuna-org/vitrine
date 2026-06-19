---
layout: doc
title: $commandType
translation_key: docs
category: "Entity Info"
function_name: commandType
syntax: $commandType
description: Returns the type of the command in progress (prefix or slash).
---

# $commandType

The `$commandType` function **returns the type of the command in progress** : `prefix` for commands textuelles classiques, `slash` for commands slash Discord.

## Syntax

```
$commandType
```

## Parameters

Aucun.

## Return value

- **Type** : String
- `prefix` : command déclenchée par un préfixe text (`!`, `?`, etc.).
- `slash` : command déclenchée via the interface slash Discord (`/`).

## Behavior

- Allows adapter le behavior selon the type d'invocation.
- Équivaslow functionnel à `$if[$isSlash==true]slash$elseprefix$endif`.

## Examples

### Response adaptative

```bdfd
$if[$commandType==slash]
  $sendEphemeral[✅ Opération réussie !]
$else
  $sendMessage[✅ Opération réussie !]
$endif
```

### Log différencié

```bdfd
$if[$commandType==slash]
  $log[🔹 SLASH /$commandName par $userName]
$else
  $log[🔸 PREFIX $commandTrigger par $userName]
$endif
```

### Aide contextuelle

```bdfd
$title[⚙️ Détails of the command]
$addField[Nom;$commandName;yes]
$addField[Trigger;$commandTrigger;yes]
$addField[Type;$if[$commandType==slash]🔹 Slash$else🔸 Prefix$endif;yes]
$addField[Folder;$commandFolder;yes]
$footer[Langage : $scriptLanguage]
$sendMessage[]
```

### Command hybride avec arguments

```bdfd
;; Récupération des arguments selon the type
$if[$commandType==slash]
  $var[arg1;$slashOption[cible]]
  $var[arg2;$slashOption[reason]]
$else
  $var[arg1;$message[1]]
  $var[arg2;$message[2]]
$endif

$sendMessage[🎯 Cible : $var[arg1] | Reason : $var[arg2]]
```

## Notes

- Values possibles : `prefix` or `slash`.
- Pour un test boolean simple, use `$isSlash`.
- Les responses éphémères (`$sendEphemeral[]`) ne functionnent qu'en type `slash`.
- The type est set in the console BDFD during la création of the command.
