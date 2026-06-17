---
layout: doc
title: $jsonParse[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonParse
syntax: $jsonParse[json]
description: Parses a JSON string into the internal JSON structure, replacing any existing JSON context.
parameters:
  - name: json
    type: string
    required: true
    description: A valid JSON string to parse. Must be well-formed JSON — invalid JSON will cause an error.
returns:
  type: void
  description: Loads the parsed JSON into the internal context. All subsequent JSON functions operate on this parsed structure.
related:
  - json
  - jsonstringify
  - jsonpretty
  - jsonset
examples:
  - title: Parse a JSON string from an API response
    code: |
      $httpGet[https://api.example.com/users]
      $jsonParse[$httpResult]
      First user: $jsonValue[users;0;name]
  - title: Parse and query a JSON string
    code: |
      $jsonParse[{"name":"Alice","age":25}]
      Name: $jsonValue[name]
      Age: $jsonValue[age]
  - title: Parse JSON from a variable
    code: |
      $var[raw;{"items":["apple","banana","cherry"]}]
      $jsonParse[$var[raw]]
      Item count: $jsonArrayCount[items]
---
$jsonParse is the primary way to load external JSON data — such as API responses, file contents, or user input — into the BDFD JSON system. It replaces whatever internal JSON structure currently exists. Use $jsonStringify to convert back to a string when done. The input must be strictly valid JSON; malformed input will produce an error.
