---
layout: doc
title: $suppressErrors
translation_key: docs
category: "Control Flow"
function_name: suppressErrors
syntax: $suppressErrors
description: Suppresses all runtime error messages that would normally be displayed to the user when a command encounters an error.
returns:
  type: void
  description: Enables error suppression for the current command execution. Returns nothing.
related:
  - embedSuppressErrors
  - suppressErrorLogging
  - onlyIf
  - defer
examples:
  - title: Supprimer les erreurs d'une commande risquée
    code: |
      $suppressErrors
      $httpGet[https://api.unstable.example.com/data]
      $sendMessage[Données : $httpResult]
      Résultat: (si l'API échoue) → aucun message d'erreur affiché
  - title: Commande silencieuse sans erreurs
    code: |
      $suppressErrors
      $var[resultat]
      $sendMessage[Résultat : $resultat]
---
$suppressErrors is a toggle that prevents runtime errors from being sent to the user. When active, if your command encounters an error (invalid function call, missing variable, failed HTTP request, etc.), the error message is silently swallowed instead of being displayed in the channel.

## How It Works

- When called, error suppression is enabled for the **current command execution**.
- Any errors that occur after `$suppressErrors` is called will not produce visible error output.
- The suppression applies to **all** types of runtime errors (parsing errors, execution errors, type errors, etc.).

## When to Use

- **Unstable external APIs**: when calling endpoints that may fail intermittently, you may not want to spam the channel with error messages.
- **User-facing commands**: keep the chat clean by handling errors gracefully with your own fallback logic.
- **Variable existence checks**: when you access variables that may or may not exist, suppress the default error and use `$varExists` to check manually.

## When Not to Use

- **During development**: error messages are invaluable for debugging. Enable suppression only in production commands.
- **As a substitute for proper error handling**: prefer `$onlyIf` guards and proper validation. `$suppressErrors` should be a last resort.

## Scope

The suppression applies to the **current command only**. It does not affect other commands, other workflows, or subsequent command invocations. Each command starts with error suppression off.

## Relationship with Other Suppression Functions

| Function | What it suppresses |
|----------|-------------------|
| `$suppressErrors` | All runtime error messages |
| `$embedSuppressErrors` | Errors specific to embed rendering |
| `$suppressErrorLogging` | Error logging (internal only, not user-visible) |
