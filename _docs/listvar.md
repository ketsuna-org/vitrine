---
layout: doc
title: $listVar[]
translation_key: docs
category: "Variables"
function_name: listVar
syntax: $listVar[(separator)]
description: Returns a formatted list of all temporary variables currently defined in the execution context.
parameters:
  - name: separator
    type: string
    required: false
    description: The string used to separate variable entries in the output. Defaults to a comma (",") if omitted.
returns:
  type: string
  description: A string listing all temporary variables with their names and values, formatted with the specified separator.
related:
  - var
  - varExists
  - variablesCount
  - getVar
examples:
  - title: Lister toutes les variables temporaires
    code: |
      $var[nom;Alice]
      $var[age;25]
      $var[ville;Paris]
      $listVar
      Résultat: "nom: \"Alice\", age: \"25\", ville: \"Paris\""
  - title: Avec un séparateur personnalisé
    code: |
      $var[x;10]
      $var[y;20]
      $listVar[\n]
      Résultat: 
      x: "10"
      y: "20"
  - title: Aucun variable définie
    code: |
      $listVar
      Résultat: (chaîne vide)
---

$listVar is a diagnostic and debugging function that provides visibility into all currently active temporary variables. Each entry in the output includes both the variable name and its current value.

## Output Format

Variables are listed with their names and values in the format `name: "value"`. The default separator is a comma followed by a space: `, `. To customize this, provide a separator string:

- `$listVar[\n]` — one variable per line.
- `$listVar[ | ]` — pipe-separated list.
- `$listVar[; ]` — semicolon-separated list.

Use `\n` for a literal newline character in the separator.

## Scope

Only **temporary** variables (`$var`) are listed. Global and user-scoped variables (`$getVar`/`$setVar`) are **not** included. There is no built-in equivalent for listing persistent variables.

## When to Use

- **Debugging**: verify that variables are set to expected values at various points in a complex command.
- **Logging / error messages**: include the variable state in error output to help users diagnose issues.
- **Dynamic inspection**: check which variables exist before branching logic.
