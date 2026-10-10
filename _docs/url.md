---
layout: doc
title: $url
translation_key: docs
category: "Variables"
function_name: url
syntax: $url[mode;text]
description: "Encodes or decodes a text as a URL query component."
---

# $url

The function `$url[]` **encodes or decodes** a text as a URL query component.

## Syntax

```
$url[mode;text]
```

## Parameters

| Parameter | Description |
|---|---|
| `mode` | Required - `encode` or `decode` (case-insensitive, surrounding spaces ignored). Any other value raises the error `Mode must be encode or decode.` |
| `text` | Required - The text to encode or decode. |

## Return Value

- **Type** : String
- With `encode`, the text encoded as a query component (spaces become `+`, special characters are percent-encoded).
- With `decode`, the decoded text. An error is raised if the text is not valid URL encoding (for example `%zz`).

## Examples

### Encode a search

```bdfd
$sendMessage[https://www.google.com/search?q=$url[encode;$message]]
```

### Decode a text

```bdfd
$sendMessage[Decoded: $url[decode;hello+world%21]]
```

## Notes

- Used on its own (`$url` with no argument), the function is invalid: both arguments are required.
