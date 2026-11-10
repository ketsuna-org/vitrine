---
layout: doc
title: $aiError[]
translation_key: docs
category: "AI"
function_name: aiError
syntax: $aiError
description: "Returns the error code of the last AI function call, empty if it worked."
---
# $aiError — Returns the error code of the last AI function call, empty if it worked.

## Syntax

```
$aiError
```

## Parameters

None.

## Return Value

- `ai_unavailable`, `ai_insufficient_tokens`, `ai_consent_required`, `ai_spending_blocked`, `ai_rate_limited`, `ai_provider_failure`, `ai_context_limit` or empty.

## Usage

```
$ai[Hi]$aiError
```

## Important Notes

- Specific to Bot Creator. Use it to show your own message instead of an empty answer.

## Example

```bdfd
$nomention
$ai[Tell me a joke]
$if[$aiError!=]
(The AI is unavailable: $aiError)
$endif
```
