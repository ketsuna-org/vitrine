---
layout: doc
title: $jsonKey[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonKey
syntax: $jsonKey[]
description: Returns the current key during a $jsonForEach iteration. Must be called inside a $jsonForEach block.
returns:
  type: string
  description: The current iteration key as a string. Returns an empty string if called outside a $jsonForEach block.
related:
  - jsonForEach
  - jsonValue
  - jsonIndex
  - jsonKeys
examples:
  - title: Display key-value pairs during iteration
    code: |
      $jsonParse[{"name":"Alice","age":25,"city":"Paris"}]
      $jsonForEach[]
      $jsonKey[]: $jsonValue[]
      $endJsonForEach
  - title: Conditional logic based on key name
    code: |
      $jsonParse[{"name":"Alice","password":"secret","email":"alice@test.com"}]
      $jsonForEach[]
      $if[$jsonKey[]!=password]
      $jsonKey[]: $jsonValue[]
      $endif
      $endJsonForEach
  - title: Build a string from keys
    code: |
      $jsonParse[{"status":"ok","code":200}]
      $jsonForEach[]
      $jsonKey[]=$jsonValue[]
      $endJsonForEach
---
$jsonKey returns the current key name during $jsonForEach iteration. It is only meaningful inside a $jsonForEach ... $endJsonForEach block. Pair with $jsonValue[] (no arguments) to access the corresponding value. This is the primary way to process key-value pairs in JSON objects.
