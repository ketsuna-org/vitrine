---
layout: doc
title: $jsonArrayCount[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayCount
syntax: $jsonArrayCount[key]
description: Returns the number of items in a JSON array.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array. The key must exist and contain an array.
returns:
  type: integer
  description: The number of elements in the array. Returns 0 for an empty array.
related:
  - jsonArrayIndex
  - jsonArrayAppend
  - jsonArrayPop
  - jsonForEach
examples:
  - title: Count items in an array
    code: |
      $jsonParse[{"fruits":["apple","banana","cherry"]}]
      There are $jsonArrayCount[fruits] fruits.
  - title: Check if an array is empty
    code: |
      $jsonParse[{"queue":[]}]
      $if[$jsonArrayCount[queue]==0]
      Queue is empty!
      $else
      $jsonArrayCount[queue] items waiting.
      $endif
  - title: Loop using count
    code: |
      $jsonParse[{"users":[{"name":"A"},{"name":"B"}]}]
      There are $jsonArrayCount[users] users.
---
$jsonArrayCount returns the number of elements in a JSON array. This is useful for pagination, boundary checks, conditional logic based on array size, or displaying counts to users. For iteration over all elements, prefer $jsonForEach.
