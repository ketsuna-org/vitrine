---
title: $for & Loop Structures in BDFD (Bot Designer for Discord)
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
Loops are powerful control-flow structures in BDScript (Bot Designer for Discord) used to repeat a block of code a specific number of times. They are invaluable for rendering dynamic content, generating option lists for select menus, formatting complex datasets, and processing collections.

BDScript supports two main forms of `$for` loops: **Simple Iteration Loops** and **C-Style Loops**. Both are closed using the `$endfor` (or `$endloop`) delimiter.

---

## 📊 Loop Architectures at a Glance

| Feature | Simple Iteration Loop | C-Style Loop |
| :--- | :--- | :--- |
| **Syntax** | `$for[iterations]` | `$for[init; condition; update]` |
| **Control Parameter** | Total execution count | Initialized variables, a logical condition, and update expressions |
| **State Variables** | `$i`, `$loopIndex`, `$loopIteration`, `$loopCount` | Custom loop variables (e.g., `$i`, `$j`), plus standard state variables |
| **Best Used For** | Repeating a static number of times or looping based on list/array sizes | Complex numeric intervals, counting downwards, or multi-variable stepping |

---

## 1. Simple Iteration Loops

The Simple Iteration Loop executes its body a predefined number of times.

### Syntax
```bdfd
$for[iterations]
  // Loop body
$endfor
```

### Parameters
* **`iterations`**: The number of times to run the loop. 
  * Can be a static integer literal (e.g., `5`).
  * Can be a dynamic expression or variable reference (e.g., `$getUserVar[limit]` or `$getVar[count]`).

### State Variables Available Inside the Loop
During each iteration, the engine provides built-in variables that represent the state of the loop:
* **`$i`** / **`$loopIndex`** / **`$loopIteration`**: Returns the current iteration index (**0-based**, i.e. `0`, `1`, `2`, ..., `iterations - 1`).
* **`$loopCount`**: Returns the current iteration number (**1-based**, i.e. `1`, `2`, `3`, ..., `iterations`).

### Code Examples

#### Example A: Simple Repeat
```bdfd
$for[3]
  Hello World! (Iteration #$loopCount)
$endfor
```
**Output:**
```text
Hello World! (Iteration #1)
Hello World! (Iteration #2)
Hello World! (Iteration #3)
```

#### Example B: Formatting List Elements
```bdfd
$title[📋 Server Tasks]
$description[
$for[5]
  • Task $loopCount: [Pending]
$endfor
]
```
**Output:**
```text
• Task 1: [Pending]
• Task 2: [Pending]
• Task 3: [Pending]
• Task 4: [Pending]
• Task 5: [Pending]
```

---

## 2. C-Style Loops

C-Style loops offer complete control over loop initialization, step conditions, and stepping values. They are highly flexible and mimic the syntax of traditional programming languages.

### Syntax
```bdfd
$for[init; condition; update]
  // Loop body
$endfor
```

### Parameters

#### 1. `init` (Initialization)
Declares and initializes one or more temporary loop variables. Multiple variables can be initialized using a comma-separated list.
* *Example:* `i=1`
* *Example (Multi-variable):* `i=1,j=10`

#### 2. `condition` (Stepping Condition)
A logical comparison checked before each iteration. The loop body continues executing as long as this expression evaluates to `true`.
* *Syntax:* `variable operator value`
* *Supported Comparison Operators:*
  * `<` (Less Than)
  * `<=` (Less Than or Equal)
  * `>` (Greater Than)
  * `>=` (Greater Than or Equal)
  * `==` (Equal)
  * `!=` (Not Equal)
* *Example:* `i<=5`

#### 3. `update` (Variable Update)
Determines how the variables change after each iteration. Multiple updates are separated by commas.
* *Supported Stepping Operators:*
  * Increment: `++` (e.g., `i++`)
  * Decrement: `--` (e.g., `i--`)
  * Compound Addition: `+=` (e.g., `i+=2`)
  * Compound Subtraction: `-=` (e.g., `i-=3`)
  * Compound Multiplication: `*=` (e.g., `i*=2`)

