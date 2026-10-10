---
layout: doc
title: $ignoreLinks
translation_key: docs
category: "Moderation"
function_name: ignoreLinks
syntax: $ignoreLinks
description: Accepted for compatibility with BDFD scripts; in this engine it does nothing and returns an empty string.
---

# $ignoreLinks

`$ignoreLinks` is accepted by the engine so that existing BDFD scripts still run, but it has **no effect**: it does not inspect the triggering message, does not stop the command and sends nothing.

## Syntax

```
$ignoreLinks
```

## Parameters

No parameters. Writing `$ignoreLinks[...]` with any argument is an error (`Invalid argument count`).

## Return Value

Empty string.

## Behavior

- The command always continues after `$ignoreLinks`, whether or not the message contains a link.
- Verified by running the engine: `$ignoreLinks see https://x.com ok` outputs ` see https://x.com ok`.

## Examples

### Manual link check

To refuse messages that contain a link, test the text yourself.

```bdfd
$if[$checkContains[$message;https://;http://]==true]
  $sendMessage[❌ Links are forbidden in this command.]
  $stop
$endif
$sendMessage[Processing OK.]
```

### Log attempts with links

```bdfd
$if[$checkContains[$message;https://;http://]==true]
  $log[Link blocked: $message — Author: $userName ($authorID)]
  $stop
$endif
$sendMessage[Message processed.]
```

## Notes

- To strip `http://` / `https://` links from the text that your script outputs, use `$removeLinks`.
- To block a command by link detection, use `$checkContains` (as above) together with `$stop`.
