---
layout: doc
translation_key: docs
category: "Internals"
---

# Système d'Autocomplétion des Slash Commands

Ce document décrit le système d'autocomplétion qui alimente les champs de saisie des options de slash commands Discord. Lorsqu'un utilisateur commence à taper dans un champ configuré avec autocomplétion, le bot reçoit une interaction et répond avec une liste de suggestions.

```
┌──────────────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE DU SYSTÈME                           │
│                                                                      │
│  ┌───────────┐    ┌─────────────────┐    ┌───────────────────────┐  │
│  │ Discord   │    │  Bot Creator    │    │  Sources de données   │  │
│  │           │    │                 │    │                       │  │
│  │  User     │───▶│  CommandExecutor│───▶│  ┌─ Liste statique    │  │
│  │  tape     │    │  ._handleAuto-  │    │  ├─ Code BDFD inline │  │
│  │  un champ │    │   complete()    │    │  └─ Workflow externe  │  │
│  │           │◀───│                 │◀───│                       │  │
│  │  Reçoit   │    │  Renvoie        │    │                       │  │
│  │  les      │    │  List<ArgChoice>│    │                       │  │
│  │  choix    │    │                 │    │                       │  │
│  └───────────┘    └─────────────────┘    └───────────────────────┘  │
│                                                                      │
│  Fichiers impliqués :                                                │
│  • command_autocomplete.dart (213 lignes) — logique de résolution    │
│  • bdfd_autocomplete.dart (305 lignes) — templates de snippets BDFD  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 1. Types d'Options Supportés

Toutes les options de commande Discord ne supportent pas l'autocomplétion. La fonction `commandOptionSupportsAutocomplete()` définit le filtre :

```dart
bool commandOptionSupportsAutocomplete(CommandOptionType type) {
  return type == CommandOptionType.string ||
      type == CommandOptionType.integer ||
      type == CommandOptionType.number;
}
```

Seuls les types **string**, **integer** et **number** sont éligibles. Les types structurés (subCommand, subCommandGroup) et les types d'entités Discord (user, channel, role, mentionable, attachment, boolean) ne supportent pas l'autocomplétion personnalisée — ils utilisent les mécanismes natifs de Discord.

```
┌──────────────────────────────────────────────────────────────────────┐
│  TABLEAU DES TYPES D'OPTIONS                                         │
│                                                                      │
│  Type              Autocomplete ?    Raison                          │
│  ────────────────  ────────────────  ─────────────────────────────── │
│  string            OUI               Saisie texte libre               │
│  integer           OUI               Saisie numérique                 │
│  number            OUI               Saisie décimale                  │
│  boolean           NON               Choix binaire natif              │
│  user              NON               Sélecteur natif Discord          │
│  channel           NON               Sélecteur natif Discord          │
│  role              NON               Sélecteur natif Discord          │
│  mentionable       NON               Sélecteur natif Discord          │
│  attachment        NON               Upload fichier                   │
│  subCommand        NON               Structure de navigation          │
│  subCommandGroup   NON               Structure de navigation          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Les Trois Modes d'Autocomplétion