### Variable Scoping Inside C-Style Loops
Any variable declared in the `init` block is available inside the loop body as a native BDScript function. 
* E.g., if you write `$for[i=1; i<=3; i++]`, you can retrieve the value of `i` during the loop using **`$i`**.
* If a C-style loop variable has the same name as a default loop state variable (such as `i`), **the C-style variable takes precedence**.
* To access the default 0-based iteration index regardless of custom variable names, use **`$loopIndex`** or **`$loopIteration`**.

### Code Examples

#### Example A: Standard Incrementing Loop
```bdfd
$for[i=2; i<=10; i+=2]
  Number: $i
$endfor
```
**Output:**
```text
Number: 2
Number: 4
Number: 6
Number: 8
Number: 10
```

#### Example B: Decrementing / Countdown Loop
```bdfd
$for[count=5; count>0; count--]
  🚀 T-Minus $count...
$endfor
Blastoff! 🎇
```
**Output:**
```text
🚀 T-Minus 5...
🚀 T-Minus 4...
🚀 T-Minus 3...
🚀 T-Minus 2...
🚀 T-Minus 1...
Blastoff! 🎇
```

---

## ⚙️ Compilation & Execution Semantics (Under the Hood)

The compiler uses a dual-evaluation strategy to maximize performance and maintain safety:

### ⚡ Compile-Time Unrolling
If the loop boundaries are static and known at compilation time (e.g., `$for[5]` or `$for[i=1; i<=3; i++]`), the compiler **unrolls** the loop directly. 
* **Benefit**: The bot runner receives a flat, optimized list of actions without loop control overhead, resulting in instantaneous responses.

### 🔄 Dynamic Runtime Execution
If any loop parameter contains dynamic fields or runtime placeholders (e.g., `$for[$getUserVar[count]]` or `$for[i=1; i<=$var[limit]; i++]`), the compiler transpiles the loop into a dynamic runtime loop action (`BotCreatorActionType.forLoop`).
* **Benefit**: Allows responsive loops that adapt to user settings, database counters, and API payloads in real time.

> [!IMPORTANT]
> **Safety Ceilings (Capping)**
> To prevent infinite loops and denial-of-service errors, the compiler and runner enforce an execution ceiling:
> * **Maximum Iterations**: Loops are capped at **`100` iterations** by default.
> * If a dynamic loop exceeds this boundary, execution halts gracefully at 100, and a compilation warning is logged.

> [!TIP]
> **Scope Preservation**
> The compiler scopes temporary operations (such as `$jsonParse`) performed inside the loop body. This ensures that dynamic modifications do not leak or corrupt variables in the parent script after `$endfor` is reached.

---

## 🛑 Interrupts and Flow Control

Certain BDScript functions immediately affect loop execution when called inside the body:

* **`$stop`**: Instantly terminates the entire script execution, breaking out of the loop and returning all collected responses up to that point.
* **`$cooldown[...]`**: If a cooldown is active, the bot halts script execution immediately, bypassing any remaining iterations, and posts the cooldown message.

---

## 🔗 Related Structure: JSON Iteration (`$jsonForEach`)

For iterating over complex JSON objects and arrays, BDScript features a dedicated `$jsonForEach` loop, which integrates seamlessly with the compiler's loop architecture:

```bdfd
$jsonParse[$var[api_response]]
$jsonForEach[items]
  Index: $jsonIndex
  Key: $jsonKey
  Value: $jsonValue
$endJsonForEach
```

### Context Variables in `$jsonForEach`:
* **`$jsonKey`**: Returns the current object key (or list index).
* **`$jsonValue`**: Returns the stringified value of the current item.
* **`$jsonIndex`**: Returns the 0-based iteration index.
* **`$loopIndex` / `$loopCount`**: Standard loop markers.
