---
layout: doc
title: $scriptLanguage
translation_key: docs
category: "Entity Info"
function_name: scriptLanguage
syntax: $scriptLanguage
description: Returns the langage of script utilisé par the bot (BDScript or BDJS).
---

# $scriptLanguage

The function `$scriptLanguage` **retourne le langage of script** configured for the bot on the plateforme BDFD. The values possibles sont `bdscript` (langage natif BDFD) or `bdjs` (JavaScript-like).

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

- Le langage est défini in thes parameters of the bot on the console BDFD.
- BDJS allows to use structures JavaScript (variables, functions, etc.).
- BDScript est le langage traditionnel basé on the functions `$`.

## Examples

### Vérification of the mode

```bdfd
$if[$scriptLanguage==bdjs]
  $sendMessage[📝 Ce bot utilise **BDJS** (JavaScript).

  Vous pouvez use the syntaxe JavaScript :
  ```js
  var x = 5;
  if (x > 3) {.. }
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
;; Exemple of function qui s'adapte to the langage
$if[$scriptLanguage==bdjs]
  $sendMessage[💡 En BDJS, utilisez `var` pour déclarer variables.
  Example: `var x = 10;`]
$else
  $sendMessage[💡 En BDScript, utilisez `$var[]` pour déclarer variables.
  Example: `$var[x;10]`]
$endif
```

## Notes

- Values possibles : `bdscript` or `bdjs`.
- Le choix of the langage est fait to la création of the bot and can be modified in thes parameters.
- BDJS allows to use `if/else`, `for`, `while` JavaScript additionally functions `$`.
- BDScript est recommended for the débutants.
