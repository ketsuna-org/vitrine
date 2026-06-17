---
layout: doc
title: $jsonJoinArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonJoinArray
syntax: $jsonJoinArray[key;separator]
description: Joins all elements of a JSON array into a single string using the specified separator.
parameters:
  - name: key
    type: string
    required: true
    description: The key identifying the JSON array to join. The key must exist and contain an array.
  - name: separator
    type: string
    required: true
    description: The string to insert between each element. Can be any text including spaces, symbols, or HTML.
returns:
  type: string
  description: A single string with all array elements concatenated, separated by the given separator. Returns an empty string if the array is empty.
related:
  - jsonArray
  - jsonForEach
  - jsonArrayCount
examples:
  - title: Comma-separated list
    code: |
      $jsonParse[{"tags":["bot","automation","discord"]}]
      Tags: $jsonJoinArray[tags;, ]
  - title: Line-break separated for embeds
    code: |
      $jsonParse[{"players":["Alice","Bob","Charlie"]}]
      $title[Leaderboard]
      $description[$jsonJoinArray[players;\n]]
  - title: Custom HTML separator
    code: |
      $jsonParse[{"items":["apple","banana","cherry"]}]
      Shopping list: $jsonJoinArray[items; • ]
---
$jsonJoinArray combines all elements of a JSON array into a single string with a separator between each element — equivalent to JavaScript's `Array.join()`. This is the inverse of $jsonArray which splits a string into an array. Use \n for line breaks in embeds, or custom separators like bullets or HTML tags.
