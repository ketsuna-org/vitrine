---
layout: doc
title: $jsonArrayReverse[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayReverse
syntax: $jsonArrayReverse[key]
description: Reverses the order of items in a JSON array in-place.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array to reverse. The key must exist and contain an array.
returns:
  type: void
  description: Modifies the array in-place by reversing the element order.
related:
  - jsonArraySort
  - jsonArrayIndex
  - jsonJoinArray
examples:
  - title: Reverse a simple array
    code: |
      $jsonParse[{"items":["a","b","c","d"]}]
      $jsonArrayReverse[items]
      Reversed: $jsonJoinArray[items;, ]
      // Output: d, c, b, a
  - title: Reverse chronological order
    code: |
      $jsonParse[{"posts":["post1","post2","post3"]}]
      $jsonArrayReverse[posts]
      Most recent: $jsonArrayIndex[posts;0]
  - title: Reverse then sort
    code: |
      $jsonParse[{"nums":[5,2,8,1]}]
      $jsonArraySort[nums;asc]
      $jsonArrayReverse[nums]
      Descending: $jsonJoinArray[nums;, ]
---
$jsonArrayReverse reverses the order of elements in a JSON array. It operates in-place — the original array is modified. This is useful for displaying data in reverse chronological order or changing the sort direction after an ascending sort. Pair with $jsonArraySort for descending sorts.
