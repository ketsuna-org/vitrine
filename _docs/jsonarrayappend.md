---
layout: doc
title: $jsonArrayAppend[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayAppend
syntax: $jsonArrayAppend[key;value]
description: Appends a value to the end of a JSON array stored under the specified key.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array to append to. The key must exist and contain an array.
  - name: value
    type: string
    required: true
    description: The value to append to the array. Added as the last element.
returns:
  type: void
  description: Modifies the array in-place by adding the value at the end.
related:
  - jsonArrayUnshift
  - jsonArrayPop
  - jsonArrayShift
  - jsonArrayCount
examples:
  - title: Append a single item
    code: |
      $jsonParse[{"items":["apple","banana"]}]
      $jsonArrayAppend[items;cherry]
      $jsonStringify[]
      // items: ["apple","banana","cherry"]
  - title: Build an array dynamically
    code: |
      $json[]
      $jsonSet[log;[]]
      $jsonArrayAppend[log;User joined]
      $jsonArrayAppend[log;Message sent]
      $jsonArrayAppend[log;User left]
      Events: $jsonJoinArray[log;, ]
  - title: Append numeric value
    code: |
      $jsonParse[{"scores":[85,90,78]}]
      $jsonArrayAppend[scores;92]
      Average: build your own or use jsonforeach
---
$jsonArrayAppend adds a value to the end of an existing JSON array. It is the JSON equivalent of JavaScript's `Array.push()`. The key must exist and must contain an array. Use $jsonArrayUnshift to add to the beginning, and $jsonArrayPop to remove from the end.
