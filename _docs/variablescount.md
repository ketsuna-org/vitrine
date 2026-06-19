---
layout: doc
title: $variablesCount[]
translation_key: docs
category: "Variables"
function_name: variablesCount
syntax: $variablesCount[(Type)]
description: Counts the number of variables currently active. Optionally filters by variable type.
---

$variablesCount provides a quick way to check how many variables are active in the current execution context. This is useful for validation, debugging, and conditional logic.

## Return Value

The count is always returned as a string representation of an integer (e.g., `"3"`, `"0"`, `"15"`). When used in numeric comparisons, BDFD will automatically coerce the string to a number.

## Type Filtering

When a Type parameter is provided, only variables of that type are counted:

- `$variablesCount` — count all active variables (all types).
- `$variablesCount[temp]` — count only temporary variables.

## Comparison with $listVar

While `$listVar` gives the names and values of temporary variables, `$variablesCount` gives only the count. Use `$variablesCount` when you need a numeric check (e.g., "are there at least 3 variables?") without the overhead of formatting a full list.
