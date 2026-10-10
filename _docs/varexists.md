---
layout: doc
title: $varExists[]
translation_key: docs
category: "Variables"
function_name: varExists
syntax: $varExists[name]
description: Checks whether a variable with the given name is declared for the bot (the variables defined in the bot settings). It does not look at the temporary variables created with $var.
---

`$varExists[name]` tells whether a variable called `name` is **declared** for the bot, that is, defined in the variables of your bot (user, server, channel, member or global variables) and not only used in a script.

## Return Value

The return value is always the text `true` or `false`. It can be used directly as a condition, or compared:

```text
$if[$varExists[name]]
$if[$varExists[name]==true]
```

## Matching Rules

- The name is trimmed and compared **without regard to case** (`Score` finds `score`).
- A leading `bc_` prefix is ignored on both sides.
- An empty name is an error ("A variable name is required.").
- Only the declaration is tested: no value is read and nothing is created.

## Scope

This function does **not** check the temporary variables created with `$var` (there is no function for that: test `$var[name]` against an empty value). It does not read the value of a declared variable either; use `$getUserVar`, `$getServerVar`, ... for that. To stop the script when a variable is not declared, use [$varExistError](/docs/varexisterror/).

## Use Cases

- **Guard clauses**: skip logic that depends on a variable being declared in the bot settings.
- **Configuration checks**: tell the user that a feature is not set up yet.

## Examples

### Checking Variable Configuration

```bdfd
$if[$varExists[userScore]==true]
  $title[Score System Online]
  $description[Your score: **$getUserVar[userScore]**]
  $color[#57F287]
$else
  $title[System Offline]
  $description[The `userScore` variable is not configured.]
  $color[#ED4245]
$endif
```
