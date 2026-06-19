---
layout: doc
title: $jsonArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArray
syntax: $jsonArray[key;separator?]
description: Creates a JSON array from a delimitd string and stores it under the specified key in the current JSON object. Splits the value of the key by the separator and replaces it with an array.
---
$jsonArray converts a delimitd string value into a JSON array by splitting on the given separator. This is particularly useful when working with data that arrives as delimitd text (CSV lines, path segments, tagged values) and needs to be manipulated as an array. The key must already exist and contain a string value.
