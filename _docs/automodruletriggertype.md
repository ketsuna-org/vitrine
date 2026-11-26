---
layout: doc
title: $automodRuleTriggerType[]
translation_key: docs
category: "Events"
function_name: automodRuleTriggerType
syntax: $automodRuleTriggerType
description: "Trigger type of the rule (Keyword, Spam, KeywordPreset, MentionSpam, MemberProfile). (AutoMod events)."
---
# $automodRuleTriggerType — Trigger type of the rule (Keyword, Spam, KeywordPreset, MentionSpam, MemberProfile). (AutoMod events).

## Syntax

```
$automodRuleTriggerType
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$automodRuleTriggerType → result
```

## Example

```bdfd
$sendMessage[$automodRuleTriggerType]
```
