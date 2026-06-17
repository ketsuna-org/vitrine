---
layout: doc
title: $jsonKeys[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonKeys
syntax: $jsonKeys[]
description: Returns all top-level keys of the current JSON object as a comma-separated string. Also used within $jsonForEach context to reference the current iteration key.
returns:
  type: string
  description: A comma-separated list of all top-level keys in the current JSON object. Returns an empty string if the JSON is empty or contains only arrays.
related:
  - jsonkey
  - jsonForEach
  - jsonValue
  - jsonExists
examples:
  - title: List all keys in an object
    code: |
      $jsonParse[{"name":"Alice","age":25,"email":"alice@test.com"}]
      Keys: $jsonKeys[]
      // Output: name, age, email
  - title: Check if object has any keys
    code: |
      $jsonParse[$httpResult]
      $if[$jsonKeys[]==]
      Response is empty!
      $else
      Found keys: $jsonKeys[]
      $endif
  - title: Iterate using keys
    code: |
      $jsonParse[{"name":"Alice","age":25}]
      $var[keys;$jsonKeys[]]
      $textSplit[keyList;$var[keys];,]
      $var[count;$arrayCount[keyList]]
      // Process each key manually
---
$jsonKeys returns all top-level key names from the JSON object as a comma-separated string. This is useful for introspection, debugging, or dynamic key access. For nested objects, it only returns keys at the current depth. When used inside a $jsonForEach block, it can also reference the current iteration's key context.
