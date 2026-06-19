---
layout: doc
title: $removeAllComponents[]
translation_key: docs
category: "Embed & Message"
function_name: removeAllComponents
syntax: $removeAllComponents
description: Removes all interactive components (buttons, menus, text fields, etc.) from a message in a single operation.
---

# $removeAllComponents[] — Remove All Components

`$removeAllComponents[]` removes all interactive components from a message. After this operation, the message becomes purely static — no more buttons, menus, or input fields.

## Syntax

```
$removeAllComponents
```

## Parameters

No parameters.

## Return Value

Removes all components from the message, making it non-interactive.

## Usage

### Form finalization

```bdfd
$onInteraction[submit_form]
$removeAllComponents
$var[name;$input[name_input]]
$var[email;$input[email_input]]
$editMessage[✅ Form submitted!
**Name:** $var[name]
**Email:** $var[email]]
$endInteraction
```

### Lock after expiration

```bdfd
$onInteraction[timeout_event]
$removeAllComponents
$editMessage[⏰ This panel has expired. Interaction is no longer possible.]
$endInteraction
```

### Completee cleanup

```bdfd
$addTextInput[query;Search;short;Search...;;yes;2;100]
$addButton[search;Search;Primary;;search_btn]
$addButton[cancel;Cancel;Danger;;cancel_btn]

$onInteraction[search_btn]
$removeAllComponents
$var[query;$input[query]]
$editMessage[Results for **$var[query]**:\nNo results found.]
$endInteraction

$onInteraction[cancel_btn]
$removeAllComponents
$editMessage[Search cancelled]
$endInteraction
```

### Configuration panel

```bdfd
$title[Configuration]
$description[Modify your settings]
$addTextInput[nickname;Nickname;short;$nickname;;no;2;32]
$addButton[save;Save;Success;;save_config]

$onInteraction[save_config]
$removeAllComponents
$var[nick;$input[nickname]]
$editMessage[✅ Nickname updated: **$var[nick]**]
$endInteraction
```

## Comparison of removal functions

| Function | Effect |
|----------|--------|
| `$removeComponent[id]` | Removes a specific component |
| `$removeButtons` | Removes all buttons only |
| `$removeAllComponents` | Removes **all** components |

## Notes

- After `$removeAllComponents[]`, the message can no longer receive user interactions.
- Used to "consume" an interface after processing.
- To be used in `$onInteraction` handlers with `$editMessage[]` or `$sendMessage[]`.
- Irreversible: once removed, components cannot be restored without sending a new message.
