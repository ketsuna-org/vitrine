---
layout: doc
title: "Système — Embed Fields"
translation_key: docs
category: systems
description: >
  Documentation du constructeur de champs d'embed Discord : résolution de templates,
  parsing inline, gestion des champs statiques et dynamiques, limitation Discord.
---

# Système — Embed Fields

Le module **Embed Fields** est responsable de la construction de la liste de champs (`EmbedFieldBuilder`) pour les embeds Discord, à partir d'une définition JSON. Il gère les champs statiques, les champs dynamiques (via template), la résolution des templates BDFD, le parsing de l'attribut `inline`, et la limite de 25 champs imposée par Discord. Il est implémenté dans `packages/shared/lib/utils/embed_fields.dart` (86 lignes).

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MODULE EMBED FIELDS                                │
│                                                                       │
│  buildResolvedEmbedFields({ embedJson, resolve, maxFields=25 })       │
│                                                                       │
│  1. Traitement des champs statiques (embedJson['fields'])             │
│     ├─ Itération sur chaque entrée                                    │
│     ├─ Résolution name/value via resolve()                            │
│     ├─ Parsing inline (bool, 'yes'/'true'/'1'/'on')                  │
│     └─ Ajout à la liste (limité à maxFields)                          │
│                                                                       │
│  2. Traitement des champs dynamiques (embedJson['fieldsTemplate'])    │
│     ├─ Résolution du template                                         │
│     ├─ Décodage JSON (jsonDecode + decodeJsonStringIfNeeded)          │
│     ├─ Itération sur le tableau dynamique                             │
│     └─ Ajout à la liste (limité à maxFields)                          │
│                                                                       │
│  3. Retourne List<EmbedFieldBuilder>                                  │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Fonction principale

### `buildResolvedEmbedFields({embedJson, resolve, maxFields})`

```dart
List<EmbedFieldBuilder> buildResolvedEmbedFields({
  required Map<String, dynamic> embedJson,
  required String Function(String) resolve,
  int maxFields = 25,
})
```

| Paramètre    | Type                           | Défaut | Description                                      |
|--------------|--------------------------------|--------|--------------------------------------------------|
| `embedJson`  | `Map<String, dynamic>`         | requis | Définition JSON de l'embed (inclut `fields` et `fieldsTemplate`) |
| `resolve`    | `String Function(String)`      | requis | Fonction de résolution de templates BDFD         |
| `maxFields`  | `int`                          | `25`   | Nombre maximum de champs (limite Discord)        |

Retourne une `List<EmbedFieldBuilder>` prête à être injectée dans un `EmbedBuilder`.

---

## Algorithme détaillé

### Phase 1 : Champs statiques

```dart
final staticFields = (embedJson['fields'] as List?)?.whereType<Map>() ?? const [];
for (final rawField in staticFields) {
  addField(rawField);
}
```

Extrait le tableau `fields` du JSON, filtre pour ne garder que les entrées de type `Map`, et les traite une par une via `addField`.

### Phase 2 : Champs dynamiques

```dart
final fieldsTemplate = (embedJson['fieldsTemplate'] ?? '').toString().trim();
if (fieldsTemplate.isEmpty) return fields;

final resolved = resolve(fieldsTemplate).trim();
final decoded = decodeJsonStringIfNeeded(resolved);
dynamic dynamicFields = decoded;
if (dynamicFields is String) {
  dynamicFields = jsonDecode(dynamicFields);
}
if (dynamicFields is! List) return fields;

for (final rawField in dynamicFields) {
  addField(rawField);
}
```

1. Récupère le template `fieldsTemplate` du JSON (chaîne brute contenant des templates BDFD)
2. Résout les templates via `resolve()`
3. Décode le résultat :
   - `decodeJsonStringIfNeeded(resolved)` gère les chaînes JSON échappées
   - Si le résultat est encore une `String`, applique `jsonDecode`
   - Si ce n'est pas une `List`, retourne les champs existants (pas d'erreur)
4. Itère sur chaque entrée du tableau dynamique via `addField`

Les erreurs de parsing JSON sont silencieusement ignorées (try/catch) pour éviter de casser l'embed entier.

---

## Fonction interne `addField`

