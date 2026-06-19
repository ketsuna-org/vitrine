---
layout: doc
title: $ignoreLinks
translation_key: docs
category: "Moderation"
function_name: ignoreLinks
syntax: $ignoreLinks
description: A function guard that silently stops execution if the triggering message contains an HTTP/HTTPS link.
---

# $ignoreLinks

The function guard `$ignoreLinks` detects the presence of **HTTP/HTTPS links** in the triggering message. If a link is found, command execution is silently interrupted.

## Syntax

```
$ignoreLinks
```

## Parameters

No parameters. `$ignoreLinks` is used on its own.

## Behavior

- Analyzes the content of the message searching for `http://` or `https://`.
- If a link is found, the command is immediately interrupted **without a message**.
- If no link is found, the command continues normally.
- Detects all standard links (HTTP and HTTPS), but not links like `discord.gg`, `ftp://`, etc.

## Examples

### Anti-link spam command

```bdfd
$ignoreLinks
$sendMessage[Your message was processed (no link detected).]
```

### With custom error message

```bdfd
$if[$messageContains[https://;http://]==true]
  $sendMessage[❌ Links are forbidden in this command.]
  $stop
$endif
$sendMessage[Processing OK.]
```

### Log attempts with links

```bdfd
$if[$messageContains[https://;http://]==true]
  $log[Link blocked: $message — Author: $userName ($authorID)]
  $stop
$endif
$sendMessage[Message processed.]
```

## Notes

- `$ignoreLinks` is **silent**: the user receives no notification. To inform the user, use manual checking with `$messageContains`.
- It does not detect links in the format `discord.gg/invite` or hidden Markdown links `[text](https://...)`. To cover these cases, use `$messageContains`.
- `$ignoreLinks` only checks the triggering message, not embeds or attachments.
- Ideal for channels where links are forbidden (spam/phishing prevention).
