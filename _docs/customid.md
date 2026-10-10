---
layout: doc
title: $customID
translation_key: docs
category: "Components & Interactions"
function_name: customID
syntax: $customID
description: Returns the custom ID (customId) of the interaction component that triggered the callback (button, select menu, modal). Read in the script run for a component or modal interaction.
---
# $customID

The `$customID` function returns the **customId** of the component (button, select menu, modal) that triggered an interaction.

## Syntax

```
$customID
```

## Parameters

None.

## Return value

- **Type**: String
- The customId set during the creation of the component.

## Behavior

- Must be used in a script run by a component (button, select menu) or modal interaction; otherwise the engine raises `Custom ID requires a component or modal interaction callback.`
- Allows differentiating which button/menu was used.

## Examples

### Interaction handler

```bdfd
$if[$customID==accept]
  $sendMessage[Request accepted.]
$elseIf[$customID==refuse]
  $sendMessage[Request denied.]
$elseIf[$customID==info]
  $sendMessage[More information soon.]
$endif
```

### Log interactions

```bdfd
$log[Interaction received — customID: $customID — by $username]
```

### Branching on several IDs

```bdfd
$if[$customID==confirm]
  $sendMessage[✅ Confirmed]
$elseif[$customID==cancel]
  $sendMessage[❌ Cancelled]
$else
  $sendMessage[Unknown action: $customID]
$endif
```

## Notes

- Essential for systems of buttons and interactive menus.
- The customId is set by the developer in `$addButton[]`, `$addSelectMenu[]`, etc.
