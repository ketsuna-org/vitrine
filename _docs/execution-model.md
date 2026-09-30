---
layout: doc
title: Execution Model and Compatibility Guide
category: "Meta"
api_type: general
description: Comprehensive execution model for Bot Creator. Understand the Discord interaction lifecycle, implicit slash replies, variables, ticket systems, and rules for LLMs.
permalink: /docs/execution-model/
---

# Execution Model and Compatibility Guide

Bot Creator offers three authoring modes sharing a unified execution runtime. Understanding how the runtime handles Discord interactions, variables, and action boundaries prevents broken commands and ensures 100% reliable bots.

| Mode | Format | Execution Engine | Primary Reference |
|---|---|---|---|
| **Blocks** | Visual cards / JSON actions | Native Dart Engine | [Blocks Guide](/docs/blocks/) & [Dictionary](/docs/blocks-dictionary/) |
| **BDScript (BDFD)** | Text & `$functions` | AST Transpiler -> Actions | [Function Reference](/docs/) |
| **BDJS (JavaScript)** | JavaScript ES6+ | QuickJS / Node Sandbox | [JavaScript API](/docs/javascript/) |

---

## 1. Discord Interaction Lifecycle & Slash Replies

Discord interactions (Slash Commands, Buttons, Select Menus, Modals) have strict protocol constraints:
1. **Initial Acknowledgment (3-second deadline):**
   - The Bot Creator runner automatically acknowledges/defers the interaction upon receipt via `interaction.acknowledge()`, preventing Discord from reporting "The application did not respond" (unless a modal is present, which must be sent as the immediate initial response).
2. **Implicit Slash Response in BDScript:**
   - Text written outside functions and embed/component declarations are gathered into a pending response buffer.
   - When the script finishes (or at action boundaries), the engine transmits this buffer as the interaction reply (`respondWithMessage`).
   - **Do NOT write `$sendMessage` in a slash command** simply to reply:

```bdfd
;; ✅ CORRECT: Implicit native reply
Hello $username! Welcome to $serverName.
```

```bdfd
;; ✅ CORRECT: Embed-only native reply
$title[Server Rules]
$description[Respect other members.]
$color[#5865F2]
```

```bdfd
;; ❌ INCORRECT: Unnecessary and risks double sending or acknowledgment conflicts
Hello $username!
$sendMessage[Hello $username!]
```

3. **Ephemeral Visibility:**
   - To make an interaction reply private (visible only to the user who triggered it), simply add the `$ephemeral` flag in BDFD:
   ```bdfd
   $ephemeral
   This message is only visible to you.
   ```
   - In Blocks, set `"ephemeral": true` on the `respondWithMessage` action.

4. **Interaction Reply vs Channel Send:**
   - **Replying to the interaction**: Use raw text / `$ephemeral` in BDFD, or `respondWithMessage` in Blocks.
   - **Sending a message in another channel**: Use `$channelSendMessage[channelID;content]` in BDFD, or `sendMessage` with `channelId` in Blocks.
   - Autonomous background workflows (e.g. timers, webhooks) have no active interaction: they must always target an explicit channel via `sendMessage`.

---

## 2. Variables & State Management (No `$let`!)

> [!CAUTION]
> **Phantom syntax `$let`:** The `$let` bracket syntax **DOES NOT EXIST** in the Bot Creator engine. Any attempt to use it triggers an immediate diagnostic error at compile time.

Bot Creator distinguishes two types of variables:

### A. Temporary Execution Variables (`$var`)
Scoped exclusively to the current command invocation. Lost when the command finishes.

- **Write (BDScript):** `$var[name;value]`
- **Read (BDScript):** `$var[name]`
- **Blocks:** Action `setTemporaryVariable` (`name`, `value`).

```bdfd
$var[userCount;$membersCount]
$var[greeting;Welcome]

$var[greeting] to all our $var[userCount] members!
```

### B. Persistent Database Variables (`$setVar` / Scoped Storage)
Saved in the bot's cloud or SQLite database across restarts and server reloads.

- **Global Variables:**
  - BDScript: `$setVar[key;value]` / `$getVar[key]`
  - Blocks: `setGlobalVariable` / `getGlobalVariable`
- **User-Scoped Variables:**
  - BDScript: `$setUserVar[key;value]` / `$getUserVar[key]`
  - Blocks: `setScopedVariable` (`scope: user`) / `getScopedVariable`
- **Guild-Scoped Variables (Server):**
  - BDScript: `$setServerVar[key;value]` (or `$setGuildVar`) / `$getServerVar[key]`
  - Blocks: `setScopedVariable` (`scope: guild`) / `getScopedVariable`
- **Member-Scoped Variables (Guild + User):**
  - BDScript: `$setMemberVar[key;value]` / `$getMemberVar[key]`
- **Channel-Scoped Variables:**
  - BDScript: `$setChannelVar[key;value]` / `$getChannelVar[key]`

---

## 3. Slash Command Options

In Bot Creator, options passed to a slash command (`/ban @user reason:spam`) are injected directly into the runtime environment:

- **Textual / Raw Value:** `((opts.<option_name>))` (e.g. `((opts.reason))`)
- **Snowflake ID (User, Channel, Role):** `((opts.<option_name>.id))` (e.g. `((opts.target.id))`)
- **Positional Fallback:** `((arg.1))`, `((arg.2))`

> [!NOTE]
> Do not look for a `$slashOption[...]` function. Options are accessed natively via `((opts.name))` placeholders in both BDFD and Blocks.

---

## 4. Discord Ticket System

Do not rely on incomplete legacy functions `$newTicket` and `$closeTicket`. To build a robust ticket system in production:
1. Create a private category closed to `@everyone`.
2. Use `createChannel` (with `categoryId`) to create the channel.
3. Configure permissions with `editChannelPermissions` (`allow: 68608` for the member).
4. Send the welcome message with a close button (`customId: close_ticket`).
5. Close and delete the channel with `removeChannel`.

Read the full walkthrough: **[Complete Ticket System Guide](/docs/tickets/)**.

---

## 5. Golden Rules for Language Models (LLMs / MCP)

1. **Strict Separation:** Never mix Blocks JSON with BDFD syntax. A `sendMessage` block takes a JSON payload `{ "content": "..." }`, not a string `$sendMessage[...]`.
2. **Zero Invented Functions:** Never document or suggest non-existent functions such as `$let`, `$sendResponse`, `$respondWithMessage`, or `$slashOption`.
3. **Respect `incomplete` Status:** Always alert users to the limitations of functions marked incomplete (`$newTicket`, `$closeTicket`).
4. **Clean Acknowledgment:** In slash commands, always prefer native or ephemeral (`$ephemeral`) replies without doubling up with a `$sendMessage`.
