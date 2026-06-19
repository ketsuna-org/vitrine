---
layout: doc
title: $customID
translation_key: docs
category: "Embed & Message"
function_name: customID
syntax: $customID
description: Returns the custom ID (customId) of the interaction component that triggered the callback (button, select menu, modal). Used in $onInteraction.
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

- Must be used in an `$onInteraction` callback.
- Allows differentiating which button/menu was used.

## Examples

### Interaction handler

```bdfd
$onInteraction
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
$onInteraction
$log[Interaction received — customID: $customID — by $username]
```

### Dynamic switch

```bdfd
$onInteraction
$switch[$customID;
  confirm;$sendMessage[✅ Confirmed];
  cancel;$sendMessage[❌ Cancelled];
  delete;$deleteChannels[$channelID]
]
```

## Notes

- Functional equivalent to `$interactionData[customId]`.
- Essential for systems of buttons and interactive menus.
- The customId is set by the developer in `$addButton[]`, `$addSelectMenu[]`, etc.
