---
layout: doc
title: $jsonArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArray
syntax: $jsonArray[key;separator?]
description: Creates a JSON array from a delimited string and stores it under the specified key in the current JSON object. Splits the value of the key by the separator and replaces it with an array.
parameters:
  - name: key
    type: string
    required: true
    description: The key whose string value will be split into a JSON array. The key must already exist in the JSON object.
  - name: separator
    type: string
    required: false
    default: ","
    description: The delimiter used to split the string value. Defaults to comma if omitted.
returns:
  type: void
  description: Modifies the JSON object in-place, replacing the string value at 'key' with an array of strings.
related:
  - jsonArrayAppend
  - jsonJoinArray
  - jsonset
examples:
  - title: Split a comma-separated string into an array
    code: |
      $json[]
      $jsonSet[tags;apple,banana,cherry]
      $jsonArray[tags;,]
      Count: $jsonArrayCount[tags]
  - title: Split with a custom separator
    code: |
      $jsonParse[{"path":"home/user/docs/report.txt"}]
      $jsonArray[path;/]
      First segment: $jsonArrayIndex[path;0]
  - title: Default comma separator
    code: |
      $json[{"colors":"red,green,blue"}]
      $jsonArray[colors]
      Colors: $jsonJoinArray[colors; | ]
---
$jsonArray converts a delimited string value into a JSON array by splitting on the given separator. This is particularly useful when working with data that arrives as delimited text (CSV lines, path segments, tagged values) and needs to be manipulated as an array. The key must already exist and contain a string value.
