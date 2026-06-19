---
layout: doc
title: "Système — InteractionListenerRegistry"
translation_key: docs
category: systems
description: >
  Documentation du registre de listeners d'interactions (clics de boutons,
  soumissions de modales, sélections de menus). Stockage en mémoire avec
  expiration automatique et matching contextuel. Implémenté dans
  packages/shared/lib/utils/interaction_listener_registry.dart (191 lignes).
---

# Système — InteractionListenerRegistry

L'`InteractionListenerRegistry` est un registre singleton qui stocke en mémoire les listeners d'interactions en attente (clics de boutons, soumissions de modales, sélections de menus). Chaque listener est automatiquement expiré après un TTL configurable et peut être configuré comme `oneShot` (usage unique). Le matching prend en compte le contexte (guild, channel, message, utilisateur) pour éviter les déclenchements croisés.

Il est implémenté dans `packages/shared/lib/utils/interaction_listener_registry.dart` (191 lignes) et les listeners y sont enregistrés par `sendWorkflowResponse` (pour les modales avec actions inline) et `registerComponentWorkflowBindings` (pour les boutons/sélecteurs avec actions inline).

---

## Classes

### `ListenerEntry`

Représente un listener enregistré dans le registre.

```dart
class ListenerEntry {
  final String botId;
  final String workflowName;
  final String workflowEntryPoint;
  final Map<String, String> workflowArguments;
  final List<Action>? inlineActions;
  final String? customId;
  final DateTime expiresAt;
  final bool oneShot;
  final String type;
  final String? guildId;
  final String? channelId;
  final String? messageId;
  final String? userId;
  final Map<String, String> initialContext;

  bool get isExpired => DateTime.now().isAfter(expiresAt);
}
```

**Champs :**

| Champ                | Type                     | Défaut    | Description                                                      |
|----------------------|--------------------------|-----------|------------------------------------------------------------------|
| `botId`              | `String`                 | *(requis)* | ID du bot propriétaire du listener                              |
| `workflowName`       | `String`                 | `''`      | Nom du workflow legacy (si applicable)                           |
| `workflowEntryPoint` | `String`                 | `'main'`  | Point d'entrée du workflow legacy                                |
| `workflowArguments`  | `Map<String, String>`    | `{}`      | Arguments du workflow legacy                                     |
| `inlineActions`      | `List<Action>?`          | `null`    | Actions inline à exécuter (prioritaires sur le workflow legacy)  |
| `customId`           | `String?`                | `null`    | Custom ID utilisé lors de l'enregistrement                       |
| `expiresAt`          | `DateTime`               | *(requis)* | Date/heure d'expiration du listener                              |
| `oneShot`            | `bool`                   | `true`    | Si `true`, le listener est retiré après le premier match        |
| `type`               | `String`                 | *(requis)* | Type de listener : `'button'`, `'select'` ou `'modal'`          |
| `guildId`            | `String?`                | `null`    | Restreint le listener à un serveur spécifique                    |
| `channelId`          | `String?`                | `null`    | Restreint le listener à un canal spécifique                      |
| `messageId`          | `String?`                | `null`    | Restreint le listener à un message spécifique                    |
| `userId`             | `String?`                | `null`    | Restreint le listener à un utilisateur spécifique                |
| `initialContext`     | `Map<String, String>`    | `{}`      | Variables de contexte initial (ex: `target.message.id`)          |

**Propriétés calculées :**

| Propriété   | Type   | Description                                      |
|-------------|--------|--------------------------------------------------|
| `isExpired` | `bool` | `true` si `DateTime.now()` est après `expiresAt` |

---

### `ListenerMatchRequest`

Requête de matching pour rechercher un listener correspondant.

```dart
class ListenerMatchRequest {
  final String botId;
  final String type;
  final String? guildId;
  final String? channelId;
  final String? messageId;
  final String? userId;
}
```

**Champs :**

