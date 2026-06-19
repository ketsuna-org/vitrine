---
layout: doc
title: $scriptLanguage
translation_key: docs
category: "Entity Info"
function_name: scriptLanguage
syntax: $scriptLanguage
description: Returns the scripting language used by the bot (BDScript or BDJS).
---

# $scriptLanguage

The function `$scriptLanguage` **returns the scripting language** configured for the bot on the BDFD platform. The possible values are `bdscript` (native BDFD language) or `bdjs` (JavaScript-like).

## Syntax

```
$scriptLanguage
```

## Parameters

None.

## Return Value

- **Type**: String
- `bdscript`: the bot uses the native BDScript language.
- `bdjs`: the bot uses BDJS (JavaScript syntax).

## Behavior

- The language is defined in the bot's settings on the BDFD console.
- BDJS allows the use of JavaScript structures (variables, functions, etc.).
- BDScript is the traditional language based on `$` functions.

## Examples

### Check the mode

```bdfd
$if[$scriptLanguage==bdjs]
  $sendMessage[📝 This bot uses **BDJS** (JavaScript).

  You can use JavaScript syntax:
  ```js
  var x = 5;
  if (x > 3) { ... }
  ```]
$else
  $sendMessage[📝 This bot uses **BDScript**.

  Traditional syntax:
  ```bdfd
  $var[x;5]
  $if[$var[x]>3]
   ...
  $endif
  ```]
$endif
```

### Information Page

```bdfd
$title[⚙️ Bot Configuration]
$addField[🤖 Name;$botName;yes]
$addField[📝 Language;$if[$scriptLanguage==bdjs]BDJS (JavaScript)$elseBDScript$endif;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📦 Node;$botNode;yes]
$footer[BDFD Bot Creator]
$color[#5865F2]
$sendMessage[]
```

### Contextual Help

```bdfd
;; Example of a function adapting to the language
$if[$scriptLanguage==bdjs]
  $sendMessage[💡 In BDJS, use `var` to declare variables.
  Example: `var x = 10;`]
$else
  $sendMessage[💡 In BDScript, use `$var[]` to declare variables.
  Example: `$var[x;10]`]
$endif
```

## Notes

- Possible values: `bdscript` or `bdjs`.
- The choice of language is made when creating the bot and can be modified in the settings.
- BDJS allows the use of JavaScript `if/else`, `for`, and `while` in addition to `$` functions.
- BDScript is recommended for beginners.
