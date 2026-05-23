---
title: "Modular Commands: `$callWorkflow` & `$workflowResponse` in BDFD"
description: $callWorkflow / $workflowResponse are functions only available on Bot-Creator !
category: Arguments & Conditions
function_syntax: $callWorkflow
date: 2026-05-23T02:46:00.000+02:00
author: Garder500
translation_key: workflow
locale: en
content_language: en
layout: post
toc: true
---
In Bot Creator, **Workflows** are reusable sub-commands or logic packages. Think of a workflow as a custom helper function: you build it once, and you can trigger it from any command in your bot.

Using workflows allows you to:
* Avoid repeating the same code in multiple commands (e.g., player level check, inventory saving).
* Run a background check and easily get the result back.
* Keep your main command scripts clean, short, and easy to read.

To work with workflows, you use two functions: **`$callWorkflow`** to run the workflow, and **`$workflowResponse`** to read the results it returns.

---

## 1. Running a Workflow: `$callWorkflow`

The `$callWorkflow` function starts a workflow and lets you pass variables into it so it knows what to process.

### How to Write It
```bdfd
$callWorkflow[Workflow Name; arguments...]
```

* **`Workflow Name`**: The exact name of the workflow you created in your bot project.
* **`arguments`**: Optional information you want to send to the workflow. You can send this information in three ways:
  1. **Numbered values (Positional)**: Just write the values separated by semicolons.
     * *Example:* `$callWorkflow[giveItem;Alice;Sword]` (sends `"Alice"` as parameter `1` and `"Sword"` as parameter `2`).
  2. **Named values (Key-Value)**: Give your variables explicit names using an equals sign.
     * *Example:* `$callWorkflow[giveItem;user=Alice;item=Sword]` (sends the variable `user` as `"Alice"` and `item` as `"Sword"`).
  3. **Mixed**: A combination of both.
     * *Example:* `$callWorkflow[giveItem;Alice;item=Sword]` (sends `"Alice"` as parameter `1` and `item` as `"Sword"`).

### Pro Tip: Dynamic Inputs
You can use other BDFD functions inside the arguments. BDFD will calculate them first, then send the final text to the workflow!
* *Example:* `$callWorkflow[verifyUser;$toUpperCase[$username]]`

---

## 2. Getting Results Back: `$workflowResponse`

Once a workflow finishes its tasks, it can return results back to your main command. You use `$workflowResponse` to retrieve this information.

### How to Write It
* **`$workflowResponse`** (No arguments): Returns the general status of the workflow (e.g. `WORKFLOW_OK`).
* **`$workflowResponse[propertyName]`**: Fetches a specific item returned by the workflow (like `status`, `new_balance`, or `error`).

### Important Rules for Using Responses
> [!IMPORTANT]
> **Use in Order**
> You **must** put `$callWorkflow` in your command *before* you try to read `$workflowResponse`. If you try to use `$workflowResponse` without calling a workflow first, BDFD will show a compilation error:
> ❌ *"$workflowResponse requires a preceding $callWorkflow in the same BDFD script."*

> [!TIP]
> **Multiple Workflow Calls**
> If you call more than one workflow in the same command, `$workflowResponse` will always give you the results of the **most recent** workflow you ran.

---

## 🛑 Safety Limit: No Infinite Loops (Recursion)

To protect your bot from lag or crashing, BDFD stops workflows from calling themselves:
* **No Recursion**: A workflow named `LevelUp` cannot call the `LevelUp` workflow. 
* If a workflow detects that it has been called recursively, it will stop immediately and report an error.

---

## 📝 Practical Examples

### Example A: Verification Workflow (Positional Arguments)
Imagine you have a workflow named `checkVerification` that verifies players and returns their verification `status` and `member_role`.

**Your Command Script:**
```bdfd
$nomention
$callWorkflow[checkVerification;$authorID]

$if[$workflowResponse[status]==VERIFIED]
  ✅ Success! You have been verified. 
  Your role ID is: **$workflowResponse[member_role]**
$else
  ❌ Verification failed. Please try linking your account again.
$endif
```

### Example B: In-Game Store Purchase (Named Arguments)
Imagine you have a workflow named `buyItem` that processes store transactions. It expects the parameters `item` and `price`.

**Your Command Script:**
```bdfd
$nomention
$callWorkflow[buyItem;item=LegendaryShield;price=850]

🛡️ **Shop Transaction Report**
* Status: **$workflowResponse[status]**
* New Balance: **$workflowResponse[new_balance]** gold coins.
* Transaction ID: `$workflowResponse[transaction_id]`
```

**What your bot will send (If successful):**
```text
🛡️ Shop Transaction Report
* Status: SUCCESS
* New Balance: 150 gold coins.
* Transaction ID: TXN-492048B
```
