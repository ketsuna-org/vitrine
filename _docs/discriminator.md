---
layout: doc
title: $discriminator
translation_key: docs
category: "Entity Info"
function_name: discriminator
syntax: $discriminator[userID]
description: Returns the discriminator of the given user, left-padded to 4 digits, for bot accounts; returns "0000" for any non-bot account.
---

# $discriminator

The function `$discriminator[userID]` returns the **discriminator** of a user, i.e., the 4-digit code that was used to differentiate users with the same username (e.g., `JohnDoe#1234`).

## Syntax

```
$discriminator[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required (exactly one argument). User ID; if the argument is empty (`$discriminator[]`), the command author is used. A bare `$discriminator` is refused ("Invalid argument count"). |

## Return value

- **Type**: String
- Bot accounts: the discriminator padded to 4 digits (e.g., `"0042"`)
- Any non-bot account: `"0000"`

## Behavior

- `$discriminator` takes **exactly one argument** (it may be empty to target the author).
- The engine only returns the stored discriminator for bot accounts; for every other user it returns `0000`.

## Examples

### Detecting a bot with a discriminator

```bdfd
$if[$discriminator[$authorID]!=0000]
  $title[Account with a discriminator]
  $description[
  **Full Tag:** $userTag[$authorID]
  **Discriminator:** $discriminator[$authorID]
  ]
  $color[#5865F2]
$else
  $title[Account without a discriminator]
  $description[
  **Name:** $userName[$authorID]
  (No discriminator)
  ]
  $color[#57F287]
$endif
```

## Notes

- The user is read from Discord. An ID that is not a positive number raises `Invalid user ID.`; an unknown user raises `User not found.`
- `$discriminator[]` returns `"0000"` for non-bot accounts.
- For reliable identification, always use `$userID`.
