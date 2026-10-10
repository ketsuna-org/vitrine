---
layout: doc
title: $botNode
translation_key: docs
category: "Entity Info"
function_name: botNode
syntax: $botNode
description: Returns the node identifier supplied by the host in the context (`bot.node`), or `1` when none is supplied.
---

# $botNode

The `$botNode` function returns the node identifier that the host provides to the command in the context variable `bot.node`.

## Syntax

```
$botNode
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- The value of `bot.node`.
- If the context does not provide it, the text `1`. The engine itself does not set this variable, so it is normally `1`.

## Behavior

- No request is made to Discord: the value only comes from the context.

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
```

### Debug command (owner only)

```bdfd
$if[$authorID!=$botOwnerID]
  $ephemeral
  ❌ Reserved for the owner.
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
]
```

### Message signature

```bdfd
$sendMessage[Message processed by $botName]
$footer[Node: $botNode | $nodeVersion]
```

## Notes

- For the version of the runtime, use `$nodeVersion`.
- For the script language, use `$scriptLanguage`.
