---
layout: doc
title: $randomText[]
translation_key: docs
category: "Math & Text"
function_name: randomText
syntax: $randomText[option1;(option2;...)]
description: Randomly chooses and returns an option from a list of provided text options.
---

# $randomText[]

The `$randomText[]` function randomly chooses an option from a list of provided text options and returns that option.

## Syntax

```
$randomText[option1;(option2;...)]
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `option1;(option2;...)` | List of text options separated by semicolons (`;`). At least one argument is required; `$randomText` without brackets is invalid. `$randomText[]` is one empty option and returns an empty string. |

## Return Value

A string corresponding to one of the options in the list, chosen randomly.

## Behavior

- Each option has an equal probability of being selected.
- Options are separated by semicolons (`;`). To put a literal semicolon inside an option, write `\;`.
- Options are returned as written: spaces and line breaks around an option are kept, so write the options on one line without extra spaces.
- Only the chosen option is evaluated; functions in the other options are not run.
- If an option contains a `$unEscape[]` call, the semicolons of its text are treated as option separators too (see `$unEscape`): `$randomText[$unEscape[red\;green\;blue]]` chooses among `red`, `green` and `blue`.

## Examples

### Heads or Tails

```bdfd
🪙 The coin lands on: **$randomText[Heads;Tails]**!
```

### Random color choice

```bdfd
$title[Color of the day]
$description[The color of the day is: **$randomText[Red;Blue;Green;Yellow;Purple;Orange;Pink]**]
$color[$randomText[#FF0000;#0000FF;#00FF00;#FFFF00;#800080;#FFA500;#FF69B4]]
```

### Random welcome message

```bdfd
$randomText[Welcome $username to the server! 🎉;Hey $username, glad to see you! 👋;$username just joined us! 🥳;A new adventurer, $username, has arrived! ⚔️]
```

## Notes

- To generate a random number, use `$random[]`.
- To generate a random alphanumeric string, use `$randomString[]`.
