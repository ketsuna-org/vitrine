---
layout: doc
title: $guildLocale
translation_key: docs
category: "Translations"
function_name: guildLocale
syntax: $guildLocale
description: Returns the preferred language of the server. Not in BDFD.
---

# $guildLocale

`$guildLocale` returns the language of the server: the one Discord sends with an interaction (Community servers only), otherwise the server's preferred language when the bot knows it. It is empty when the server has none or there is no server.

## Syntax

```
$guildLocale
```

## Return value

- A Discord locale code, or an empty text.

See also [`$locale`](/docs/locale/) and [`$t`](/docs/t/).