```dart
void addField(dynamic rawField) {
  if (fields.length >= maxFields || rawField is! Map) return;

  final field = Map<String, dynamic>.from(
    rawField.map((key, value) => MapEntry(key.toString(), value)),
  );

  final name = resolve((field['name'] ?? '').toString()).trim();
  final value = resolve((field['value'] ?? '').toString()).trim();
  if (name.isEmpty || value.isEmpty) return;

  // Parsing inline
  final inlineRaw = field['inline'];
  bool isInline = false;
  if (inlineRaw is bool) {
    isInline = inlineRaw;
  } else if (inlineRaw != null) {
    final resolvedInline = resolve(inlineRaw.toString()).trim().toLowerCase();
    isInline = resolvedInline == 'yes' ||
               resolvedInline == 'true' ||
               resolvedInline == '1' ||
               resolvedInline == 'on';
  }

  fields.add(EmbedFieldBuilder(name: name, value: value, isInline: isInline));
}
```

### Étapes de traitement d'un champ

1. **Garde-fou limite** : si `fields.length >= maxFields` ou `rawField` n'est pas une `Map` → retour immédiat
2. **Normalisation des clés** : convertit toutes les clés de la Map en `String`
3. **Résolution name/value** : applique `resolve()` sur les chaînes, puis `trim()`. Si l'une est vide après résolution → champ ignoré
4. **Parsing inline** :

| Type de `inlineRaw`   | Comportement                                      |
|-----------------------|---------------------------------------------------|
| `bool`                | Utilisé directement (`isInline = inlineRaw`)      |
| `null`                | `isInline = false`                                |
| `String` (ou autre)   | Résout via `resolve()`, puis compare avec `'yes'`, `'true'`, `'1'`, `'on'` (insensible à la casse) |

5. **Ajout** : crée un `EmbedFieldBuilder(name, value, isInline)` et l'ajoute à la liste

---

## Gestion de la limite `maxFields`

La limite est vérifiée à **chaque** appel à `addField`. Dès que `fields.length >= maxFields` :

- Les champs statiques restants sont ignorés
- Les champs dynamiques ne sont pas traités (vérification entre les phases 1 et 2)

```dart
// Entre les phases
if (fields.length >= maxFields) return fields;
```

La valeur par défaut `25` correspond à la limite maximale de champs imposée par l'API Discord pour un embed.

---

## Format du JSON d'entrée

```json
{
  "fields": [
    {
      "name": "Statistique",
      "value": "Valeur: {var}",
      "inline": true
    }
  ],
  "fieldsTemplate": "$getGlobalUserVar[fields_config]"
}
```

| Champ             | Type             | Description                                           |
|-------------------|------------------|-------------------------------------------------------|
| `fields`          | `List<Map>?`     | Champs statiques (définis directement dans le JSON)   |
| `fieldsTemplate`  | `String?`        | Template BDFD produisant un tableau JSON de champs    |
| `name`            | `String`         | Nom du champ (supporte les templates)                 |
| `value`           | `String`         | Valeur du champ (supporte les templates)              |
| `inline`          | `bool`/`String`  | Affichage en ligne (booléen ou chaîne résolvable)     |

Les champs statiques et dynamiques sont combinés : les statiques d'abord, puis les dynamiques, dans la limite de `maxFields`.

---

## Résilience

Le module est conçu pour être **tolérant aux erreurs** :

| Situation                            | Comportement                        |
|--------------------------------------|-------------------------------------|
| `fields` absent ou vide              | Aucun champ statique ajouté         |
| `fieldsTemplate` absent ou vide      | Aucun champ dynamique ajouté        |
| `fieldsTemplate` malformé (JSON)     | Erreur ignorée, retour des champs existants |
| `fieldsTemplate` résolu en non-array | Retour des champs existants         |
| Champ avec `name` ou `value` vide    | Champ ignoré                        |
| Entrée non-Map dans le tableau       | Ignorée                             |
| Dépassement de `maxFields`           | Troncature silencieuse              |

Aucune exception n'est propagée hors du module — les erreurs de parsing dynamique sont capturées par le `try/catch` englobant.

---

## Graphe de dépendances

```
buildResolvedEmbedFields
├── resolve (injecté) → TemplateResolver
├── decodeJsonStringIfNeeded (importé de template_resolver.dart)
└── EmbedFieldBuilder (nyxx)
    ├── name: String
    ├── value: String
    └── isInline: bool
```

---

## Utilisation dans le runtime

`buildResolvedEmbedFields` est appelé depuis l'exécuteur de commandes (`command_executor.dart`) lors de la construction des messages de réponse. La fonction `resolve` injectée est le `TemplateResolver` standard qui évalue les templates BDFD (`$varName`, `$functionName[...]`, etc.) dans le contexte des variables runtime.
