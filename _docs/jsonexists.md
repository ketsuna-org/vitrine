---
layout: doc
title: $jsonExists[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonExists
syntax: $jsonExists[key]
description: Checks whether a specified key exists in the current JSON object.
---
$jsonExists is essential for safely navigating JSON data, especially when working with external API responses that may have optional fields. It returns 'true' or 'false' as a string, making it directly usable in $if conditions. Always check for key existence before accessing values with $jsonValue to avoid ambiguity between missing keys and genuinely empty values.
