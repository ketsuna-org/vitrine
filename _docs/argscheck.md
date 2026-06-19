---
layout: doc
title: $argsCheck[]
translation_key: docs
category: "Variables"
function_name: argsCheck
syntax: $argsCheck[operator;count;errorMessage]
description: Validates the number of arguments passed to the command and stops execution with an error message if the condition is not met. Acts as a guard that blocks the rest of the command from running on invalid input.
parameters:
  - name: operator
    type: string
    required: true
    description: The comparison operator. Must be one of: >, >=, <, <=. Determines how the argument count is compared to the expected count.
  - name: count
    type: number
    required: true
    description: The expected number of arguments to compare against.
  - name: errorMessage
    type: string
    required: true
    description: The error message to display if the condition fails and execution is blocked.
returns:
  type: void
  description: Returns nothing. If the condition is met, execution continues normally. If the condition fails, execution stops and the error message is sent.
related:
  - args
  - argCount
  - var
  - stop
examples:
  - title: Exiger au moins 2 arguments
    code: |
      $argsCheck[>=;2;Vous devez fournir au moins 2 arguments.]
      Traitement des arguments...
      Résultat: (si < 2 arguments) Vous devez fournir au moins 2 arguments.
  - title: Exiger exactement 1 argument
    code: |
      $argsCheck[>=;1;Usage: !commande <cible>]
      $argsCheck[<=;1;Trop d'arguments. Un seul attendu.]
      Cible: $args[0]
  - title: Maximum d'arguments
    code: |
      $argsCheck[<=;5;Vous ne pouvez pas fournir plus de 5 arguments.]
      Suite du traitement...
  - title: Condition satisfaite (exécution continue)
    code: |
      Commande: !greet Alice
      $argsCheck[>=;1;Usage: !greet <nom>]
      Bonjour $args[0] !
      Résultat: Bonjour Alice !
---

$argsCheck is a guard function that enforces argument count constraints at the beginning of a command. It is the recommended way to validate user input before processing — cleaner and more concise than manual `$if`/`$stop` combinations.

## How It Works

1. The current argument count (`$argCount`) is compared to the specified `count` using the given `operator`.
2. If the condition is **true**, execution continues to the next line.
3. If the condition is **false**, the `errorMessage` is sent to the user and the command **stops executing immediately** — no further code in the command runs.

## Operators

| Operator | Meaning | Condition passes when... |
|----------|---------|--------------------------|
| `>=` | Greater or equal | `$argCount >= count` |
| `>` | Strictly greater | `$argCount > count` |
| `<=` | Less or equal | `$argCount <= count` |
| `<` | Strictly less | `$argCount < count` |

## Best Practices

- Place `$argsCheck` at the very top of your command, before any other logic.
- Write clear, actionable error messages that tell the user what they did wrong and how to fix it.
- Use `$argsCheck[>=;N;...]` for minimum argument requirements — the most common use case.
- Use `$argsCheck[<=;N;...]` to enforce maximums.
- Combine two checks for exact count requirements (as shown in the examples).

## Comparison with Manual Validation

Without `$argsCheck`:
```
$if[$argCount<2]
Erreur : au moins 2 arguments requis.
$stop
$endif
```

With `$argsCheck` (equivalent, cleaner):
```
$argsCheck[>=;2;Erreur : au moins 2 arguments requis.]
```
