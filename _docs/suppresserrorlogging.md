---
layout: doc
title: $suppressErrorLogging
translation_key: docs
category: "Control Flow"
function_name: suppressErrorLogging
syntax: $suppressErrorLogging
description: Disables internal error logging for the current command execution. Runtime errors will not be recorded in the bot's error logs.
returns:
  type: void
  description: Disables error logging for the current command. Returns nothing.
related:
  - suppressErrors
  - embedSuppressErrors
  - onlyIf
examples:
  - title: Désactiver le logging pour une commande sensible
    code: |
      $suppressErrorLogging
      $suppressErrors
      $httpGet[https://api.private.example.com/data]
      Traitement silencieux...
  - title: Éviter de polluer les logs
    code: |
      $suppressErrorLogging
      Tentative de connexion...
      $httpGet[https://api.unstable.example.com/health]
---
$suppressErrorLogging disables the internal logging of runtime errors for the current command. Unlike `$suppressErrors` (which controls what the user sees) or `$embedSuppressErrors` (which controls embed-specific errors), this function acts on the **server-side** — it prevents errors from being recorded in the bot's internal log system.

## How It Works

- When called, error logging is suppressed for the **current command execution**.
- If a runtime error occurs after this call, it will **not** be recorded in the bot's error logs.
- The user may still see the error message (unless `$suppressErrors` is also called).
- The suppression is scoped to the current command only.

## When to Use

- **Sensitive commands**: commands that may generate errors containing private data that should not persist in logs.
- **High-frequency commands**: commands called very often where logging every error would flood the log system.
- **Expected failures**: when you're intentionally trying operations that may fail, and you don't want those failures cluttering your error logs.

## When Not to Use

- **During debugging**: error logs are essential for diagnosing problems. Only suppress logging when you're confident the errors are expected and non-actionable.
- **As a default**: most commands should keep logging enabled so you can monitor the health of your bot.

## Relationship with Other Suppression Functions

| Function | User-visible errors | Embed errors | Internal logging |
|----------|--------------------|--------------|------------------|
| `$suppressErrors` | Suppressed | Suppressed | Unchanged |
| `$embedSuppressErrors` | Unchanged | Suppressed | Unchanged |
| `$suppressErrorLogging` | Unchanged | Unchanged | Suppressed |

All three can be combined independently to achieve the exact level of error visibility you need.