Le système supporte trois modes distincts, chacun adapté à un cas d'usage différent.

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  MODE 1 : static                                                    │
│  ─────────────────                                                 │
│  Liste fixe de choix définis directement dans la configuration.     │
│  Aucune exécution de code n'est nécessaire.                         │
│                                                                     │
│  Configuration :                                                    │
│  {                                                                  │
│    "mode": "static",                                                │
│    "staticChoices": [                                               │
│      {"name": "Rouge",   "value": "red"},                          │
│      {"name": "Vert",    "value": "green"},                        │
│      {"name": "Bleu",    "value": "blue"}                          │
│    ]                                                                │
│  }                                                                  │
│                                                                     │
│  Avantages : Simple, rapide, déterministe                           │
│  Inconvénients : Statique, ne peut pas s'adapter au contexte        │
│                                                                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  MODE 2 : inline                                                    │
│  ─────────────────                                                 │
│  Le code BDFD inline (défini dans la config) est exécuté à chaque   │
│  requête d'autocomplétion pour générer dynamiquement les choix.     │
│                                                                     │
│  Configuration :                                                    │
│  {                                                                  │
│    "mode": "inline",                                                │
│    "inlineActions": [                                               │
│      {"type": "sendMessage", "content": "..."}                      │
│    ]                                                                │
│  }                                                                  │
│                                                                     │
│  Avantages : Flexible, peut lire des variables et faire des calculs │
│  Inconvénients : Latence d'exécution, complexité de débogage        │
│                                                                     │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  MODE 3 : workflow                                                   │
│  ─────────────────                                                 │
│  Un workflow BDFD séparé (défini ailleurs dans le bot) est appelé.  │
│  Permet de réutiliser une logique complexe.                         │
│                                                                     │
│  Configuration :                                                    │
│  {                                                                  │
│    "mode": "workflow",                                              │
│    "workflow": "searchUsers",                                       │
│    "entryPoint": "main",                                            │
│    "arguments": {"query": "autocomplete.query"}                     │
│  }                                                                  │
│                                                                     │
│  Avantages : Réutilisable, logique centralisée, maintenable         │
│  Inconvénients : Configuration supplémentaire, couplage             │
│                                                                     │
└────────────────────────────────────────────────────────────────────┘
```

---

## 3. Configuration — Normalisation

La fonction `normalizeSerializedAutocompleteConfig()` est responsable de valider et normaliser la configuration d'autocomplétion. Elle accepte des données brutes (provenant du stockage JSON) et produit une structure canonique.

### 3.1 Flux de Normalisation

```
┌──────────────────────────────────────────────────────────────────┐
│  normalizeSerializedAutocompleteConfig(dynamic raw)               │
│                                                                   │
│  Entrée : raw (Map, JSON string, ou null)                         │
│                                                                   │
│  Étape 1 : Vérifier que raw est un Map                            │
│    └─ Non → retourne null                                        │
│                                                                   │
│  Étape 2 : Extraire et normaliser le mode                         │
│    mode = raw['mode'] → 'static', 'inline', ou 'workflow'        │
│    (par défaut : 'workflow')                                      │
│                                                                   │
│  Étape 3 : Extraire les paramètres du workflow                    │
│    • workflow  (string, défaut: '')                               │
│    • entryPoint (string, défaut: 'main')                          │
│    • arguments (Map<string, dynamic>)                             │
│                                                                   │
│  Étape 4 : Extraire les listes                                    │
│    • staticChoices → List<Map> (pour mode static)                 │
│    • inlineActions → List<Map> (pour mode inline)                 │
│                                                                   │
│  Étape 5 : Déterminer si activé (enabled)                         │
│    true si :                                                      │
│    • enabled explicitement à true                                 │
│    • OU (enabled == null) ET (workflow non vide                   │
│        OU arguments non vide OU staticChoices non vide            │
│        OU inlineActions non vide)                                 │
│                                                                   │
│  Étape 6 : Si désactivé et vide → retourne null                   │
│                                                                   │
│  Sortie : Map<String, dynamic> canonique                          │
│    {                                                              │
│      'enabled': bool,                                              │
│      'mode': 'static'|'inline'|'workflow',                       │
│      'workflow': string,                                           │
│      'entryPoint': string,                                         │
│      'arguments': Map,                                             │
│      'staticChoices': List<Map>?   (si non vide)                  │
│      'inlineActions': List<Map>?    (si non vide)                  │
│    }                                                              │
└──────────────────────────────────────────────────────────────────┘
```

```dart
Map<String, dynamic>? normalizeSerializedAutocompleteConfig(dynamic raw) {
  if (raw is! Map) return null;

  final source = Map<String, dynamic>.from(
    raw.map((key, value) => MapEntry(key.toString(), value)),
  );

  // Résolution du mode avec fallback 'workflow'
  final rawMode = (source['mode'] ?? '').toString().trim();
  final mode = rawMode == 'static'
      ? 'static'
      : rawMode == 'inline'
      ? 'inline'
      : 'workflow';

  final workflow = (source['workflow'] ?? '').toString().trim();
  final entryPoint = (source['entryPoint'] ?? 'main').toString().trim();

  // Normalisation des arguments (filtre les clés vides)
  final arguments = <String, dynamic>{};
  if (source['arguments'] is Map) {
    final rawArguments = Map<String, dynamic>.from(
      (source['arguments'] as Map).map(
        (key, value) => MapEntry(key.toString(), value),
      ),
    );
    for (final entry in rawArguments.entries) {
      final key = entry.key.trim();
      if (key.isEmpty) continue;
      arguments[key] = entry.value;
    }
  }

  // Extraction des choix statiques et actions inline
  final staticChoices = <Map<String, dynamic>>[];
  if (source['staticChoices'] is List) {
    for (final raw in (source['staticChoices'] as List)) {
      if (raw is! Map) continue;
      staticChoices.add(Map<String, dynamic>.from(
        raw.map((k, v) => MapEntry(k.toString(), v)),
      ));
    }
  }

  final inlineActions = <Map<String, dynamic>>[];
  if (source['inlineActions'] is List) {
    for (final raw in (source['inlineActions'] as List)) {
      if (raw is! Map) continue;
      inlineActions.add(Map<String, dynamic>.from(
        raw.map((k, v) => MapEntry(k.toString(), v)),
      ));
    }
  }

  // Activation automatique si du contenu est présent
  final enabled = source['enabled'] == true ||
      (source['enabled'] == null &&
          (workflow.isNotEmpty || arguments.isNotEmpty ||
              staticChoices.isNotEmpty || inlineActions.isNotEmpty));

  if (!enabled && workflow.isEmpty && arguments.isEmpty &&
      staticChoices.isEmpty && inlineActions.isEmpty) {
    return null;  // Rien à faire
  }

  return <String, dynamic>{
    'enabled': enabled,
    'mode': mode,
    'workflow': workflow,
    'entryPoint': entryPoint.isEmpty ? 'main' : entryPoint,
    'arguments': arguments,
    if (staticChoices.isNotEmpty) 'staticChoices': staticChoices,
    if (inlineActions.isNotEmpty) 'inlineActions': inlineActions,
  };
}
```

---

## 4. Résolution de l'Option Focus

Lorsqu'une interaction d'autocomplétion arrive, Discord fournit une arborescence d'options (`List<InteractionOption>`) et une seule option est marquée comme "focused" (`isFocused == true`). La fonction `findFocusedInteractionOption()` parcourt récursivement cette arborescence.

```
┌──────────────────────────────────────────────────────────────────┐
│  findFocusedInteractionOption(options)                           │
│                                                                  │
│  Entrée :                                                        │
│    ┌─ /commande                                                  │
│    │   ├─ sous-groupe: "admin"                                   │
│    │   │   └─ sous-commande: "config"                            │
│    │   │       ├─ option: "clé"     (value: "xyz")              │
│    │   │       └─ option: "valeur"  (isFocused: true) ◀── cible │
│    │   └─ ...                                                    │
│                                                                  │
│  Algorithme :                                                    │
│    1. Pour chaque option dans la liste                           │
│    2.   Si option.isFocused → retourner cette option             │
│    3.   Sinon, appel récursif sur option.options (sous-options)  │
│    4.   Si trouvé dans la récursion → retourner                  │
│    5. Retourner null si aucune option focus                      │
└──────────────────────────────────────────────────────────────────┘
```

```dart
InteractionOption? findFocusedInteractionOption(
  List<InteractionOption>? options,
) {
  if (options == null) return null;
  for (final option in options) {
    if (option.isFocused == true) return option;
    final nested = findFocusedInteractionOption(option.options);
    if (nested != null) return nested;
  }
  return null;
}
```

---

## 5. Résolution de la Configuration — `resolveAutocompleteConfigForInteraction()`

Cette fonction est le point d'entrée principal pour déterminer quelle configuration d'autocomplétion appliquer à une interaction donnée. Elle gère la navigation dans les sous-commandes et groupes.

```
┌──────────────────────────────────────────────────────────────────────┐
│  resolveAutocompleteConfigForInteraction()                            │
│                                                                       │
│  Paramètres :                                                         │
│    • storedOptions    : configuration stockée (options de la commande)│
│    • interactionOptions : options reçues de Discord                   │
│                                                                       │
│  Algorithme :                                                         │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │ 1. Trouver l'option focus (findFocusedInteractionOption)    │     │
│  │    → Si null → retourne null (rien à autocompléter)        │     │
│  │                                                             │     │
│  │ 2. Parcourir l'arborescence pour atteindre                  │     │
│  │    l'option focus :                                         │     │
│  │                                                             │     │
│  │    WHILE (vrai) :                                           │     │
│  │      ├─ Chercher un subCommandGroup dans                     │     │
│  │      │  interactionOptions                                  │     │
│  │      │  → Si trouvé : descendre dans ce groupe              │     │
│  │      │    (mettre à jour storedOptions et                   │     │
│  │      │     interactionOptions)                              │     │
│  │      │                                                      │     │
│  │      ├─ Chercher un subCommand dans                          │     │
│  │      │  interactionOptions                                  │     │
│  │      │  → Si trouvé : descendre dans cette                  │     │
│  │      │    sous-commande                                     │     │
│  │      │                                                      │     │
│  │      └─ Sinon → BREAK (niveau atteint)                      │     │
│  │                                                             │     │
│  │ 3. Chercher l'option focus dans storedOptions               │     │
│  │    → Extraire storedFocused['autocomplete']                  │     │
│  │                                                             │     │
│  │ 4. Normaliser via normalizeSerializedAutocompleteConfig()    │     │
│  └─────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────┘
```

Fonctions auxiliaires de recherche :

```dart
// Coercition de liste en Map typé
List<Map<String, dynamic>> _coerceSerializedOptions(dynamic raw) {
  if (raw is! List) return const <Map<String, dynamic>>[];
  return raw
      .whereType<Map>()
      .map((entry) => Map<String, dynamic>.from(
          entry.map((key, value) => MapEntry(key.toString(), value))))
      .toList(growable: false);
}

