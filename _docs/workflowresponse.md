---
layout: doc
title: $workflowResponse
translation_key: docs
category: "Workflows & Automations"
function_name: workflowResponse
syntax: $workflowResponse
description: Retourne la dernière réponse ou valeur produite par un workflow BDFD. Utile pour enchaîner des workflows ou récupérer des résultats.
parameters: []
returns:
  - type: string
    description: La réponse du dernier workflow exécuté.
related:
  - $workflow
  - $input
  - $customID
examples:
  - description: Récupérer la réponse d'un workflow
    code: |
      $workflow[monWorkflow;param1;param2]
      $sendMessage[Réponse du workflow : $workflowResponse]
---
# $workflowResponse

La fonction `$workflowResponse` retourne la **dernière réponse** produite par un workflow BDFD.

## Syntaxe

```
$workflowResponse
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Chaîne
- La valeur retournée par le dernier workflow exécuté.
- Chaîne vide si aucun workflow n'a encore été appelé.

## Comportement

- Stocke la réponse du dernier `$workflow[]` appelé.
- La valeur persiste jusqu'à la fin de la commande ou jusqu'au prochain workflow.
- Permet de composer des chaînes de workflows.

## Exemples

### Appeler et récupérer

```bdfd
$workflow[calculSalaire;$authorID]
$sendMessage[Votre salaire calculé : $workflowResponse €]
```

### Chaîne de workflows

```bdfd
$workflow[verifyUser;$authorID]
$if[$workflowResponse==ok]
  $workflow[processOrder;$input]
  $sendMessage[Commande traitée : $workflowResponse]
$else
  $sendMessage[Vérification échouée.]
$endif
```

### Log de workflow

```bdfd
$workflow[dailyReward;$authorID]
$log[Daily reward pour $username : $workflowResponse]
$sendMessage[$workflowResponse]
```

### Workflow conditionnel

```bdfd
$workflow[checkBan;$mentioned[1]]
$if[$workflowResponse!="clean"]
  $sendMessage[Cet utilisateur est banni : $workflowResponse]
$else
  $sendMessage[Aucun bannissement trouvé.]
$endif
```

## Notes

- `$workflowResponse` est écrasé à chaque nouvel appel de `$workflow[]`.
- Stockez la valeur dans une variable si vous devez la réutiliser : `$let[rep;$workflowResponse]`.
- La réponse dépend entièrement de ce que le workflow retourne via `$sendMessage` ou `$return`.
