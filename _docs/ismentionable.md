---
layout: doc
title: $isMentionable
translation_key: docs
category: "Entity Info"
function_name: isMentionable
syntax: $isMentionable[roleID;(guildID)]
description: Vérifie si un rôle est mentionnable. Retourne "true" ou "false".
parameters:
  - name: roleID
    description: L'ID du rôle à vérifier.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: string
    description: '"true" si le rôle est mentionnable, "false" sinon.'
related:
  - $roleInfo
  - $roleName
  - $roleExists
  - $allowRoleMentions
examples:
  - description: Vérifier si mentionnable
    code: |
      $if[$isMentionable[$roleID[Admin]]==true]
        $sendMessage[Le rôle Admin est mentionnable.]
      $else
        $sendMessage[Le rôle Admin n'est pas mentionnable.]
      $endif
---

# $isMentionable

La fonction `$isMentionable` vérifie si un rôle Discord est **mentionnable** par les membres du serveur. Un rôle mentionnable peut être utilisé dans les messages avec `@Rôle`.

## Syntaxe

```
$isMentionable[roleID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | `"true"` si le rôle est mentionnable, `"false"` sinon. |

## Exemples

### Vérifier un rôle

```bdfd
$if[$isMentionable[$roleID[Annonces]]==true]
  $sendMessage[Le rôle Annonces est mentionnable.]
$else
  $sendMessage[Le rôle Annonces n'est pas mentionnable.]
$endif
```

### Lister les rôles mentionnables

```bdfd
$sendMessage[Le rôle Admin est $isMentionable[$roleID[Admin]].]
```

### Alerter si non mentionnable

```bdfd
$if[$isMentionable[$roleID[Modo]]==false]
  $sendMessage[⚠️ Le rôle Modo n'est pas mentionnable. Les membres ne peuvent pas le ping.]
$endif
```

### Récupérer via $roleInfo

```bdfd
$sendMessage[Mentionnable : $roleInfo[123456789012345678;mentionable]]
```

## Notes

- Retourne une chaîne `"true"` ou `"false"`.
- Équivalent à `$roleInfo[roleID;mentionable]`.
- Utile pour vérifier avant d'envoyer une mention de rôle.
