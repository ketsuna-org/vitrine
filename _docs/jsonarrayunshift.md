---
layout: doc
title: $jsonArrayUnshift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayUnshift
syntax: $jsonArrayUnshift[key;value]
description: Adds a value to the beginning of a JSON array, shifting all existing elements up by one index.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array. The key must exist and contain an array.
  - name: value
    type: string
    required: true
    description: The value to insert at the beginning of the array.
returns:
  type: void
  description: Modifies the array in-place by prepending the value.
related:
  - jsonArrayAppend
  - jsonArrayShift
  - jsonArrayPop
  - jsonArrayCount
examples:
  - title: Prepend an item
    code: |
      $jsonParse[{"log":["second","third"]}]
      $jsonArrayUnshift[log;first]
      $jsonJoinArray[log;, ]
      // Output: first, second, third
  - title: Build a timeline in reverse
    code: |
      $json[]
      $jsonSet[timeline;[]]
      $jsonArrayUnshift[timeline;Event C - 3pm]
      $jsonArrayUnshift[timeline;Event B - 2pm]
      $jsonArrayUnshift[timeline;Event A - 1pm]
      $jsonForEach[timeline]
      $jsonValue[]
      $endJsonForEach
  - title: Priority insert
    code: |
      $jsonParse[{"queue":["normal1","normal2"]}]
      $jsonArrayUnshift[queue;URGENT]
      Next: $jsonArrayShift[queue]
---
$jsonArrayUnshift adds a value to the front of a JSON array — equivalent to JavaScript's `Array.unshift()`. Existing elements shift up by one index. This is useful for priority queues, where high-priority items are inserted at the front and processed before normal items via $jsonArrayShift.
