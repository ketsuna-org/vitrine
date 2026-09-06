---
layout: doc
title: Autocomplete
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Respond to slash command autocomplete interactions with dynamic choices.
permalink: /docs/javascript/autocomplete/
---

Autocomplete lets slash commands suggest options as the user types. The `interaction` global is available in autocomplete handlers.

## Responding with choices

### `await interaction.respond(choices)`

Send up to **25** suggestions. Each choice needs `name` (display) and `value` (stored value):

```javascript
const focused = interaction.options.getFocused();
const filtered = fruits
  .filter((f) => f.toLowerCase().includes(focused.toLowerCase()))
  .slice(0, 25)
  .map((f) => ({ name: f, value: f }));

await interaction.respond(filtered);
```

Return an empty array when no matches:

```javascript
await interaction.respond([]);
```

## Reading the focused option

### `interaction.options.getFocused(required?)`

Returns the partial string the user has typed so far.

```javascript
const query = interaction.options.getFocused(true);
```

## When autocomplete runs

- Triggered when a user types in a slash option configured for autocomplete.
- You must respond within Discord's interaction timeout.
- Use `interaction.isAutocomplete()` to distinguish from command execution.

## Related

- [interaction](/docs/javascript/interaction/) — slash command replies
- [Interactions overview](/docs/interactions-overview/) — BDScript autocomplete with `((interaction.kind))`
