---
layout: doc
title: $jsonIndex[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonIndex
syntax: $jsonIndex[]
description: Returns the current iteration index during a $jsonForEach loop. Zero-based — starts at 0 for the first element. Must be called inside a $jsonForEach block.
returns:
  type: integer
  description: The zero-based index of the current iteration. Returns 0 if called outside a $jsonForEach block.
related:
  - jsonForEach
  - jsonKey
  - jsonValue
  - jsonArrayCount
examples:
  - title: Display numbered items
    code: |
      $jsonParse[{"items":["apple","banana","cherry"]}]
      $jsonForEach[items]
      $math[$jsonIndex[]+1]. $jsonValue[]
      $endJsonForEach
  - title: First item special handling
    code: |
      $jsonParse[{"users":["Alice","Bob","Charlie"]}]
      $jsonForEach[users]
      $if[$jsonIndex[]==0]
      **First**: $jsonValue[]
      $else
      $jsonValue[]
      $endif
      $endJsonForEach
  - title: Pagination within loop
    code: |
      $jsonParse[$httpResult]
      $jsonForEach[results]
      $if[$jsonIndex[]<5]
      $jsonValue[name]
      $endif
      $endJsonForEach
---
$jsonIndex returns the current iteration index (0-based) when used inside a $jsonForEach block. This is useful for numbered lists, conditional logic based on position (e.g., treating the first or last element differently), or limiting output to the first N items. Outside of $jsonForEach, it returns 0.
