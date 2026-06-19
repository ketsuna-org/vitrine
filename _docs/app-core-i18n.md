---
layout: doc
title: "App — Système d'internationalisation (i18n)"
translation_key: docs
category: app
description: >
  Documentation du système d'internationalisation de l'application Flutter Bot Creator :
  support 6 langues via ARB files, Provider ChangeNotifier, détection de la locale système,
  persistance SharedPreferences et extensions BuildContext pour un accès rapide aux traductions.
---

# App — Système d'internationalisation (i18n)

Le système **i18n** de Bot Creator permet la traduction de l'interface en **6 langues** (Anglais, Français, Allemand, Portugais, Turc, Japonais). Il repose sur le mécanisme standard de Flutter (`AppLocalizations`), enrichi d'un `Provider` pour le changement dynamique de locale et d'extensions pour un accès simplifié dans les widgets.

## Fichiers source

```
packages/app/lib/core/i18n/
├── i18n.dart              — Point d'entrée, exporte tout le module (14 lignes)
├── app_locale.dart        — Types AppLocale et AppLocalePreference (54 lignes)
├── locale_provider.dart   — Provider ChangeNotifier pour la locale active (87 lignes)
├── extensions.dart        — Extension BuildContext pour accès rapide (12 lignes)
└── l10n/                  — Fichiers ARB compilés (un par langue)
    ├── app_localizations.dart
    ├── app_localizations_en.dart
    ├── app_localizations_fr.dart
    ├── app_localizations_de.dart
    ├── app_localizations_pt.dart
    ├── app_localizations_tr.dart
    └── app_localizations_ja.dart
```

---

## Architecture globale

```
┌──────────────────────────────────────────────────────────────┐
│                    SYSTÈME i18n                               │
│                                                               │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │   LocaleProvider     │  │    AppLocalizations (ARB)     │  │
│  │   (ChangeNotifier)   │  │                                │  │
│  │                      │  │  • 6 langues supportées       │  │
│  │ • Préférence locale  │  │  • Généré depuis .arb         │  │
│  │ • Persistance (SP)   │  │  • Méthode of(context)        │  │
│  │ • Détection système  │  │                                │  │
│  └─────────┬────────────┘  └──────────────┬─────────────────┘  │
│            │                               │                    │
│            └───────────┬───────────────────┘                    │
│                        │                                        │
│            ┌───────────▼────────────┐                          │
│            │  AppLocalizationsX     │                          │
│            │  (extension BuildCtx)  │                          │
│            │                        │                          │
│            │  context.tr.app_title  │                          │
│            └────────────────────────┘                          │
└──────────────────────────────────────────────────────────────┘
```

---

## AppLocale — Langues supportées

Fichier : `app_locale.dart`

Deux énumérations distinctes permettent de séparer le concept de **langue active** de celui de **préférence utilisateur** :

### AppLocale (langue effective)

```dart
enum AppLocale {
  en('English', 'en'),
  fr('Français', 'fr'),
  de('Deutsch', 'de'),
  pt('Português', 'pt'),
  tr('Türkçe', 'tr'),
  ja('日本語', 'ja');

  final String label;  // Nom affiché dans l'UI
  final String code;   // Code ISO 639-1
}
```

### AppLocalePreference (choix utilisateur)

```dart
enum AppLocalePreference {
  system('Automatic', 'system'),  // Détection automatique
  en('English', 'en'),
  fr('Français', 'fr'),
  de('Deutsch', 'de'),
  pt('Português', 'pt'),
  tr('Türkçe', 'tr'),
  ja('日本語', 'ja');
}
```

La valeur `system` indique que l'utilisateur souhaite suivre la langue du système d'exploitation. Les 6 autres valeurs forcent une langue spécifique.

### Détection automatique

```dart
AppLocale detectSystemLocale(Locale? systemLocale) {
  if (systemLocale == null) return AppLocale.en;
  final langCode = systemLocale.languageCode.toLowerCase();
  // Correspondance exacte sur le code de langue
  // Fallback: anglais si la langue système n'est pas supportée
}
```

