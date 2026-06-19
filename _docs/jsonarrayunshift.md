---
layout: doc
title: $jsonArrayUnshift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayUnshift
syntax: $jsonArrayUnshift[key;value]
description: Adds a value to the beginning of a JSON array, shifting all existing elements up by one index.
---
$jsonArrayUnshift adds a value to the front of a JSON array — equivalent to JavaScript's `Array.unshift()`. Existing elements shift up by one index. This is useful for priority queues, where high-priority items are inserted at the front and processed before normal items via $jsonArrayShift.
