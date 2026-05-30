---
title: "Advanced User Targeting and Mentions in BDFD"
description: Learn how to dynamically parse mentioned users, IDs, or search queries and implement robust fallbacks in Bot Designer for Discord.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-targeting-guide
locale: en
content_language: en
layout: post
category: User
toc: true
function_syntax: $findUser[query;fallbackToAuthor]
---

One of the most critical aspects of interactive Discord commands is identifying *who* the command should target. When a user runs `!avatar @username`, `!avatar 123456789012345678`, or simply `!avatar`, your bot should process each of these inputs gracefully.

In this guide, we will explore advanced user targeting techniques in Bot Designer for Discord (BDFD) / Bot Creator using `$mentioned`, `$findUser`, and `$authorID`.

---

## 🔍 Targeting Functions Overview

BDFD offers several distinct functions to retrieve user IDs from command arguments. Choosing the correct function will dictate how flexible your command is:

| Function | What it does | Best Used For |
| :--- | :--- | :--- |
| **`$authorID`** | Instantly retrieves the ID of the command initiator. | Command context fallbacks, setting defaults. |
| **`$mentioned[index]`** | Retrieves the ID of the user directly **pinged** in the command. | Strict, mention-only commands. |
| **`$findUser[query;fallback]`** | Searches globally by raw text (IDs, usernames, or pings) and returns an ID. | Flexible commands and moderation tools (`!warn`, `!ban`, `!kick`). |

---

## 1. Strict Mention Checking (`$mentioned`)

If you want a command that *only* triggers when a user is explicitly highlighted using Discord pings, use `$mentioned`:

```bdfd
$mentioned[index;returnAuthorIfEmpty]
```
* **`index`**: The order of the mention (e.g., `1` for the first ping, `2` for the second).
* **`returnAuthorIfEmpty`**: (Optional) If set to `yes`, returns the initiator's ID if no pings are present.

### Code Example: Strict Mentions
```bdfd
$nomention
$if[$mentioned[1]==]
  ❌ You must ping a user to execute this action! Example: `!slap @user`
$else
  💥 $username slapped $username[$mentioned[1]]! That's gotta hurt!
$endif
```

---

## 2. Advanced Global User Lookup (`$findUser`)

The `$findUser` function is the gold standard for commands requiring extreme user flexibility. It intelligently parses a string argument and attempts to find a matching user anywhere on Discord:

```bdfd
$findUser[query;fallbackToAuthor]
```
* **`query`**: The string input to search. Usually maps to `$message` or an argument like `$noMentionMessage`.
* **`fallbackToAuthor`**: (Optional, `yes` or `no`). If `yes`, the function returns `$authorID` when the query matches nothing or is blank.

### Code Example: Avatar Command
Let's build a beautiful avatar viewer command that handles mentions, raw Snowflake IDs, usernames, or defaults to the caller:

```bdfd
$nomention
$var[targetID;$findUser[$message;yes]]

$title[🖼️ Avatar of $username[$var[targetID]]]
$color[#3b82f6]
$image[$userAvatar[$var[targetID]]]
$footer[Requested by $username; $authorAvatar]
$addTimestamp
```

---

## 3. Robust Lookup for Moderation (`$findUser`)

For moderation commands, `$findUser` is essential to target a member securely and flexibly:

### Code Example: Kick Command
```bdfd
$nomention
$onlyPerms[kickmembers;❌ You need the `Kick Members` permission to run this!]

$var[targetID;$findUser[$message;no]]

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
When passing command arguments into search queries, use `$noMentionMessage` to strip out explicit pings. This prevents double-resolution issues when pings are parsed as raw arguments.

### B. Clean Username Fallbacks
When printing usernames of resolved targets, always use `$username[userID]` or `$displayName[userID]` to ensure your output looks clean and professional, rather than showing raw Snowflake numbers.