| Champ       | Type      | Obligatoire | Description                                |
|-------------|-----------|-------------|--------------------------------------------|
| `botId`     | `String`  | Oui         | ID du bot cherchant un listener            |
| `type`      | `String`  | Oui         | Type recherché : `'button'`, `'select'`, `'modal'` |
| `guildId`   | `String?` | Non         | ID du serveur                              |
| `channelId` | `String?` | Non         | ID du canal                                |
| `messageId` | `String?` | Non         | ID du message                              |
| `userId`    | `String?` | Non         | ID de l'utilisateur                        |

---

### `InteractionListenerRegistry`

Registre singleton des listeners.

```dart
class InteractionListenerRegistry {
  InteractionListenerRegistry._();
  static final instance = InteractionListenerRegistry._();

  final Map<String, List<ListenerEntry>> _listeners = {};
}
```

**Stockage interne :** `Map<String, List<ListenerEntry>>` où la clé est le `customId` et la valeur est une liste ordonnée de `ListenerEntry`. L'ordre d'insertion est préservé ; la recherche se fait du plus récent au plus ancien (reverse iteration).

---

## Méthodes

### `register(customId, entry)`

Enregistre un listener pour un `customId` donné.

```dart
void register(String customId, ListenerEntry entry)
```

1. Appelle `pruneExpired()` pour nettoyer les entrées expirées.
2. Récupère ou crée la liste pour `customId` via `_listeners.putIfAbsent`.
3. Ajoute `entry` à la fin de la liste.

---

### `getMatching(customId, request)`

Recherche le listener le plus récent non expiré correspondant à la requête.

```dart
ListenerEntry? getMatching(String customId, ListenerMatchRequest request)
```

**Algorithme :**

1. Récupère la liste des listeners pour `customId`. Si absente ou vide → `null`.
2. Supprime les entrées expirées de la liste.
3. Si la liste est vide après nettoyage → supprime la clé du map → `null`.
4. Parcourt la liste **du plus récent au plus ancien** (reverse iteration) :
   - Vérifie la correspondance via `_matches(entry, request)`.
   - Si correspondance trouvée :
     - Si `entry.oneShot` → retire l'entrée de la liste via `removeEntry`.
     - Si la liste devient vide → supprime la clé du map.
     - Retourne l'entrée.
5. Aucune correspondance → `null`.

---

### `removeEntry(customId, entry)`

Retire une entrée spécifique de la liste d'un `customId`.

```dart
void removeEntry(String customId, ListenerEntry entry)
```

- Si la liste devient vide après retrait → supprime la clé du map.

---

### `removeAllForBot(botId)`

Retire tous les listeners associés à un bot spécifique.

```dart
void removeAllForBot(String botId)
```

- Parcourt toutes les entrées du map.
- Pour chaque liste, supprime les listeners dont `botId` correspond.
- Nettoie les listes devenues vides.

Utile lors de la déconnexion ou de la suppression d'un bot.

---

### `pruneExpired()`

Nettoie toutes les entrées expirées du registre.

```dart
void pruneExpired()
```

- Parcourt toutes les entrées.
- Supprime les listeners dont `isExpired == true`.
- Supprime les clés dont la liste est vide.

Cette méthode est appelée automatiquement avant chaque `register` et avant chaque `getMatching`. Elle peut aussi être appelée périodiquement.

---

### `activeCustomIds`

Liste tous les `customId` actuellement actifs (non expirés).

```dart
List<String> get activeCustomIds
```

- Appelle `pruneExpired()` avant de retourner les clés.

---

### `_matches(entry, request)` (privée)

Vérifie si un `ListenerEntry` correspond à une `ListenerMatchRequest`.

```dart
bool _matches(ListenerEntry entry, ListenerMatchRequest request)
```

**Règles de matching :**

