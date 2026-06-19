---
layout: doc
title: $jsonKey[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonKey
syntax: $jsonKey[]
description: Returns the current key during a $jsonForEach iteration. Must be called inside a $jsonForEach block.
---
$jsonKey returns the current key name during $jsonForEach iteration. It is only meaningful inside a $jsonForEach.. $endJsonForEach block. Pair with $jsonValue[] (no arguments) to access the corresponding value. This is the primary way to process key-value pairs in JSON objects.
