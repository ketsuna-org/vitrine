---
layout: doc
title: $jsonValue[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonValue
syntax: $jsonValue[key]
description: Retrieves the string value of a key from the current JSON object. For nested access, use dot notation in the key path.
---
$jsonValue retrieves values from the JSON object. Use dot notation to traverse nested objects, and semicolons (;) to access array elements. If a key does not exist, an empty string is returned rather than throwing an error — use $jsonExists to check for key existence before retrieval if you need to distinguish between genuine empty strings and missing keys.
