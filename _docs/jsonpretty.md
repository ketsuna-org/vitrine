---
layout: doc
title: $jsonPretty[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonPretty
syntax: $jsonPretty[indent?]
description: Prettifies the current internal JSON structure into a human-readable, indented JSON string for display or debugging.
parameters:
  - name: indent
    type: integer
    required: false
    default: "2"
    description: Number of spaces to use for indentation. Defaults to 2 if omitted.
returns:
  type: string
  description: A pretty-printed JSON string with line breaks and indentation. Returns an empty string if no JSON context exists.
related:
  - jsonstringify
  - jsonparse
  - json
examples:
  - title: Pretty-print JSON with default indentation
    code: |
      $jsonParse[{"name":"Alice","age":25}]
      $jsonPretty[]
  - title: Pretty-print with 4-space indent
    code: |
      $jsonParse[$httpResult]
      $jsonPretty[4]
  - title: Display pretty-printed JSON in an embed
    code: |
      $jsonParse[{"status":"ok","data":{"count":42}}]
      $title[API Response]
      $description[```json
      $jsonPretty[]
      ```]
---
$jsonPretty is useful for debugging JSON data or displaying it to users in a readable format. Unlike $jsonStringify which produces compact output, $jsonPretty adds line breaks and indentation. Use inside code blocks (```json) for embed descriptions. If no JSON context exists, returns an empty string.
