---
layout: doc
title: $varExists[]
translation_key: docs
category: "Variables"
function_name: varExists
syntax: $varExists[name]
description: Checks whether a temporary variable with the given name currently exists in the execution context.
---

$varExists is used to safely check whether a temporary variable has been set before attempting to read it. Since `$var` returns an empty string for missing variables (silent failure), `$varExists` is the only reliable way to distinguish between "variable exists with an empty value" and "variable does not exist."

## Return Value

The return value is always the string `"true"` or `"false"` — not a boolean. Use string comparison in conditionals:

```
$if[$varExists[name]==true]
$if[$varExists[name]!=false]
```

Both forms work. `$if[$varExists[name]]` alone will always be truthy (non-empty string), so always compare explicitly.

## Scope

This function only checks **temporary** variables created with `$var`. It does not check global or user-scoped variables — those would need to be checked by attempting `$getVar` and comparing the result.

## Use Cases

- **Lazy initialization**: set a variable only if it hasn't been set yet.
- **Guard clauses**: skip logic that depends on a variable being present.
- **Debugging**: verify that expected intermediate values are available.
