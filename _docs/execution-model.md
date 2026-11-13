---
layout: doc
title: Execution Model and Compatibility Guide
category: "Meta"
api_type: general
description: Comprehensive execution model for Bot Creator. Understand the Discord interaction lifecycle, implicit slash replies, variables, ticket systems, and rules for LLMs.
permalink: /docs/execution-model/
---

# Execution Model and Compatibility Guide

Bot Creator offers three authoring modes. Understanding how the runtime handles Discord interactions, variables, and action boundaries prevents broken commands.

> A Blocks command is a **graph**. How it runs (order, joins, errors, `stop`) is described in [section 0](#0-how-a-graph-runs) below; the format is in the [Graph mode guide](/fr/docs/graph/) (French).

| Mode | Format | Execution Engine | Primary Reference |
|---|---|---|---|
| **Blocks (Graph)** | Visual graph / JSON graph | Native Dart Engine (graph runner) | [Blocks Guide](/docs/blocks/) & [Dictionary](/docs/blocks-dictionary/) |
| **BDScript (BDFD)** | Text & `$functions` | Native AST interpreter (Dart) | [Function Reference](/docs/) |
| **BDJS (JavaScript)** | JavaScript ES6+ | QuickJS / Node Sandbox | [JavaScript API](/docs/javascript/) |

---

## 0. How a graph runs

1. **Order.** Execution is sequential and deterministic, depth first in the order of the links: after a node, its live links are followed in order. Several links on one pin start parallel branches, but they never run at the same time. The mobile list view shows this same order.
2. **Joins.** A node with several incoming links runs **once**, when all of them are resolved (arrived or dead). A path that is not taken is dead; a node whose inputs are all dead is dead too. A link that starts from a node unreachable from the entry is dead from the start.
3. **Branches.** *IF / ELSE* follows the first matching pin (`then`, `elseif:<i>`, `else`); *Switch* follows `case:<value>` or `default`. The other pins are dead.
4. **Regions.** Loop bodies and *Try / Catch* regions are closed: they run again with a fresh state at each turn, and their result keys are overwritten each time (there are no `iter<N>` keys any more).
5. **Errors.** A failing node follows its `error` links if it has any; otherwise `error.mode = continue` notes the error and goes on through `next`; otherwise the error goes up and the run fails.
6. **Stop.** `stop`, `stopUnless` and `cooldown` end the whole running graph. Inside a workflow called by `runWorkflow`, they only end that workflow.
7. **Acknowledgement.** The interaction is deferred before the first node, unless an enabled node `deferInteraction` or `respondWithModal` exists in the root graph or `autoDeferIfActions` is `false`.
8. **Guards.** A command has a 15 minute budget and a maximum number of steps per run.

Commands saved in the former list-of-actions format are converted to a graph when they are loaded, so they keep working.

---

## 1. Discord Interaction Lifecycle & Slash Replies

Discord interactions (Slash Commands, Buttons, Select Menus, Modals) have strict protocol constraints:
1. **Initial Acknowledgment (3-second deadline):**
   - When a BDFD script runs for an interaction, the runner acknowledges (defers) the interaction before executing the script (`interaction.acknowledge()`), unless the script source contains `$newModal`, `$callWorkflow`, `$eval` or `$funcCall`: a modal must be the immediate initial response, and those functions may open one.
2. **Implicit Slash Response in BDScript:**
   - Text written outside functions is gathered into a pending response buffer, and embeds and components declared with functions are added to the same response.
   - When the script finishes, the engine sends this buffer as the interaction response.
   - **You do not need `$sendMessage` in a slash command** to reply. `$sendMessage` sends a separate message to the channel, in addition to the reply buffer (probe: `Hello!` followed by `$sendMessage[Hello2]` produces one channel message `Hello2` and one response `Hello!`).

Implicit native reply:

```bdfd
Hello $username! Welcome to $serverName.
```

Embed-only native reply:

```bdfd
$title[Server Rules]
$description[Respect other members.]
$color[#5865F2]
```

Do not do this: the text is sent twice, once as the reply and once as a separate channel message.

```bdfd
Hello $username!
$sendMessage[Hello $username!]
```

3. **Ephemeral Visibility:**
   - To make an interaction reply private (visible only to the user who triggered it), add the `$ephemeral` function (no arguments) in BDFD:
   ```bdfd
   $ephemeral
   This message is only visible to you.
   ```
   - In Blocks, set `"ephemeral": true` on the `respondWithMessage` node.

4. **Interaction Reply vs Channel Send:**
   - **Replying to the interaction**: Use raw text / `$ephemeral` in BDFD, or `respondWithMessage` in Blocks.
   - **Sending a message in another channel**: Use `$channelSendMessage[channelID;content;(replyMessageID)]` in BDFD, or `sendMessage` with `channelId` in Blocks.

---

## 2. Variables & State Management (No `$let`!)

> [!CAUTION]
> **Phantom syntax:** a temporary-variable setter named `$let` does **not exist** in the Bot Creator engine. Unknown functions are not rejected: they are left in the output as literal text. Use `$var[name;value]` instead.

Bot Creator distinguishes two types of variables:

### A. Temporary Execution Variables (`$var`)
Scoped exclusively to the current command invocation. Lost when the command finishes. Names are case-sensitive.

- **Write (BDScript):** `$var[name;value]`
- **Read (BDScript):** `$var[name]`
- **Blocks:** Action `setTemporaryVariable` (`name`, `value`).

```bdfd
$var[userCount;$membersCount]
$var[greeting;Welcome]

$var[greeting] to all our $var[userCount] members!
```

### B. Persistent Database Variables (`$setVar` / Scoped Storage)
Saved in the bot's database across restarts.

- **Global Variables:**
  - BDScript: `$setVar[key;value]` / `$getVar[key]` (an extra user ID argument switches to the user scope)
  - Blocks: `setGlobalVariable` / `getGlobalVariable`
- **User Variables:**
  - BDScript: `$setUserVar[key;value]` / `$getUserVar[key]`. By default these are stored per server and user (the `guildMember` scope); when the bot's `bdfd.userVariableSemantics` setting is `1`, they are stored per user across servers unless a server ID is given.
  - Blocks: `setScopedVariable` / `getScopedVariable`
- **Server Variables:**
  - BDScript: `$setServerVar[key;value]` (or `$setGuildVar`) / `$getServerVar[key]`
- **Member Variables (Server + User):**
  - BDScript: `$setMemberVar[key;value]` / `$getMemberVar[key]`
- **Channel Variables:**
  - BDScript: `$setChannelVar[key;value]` / `$getChannelVar[key]`

---

## 3. Slash Command Options

In a BDFD slash command, read an option with `$message[optionName]`: when the command is a slash command, `$message[name]` returns the value of the option `name` (an empty string if it was not given).

```bdfd
Reason: $message[reason]
```

In `((...))` placeholders (see the [template system](/docs/template-system/)), the same options are stored as the variables `opts.<option_name>` (for example `((opts.reason))`). For user, channel, role and mentionable options the ID is also stored as `opts.<option_name>.id` (for a user option, `opts.<option_name>` itself is the username).

> [!NOTE]
> There is no `$slashOption[...]` function: it is not registered, so it would be left as literal text.

---

## 4. Discord Ticket System

- `$newTicket` creates a private text channel named `ticket-...` for the command author (hidden from `@everyone`), and `$isTicket` tests whether a channel name contains `ticket`.
- `$closeTicket` deletes the current channel only when its name contains `ticket`; its page is flagged as an incomplete compatibility function.

To build a custom ticket flow with Blocks, the actions `createChannel`, `editChannelPermissions` and `removeChannel` exist.

Read the full walkthrough: **[Complete Ticket System Guide](/docs/tickets/)**.

---

## 5. Golden Rules for Language Models (LLMs / MCP)

1. **Strict Separation:** Never mix Blocks JSON with BDFD syntax (use the explicit BDFD <-> Graph conversion instead, see [BDFD and Graph](/fr/docs/bdfd-graph/)). A `sendMessage` block takes a JSON payload `{ "content": "..." }`, not a string `$sendMessage[...]`.
2. **Zero Invented Functions:** Never document or suggest non-existent functions such as `$let`, `$sendResponse`, `$respondWithMessage`, or `$slashOption`. The engine does not report them; it prints them back as text.
3. **Respect `incomplete` Status:** Alert users to the limitations of functions whose page is marked incomplete (for example `$closeTicket`).
4. **Clean Acknowledgment:** In slash commands, prefer the implicit reply (or `$ephemeral`) without doubling up with a `$sendMessage`.