// Recherche insensible à la casse d'une option par nom
Map<String, dynamic>? _findSerializedOption(
  List<Map<String, dynamic>> options,
  String name,
) {
  final normalizedName = name.trim().toLowerCase();
  if (normalizedName.isEmpty) return null;
  for (final option in options) {
    final optionName = (option['name'] ?? '').toString().trim().toLowerCase();
    if (optionName == normalizedName) return option;
  }
  return null;
}
```

---

## 6. Flow d'Exécution Complet

```
┌─────────────────────────────────────────────────────────────────────────┐
│  FLOW D'EXÉCUTION D'UNE AUTOCOMPLÉTION                                  │
│                                                                          │
│  T=0  Utilisateur commence à taper dans un champ autocomplete            │
│       ┌──────────────────────────────────────────────────────┐          │
│       │  /config couleur: Rou▊                              │          │
│       └──────────────────────────────────────────────────────┘          │
│                                                                          │
│  T=1  Discord envoie une ApplicationCommandAutocompleteInteraction       │
│       au webhook du bot                                                  │
│                                                                          │
│  T=2  CommandExecutor._handleAutocomplete() intercepte l'interaction     │
│       │                                                                  │
│       ├─ 2a. Résoudre la config :                                        │
│       │      resolveAutocompleteConfigForInteraction(                    │
│       │        storedOptions, interactionOptions)                        │
│       │                                                                  │
│       ├─ 2b. Selon le mode :                                             │
│       │                                                                  │
│       │   ┌─ static ─────────────────────────────────────────┐         │
│       │   │  Filtrer staticChoices par autocomplete.query     │         │
│       │   │  (filtrage simple : le nom contient la query)    │         │
│       │   │  → List<ArgChoice>                                │         │
│       │   └──────────────────────────────────────────────────┘         │
│       │                                                                  │
│       │   ┌─ inline ─────────────────────────────────────────┐         │
│       │   │  1. Compiler le code BDFD des inlineActions       │         │
│       │   │  2. Injecter les variables d'autocomplétion :     │         │
│       │   │     • autocomplete.query = "Rou"                  │         │
│       │   │     • autocomplete.optionName = "couleur"         │         │
│       │   │     • autocomplete.optionType = "string"          │         │
│       │   │  3. Exécuter le script BDFD                       │         │
│       │   │  4. Récupérer les choix générés                   │         │
│       │   │  → List<ArgChoice>                                │         │
│       │   └──────────────────────────────────────────────────┘         │
│       │                                                                  │
│       │   ┌─ workflow ───────────────────────────────────────┐         │
│       │   │  1. Charger le workflow nommé                     │         │
│       │   │  2. Injecter arguments + variables autocomplete   │         │
│       │   │  3. Exécuter le workflow                          │         │
│       │   │  4. Récupérer les choix générés                   │         │
│       │   │  → List<ArgChoice>                                │         │
│       │   └──────────────────────────────────────────────────┘         │
│       │                                                                  │
│       └─ 2c. Envoyer la réponse à Discord                                │
│              → HTTP 200 avec la liste de ArgChoice                       │
│                                                                          │
│  T=3  Discord affiche les choix à l'utilisateur                          │
│       ┌──────────────────────────────────────────────────────┐          │
│       │  /config couleur: ▊                                  │          │
│       │  ┌─────────────────────────┐                         │          │
│       │  │ Rouge                   │                         │          │
│       │  │ Rose                    │                         │          │
│       │  │ Roux                    │                         │          │
│       │  └─────────────────────────┘                         │          │
│       └──────────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Variables Disponibles dans le Contexte d'Autocomplétion

