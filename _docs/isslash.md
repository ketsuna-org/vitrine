---
layout: doc
title: $isSlash
translation_key: docs
category: "Math & Text"
function_name: isSlash
syntax: $isSlash
description: Checks if the command was triggerede par une command slash.
---

# $isSlash

The function `$isSlash` **vérifie si the command in progress was triggerede via une command slash** (application command) plutôt qu'une command prefix classique.

## Syntax

```
$isSlash
```

## Parameters

Aucun.

## Return Value

- **Type** : Boolean
- `true` si the command was invoquée via `/command`.
- `false` si elle was invoquée via le préfixe (`!command`, `?command`, etc.).

## Behavior

- Allows to adapter le comportement according to the mode of invocation.
- Utile pour envoyer responses éphémères en slash (`$sendEphemeral[]`).
- Sans parameter : context of the command in progress only.

## Examples

### Response adaptative

```bdfd
$if[$isSlash==true]
  $sendEphemeral[✅ Action effectuée with success !]
$else
  $sendMessage[✅ Action effectuée with success !]
$endif
```

### Log of diagnostic

```bdfd
$if[$isSlash==true]
  $log[Command /$commandName executed par $userName]
$else
  $log[Command $commandTrigger executed par $userName]
$endif
```

### Message of information

```bdfd
$var[type;$if[$isSlash==true]Slash$elsePrefix$endif]
$title[ℹ️ Information command]
$description[
**Nom :** $commandName
**Type :** $var[type]
**Folder :** $commandFolder
]
$color[$if[$isSlash==true]#5865F2$else#57F287$endif]
$sendMessage[]
```

### Command hybride

```bdfd
;; Cette command functionne en prefix and en slash
$if[$isSlash==true]
  $var[args;$slashOption[1]]
$else
  $var[args;$message[1]]
$endif

;; Traitement commun
$sendMessage[Vous avez fourni : $var[args]]
```

## Notes

- `$isSlash` ne prend pas of parameters.
- Pour obtenir the type précis of the command, utilisez `$commandType`.
- Les responses éphémères (`$sendEphemeral[]`) ne functionnent qu'en slash.
- `$isSlash` est évalué in the context of the command in progress of exécution.
