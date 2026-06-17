---
layout: doc
title: $jsonUnset[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonUnset
syntax: $jsonUnset[key]
description: Removes a key and its associated value from the current JSON object.
parameters:
  - name: key
    type: string
    required: true
    description: The key to remove from the JSON object. Supports dot notation for nested keys. If the key does not exist, nothing happens.
returns:
  type: void
  description: Modifies the JSON object in-place by deleting the specified key.
related:
  - jsonset
  - jsonExists
  - jsonValue
  - jsonclear
examples:
  - title: Remove a simple key
    code: |
      $jsonParse[{"name":"Alice","age":25,"temp":"deleteMe"}]
      $jsonUnset[temp]
      $jsonStringify[]
      // Output: {"name":"Alice","age":25}
  - title: Remove a nested key
    code: |
      $jsonParse[{"user":{"name":"Bob","password":"secret","email":"bob@test.com"}}]
      $jsonUnset[user.password]
      $jsonPretty[]
  - title: Conditionally remove a key
    code: |
      $jsonParse[$httpResult]
      $if[$jsonExists[error]==true]
      $jsonUnset[error]
      $endif
---
$jsonUnset removes a key-value pair from the JSON object. It works with dot notation for nested keys. If the specified key does not exist, no error is thrown — the operation is silently ignored. This is useful for cleaning API responses, removing sensitive fields (like passwords) before logging, or pruning empty configuration options.
