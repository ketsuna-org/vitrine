---
layout: doc
title: $nodeVersion
translation_key: docs
category: "Entity Info"
function_name: nodeVersion
syntax: $nodeVersion
description: Returns the Node.js runtime version on which the bot is running.
---

# $nodeVersion

The function `$nodeVersion` **returns the current Node.js runtime version** on which the BDFD bot is running.

## Syntax

```
$nodeVersion
```

## Parameters

None.

## Return Value

- **Type** : String
- The Node.js version (e.g. `v18.15.0`, `v20.10.0`).

## Behavior

- Returns the full version prefixed with `v`.
- The version is determined by the BDFD infrastructure (cannot be modified).
- Useful for debugging and checking feature compatibility.

## Examples

### Feature Compatibility Check

```bdfd
$var[version;$nodeVersion]
$var[major;$textSplit[$var[version];v]]
$var[major;$textSplit[$var[major];.;1]]

$if[$var[major]>=18]
  $sendMessage[✅ Your runtime supports the latest features.]
$else
  $sendMessage[⚠️ Outdated runtime. Some features may be limited.]
$endif
```

### Technical Info

```bdfd
$title[🛠️ Technical Environment]
$description[
**Bot :** $botName
**Node :** $botNode
**Runtime :** $nodeVersion
**Language :** $scriptLanguage
**Commands :** $commandsCount
]
$footer[BDFD Infrastructure]
$sendMessage[]
```

### Startup Log

```bdfd
$log[🚀 $botName started | Node: $botNode | Runtime: $nodeVersion | Lang: $scriptLanguage]
```

## Notes

- Read-only version managed by BDFD.
- Automatically updated by the BDFD infrastructure.
- For information on the bot node, use `$botNode`.
- For the script language, use `$scriptLanguage`.
