---
layout: doc
title: $jsonArrayShift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayShift
syntax: $jsonArrayShift[key]
description: Removes and returns the first item from a JSON array, shifting all other elements down by one index.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array. The key must exist and contain an array.
returns:
  type: string
  description: The value of the removed first element as a string. Returns an empty string if the array is empty.
related:
  - jsonArrayPop
  - jsonArrayUnshift
  - jsonArrayAppend
  - jsonArrayCount
examples:
  - title: Shift the first item
    code: |
      $jsonParse[{"queue":["task1","task2","task3"]}]
      Processing: $jsonArrayShift[queue]
      Next up: $jsonArrayIndex[queue;0]
  - title: Process items in FIFO order
    code: |
      $jsonParse[{"events":["login","click","purchase"]}]
      $var[count;$jsonArrayCount[events]]
      Event 1: $jsonArrayShift[events]
      Event 2: $jsonArrayShift[events]
      Remaining: $jsonArrayCount[events]
  - title: Drain a queue
    code: |
      $jsonParse[{"messages":["hi","hello","hey"]}]
      $jsonForEach[messages]
      $jsonArrayShift[messages]
      $endJsonForEach
---
$jsonArrayShift removes and returns the first element from a JSON array — equivalent to JavaScript's `Array.shift()`. This is ideal for FIFO (First In, First Out) queue processing. All remaining elements shift down by one index. Shifting from an empty array returns an empty string.
