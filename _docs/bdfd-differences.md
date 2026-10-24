---
layout: doc
title: Differences with BDFD
category: "Meta"
api_type: general
description: Where the Bot Creator BDFD engine behaves differently from Bot Designer For Discord, and which of those differences are kept on purpose.
permalink: /docs/bdfd-differences/
---

# Differences with BDFD

Most BDFD scripts run unchanged, but a few behaviors differ. Some are extensions, some are deliberate choices kept on purpose, and some are conventions the official BDFD wiki does not specify. Read this page when a script ported from BDFD does not do what it did there.

"Kept" means the difference is intentional and will not be aligned with BDFD.

## Differences kept on purpose

| Function | Bot Creator | BDFD wiki |
|---|---|---|
| [`$useChannel`](/docs/usechannel/) in a slash command | Also redirects the main response; the interaction gets no reply. Use `$channelSendMessage[channelID;text]` to answer and write elsewhere. | Does not redirect the response of a slash command. |
| [`$noMention`](/docs/nomention/) | Cuts all notifications of the response, including `<@id>` written on purpose. Add `$allowUserMentions[ID]` or `$allowRoleMentions[ID]` to notify someone. | Only removes the automatic mention of the author; written mentions still notify. |
| [`$removeContains`](/docs/removecontains/) | Removes a pattern from a text; the form `[word;...;amount]` is refused. Nothing is deleted from the channel. | Purges recent messages that contain the words. |
| `$ignoreTriggerCase` | Accepted, no effect: prefix command names and aliases already ignore case. | Makes triggers case-insensitive (premium). |
| `$alternativeParsing`, `$optOff`, `$disableInnerSpaceRemoval`, `$disableSpecialEscaping` | Accepted, no effect: their BDFD effect on brackets, semicolons and spaces is not reproduced. | Change how the script is read. |

## Slash commands and moderation

- [`$message[option]`](/docs/message/) of a `user`, `channel`, `role` or `mentionable` option returns the **ID**, not the name. Use `$username[...]`, `$channelName[...]` or `$roleName[...]` for the name. `$message[1]`, `$message[>]` and ranges also work in slash commands (they read the option values in order).
- [`$banID`](/docs/banid/) and [`$unBanID`](/docs/unbanid/) without an ID are an error in a slash command (`Missing or invalid user ID.`). The fallback on the last word of the message only exists in prefix commands. IDs must be decimal digits.
- [`$mentioned`](/docs/mentioned/) returns the command author when nobody is mentioned (historical BDFD default). Write `$mentioned[1;no]` in guards. Mentions are numbered in the order of the text.
- `$kick[]`, `$kick[;reason]` and `$ban` never fall back to the author.
- `$customID` only exists in the script run for a click (an `interactionCreate` workflow with `customIdFilter`), never in the slash command; a button is handled by a workflow.
- `$ephemeral` and `$defer[yes]` are decided when the interaction is acknowledged (the engine reads the script first). A script with `$newModal`, `$callWorkflow`, `$eval` or `$funcCall` is not deferred.
- [`$channelSendMessage`](/docs/channelsendmessage/) and `$sendEmbedMessage` only send their own channel message; they do not touch the response being built or its flags (`$reply`, `$ephemeral`, `$nomention`, `$dm`...). The third argument of `$channelSendMessage` (message to reply to) is an extension.

## Reading the script

- Function names are case-insensitive; temporary variable names are **case-sensitive**.
- Only `\$`, `\[`, `\]` and `\;` are escapes. A balanced pair of `[` `]` inside an argument keeps its content, semicolons included.
- An unknown function is left as text, arguments included (the Manager's validator reports it as an error).
- Spaces in arguments are kept, not trimmed.
- The whole script is validated before anything runs (arity of every known function, even in a branch not taken).
- A value produced by a variable or an option is never re-read as BDFD. Only `$eval[...]` evaluates text.

## Structures

- [`$if` ... `$endif`](/docs/if-else/) is accepted inside the argument of another function. The block closes inside its argument (`\;` for a literal semicolon). Loops, `$try`, `$jsonForEach` and `$func` are still refused there.
- Conditions: finite decimal numbers are compared exactly as numbers, anything else as text. The operator is searched outside Discord tokens (`<@id>`, `<#id>`...). A condition without an operator that is not `true` or `false` is an error.
- [`$async`](/docs/async/) / [`$endAsync`](/docs/endasync/) / [`$await`](/docs/await/): a block nobody awaits is waited for before the response is sent. 25 blocks per execution.
- Limits: 100,000 steps per execution, 128 nested blocks, a shared time budget per invocation.
- `$scriptLanguage` always returns `BDScript 2`.

## Extensions

- Autocomplete by script: [`$appendOptionSuggestion`](/docs/appendoptionsuggestion/), [`$autoCompleteOptionName`](/docs/autocompleteoptionname/), [`$autoCompleteOptionValue`](/docs/autocompleteoptionvalue/). The code is stored with the option instead of an `$onAutoComplete[Name]` callback; 25 suggestions, 2 seconds.
- `$modifyChannel`: an empty argument leaves the field unchanged; `!clear` erases the topic.
- `$jsonForEach`, the 6th argument of `$modifyRole` (position), and the `bdfd.userVariableSemantics` setting for user variables.
- `$membersCount[Presence]` needs the privileged Guild Presence intent.

Some conventions have not been checked against a real BDFD bot (spaces in arguments, empty brackets on `$else[]`, semicolons inside a block in an argument). Do not assume identical behavior for those.
