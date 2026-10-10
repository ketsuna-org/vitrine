---
title: "Mastering Persistent Database Variables in BDFD"
description: Learn how to declare, set, and retrieve persistent database values for users and servers to build custom economies, leveling systems, and profiles.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-db-guide
locale: en
content_language: en
layout: post
category: "Advanced Topics"
toc: true
function_syntax: $getUserVar[varName;(userID);(guildID)]
---

To build engaging Discord bots, you need a way to store data across restarts. Whether it's tracking coins in an economy system, experience points (XP) for leveling, or custom user descriptions, persistent storage is a core requirement.

Bot Designer for Discord (BDFD) / Bot Creator solves this natively with its built-in database variables. In this guide, we will cover how to declare variables, read and write values for users or servers, and build a fully functional profile command.

---

## 🗄️ Understanding Variable Scopes

Before writing code, it's vital to choose the correct scope. BDFD variables can be scoped differently depending on whose data you are tracking:

| Scope | Function Pair | Target Type | Use Case |
| :--- | :--- | :--- | :--- |
| **User Scope** | `$getUserVar` / `$setUserVar` | A specific user, **globally** or **per server** (see section C). | Economy balances, leveling XP, custom titles. |
| **Server / Guild Scope** | `$getServerVar` / `$setServerVar` | The current Discord Server (Guild). | Server settings, logging channels, welcome messages. |
| **Global Scope** | `$getVar` / `$setVar` | One value shared by the whole bot (all servers and users). | Bot-wide counters or configuration. |

`$getVar` and `$setVar` also accept a user ID as their last argument, in which case they behave like a user variable. Channel and message scopes exist too (`$getChannelVar` / `$setChannelVar`, `$getMessageVar` / `$setMessageVar`).

---

## 1. Setting Up Variables in the Panel

Before calling any database variable in your BDFD scripts, **register the variable in the Bot Creator / BDFD web panel** (strongly recommended, see the warning below):

1. Open your bot dashboard.
2. Navigate to **Variables** (often in the sidebar or under Settings).
3. Click **Create Variable**.
4. Set the **Name** (e.g., `money`, `level`, `xp`, `prefix`).
5. Set the **Default Value** (e.g., `0` for numbers, or `none` for text).
6. Click **Save**.

> [!WARNING]
> A variable that hasn't been registered is not a compile error: reading it returns an empty text. But the first value you write with `$setUserVar` / `$setServerVar` is then saved as the variable's default, so every other user or server that has no value of its own would read that first value too. Registering the variable with the right default value first avoids this.

---

## 2. Managing User Variables (`$getUserVar` / `$setUserVar`)

### Writing Data (`$setUserVar`)
Saves a value to the database linked to a specific user.

```bdfd
$setUserVar[variableName;newValue;(userID);(guildID)]
```
* **`variableName`**: The registered name of the variable.
* **`newValue`**: The string or number to store.
* **`userID`**: (Optional) The target user. Defaults to `$authorID` if omitted.
* **`guildID`**: (Optional) The server the value belongs to. See section C.

### Reading Data (`$getUserVar`)
Retrieves the saved value from the database.

```bdfd
$getUserVar[variableName;(userID);(guildID)]
```
* **`variableName`**: The registered name of the variable.
* **`userID`**: (Optional) The target user. Defaults to `$authorID` if omitted.
* **`guildID`**: (Optional) The server the value belongs to. See section C.

---

## 3. Building an Economy: A Concrete Example

Let's build a classic `!daily` reward command that adds `500` coins to a user's balance:

### Command: `!daily`
* **Prerequisite**: A registered variable named `money` with a default value of `0`.

```bdfd
$cooldown[24h;⏱️ You can only claim your daily rewards once every 24 hours! Come back in %time%.]

$var[currentMoney;$getUserVar[money]]
$var[newMoney;$calculate[$var[currentMoney] + 500]]

$setUserVar[money;$var[newMoney]]

$title[💰 Daily Reward Claimed!]
$color[#10b981]
$description[
Greetings $username! You have claimed your daily allowance of **500 coins**!
* **Old Balance**: `$var[currentMoney]` coins
* **New Balance**: `$var[newMoney]` coins
]
$addTimestamp
```

---

## 4. Managing Guild Settings (`$getServerVar` / `$setServerVar`)

To configure server-wide preferences, use server scope. `$setServerVar[name;value;(serverID)]` and `$getServerVar[name;(serverID)]` default to the current server:

### Command: `!setprefix`
* **Prerequisite**: A registered variable named `prefix` with a default value of `!`.
* **Note**: this only stores a value that your own scripts can read back with `$getServerVar[prefix]`. The prefix the bot uses to recognise commands comes from the bot's settings, not from this variable.

```bdfd
$nomention
$onlyPerms[administrator;❌ Only administrators can change the prefix on this server!]

$if[$message==]
  ❌ Please specify a prefix. Example: `!setprefix ?`
$else
  $setServerVar[prefix;$message]
  $title[⚙️ Prefix Updated!]
  $color[#3b82f6]
  $description[The command prefix for this server has been changed to: **`$message`**]
$endif
```

---

## 🛠️ Advanced Best Practices

### A. Performing Math on Variables
To add or subtract, retrieve the variable first, compute it inside `$calculate`, and write it back:
```bdfd
$setUserVar[xp;$calculate[$getUserVar[xp] + 25]]
```

### B. Safe String Validation
If a text variable still has its default value (here `none`, set in the panel), validate it before displaying:
```bdfd
$if[$getUserVar[bio]==none]
  This user has not set a bio yet! Use `!setbio` to update it.
$else
  $getUserVar[bio]
$endif
```

### C. Server-Scoped User Variables
Whether `$getUserVar` and `$setUserVar` share one value for a user across all servers or keep one value per server depends on the bot's user variable setting: with the legacy setting a user variable is global unless you pass a guild ID, while with the newer setting it is always stored per server and member. To make it explicit (and safe in both cases), pass the server as the last argument:
```bdfd
$setUserVar[xp;$calculate[$getUserVar[xp;$authorID;$guildID] + 25];$authorID;$guildID]
```
Here the value is isolated per user and per server. The same `$guildID` must be used for every read and write of that variable.
