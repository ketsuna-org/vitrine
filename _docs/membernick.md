---
layout: doc
title: $memberNick
translation_key: docs
category: "Entity Info"
function_name: memberNick
syntax: $memberNick
description: Returns the pseudo (surnom) of the member on the server. Équivaslow to $nickname.
---

# $memberNick

The variable `$memberNick` retourne le **pseudo (surnom)** of the member on the server current. Elle est équivaslowe to `$nickname`.

## Syntax

```
$memberNick
```

## Return Value

- **Type** : String of becauseactères
- Le pseudo server of the member if set, otherwise une **string vide**

## Behavior

- `$memberNick` ne prend **no argument**.
- Functionnellement identical to `$nickname`.
- Returns aiquement le pseudo **specific to the server**.

## Examples

### Message with pseudo

```bdfd
$if[$memberNick!=]
  $sendMessage[Bonday $memberNick !]
$else
  $sendMessage[Bonday $userName !]
$endif
```

### Embed member

```bdfd
$title[Informations member]
$author[$memberNick;$userAvatar]
$description[
**ID :** $memberID
**Permissions :** $memberPerms
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$memberNick` and `$nickname` sont interchangeables.
- Pour l'affichage général, `$displayName` est recommended because il ne retourne never une string vide.
