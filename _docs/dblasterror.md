---
layout: doc
title: $dbLastError
translation_key: docs
category: "Database"
function_name: dbLastError
syntax: $dbLastError
description: Gives the typed error of the last `$db*` call: conflict, quota, not_found, needs_index or timeout. Empty when it worked. Not in BDFD.
---

# $dbLastError

A `$db*` call that fails for a reason the script can handle (a balance guard, a full quota, a document that already exists) does **not** stop the run: it returns an empty text and `$dbLastError` tells why. Test it right after the call.

| Code | Meaning |
|---|---|
| `conflict` | The document exists (`$dbCreate`), the revision changed, or a `min`/`max` guard refused the change. |
| `quota` | A limit of the plan was reached (documents, storage, collections, document size). Nothing was written. |
| `needs_index` | The collection is too large to search without an index on that field. |
| `timeout` | The query took too long. |

A mistake in the script itself (invalid JSON, unknown operator, bad collection name) is an error, like any other function.

## Syntax

```
$dbLastError
```

## Return value

- The code of the last error, or an empty text.

## Examples

### Refuse a purchase that cannot be paid

```bdfd
$dbIncrement[wallet;$authorID;cash;-50;0]
$if[$dbLastError==conflict]
  Not enough cash.
$else
  Bought!
$endif
```
