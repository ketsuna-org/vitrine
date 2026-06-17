---
layout: doc
title: $jsonValue[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonValue
syntax: $jsonValue[key]
description: Retrieves the string value of a key from the current JSON object. For nested access, use dot notation in the key path.
parameters:
  - name: key
    type: string
    required: true
    description: The key whose value to retrieve. Supports dot notation for nested keys (e.g., 'user.name' or 'items.0.title').
returns:
  type: string
  description: The value at the specified key path as a string. Returns an empty string if the key does not exist.
related:
  - jsonset
  - jsonExists
  - jsonArrayIndex
  - jsonKeys
examples:
  - title: Get a simple value
    code: |
      $jsonParse[{"name":"Alice","age":25}]
      Name: $jsonValue[name]
  - title: Get a nested value
    code: |
      $jsonParse[{"user":{"profile":{"displayName":"Alice99"}}}]
      Display name: $jsonValue[user.profile.displayName]
  - title: Get a value from an array index
    code: |
      $jsonParse[{"users":[{"name":"Alice"},{"name":"Bob"}]}]
      Second user: $jsonValue[users;1;name]
  - title: Use in conditional logic
    code: |
      $jsonParse[$httpResult]
      $if[$jsonValue[status]==success]
      Operation completed!
      $endif
---
$jsonValue retrieves values from the JSON object. Use dot notation to traverse nested objects, and semicolons (;) to access array elements. If a key does not exist, an empty string is returned rather than throwing an error — use $jsonExists to check for key existence before retrieval if you need to distinguish between genuine empty strings and missing keys.
