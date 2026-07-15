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
$removeButtons
```

## Parameters

No parameters.

## Return Value

Removes all buttons from the message. Other components (TextInput, Select Menus) are not affected.

## Usage

### Disable after voting

```bdfd
$onInteraction[vote_yes]
$removeButtons
$editMessage[✅ Vote recorded: **Yes**]
$endInteraction
```

### Self-locking interface

```bdfd
$onInteraction[poll_choice]
$removeButtons
$var[choice;$input[poll_choice]]
$editMessage[Thank you for your vote: **$var[choice]**]
$endInteraction
```

### Confirmation with removal

```bdfd
$addButton[confirm;Confirm;Success;yes;confirm_action]
$addButton[cancel;Cancel;Danger;yes;cancel_action]

$onInteraction[confirm_action]
$removeButtons
$editMessage[✅ Action confirmed and executed!]
$endInteraction

$onInteraction[cancel_action]
$removeButtons
$editMessage[❌ Action cancelled]
$endInteraction
```

### Temporary admin panel

```bdfd
$title[Admin Panel]
$description[Choose an action:]
$addButton[ban;Ban;Danger;;admin_ban]
$addButton[kick;Kick;Secondary;;admin_kick]
$addButton[mute;Mute;Primary;;admin_mute]
$footer[Single use — the panel disables after use]

$onInteraction[admin_ban]
$removeButtons
$editMessage[User banned]
$endInteraction
```

## Notes

- Removes **all** buttons, regardless of their customId.
- TextInput, Select Menus, and other non-button components are preserved.
- To remove a specific button, use `$removeComponent[customId]`.
- To remove absolutely all components, use `$removeAllComponents[]`.
- Used primarily in `$onInteraction` handlers after processing.