La fonction `detectSystemLocale()` lit la `languageCode` de la `Locale` du `PlatformDispatcher`. Si le code correspond à l'une des 6 langues supportées, elle est utilisée ; sinon l'anglais sert de fallback.

---

## LocaleProvider — Gestion dynamique de la locale

Fichier : `locale_provider.dart`

`LocaleProvider` est un **ChangeNotifier** conçu pour être utilisé avec le package `provider`. Il permet de changer la langue de l'application à chaud, sans redémarrage.

### État interne

| Propriété | Type | Description |
|-----------|------|-------------|
| `preference` | `AppLocalePreference` | Choix utilisateur (inclut `system`) |
| `locale` | `AppLocale` | Langue effective résolue |

### Initialisation

```dart
LocaleProvider() {
  _locale = detectSystemLocale(ui.PlatformDispatcher.instance.locale);
  _load();
}
```

1. Détection immédiate de la locale système
2. Chargement asynchrone de la préférence persistée via `SharedPreferences`
3. Si une préférence est trouvée, elle écrase la détection système

### Résolution de la locale

```dart
AppLocale _resolveLocale(AppLocalePreference preference) {
  switch (preference) {
    case AppLocalePreference.system:
      return detectSystemLocale(ui.PlatformDispatcher.instance.locale);
    case AppLocalePreference.fr:  return AppLocale.fr;
    case AppLocalePreference.de:  return AppLocale.de;
    // ... etc
  }
}
```

### Persistance

- **Clé SharedPreferences** : `app_locale`
- Si la préférence est `system`, la clé est **supprimée** des prefs (pas de valeur stockée)
- Si une langue spécifique est choisie, son `code` (ex: `"fr"`) est stocké

### API publique

| Méthode | Description |
|---------|-------------|
| `setPreference(AppLocalePreference)` | Change la locale et persiste |
| `resetToSystem()` | Re-passe en détection automatique |

---

## Extensions BuildContext

Fichiers : `i18n.dart` et `extensions.dart`

Deux extensions identiques sont définies (l'une dans `i18n.dart`, l'autre dans `extensions.dart`) pour faciliter l'accès aux traductions depuis n'importe quel widget :

```dart
extension AppLocalizationsX on BuildContext {
  AppLocalizations get tr => AppLocalizations.of(this);
}
```

**Usage dans les widgets** :

```dart
Text(context.tr.app_title)
Text(context.tr.settings_diagnostics_page_title)
```

L'extension est accessible partout où un `BuildContext` est disponible, ce qui rend le code de traduction extrêmement concis.

---

## AppLocalizations — Fichiers ARB

Le dossier `l10n/` contient les classes générées à partir des fichiers ARB (Application Resource Bundle). Chaque langue possède sa propre classe :

- `AppLocalizations` — Classe de base abstraite
- `AppLocalizationsEn` — Anglais (fallback)
- `AppLocalizationsFr` — Français
- `AppLocalizationsDe` — Allemand
- `AppLocalizationsPt` — Portugais
- `AppLocalizationsTr` — Turc
- `AppLocalizationsJa` — Japonais

La méthode statique `AppLocalizations.of(context)` retourne l'instance correspondant à la locale actuelle, telle que configurée dans le `MaterialApp` via les propriétés `localizationsDelegates` et `supportedLocales`.

---

## Intégration dans l'application

Pour utiliser le système i18n dans un widget Flutter :

```dart
// 1. Dans MaterialApp, utiliser les delegates standards :
MaterialApp(
  localizationsDelegates: AppLocalizations.localizationsDelegates,
  supportedLocales: AppLocalizations.supportedLocales,
  // ...
);

// 2. Dans un widget, accéder aux traductions :
@override
Widget build(BuildContext context) {
  return Text(context.tr.app_title);
}

// 3. Pour changer la langue :
final localeProvider = context.read<LocaleProvider>();
await localeProvider.setPreference(AppLocalePreference.fr);
```

Le `LocaleProvider` est typiquement fourni en haut de l'arbre via `ChangeNotifierProvider` et écouté par le `MaterialApp` pour reconstruire l'interface avec la nouvelle locale.
