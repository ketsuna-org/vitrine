---
layout: doc
title: $isSlash
translation_key: docs
category: "Math & Text"
function_name: isSlash
syntax: $isSlash
description: Vérifie si la commande a été déclenchée par une commande slash.
parameters: []
returns:
  - type: boolean
    description: true si déclenchée par slash command, false si commande prefix.
related:
  - $commandType
  - $commandName
  - $isTicket
examples:
  - description: Vérifier le type de déclenchement
    code: |
      $if[$isSlash==true]
        $sendMessage[Commande slash détectée.]
      $else
        $sendMessage[Commande prefix détectée.]
      $endif
  - description: Réponse différenciée
    code: |
      $if[$isSlash==true]
        $sendEphemeral[Réponse privée en slash.]
      $else
        $sendMessage[Réponse publique en prefix.]
      $endif
---

# $isSlash

La fonction `$isSlash` **vérifie si la commande en cours a été déclenchée via une commande slash** (application command) plutôt qu'une commande prefix classique.

## Syntaxe

```
$isSlash
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Booléen
- `true` si la commande a été invoquée via `/commande`.
- `false` si elle a été invoquée via le préfixe (`!commande`, `?commande`, etc.).

## Comportement

- Permet d'adapter le comportement selon le mode d'invocation.
- Utile pour envoyer des réponses éphémères en slash (`$sendEphemeral[]`).
- Sans paramètre : contexte de la commande en cours uniquement.

## Exemples

### Réponse adaptative

```bdfd
$if[$isSlash==true]
  $sendEphemeral[✅ Action effectuée avec succès !]
$else
  $sendMessage[✅ Action effectuée avec succès !]
$endif
```

### Log de diagnostic

```bdfd
$if[$isSlash==true]
  $log[Commande /$commandName exécutée par $userName]
$else
  $log[Commande $commandTrigger exécutée par $userName]
$endif
```

### Message d'information

```bdfd
$var[type;$if[$isSlash==true]Slash$elsePrefix$endif]
$title[ℹ️ Information commande]
$description[
**Nom :** $commandName
**Type :** $var[type]
**Dossier :** $commandFolder
]
$color[$if[$isSlash==true]#5865F2$else#57F287$endif]
$sendMessage[]
```

### Commande hybride

```bdfd
;; Cette commande fonctionne en prefix et en slash
$if[$isSlash==true]
  $var[args;$slashOption[1]]
$else
  $var[args;$message[1]]
$endif

;; Traitement commun
$sendMessage[Vous avez fourni : $var[args]]
```

## Notes

- `$isSlash` ne prend pas de paramètres.
- Pour obtenir le type précis de la commande, utilisez `$commandType`.
- Les réponses éphémères (`$sendEphemeral[]`) ne fonctionnent qu'en slash.
- `$isSlash` est évalué dans le contexte de la commande en cours d'exécution.
