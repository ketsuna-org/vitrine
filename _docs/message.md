---
layout: doc
title: $message
translation_key: docs
category: "Entity Info"
function_name: message
syntax: $message
description: Retourne le contenu textuel brut du message déclencheur de la commande.
---

# $message

La fonction `$message` retourne le **contenu textuel brut** du message qui a déclenché l'exécution de la commande. Cela inclut le préfixe et le nom de la commande, ainsi que tous les arguments.

## Syntaxe

```
$message
```

## Paramètres

Aucun paramètre.

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Le texte complet du message déclencheur. |

## Exemples

### Afficher le message reçu

```bdfd
$sendMessage[Message reçu : $message]
```

### Vérifier un contenu spécifique

```bdfd
$if[$message==bonjour]
  $sendMessage[Bonjour à vous !]
$else
  $sendMessage[Vous avez dit : $message]
$endif
```

### Log du message

```bdfd
$channelSendMessage[$channelIDFromName[logs];$username a dit : $message]
```

### Utilisation avec $argsCheck

```bdfd
$argsCheck[>;Texte;Votre message après la commande]
$sendMessage[Argument : $message]
```

## Notes

- `$message` contient le texte **complet** du message, pas seulement les arguments.
- Si vous souhaitez uniquement les arguments après la commande, utilisez `$argsCheck` et `$message` ou `$messageSlice[]`.
- Dans les interactions (boutons, selects), `$message` peut ne pas retourner le contenu attendu.
