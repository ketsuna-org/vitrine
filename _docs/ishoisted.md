---
layout: doc
title: $isHoisted
translation_key: docs
category: "Entity Info"
function_name: isHoisted
syntax: $isHoisted[roleID]
description: "Returns \"true\" if the role is displayed separately in the member list, \"false\" otherwise."
---

# $isHoisted

The function `$isHoisted[roleID]` returns `"true"` if the given role is **hoisted**, that is displayed separately in the server member list.

## Syntax

```
$isHoisted[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | Required. The ID of the role (in the current server). An invalid ID raises "Invalid role ID."; an ID that is not a role of the server raises "Role not found." |

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the role is displayed separately in the members sidebar
- `"false"` : the role is not hoisted

## Behavior

- `$isHoisted` takes **exactly one argument**; a bare `$isHoisted` is invalid.
- The "hoist" property is configured in the role settings on Discord.

## Examples

### Check hoist status

```bdfd
$if[$isHoisted[$roleID[VIP]]==true]
  $sendMessage[The VIP role is displayed separately.]
$else
  $sendMessage[The VIP role is in the general members category.]
$endif
```

### Display the status

```bdfd
$title[Role status]
$description[
**VIP hoisted:** $isHoisted[$roleID[VIP]]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- "Hoist" is a property of the **role**, not of the user.
- `$roleID[name]` returns an empty string if no single role has this name, which makes `$isHoisted` fail.
