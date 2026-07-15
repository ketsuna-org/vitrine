---
layout: doc
title: variables
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Runtime variable object merged from config defaults and db storage.
permalink: /docs/javascript/variables/
---

The `variables` global is a plain object containing resolved variable values for the current execution context.

## What it contains

At runtime, the runner merges:

1. `config.globalVariables` defaults
2. Stored global values from the database
3. Scoped values for the current user/guild/channel/message context

```javascript
console.log(variables.coins);
console.log(variables.welcomeMessage);
```

## Aliases

Each registered variable is accessible under multiple keys:

- The storage key (e.g. `coins`)
- The reference key from variable definitions
- A `bc_` prefixed alias (e.g. `bc_coins`)

## Relationship to db.*

Writing through `db.user.set()`, `db.global.set()`, etc. updates `variables` in-place for the current context, so reads from `variables` reflect recent writes within the same script execution.

```javascript
await db.user.set('coins', 100);
console.log(variables.coins); // 100
```

## Variable registration

Variables must be registered in the Bot Creator app panel before scoped `db.*.get()` returns stored values. See the [Database variables guide](/advanced-topics/2026/05/30/mastering-persistent-database-variables-in-bdfd/).

## BDFD equivalent

BDScript uses `$getUserVar`, `$getVar`, etc. See [Variables](/docs/#variables) function category.

## Related

- [db — Storage API](/docs/javascript/db/)
- [Events & placeholders](/docs/events-and-placeholders/) — `((...))` template variables
