---
layout: doc
title: "Architecture — Résolveur de Templates (Placeholders)"
translation_key: docs
category: "Architecture"
description: >
  Documentation du système de résolution de placeholders ((...)) dans le moteur
  BDFD Bot Creator. Décrit la syntaxe, le fonctionnement, les opérateurs,
  l'indexation, les variables scopées, les fonctions inline et le flux complet
  de résolution des templates dans le code BDFD.
---

# Architecture — Résolveur de Templates (Placeholders)

Le **template resolver** est le composant qui remplace tous les placeholders `((key))` par leurs valeurs réelles au moment de l'exécution. Cette résolution est essentielle car le transpiler insère délibérément des placeholders dans les payloads d'actions quand une valeur n'est pas connue à la compilation.

## Introduction

Fichier principal : `utils/template_resolver.dart`. La fonction `resolveTemplatePlaceholders()` est appelée avant chaque exécution d'action pour scanner le texte et remplacer tous les placeholders par leurs valeurs runtime.

### Pourquoi des placeholders ?

Le transpiler BDFD fonctionne en deux temps :

1. **Compile-time** : le code source BDFD est parsé et transformé en `List<Action>`. Si une valeur est connue (ex: `$color[#FF0000]`), elle est insérée directement.
2. **Runtime** : si une valeur dépend d'une variable qui n'existe qu'au moment de l'exécution (ex: `$sendMessage[Hello $username]`), le transpiler **émet un placeholder** `((username))` dans le payload.

```
Source BDFD : $sendMessage[Hello $username]

Payload d'Action transpilé :
  { "content": "Hello ((username))" }

Résolution au runtime :
  ((username)) → "Jean"
  { "content": "Hello Jean" }
```

---

## Syntaxe des placeholders

### Syntaxe de base

```
((nom.attribut))
```

Le placeholder est toujours entouré de **doubles parenthèses** `((...))`. Le chemin d'accès utilise le **point** comme séparateur.

### Exemples courants

| Placeholder | Résolution | Description |
|-------------|-----------|-------------|
| `((guild.id))` | `"987654321098765432"` | ID du serveur courant |
| `((guild.name))` | `"Mon Super Serveur"` | Nom du serveur courant |
| `((author.id))` | `"123456789012345678"` | ID de l'auteur du message |
| `((author.name))` | `"Jean"` | Nom d'utilisateur de l'auteur |
| `((message.content))` | `"!ping"` | Contenu du message déclencheur |
| `((message.id))` | `"111222333444555666"` | ID du message déclencheur |
| `((channel.id))` | `"222333444555666777"` | ID du canal courant |
| `((channel.name))` | `"général"` | Nom du canal courant |
| `((member.displayName))` | `"Jean [Dev]"` | Pseudo d'affichage du membre |
| `((member.nickname))` | `"Jean"` | Surnom du membre |
| `((global.myVar))` | `"42"` | Variable globale `myVar` |
| `((lastMessageId))` | `"111222333"` | Résultat d'une action précédente |

---

## Fonctionnement du résolveur

### Les 3 étapes de la résolution

