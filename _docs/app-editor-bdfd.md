---
layout: doc
title: "App — Éditeur BDFD (Code)"
translation_key: docs
category: app
description: >
  Documentation de l'éditeur de code BDFD : page BdfdEditorPage avec coloration
  syntaxique, autocomplétion, guides d'indentation, signature hints, diagnostics
  de compilation, et documentation intégrée des fonctions BDFD (BdfdDocsPage).
---

# App — Éditeur BDFD (Code)

L'éditeur BDFD (Bot Designer For Discord) permet d'écrire des scripts de commande en texte brut avec une syntaxe inspirée de BDFD. Il offre coloration syntaxique, autocomplétion, guides d'indentation, hints de signature, compilation en temps réel et documentation intégrée.

## Fichiers source

```
packages/app/lib/features/bot_editor/presentation/screens/bdfd_editor_page.dart
packages/app/lib/features/bot_editor/presentation/screens/bot_sub_pages/command.create.bdfd.dart
packages/app/lib/features/bot_editor/presentation/screens/bdfd_docs.dart
```

**Classe principale** : `BdfdEditorPage` (StatefulWidget, 1363 lignes).

---

## Architecture de l'éditeur BDFD

```
┌──────────────────────────────────────────────────────────┐
│                    BdfdEditorPage                         │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Toolbar: Wrap | Guides | Diagnostics | Docs | Back │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌──────────┬─────────────────────────────────────────┐  │
│  │ Numéros  │  Zone de code                           │  │
│  │ de ligne │  ┌───────────────────────────────────┐  │  │
│  │          │  │ $sendMessage[Hello World]         │  │  │
│  │   1      │  │ $title[Mon Embed]                 │  │  │
│  │   2      │  │ $description[Description]         │  │  │
│  │   3      │  │ $color[#5865F2]                   │  │  │
│  │          │  └───────────────────────────────────┘  │  │
│  └──────────┴─────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Autocomplétion (overlay)                           │  │
│  │ > $sendMessage[...]                           ▲    │  │
│  │ > $sendEmbedMessage[...]                      █    │  │
│  │                                               ▼    │  │
│  └────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Signature hint (desktop uniquement)                │  │
│  │ $sendMessage[content;(optional) returnId]          │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## Coloration syntaxique

Le `BdfdSyntaxController` (étend `TextEditingController`) surcharge `buildTextSpan()` pour fournir une coloration syntaxique en temps réel via le lexer BDFD.

### Tokenisation

Le `BdfdLexer` découpe le texte source en tokens. Chaque token reçoit une couleur :

| Type de token | Couleur | Exemple |
|---------------|---------|---------|
| `function` | Orange syntaxe | `$sendMessage` |
| `openBracket` / `closeBracket` | Cyan syntaxe | `[` `]` |
| `semicolon` | Rouge erreur | `;` |
| Texte (défaut) | Gris syntaxe | `Hello World` |

Mécanisme de sécurité : si la sortie du tokenizer ne couvre pas exactement le texte source, l'affichage bascule en texte brut pour éviter tout désalignement du curseur.

### Support IME (composition)

Pendant la composition (saisie de caractères accentués, langues asiatiques), la région en cours de composition est soulignée, et les spans de coloration sont correctement découpées autour de cette région.

---

## Autocomplétion

L'autocomplétion s'active automatiquement quand l'utilisateur tape `$` suivi d'au moins 2 caractères alphanumériques.

### Fonctionnement

```
_findPrefixStart()              Trouve le début du préfixe ($ + identifiant)
        │
        ▼
prefix = "sendMe"  (préfixe après $, lowercase, min 2 caractères)
        │
        ▼
bdfdAutocompleteTemplates       Recherche parmi les templates connus
  .where(entry => entry.key
    .startsWith(prefix))
        │
        ▼