Lors de l'exécution du code BDFD (modes inline et workflow), les variables suivantes sont automatiquement injectées dans le contexte :

```
┌──────────────────────────────────────────────────────────────────────┐
│  VARIABLES SPÉCIFIQUES À L'AUTOCOMPLÉTION                            │
│                                                                       │
│  Variable                   Description                 Exemple       │
│  ─────────────────────────  ─────────────────────────  ───────────── │
│  autocomplete.query         Texte tapé par l'utilisateur  "Rou"      │
│  autocomplete.optionName    Nom de l'option focus        "couleur"   │
│  autocomplete.optionType    Type de l'option focus       "string"    │
│                                                                       │
├──────────────────────────────────────────────────────────────────────┤
│  VARIABLES STANDARD ÉGALEMENT DISPONIBLES                             │
│                                                                       │
│  guild.id, guild.name        Informations sur le serveur              │
│  user.id, user.tag           Informations sur l'utilisateur           │
│  channel.id, channel.name    Informations sur le salon                │
│  member.nick                 Surnom du membre                         │
│  ... et toutes les autres variables standard BDFD                     │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 8. Système de Templates d'Autocomplétion (`bdfd_autocomplete.dart`)

Le fichier `bdfd_autocomplete.dart` (305 lignes) définit les snippets qui apparaissent dans l'éditeur de code lorsque l'utilisateur tape le début d'un nom de fonction.

### 8.1 Logique de Génération

```dart
String _bdfdAutocompleteSnippet(String name) {
  // 1. Vérifier les templates personnalisés
  final custom = _bdfdAutocompleteCustomTemplates[name];
  if (custom != null) return custom;

  // 2. Vérifier les fonctions sans arguments (bare functions)
  if (_bdfdAutocompleteBareFunctions.contains(name)) {
    return '$' + name;  // Ex: $authorID, $botID
  }

  // 3. Template par défaut : fonction avec crochets vides
  return '\$' + name + '[]';  // Ex: $sendMessage[]
}
```

### 8.2 Catégories de Templates

```
┌──────────────────────────────────────────────────────────────────────┐
│  TYPES DE SNIPPETS D'AUTOCOMPLÉTION                                  │
│                                                                      │
│  Template par défaut :                                               │
│    $functionName[]                                                   │
│    → Utilisé pour ~200 fonctions                                     │
│                                                                      │
│  Templates personnalisés (101 entrées) :                             │
│    • Fonctions avec casing spécial : $addField[], $author[]          │
│    • Fonctions sans arguments : $authorID, $botID, $channelID       │
│    • Blocs de contrôle multilignes :                                 │
│        $if[]\n$endif                                                 │
│        $if[]\n$else\n$endif                                          │
│        $if[]\n$elseif[]\n$else\n$endif                               │
│        $for[]\n\n$endfor                                             │
│        $loop[]\n\n$endloop                                           │
│                                                                      │
│  Fonctions bare (sans arguments, ~100 entrées) :                     │
│    $alternativeParsing, $allMembersCount, $argCount, $authorAvatar,  │
│    $authorBanner, $authorID, $authorUsername, $authorTag, ...        │
│    $botCount, $botID, $botName, $botNode, $botOwnerID, ...           │
│    $channelCount, $channelID, $channelName, $channelType, ...        │
│    $commandName, $commandType, $customID, $date, $day, ...           │
│    $guildCount, $guildIcon, $guildID, $guildName, ...                │
│    $memberCount, $messageID, $messageType, $messageURL, ...          │
│    $serverCount, $serverIcon, $serverID, $serverName, ...            │
│    $slashID, $userAvatar, $userBanner, $userID, $userTag, ...        │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 9. Résumé du Flux de Données

