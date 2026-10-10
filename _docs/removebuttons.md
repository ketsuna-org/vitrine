---
layout: doc
title: $removeButtons[]
translation_key: docs
category: "Components & Interactions"
function_name: removeButtons
syntax: $removeButtons
description: Removes all buttons from a message in a single operation. Other components (menus, text fields) are preserved.
---

# $removeButtons[] — Remove All Buttons

`$removeButtons[]` removes all button-type components from a message. This is the simplest method to disable an interface after a user has interacted with it.

## Syntax

```
$removeButtons[(messageID)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `messageID` | ID of an existing message whose buttons are removed. Without it, the buttons of the message being built are removed. | No |

## Return Value

Removes all buttons from the message. Other components (TextInput, Select Menus) are not affected.

## Examples

A button click triggers the script; read which component was clicked with `$customID` (see `$customID`).

### Disable after voting

```bdfd
$if[$customID==vote_yes]
  $removeButtons[123456789012345678]
  $editMessage[$channelID;123456789012345678;✅ Vote recorded: **Yes**]
$endif
```

### Self-locking interface

```bdfd
$if[$customID==poll_a]
  $removeButtons[123456789012345678]
  $editMessage[$channelID;123456789012345678;Thank you for your vote: **$customID**]
$endif
```

### Confirmation with removal

Sending the buttons:

```bdfd
$addButton[yes;confirm_action;Confirm;success]
$addButton[no;cancel_action;Cancel;danger]
$sendMessage[Do you confirm this action?]
```

Handling the click:

```bdfd
$if[$customID==confirm_action]
  $removeButtons[123456789012345678]
  $editMessage[$channelID;123456789012345678;✅ Action confirmed and executed!]
$elseif[$customID==cancel_action]
  $removeButtons[123456789012345678]
  $editMessage[$channelID;123456789012345678;❌ Action cancelled]
$endif
```

### Temporary admin panel

```bdfd
$title[Admin Panel]
$description[Choose an action:]
$addButton[yes;admin_ban;Ban;danger]
$addButton[no;admin_kick;Kick;secondary]
$addButton[no;admin_mute;Mute;primary]
$footer[Single use — remove the buttons once an action is chosen]
```

## Notes

- Removes **all** buttons, regardless of their customId.
- TextInput, Select Menus, and other non-button components are preserved.
- To remove a specific button, use `$removeComponent[customId]`.
- To remove absolutely all components, use `$removeAllComponents[]`.
- Used primarily in scripts triggered by a component interaction, after processing.
