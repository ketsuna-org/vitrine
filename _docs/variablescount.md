---
layout: doc
title: $variablesCount[]
translation_key: docs
category: "Variables"
function_name: variablesCount
syntax: $variablesCount[(Type)]
description: Counts the number of variables currently active. Optionally filters by variable type.
parameters:
  - name: Type
    type: string
    required: false
    description: Optional filter to count only a specific type of variable. Valid values depend on the implementation (e.g., "temp" for temporary variables).
returns:
  type: string
  description: The number of matching variables as a string (e.g., "3"). If no filter is provided, returns the total count of all active variable types.
related:
  - var
  - listVar
  - varExists
  - getVar
  - setVar
examples:
  - title: Compter toutes les variables
    code: |
      $var[a;1]
      $var[b;2]
      $var[c;3]
      Nombre total : $variablesCount
      Résultat: Nombre total : 3
  - title: Compter les variables temporaires
    code: |
      $var[x;10]
      $var[y;20]
      Temporaires : $variablesCount[temp]
      Résultat: Temporaires : 2
  - title: Dans une condition
    code: |
      $if[$variablesCount>0]
      $listVar
      $else
      Aucune variable active.
      $endif
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
