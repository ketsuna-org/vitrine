---
title: "Loops in BDFD: $for & $loop"
description: Loop (Function only available on Bot-Creator !)
category: Arguments & Conditions
function_syntax: $for[iterations]
date: 2026-05-23T02:30:00.000+02:00
author: Garder500
translation_key: EN
locale: en
content_language: en
layout: post
toc: true
---
A **loop** allows your Discord bot to repeat a block of text or actions multiple times. Instead of copy-pasting the same lines over and over, you can use a loop to do it automatically.

In BDFD, the functions **`$for`** and **`$loop`** are **identical twins**. They work exactly the same way, support the same rules, and can be used completely interchangeably! You can also close either loop with either **`$endfor`** or **`$endloop`**.

Loops are perfect for:
* Printing repeating lists (like leaderboard slots or store items).
* Generating multiple buttons or select options.
* Counting up or down in a message.

---

## 💡 Quick Overview of Loop Types

BDFD supports two types of loops:

| Loop Type | What it does | Best For |
| :--- | :--- | :--- |
| **Simple Loop** | Repeats a set number of times | Repeating a message or list item a specific number of times. |
| **Advanced Loop** | Counts using custom starting points, steps, and rules | Counting down, skipping numbers (like counting even numbers), or tracking custom counters. |

---

## 1. Simple Loops

A Simple Loop runs your code a set number of times.

### How to Write It
You can write a simple loop using either `$for` or `$loop`:

```bdfd
$for[number]
  ... your text or command here ...
$endfor
```
*OR*
```bdfd
$loop[number]
  ... your text or command here ...
$endloop
```

* **`number`**: How many times you want the loop to repeat (e.g., `5`, or a variable like `$getUserVar[hunts]`).

### Useful Shortcut Variables
Inside the loop, you can use these shortcuts to show the current iteration number:
* **`$i`** (or `$loopIndex` / `$loopIteration`): Returns the current step, starting at **`0`** (i.e. `0`, `1`, `2`, `3`...).
* **`$loopCount`**: Returns the current step, starting at **`1`** (i.e. `1`, `2`, `3`, `4`...).

### Practical Examples

#### Example A: Repeating Text (Using `$loop`)
```bdfd
$loop[3]
  Hello! This is message number $loopCount
$endloop
```
**What your bot will send:**
```text
Hello! This is message number 1
Hello! This is message number 2
Hello! This is message number 3
```

#### Example B: Creating a Bulleted List (Using `$for`)
```bdfd
🏆 **Top Server Goals:**
$for[5]
  • Goal #$loopCount: [Pending Slot]
$endfor
```
**What your bot will send:**
```text
🏆 Top Server Goals:
  • Goal #1: [Pending Slot]
  • Goal #2: [Pending Slot]
  • Goal #3: [Pending Slot]
  • Goal #4: [Pending Slot]
  • Goal #5: [Pending Slot]
```

---

## 2. Advanced Loops (C-Style)

Advanced loops give you full control. You can decide where the loop starts, when it should stop, and how it counts.

### How to Write It
Just like simple loops, you can use either `$for` or `$loop` with the three counting settings separated by semicolons:

```bdfd
$for[start; condition; update]
  ... your text or command here ...
$endfor
```
*OR*
```bdfd
$loop[start; condition; update]
  ... your text or command here ...
$endloop
```

### The Three Settings:
1. **`start`**: Create your counter variable and set its starting value.
   * *Example:* `i=1` (creates a counter named `i` starting at 1).
   * *Example (Multi-counter):* `i=1,j=10` (creates two counters).
2. **`condition`**: Tells the loop when to keep going. The loop stops as soon as this is no longer true.
   * *Operators you can use:*
     * `<` (Less than)
     * `<=` (Less than or equal to)
     * `>` (Greater than)
     * `>=` (Greater than or equal to)
     * `==` (Equal to)
     * `!=` (Not equal to)
   * *Example:* `i<=5` (keep going as long as the counter `i` is 5 or less).
3. **`update`**: Tells the loop how to count at the end of each step.
   * *Stepping values you can use:*
     * `i++` (add 1 to `i`)
     * `i--` (subtract 1 from `i`)
     * `i+=2` (add 2 to `i` - useful for skipping numbers)
     * `i-=3` (subtract 3 from `i`)
     * `i*=2` (multiply `i` by 2)

### Accessing your Counter Value
To show the current value of your counter inside the loop, just write its name as a function:
* If you set `i=1`, use **`$i`** to display its value.
* If you set `count=10`, use **`$count`** to display its value.

### Practical Examples

#### Example A: Counting Even Numbers (Using `$loop`)
```bdfd
Counting by twos:
$loop[i=2; i<=10; i+=2]
  - $i
$endloop
```
**What your bot will send:**
```text
Counting by twos:
  - 2
  - 4
  - 6
  - 8
  - 10
```

#### Example B: T-Minus Countdown (Using `$for`)
```bdfd
$for[seconds=5; seconds>0; seconds--]
  🚀 Launching in $seconds...
$endfor
🔥 BLASTOFF! 🎆
```
**What your bot will send:**
```text
🚀 Launching in 5...
🚀 Launching in 4...
🚀 Launching in 3...
🚀 Launching in 2...
🚀 Launching in 1...
🔥 BLASTOFF! 🎆
```

---

## ⚠️ Important Rules & Safety Tips

> [!WARNING]
> **The 100-Loop Limit**
> To prevent your bot from freezing, lagging, or crashing, BDFD restricts loops (both `$for` and `$loop`) to a maximum of **100 repetitions**. If your loop is set to run more than 100 times, it will automatically stop at 100.

> [!TIP]
> **Stopping Loops Early**
> * **`$stop`**: If your bot encounters a `$stop` inside the loop, it will immediately halt the command and send whatever text it has generated so far.
> * **`$cooldown[...]`**: If a user is on cooldown, BDFD will stop the loop immediately and send your custom cooldown message.
