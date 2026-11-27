---
layout: doc
title: $loadImageOptions[]
translation_key: docs
category: "Image & Canvas"
function_name: loadImageOptions
syntax: $loadImageOptions[(global);(alt);(maxRedirects);(requestOptions)]
description: "Sets or returns the image load options (alt, maxRedirects); kept for compatibility, the loader ignores them and never takes custom request options."
---
# $loadImageOptions — Sets or returns the image load options (alt, maxRedirects); kept for compatibility, the loader ignores them and never takes custom request options.

## Syntax

```
$loadImageOptions[(global);(alt);(maxRedirects);(requestOptions)]
```

## Parameters

- **global** *(Boolean, optional)* — Accepted, ignored
- **alt** *(String, optional)* — Alt text
- **maxRedirects** *(Number, optional)* — Redirect limit
- **requestOptions** *(Json, optional)* — Accepted, ignored

## Return Value

- Json.

## Usage

```
$loadImageOptions[global;alt;maxRedirects;requestOptions] → result
```

## Example

```bdfd
$sendMessage[$loadImageOptions[global;alt;maxRedirects;requestOptions]]
```