```
┌─────────────────────────────────────────────────────────────────┐
│                 RÉSOLUTION DES PLACEHOLDERS                       │
│                                                                   │
│  1. LE TRANSPILER ÉMET DES PLACEHOLDERS                           │
│     ┌─────────────────────────────────────────────────────────┐  │
│     │ Pendant la transpilation, quand une variable runtime     │  │
│     │ est rencontrée (ex: $username dans le code BDFD), le     │  │
│     │ transpiler ne peut pas la résoudre → il insère un        │  │
│     │ placeholder ((username)) dans le payload de l'Action.    │  │
│     └─────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              ▼                                    │
│  2. AVANT EXÉCUTION, resolveTemplatePlaceholders() SCANNE         │
│     ┌─────────────────────────────────────────────────────────┐  │
│     │ La fonction parse le texte du payload et détecte tous    │  │
│     │ les patterns ((...)). Pour chaque placeholder trouvé :   │  │
│     │                                                          │  │
│     │   a. Parse le chemin (ex: "author.id")                   │  │
│     │   b. Cherche la valeur dans le VariablesMap              │  │
│     │   c. Si trouvé → remplace le placeholder par la valeur   │  │
│     │   d. Si non trouvé → applique les opérateurs (fallback)  │  │
│     │   e. Si toujours rien → placeholder vide ou erreur       │  │
│     └─────────────────────────────────────────────────────────┘  │
│                              │                                    │
│                              ▼                                    │
│  3. LES VARIABLES VIENNENT DE runtime_variables.dart              │
│     ┌─────────────────────────────────────────────────────────┐  │
│     │ Le VariablesMap est hydraté à partir de deux sources :   │  │
│     │                                                          │  │
│     │   • Contexte Discord : message, author, guild, channel,  │  │
│     │     member, interaction (via event_contexts.dart)        │  │
│     │                                                          │  │
│     │   • Base de données (Store) : variables persistantes     │  │
│     │     (global, user, guild, channel, member, message)      │  │
│     │                                                          │  │
│     │ Le catalog des variables est défini dans                  │  │
│     │ variable_catalog.dart (WorkflowVariableDefinition)       │  │
│     └─────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Fonction resolveTemplatePlaceholders()

```dart
String resolveTemplatePlaceholders(
  String input,
  VariablesMap variables,
  Map<String, String> results,
) {
  // Pattern: ((...))
  final regex = RegExp(r'\(\((.+?)\)\)');
  
  return input.replaceAllMapped(regex, (match) {
    final expression = match.group(1)!;
    
    // 1. Parse l'expression (chemin, indexation, opérateurs)
    final resolved = _resolveExpression(expression, variables, results);
    
    // 2. Retourne la valeur résolue ou placeholder vide
    return resolved ?? '';
  });
}
```

### VariablesMap et runtime_variables.dart

Le `VariablesMap` est un dictionnaire hiérarchique construit dans `runtime_variables.dart` :

```dart
class VariablesMap {
  // Variables scopées (issues du contexte Discord)
  Map<String, dynamic> _scoped;
  
  // Variables persistantes (issues du Store/DB)
  Map<String, Map<String, dynamic>> _persisted;
  
  // Résultats d'actions précédentes
  Map<String, String> _results;
  
