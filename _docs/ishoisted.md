---
layout: doc
title: $isHoisted
translation_key: docs
category: "Entity Info"
function_name: isHoisted
syntax: $isHoisted
description: "Returns \"true\" if the user's highest role is displayed separately in the member list, \"false\" otherwise."
---

# $isHoisted

The variable `$isHoisted` returns `"true"` if the user's highest role is **displayed separately** (hoisted) in the server member list.

## Syntax

```
$isHoisted
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the role is displayed separately in the members sidebar
- `"false"` : the role is not hoisted

## Behavior

- `$isHoisted` takes **no arguments**.
- A "hoisted" role appears in a separate section of the online member list.
- The "hoist" property is configured in the role settings on Discord.

## Examples

### Check hoist status

```bdfd
$if[$isHoisted==true]
  $sendMessage[Your highest role is displayed separately.]
$else
  $sendMessage[Your role is in the general members category.]
$endif
```

### Detection for sorting

```bdfd
$title[Role status]
$description[
**Highest role hoisted:** $isHoisted
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- "Hoist" is a property of the **role**, not directly of the user.
- `$isHoisted` checks if the user's **highest role** is hoisted.
- Useful for rankings or visual hierarchy systems.
