---
layout: doc
title: $defer
translation_key: docs
category: "Control Flow"
function_name: defer
syntax: $defer
description: Defers the interaction response, giving the bot extra time to process a command before Discord's 3-second timeout. Must be called at the very beginning of a command.
returns:
  type: void
  description: Sends a deferred response to Discord. Returns nothing to the script.
related:
  - wait
  - awaitFunc
  - suppressErrors
examples:
  - title: Commande longue avec defer
    code: |
      $defer
      $wait[5s]
      $sendMessage[Traitement terminé après 5 secondes !]
  - title: Appel API différé
    code: |
      $defer
      $httpGet[https://api.example.com/slow-endpoint]
      $sendMessage[Résultat : $httpResult]
  - title: Traitement lourd avec defer
    code: |
      $defer
      Traitement des données en cours...
      $wait[3s]
      $sendMessage[✅ Données traitées avec succès.]
---
$defer is essential for any command that may take longer than 3 seconds to execute. Discord enforces a strict 3-second timeout on interaction responses: if your bot doesn't respond within that window, the interaction fails with "This interaction failed." `$defer` tells Discord "I got your command, I'm working on it" — resetting the timeout and giving you up to 15 minutes to complete processing.

## How It Works

When called, `$defer` sends a deferred response via `BotCreatorActionType.respondWithMessage` with `deferred: true`. This:

1. Acknowledges the interaction to Discord.
2. Prevents the "This interaction failed" error.
3. Gives you time to perform slow operations (API calls, database queries, file processing, etc.).
4. You can then use `$sendMessage` or embed functions to deliver the actual response.

## Critical Rules

- **Must be the FIRST line** of your command. Any code before `$defer` may cause the 3-second timeout to trigger before the defer is sent.
- **Only once per command**. Calling `$defer` multiple times has no additional effect.
- **Use `$sendMessage` after**, not before. The actual response content is sent after your processing completes.

## Common Use Cases

- Commands that make HTTP requests to slow external APIs.
- Commands that process large datasets or files.
- Commands with artificial delays (`$wait`).
- Commands that wait for user input (`$awaitFunc`).

## Example: Without vs With $defer

Without `$defer` (will fail):
```
$wait[5s]
$sendMessage[Terminé !]
```
→ Discord shows "This interaction failed" because no response was sent within 3 seconds.

With `$defer` (works):
```
$defer
$wait[5s]
$sendMessage[Terminé !]
```
→ The interaction is acknowledged immediately, and the message is sent when ready.

## Note

`$defer` is specifically for **interaction-based** commands (slash commands, context menu commands, etc.). In message-based (prefix) commands, Discord does not enforce the same interaction timeout, so `$defer` is not needed — though calling it does no harm.
