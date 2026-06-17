---
layout: doc
title: $jsonStringify[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonStringify
syntax: $jsonStringify[]
description: Converts the current internal JSON structure back into a compact JSON string with no extra whitespace.
returns:
  type: string
  description: A compact JSON string representation of the current internal JSON structure. Returns an empty string if no JSON context exists.
related:
  - jsonparse
  - jsonpretty
  - json
examples:
  - title: Parse, modify, and stringify
    code: |
      $jsonParse[{"name":"Alice"}]
      $jsonSet[age;25]
      Result: $jsonStringify[]
      // Output: {"name":"Alice","age":25}
  - title: Build JSON from scratch
    code: |
      $json[]
      $jsonSet[status;success]
      $jsonSet[timestamp;1742265600]
      $textSplit[tags;bot,automation,json;,]
      $jsonArray[tags;,]
      $jsonStringify[]
  - title: Store stringified JSON in a variable
    code: |
      $jsonParse[$httpResult]
      $var[compact;$jsonStringify[]]
      Compact: $var[compact]
---
$jsonStringify returns the internal JSON as a compact, minified string — ideal for sending in API requests, storing in variables, or logging. For human-readable output, use $jsonPretty instead. If no JSON has been initialised (via $json or $jsonParse), the function returns an empty string.
