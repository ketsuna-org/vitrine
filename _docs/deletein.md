---
layout: doc
title: $deleteIn[]
translation_key: docs
category: "Embed & Message"
function_name: deleteIn
syntax: $deleteIn[duration]
description: Programme la suppression automatique d'un message après un délai spécifié. Le message est supprimé par le bot une fois le délai écoulé.
parameters:
  - name: duration
    type: string
    required: true
    description: Délai avant suppression. Format : "5s" (secondes), "1m" (minutes), "2h" (heures).
returns:
  type: void
  description: Programme la suppression différée du message courant.
related:
  - editIn
  - editEmbedIn
  - replyIn
  - $deleteMessage
examples:
  - description: Supprimer après 10 secondes
    code: |
      $sendMessage[Ce message s'autodétruira dans 10 secondes]
      $deleteIn[10s]
  - description: Message éphémère
    code: |
      $sendMessage[Message temporaire...]
      $deleteIn[5s]
  - description: Notification qui disparaît
    code: |
      $sendMessage[⚠️ Alerte temporaire]
      $deleteIn[30s]
---

# $deleteIn[] — Suppression Différée de Message

`$deleteIn[]` programme la suppression automatique du message après un délai donné. Idéal pour les notifications temporaires, messages éphémères, ou nettoyage automatique.

## Syntaxe

```
$deleteIn[duration]
```

## Paramètres

| Paramètre | Obligatoire | Description |
|-----------|-------------|-------------|
| `duration` | Oui | Délai avant suppression. Format : nombre + unité. |

## Format de durée

| Format | Unité | Exemple |
|--------|-------|---------|
| `Xs` | Secondes | `5s`, `30s`, `60s` |
| `Xm` | Minutes | `1m`, `5m`, `15m` |
| `Xh` | Heures | `1h`, `2h` |

## Valeur de retour

Programme la suppression différée du message. Le message est supprimé automatiquement à l'échéance.

## Utilisation

### Notification temporaire

```bdfd
$sendMessage[✅ Commande exécutée avec succès]
$deleteIn[5s]
```

### Message d'erreur éphémère

```bdfd
$sendMessage[❌ Erreur : Vous n'avez pas la permission requise]
$deleteIn[10s]
```

### Alerte qui s'efface

```bdfd
$sendMessage[🔔 Nouvelle mise à jour disponible !]
$deleteIn[30s]
```

### Avec embeds

```bdfd
$title[Message temporaire]
$description[Ce contenu disparaîtra dans 10 secondes]
$color[#E74C3C]
$footer[Auto-suppression...]
$deleteIn[10s]
```

### Bienvenue éphémère

```bdfd
$sendMessage[Bienvenue $username ! Pensez à lire le règlement.]
$deleteIn[1m]
```

## Notes

- `$deleteIn[]` supprime le message **courant** (celui qui vient d'être envoyé).
- La durée maximale est généralement de 15 minutes.
- Une fois programmée, la suppression ne peut pas être annulée.
- La suppression échoue silencieusement si le bot n'a pas la permission `MANAGE_MESSAGES`.
- Combinez avec `$sendMessage` pour les messages auto-destructeurs.
