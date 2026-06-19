---
layout: doc
title: $message
translation_key: docs
category: "Entity Info"
function_name: message
syntax: $message
description: Returns the text content brut of the message déclencheur of the command.
---

# $message

The function `$message` retourne le **text content brut** of the message qui a déclenché l'exécution of the command. Cela inclut le préfixe and the name of the command, ainsi que all arguments.

## Syntax

```
$message
```

## Parameters

Aucun parameter.

## Return Value

| Type | Description |
|---|---|
| `string` | Le text complete of the message déclencheur. |

## Examples

### Afficher the message received

```bdfd
$sendMessage[Message received : $message]
```

### Vérifier un contenu spécifique

```bdfd
$if[$message==bonday]
  $sendMessage[Bonday à vous !]
$else
  $sendMessage[Vous avez dit : $message]
$endif
```

### Log of the message

```bdfd
$channelSendMessage[$channelIDFromName[logs];$username a dit : $message]
```

### Utilisation avec $argsCheck

```bdfd
$argsCheck[>;Text;Votre message after the command]
$sendMessage[Argument : $message]
```

## Notes

- `$message` contains the text **complete** of the message, pas only les arguments.
- Si vous souhaitez only les arguments after the command, utilisez `$argsCheck` and `$message` or `$messageSlice[]`.
- Dans les interactions (buttons, select menus), `$message` peut ne pas retourner le contenu attendu.
