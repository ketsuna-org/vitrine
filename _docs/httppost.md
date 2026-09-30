---
layout: doc
title: $httpPost[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpPost
syntax: $httpPost[url;body?]
description: Performs an HTTP POST request to the specified URL, optionally sending a request body, and returns the response body as a string
---
$httpPost sends a synchronous HTTP POST request to the provided URL. This is typically used to create resources, submit form data, or send data to an API endpoint. Always set the Content-Type header via $httpAddHeader when sending JSON bodies. The response body is stored internally and can be accessed with $httpResult; use $httpStatus to check the response status code.

## Examples

### Post Webhook Notification

```bdfd
$httpAddHeader[Content-Type;application/json]
$httpPost[https://api.example.com/webhooks;{"event":"member_join","user":"$username"}]
$title[HTTP POST Request]
$description[Payload dispatched. Status code: **$httpStatus**]
$color[#00BCD4]
$sendMessage[]
```
