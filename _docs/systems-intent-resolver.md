---
layout: doc
title: "Système — IntentResolver"
translation_key: docs
category: systems
description: >
  Documentation du module IntentResolver : résolution des intents Discord
  requis pour l'exécution des workflows événementiels, le support des
  commandes legacy, et le filtrage des intents privilégiés.
---

# Système — IntentResolver

Le module `IntentResolver` détermine quels intents Discord Gateway sont nécessaires pour exécuter les workflows configurés d'un bot. Il est implémenté dans `packages/shared/lib/utils/intent_resolver.dart` (200 lignes).

Il mappe chaque événement Discord aux intent keys correspondantes, gère les intents privilégiés (ceux qui nécessitent une approbation explicite dans le Developer Portal de Discord), et prend en compte les commandes legacy (préfixe) qui nécessitent des intents supplémentaires.

---

## Constantes

### `allIntentKeys`

Ensemble de toutes les clés d'intent connues (21 clés) :

| Intent Key                       | Bit  | Notes           |
|----------------------------------|------|-----------------|
| `Guilds`                         | 0    |                 |
| `Guild Members`                  | 1    | **Privilégié**  |
| `Guild Moderation`               | 2    |                 |
| `Guild Expressions`              | 3    |                 |
| `Guild Integrations`             | 4    |                 |
| `Guild Webhooks`                 | 5    |                 |
| `Guild Invites`                  | 6    |                 |
| `Guild Voice States`             | 7    |                 |
| `Guild Presence`                 | 8    | **Privilégié**  |
| `Guild Messages`                 | 9    |                 |
| `Guild Message Reactions`        | 10   |                 |
| `Guild Message Typing`           | 11   |                 |
| `Direct Messages`                | 12   |                 |
| `Direct Message Reactions`       | 13   |                 |
| `Direct Message Typing`          | 14   |                 |
| `Message Content`                | 15   | **Privilégié**  |
| `Guild Scheduled Events`         | 16   |                 |
| `Auto Moderation Configuration`  | 20   |                 |
| `Auto Moderation Execution`      | 21   |                 |
| `Guild Message Polls`            | 24   |                 |
| `Direct Message Polls`           | 25   |                 |

### `privilegedIntentKeys`

Ensemble des clés d'intent privilégiés (3 clés) :

- `Guild Members`
- `Guild Presence`
- `Message Content`

Ces intents nécessitent une activation explicite dans l'onglet « Bot » du Discord Developer Portal.

### `eventToIntentKeys`

Map associant chaque événement Discord (camelCase) à l'ensemble des intents requis. La référence complète est visible dans le [code source](https://github.com/nousresearch/hermes-agent/blob/main/packages/shared/lib/utils/intent_resolver.dart). Exemples :

| Événement                    | Intent(s) requis              |
|------------------------------|-------------------------------|
| `guildCreate` / `guildUpdate` / `guildDelete` | `Guilds` |
| `channelCreate` / `channelUpdate` / `channelDelete` | `Guilds` |
| `guildMemberAdd` / `guildMemberUpdate` / `guildMemberRemove` | `Guild Members` |
| `messageCreate` / `messageUpdate` / `messageDelete` | `Guild Messages` |
| `messageReactionAdd` / `messageReactionRemove` | `Guild Message Reactions` |
| `presenceUpdate`              | `Guild Presence`              |
| `voiceStateUpdate`            | `Guild Voice States`          |
| `guildBanAdd` / `guildBanRemove` | `Guild Moderation`         |

**Note :** Certains événements comme `ready`, `resumed`, `interactionCreate`, et `entitlementCreate` ne nécessitent **aucun intent spécifique**.

---

## Fonction exportée

### `resolveRequiredIntentKeys(...)`

Calcule l'ensemble final des clés d'intent nécessaires en fonction des workflows configurés, des commandes legacy et des intents privilégiés approuvés.

```dart
Set<String> resolveRequiredIntentKeys({
  required List<Map<String, dynamic>> eventWorkflows,
  required bool hasLegacyCommands,
  Set<String> approvedPrivilegedIntents = const {},
  List<String>? warnings,
})
```

**Paramètres :**

| Paramètre                   | Type                          | Description                                                        |
|-----------------------------|-------------------------------|--------------------------------------------------------------------|
| `eventWorkflows`            | `List<Map<String, dynamic>>`  | Liste des définitions de workflows événementiels du bot             |
| `hasLegacyCommands`         | `bool`                        | `true` si le bot a au moins une commande legacy activée             |
| `approvedPrivilegedIntents` | `Set<String>`                 | Intents privilégiés approuvés par Discord (récupérés via l'API)     |
| `warnings`                  | `List<String>?`               | Liste optionnelle peuplée avec les avertissements                  |

**Retour :**

Un `Set<String>` contenant les clés d'intent que le bot doit demander à la gateway Discord.

**Algorithme :**

1. **Collecte depuis les workflows :** Pour chaque workflow événementiel, extrait le `eventTrigger.event`, puis consulte `eventToIntentKeys` pour obtenir les intents requis. Accumule dans `required`.

2. **Commandes legacy :** Si `hasLegacyCommands` est `true`, ajoute systématiquement :
   - `Guild Messages` — nécessaire pour recevoir `messageCreate`
   - `Message Content` — nécessaire pour lire le préfixe et les arguments

3. **Filtrage des privilégiés :** Pour chaque clé dans `required` :
   - Si la clé est dans `privilegedIntentKeys` :
     - Si elle est dans `approvedPrivilegedIntents` → incluse dans `resolved`
     - Sinon → **exclue** et un avertissement est ajouté à `warnings`
   - Si la clé n'est pas privilégiée → incluse directement dans `resolved`

**Message d'avertissement (format) :**

```
Intent "Guild Members" is required by your event workflows but is not
approved in the Discord Developer Portal. The related events will not be received.
```

---

## Flux d'utilisation typique

```
Configuration du bot (BotConfig)
        │
        ├── eventWorkflows : [{eventTrigger: {event: "messageCreate"}}, ...]
        ├── hasLegacyCommands : true
        └── approvedPrivilegedIntents : {Message Content} (via API Discord)
                │
                ▼
resolveRequiredIntentKeys(eventWorkflows, hasLegacyCommands, approvedPrivilegedIntents)
                │
                ├── Collecte : "messageCreate" → Guild Messages
                ├── Commands legacy : + Guild Messages, + Message Content
                │
                ├── Guild Messages → non privilégié → inclus ✓
                ├── Message Content → privilégié, approuvé → inclus ✓
                │
                ▼
        Retour : {Guild Messages, Message Content}
```

---

## Notes importantes

- Les événements non listés dans `eventToIntentKeys` (comme `interactionCreate`) ne consomment aucun intent.
- Ne pas inclure un intent requis empêche la réception des événements associés — le moteur loggue un avertissement mais ne bloque pas le démarrage.
- Les intents privilégiés non approuvés sont exclus silencieusement du set retourné (avec avertissement), permettant au bot de démarrer même si certaines fonctionnalités sont dégradées.
