---
layout: doc
title: $scriptLanguage
translation_key: docs
category: "Entity Info"
function_name: scriptLanguage
syntax: $scriptLanguage
description: Returns the langage de script utilisé par the bot (BDScript or BDJS).
---

# $scriptLanguage

The function `$scriptLanguage` **retourne le langage de script** configured for the bot sur la plateforme BDFD. The values possibles sont `bdscript` (langage natif BDFD) or `bdjs` (JavaScript-like).

## Syntax

```
$scriptLanguage
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- `bdscript` : the bot utilise le langage BDScript natif.
- `bdjs` : the bot utilise BDJS (syntaxe JavaScript).

## Behavior

- Le langage est défini in thes parameters of the bot sur la console BDFD.
- BDJS allows to utiliser des structures JavaScript (variables, functions, etc.).
- BDScript est le langage traditionnel basé sur les functions `$`.

## Examples

### Vérification du mode

```bdfd
$if[$scriptLanguage==bdjs]
  $sendMessage[📝 Ce bot utilise **BDJS** (JavaScript).

  Vous pouvez utiliser la syntaxe JavaScript :
  ```js
  var x = 5;
  if (x > 3) { ... }
  ```]
$else
  $sendMessage[📝 Ce bot utilise **BDScript**.

  Syntaxe traditionnelle :
  ```bdfd
  $var[x;5]
  $if[$var[x]>3]
    ...
  $endif
  ```]
$endif
```

### Page information

```bdfd
$title[⚙️ Configuration of the bot]
$addField[🤖 Nom;$botName;yes]
$addField[📝 Langage;$if[$scriptLanguage==bdjs]BDJS (JavaScript)$elseBDScript$endif;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📦 Node;$botNode;yes]
$footer[BDFD Bot Creator]
$color[#5865F2]
$sendMessage[]
```

### Aide contextuelle

```bdfd
;; Exemple de function qui s'adapte au langage
$if[$scriptLanguage==bdjs]
  $sendMessage[💡 En BDJS, utilisez `var` pour déclarer des variables.
  Example: `var x = 10;`]
$else
  $sendMessage[💡 En BDScript, utilisez `$var[]` pour déclarer des variables.
  Example: `$var[x;10]`]
$endif
```

## Notes

- Values possibles : `bdscript` or `bdjs`.
- Le choix du langage est fait à la création of the bot and can be modified in thes parameters.
- BDJS allows to utiliser des `if/else`, `for`, `while` JavaScript additionally des functions `$`.
- BDScript est recommended for the débutants.
