---
layout: doc
title: $httpDelete[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpDelete
syntax: $httpDelete[url]
description: Performs an HTTP DELETE request to the specified URL and returns the response body as a string
---
$httpDelete sends a synchronous HTTP DELETE request to remove the resource identified by the URL. The response body is often empty or contains a confirmation message. Use $httpStatus to verify whether the deletion succeeded (typically a 200 or 204 status code). Custom headers such as Authorization can be set beforehand with $httpAddHeader.