Entries = [                     Affichage (max 6 items)
  sendMessage,
  sendEmbedMessage,
]
```

L'utilisateur navigue avec les flèches ↑↓, sélectionne avec Entrée ou Tab. L'overlay se ferme automatiquement quand le focus est perdu.

---

## Guides d'indentation

Le `_BdfdIndentGuidesPainter` est un `CustomPainter` qui dessine des lignes verticales de guidage d'indentation :

- Chaque 2 colonnes d'indentation (espaces ou tabulations) → une ligne verticale subtile
- La ligne active (ligne du curseur) est mise en évidence en jaune
- Les colonnes d'indentation correspondant à la ligne active sont également surlignées

### Auto-indentation

Le `_BdfdAutoIndentFormatter` (TextInputFormatter) détecte les appuis sur Entrée et reproduit automatiquement l'indentation de la ligne précédente.

---

## Signature Hints (desktop uniquement)

Sur desktop, quand l'utilisateur tape `$fonction[`, un hint de signature apparaît en bas de l'éditeur :

```
$sendMessage[content;(optional) returnId]
```

Ce hint montre :
- Le nom de la fonction
- Ses paramètres (obligatoires et optionnels)
- La position actuelle du curseur dans la signature

Le hint est calculé par `bdfd_signature_hints.dart` (shared) et mis à jour à chaque frappe.

---

## Compilation et diagnostics

Le `BdfdCompiler` compile le script en temps réel :

```dart
final result = _bdfdCompiler.compile(source);
// BdfdCompileResult {
//   diagnostics: [
//     BdfdCompileDiagnostic { severity: error, message: "...", line: 3, column: 5 }
//   ]
// }
```

### Panneau de diagnostics

Intégré dans l'éditeur, le panneau affiche :

- **Aucun diagnostic** : badge vert "Aucun problème détecté"
- **Erreurs** : badge rouge avec icône d'erreur, message détaillé (ligne:colonne)
- **Avertissements** : badge orange avec icône warning

Les diagnostics en mode BDFD sont **informatifs uniquement** et ne bloquent pas la sauvegarde.

---

## Modes d'exécution (dans CommandCreatePage)

La `CommandCreatePage` expose deux modes d'exécution via `command.create.bdfd.dart` :

| Mode | Icône | Description |
|------|-------|-------------|
| **Workflow** | Account tree | Éditeur visuel par blocs (actions workflow) |
| **BDFD Script** | Code | Éditeur de code texte BDFD |

Le changement est géré par `RadioGroup<String>` avec un panneau d'information contextuel.

### Tuile BDFD intégrée

Quand le mode BDFD est actif, une tuile affiche un aperçu du code (200 premiers caractères) et un bouton "Ouvrir dans l'éditeur" qui navigue vers `BdfdEditorPage` en plein écran. Au retour, le code modifié est réinjecté dans le contrôleur et recompilé.

---

## Documentation intégrée : `BdfdDocsPage`

`BdfdDocsPage` (731 lignes) est une page de référence accessible depuis l'éditeur. Elle documente plus de **250 fonctions BDFD** organisées en catégories.

### Catégories de fonctions

| Catégorie | Nb fonctions | Exemples |
|-----------|-------------|----------|
| Messages | 20 | `sendMessage`, `reply`, `dm`, `editMessage` |
| Embeds | 13 | `title`, `description`, `color`, `footer`, `image` |
| Composants | 20 | `addButton`, `newSelectMenu`, `addActionRow` |
| Modales | 2 | `newModal`, `addTextInput` |
| Contrôle | 12 | `if`, `for`, `loop`, `eval`, `callWorkflow` |
| Gardes | 22 | `onlyForRoles`, `onlyAdmin`, `argsCheck` |
| Modération | 10 | `ban`, `kick`, `mute`, `timeout` |
| Variables | 23 | `getVar`, `setVar`, `getUserVar`, `setServerVar` |
| JSON | 19 | `jsonParse`, `jsonSet`, `jsonArray`, `jsonStringify` |
| HTTP | 9 | `httpGet`, `httpPost`, `httpAddHeader`, `httpResult` |
| Math | 15 | `calculate`, `sum`, `random`, `round`, `sqrt` |
| Texte | 19 | `charCount`, `replaceText`, `toUpperCase`, `splitText` |
| Salons | 17 | `createChannel`, `deleteChannels`, `slowmode` |
| Rôles | 20 | `createRole`, `giveRole`, `takeRole`, `hasRole` |
| Réactions | 6 | `addReactions`, `clearReactions`, `userReacted` |
| Cooldowns | 5 | `cooldown`, `serverCooldown`, `globalCooldown` |
| Webhooks | 10 | `webhookCreate`, `webhookSend`, `webhookTitle` |
| Classements | 5 | `userLeaderboard`, `getLeaderboardValue` |
| Tickets | 2 | `newTicket`, `closeTicket` |
| Divers | 40+ | `awaitFunc`, `defer`, `ephemeral`, `date`, `userInfo` |

### Fonctions documentées en détail

Certaines fonctions propres à Bot Creator ou au comportement modifié bénéficient de descriptions détaillées via les clés i18n `bdfd_docs_desc_<key>` :

- **Bot Creator uniquement** : `for`, `loop`, `callWorkflow`, `workflowResponse`, `eval`
- **Comportement modifié** : `if`, `elseif`, `try`, `stop`, `suppressErrors`, `embedSuppressErrors`, `and`, `or`, `awaitFunc`, `defer`, `ephemeral`, `jsonParse`, `jsonSet`, `jsonStringify`, `httpGet`, `httpAddHeader`, `httpResult`, `url`

### Interface de recherche

La page propose une barre de recherche qui filtre les fonctions par nom en temps réel. Chaque fonction affiche son nom, sa catégorie, et sa description (si disponible).

---

## Points clés

- **Coloration temps réel** : via `BdfdSyntaxController` qui tokenize le code à chaque frappe
- **Autocomplétion** : suggestions contextuelles (déclenchées par `$` + 2 caractères, max 6 items)
- **Guides d'indentation** : rendu CustomPainter avec surbrillance de la ligne active
- **Signature hints** : affichage de la signature des fonctions (desktop uniquement)
- **Compilation inline** : diagnostics en temps réel, non bloquants pour la sauvegarde
- **Documentation intégrée** : 250+ fonctions documentées, recherche textuelle
- **Navigation** : éditeur plein écran accessible depuis la tuile BDFD de l'éditeur de commande
