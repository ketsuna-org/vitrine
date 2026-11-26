---
layout: doc
title: $searchTrack[]
translation_key: docs
category: "Music"
function_name: searchTrack
syntax: $searchTrack[query;(limit)]
description: "Searches tracks without queuing them: JSON list of title, author and url."
---
# $searchTrack — Searches tracks without queuing them: JSON list of title, author and url.

## Syntax

```
$searchTrack[query;(limit)]
```

## Parameters

- **query** *(String, required)* — Search
- **limit** *(Number, optional)* — Results (1 to 10)

## Return Value

- Json.

## Usage

```
$searchTrack[query;limit] → result
```

## Example

```bdfd
$sendMessage[$searchTrack[query;limit]]
```
