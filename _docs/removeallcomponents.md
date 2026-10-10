---
layout: doc
title: $removeAllComponents[]
translation_key: docs
category: "Components & Interactions"
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

## Examples

### Form finalization

```bdfd
$if[$customID==submit_form]
  $removeAllComponents[$messageID]
  $var[name;$input[name_input]]
  $var[email;$input[email_input]]
  $editMessage[$channelID;$messageID;✅ Form submitted!
**Name:** $var[name]
**Email:** $var[email]]
$endif
```

### Lock after expiration

```bdfd
$if[$customID==timeout_event]
  $removeAllComponents[$messageID]
  $editMessage[$channelID;$messageID;⏰ This panel has expired. Interaction is no longer possible.]
$endif
```

### Complete cleanup

```bdfd
$addTextInput[query;Search;short;Search...;;yes;2;100]
$addButton[search;Search;Primary;;search_btn]
$addButton[cancel;Cancel;Danger;;cancel_btn]

$if[$customID==search_btn]
  $removeAllComponents[$messageID]
  $var[query;$input[query]]
  $editMessage[$channelID;$messageID;Results for **$var[query]**:\nNo results found.]
$elseif[$customID==cancel_btn]
  $removeAllComponents[$messageID]
  $editMessage[$channelID;$messageID;Search cancelled]
$endif
```

### Configuration panel

```bdfd
$title[Configuration]
$description[Modify your settings]
$addTextInput[nickname;Nickname;short;$nickname;;no;2;32]
$addButton[save;Save;Success;;save_config]

$if[$customID==save_config]
  $removeAllComponents[$messageID]
  $var[nick;$input[nickname]]
  $editMessage[$channelID;$messageID;✅ Nickname updated: **$var[nick]**]
$endif
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
- To be used in the script run for an interaction (read the clicked component with `$customID`), with `$editMessage[]` or `$sendMessage[]`.
- Irreversible: once removed, components cannot be restored without sending a new message.
