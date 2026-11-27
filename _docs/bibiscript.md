---
layout: doc
title: What is BibiScript?
category: "Meta"
api_type: general
description: BibiScript is the text scripting language of Bot Creator, a native language that mixes BDFD-style functions, ForgeScript-style functions and functions of its own.
permalink: /docs/bibiscript/
locale: en
translation_key: doc-bibiscript
---

# What is BibiScript?

**BibiScript** is the text language you write in Bot Creator when a command or workflow is in *script* mode. A script is plain text with `$functions`: the text is sent as the reply, and each function does something (read a value, send a message, give a role, call the database...).

```
Hello $username! There are $membersCount members here.
$giveRole[$authorID;$findRole[Member]]
```

## Where it comes from

BibiScript is not a copy of another language. It is a language of its own, run by Bot Creator's native interpreter, built from three sources:

| Source | What BibiScript takes from it |
|---|---|
| **BDFD** (Bot Designer For Discord) | The syntax `$function[arg;arg]` and the BDFD function catalog. Most BDFD scripts run unchanged. |
| **ForgeScript** | Functions that exist in ForgeScript and not in BDFD are added natively over time, with the same idea and the same name. |
| **Bot Creator itself** | Functions that exist nowhere else: database (`$db*`), modules, translations (`$t`), voice, canvas, workflows (`$callWorkflow`)... |

Because the three families share one syntax, you can mix them in the same script. There is no "BDFD mode" or "Forge mode" to choose.

## The three ways to write a command

| Mode | Language | Use it when |
|---|---|---|
| **Blocks** | Visual actions and workflows | You prefer to build by clicking. |
| **BibiScript** | Text and `$functions` | You want short, readable scripts. |
| **JavaScript** | `bc.*` API, `async` code | You need loops, data structures or libraries-like logic. |

BibiScript and JavaScript are kept at the same level: what you can do with a function, you can do with the JavaScript API, and the reverse.

## Good to know

- Function names are case-insensitive; temporary variable names are case-sensitive.
- Where Bot Creator behaves differently from BDFD, [Differences with BDFD](/docs/bdfd-differences/) lists it.
- [`$scriptLanguage`](/docs/scriptlanguage/) returns `BibiScript`.
- The whole function list is in the [function reference](/docs/); how a script runs is in [Execution model](/docs/execution-model/).
- You can try a script without a bot in the [playground](/playground/).
