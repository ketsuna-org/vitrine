---
layout: doc
title: $boostCount
translation_key: docs
category: "Entity Info"
function_name: boostCount
syntax: $boostCount
description: Returns the number of boosts (premium subscriptions) of the current server, as reported by Discord.
---

# $boostCount

The `$boostCount` function **retrieves the number of server boosts** of the current server, as reported by Discord for the server (its premium subscription count).

## Syntax

```
$boostCount
```

## Parameters

No parameters (passing one is an error; `$serverBoostCount[(serverID)]` accepts an optional server ID).

## Return value

- **Type**: String (number)
- The boost count of the server, read from Discord.
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
- `$serverBoostCount` is similar but takes an optional server ID and returns `0` instead of an error when the value is unavailable.
