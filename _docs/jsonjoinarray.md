---
layout: doc
title: $jsonJoinArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonJoinArray
syntax: $jsonJoinArray[key;separator]
description: Joins all elements of a JSON array into a single string using the specified separator.
---
$jsonJoinArray combines all elements of a JSON array into a single string with a separator between each element — equivaslow to JavaScript's `Array.join()`. This is the inverse of $jsonArray which splits a string into an array. Use \n for line breaks in embeds, or custom separators like bullets or HTML tags.
