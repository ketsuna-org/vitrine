---
layout: doc
title: $boostCount
translation_key: docs
category: "Entity Info"
function_name: boostCount
syntax: $boostCount[(Guild ID)]
description: Returns the number of boosts (premium subscriptions) of the current server, or of the server whose ID is given, as reported by Discord.
---

# $boostCount

The `$boostCount` function **retrieves the number of server boosts** of the current server, as reported by Discord for the server (its premium subscription count).

## Syntax

```
$boostCount[(Guild ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Guild ID` | Optional. The server to read. If omitted or empty, the current server is used. A non-numeric or non-positive value raises `Invalid guild ID.` |

## Return value

- **Type**: String (number)
- The boost count of the server, read from Discord. An unknown server raises `Guild not found.`
- If Discord does not give a value, the error `Guild boost count is unavailable.` is raised.

## Behavior

- The server is read from Discord each time the function runs.
- For the boost level of the server, use `$boostLevel`.

## Examples

### Boost Statistics

```bdfd
$title[🚀 Server Boosts]
$description[
**Number of boosts:** $boostCount
**Level:** Level $boostLevel
]
$thumbnail[$serverIcon]
$color[#F47FFF]
```

### Boosts of another server

```bdfd
$sendMessage[Boosts: $boostCount[123456789012345678]]
```

### Thank-you message

```bdfd
$title[💜 Boost detected!]
$description[
Thank you **$username** for your boost! 
The server now has **$boostCount** boosts and is at **level $boostLevel**!
]
$color[#9B59B6]
```

### Storing the values

```bdfd
$var[current;$boostCount]
$var[level;$boostLevel]

$title[📈 Boost Progression]
$description[
**$var[current]** boosts, server at level **$var[level]**
]
$color[#F47FFF]
```

## Notes

- For the current level, use `$boostLevel`.
- `$serverBoostCount` is similar but returns `0` instead of an error when the value is unavailable.
