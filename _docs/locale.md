---
layout: doc
title: $locale
translation_key: docs
category: "Translations"
function_name: locale
syntax: $locale
description: Returns the Discord language of the person who ran the interaction. Not in BDFD.
---

# $locale

`$locale` returns the language code Discord sends with the interaction, such as `fr`, `en-US` or `pt-BR`. It is empty when there is no interaction (a text command, an event, a schedule).

## Syntax

```
$locale
```

## Return value

- A Discord locale code, or an empty text.

## Examples

```bdfd
$if[$locale==fr]
  Bonjour !
$endif
```

See also [`$guildLocale`](/docs/guildlocale/) and [`$t`](/docs/t/).
