---
layout: doc
title: $jsonSetString[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonSetString
syntax: $jsonSetString[key;value]
description: Sets a key to a string value in the current JSON object, explicitly forcing the value type to string regardless of its content.
---
$jsonSetString forces the value to be stored as a JSON string type. This is important when you need to preserve leading zeros in IDs, ensure phone numbers aren't parsed as integers, or when an API expects a string-typed field. In contrast, $jsonSet infers the type from the value content.
