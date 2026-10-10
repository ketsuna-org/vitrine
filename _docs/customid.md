---
layout: doc
title: $customID
translation_key: docs
category: "Components & Interactions"
function_name: customID
syntax: $customID
description: Returns the custom ID (customId) of the interaction component that triggered the callback (button, select menu, modal). Used in $onInteraction.
---

# $customID

The `$customID` function returns the **custom ID** of the component or modal that triggered the current interaction.

## Syntax

```text
$customID
```

## Parameters

None (it takes no argument).

## Return value

- **Type**: String
- For a button or select menu click, the custom ID of that component; for a modal submission, the custom ID of the modal (the first argument of `$newModal[]`).

## Behavior

- It must be used in a script run for a component or modal interaction; otherwise the engine raises `Custom ID requires a component or modal interaction callback.`
- If the interaction carries no custom ID, it raises `Interaction custom ID is missing.`
- It allows telling which button, menu or modal was used.

## Examples

### Interaction handler

```bdfd
$if[$customID==accept]
  Request accepted.
$elseif[$customID==refuse]
  Request denied.
$else
  Unknown action: $customID
$endif
```

### Echo the ID

```bdfd
Interaction received, custom ID: $customID
```

## Notes

- The custom ID is the one set when the component was created, for example in `$addButtonCV2[]`, `$addStringSelect[]` or `$newModal[]`.
- Select values are read with `$getStringSelectValue[]` and the other `$get*Select*` functions, and modal fields with `$input[]`.
