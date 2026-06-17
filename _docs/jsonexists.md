---
layout: doc
title: $jsonExists[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonExists
syntax: $jsonExists[key]
description: Checks whether a specified key exists in the current JSON object.
parameters:
  - name: key
    type: string
    required: true
    description: The key to check for existence. Supports dot notation for nested keys.
returns:
  type: boolean
  description: Returns 'true' if the key exists in the JSON object, 'false' otherwise.
related:
  - jsonValue
  - jsonset
  - jsonUnset
examples:
  - title: Check if a key exists before reading
    code: |
      $jsonParse[$httpResult]
      $if[$jsonExists[error]==true]
      Error: $jsonValue[error]
      $else
      Success: $jsonValue[data]
      $endif
  - title: Check nested key existence
    code: |
      $jsonParse[$httpResult]
      $if[$jsonExists[user.email]==true]
      Email: $jsonValue[user.email]
      $else
      No email provided.
      $endif
  - title: Validate API response structure
    code: |
      $jsonParse[$httpResult]
      $if[$jsonExists[data.items]==true]
      Found $jsonArrayCount[data.items] items.
      $else
      Unexpected response format!
      $endif
---
$jsonExists is essential for safely navigating JSON data, especially when working with external API responses that may have optional fields. It returns 'true' or 'false' as a string, making it directly usable in $if conditions. Always check for key existence before accessing values with $jsonValue to avoid ambiguity between missing keys and genuinely empty values.
