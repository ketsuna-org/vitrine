---
layout: doc
translation_key: docs
category: "Engine"
title: "Engine — PresenceManager"
description: >
  Documentation du PresenceManager : gestion de la présence Discord, rotation
  des statuts, résolution de templates et types d'activités supportés.
---

# Engine — PresenceManager

La classe `PresenceManager` gère la présence Discord d'un bot et la rotation automatique de ses statuts. Elle résout les templates dans les textes de statut, applique les contraintes Discord (limite de 128 caractères), et gère la rotation avec un délai aléatoire configurable.

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                     PresenceManager                               │
│                                                                  │
│  start(statuses, presenceStatus)                                  │
│  ├─ Pas de statuts → présence seule (online/idle/dnd/invisible)  │
│  └─ Statuts présents → rotation automatique                      │
│       │                                                           │
│       ├─ 1. Applique le premier statut immédiatement              │
│       ├─ 2. Ré-applique après 3s (évite perte de frame)          │
│       └─ 3. Rotation : délai aléatoire → _applyRandomStatus()    │
│                                                                  │
│  stop() → annule tous les timers de rotation                     │
└──────────────────────────────────────────────────────────────────┘
```

## Constructeur

```dart
PresenceManager({
  required this.botId,
  required this.gateway,
  this.onLog,
  this.onDebugLog,
  this.resolveTemplate,
})
```

| Paramètre         | Type                                                    | Description                                      |
|-------------------|---------------------------------------------------------|--------------------------------------------------|
| `botId`           | `String`                                                | Identifiant du bot                               |
| `gateway`         | `NyxxGateway`                                           | Connexion gateway Discord (pour updatePresence)  |
| `onLog`           | `void Function(String, {required String botId})?`       | Callback de log standard                         |
| `onDebugLog`      | `void Function(String, {String? botId})?`               | Callback de log debug (erreurs de présence)      |
| `resolveTemplate` | `String Function(String input)?`                        | Fonction de résolution des templates `((var))`   |

## Cycle de vie

### `start()` — Démarrage de la rotation

```dart
void start({
  required List<BotStatusConfig> statuses,
  required String presenceStatus,
})
```

**Si `statuses` est vide** : applique uniquement la présence (statut online/idle/dnd/invisible) sans activité, puis retourne.

**Si `statuses` n'est pas vide** :

1. **Application immédiate** du premier statut (`statuses.first`) via `_applyStatus()`
2. **Ré-application après 3 secondes** : un `Timer` de 3 secondes ré-applique le premier statut. Ceci est nécessaire car la première frame de présence peut être perdue lors de la connexion gateway (race condition READY).
3. **Rotation** : si plus d'un statut, `_scheduleNextRotation()` planifie le prochain changement avec un délai aléatoire.

### `stop()` — Arrêt de la rotation

Annule les deux timers internes (`_rotationTimer` et `_initialStatusTimer`) et les met à `null`. Aucune présence n'est réinitialisée sur le gateway.

## Logique de rotation

### Délai aléatoire

```dart
final min = currentStatus.minIntervalSeconds;
final max = currentStatus.maxIntervalSeconds;
final delaySeconds = max <= min ? min : min + _random.nextInt(max - min + 1);
```

Le délai est un entier aléatoire entre `minIntervalSeconds` et `maxIntervalSeconds` (inclus). Si `max <= min`, le délai est fixé à `min`.

### Sélection du prochain statut

`_applyRandomStatus()` choisit un statut **aléatoire** parmi tous les statuts disponibles (pas de shuffle ou d'ordre prédéfini). Après application, il replanifie la rotation avec le délai du statut choisi.

## Application d'un statut

### `_applyStatus()` — Pipeline complet

```
status.name (brut)
  │
  ├─ _sanitizeActivityText() → trim + limite 128 caractères
  │
  ├─ Si contient "((*))" → resolveTemplate() → nouveau trim + limite 128
  │
  ├─ _parseStreamingUrl() → validation http/https avec host
  │
  └─ gateway.updatePresence(PresenceBuilder(...))
       ├─ status : _mapPresenceStatus(presenceStatus)
       ├─ isAfk : false
       └─ activities : [ActivityBuilder(
            name: text,
            type: _mapActivityType(status.type, streamUrl),
            url: streamUrl,
            state: status.state (si non vide)
          )]
```

Si le texte est vide après sanitization (ou après résolution de template), l'application est ignorée.

## Mapping des statuts de présence

### `_mapPresenceStatus()` — Statut utilisateur

| Valeur config  | `CurrentUserStatus` |
|----------------|---------------------|
| `online`       | `CurrentUserStatus.online`    |
| `idle`         | `CurrentUserStatus.idle`      |
| `dnd`          | `CurrentUserStatus.dnd`       |
| `invisible`    | `CurrentUserStatus.invisible` |
| *(défaut)*     | `CurrentUserStatus.online`    |

### `_mapActivityType()` — Type d'activité

| Valeur config  | `ActivityType`      | Contrainte                        |
|----------------|----------------------|-----------------------------------|
| `game` / défaut| `ActivityType.game`       | —                          |
| `streaming`    | `ActivityType.streaming`   | Nécessite une URL valide (sinon → `game`) |
| `listening`    | `ActivityType.listening`   | —                          |
| `watching`     | `ActivityType.watching`    | —                          |
| `competing`    | `ActivityType.competing`   | —                          |

> **Note sur `streaming`** : si l'URL fournie n'est pas valide (pas de schéma http/https ou pas de host), le type d'activité est rétrogradé en `game` pour éviter une erreur Discord.

## Validation d'URL streaming

### `_parseStreamingUrl()`

Valide qu'une URL de streaming est syntaxiquement correcte :

1. Trim du texte brut
2. Parsing via `Uri.tryParse()`
3. Vérification du schéma : `http` ou `https` uniquement
4. Vérification que le `host` n'est pas vide

Retourne `null` si l'URL est invalide → le type `streaming` sera rétrogradé en `game`.

## Sanitization du texte d'activité

### `_sanitizeActivityText()`

```dart
String _sanitizeActivityText(String raw) {
  final trimmed = raw.trim();
  if (trimmed.isEmpty) return '';
  return trimmed.length > 128 ? trimmed.substring(0, 128) : trimmed;
}
```

- **Trim** : supprime les espaces en début et fin
- **Limite 128 caractères** : tronque le texte à 128 caractères (limite imposée par l'API Discord pour les noms d'activité)

## Résolution de templates

Le `resolveTemplate` injecté par `BotSession` résout les placeholders `((variable))` dans les textes de statut. Variables disponibles :

| Template              | Description                                   |
|-----------------------|-----------------------------------------------|
| `((bot.uptime))`      | Temps écoulé depuis le démarrage (format humain) |
| `((bot.guildCount))`  | Nombre de guildes (serveurs) du bot           |
| `((bot.commands))`    | Nombre de commandes du bot                    |

La résolution est effectuée par `resolveTemplatePlaceholders()` de `template_resolver.dart`, après injection des variables toujours disponibles via `injectAlwaysAvailableVariables()`.

## Comportement en cas d'erreur

Les erreurs de mise à jour de présence sont silencieuses : elles sont loguées via `onDebugLog` mais ne lèvent pas d'exception. La rotation continue normalement au prochain cycle.

En cas d'échec de `updatePresence()` :
- L'erreur est capturée dans un bloc `try/catch`
- Un message de debug est émis : `"Presence update failed: $error"`
- La rotation n'est pas interrompue
