---
layout: doc
title: $scriptLanguage
translation_key: docs
category: "Entity Info"
function_name: scriptLanguage
syntax: $scriptLanguage
description: Returns the scripting language of the interpreter running the script.
---

# $scriptLanguage

The function `$scriptLanguage` **returns the name of the scripting language** of the interpreter running the script. The native interpreter implements BDScript 2 and always returns `BDScript 2`.

## Syntax

```
$scriptLanguage
```

## Parameters

None.

## Return Value

- **Type**: String
- `BDScript 2`: the value returned by the native interpreter.

## Behavior

- Takes no argument (`$scriptLanguage[]` is the same as `$scriptLanguage`).
- The native interpreter always returns `BDScript 2`.

## Examples

### Display the language

```bdfd
$sendMessage[📝 This bot runs **$scriptLanguage**.]
```

### Information Page

```bdfd
$title[⚙️ Bot Configuration]
$addField[🤖 Name;$botName;yes]
$addField[📝 Language;$scriptLanguage;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📦 Node;$botNode;yes]
$footer[BDFD Bot Creator]
$color[#5865F2]
```

## Notes

- The native interpreter implements BDScript 2 and always returns `BDScript 2`.
