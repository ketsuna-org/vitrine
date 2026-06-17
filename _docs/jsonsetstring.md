---
layout: doc
title: $jsonSetString[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonSetString
syntax: $jsonSetString[key;value]
description: Sets a key to a string value in the current JSON object, explicitly forcing the value type to string regardless of its content.
parameters:
  - name: key
    type: string
    required: true
    description: The key name to set in the JSON object. Supports dot notation for nested keys.
  - name: value
    type: string
    required: true
    description: The value to assign to the key. Always stored as a JSON string, even if it looks like a number or boolean.
returns:
  type: void
  description: Modifies the JSON object in-place. Creates the key if it does not exist, updates it if it does. The value is always stored as a string type.
related:
  - jsonset
  - jsonValue
  - jsonUnset
examples:
  - title: Force numeric-looking value as string
    code: |
      $json[]
      $jsonSetString[id;00123]
      $jsonStringify[]
      // Output: {"id":"00123"} (string, not number 123)
  - title: Set a boolean-looking value as string
    code: |
      $jsonParse[{"config":{}}]
      $jsonSetString[config.enabled;true]
      $jsonStringify[]
      // Output: {"config":{"enabled":"true"}}
  - title: Prevent type coercion in API payloads
    code: |
      $jsonParse[$httpResult]
      $jsonSetString[phone;+1234567890]
      $jsonSetString[zipCode;90210]
      $httpPost[https://api.example.com/update;{"Content-Type":"application/json"};$jsonStringify[]]
---
$jsonSetString forces the value to be stored as a JSON string type. This is important when you need to preserve leading zeros in IDs, ensure phone numbers aren't parsed as integers, or when an API expects a string-typed field. In contrast, $jsonSet infers the type from the value content.
