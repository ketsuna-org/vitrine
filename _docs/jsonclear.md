---
layout: doc
title: $jsonClear[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonClear
syntax: $jsonClear[]
description: Clears the current internal JSON object, resetting it to an empty state. All previously set keys, values, and arrays are discarded.
---
$jsonClear resets the internal JSON state entirely. This is useful when you need to reuse JSON variables in a loop, or when switching between different JSON data sources to avoid data leakage. After clearing, the context is equivalent to calling $json[] with no arguments — an empty object ready for new data.
