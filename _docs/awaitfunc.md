---
layout: doc
title: $awaitFunc[]
translation_key: docs
category: "Control Flow"
function_name: awaitFunc
syntax: $awaitFunc[functionName;(userID);(channelID)]
description: Suspends command execution until a specified asynchronous event occurs. Used to wait for user interactions like button clicks, reactions, or message responses.
---
$awaitFunc is a powerful mechanism for creating interactive, multi-step commands. It pauses the command at a specific point and resumes only when the expected event occurs — a button click, a reaction, a message, etc.

## How It Works

1. You send a prompt (message with buttons, reaction request, etc.) to the user.
2. You call `$awaitFunc` specifying what event to wait for.
3. The command **suspends** — no further code runs until the event occurs.
4. When the awaited event fires (matching any filters), execution **resumes** from the next line.
5. Context is preserved: all variables, states, and scopes are maintained across the suspension.

## Awaited Events

| functionName | Waits for... |
|--------------|--------------|
| `"button"` | A button interaction (created with `$addButton`) |
| `"reaction"` | A reaction added to the bot's message |
| `"message"` | A new message sent in the channel |

The exact set of supported events depends on the Bot Creator implementation. Check your version's documentation for the full list.

## Filters (Optional Parameters)

- **userID**: Restricts the await to a specific user. Use `$authorID` to wait for the original command author.
- **channelID**: Restricts the await to a specific channel. Use `$channelID` for the current channel.

If filters are omitted, the await resolves for **any** matching event from any user in any channel — which is rarely what you want. Always filter by `$authorID` unless you have a specific reason not to.

## Timeout Handling

Most `$awaitFunc` implementations have a timeout (typically 60 seconds). If no matching event occurs before the timeout, execution resumes with a timeout flag set. You can check for timeout:

```
$awaitFunc[button;$authorID]
$if[$awaitTimedOut==true]
$sendMessage[⏰ Délai dépassé.]
$stop
$endif
```

The exact timeout flag variable depends on your Bot Creator version. Common names include `$awaitTimedOut` or `$awaitResult`.

## Important: Use with $defer

Most `$awaitFunc` use cases involve interaction-based commands. Since the await can take a long time, always place `$defer` at the beginning of the command to prevent Discord's 3-second interaction timeout:

```
$defer
$sendMessage[Que voulez-vous faire ?]
$addButton[yes;✅ Oui]
$addButton[no;❌ Non]
$awaitFunc[button;$authorID]
$sendMessage[Vous avez cliqué sur un bouton !]
```
