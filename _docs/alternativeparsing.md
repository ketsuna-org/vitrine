---
layout: doc
title: $alternativeParsing
translation_key: docs
category: "Flags & Debug"
function_name: alternativeParsing
syntax: $alternativeParsing
description: Enables an alternative parsing mode for the current command. Useful for resolving certain syntax conflicts or unexpected behaviors of the BDFD parser.
---
# $alternativeParsing

The `$alternativeParsing` function enables an **alternative parsing mode** for the current command. This mode uses a different processing logic that can resolve compatibility issues.

## Syntax

```
$alternativeParsing
```

## Parameters

None.

## Return value

None.

## Behavior

- Changes how BDFD interprets and executes the command code.
- Can resolve bugs related to nested brackets `[]` or special characters.
- Effect is limited to the current command.

## Examples

### Resolving a bracket conflict

```bdfd
$alternativeParsing
$sendMessage[$replaceText[Hello [World];[ ];-]]
```

### Command with complex syntax

```bdfd
$alternativeParsing
$if[$checkContains[$message;[;]==true]
  $sendMessage[Content detected.]
$else
  $sendMessage[No content.]
$endif
```

## Notes

- Use when standard parsing causes unexplained errors.
- Can slightly slow down execution.
- To be placed at the beginning of the command, before any other code.
- Alternative to `$optOff` for purely syntax-related issues.
