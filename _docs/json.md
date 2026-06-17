---
layout: doc
title: $json[]
translation_key: docs
category: "HTTP & JSON"
function_name: json
syntax: $json[value?]
description: Creates a JSON object with an optional initial value. If no value is provided, an empty JSON object is created.
parameters:
  - name: value
    type: json
    required: false
    description: An optional JSON object or string to initialise the internal JSON structure. Accepts valid JSON literals (objects, arrays, strings, numbers, booleans, null) or references to variables containing JSON.
returns:
  type: void
  description: Initialises the internal JSON context. Subsequent JSON functions operate on this structure.
related:
  - jsonparse
  - jsonset
  - jsonvalue
  - jsonclear
examples:
  - title: Create an empty JSON object
    code: |
      $json[]
      $jsonSet[name;John]
      $jsonSet[age;30]
      Description: $jsonStringify[]
  - title: Create a JSON object from a literal
    code: |
      $json[{"name":"John","age":30}]
      Name: $jsonValue[name]
  - title: Create nested JSON from a variable
    code: |
      $var[data;{"users":[{"id":1},{"id":2}]}]
      $json[$var[data]]
      Count: $jsonArrayCount[users]
---
The $json function is the entry point for all JSON operations. It initialises an internal JSON context that all subsequent JSON functions operate on. If called without a value, an empty object `{}` is created. If a value is provided, it must be valid JSON. The internal JSON structure persists until it is cleared with $jsonClear or overwritten by calling $json again.
