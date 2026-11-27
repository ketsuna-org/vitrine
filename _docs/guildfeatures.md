---
layout: doc
title: $guildFeatures[]
translation_key: docs
category: "Entity Info"
function_name: guildFeatures
syntax: $guildFeatures[(guildID)]
description: "Returns the features of the current server, as a comma-separated list of Discord feature codes (alias of $serverFeatures)."
---
# $guildFeatures — Returns the features of the current server, as a comma-separated list of Discord feature codes (alias of $serverFeatures).

## Syntax

```
$guildFeatures[(guildID)]
```

## Parameters

- **guildID** *(String, optional)* — Accepted but ignored: only the current server is read

## Return Value

- String.

## Usage

```
$guildFeatures → result
```

## Example

```bdfd
$sendMessage[$guildFeatures]
```
