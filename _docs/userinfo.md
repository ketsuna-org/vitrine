---
layout: doc
title: $userInfo
translation_key: docs
category: "Entity Info"
function_name: userInfo
syntax: $userInfo[userID;(property)]
description: Returns a JSON object containing a user's information, or a specific property if requested.
---

# $userInfo

The `$userInfo` function returns a **JSON object** containing detailed information about a Discord user, or a specific property extracted from that object.

## Syntax

```
$userInfo[userID;(property)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The ID of the target user. If omitted, uses the triggering user. |
| `property` | Optional. The name of a property to extract from the JSON object. If omitted, returns the complete object. |

## Return Value

- **Type**: JSON object or string depending on the requested property.
- Available properties: `id`, `username`, `discriminator`, `avatar`, `bot`, `system`, `banner`, `accent_color`, `global_name`, `display_name`, `public_flags`

## Examples

### Get the complete JSON object

```bdfd
$sendMessage[```json
$userInfo
```]
```

### Extract the global name of a user

```bdfd
$title[User Search]
$description[
**ID:** $mentioned
**Global Name:** $userInfo[$mentioned;global_name]
**Is Bot:** $userInfo[$mentioned;bot]
]
$color[#5865F2]
$sendMessage[]
```

### Use with JSON parsing

```bdfd
$let[info;$userInfo]
$let[name;$jsonParse[$info;username]]
$sendMessage[Name: $name]
```

## Notes

- `$userInfo` provides unified access to all properties of a user.
- The available properties are the same as those of the Discord API User Object.
- Useful for advanced integrations requiring structured data.
