---
layout: doc
title: $authorUsername
translation_key: docs
category: "Entity Info"
function_name: authorUsername
syntax: $authorUsername
description: Returns the global username of the author of the message that triggered the command.
---

# $authorUsername

The variable `$authorUsername` returns the **global username** of the author of the message that triggered the command.

## Syntax

```
$authorUsername
```

## Return value

- **Type**: Character string
- The global username of the author

## Behavior

- `$authorUsername` takes **no arguments**.
- Equivalent to `$username` for text commands.
- Returns the **global** username (not the server nickname).

## Examples

### Message from the author

```bdfd
$title[Command executed]
$author[$authorUsername;$authorAvatar]
$description[
**Author:** $authorUsername#$discriminator
**ID:** $authorID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- To get the server nickname of the author, use `$nickname` or `$displayName`.
- `$authorUsername` is useful for explicitly referencing the author of the message in logs or embeds.
- In most cases, `$username` and `$authorUsername` are interchangeable.