```
┌──────────────────────────────────────────────────────────────────┐
│                    DIAGRAMME DE SÉQUENCE                          │
│                                                                   │
│  User              Discord            Bot                   Data  │
│   │                  │                 │                      │   │
│   │──tape "Rou"─────▶│                 │                      │   │
│   │                  │──interaction───▶│                      │   │
│   │                  │  autocomplete    │                      │   │
│   │                  │                 │──resolveConfig()────▶│   │
│   │                  │                 │◀───── config ───────│   │
│   │                  │                 │                      │   │
│   │                  │                 │──[mode=inline]──────▶│   │
│   │                  │                 │  exec BDFD           │   │
│   │                  │                 │  avec query="Rou"    │   │
│   │                  │                 │◀─── résultats ──────│   │
│   │                  │                 │                      │   │
│   │                  │◀─── response ───│                      │   │
│   │                  │   [Rouge, Rose, │                      │   │
│   │◀── affichage ───│    Roux]        │                      │   │
│   │   des choix      │                 │                      │   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 10. Points d'Extension

Le système est conçu pour être extensible :

- **Ajout de nouveaux modes** : Il suffit d'ajouter un cas dans le `switch(mode)` du handler et d'implémenter la logique de résolution
- **Variables personnalisées** : Le contexte d'exécution peut être enrichi avec de nouvelles variables avant l'appel au moteur BDFD
- **Filtrage avancé** : Pour le mode static, le filtrage pourrait être amélioré (fuzzy matching, tri par pertinence) sans changer l'architecture
