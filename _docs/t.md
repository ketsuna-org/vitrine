---
layout: doc
title: $t
translation_key: docs
category: "Translations"
function_name: t
syntax: $t[key;(arguments...)]
description: Returns a translated text of the bot, in the language of the person or of the server. Not in BDFD.
---

# $t

`$t` looks `key` up in the bot's **Translations** (Tools tab) and returns the text in the best available language:

1. the language of the person who ran the command (slash commands, buttons, menus, forms),
2. then the language of the server, when Discord provides one (Community servers),
3. then English.

A language that has no text for the key is skipped. If no language has it, `$t` returns the key itself and writes a warning in the bot's logs. It never fails a script.

## Syntax

```
$t[key]
$t[key;name=value;name2=value2]
$t[key;first;second]
```

## Parameters

| Parameter | Description |
|---|---|
| `key` | Translation key, for example `shop.bought`. |
| `name=value` | A **named** argument, read as `{name}` in the text. |
| `value` | A **positional** argument (anything that is not `name=…`), read as `{1}`, `{2}`… in the text. Named and positional arguments can be mixed. To pass a positional text that looks like `a=b`, write `1=a=b`. |

## Text syntax

A translation is plain text, with a subset of ICU MessageFormat:

- `{name}` or `{1}`: an argument. A missing argument stays visible as `{name}`.
- `{count, plural, one {# item} other {# items}}`: a plural. The categories (`zero`, `one`, `two`, `few`, `many`, `other`) follow the CLDR rules **of the language of the text** (Polish needs `one`, `few`, `many`, `other`; Japanese only `other`). `other` is required. `=0 {none}` matches exactly. `#` is the number, formatted for the language.
- `{role, select, admin {Administrator} other {Member}}`: a choice by value. `other` is required.
- `{price, number}`: a number with the separators of the language.
- `'{'` writes a literal brace and `''` an apostrophe. A lone apostrophe (`l'objet`) needs no escape.

An argument value is data: it is never read again as `$t` or as a variable.

## Return value

- The translated, formatted text.

## Examples

```bdfd
$t[welcome;user=$username;server=$guildName]
```

```bdfd
$t[shop.items;count=$getUserVar[items]]
```

```bdfd
$onlyIf[$getUserVar[coins]>=$message[2];$t[err.not_enough_coins]]
```

See also [`$tIn`](/docs/tin/), [`$tHas`](/docs/thas/), [`$locale`](/docs/locale/) and [`$guildLocale`](/docs/guildlocale/).