  String? resolve(String path) {
    // Parcourt le chemin pointé : "author.id" → scoped["author"]["id"]
    // Fallback sur _persisted si non trouvé dans _scoped
    // Fallback sur _results en dernier recours
  }
}
```

---

## Opérateurs

### Opérateur de fallback `|`

L'opérateur pipe `|` permet de définir une valeur de repli si la première variable est vide ou absente.

```
((source_principal|source_fallback))
```

**Exemples :**

| Expression | Comportement |
|-----------|-------------|
| `((message.mentions[0]\|author.id))` | Premier utilisateur mentionné, sinon l'ID de l'auteur |
| `((member.nickname\|author.name))` | Surnom du membre, sinon le nom d'utilisateur |
| `((channel.topic\|Aucun sujet))` | Sujet du salon, sinon "Aucun sujet" |
| `((user.bc_color\|#FF0000))` | Variable utilisateur `color`, sinon rouge par défaut |

**Code BDFD typique utilisant le fallback :**

```bdfd
$sendMessage[Bienvenue ((member.nickname|author.name)) sur le serveur !]
$sendMessage[Sujet du salon : ((channel.topic|Pas de sujet défini))]
$banMember[((message.mentions[0]|Aucun utilisateur mentionné))]
```

---

## Indexation

L'indexation permet d'accéder à un élément spécifique d'une liste ou d'un tableau.

### Indexation sur les messages

| Expression | Résultat |
|-----------|---------|
| `((message.content[0]))` | Premier mot du message |
| `((message.content[1]))` | Deuxième mot du message |
| `((message.content[-1]))` | Dernier mot du message |

**Exemple BDFD :**

```bdfd
$if[$message[0] == !ban]
  $banMember[$message[1]]
$endif
```

Ici, `$message[0]` est résolu par le transpiler en placeholder `((message.content[0]))`, qui est ensuite résolu par le template resolver.

### Indexation sur les mentions

| Expression | Résultat |
|-----------|---------|
| `((message.mentions[0]))` | ID du premier utilisateur mentionné |
| `((message.mentions[1]))` | ID du deuxième utilisateur mentionné |
| `((message.mentions[-1]))` | ID du dernier utilisateur mentionné |
| `((message.mentionRoles[0]))` | ID du premier rôle mentionné |
| `((message.mentionChannels[0]))` | ID du premier salon mentionné |

**Exemple BDFD :**

```bdfd
$banMember[$message[0]]
$sendMessage[((message.mentions[0])) a été banni.]
```

### Indexation dans les listes

```bdfd
$setVar[fruits;pomme;banane;orange]
$sendMessage[Premier fruit : $getVar[fruits][0]]
$sendMessage[Dernier fruit : $getVar[fruits][-1]]
```

---

## Variables scopées (Scoped Variables)

Les variables scopées permettent d'accéder à des données persistantes liées à une entité spécifique.

### Variables utilisateur

Syntaxe : `((user[ID].bc_nomVariable))`

```bdfd
$sendMessage[Ta couleur préférée : $getUserVar[color]]
$sendMessage[Ton score : $getUserVar[score]]
```

Résolution interne :
```
$getUserVar[score] → transpilé en placeholder → ((user[123456789].bc_score))
                     → résolu au runtime → "150"
```

### Variables de serveur

Syntaxe : `((guild.bc_nomVariable))`

```bdfd
$sendMessage[Message de bienvenue : $getGuildVar[welcome]]
$if[$getGuildVar[modLog] != ]
  $channelSendMessage[$getGuildVar[modLog];Alerte modération]
$endif
```

Résolution :
```
$getGuildVar[welcome] → ((guild.bc_welcome)) → "Bienvenue sur le serveur !"
```

### Tableau récapitulatif des scopes

| Scope | Préfixe placeholder | Exemple BDFD | Résolution |
|-------|-------------------|-------------|-----------|
| **Global** | `((global.nom))` | `$getVar[count]` | `((global.bc_count))` |
| **User** | `((user[ID].bc_nom))` | `$getUserVar[xp]` | `((user[123].bc_xp))` |
| **Guild** | `((guild.bc_nom))` | `$getGuildVar[prefix]` | `((guild.bc_prefix))` |
| **Channel** | `((channel.bc_nom))` | `$getChannelVar[topic]` | `((channel.bc_topic))` |
| **Member** | `((member.bc_nom))` | `$getMemberVar[warns]` | `((member.bc_warns))` |
| **Message** | `((message.bc_nom))` | `$getMessageVar[tag]` | `((message.bc_tag))` |

---

## Fonctions inline

Le template resolver supporte des fonctions inline qui transforment une valeur avant de l'injecter.

### `((length(source)))`

Retourne la longueur (nombre de caractères) de la source.

```
((length(Hello World))) → 11
((length(message.content))) → longueur du message déclencheur
```

```bdfd
$sendMessage[Ton message fait ((length(message.content))) caractères.]
```

### `((at(source;index)))`

Retourne l'élément à l'index donné (index basé sur les espaces/listes).

```
((at(message.content;0))) → premier mot du message
((at(message.content;1))) → deuxième mot
((at(fruits;2))) → troisième élément
```

```bdfd
$sendMessage[Premier argument : ((at(message.content;1)))]
```

### `((slice(source;start;end)))`

Retourne une sous-chaîne de `start` à `end`.

```
((slice(message.content;0;10))) → 10 premiers caractères du message
((slice(Hello World;0;5))) → "Hello"
```

```bdfd
$sendMessage[Les 50 premiers caractères : ((slice(message.content;0;50)))]
```

### Fonctions inline disponibles

| Fonction | Syntaxe | Description |
|---------|---------|-------------|
| `length` | `((length(source)))` | Longueur de la chaîne/tableau |
| `at` | `((at(source;index)))` | Élément à l'index donné |
| `slice` | `((slice(source;start;end)))` | Sous-chaîne de start à end |
| `replace` | `((replace(source;old;new)))` | Remplace old par new |
| `trim` | `((trim(source)))` | Supprime les espaces au début et à la fin |
| `lower` | `((lower(source)))` | Convertit en minuscules |
| `upper` | `((upper(source)))` | Convertit en majuscules |
| `escape` | `((escape(source)))` | Échappe les caractères spéciaux |
| `urlEncode` | `((urlEncode(source)))` | Encode pour URL |
| `jsonStringify` | `((jsonStringify(source)))` | Convertit en chaîne JSON |
| `jsonParse` | `((jsonParse(source)))` | Parse une chaîne JSON |

---

## Flux complet de résolution

### Exemple pas à pas

Soit le code BDFD suivant :

```bdfd
$sendMessage[
  Bienvenue ((member.nickname|author.name)) !
  Ton ID : ((author.id))
  Message : ((message.content))
  Mentions : ((length(message.mentions)))
]
```

**Étape 1 : Compilation BDFD → AST**

Le parser produit un AST représentant l'appel `$sendMessage` avec un bloc de texte contenant des références de variables.

**Étape 2 : Transpilation AST → Action**

Le transpiler détecte que `member.nickname`, `author.name`, `author.id`, `message.content`, et `message.mentions` sont des variables runtime. Il émet une action avec le payload :

```json
{
  "type": "sendMessage",
  "payload": {
    "channelId": "((channel.id))",
    "content": "Bienvenue ((member.nickname|author.name)) !\nTon ID : ((author.id))\nMessage : ((message.content))\nMentions : ((length(message.mentions)))"
  }
}
```

**Étape 3 : Avant exécution — resolveTemplatePlaceholders()**

Le `WorkflowExecutor` appelle `resolveTemplatePlaceholders()` sur le payload. Le VariablesMap est hydraté avec les données du contexte :

```
VariablesMap :
  member.nickname = "Jean"
  author.name = "JeanDupont"
  author.id = "123456789"
  message.content = "!hello @Bot"
  message.mentions = ["111222333"]
  channel.id = "987654321"
```

Résolution séquentielle :

```
((member.nickname|author.name))
  → member.nickname = "Jean" (trouvé, pas besoin du fallback)
  → "Jean"

((author.id))
  → "123456789"

((message.content))
  → "!hello @Bot"

((length(message.mentions)))
  → message.mentions = ["111222333"]
  → length(["111222333"]) = 1
  → "1"
```

**Étape 4 : Payload résolu**

```json
{
  "channelId": "987654321",
  "content": "Bienvenue Jean !\nTon ID : 123456789\nMessage : !hello @Bot\nMentions : 1"
}
```

**Étape 5 : Exécution**

Le `MessagingExecutor` envoie le message avec le contenu résolu au canal `987654321`.

---

## La chaîne de résolution complète

```
┌──────────────────────────────────────────────────────────────────┐
│              CHAÎNE DE RÉSOLUTION DES PLACEHOLDERS                │
│                                                                    │
│  Source BDFD                                                       │
│  $sendMessage[Hello ((username))]                                  │
│       │                                                            │
│       ▼                                                            │
│  ┌──────────────────┐                                              │
│  │ Transpiler        │  Émet les placeholders dans les payloads   │
│  │ (compile-time)    │  pour toutes les valeurs non résolubles    │
│  └────────┬─────────┘                                              │
│           │                                                        │
│           ▼                                                        │
│  Action { payload: { content: "Hello ((username))" } }             │
│           │                                                        │
│           ▼                                                        │
│  ┌──────────────────┐                                              │
│  │ WorkflowExecutor  │  Avant chaque Action :                      │
│  │ executeActions()  │  → hydrateRuntimeVariables()                │
│  └────────┬─────────┘  → resolveTemplatePlaceholders()             │
│           │                                                        │
│           ▼                                                        │
│  ┌──────────────────┐                                              │
│  │ Template Resolver │  Scanne le texte pour ((...))               │
│  │                   │  → Parse l'expression                       │
│  │                   │  → Cherche dans VariablesMap                │
│  │                   │  → Applique opérateurs (fallback |)         │
│  │                   │  → Résout indexation [n]                    │
│  │                   │  → Évalue fonctions inline                  │
│  └────────┬─────────┘                                              │
│           │                                                        │
│           ▼                                                        │
│  Payload résolu : { content: "Hello Jean" }                        │
│           │                                                        │
│           ▼                                                        │
│  ┌──────────────────┐                                              │
│  │ ActionHandler     │  Dispatch l'action au bon executor          │
│  │ handleAction()    │  avec le payload résolu                     │
│  └──────────────────┘                                              │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Fichiers source

| Fichier | Rôle |
|---------|------|
| `utils/template_resolver.dart` | Fonction `resolveTemplatePlaceholders()` : scanne et remplace les `((...))` |
| `runtime_variables.dart` | Construction du `VariablesMap` : hydratation depuis le contexte Discord + DB |
| `variable_catalog.dart` | Définition de toutes les variables disponibles (`WorkflowVariableDefinition`) |
| `bdfd_ast_transpiler.dart` | Transpiler qui émet les placeholders dans les payloads |
| `workflow_executor.dart` | Orchestre l'hydratation et appelle `resolveTemplatePlaceholders()` avant exécution |
| `actions/executors/operations_expander.dart` | Expansion des placeholders et opérations complexes dans les payloads |