| Condition                                         | Règle                                                       |
|---------------------------------------------------|-------------------------------------------------------------|
| `entry.botId != request.botId`                    | Rejeté — le bot doit correspondre                           |
| `entry.type != request.type`                      | Rejeté — le type doit correspondre                          |
| `entry.guildId != null && != request.guildId`     | Rejeté — si restreint à un serveur, doit correspondre       |
| `entry.channelId != null && != request.channelId` | Rejeté — si restreint à un canal, doit correspondre         |
| `entry.messageId != null && != request.messageId` | Rejeté — si restreint à un message, doit correspondre       |
| `entry.userId != null && != request.userId`       | Rejeté — si restreint à un utilisateur, doit correspondre   |

Un champ `null` dans le `ListenerEntry` signifie « pas de restriction » (match tout). Un champ `null` dans la `ListenerMatchRequest` n'est comparé que si le `ListenerEntry` a une restriction explicite.

---

## Fonction utilitaire

### `extractListenerContext(variables)`

Extrait le sous-ensemble des variables d'exécution à transférer comme contexte initial pour un `ListenerEntry`.

```dart
Map<String, String> extractListenerContext(Map<String, String> variables)
```

**Clés extraites :**

| Motif                        | Exemples                                          |
|------------------------------|---------------------------------------------------|
| Commence par `target.`       | `target.message.id`, `target.user.id`             |
| `message.id`                 | `message.id`                                      |
| `messageId`                  | `messageId`                                       |
| `interaction.messageId`      | `interaction.messageId`                           |
| `channel.id`                 | `channel.id`                                      |
| `channelId`                  | `channelId`                                       |
| `guild.id`                   | `guild.id`                                        |
| `guildId`                    | `guildId`                                         |

Seules les clés dont la valeur est non vide sont incluses dans le contexte retourné.

Ce contexte permet aux actions inline exécutées ultérieurement (ex: sur soumission de modale) d'accéder au contexte de la commande d'origine.

---

## Cycle de vie d'un listener

```
Enregistrement                   Matching                       Nettoyage
     │                               │                              │
     ▼                               ▼                              ▼
register(customId, entry)    getMatching(customId, req)     pruneExpired()
     │                               │                              │
     ├─ pruneExpired()               ├─ removeWhere(isExpired)      ├─ removeWhere(isExpired)
     ├─ ajout à la liste             ├─ reverse iterate             └─ supprime clés vides
     └─                              ├─ _matches(entry, req)
                                     ├─ si oneShot → removeEntry()
                                     └─ retourne l'entrée
```

---

## Patterns d'utilisation

### Pattern 1 : Bouton/sélecteur avec actions inline

```dart
// Dans sendWorkflowResponse (via registerComponentWorkflowBindings)
InteractionListenerRegistry.instance.register(
  customId,
  ListenerEntry(
    botId: botId,
    inlineActions: node.actions.map((a) => Action.fromJson(a)).toList(),
    expiresAt: DateTime.now().add(const Duration(hours: 24)),
    type: 'button',  // ou 'select'
    oneShot: false,   // les boutons peuvent être cliqués plusieurs fois
    guildId: guildId,
    channelId: channelId,
    messageId: responseMessageId,
  ),
);
```

### Pattern 2 : Modale avec actions inline

```dart
// Dans sendWorkflowResponse (branche modale)
InteractionListenerRegistry.instance.register(
  customId,
  ListenerEntry(
    botId: botId,
    inlineActions: definition.actions.map((a) => Action.fromJson(a)).toList(),
    expiresAt: DateTime.now().add(const Duration(hours: 1)),
    type: 'modal',
    oneShot: true,   // une modale ne peut être soumise qu'une fois
    guildId: interaction.guildId?.toString(),
    channelId: interaction.channelId?.toString(),
    initialContext: extractListenerContext(runtimeVariables),
  ),
);
```

---

## Dépendances

- `types/action.dart` : `Action` (utilisé dans les actions inline)
- Aucune autre dépendance interne
