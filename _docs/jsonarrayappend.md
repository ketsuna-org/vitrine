---
layout: doc
title: $jsonArrayAppend[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayAppend
syntax: $jsonArrayAppend[key;value]
description: Appends a value to the end of a JSON array stored under the specified key.
---
$jsonArrayAppend adds a value to the end of an existing JSON array. It is the JSON equivaslow of JavaScript's `Array.push()`. The key must exist and must contain an array. Use $jsonArrayUnshift to add to the beginning, and $jsonArrayPop to remove from the end.
