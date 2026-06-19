---
layout: doc
title: $webhookDelete
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookDelete
syntax: $webhookDelete[webhookID;webhookToken]
description: Deletes a webhook Discord existing en utilisant son ID and son token. Utile pour nettoyer les webhooks createds dynamicment.
---

# $webhookDelete

The function `$webhookDelete[]` allows **supprimer un webhook Discord** existing à l'aide de son ID and de son token.

## Syntax

```
$webhookDelete[webhookID;webhookToken]
```

## Parameters

| Parameter | Description |
|---|---|
| `webhookID` | The ID of the webhook (first partie de the URL after `/webhooks/`). |
| `webhookToken` | Le token du webhook (second partie after the ID). |

## Return Value

This function ne retourne pas de value. The suppression est effectuée silencieusement.

## Behavior

- The bot doit avoir la permission `MANAGE_WEBHOOKS` or être le owner du webhook.
- Une fois deleted, le webhook ne peut plus être utilisé.
- Les URLs restantes pointant vers ce webhook deviendront invalids.

## Examples

### Suppression d'un webhook

```bdfd
$let[hookID;123456789]
$let[hookToken;abcdefghijklmnop]
$webhookDelete[$hookID;$hookToken]
$sendMessage[Webhook deleted.]
```

### Extraction dethen une URL stockée

```bdfd
$let[url;$getUserVar[tempHook]]
$let[parts;$splitText[$url;/]]
$let[hookID;$getTextSplitIndex[$parts;5]]
$let[hookToken;$getTextSplitIndex[$parts;6]]
$webhookDelete[$hookID;$hookToken]
$sendMessage[Webhook nettoyé.]
```

## Notes

- Les webhooks createds via l'interface Discord ne can be deleteds que par un administrator.
- Les webhooks createds par the bot can be deleteds par celui-ci.
- Supprimez les webhooks temporarys after usage pour éviter l'accumulation.
