---
layout: doc
title: $authorizingIntegrationOwners[]
translation_key: docs
category: "Interactions"
function_name: authorizingIntegrationOwners
syntax: $authorizingIntegrationOwners[(type)]
description: "Who authorised the interaction: a JSON object (0 = server, 1 = user), or the ID of the server (guild) or of the user."
---
# $authorizingIntegrationOwners — Who authorised the interaction: a JSON object (0 = server, 1 = user), or the ID of the server (guild) or of the user.

## Syntax

```
$authorizingIntegrationOwners[(type)]
```

## Parameters

- **type** *(String, optional)* — guild or user (empty: JSON)

## Return Value

- String.

## Usage

```
$authorizingIntegrationOwners[type] → result
```

## Example

```bdfd
$sendMessage[$authorizingIntegrationOwners[type]]
```
