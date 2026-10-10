---
layout: doc
title: $nodeVersion
translation_key: docs
category: "Entity Info"
function_name: nodeVersion
syntax: $nodeVersion
description: Returns the version string supplied by the host in bot.nodeVersion, or v20.0.0 when the host supplies none.
---

# $nodeVersion

The function `$nodeVersion` returns the value of the `bot.nodeVersion` context variable supplied by the host. The engine itself does not detect any Node.js version.

## Syntax

```
$nodeVersion
```

## Parameters

None.

## Return Value

- **Type** : String
- The text of the `bot.nodeVersion` context variable as supplied by the host.
- `v20.0.0` if the host supplied none.

## Behavior

- The value is returned unchanged. Because of the default, the function never returns an empty string and does not prove which runtime executes the command.

## Examples

### Feature Compatibility Check

```bdfd
$textSplit[$nodeVersion;.]
$var[major;$replaceText[$splitText[1];v;]]

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
```

### Startup Log

```bdfd
$log[🚀 $botName started | Node: $botNode | Runtime: $nodeVersion | Lang: $scriptLanguage]
```

## Notes

- `$nodeVersion` takes no argument.
- For the script language, use `$scriptLanguage`.
