---
layout: doc
title: $jsonExists[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonExists
syntax: $jsonExists[key]
description: Checks whether a path exists in the current JSON document (a key whose value is null still exists).
---
$jsonExists is essential for safely navigating JSON data, especially when working with external API responses that may have optional fields. It returns 'true' or 'false' as a string (with no argument, the whole document is checked and the result is 'true'), making it directly usable in $if conditions. The path is given as separate arguments (one per level), not with dot notation. Always check for key existence before accessing values with $jsonValue to avoid ambiguity between missing keys and genuinely empty values.

## Examples

### Verify Property Existence

```bdfd
$jsonParse[{"user":{"id":"123","premium":true}}]
$title[JSON Key Verification]
$description[Does user, premium exist? **$jsonExists[user;premium]**]
$color[#57F287]
$sendMessage[]
```
