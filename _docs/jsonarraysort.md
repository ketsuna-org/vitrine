---
layout: doc
title: $jsonArraySort[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArraySort
syntax: $jsonArraySort[key;order?]
description: Sorts a JSON array alphabetically or numerically in ascending or descending order.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array to sort. The key must exist and contain an array.
  - name: order
    type: string
    required: false
    default: asc
    description: Sort direction. Can be 'asc' (ascending) or 'desc' (descending).
    enum: "asc, desc"
returns:
  type: void
  description: Modifies the array in-place by sorting its elements.
related:
  - jsonArrayReverse
  - jsonArrayIndex
  - jsonJoinArray
  - jsonArrayAppend
examples:
  - title: Sort alphabetically (ascending)
    code: |
      $jsonParse[{"names":["Zoe","Alice","Bob","Charlie"]}]
      $jsonArraySort[names;asc]
      Sorted: $jsonJoinArray[names;, ]
      // Output: Alice, Bob, Charlie, Zoe
  - title: Sort numerically descending
    code: |
      $jsonParse[{"scores":[45,88,12,96,34]}]
      $jsonArraySort[scores;desc]
      Top score: $jsonArrayIndex[scores;0]
  - title: Default ascending sort
    code: |
      $jsonParse[{"letters":["c","a","b"]}]
      $jsonArraySort[letters]
      $jsonJoinArray[letters;, ]
---
$jsonArraySort sorts the elements of a JSON array in-place. The default order is ascending ('asc'). For alphabetical sorting, strings are compared lexicographically. For numerical sorting, values are compared as numbers. To get descending order, either pass 'desc' or sort ascending and then reverse with $jsonArrayReverse.
