---
layout: doc
title: $discriminator
translation_key: docs
category: "Entity Info"
function_name: discriminator
syntax: $discriminator
description: Returns the legacy discriminator of the user (4-digit code). Returns "0" for pomelo accounts (new users without a discriminator).
---

# $discriminator

The variable `$discriminator` returns the **legacy discriminator** of the user, i.e., the 4-digit code that was used to differentiate users with the same username (e.g., `JohnDoe#1234`).

## Syntax

```
$discriminator
```

## Return value

- **Type**: String
- Old accounts: a 4-digit number (e.g., `"1234"`, `"0001"`)
- New accounts (pomelo): `"0"`

## Behavior

- `$discriminator` takes **no arguments**.
- Since Discord's migration to unique usernames (pomelo system), new users no longer have a discriminator.
- Accounts created before the migration retain their discriminator.

## Examples

### Detecting a legacy account

```bdfd
$if[$discriminator!=0]
  $title[Legacy Account]
  $description[
  **Full Tag:** $userTag
  **Discriminator:** $discriminator
  ]
  $color[#5865F2]
  $sendMessage[]
$else
  $title[Pomelo Account]
  $description[
  **Name:** $userName
  (No discriminator)
  ]
  $color[#57F287]
  $sendMessage[]
$endif
```

## Notes

- The discriminator system is **deprecated** — Discord no longer assigns them to new accounts.
- `$discriminator` returns `"0"` for pomelo accounts.
- For reliable identification, always use `$userID`.
