---
layout: doc
title: $jsonSet[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonSet
syntax: $jsonSet[key;value]
description: Sets a key to a value in the current JSON object. The value is stored as-is (string, number, boolean, or nested JSON).
parameters:
  - name: key
    type: string
    required: true
    description: The key name to set in the JSON object. Supports dot notation for nested keys (e.g., 'user.name' or 'data.items.0').
  - name: value
    type: any
    required: true
    description: The value to assign to the key. Can be a string, number, boolean, or nested JSON string.
returns:
  type: void
  description: Modifies the JSON object in-place. Creates the key if it does not exist, updates it if it does.
related:
  - jsonSetString
  - jsonUnset
  - jsonValue
  - jsonExists
examples:
  - title: Set simple key-value pairs
    code: |
      $json[]
      $jsonSet[name;Alice]
      $jsonSet[age;25]
      $jsonSet[active;true]
      $jsonStringify[]
  - title: Set a nested value using dot notation
    code: |
      $jsonParse[{"user":{}}]
      $jsonSet[user.name;Bob]
      $jsonSet[user.address.city;Paris]
      $jsonStringify[]
  - title: Type-preserving set
    code: |
      $json[]
      $jsonSet[count;42]
      $jsonSet[price;19.99]
      $jsonSet[isAdmin;true]
      $jsonPretty[]
---
$jsonSet is the primary way to build and modify JSON objects. It stores values while preserving their type — numbers remain numeric, booleans remain boolean. Dot notation allows setting deeply nested values: `$jsonSet[user.profile.avatar;url]` creates the intermediate objects automatically. Use $jsonSetString to force a value to be stored as a string.
