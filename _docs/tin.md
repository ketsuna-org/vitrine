---
layout: doc
title: $tIn
translation_key: docs
category: "Translations"
function_name: tIn
syntax: $tIn[locale;key;(arguments...)]
description: Returns a translated text of the bot in a chosen language. Not in BDFD.
---

# $tIn

`$tIn` works like [`$t`](/docs/t/) but starts from the language you give instead of the person's. If that language has no text, it falls back to the variants of that language (when **Use similar languages** is on), then the bot's default language, then English. The server's language is not used.

## Syntax

```
$tIn[locale;key;(arguments...)]
```

## Parameters

| Parameter | Description |
|---|---|
| `locale` | One of the 32 Discord locales: `id`, `da`, `de`, `en-GB`, `en-US`, `es-ES`, `es-419`, `fr`, `hr`, `it`, `lt`, `hu`, `nl`, `no`, `pl`, `pt-BR`, `ro`, `fi`, `sv-SE`, `vi`, `tr`, `cs`, `el`, `bg`, `ru`, `uk`, `hi`, `th`, `zh-CN`, `ja`, `zh-TW`, `ko`. Short forms such as `en`, `es`, `pt` and `zh` are accepted. An unknown locale is an error. |
| `key` | Translation key. |
| `arguments` | Same as [`$t`](/docs/t/). |

## Return value

- The translated, formatted text.

## Examples

```bdfd
$tIn[fr;welcome;user=$username]
```
