---
layout: doc
title: $setVar[]
translation_key: docs
category: "Variables"
function_name: setVar
syntax: $setVar[name;value;(User ID)]
description: Creates or updates a global variable or a user-scoped variable in the bot's persistent storage.
parameters:
  - name: name
    type: string
    required: true
    description: The case-insensitive name of the variable to write.
  - name: value
    type: string
    required: true
    description: The value to store. Always stored as a string.
  - name: User ID
    type: string
    required: false
    description: Optional Discord user ID. When provided, stores the variable scoped to that specific user instead of globally.
returns:
  type: void
  description: Returns nothing. The variable is written directly to the database.
related:
  - getVar
  - var
  - varExists
  - variablesCount
examples:
  - title: Définir une variable globale
    code: |
      $setVar[welcomeMessage;Bienvenue sur le serveur !]
      Message défini.
  - title: Définir une variable utilisateur
    code: |
      $setVar[coins;500;$authorID]
      Vos coins ont été initialisés à 500.
  - title: Mettre à jour une variable existante
    code: |
      $setVar[visitCount;$add[$getVar[visitCount];1]]
      Compteur mis à jour.
  - title: Condition basée sur une variable utilisateur
    code: |
      $setVar[premium;true;$authorID]
      $if[$getVar[premium;$authorID]==true]
      Vous êtes premium !
      $endif
---

$setVar writes values to the bot's persistent database. This is the counterpart to `$getVar` and is used for any data that needs to survive beyond the current command execution.

## Global vs User-Scoped Variables

The third parameter determines the scope:

- **Omitted**: the variable is stored as **global** — accessible from any command, any user, any server. Use sparingly for configuration or shared data.
- **User ID provided**: the variable is **user-scoped** — each user gets their own independent copy. Perfect for coins, XP, settings, and any per-user data.

## Important Considerations

- **All values are strings**. If you need numeric operations, use `$add`, `$sub`, `$mul`, `$div` to convert and calculate.
- **Overwrite behavior**: calling `$setVar` on an existing variable replaces its value — there is no append mode.
- **Case insensitivity**: `$setVar[Score;100]` and `$setVar[score;200]` target the same variable.
- **No return value**: this function performs a write action and returns void. It cannot be used inline in a string — use it as a standalone statement.
