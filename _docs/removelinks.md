---
layout: doc
title: $removeLinks
translation_key: docs
category: "Math & Text"
function_name: removeLinks
syntax: $removeLinks
description: Flag that removes the http:// and https:// links from the text the script outputs. It returns nothing itself and takes no text.
---

# $removeLinks

The `$removeLinks` function is a **flag**. It returns an empty string and takes no text to clean. When it appears anywhere in the script, the `http://` and `https://` links are removed from the text that the script outputs as its own message.

## Syntax

```
$removeLinks
```

## Parameters

None. Any argument (`$removeLinks[text]`) is refused ("Invalid argument count").

## Return Value

- **Type**: String
- Always an empty string. It cannot be used to obtain a cleaned copy of a text (`$removeLinks` inside another function only adds nothing).

## Behavior

- The flag applies to the whole script output, whether `$removeLinks` is written before or after the text.
- A link is detected case-insensitively when it starts with `http://` or `https://`. The match runs up to the next space, line break, `<` or `>`, so punctuation stuck to the link goes with it: `(https://a.b/c).` becomes `(`.
- Links without `http://` or `https://` (`www.x.com`, `discord.gg/abc`, `ftp://...`) are not removed.
- It is **not** applied to messages sent by `$sendMessage[]` or `$channelSendMessage[]`, nor to embed fields (`$title`, `$description`...): their links are kept.
- The flag is reset at the start of each script execution.

## Examples

### Anti-spam cleanup

```bdfd
$removeLinks
Visit https://spam.com now
```

The message sent is `Visit  now` (the two spaces around the removed link remain).

### Echo without links

```bdfd
$removeLinks
$message
```

## Notes

- `$ignoreLinks` is accepted but does nothing in this engine; it is not a way to block links.
- To remove another piece of text, use `$removeContains[]`.
