---
layout: doc
title: $jsonArrayPop[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayPop
syntax: $jsonArrayPop[key]
description: Removes and returns the last item from a JSON array.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array. The key must exist and contain an array.
returns:
  type: string
  description: The value of the removed last element as a string. Returns an empty string if the array is empty.
related:
  - jsonArrayShift
  - jsonArrayAppend
  - jsonArrayUnshift
  - jsonArrayCount
examples:
  - title: Pop the last item
    code: |
      $jsonParse[{"stack":["first","second","third"]}]
      Popped: $jsonArrayPop[stack]
      Remaining count: $jsonArrayCount[stack]
  - title: Process items in LIFO order
    code: |
      $jsonParse[{"tasks":["A","B","C"]}]
      $var[count;$jsonArrayCount[tasks]]
      Processing $jsonArrayPop[tasks]...
      Processing $jsonArrayPop[tasks]...
      Remaining: $jsonArrayCount[tasks]
  - title: Check if pop returned empty
    code: |
      $jsonParse[{"queue":[]}]
      $var[item;$jsonArrayPop[queue]]
      $if[$var[item]==]
      Queue was already empty.
      $endif
---
$jsonArrayPop removes the last element from a JSON array and returns it — equivalent to JavaScript's `Array.pop()`. This is useful for stack-based processing (LIFO — Last In, First Out). Popping from an empty array returns an empty string.
