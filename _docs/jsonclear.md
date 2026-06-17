---
layout: doc
title: $jsonClear[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonClear
syntax: $jsonClear[]
description: Clears the current internal JSON object, resetting it to an empty state. All previously set keys, values, and arrays are discarded.
returns:
  type: void
  description: Resets the internal JSON context to empty. Subsequent JSON functions operate on a fresh empty object.
related:
  - json
  - jsonparse
  - jsonUnset
examples:
  - title: Clear JSON between operations
    code: |
      $jsonParse[{"temp":"data"}]
      $jsonClear[]
      $jsonSet[fresh;true]
      $jsonStringify[]
      // Output: {"fresh":true}
  - title: Reuse JSON context in a loop
    code: |
      $var[users;Alice;Bob;Charlie]
      $var[i;0]
      $repeat[3]
      $jsonClear[]
      $jsonSet[name;$arrayGet[users;$var[i]]]
      Processing: $jsonStringify[]
      $var[i;$math[$var[i]+1]]
      $endRepeat
  - title: Reset after processing
    code: |
      $jsonParse[$httpResult]
      $var[data;$jsonStringify[]]
      $jsonClear[]
      // JSON context is now clean for next operation
---
$jsonClear resets the internal JSON state entirely. This is useful when you need to reuse JSON variables in a loop, or when switching between different JSON data sources to avoid data leakage. After clearing, the context is equivalent to calling $json[] with no arguments — an empty object ready for new data.
