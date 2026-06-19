---
layout: doc
title: $jsonForEach[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonForEach
syntax: $jsonForEach[key]
description: Iterates over each key-value pair in the current JSON object or each element in a JSON array. Must be closed with $endJsonForEach.
---
$jsonForEach is the primary iteration mechanism for JSON data. When iterating over an object, $jsonKey[] returns the current key name and $jsonValue[] returns the value. When iterating over an array, $jsonIndex[] returns the zero-based index and $jsonValue[] returns the element. Every $jsonForEach must be matched with a corresponding $endJsonForEach — nesting is supported.
