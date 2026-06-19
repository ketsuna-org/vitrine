---
layout: doc
title: $jsonParse[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonParse
syntax: $jsonParse[json]
description: Parses a JSON string into the internal JSON structure, replacing any existing JSON context.
---
$jsonParse is the primary way to load external JSON data — such as API responses, file contents, or user input — into the BDFD JSON system. It replaces whatever internal JSON structure currently exists. Use $jsonStringify to convert back to a string when done. The input must be strictly valid JSON; malformed input will produce an error.
