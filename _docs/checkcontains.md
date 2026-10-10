---
layout: doc
title: $checkContains
translation_key: docs
category: "Control Flow"
function_name: checkContains
syntax: $checkContains[text;search;(search2);(...)]
description: Checks whether a string contains a substring and returns "true" or "false".
---
# $checkContains — Inline Substring Check

`$checkContains` tests whether a text contains a substring (or any of several substrings) and returns the string `"true"` or `"false"`.

## How It Works

`$checkContains[text;search;(search2);(...)]` performs a **case-sensitive** substring search. It takes 2 to 100 arguments: the text, then one or more phrases; the result is `"true"` if the text contains **at least one** of the phrases (all the arguments are evaluated first):

- `$checkContains[Hello World;World]` → `"true"`
- `$checkContains[Hello World;world]` → `"false"` (case mismatch)
- `$checkContains[Hello World;xyz]` → `"false"`
- `$checkContains[Hello;]` → `"true"` (empty string is contained in every string)
- `$checkContains[Hello World;missing;World]` → `"true"` (one phrase is enough)
- `$checkContains[Hello World;missing;zzz]` → `"false"`

## Use in $if Conditions

`$checkContains` is most commonly used inside `$if` conditions to route commands based on user input:

```
$if[$checkContains[$message;ping]==true]
  Pong!
$endif
```

`$if[$checkContains[$message;ping]]` also works: the result `true`/`false` is accepted as a condition.

## Case-Insensitive Searching

`$checkContains` is case-sensitive by design. To perform case-insensitive checks, convert both sides to lowercase:

```
$checkContains[$toLowercase[$message];$toLowercase[Admin]]
```

## Common Use Cases

- **Command detection**: Check if a message contains a trigger word.
- **Inventory checks**: See if an item name appears in a list stored as a string.
- **Filtering**: Validate that user input contains expected content.
- **Multi-keyword matching**: Combine with `$or` to check for any of several keywords.

## Common Pitfalls

- **Case sensitivity**: "Hello" does not contain "hello". Use `$toLowercase` if case-insensitive matching is needed.
- **Partial matches**: `$checkContains[sword;word]` returns `"true"`. Use exact equality checks or delimiters if you need whole-word matching.
- **Empty search string**: An empty needle always returns `"true"`. Guard against empty user input if it matters.
- **Type coercion**: All the arguments are text; a number is compared as its text (`$checkContains[2024;20]` is `"true"`).

## Examples

### Moderation Link Filter

```bdfd
$if[$checkContains[$message;discord.gg;https://]==true]
  $deleteMessage[$channelID;$messageID]
  $title[Automod Warning]
  $description[<@$authorID>, links and invites are not allowed in this channel!]
  $color[#ED4245]
$endif
```
