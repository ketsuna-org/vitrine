---
layout: doc
title: $jsonKeys[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonKeys
syntax: $jsonKeys[]
description: Returns all top-level keys of the current JSON object as a comma-separated string. Also used within $jsonForEach context to reference the current iteration key.
---
$jsonKeys returns all top-level key names from the JSON object as a comma-separated string. This is useful for introspection, debugging, or dynamic key access. For nested objects, it only returns keys at the current depth. When used inside a $jsonForEach block, it can also reference the current iteration's key context.
