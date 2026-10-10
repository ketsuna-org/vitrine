---
layout: doc
title: $removeComponent[]
translation_key: docs
category: "Components & Interactions"
function_name: removeComponent
syntax: $removeComponent[customId]
description: Removes a specific component (button, menu, text field, etc.) from a message using its custom identifier (customId).
---

# $removeComponent[] — Remove a Component

`$removeComponent[]` removes a specific component from a message based on its `customId`. This allows dynamically disabling or removing buttons, menus, or input fields after an interaction.

## Syntax

```
$removeComponent[customId]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `customId` | Yes | Identifier of the component to remove (defined at its creation). |

## Return Value

Removes the component from the message. If no component with this `customId` exists, nothing happens.

## Examples

### Removal after click

```bdfd
$if[$customID==confirm_btn]
  $removeComponent[confirm_btn]
  $removeComponent[cancel_btn]
  $editMessage[$channelID;$messageID;✅ Action confirmed!]
$endif
```

### Disable a button after use

```bdfd
$if[$customID==claim_reward]
  $removeComponent[claim_reward]
  $sendMessage[$username has claimed the reward!]
$endif
```

### Remove multiple specific components

```bdfd
$if[$customID==reset_form]
  $removeComponent[name_input]
  $removeComponent[email_input]
  $removeComponent[submit_btn]
  $editMessage[$channelID;$messageID;Form reset]
$endif
```

### Menu that disappears after selection

```bdfd
$if[$customID==role_menu]
  $removeComponent[role_menu]
  $var[role;$getRoleSelectRoleID[1]]
  $giveRole[$authorID;$var[role]]
  $editMessage[$channelID;$messageID;Role <@&$var[role]> assigned!]
$endif
```

## Notes

- The `customId` must match exactly the one defined when creating the component (`$addButton[customId;...]`, `$addTextInput[customId;...]`, etc.).
- If the component doesn't exist, the function fails silently.
- Used primarily in the script run by a component interaction (read with `$customID`) to modify the message after a user action.
- To remove all buttons at once, use `$removeButtons[]`.
- To remove everything, use `$removeAllComponents[]`.
