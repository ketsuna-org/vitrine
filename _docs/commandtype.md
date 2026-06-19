---
layout: doc
title: $commandType
translation_key: docs
category: "Entity Info"
function_name: commandType
syntax: $commandType
description: Returns the type of the command in progress (prefix or slash).
---

# $commandType

The `$commandType` function **returns the type of the command currently being executed**: `prefix` for classic text commands, or `slash` for Discord slash commands.

## Syntax

```
$commandType
```

## Parameters

None.

## Return value

- **Type**: String
- `prefix`: Command triggered by a text prefix (`!`, `?`, etc.).
- `slash`: Command triggered via the Discord slash interface (`/`).

## Behavior

- Allows adapting the behavior based on the invocation type.
- Functionally equivalent to `$if[$isSlash==true]slash$elseprefix$endif`.

## Examples

### Adaptive response

```bdfd
$if[$commandType==slash]
  $sendEphemeral[✅ Operation successful!]
$else
  $sendMessage[✅ Operation successful!]
$endif
```

### Differentiated log

```bdfd
$if[$commandType==slash]
  $log[🔹 SLASH /$commandName by $username]
$else
  $log[🔸 PREFIX $commandTrigger by $username]
$endif
```

### Contextual help

```bdfd
$title[⚙️ Command details]
$addField[Name;$commandName;yes]
$addField[Trigger;$commandTrigger;yes]
$addField[Type;$if[$commandType==slash]🔹 Slash$else🔸 Prefix$endif;yes]
$addField[Folder;$commandFolder;yes]
$footer[Language: $scriptLanguage]
$sendMessage[]
```

### Hybrid command with arguments

```bdfd
;; Retrieve arguments based on the type
$if[$commandType==slash]
  $var[arg1;$slashOption[target]]
  $var[arg2;$slashOption[reason]]
$else
  $var[arg1;$message[1]]
  $var[arg2;$message[2]]
$endif

$sendMessage[🎯 Target: $var[arg1] | Reason: $var[arg2]]
```

## Notes

- Possible values: `prefix` or `slash`.
- For a simple boolean check, use `$isSlash`.
- Ephemeral responses (`$sendEphemeral[]`) only work with `slash` commands.
- The type is configured in the BDFD console when creating the command.
