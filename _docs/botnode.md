---
layout: doc
title: $botNode
translation_key: docs
category: "Entity Info"
function_name: botNode
syntax: $botNode
description: Returns the identifier of the node (runner) on which the bot is executed.
---

# $botNode

The `$botNode` function **returns the identifier of the node (runner)** on which the BDFD bot is currently running. Each bot is assigned to a specific runner of the BDFD infrastructure.

## Syntax

```
$botNode
```

## Parameters

None.

## Return value

- **Type**: String
- The identifier of the node (e.g., `node-14`, `us-east-3`).

## Behavior

- The node is assigned automatically by BDFD.
- It can change during a migration or maintenance.
- Useful for diagnostics and technical support.

## Examples

### Technical Information Page

```bdfd
$title[🔧 Technical Information]
$addField[🤖 Bot;$botName;yes]
$addField[🆔 ID;$botID;yes]
$addField[📦 Node;$botNode;yes]
$addField[⚡ Runtime;$nodeVersion;yes]
$addField[📝 Language;$scriptLanguage;yes]
$footer[Hosting expires: $hostingExpireTime]
$color[#5865F2]
$sendMessage[]
```

### Debug command (owner only)

```bdfd
$if[$authorID!=$botOwnerID]
  $sendEphemeral[❌ Reserved for the owner.]
  $stop
$endif

$title[🛠️ Debug Bot]
$description[
**Name:** $botName
**ID:** $botID
**Node:** $botNode
**Runtime:** $nodeVersion
**Language:** $scriptLanguage
**Commands:** $commandsCount
**CPU:** $cpu
**RAM:** $ram
]
$sendMessage[]
```

### Message signature

```bdfd
$sendMessage[Message processed by $botName]
$footer[Node: $botNode | $nodeVersion]
```

## Notes

- The node is managed automatically by BDFD.
- In case of performance issues, provide your `$botNode` to BDFD support.
- For the version of the runtime, use `$nodeVersion`.
- For the script language, use `$scriptLanguage`.
