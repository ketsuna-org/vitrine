---
layout: doc
title: "Système — InteractionResponse"
translation_key: docs
category: systems
description: >
  Documentation de la logique de réponse finale à une interaction Discord.
  Couvre l'envoi de messages texte, embeds, composants (legacy et V2),
  modales, réponses éphémères, et la gestion du flag IS_COMPONENTS_V2.
  Implémenté dans packages/shared/lib/actions/interaction_response.dart (655 lignes).
---

# Système — InteractionResponse

Le module `InteractionResponse` est responsable de l'envoi de la réponse finale après l'exécution d'un workflow. Il gère tous les types de réponses : messages texte, embeds, composants (legacy et V2), modales, réponses éphémères, et le fallback vers un canal textuel lorsque l'interaction n'est pas disponible. Il est implémenté dans `packages/shared/lib/actions/interaction_response.dart` (655 lignes).

---

## Fonctions exportées

### `requiresV2Flag(response)`

Détermine si la réponse nécessite le flag `IS_COMPONENTS_V2` (32768). Ce flag est requis lorsque la réponse contient des composants riches V2 (containers, sections, thumbnails, etc.).

```dart
bool requiresV2Flag(Map<String, dynamic> response)
```

**Paramètre :**

| Paramètre   | Type                   | Description                              |
|-------------|------------------------|------------------------------------------|
| `response`  | `Map<String, dynamic>` | Payload de réponse du workflow           |

**Retour :** `true` si le flag V2 est nécessaire, `false` sinon.

**Algorithme de détection (par ordre) :**

1. Si `response['type']` vaut `'componentV2'` → `true`.
2. Si `response['components']` est un `Map` :
   - Le parse via `ComponentV2Definition.fromJson`.
   - Si `def.isRichV2` → `true`.
3. Si le workflow a une condition (`response['workflow']['conditional']['enabled'] == true`) :
   - Vérifie `whenTrueType` et `whenFalseType` : si l'un vaut `'componentV2'` → `true`.
   - Vérifie `whenTrueComponents` et `whenFalseComponents` via `ComponentV2Definition.fromJson` : si l'un est `isRichV2` → `true`.
4. Sinon → `false`.

---

### `sendWorkflowResponse(...)`

Fonction principale qui construit et envoie la réponse finale du workflow. Gère le routage conditionnel, les modales, les embeds, les composants, et le fallback canal.

```dart
Future<void> sendWorkflowResponse({
  Interaction? interaction,
  NyxxGateway? gateway,
  Snowflake? fallbackChannelId,
  required Map<String, dynamic> response,
  required Map<String, String> runtimeVariables,
  required String botId,
  bool didDefer = false,
  bool isEphemeral = false,
  Future<void> Function(String, {required String botId})? onLog,
  Future<void> Function(String, {required String botId})? onDebugLog,
})
```

**Paramètres :**

