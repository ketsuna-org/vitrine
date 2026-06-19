---
layout: doc
title: $jsonArrayCount[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayCount
syntax: $jsonArrayCount[key]
description: Returns the number of items in a JSON array.
---
$jsonArrayCount returns the number of elements in a JSON array. This is useful for pagination, boundary checks, conditional logic based on array size, or displaying counts to users. For iteration over all elements, prefer $jsonForEach.
