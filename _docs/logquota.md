---
layout: doc
title: $logQuota
translation_key: docs
category: "Flags & Debug"
function_name: logQuota
syntax: $logQuota
description: Returns the log quota value supplied by the execution context (the log.quota variable), or 1000 if none is supplied.
---
# $logQuota

The function `$logQuota` returns a log quota value. It does not count the logs you emit.

## Syntax

```
$logQuota
```

## Parameters

None. Any argument is refused ("Invalid argument count").

## Return Value

- **Type**: String (a number as text)
- The value of the context variable `log.quota` if the entry point supplied one, otherwise the constant `1000`.

## Behavior

- The value is **not** decreased by calls to `$log[]`: the engine keeps no counter.
- No plan or subscription is consulted.

## Examples

### Display the quota

```bdfd
$sendMessage[Log quota: $logQuota]
```

### Compare with a threshold

```bdfd
$if[$logQuota<100]
  $sendMessage[Low log quota.]
$else
  $sendMessage[Log quota: $logQuota]
$endif
```

## Notes

- `$log[text]` forwards its text to the log callback of the execution context and returns an empty string.
