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

`$guildLocale` returns the language of the server: the one Discord sends with an interaction (Community servers only), otherwise the server's preferred language when the bot knows it. It is empty when the server has none or there is no server. Only the language Discord sends with an interaction is used to pick a translation: the server's preferred language (`en-US` by default) is shown here but never changes which text `$t` returns.

## Syntax

```
$guildLocale
```

## Return value

- A Discord locale code, or an empty text.

## Examples

```bdfd
$if[$guildLocale==fr]
  Ce serveur est en français.
$endif
```

See also [`$locale`](/docs/locale/) and [`$t`](/docs/t/).
