---
layout: doc
title: $removeLinks
translation_key: docs
category: "Math & Text"
function_name: removeLinks
syntax: $removeLinks
description: Removes all URLs (HTTP/HTTPS links) from a text. Useful for anti-spam moderation.
---

# $removeLinks

The `$removeLinks` function **removes all URLs** (http://, https://) from the message or current text.

## Syntax

```
$removeLinks
```

## Parameters

None.

## Return Value

- **Type**: String
- The text without any URLs.

## Behavior

- Detects URLs starting with `http://` or `https://`.
- Removes the entire URL, not just the protocol.
- Works on the current text context (`$message`, `$input`, etc.).

## Examples

### Anti-spam cleanup

```bdfd
$sendMessage[Cleaned message: $removeLinks]
; "Visit https://spam.com now" → "Visit  now"
```

### Secure echo command

```bdfd
$let[safe;$removeLinks]
$sendMessage[$safe]
```

### Comparison and alert

```bdfd
$if[$message!=$removeLinks]
  $sendMessage[⚠️ Your message contained links which have been removed.]
  $sendMessage[$removeLinks]
$else
  $sendMessage[$message]
$endif
```

### Logs without links

```bdfd
$channelSendMessage[123456789;Message from $username: $removeLinks]
```

## Notes

- To completely block links (not just remove them), use `$ignoreLinks`.
- To remove other patterns, use `$removeContains[]`.
- Does not remove Discord links (channel mentions, etc.).
