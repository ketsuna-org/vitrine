---
layout: doc
title: $jsonForEach[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonForEach
syntax: $jsonForEach[key]
description: Iterates over each key-value pair in the current JSON object or each element in a JSON array. Must be closed with $endJsonForEach.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON object or array to iterate over. If the value at 'key' is an object, iterates over its key-value pairs. If it is an array, iterates over its elements.
returns:
  type: void
  description: Executes the block between $jsonForEach and $endJsonForEach once for each item. Current key is accessible via $jsonKey[] and current value via $jsonValue[].
related:
  - jsonKey
  - jsonValue
  - jsonIndex
  - endJsonForEach
examples:
  - title: Iterate over object key-value pairs
    code: |
      $jsonParse[{"name":"Alice","age":25,"city":"Paris"}]
      $jsonForEach[]
      **$jsonKey[]**: $jsonValue[]
      $endJsonForEach
  - title: Iterate over an array
    code: |
      $jsonParse[{"fruits":["apple","banana","cherry"]}]
      $jsonForEach[fruits]
      $jsonIndex[]: $jsonValue[]
      $endJsonForEach
  - title: Build an embed from iteration
    code: |
      $jsonParse[$httpResult]
      $title[User List]
      $description[
      $jsonForEach[users]
      $jsonValue[name] - $jsonValue[email]\n
      $endJsonForEach
      ]
---
$jsonForEach is the primary iteration mechanism for JSON data. When iterating over an object, $jsonKey[] returns the current key name and $jsonValue[] returns the value. When iterating over an array, $jsonIndex[] returns the zero-based index and $jsonValue[] returns the element. Every $jsonForEach must be matched with a corresponding $endJsonForEach — nesting is supported.
