---
layout: doc
title: $replyEmbed[]
translation_key: docs
category: "Embed & Message"
function_name: replyEmbed
syntax: $replyEmbed[title;description;(color);(footer)]
description: "An embed in one call, instead of `$title`, `$description`, `$color` and `$footer`."
---
# $replyEmbed — An embed in one call, instead of `$title`, `$description`, `$color` and `$footer`

## Syntax

```
$replyEmbed[title;description;(color);(footer)]
```

## Parameters

- **title** *(text, required)* — Up to 256 characters; empty to skip.
- **description** *(text, required)* — Up to 4096 characters; empty to skip.
- **color** *(text, optional)* — `#RRGGBB`.
- **footer** *(text, optional)* — Up to 2048 characters.

## Return Value

- empty.

## Usage

```
$replyEmbed[Hello;Welcome to the server;#5865F2;Have fun]
```

## Important Notes

- It fills the first embed; add fields with `$addField`.

## Example

```bdfd
$sendMessage[$replyEmbed[Hello;Welcome to the server;#5865F2;Have fun]]
```
