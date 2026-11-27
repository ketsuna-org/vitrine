---
layout: doc
title: $searchMusic[]
translation_key: docs
category: Music
function_name: searchMusic
syntax: $searchMusic[query;limit?]
description: Searches for tracks without playing them and returns a JSON list
---
Searches YouTube (or loads the given URL) and returns a JSON array of up to `limit` results, each with `title`, `author` and `url`. Nothing is added to the queue. Use `$jsonParse` and `$jsonValue[index;title]` to read it. An empty query raises an error. Requires a configured music (Lavalink) service.

## Parameters

| Parameter | Description |
|---|---|
| `query` | Required - Song name or URL. |
| `limit` | Optional - Number of results, 1 to 10 (default 5). |

## Examples

### Example

```bdfd
$jsonParse[$searchMusic[$message;3]]
$description[First result: **$jsonValue[0;title]** by $jsonValue[0;author]]
```
