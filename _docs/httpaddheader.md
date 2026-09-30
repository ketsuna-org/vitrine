---
layout: doc
title: $httpAddHeader[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpAddHeader
syntax: $httpAddHeader[name;value]
description: Adds a custom HTTP header to all subsequent HTTP requests made with $httpGet, $httpPost, $httpPut, $httpPatch, or $httpDelete
---
$httpAddHeader sets a custom HTTP header that is included on all subsequent HTTP requests until cleared or overwritten. Call it multiple times to set multiple headers. Headers are applied to every request made via $httpGet, $httpPost, $httpPut, $httpPatch, and $httpDelete. Common use cases include setting Content-Type for JSON APIs, Authorization for authenticated endpoints, and custom headers for API-specific requirements. Headers persist for the duration of the command execution context.

## Examples

### Custom Headers for API Authentication

```bdfd
$httpAddHeader[Authorization;Bearer secret_api_token]
$httpAddHeader[Content-Type;application/json]
$httpGet[https://api.example.com/v1/profile]
$title[API Request with Custom Headers]
$description[Status: **$httpStatus**\nResult: `$httpResult`]
$color[#00BCD4]
$sendMessage[]
```
