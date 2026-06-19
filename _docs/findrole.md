---
layout: doc
title: $findRole
translation_key: docs
category: "Entity Info"
function_name: findRole
syntax: $findRole[query;(guildID)]
description: Recherche un rôle par nom partiel ou complet et retourne son ID. Insensible à la casse.
parameters:
  - name: query
    description: Le nom (ou partie du nom) du rôle à rechercher.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: snowflake (string)
    description: L'ID du premier rôle correspondant, ou une chaîne vide si aucun.
related:
  - $roleID
  - $roleExists
  - $roleName
  - $findChannel
examples:
  - description: Trouver un rôle par nom partiel
    code: "$sendMessage[Rôle trouvé : $findRole[mod]]"
  - description: Attribuer un rôle trouvé
    code: |
      $roleGrant[$authorID;$findRole[VIP]]
      $sendMessage[Rôle attribué !]
  - description: Vérifier si trouvé
    code: |
      $if[$findRole[admin]!=]
        $sendMessage[Rôle admin trouvé.]
      $endif
---

# $findRole

La fonction `$findRole` recherche un rôle Discord par **nom partiel ou complet** et retourne son ID. La recherche est insensible à la casse.

## Syntaxe

```
$findRole[query;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `query` | Le nom ou partie du nom du rôle à rechercher. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID du rôle trouvé, ou `""` si aucun. |

## Exemples

### Recherche par nom partiel

```bdfd
$sendMessage[Rôle correspondant à "mod" : $findRole[mod]]
```

### Attribuer un rôle trouvé

```bdfd
$if[$findRole[VIP]!=]
  $roleGrant[$authorID;$findRole[VIP]]
  $sendMessage[Rôle VIP attribué !]
$else
  $sendMessage[Rôle VIP introuvable.]
$endif
```

### Vérifier l'existence

```bdfd
$if[$findRole[admin]!=]
  $sendMessage[Rôle trouvé : $roleName[$findRole[admin]]]
$else
  $sendMessage[Aucun rôle ne correspond à "admin".]
$endif
```

### Fallback avec $roleID

```bdfd
$if[$roleID[Modérateur]!=]
  $sendMessage[ID exact : $roleID[Modérateur]]
$else
  $sendMessage[Recherche étendue : $findRole[mod]]
$endif
```

## Notes

- Si plusieurs rôles correspondent, le **premier** trouvé est retourné.
- Pour une recherche exacte, préférez `$roleID`.
- Très pratique quand le nom exact du rôle est incertain.
