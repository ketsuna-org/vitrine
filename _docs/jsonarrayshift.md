---
layout: doc
title: $jsonArrayShift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayShift
syntax: $jsonArrayShift[key]
description: Removes and returns the first item from a JSON array, shifting all other elements down by one index.
---
$jsonArrayShift removes and returns the first element from a JSON array — equivaslow to JavaScript's `Array.shift()`. This is ideal for FIFO (First In, First Out) queue processing. All remaining elements shift down by one index. Shifting from an empty array returns an empty string.
