const fs = require('fs');
const path = require('path');

const docsDir = '/home/jeremy/Code/vitrine/_docs';

const files = fs.readdirSync(docsDir)
  .filter(f => f.endsWith('.md'))
  .sort()
  .filter(f => f >= 'addactionrow.md' && f <= 'executiontime.md');

console.log(`Processing ${files.length} files`);

// Step 1: Structural replacements (headers, tables)
function applyStructural(text) {
  let t = text;
  // Section headers
  t = t.replace(/^## Syntaxe\b/gm, '## Syntax');
  t = t.replace(/^## Paramètres\b/gm, '## Parameters');
  t = t.replace(/^## Retourne\b/gm, '## Returns');
  t = t.replace(/^## Exemples\b/gm, '## Examples');
  t = t.replace(/^## Fonctions liées\b/gm, '## Related Functions');
  t = t.replace(/^## Valeur de retour\b/gm, '## Return value');
  t = t.replace(/^## Comportement\b/gm, '## Behavior');
  t = t.replace(/^## Utilisation\b/gm, '## Usage');
  t = t.replace(/^## Différence avec (.+)/gm, '## Difference from $1');
  t = t.replace(/^## Gestion des interactions\b/gm, '## Handling interactions');
  t = t.replace(/^## Gestion de l'interaction\b/gm, '## Handling the interaction');
  t = t.replace(/^## Styles disponibles\b/gm, '## Available styles');
  t = t.replace(/^## Types de salons \(channelTypes\)/gm, '## Channel types (channelTypes)');
  t = t.replace(/^## Types de fichiers supportés\b/gm, '## Supported file types');
  t = t.replace(/^## Types de\b/gm, '## Types of');
  
  // Table headers
  t = t.replace(/\| Paramètre \|/g, '| Parameter |');
  t = t.replace(/\| Obligatoire \|/g, '| Required |');
  t = t.replace(/\| Défaut \|/g, '| Default |');
  
  // Table content
  t = t.replace(/\| Non \|/g, '| No |');
  t = t.replace(/\| Oui \|/g, '| Yes |');
  t = t.replace(/\| Dernier groupe \|/g, '| Last group |');
  t = t.replace(/\| Dernière galerie \|/g, '| Last gallery |');
  
  return t;
}

// Step 2: French-to-English translation (ordered - specific before general)
function translateFrench(text) {
  let t = text;
  
  const rules = [
    // VERY SPECIFIC multi-word phrases first
    [/la fonction `\$([^`]+)` (permet d'|permet de )/g, 'the `$$$1` function '],
    [/La fonction `\$([^`]+)` (permet d'|permet de )/g, 'The `$$$1` function '],
    [/permet d'ajouter/g, 'allows adding'],
    [/permet de mesurer/g, 'allows measuring'],
    [/permet de définir/g, 'allows setting'],
    [/permet de créer/g, 'allows creating'],
    [/permet de modifier/g, 'allows modifying'],
    [/permet de supprimer/g, 'allows deleting'],
    [/permet de récupérer/g, 'allows retrieving'],
    [/permet de contrôler/g, 'allows controlling'],
    [/permet de structurer/g, 'allows structuring'],
    [/permet de filtrer/g, 'allows filtering'],
    [/permet de désactiver/g, 'allows disabling'],
    [/permet de changer/g, 'allows changing'],
    [/permet d'afficher/g, 'allows displaying'],
    [/permet d'organiser/g, 'allows organizing'],
    [/permet d'utiliser/g, 'allows using'],
    [/permet aux utilisateurs de /g, 'allows users to '],
    [/Permet aux utilisateurs de /g, 'Allows users to '],
    [/permet à l'utilisateur de /g, 'allows the user to '],
    [/Permet à l'utilisateur de /g, 'Allows the user to '],
    [/permet de /g, 'allows '],
    [/Permet de /g, 'Allows '],
    [/permet d'/g, 'allows '],
    [/Permet d'/g, 'Allows '],
    
    // Function descriptions - common patterns
    [/^description: (Ajoute|Crée|Définit|Retourne|Récupère|Supprime|Modifie|Vérifie|Calcule|Mesure|Convertit|Formate|Active|Désactive|Envoie|Applique|Combine|Stocke|Fournit|Affiche|Bannit|Débannit|Renomme|Change|Déplace|Copie|Fusionne|Sépare|Compte|Trie|Filtre|Inverse|Arrondit|Génère|Exécute|Démarre|Arrête|Initialise|Configure|Réinitialise|Efface|Sauvegarde|Charge|Lit|Écrit)/g, (match, verb) => {
      const verbMap = {
        'Ajoute': 'Adds', 'Crée': 'Creates', 'Définit': 'Sets', 'Retourne': 'Returns',
        'Récupère': 'Retrieves', 'Supprime': 'Deletes', 'Modifie': 'Modifies', 'Vérifie': 'Checks',
        'Calcule': 'Calculates', 'Mesure': 'Measures', 'Convertit': 'Converts', 'Formate': 'Formats',
        'Active': 'Enables', 'Désactive': 'Disables', 'Envoie': 'Sends', 'Applique': 'Applies',
        'Combine': 'Combines', 'Stocke': 'Stores', 'Fournit': 'Provides', 'Affiche': 'Displays',
        'Bannit': 'Bans', 'Débannit': 'Unbans', 'Renomme': 'Renames', 'Change': 'Changes',
        'Déplace': 'Moves', 'Copie': 'Copies', 'Fusionne': 'Merges', 'Sépare': 'Splits',
        'Compte': 'Counts', 'Trie': 'Sorts', 'Filtre': 'Filters', 'Inverse': 'Reverses',
        'Arrondit': 'Rounds', 'Génère': 'Generates', 'Exécute': 'Executes', 'Démarre': 'Starts',
        'Arrête': 'Stops', 'Initialise': 'Initializes', 'Configure': 'Configures',
        'Réinitialise': 'Resets', 'Efface': 'Clears', 'Sauvegarde': 'Saves',
        'Charge': 'Loads', 'Lit': 'Reads', 'Écrit': 'Writes'
      };
      return `description: ${verbMap[verb] || verb}`;
    }],
    
    // Article + noun combinations
    [/d'un embed Discord/g, 'of a Discord embed'],
    [/d'un embed/g, 'of an embed'],
    [/d'un message/g, 'of a message'],
    [/d'un salon/g, 'of a channel'],
    [/d'un rôle/g, 'of a role'],
    [/d'un serveur/g, 'of a server'],
    [/d'un utilisateur/g, 'of a user'],
    [/d'un conteneur/g, 'of a container'],
    [/d'un fichier/g, 'of a file'],
    [/d'un bouton/g, 'of a button'],
    [/d'une commande/g, 'of a command'],
    [/d'une galerie/g, 'of a gallery'],
    [/d'une image/g, 'of an image'],
    [/d'une URL/g, 'of a URL'],
    [/d'une variable/g, 'of a variable'],
    [/de l'embed/g, 'of the embed'],
    [/de l'utilisateur/g, 'of the user'],
    [/de l'API/g, 'of the API'],
    [/de l'image/g, 'of the image'],
    [/de l'URL/g, 'of the URL'],
    [/de l'index/g, 'of the index'],
    [/de l'interaction/g, 'of the interaction'],
    [/de l'interface/g, 'of the interface'],
    [/de l'option/g, 'of the option'],
    [/de l'action/g, 'of the action'],
    [/de l'état/g, 'of the state'],
    [/du message/g, 'of the message'],
    [/du serveur/g, 'of the server'],
    [/du salon/g, 'of the channel'],
    [/du bot/g, 'of the bot'],
    [/du groupe/g, 'of the group'],
    [/du code/g, 'of the code'],
    [/du titre/g, 'of the title'],
    [/du champ/g, 'of the field'],
    [/du nom/g, 'of the name'],
    [/du contenu/g, 'of the content'],
    [/du traitement/g, 'of the processing'],
    [/du texte/g, 'of the text'],
    [/du temps/g, 'of the time'],
    [/du rôle/g, 'of the role'],
    [/du modal/g, 'of the modal'],
    [/des messages/g, 'of messages'],
    [/des salons/g, 'of channels'],
    [/des rôles/g, 'of roles'],
    [/des utilisateurs/g, 'of users'],
    [/des champs/g, 'of fields'],
    [/des boutons/g, 'of buttons'],
    [/des composants/g, 'of components'],
    [/des options/g, 'of options'],
    [/des permissions/g, 'of permissions'],
    [/des IDs/g, 'of IDs'],
    [/des données/g, 'of data'],
    [/des variables/g, 'of variables'],
    [/des réactions/g, 'of reactions'],
    [/des emojis/g, 'of emojis'],
    [/des valeurs/g, 'of values'],
    [/des lignes/g, 'of rows'],
    [/des fichiers/g, 'of files'],
    [/des performances/g, 'of performance'],
    [/des erreurs/g, 'of errors'],
    
    // Dans + context
    [/dans un message Discord/g, 'in a Discord message'],
    [/dans un message/g, 'in a message'],
    [/dans un canal/g, 'in a channel'],
    [/dans un salon/g, 'in a channel'],
    [/dans un serveur/g, 'in a server'],
    [/dans un embed/g, 'in an embed'],
    [/dans un modal/g, 'in a modal'],
    [/dans un conteneur/g, 'in a container'],
    [/dans le message/g, 'in the message'],
    [/dans le canal/g, 'in the channel'],
    [/dans le salon/g, 'in the channel'],
    [/dans le serveur/g, 'in the server'],
    [/dans le modal/g, 'in the modal'],
    [/dans le conteneur/g, 'in the container'],
    [/dans le groupe/g, 'in the group'],
    [/dans la commande/g, 'in the command'],
    [/dans la réponse/g, 'in the response'],
    [/dans la galerie/g, 'in the gallery'],
    [/dans la section/g, 'in the section'],
    [/dans l'embed/g, 'in the embed'],
    [/dans l'ordre/g, 'in the order'],
    
    // Common verb patterns
    [/peut contenir/g, 'can contain'],
    [/peuvent contenir/g, 'can contain'],
    [/peut être/g, 'can be'],
    [/peuvent être/g, 'can be'],
    [/doit être/g, 'must be'],
    [/doivent être/g, 'must be'],
    [/doit avoir/g, 'must have'],
    [/doit contenir/g, 'must contain'],
    [/ne doit contenir que/g, 'must only contain'],
    [/ne doit pas dépasser/g, 'must not exceed'],
    [/ne peut pas/g, 'cannot'],
    [/ne peuvent pas/g, 'cannot'],
    [/est affiché/g, 'is displayed'],
    [/sont affichés/g, 'are displayed'],
    [/est ajouté/g, 'is added'],
    [/sont ajoutés/g, 'are added'],
    [/est utilisé/g, 'is used'],
    [/sont utilisés/g, 'are used'],
    [/est placé/g, 'is placed'],
    [/sont placés/g, 'are placed'],
    [/est envoyé/g, 'is sent'],
    [/sont renvoyées/g, 'are returned'],
    [/est retourné/g, 'is returned'],
    [/est récupéré/g, 'is retrieved'],
    [/sont récupérées/g, 'are retrieved'],
    [/est stocké/g, 'is stored'],
    [/sont stockées/g, 'are stored'],
    [/est calculé/g, 'is calculated'],
    [/est mesuré/g, 'is measured'],
    [/est fourni/g, 'is provided'],
    [/sont fournies/g, 'are provided'],
    [/est supporté/g, 'is supported'],
    [/sont supportés/g, 'are supported'],
    [/est créé/g, 'is created'],
    [/sont créés/g, 'are created'],
    [/est supprimé/g, 'is deleted'],
    [/sont supprimés/g, 'are deleted'],
    [/est ignoré/g, 'is ignored'],
    [/sont ignorés/g, 'are ignored'],
    [/est obligatoire/g, 'is required'],
    [/sont obligatoires/g, 'are required'],
    [/est optionnel/g, 'is optional'],
    [/sont optionnels/g, 'are optional'],
    [/est désactivé/g, 'is disabled'],
    [/sont désactivés/g, 'are disabled'],
    [/est limité/g, 'is limited'],
    [/a été/g, 'has been'],
    [/ont été/g, 'have been'],
    [/sera/g, 'will be'],
    [/seront/g, 'will be'],
    
    // Common adverbs and prepositions
    [/à l'intérieur/g, 'inside'],
    [/à l'index/g, 'at the index'],
    [/à la fin/g, 'to the end'],
    [/à la position/g, 'at position'],
    [/à gauche/g, 'to the left'],
    [/à côté/g, 'next to'],
    [/au-dessus/g, 'above'],
    [/en dessous/g, 'below'],
    [/en haut/g, 'at the top'],
    [/tout en haut/g, 'at the very top'],
    [/par défaut/g, 'by default'],
    [/en cas de succès/g, 'on success'],
    [/en cas d'erreur/g, 'on error'],
    [/en millisecondes/g, 'in milliseconds'],
    [/en cours/g, 'in progress'],
    [/en cours de construction/g, 'under construction'],
    [/en fonction/g, 'depending on'],
    [/en tant que/g, 'as a'],
    [/en arrière-plan/g, 'in the background'],
    [/au format/g, 'in the format'],
    [/au début/g, 'at the beginning'],
    
    // après
    [/après avoir/g, 'after'],
    [/après l'envoi/g, 'after sending'],
    [/après coup/g, 'afterwards'],
    [/Après l'envoi/g, 'After sending'],
    
    // Time-related
    [/jusqu'à ce que/g, 'until'],
    [/jusqu'à/g, 'up to'],
    [/lors de/g, 'during'],
    [/lorsque/g, 'when'],
    [/depuis le début/g, 'since the beginning'],
    [/depuis/g, 'since'],
    [/pendant/g, 'during'],
    
    // avec / sans
    [/avec une /g, 'with a '],
    [/avec un /g, 'with a '],
    [/avec l'/g, 'with the '],
    [/avec le /g, 'with the '],
    [/avec la /g, 'with the '],
    [/avec les /g, 'with the '],
    [/avec des /g, 'with '],
    [/Avec une /g, 'With a '],
    [/Avec un /g, 'With a '],
    [/Avec l'/g, 'With the '],
    [/Avec le /g, 'With the '],
    [/sans /g, 'without '],
    [/Sans /g, 'Without '],
    
    // pour + verb infinitive
    [/pour ajouter/g, 'to add'],
    [/pour créer/g, 'to create'],
    [/pour définir/g, 'to set'],
    [/pour modifier/g, 'to modify'],
    [/pour supprimer/g, 'to delete'],
    [/pour récupérer/g, 'to retrieve'],
    [/pour obtenir/g, 'to obtain'],
    [/pour afficher/g, 'to display'],
    [/pour envoyer/g, 'to send'],
    [/pour utiliser/g, 'to use'],
    [/pour désactiver/g, 'to disable'],
    [/pour activer/g, 'to enable'],
    [/pour organiser/g, 'to organize'],
    [/pour gérer/g, 'to manage'],
    [/pour mesurer/g, 'to measure'],
    [/pour calculer/g, 'to calculate'],
    [/pour filtrer/g, 'to filter'],
    [/pour trier/g, 'to sort'],
    [/pour convertir/g, 'to convert'],
    [/pour formater/g, 'to format'],
    [/pour exécuter/g, 'to execute'],
    [/pour contrôler/g, 'to control'],
    [/pour cibler/g, 'to target'],
    [/pour distinguer/g, 'to distinguish'],
    [/pour déterminer/g, 'to determine'],
    [/pour mentionner/g, 'to mention'],
    [/pour le /g, 'for the '],
    [/pour la /g, 'for the '],
    [/pour les /g, 'for '],
    [/pour l'/g, 'for the '],
    [/Pour le /g, 'For the '],
    [/Pour la /g, 'For the '],
    [/Pour les /g, 'For '],
    [/Pour l'/g, 'For the '],
    
    // Si clauses
    [/Si le /g, 'If the '],
    [/Si la /g, 'If the '],
    [/Si l'/g, 'If the '],
    [/Si un /g, 'If a '],
    [/Si une /g, 'If a '],
    [/Si aucun /g, 'If no '],
    [/Si aucune /g, 'If no '],
    [/si le /g, 'if the '],
    [/si la /g, 'if the '],
    [/si l'/g, 'if the '],
    [/si un /g, 'if a '],
    [/si une /g, 'if a '],
    [/si omis/g, 'if omitted'],
    [/Si omis/g, 'If omitted'],
    [/si fourni/g, 'if provided'],
    [/si fournie/g, 'if provided'],
    [/Si fourni/g, 'If provided'],
    
    // Common BDFD-specific terms
    [/ligne d'action/g, 'action row'],
    [/lignes d'action/g, 'action rows'],
    [/Ligne d'action/g, 'Action row'],
    [/action row \(action row\)/g, 'action row'],
    [/menu de sélection/g, 'select menu'],
    [/menus de sélection/g, 'select menus'],
    [/Menu de sélection/g, 'Select menu'],
    [/case à cocher/g, 'checkbox'],
    [/cases à cocher/g, 'checkboxes'],
    [/Case à cocher/g, 'Checkbox'],
    [/Cases à cocher/g, 'Checkboxes'],
    [/groupe de cases à cocher/g, 'checkbox group'],
    [/bouton radio/g, 'radio button'],
    [/boutons radio/g, 'radio buttons'],
    [/pièce jointe/g, 'attachment'],
    [/pièces jointes/g, 'attachments'],
    [/champ de texte/g, 'text field'],
    [/champs de texte/g, 'text fields'],
    [/texte d'aide/g, 'help text'],
    [/Texte d'aide/g, 'Help text'],
    [/identifiant personnalisé/g, 'custom identifier'],
    [/identifiant unique/g, 'unique identifier'],
    [/séparés par des virgules/g, 'separated by commas'],
    [/séparé par des virgules/g, 'separated by commas'],
    [/séparées par des virgules/g, 'separated by commas'],
    [/jusqu'à 5/g, 'up to 5'],
    [/jusqu'à 25/g, 'up to 25'],
    [/jusqu'à 10/g, 'up to 10'],
    [/tous les types/g, 'all types'],
    [/tous les autres/g, 'all other'],
    [/style legacy/g, 'legacy style'],
    [/Style legacy/g, 'Legacy style'],
    
    // Common nouns and adjectives
    [/nouvelle ligne/g, 'new row'],
    [/nouveau message/g, 'new message'],
    [/nouvel embed/g, 'new embed'],
    [/nouveau/g, 'new'],
    [/nouvelle/g, 'new'],
    [/nouvel/g, 'new'],
    [/Nouvelle/g, 'New'],
    [/Nouveau/g, 'New'],
    [/étiquette/g, 'label'],
    [/étiquettes/g, 'labels'],
    [/Étiquette/g, 'Label'],
    [/sélection/g, 'selection'],
    [/sélections/g, 'selections'],
    [/Sélection/g, 'Selection'],
    [/exécution/g, 'execution'],
    [/Exécution/g, 'Execution'],
    [/exécuté/g, 'executed'],
    [/commande en cours/g, 'current command'],
    [/commande actuelle/g, 'current command'],
    [/commande/g, 'command'],
    [/Commande/g, 'Command'],
    [/commandes/g, 'commands'],
    [/Commandes/g, 'Commands'],
    [/l'utilisateur clique/g, 'the user clicks'],
    [/l'utilisateur peut/g, 'the user can'],
    [/l'utilisateur doit/g, 'the user must'],
    [/l'utilisateur choisit/g, 'the user chooses'],
    [/l'utilisateur sélectionne/g, 'the user selects'],
    [/l'utilisateur/g, 'the user'],
    [/L'utilisateur/g, 'The user'],
    [/les utilisateurs peuvent/g, 'users can'],
    [/les utilisateurs/g, 'users'],
    [/Les utilisateurs/g, 'Users'],
    
    // Possessives
    [/son propre/g, 'its own'],
    [/son ID/g, 'its ID'],
    [/son type/g, 'its type'],
    [/son nom/g, 'its name'],
    [/leur ID/g, 'their ID'],
    [/leur nom/g, 'their name'],
    
    // Question words
    [/quel message/g, 'which message'],
    [/quel rôle/g, 'which role'],
    [/quel salon/g, 'which channel'],
    
    // Negatives
    [/ne retourne rien/g, 'returns nothing'],
    [/Ne retourne rien/g, 'Returns nothing'],
    [/ne retourne pas de valeur/g, 'does not return a value'],
    [/Ne retourne pas de valeur/g, 'Does not return a value'],
    [/ne retourne pas/g, 'does not return'],
    [/n'est pas/g, 'is not'],
    [/n'ont pas/g, 'do not have'],
    [/n'a pas/g, 'does not have'],
    [/n'existe pas/g, 'does not exist'],
    [/n'existent pas/g, 'do not exist'],
    [/ne sont pas/g, 'are not'],
    [/n'est plus/g, 'is no longer'],
    
    // pas les deux
    [/pas les deux/g, 'not both'],
    
    // Other common words and phrases
    [/indifféremment/g, 'either'],
    [/indifféremment des/g, 'either'],
    [/également/g, 'also'],
    [/Également/g, 'Also'],
    [/ainsi que/g, 'as well as'],
    [/ainsi qu'un/g, 'as well as a'],
    [/ainsi qu'une/g, 'as well as a'],
    [/grâce à/g, 'via'],
    [/via des flèches/g, 'via arrows'],
    [/auprès de/g, 'from'],
    [/quant à/g, 'regarding'],
    [/tout de même/g, 'still'],
    [/toutefois/g, 'however'],
    [/Toutefois/g, 'However'],
    [/cependant/g, 'however'],
    [/Cependant/g, 'However'],
    [/notamment/g, 'notably'],
    [/généralement/g, 'generally'],
    [/principalement/g, 'mainly'],
    [/uniquement/g, 'only'],
    [/Uniquement/g, 'Only'],
    [/seulement/g, 'only'],
    [/Seulement/g, 'Only'],
    [/directement/g, 'directly'],
    [/Directement/g, 'Directly'],
    [/automatiquement/g, 'automatically'],
    [/Automatiquement/g, 'Automatically'],
    [/manuellement/g, 'manually'],
    [/visuellement/g, 'visually'],
    [/précisément/g, 'precisely'],
    [/exactement/g, 'exactly'],
    [/simultanément/g, 'simultaneously'],
    [/actuellement/g, 'currently'],
    [/Actuellement/g, 'Currently'],
    [/préalablement/g, 'previously'],
    [/récemment/g, 'recently'],
    [/immédiatement/g, 'immediately'],
    [/rapidement/g, 'quickly'],
    [/facilement/g, 'easily'],
    [/simplement/g, 'simply'],
    [/complètement/g, 'completely'],
    [/particulièrement/g, 'particularly'],
    [/spécifiquement/g, 'specifically'],
    [/temporairement/g, 'temporarily'],
    [/définitivement/g, 'permanently'],
    
    // Numbers
    [/une fois/g, 'once'],
    [/deux fois/g, 'twice'],
    [/plusieurs fois/g, 'multiple times'],
    [/la première fois/g, 'the first time'],
    [/chaque fois/g, 'each time'],
    
    // Remaining French articles
    [/une action row/g, 'an action row'],
    [/une nouvelle/g, 'a new'],
    [/Un seul/g, 'A single'],
    [/un seul/g, 'a single'],
    [/une seule/g, 'a single'],
    [/Une seule/g, 'A single'],
    [/une ligne/g, 'a row'],
    [/une ligne horizontale/g, 'a horizontal row'],
    [/une même ligne/g, 'the same row'],
    [/une URL/g, 'a URL'],
    [/une image/g, 'an image'],
    [/une icône/g, 'an icon'],
    [/une valeur/g, 'a value'],
    [/une chaîne/g, 'a string'],
    [/une erreur/g, 'an error'],
    [/une fonction/g, 'a function'],
    [/une variable/g, 'a variable'],
    [/une liste/g, 'a list'],
    [/une structure/g, 'a structure'],
    [/une réponse/g, 'a response'],
    [/une confirmation/g, 'a confirmation'],
    [/une bordure/g, 'a border'],
    [/une galerie/g, 'a gallery'],
    [/une section/g, 'a section'],
    [/un message/g, 'a message'],
    [/un salon/g, 'a channel'],
    [/un rôle/g, 'a role'],
    [/un serveur/g, 'a server'],
    [/un embed/g, 'an embed'],
    [/un conteneur/g, 'a container'],
    [/un fichier/g, 'a file'],
    [/un bouton/g, 'a button'],
    [/un champ/g, 'a field'],
    [/un menu/g, 'a menu'],
    [/un groupe/g, 'a group'],
    [/un modal/g, 'a modal'],
    [/un composant/g, 'a component'],
    [/un utilisateur/g, 'a user'],
    [/un lien/g, 'a link'],
    [/un ID/g, 'an ID'],
    [/un index/g, 'an index'],
    [/un nom/g, 'a name'],
    [/un emoji/g, 'an emoji'],
    [/un entier/g, 'an integer'],
    [/un nombre/g, 'a number'],
    [/un paramètre/g, 'a parameter'],
    [/un délai/g, 'a delay'],
    [/un événement/g, 'an event'],
    
    // être conjugations
    [/C'est /g, 'This is '],
    [/c'est /g, 'this is '],
    [/Il est /g, 'It is '],
    [/il est /g, 'it is '],
    [/Elle est /g, 'It is '],
    [/elle est /g, 'it is '],
    [/Ils sont /g, 'They are '],
    [/ils sont /g, 'they are '],
    [/Elles sont /g, 'They are '],
    [/Cela /g, 'This '],
    
    // Comparisons
    [/plus de/g, 'more than'],
    [/moins de/g, 'less than'],
    [/autant de/g, 'as many as'],
    [/le plus/g, 'the most'],
    [/le moins/g, 'the least'],
    [/plus rapide/g, 'faster'],
    [/plus lent/g, 'slower'],
    [/plus élevé/g, 'higher'],
    [/moins élevé/g, 'lower'],
    
    // Misc
    [/celle-ci/g, 'this one'],
    [/celui-ci/g, 'this one'],
    [/ceux-ci/g, 'these'],
    [/celles-ci/g, 'these'],
    [/celle du/g, 'that of the'],
    [/celui du/g, 'that of the'],
    [/n'importe quel/g, 'any'],
    [/n'importe quelle/g, 'any'],
    [/quel que soit/g, 'whatever'],
    [/quelle que soit/g, 'whatever'],
    [/en fonction du/g, 'depending on the'],
    [/en fonction de/g, 'depending on'],
    [/par rapport à/g, 'compared to'],
    [/au lieu de/g, 'instead of'],
    [/afin de/g, 'in order to'],
    [/de manière à/g, 'so as to'],
    [/de façon à/g, 'so as to'],
    [/il suffit de/g, 'simply'],
    [/il faut/g, 'you must'],
    [/Il faut/g, 'You must'],
    [/il est possible de/g, 'it is possible to'],
    [/Il est possible de/g, 'It is possible to'],
    [/il est recommandé de/g, 'it is recommended to'],
    [/Il est recommandé de/g, 'It is recommended to'],
    [/il est conseillé de/g, 'it is advised to'],
    [/il est déconseillé de/g, 'it is discouraged to'],
    [/est conservé/g, 'is kept'],
    [/ont été ajoutés/g, 'have been added'],
    [/a été ajouté/g, 'has been added'],
    [/est possible/g, 'is possible'],
    [/sont possibles/g, 'are possible'],
    [/en compte/g, 'into account'],
    [/prend en compte/g, 'takes into account'],
    [/prennent en compte/g, 'take into account'],
    
    // Some common remaining French words
    [/quelques secondes/g, 'a few seconds'],
    [/quelques millisecondes/g, 'a few milliseconds'],
    [/le traitement/g, 'the processing'],
    [/le temps/g, 'the time'],
    [/le nom/g, 'the name'],
    [/le code/g, 'the code'],
    [/la syntaxe/g, 'the syntax'],
    [/la valeur/g, 'the value'],
    [/la réponse/g, 'the response'],
    [/la raison/g, 'the reason'],
    [/la permission/g, 'the permission'],
    [/la limite/g, 'the limit'],
    [/la page/g, 'the page'],
    [/la taille/g, 'the size'],
    [/la date/g, 'the date'],
    [/les données/g, 'the data'],
    [/les résultats/g, 'the results'],
    [/les erreurs/g, 'the errors'],
    [/optimisation recommandée/g, 'optimization recommended'],
  ];
  
  for (const [pattern, replacement] of rules) {
    t = t.replace(pattern, replacement);
  }
  
  return t;
}

// Process all files
let totalDone = 0;
let totalSkipped = 0;

for (const file of files) {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip already-English files
  const hasFrenchHeaders = /^## Syntaxe\b|^## Paramètres\b|^## Retourne\b|^## Exemples\b|^## Valeur de retour\b|^## Comportement\b|^## Utilisation\b/m.test(content);
  const hasFrenchChars = /[éèêëàâîïôûùçÉÈÊËÀÂÎÏÔÛÙÇ]/.test(content);
  
  if (!hasFrenchHeaders && !hasFrenchChars) {
    totalSkipped++;
    continue;
  }
  
  // Step 1: Structural changes
  content = applyStructural(content);
  
  // Step 2: Translate French to English
  content = translateFrench(content);
  
  fs.writeFileSync(filePath, content, 'utf8');
  totalDone++;
  console.log(`OK: ${file}`);
}

console.log(`\n=== Done ===`);
console.log(`Translated: ${totalDone} files`);
console.log(`Already English: ${totalSkipped} files`);
console.log(`Total: ${files.length} files`);
