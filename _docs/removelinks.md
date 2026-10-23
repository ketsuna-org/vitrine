---
layout: doc
title: $removeLinks
translation_key: docs
category: "Math & Text"
function_name: removeLinks
syntax: $removeLinks[Text]
description: Returns a text without its http:// and https:// links. Without argument, it is a flag that removes the links from the whole message the script sends.
---

# $removeLinks

The `$removeLinks[Text]` function **returns the given text without its `http://` and `https://` links**. Without argument, `$removeLinks` is a **flag** that removes the links from the whole message sent by the script.

## Syntax

```
$removeLinks[Text]
```

## Parameters

| Parameter | Description |
|---|---|
| `Text` | Optional. The text to clean. With it, the function returns that text without its links and filters nothing else. |

More than one argument is refused ("Invalid argument count").

## Return Value

- **Type**: String
- With `Text`: the text without its links.
- Without argument (`$removeLinks`): always an empty string; it only sets the flag.

## Behavior

- **With an argument**: only the given text is cleaned; the rest of the message is not filtered.
- **Without argument**: the flag applies to the whole script output, whether `$removeLinks` is written before or after the text.
- A link is detected case-insensitively when it starts with `http://` or `https://`. The match runs up to the next space, line break, `<` or `>`, so punctuation stuck to the link goes with it: `(https://a.b/c).` becomes `(`.
- Links without `http://` or `https://` (`www.x.com`, `discord.gg/abc`, `ftp://...`) are not removed.
- It is **not** applied to messages sent by `$sendMessage[]` or `$channelSendMessage[]`, nor to embed fields (`$title`, `$description`...): their links are kept.
- The flag (bare form) is reset at the start of each script execution.

## Examples

### Clean a given text

```bdfd
$removeLinks[Visit https://spam.com now]
```

The message sent is `Visit  now` (the two spaces around the removed link remain).

### Echo only the cleaned user text

```bdfd
Your text: $removeLinks[$message]
```

Only `$message` is cleaned; `Your text:` is untouched.

### Anti-spam cleanup of the whole message (flag)

```bdfd
$removeLinks
Visit https://spam.com now
```

The message sent is `Visit  now`.

## Notes

- `$ignoreLinks` is accepted but does nothing in this engine; it is not a way to block links.
- To remove another piece of text, use `$removeContains[]`.