| Paramètre             | Type                                                          | Description                                                        |
|-----------------------|---------------------------------------------------------------|--------------------------------------------------------------------|
| `interaction`         | `Interaction?`                                                | L'interaction Discord à laquelle répondre (null si commande prefix) |
| `gateway`             | `NyxxGateway?`                                                | Gateway Discord pour le fallback canal                             |
| `fallbackChannelId`   | `Snowflake?`                                                  | ID du canal de fallback (si pas d'interaction)                     |
| `response`            | `Map<String, dynamic>`                                        | Payload de la réponse (texte, embeds, composants, modal, etc.)     |
| `runtimeVariables`    | `Map<String, String>`                                         | Variables d'exécution résolues                                     |
| `botId`               | `String`                                                      | ID du bot                                                          |
| `didDefer`            | `bool`                                                        | Si l'interaction a été différée (`defer`)                          |
| `isEphemeral`         | `bool`                                                        | Si la réponse doit être éphémère                                   |
| `onLog`               | `Future<void> Function(String, {required String botId})?`     | Callback de log                                                    |
| `onDebugLog`          | `Future<void> Function(String, {required String botId})?`     | Callback de debug                                                  |

**Flux d'exécution détaillé :**

#### Phase 1 : Extraction des données de réponse

1. Extrait la configuration conditionnelle du workflow (`response['workflow']['conditional']`).
2. Détermine le type actif de réponse : `response['type']` (par défaut `'normal'`).
3. Auto-upgrade du type via `autoUpgradeType` : si le type est `'normal'` mais que les composants sont `isRichV2`, passe à `'componentV2'`.
4. Extrait :
   - `activeModalJson` : configuration modale
   - `activeComponentsJson` : configuration des composants
   - `responseText` : texte de réponse
   - `embedsRaw` : liste d'embeds

#### Phase 2 : Résolution conditionnelle

Si le workflow a une condition (`enabled == true` et `conditionVariable` non vide) :

1. Résout la variable de condition (`conditionVariable`) depuis `runtimeVariables` ou via `resolveTemplatePlaceholders`.
2. La condition est considérée comme satisfaite si la valeur résolue est non vide.
3. Si condition satisfaite :
   - `activeResponseType` ← `whenTrueType`
   - Remplace `responseText`, `embedsRaw`, `activeModalJson`, `activeComponentsJson` par les variantes `whenTrue*`
4. Si condition non satisfaite :
   - `activeResponseType` ← `whenFalseType`
   - Remplace par les variantes `whenFalse*`
5. Ré-applique `autoUpgradeType` sur les composants conditionnels.

#### Phase 3 : Résolution des templates

Applique `resolveTemplatePlaceholders` sur `responseText` pour substituer les placeholders `((variable))`.

#### Phase 4 : Branchement modal vs message

##### Branche modale (`isModal == true`)

1. Vérifie que `interaction` n'est pas null et que `activeModalJson` est non vide.
2. Parse la définition modale via `ModalDefinition.fromJson`.
3. Construit un `ModalBuilder` avec :
   - Titre et customId résolus
   - Champs de saisie (`TextInputBuilder`) avec résolution des placeholders, styles (paragraph/short), placeholders, valeurs par défaut, contraintes (required, minLength, maxLength)
4. Envoie via `interaction.respondModal()` (supporte `ApplicationCommandInteraction` et `MessageComponentInteraction`).
5. Marque l'interaction comme acquittée via `markInteractionAcknowledged`.
6. Si la modale contient des `actions` inline, enregistre un `ListenerEntry` dans `InteractionListenerRegistry` (type `'modal'`, TTL 1 heure, oneShot).

##### Branche message standard

1. **Fusion des embeds legacy** : si `embedsRaw` est vide, vérifie `response['embed']` (format legacy) et l'ajoute si non vide.
2. **Construction des embeds** (max 10) :
   - Pour chaque embed JSON : supprime `video` et `provider`.
   - Résout `title`, `description`, `url`, `timestamp`, `color`, `footer` (texte + icône), `author` (nom + url + icône), `image`, `thumbnail`.
   - Construit les champs via `buildResolvedEmbedFields`.
   - La couleur accepte les formats hexadécimaux (`#RRGGBB`) et décimaux.
3. **Construction des composants** :
   - Si `activeResponseType` est `'normal'` ou `'componentV2'` et que `activeComponentsJson` est non vide :
     - Parse via `ComponentV2Definition.fromJson`.
     - Construit via `buildComponentNodes`.
     - En mode `'normal'` : filtre pour ne garder que les `ActionRowBuilder` (compatibilité legacy).
     - En mode `'componentV2'` : conserve tous les types de composants.
4. **Détermination du flag V2** : `useV2Flag = activeResponseType == 'componentV2'`.

#### Phase 5 : Envoi

Trois chemins d'envoi selon le contexte :

##### Chemin 1 : Pas d'interaction (fallback canal)

- Requiert `gateway` et `fallbackChannelId`.
- Récupère le canal texte via `gateway.channels.get(fallbackChannelId)`.
- Si V2 : envoie via `buildComponentMessage`.
- Sinon : envoie un `MessageBuilder` standard.
- Stocke `responseMessageId`.

##### Chemin 2 : Interaction différée (`didDefer == true`)

- Construit un `CustomMessageUpdateBuilder` :
  - Contenu : `finalText` (null si V2)
  - Composants : `componentNodes`
  - Flags : 32768 si V2, sinon flags standards
  - Embeds : vides si V2, sinon `embeds`
- Utilise `updateOriginalResponse` pour mettre à jour le message de defer.
- Supporte `MessageResponse`, `ModalSubmitInteraction`, et fallback dynamique.
- Marque l'interaction comme acquittée.

##### Chemin 3 : Réponse directe

- Calcule `flagValue` : `MessageFlags.ephemeral` si éphémère, `| 32768` si V2.
- Appelle `interaction.respond()` avec un `MessageBuilder`.
- Supporte `MessageResponse`, `ModalSubmitInteraction` et fallback dynamique.
- Récupère `responseMessageId` via `fetchOriginalResponse()`.
- En cas d'erreur 40060 (déjà répondu) : marque comme acquittée.

#### Phase 6 : Post-traitement

1. **Enregistrement des bindings de composants** : si `activeComponentDefinition` est non null, appelle `registerComponentWorkflowBindings` pour enregistrer les listeners des boutons/sélecteurs dans `InteractionListenerRegistry`.
2. **Auto-suppression** : si une variable d'exécution se termine par `deleteitself` ou `deleteresponse` et vaut `'true'`, supprime la réponse originale via `deleteOriginalResponse()`.

---

### `respondToModal(gateway, interaction, response)`

Envoie une réponse modale. Fonction helper qui encapsule la logique modale de `sendWorkflowResponse`.

---

### `editOrRespond(gateway, interaction, builder)`

Édite la réponse si l'interaction a déjà reçu une réponse, sinon envoie une nouvelle réponse.

- Si `isInteractionAcknowledged(interaction)` → `editOriginalResponse` ou `sendFollowup`.
- Sinon → `respond`.

---

### `respondEphemeral(interaction, message)`

Envoie une réponse éphémère simple.

```dart
Future<void> respondEphemeral(Interaction interaction, String message)
```

- Construit un `MessageBuilder` avec le contenu texte et le flag `ephemeral`.
- Appelle `interaction.respond()`.

---

## Types de réponse supportés

| Type               | Description                                                 |
|--------------------|-------------------------------------------------------------|
| `normal`           | Message standard avec texte, embeds, composants legacy       |
| `componentV2`      | Message avec composants riches V2 (containers, sections...)  |
| `modal`            | Modale avec champs de saisie                                 |
| `ephemeral`        | Réponse éphémère visible uniquement par l'utilisateur        |
| `ephemeralConfirm` | Confirmation éphémère                                        |

---

## Flag IS_COMPONENTS_V2 (32768)

Le flag `32768` (`IS_COMPONENTS_V2`) est nécessaire lorsque des composants riches V2 sont utilisés. Sans ce flag, Discord rejette les messages contenant des composants non standards (containers, sections, thumbnails, display text, etc.).

Les composants considérés comme legacy/V1 (ne nécessitant pas le flag) sont :
- Les `ActionRow` contenant uniquement des `Button` ou `SelectMenu`

Tout autre composant (container, section, thumbnail, display text, etc.) déclenche `isRichV2 = true` et nécessite le flag.

---

## Gestion des erreurs

| Code d'erreur | Comportement                                                |
|---------------|-------------------------------------------------------------|
| `40060`       | Interaction déjà répondue → marquée comme acquittée, log debug |
| Autres        | Logguées via `onLog`                                        |

---

## Dépendances

- `template_resolver.dart` : `resolveTemplatePlaceholders`
- `embed_fields.dart` : `buildResolvedEmbedFields`
- `component_workflow_bindings.dart` : `registerComponentWorkflowBindings`
- `interaction_listener_registry.dart` : `InteractionListenerRegistry`, `ListenerEntry`, `extractListenerContext`
- `interaction_ack_state.dart` : `isInteractionAcknowledged`, `markInteractionAcknowledged`
- `custom_message_update_builder.dart` : `CustomMessageUpdateBuilder`
- `send_component_v2.dart` : `buildComponentNodes`, `buildComponentMessage`
- `types/component.dart` : `ComponentV2Definition`, `ModalDefinition`, `BcTextInputStyle`
