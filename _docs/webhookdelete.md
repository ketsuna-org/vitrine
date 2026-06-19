---
layout: doc
title: $webhookDelete
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDelete
syntax: $webhookDelete[webhookID;webhookToken]
description: Supprime un webhook Discord existant en utilisant son ID et son token. Utile pour nettoyer les webhooks créés dynamiquement.
parameters:
  - name: webhookID
    description: L'ID du webhook à supprimer (première partie de l'URL après /webhooks/).
  - name: webhookToken
    description: Le token du webhook à supprimer (seconde partie de l'URL après l'ID).
returns:
  - type: aucun
    description: Cette fonction ne retourne pas de valeur. Le webhook est supprimé côté serveur.
related:
  - $webhookCreate
  - $webhookSend
examples:
  - description: Supprimer un webhook par URL
    code: $webhookDelete[123456789;abcdefghijklmnop]
  - description: Supprimer un webhook depuis une variable
    code: $webhookDelete[$hookID;$hookToken]
---

# $webhookDelete

La fonction `$webhookDelete[]` permet de **supprimer un webhook Discord** existant à l'aide de son ID et de son token.

## Syntaxe

```
$webhookDelete[webhookID;webhookToken]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `webhookID` | L'ID du webhook (première partie de l'URL après `/webhooks/`). |
| `webhookToken` | Le token du webhook (seconde partie après l'ID). |

## Valeur de retour

Cette fonction ne retourne pas de valeur. La suppression est effectuée silencieusement.

## Comportement

- Le bot doit avoir la permission `MANAGE_WEBHOOKS` ou être le propriétaire du webhook.
- Une fois supprimé, le webhook ne peut plus être utilisé.
- Les URLs restantes pointant vers ce webhook deviendront invalides.

## Exemples

### Suppression d'un webhook

```bdfd
$let[hookID;123456789]
$let[hookToken;abcdefghijklmnop]
$webhookDelete[$hookID;$hookToken]
$sendMessage[Webhook supprimé.]
```

### Extraction depuis une URL stockée

```bdfd
$let[url;$getUserVar[tempHook]]
$let[parts;$splitText[$url;/]]
$let[hookID;$getTextSplitIndex[$parts;5]]
$let[hookToken;$getTextSplitIndex[$parts;6]]
$webhookDelete[$hookID;$hookToken]
$sendMessage[Webhook nettoyé.]
```

## Notes

- Les webhooks créés via l'interface Discord ne peuvent être supprimés que par un administrateur.
- Les webhooks créés par le bot peuvent être supprimés par celui-ci.
- Supprimez les webhooks temporaires après usage pour éviter l'accumulation.
