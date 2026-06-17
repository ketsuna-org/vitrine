---
layout: doc
title: $jsonArrayIndex[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayIndex
syntax: $jsonArrayIndex[key;index]
description: Retrieves the value at a specific index from a JSON array. Index is zero-based.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array. The key must exist and contain an array.
  - name: index
    type: integer
    required: true
    description: The zero-based index of the element to retrieve. 0 returns the first element.
returns:
  type: string
  description: The value at the specified index as a string. Returns an empty string if the index is out of bounds.
related:
  - jsonArrayCount
  - jsonArrayPop
  - jsonArrayShift
  - jsonValue
examples:
  - title: Get the first element
    code: |
      $jsonParse[{"colors":["red","green","blue"]}]
      First color: $jsonArrayIndex[colors;0]
  - title: Get the last element
    code: |
      $jsonParse[{"items":["a","b","c","d"]}]
      $var[last;$math[$jsonArrayCount[items]-1]]
      Last: $jsonArrayIndex[items;$var[last]]
  - title: Access a specific item
    code: |
      $jsonParse[$httpResult]
      Username: $jsonArrayIndex[users;0]
---
$jsonArrayIndex retrieves a single element from a JSON array by its zero-based index. It returns the value as a string. For nested objects, use dot notation with $jsonValue after extracting the element. Out-of-bounds indices return an empty string rather than throwing an error.
