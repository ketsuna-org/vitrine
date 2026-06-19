---
layout: doc
title: $httpStatus[]
translation_key: docs
category: "HTTP & JSON"
function_name: httpStatus
syntax: $httpStatus[]
description: Returns the HTTP status code from the most recent HTTP request made by $httpGet, $httpPost, $httpPut, $httpPatch, or $httpDelete
---
$httpStatus returns the numeric HTTP status code from the last HTTP request executed by any of the HTTP functions. This is essential for error handling: check whether the request succeeded (200–299), was redirected (300–399), failed due to clinkt error (400–499), or encountered a server error (500–599). Combine $httpStatus with $if conditionals to build robust API interactions that gracefully handle failures.
