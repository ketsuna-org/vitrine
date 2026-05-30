---
title: "Mastering Persistent Database Variables in BDFD"
description: Learn how to declare, set, and retrieve persistent database values for users and servers to build custom economies, leveling systems, and profiles.
date: 2026-05-30T15:35:00.000+02:00
author: Garder500
translation_key: bdfd-db-guide
locale: en
content_language: en
layout: post
category: User
toc: true
function_syntax: $getUserVar[varName;userID]
---

To build engaging Discord bots, you need a way to store data across restarts. Whether it's tracking coins in an economy system, experience points (XP) for leveling, or custom user descriptions, persistent storage is a core requirement.

Bot Designer for Discord (BDFD) / Bot Creator solves this natively with its built-in database variables. In this guide, we will cover how to declare variables, read and write values for users or servers, and build a fully functional profile command.

---

## 🗄️ Understanding Variable Scopes

Before writing code, it's vital to choose the correct scope. BDFD variables can be scoped differently depending on whose data you are tracking:

| Scope | Function Pair | Target Type | Use Case |
| :--- | :--- | :--- | :--- |
| **User Scope** | `$getUserVar` / `$setUserVar` | A specific user **globally** or **per server**. | Economy balances, leveling XP, custom titles. |
| **Server / Guild Scope** | `$getVar` / `$setVar` | The current Discord Server (Guild) context. | Custom server prefixes, logging channels, server settings. |

---

## 1. Setting Up Variables in the Panel

Before calling any database variable in your BDFD scripts, **you must first register the variable in the Bot Creator / BDFD web panel**:

1. Open your bot dashboard.
2. Navigate to **Variables** (often in the sidebar or under Settings).
3. Click **Create Variable**.
4. Set the **Name** (e.g., `money`, `level`, `xp`, `prefix`).
5. Set the **Default Value** (e.g., `0` for numbers, or `none` for text).
6. Click **Save**.

> [!WARNING]
> Calling a variable in your code that hasn't been registered in the panel will cause compilation errors or return an empty string.

---

## 2. Managing User Variables (`$getUserVar` / `$setUserVar`)

### Writing Data (`$setUserVar`)
Saves a value to the database linked to a specific user.

```bdfd
$setUserVar[variableName;newValue;userID]
```
* **`variableName`**: The exact registered name of the variable.
* **`newValue`**: The string or number to store.
* **`userID`**: (Optional) The target user. Defaults to `$authorID` if omitted.

### Reading Data (`$getUserVar`)
Retrieves the saved value from the database.

```bdfd
$getUserVar[variableName;userID]
```
* **`variableName`**: The exact registered name of the variable.
* **`userID`**: (Optional) The target user. Defaults to `$authorID` if omitted.

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
* **New Balance**: `$$var[newMoney]` coins
]
$addTimestamp
```

---

## 4. Managing Guild Settings (`$getVar` / `$setVar`)

To configure server-wide preferences (like custom command prefixes), use server scope:

### Command: `!setprefix`
* **Prerequisite**: A registered variable named `prefix` with a default value of `!`.

```bdfd
$nomention
$onlyPerms[administrator;❌ Only administrators can change the prefix on this server!]

$if[$message==]
  ❌ Please specify a prefix. Example: `!setprefix ?`
$else
  $setVar[prefix;$message]
  $title[⚙️ Prefix Updated!]
  $color[#3b82f6]
  $description[The command prefix for this server has been changed to: **`$message`**]
$endif
```

---

## 🛠️ Advanced Best Practices

### A. Performing Math on Variables
To add or subtract, always retrieve the variable first, compute it inside `$calculate`, and write it back:
```bdfd
$setUserVar[xp;$calculate[$getUserVar[xp] + 25]]
```

### B. Safe String Validation
If a text variable is blank or has its default value, validate it before displaying:
```bdfd
$if[$getUserVar[bio]==none]
  This user has not set a bio yet! Use `!setbio` to update it.
$else
  $getUserVar[bio]
$endif
```

### C. Server-Scoped User Variables
By default, `$getUserVar` stores the value globally across all servers. If you want **server-specific** profiles (e.g., leveling system unique to each server), append the `$guildID` to the variable's key internally or configure its settings if your platform features localized scopes.
