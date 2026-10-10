---
title: "Advanced User Targeting and Mentions in BDFD"
description: Learn how to dynamically parse mentioned users, IDs, or search queries and implement robust fallbacks in Bot Designer for Discord.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-targeting-guide
locale: en
content_language: en
layout: post
category: "Advanced Topics"
toc: true
function_syntax: $findUser[query;(fallbackToAuthor)]
---

One of the most critical aspects of interactive Discord commands is identifying *who* the command should target. When a user runs `!avatar @username`, `!avatar 123456789012345678`, or simply `!avatar`, your bot should process each of these inputs gracefully.

In this guide, we will explore advanced user targeting techniques in Bot Designer for Discord (BDFD) / Bot Creator using `$mentioned`, `$findUser`, and `$authorID`.

---

## 🔍 Targeting Functions Overview

BDFD offers several distinct functions to retrieve user IDs from command arguments. Choosing the correct function will dictate how flexible your command is:

| Function | What it does | Best Used For |
| :--- | :--- | :--- |
| **`$authorID`** | Instantly retrieves the ID of the command initiator. | Command context fallbacks, setting defaults. |
| **`$mentioned[index;(returnAuthorIfEmpty)]`** | Retrieves the ID of the user directly **pinged** in the command. | Strict, mention-only commands. |
| **`$findUser[query;(fallback)]`** | Resolves raw text (a ping, a user ID, or an exact username) to the ID of a member of the current server. | Flexible commands and moderation tools (`!warn`, `!ban`, `!kick`). |

---

## 1. Strict Mention Checking (`$mentioned`)

If you want a command that *only* triggers when a user is explicitly highlighted using Discord pings, use `$mentioned`:

```text
$mentioned[index;(returnAuthorIfEmpty)]
```
* **`index`**: The order of the mention (e.g., `1` for the first ping, `2` for the second). `<` means the first ping and `>` the last one. Anything else (like `0`) is an error. It only works for message commands, not slash commands.
* **`returnAuthorIfEmpty`**: (Optional, `yes` or `no`, also `true`/`false`). **When omitted it behaves like `yes`**: if there is no ping at that index, the initiator's ID is returned. Write `no` to get an empty text instead.

### Code Example: Strict Mentions
```bdfd
$nomention
$if[$mentioned[1;no]==]
  ❌ You must ping a user to execute this action! Example: `!slap @user`
$else
  💥 $username slapped $username[$mentioned[1]]! That's gotta hurt!
$endif
```

---

## 2. Advanced Global User Lookup (`$findUser`)

The `$findUser` function is the gold standard for commands requiring extreme user flexibility. It parses a string argument and tries to find a matching member of the current server:

```text
$findUser[query;(fallbackToAuthor)]
```
* **`query`**: The string input to search. Usually the first word typed after the command, `$message[1]`. The whole `$message` only works when the message contains nothing but the ping, ID or username (extra words make the lookup fail). It is matched, in this order, as a ping (`<@123...>` or `<@!123...>`), as a user ID, and as an **exact** username (case-sensitive, no partial match). A ping or ID only matches if that user is a member of the server; ping lookups never fall back to a username search.
* **`fallbackToAuthor`**: (Optional, `yes`/`no`; also accepts `true`/`false`, `on`/`off`, `enable`/`disable`). **When omitted it behaves like `yes`**: the function returns the initiator's ID when the query matches nothing or is blank. With `no` it returns an empty text instead.

### Code Example: Avatar Command
Let's build a beautiful avatar viewer command that handles mentions, raw Snowflake IDs, usernames, or defaults to the caller:

```bdfd
$nomention
$var[targetID;$findUser[$message[1];yes]]

$title[🖼️ Avatar of $username[$var[targetID]]]
$color[#3b82f6]
$image[$userAvatar[$var[targetID]]]
$footer[Requested by $username]
$footerIcon[$authorAvatar]
$addTimestamp
```

---

## 3. Robust Lookup for Moderation (`$findUser`)

For moderation commands, `$findUser` is essential to target a member securely and flexibly:

### Code Example: Kick Command
```bdfd
$nomention
$onlyPerms[kickmembers;❌ You need the `Kick Members` permission to run this!]

$var[targetID;$findUser[$message[1];no]]

$if[$var[targetID]==]
  ❌ Member not found! Please provide a valid username, mention, or ID.
$else
    $if[$var[targetID]==$authorID]
      ❌ You cannot kick yourself!
    $else
      $kick[$var[targetID]]
      ✅ **$username[$var[targetID]]** has been kicked.
    $endif
$endif
```

---

## 🛠️ Design Best Practices

### A. Always Filter Mentions Out of Messages
`$noMentionMessage` returns the message text with user, role and channel pings (`<@id>`, `<@!id>`, `<@&id>`, `<#id>`) removed. Use it when you want to search by the remaining text only.

### B. Clean Username Fallbacks
When printing usernames of resolved targets, always use `$username[userID]` or `$displayName[userID]` to ensure your output looks clean and professional, rather than showing raw Snowflake numbers.
