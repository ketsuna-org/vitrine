---
layout: doc
title: $guildExists[]
translation_key: docs
category: "Entity Info"
function_name: guildExists
syntax: $guildExists[guildId]
description: Vérifie si un serveur (guild) avec l'ID donné existe et si le bot y a accès. Retourne "true" ou "false".
parameters:
  - name: guildId
    type: string
    required: true
    description: L'identifiant (ID) du serveur à vérifier.
returns:
  type: string
  description: "true" si le serveur existe et que le bot y est présent, "false" sinon.
related:
  - $guildID
  - $serverID
  - $guildCount
  - $serverCount
examples:
  - description: Vérifier l'existence d'un serveur
    code: |
      $sendMessage[Le serveur 123456789 existe : $guildExists[123456789]]
  - description: Condition
    code: |
      $if[$guildExists[$message[1]]==true]
      $sendMessage[✅ Le bot est sur ce serveur.]
      $else
      $sendMessage[❌ Serveur introuvable.]
      $endif
---

# $guildExists[] — Vérifier l'Existence d'un Serveur

`$guildExists[]` détermine si un serveur Discord identifié par son ID existe et si le bot y est actuellement présent.

## Syntaxe

```
$guildExists[guildId]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `guildId` | Oui | L'ID du serveur à vérifier. |

## Valeur de retour

- **Type** : `string`
- `"true"` si le bot est présent sur le serveur, `"false"` sinon.

> **Attention** : La valeur de retour est une **chaîne** (`"true"` / `"false"`), pas un booléen. Pour les conditions, comparez avec `==true` ou `==false`.

## Utilisation

### Vérification simple

```bdfd
$sendMessage[Présence sur le serveur 123456789 : $guildExists[123456789]]
```

### Condition avant action

```bdfd
$if[$guildExists[$message[1]]==true]
$sendMessage[✅ Le bot est bien présent sur ce serveur.]
$else
$sendMessage[❌ Le bot n'est pas sur ce serveur, ou l'ID est invalide.]
$stop
$endif
```

### Vérification multi-serveurs

```bdfd
$var[guild1;123456789012345678]
$var[guild2;987654321098765432]
$if[$guildExists[$var[guild1]]==true]
$sendMessage[Serveur 1 : ✅ Présent]
$else
$sendMessage[Serveur 1 : ❌ Absent]
$endif
$if[$guildExists[$var[guild2]]==true]
$sendMessage[Serveur 2 : ✅ Présent]
$else
$sendMessage[Serveur 2 : ❌ Absent]
$endif
```

### Log de disponibilité

```bdfd
$if[$guildExists[$var[targetGuild]]==true]
$log[Action exécutée : serveur $var[targetGuild] trouvé]
$else
$log[Action bloquée : serveur $var[targetGuild] non trouvé]
$endif
```

## Notes

- La fonction vérifie uniquement si le bot est présent sur le serveur, pas si le serveur existe sur Discord.
- Un serveur peut exister sans que le bot y soit — dans ce cas, `$guildExists[]` retourne `"false"`.
- L'ID doit être une chaîne numérique valide (Snowflake 18-19 chiffres).
- Pour obtenir l'ID du serveur courant, utilisez `$guildID[]` ou `$serverID[]`.
