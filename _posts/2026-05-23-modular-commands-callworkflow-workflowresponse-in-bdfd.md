---
title: "Modular Commands: `$callWorkflow` & `$workflowResponse` in BDFD"
description: $callWorkflow / $workflowResponse are functions only available on Bot-Creator !
category: "Building Commands"
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

* **`Workflow Name`**: The name of the workflow you created in your bot project. It must not be empty, and an unknown name is an error ("Workflow not found").
* **`arguments`**: Optional information you want to send to the workflow. You can send this information in three ways:
  1. **Numbered values (Positional)**: Just write the values separated by semicolons.
     * *Example:* `$callWorkflow[giveItem;Alice;Sword]` (sends `"Alice"` as parameter `1` and `"Sword"` as parameter `2`).
  2. **Named values (Key-Value)**: Give your variables explicit names using an equals sign.
     * *Example:* `$callWorkflow[giveItem;user=Alice;item=Sword]` (sends the variable `user` as `"Alice"` and `item` as `"Sword"`).
  3. **Mixed**: A combination of both.
     * *Example:* `$callWorkflow[giveItem;Alice;item=Sword]` (sends `"Alice"` as parameter `1` and `item` as `"Sword"`).

  A name is only recognised when `name=` is written literally at the start of the argument; a value that merely contains `=` (for example the result of another function) stays a positional argument. The arguments are then checked against the argument definitions of the called workflow, and a missing required argument is an error. `$callWorkflow` itself returns nothing (an empty text).

### Pro Tip: Dynamic Inputs
You can use other BDFD functions inside the arguments. BDFD will calculate them first, then send the final text to the workflow!
* *Example:* `$callWorkflow[verifyUser;$toUpperCase[$userName]]`

---

## 2. Getting Results Back: `$workflowResponse`

Once a workflow finishes its tasks, it can return results back to your main command. You use `$workflowResponse` to retrieve this information.

### How to Write It
* **`$workflowResponse`** (No arguments): Returns the status of the last call, `WORKFLOW_OK:` followed by the entry point of the workflow (for example `WORKFLOW_OK:main`).
* **`$workflowResponse[propertyName]`**: Fetches one named result of the last call. For a workflow written as a BDFD script, `output` is the text the script produced and `script` is `BDFD_OK`. Any other name returns an empty text if the workflow did not produce it. The other results available depend on what the workflow itself produces.

### Important Rules for Using Responses
> [!IMPORTANT]
> **Use in Order**
> Put `$callWorkflow` in your command *before* you read `$workflowResponse`. If no workflow has been called yet, `$workflowResponse` simply returns an empty text (it is not an error).

> [!TIP]
> **Multiple Workflow Calls**
> If you call more than one workflow in the same command, `$workflowResponse` will always give you the results of the **most recent** workflow you ran (the results of the previous call are discarded).

---

## 🛑 Safety Limit: No Infinite Loops (Recursion)

To protect your bot from lag or crashing, BDFD stops workflows from calling themselves:
* **No Recursion**: A workflow named `LevelUp` cannot call the `LevelUp` workflow while it is already running (the same name and entry point). 
* If a workflow is called recursively, the command stops immediately with the error "Workflow recursion detected".
* Nested calls are also limited in depth ("Workflow nesting limit exceeded").
* A called BDFD script workflow must use the `native-v1` backend.

---

## 📝 Practical Examples

### Example A: Verification Workflow (Positional Arguments)
Imagine you have a BDFD script workflow named `checkVerification` that verifies players and whose script writes `VERIFIED` when the check succeeds. Its text is available as `$workflowResponse[output]`.

**Your Command Script:**
```bdfd
$nomention
$callWorkflow[checkVerification;$authorID]

$if[$workflowResponse[output]==VERIFIED]
  ✅ Success! You have been verified.
$else
  ❌ Verification failed. Please try linking your account again.
$endif
```

### Example B: In-Game Store Purchase (Named Arguments)
Imagine you have a BDFD script workflow named `buyItem` that processes store transactions and expects the parameters `item` and `price`. Its script writes a one-line report, which you read with `$workflowResponse[output]`.

**Your Command Script:**
```bdfd
$nomention
$callWorkflow[buyItem;item=LegendaryShield;price=850]

🛡️ **Shop Transaction Report**
$workflowResponse[output]
```

**What your bot will send (If the workflow wrote `SUCCESS: 150 gold coins left`):**
```text
🛡️ Shop Transaction Report
SUCCESS: 150 gold coins left
```
