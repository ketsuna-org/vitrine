---
layout: doc
title: $jsonSet[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonSet
syntax: $jsonSet[key;value]
description: Sets a key to a value in the current JSON object. The value is stored as-is (string, number, boolean, or nested JSON).
---
$jsonSet is the primary way to build and modify JSON objects. It stores values while preserving their type — numbers remain numeric, booleans remain boolean. Dot notation allows setting deeply nested values: `$jsonSet[user.profile.avatar;url]` creates the intermediate objects automatically. Use $jsonSetString to force a value to be stored as a string.
