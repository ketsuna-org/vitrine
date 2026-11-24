---
layout: doc
title: bc.t
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Translated texts of the bot, in the language of the person, then of the server, then English.
permalink: /docs/javascript/translations/
related:
  - t
  - tin
  - thas
  - locale
  - guildlocale
---

`bc.t` returns a text from the bot's **Translations** (Tools tab). It is the JavaScript twin of [`$t`](/docs/t/): same keys, same text syntax, same result.

The language is, in order: the language of the person who ran the interaction, the language of the server (when Discord provides one), then English. A language that has no text for the key is skipped. If no language has it, `bc.t` returns the key and writes a warning in the bot's logs.

> The function lives on `bc` (not as a global `t`) so that it never collides with a variable of your own named `t`.

## Usage

```js
// Named arguments: {name} in the text
await interaction.reply(bc.t('welcome', { name: interaction.user.username }));

// Positional arguments: {1}, {2} in the text
bc.t('shop.bought', 'Bob', 'a sword');

// Plural: {count, plural, one {# item} other {# items}}
bc.t('shop.items', { count: 5 });

// A chosen language
bc.t.in('fr', 'welcome', { name: 'Ann' });

// Does the key exist?
bc.t.has('promo.banner');

// Languages
bc.locale;       // language of the person ('' when there is no interaction)
bc.guildLocale;  // language of the server ('' when unknown)
```

## Text syntax

A translation is plain text with a subset of ICU MessageFormat: `{name}`, `{1}`, `{count, plural, one {# item} other {# items}}`, `{role, select, admin {…} other {…}}`, `{price, number}`. Plural categories (`zero`, `one`, `two`, `few`, `many`, `other`) follow the CLDR rules of the language of the text. `other` is required. See [`$t`](/docs/t/) for the full description.

An argument value is data: it is never read again as a template.

## Languages

The 32 Discord locales: `id`, `da`, `de`, `en-GB`, `en-US`, `es-ES`, `es-419`, `fr`, `hr`, `it`, `lt`, `hu`, `nl`, `no`, `pl`, `pt-BR`, `ro`, `fi`, `sv-SE`, `vi`, `tr`, `cs`, `el`, `bg`, `ru`, `uk`, `hi`, `th`, `zh-CN`, `ja`, `zh-TW`, `ko`.
