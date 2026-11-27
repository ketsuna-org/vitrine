---
layout: doc
title: $translate[]
translation_key: docs
category: "AI"
function_name: translate
syntax: $translate[text;language]
description: "Translates a text into a language with the bot AI (costs credits). The text is treated as data, never as instructions"
---
# $translate — Translates a text into a language with the bot AI (costs credits). The text is treated as data, never as instructions

## Syntax

```
$translate[text;language]
```

## Parameters

- **text** *(text, required)* — The text to translate
- **language** *(text, required)* — The target language: a name (French) or a code (fr)

## Return Value

- String.

## Usage

```
$translate[text;language] → translation
```

## Notes

The text goes to the AI between `<text>` tags and is only ever translated, never obeyed: the tags are removed from the input, the target language is fixed by the script and only the part between `<translation>` tags of the reply is returned. A language is a plain name or code (letters, digits, spaces, `-`, `_`, `,`, up to 40 characters), anything else sets `$aiError` to `invalid_language`. When the AI cannot answer, the result is empty and `$aiError` tells why (`ai_unavailable`, `bad_output`, quota…). Each call costs credits, like `$ai`.

## Example

```bdfd
$sendMessage[$translate[$message;French]]
```
