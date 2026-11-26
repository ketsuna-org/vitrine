---
layout: doc
title: $setBotBanner[]
translation_key: docs
category: "Bot profile"
function_name: setBotBanner
syntax: $setBotBanner[url]
description: "Sets the banner of the bot itself from an image URL."
---
# $setBotBanner — Sets the banner of the bot itself from an image URL.

## Syntax

```
$setBotBanner[url]
```

## Parameters

- **url** *(String, required)* — Image URL

## Return Value

- String.

## Usage

```
$setBotBanner[url] → result
```

## Example

```bdfd
$sendMessage[$setBotBanner[url]]
```
