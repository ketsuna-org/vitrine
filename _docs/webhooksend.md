---
layout: doc
title: $webhookSend
translation_key: docs
category: "Webhooks & Integrations"
function_name: webhookSend
syntax: $webhookSend[webhookURL;content]
description: Envoie un message via un webhook Discord. Permet d'envoyer du contenu formaté, des embeds et des fichiers vers un canal externe ou interne via une URL de webhook.
parameters:
  - name: webhookURL
    description: L'URL complète du webhook Discord (format https://discord.com/api/webhooks/ID/TOKEN).
  - name: content
    description: Le contenu du message à envoyer. Supporte le texte, les mentions et les variables BDFD.
returns:
  - type: aucun
    description: Cette fonction ne retourne pas de valeur. Le message est envoyé directement via l'API Discord.
related:
  - $webhookCreate
  - $webhookAvatarURL
  - $webhookUsername
  - $webhookContent
examples:
  - description: Envoyer un message simple
    code: $webhookSend[https://discord.com/api/webhooks/123/abc;Hello World !]
  - description: Envoyer un message avec variables
    code: $webhookSend[$webhookURL;$username a envoyé : $message]
  - description: Envoyer avec des sauts de ligne
    code: |
      $webhookSend[https://discord.com/api/webhooks/123/abc;
      **Annonce**
      Contenu de l'annonce ici.
      ]
---

# $webhookSend

La fonction `$webhookSend[]` permet d'**envoyer un message via un webhook** Discord. C'est le point d'entrée principal pour utiliser les webhooks avec BDFD.

## Syntaxe

```
$webhookSend[webhookURL;content]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `webhookURL` | L'URL complète du webhook Discord (`https://discord.com/api/webhooks/ID/TOKEN`). |
| `content` | Le contenu textuel du message à envoyer. Supporte le markdown et les émojis. |

## Valeur de retour

Cette fonction ne retourne pas de valeur directement. Le message est envoyé via l'API de webhook Discord.

## Comportement

- Si le webhook est invalide ou expiré, l'envoi échoue silencieusement.
- Le contenu peut inclure des sauts de ligne, du markdown et des mentions.
- Les fonctions d'embed webhook (`$webhookTitle`, `$webhookDescription`, etc.) doivent être placées **avant** `$webhookSend[]` dans le code.
- `$webhookSend[]` doit être la **dernière** fonction webhook appelée, car elle déclenche l'envoi.

## Exemples

### Envoi simple

```bdfd
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;Hello World !]
```

### Envoi avec embed

```bdfd
$webhookTitle[Titre de l'embed]
$webhookDescription[Description détaillée ici]
$webhookColor[#5865F2]
$webhookFooter[Pied de page]
$webhookSend[https://discord.com/api/webhooks/123456/abcdef;]
```

### Envoi conditionnel

```bdfd
$if[$checkContains[$message;!annonce]==true]
  $webhookTitle[Nouvelle annonce]
  $webhookDescription[$message]
  $webhookSend[$webhookURL;]
$endif
```

## Notes

- Les URLs de webhook sont sensibles : ne les exposez jamais dans du code public.
- Stockez les URLs de webhook dans des variables d'environnement ou des constantes.
- Un webhook peut envoyer jusqu'à 10 embeds par message.
- La limite de caractères par message est de 2000 pour le contenu texte.
