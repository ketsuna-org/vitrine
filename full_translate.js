const fs = require('fs');
const path = require('path');

const docsDir = '/home/jeremy/Code/vitrine/_docs';

const files = fs.readdirSync(docsDir)
  .filter(f => f.endsWith('.md'))
  .sort()
  .filter(f => f >= 'addactionrow.md' && f <= 'executiontime.md');

// Comprehensive French→English translation map for BDFD documentation
const translations = [
  // === Frontmatter description field ===
  [/description: (.+)/g, (match, desc) => `description: ${translatePhrase(desc)}`],
  
  // === Common sentence patterns ===
  [/\bLa fonction\b/g, 'The'],
  [/\bfonction\b `\$([^`]+)`\b/g, '`$$$1` function'],
  [/\bpermet d['']/g, 'allows you to'],
  [/\bpermet de\b/g, 'allows'],
  [/\bPermet d['']/g, 'Allows you to'],
  [/\bPermet de\b/g, 'Allows'],
  [/\bpermet aux utilisateurs de\b/g, 'allows users to'],
  [/\bPermet aux utilisateurs de\b/g, 'Allows users to'],
  [/\bpermet à l'utilisateur de\b/g, 'allows the user to'],
  [/\bCette fonction ne retourne pas de valeur\./g, 'This function does not return a value.'],
  [/\bCette fonction ne retourne pas/g, 'This function does not return'],
  [/\bModifie la réponse en cours de construction\./g, 'Modifies the response under construction.'],
  [/\bNe retourne rien\./g, 'Returns nothing.'],
  [/\bPas de valeur de retour directe\./g, 'No direct return value.'],
  [/\bNe retourne pas de valeur\./g, 'Does not return a value.'],
  
  // === Headers and common phrases ===
  [/Créé?e? un /g, 'Creates a '],
  [/Créé?e? une /g, 'Creates a '],
  [/Démarre une /g, 'Starts a '],
  [/Ajoute un /g, 'Adds a '],
  [/Ajoute une /g, 'Adds an '],
  [/Initialise un /g, 'Initializes a '],
  [/Initialise une /g, 'Initializes a '],
  [/Contrairement à/g, 'Unlike'],
  [/ne possède pas de /g, 'does not have a '],
  [/Pour organiser/g, 'To organize'],
  [/utilisez/g, 'use'],
  [/avant chaque/g, 'before each'],
  
  // === Section headers (already structural, but handle edge cases) ===
  
  // === Table content phrases ===
  [/\| Identifiant personnalisé pour /g, '| Custom identifier for '],
  [/\| Identifiant unique pour /g, '| Unique identifier for '],
  [/\| Identifiant unique du /g, '| Unique identifier for the '],
  [/\| Identifiant optionnel /g, '| Optional identifier '],
  [/\| Identifiant du /g, '| Identifier of the '],
  [/\| Identifiant de /g, '| Identifier of '],
  [/\| Texte affiché /g, '| Text displayed '],
  [/\| Texte descriptif optionnel/g, '| Optional descriptive text'],
  [/\| Texte affiché quand rien n'est sélectionné/g, '| Text displayed when nothing is selected'],
  [/\| Texte affiché à côté de/g, '| Text displayed next to'],
  [/\| Texte affiché pour cette option/g, '| Text displayed for this option'],
  [/\| Texte affiché sur le bouton/g, '| Text displayed on the button'],
  [/\| Label affiché au-dessus du champ/g, '| Label displayed above the field'],
  [/\| Label affiché au-dessus/g, '| Label displayed above'],
  [/\| URL de l'image/g, '| Image URL'],
  [/\| URL du fichier/g, '| File URL'],
  [/\| L'URL de l'image/g, '| The image URL'],
  [/\| L'URL du fichier/g, '| The file URL'],
  [/\| Nombre minimum de /g, '| Minimum number of '],
  [/\| Nombre maximum de /g, '| Maximum number of '],
  [/\| Nombre minimum d'entités/g, '| Minimum number of entities'],
  [/\| Nombre maximum d'entités/g, '| Maximum number of entities'],
  [/\| Couleur hex /g, '| Hex color '],
  [/\| Couleur de /g, '| Color of '],
  [/\| Type de /g, '| Type of '],
  [/\| Style du bouton/g, '| Button style'],
  [/\| Style : /g, '| Style: '],
  [/\| Le nom de /g, '| The name of '],
  [/\| Le markup/g, '| The markup'],
  [/\| Texte d'aide /g, '| Help text '],
  [/\| Nombre /g, '| Number '],
  [/\| Valeur /g, '| Value '],
  [/\| Liste /g, '| List '],
  [/\| ID du /g, '| ID of the '],
  [/\| IDs des /g, '| IDs of '],
  [/\| Nom du /g, '| Name of the '],
  
  // === Description field in frontmatter ===
  [/description: Définit l'auteur d'un embed Discord\./g, "description: Sets the author of a Discord embed."],
  [/description: Permet de définir/g, "description: Allows setting"],
  
  // === Common technical phrases ===
  [/\bpar défaut\b/g, 'by default'],
  [/\bpar défaut :/g, 'default:'],
  [/\bpar défaut\)/g, 'default)'],
  [/\bdéfaut\b/g, 'default'],
  [/\bdéfaut\)/g, 'default)'],
  [/\bséparés par des virgules\b/g, 'separated by commas'],
  [/\bséparés par/g, 'separated by'],
  [/\bSi omis\b/g, 'If omitted'],
  [/\bsi omis\b/g, 'if omitted'],
  [/\ben cas de succès\b/g, 'on success'],
  [/\bMessage d'erreur\b/g, 'Error message'],
  [/\bLe bot doit avoir la permission\b/g, 'The bot must have the permission'],
  [/\bLe bot doit avoir accès\b/g, 'The bot must have access'],
  [/\bLe message doit exister\b/g, 'The message must exist'],
  [/\bne pas avoir été supprimé\b/g, 'not have been deleted'],
  [/\bL'URL doit être/g, 'The URL must be'],
  [/\bL'URL doit pointer/g, 'The URL must point'],
  [/\baccessible publiquement/g, 'publicly accessible'],
  [/\bAucun paramètre\./g, 'No parameters.'],
  [/\bAucun paramètre requis\./g, 'No parameters required.'],
  [/\bNe nécessite pas/g, 'Does not require'],
  [/\bSupportent le markdown/g, 'Support markdown'],
  [/\bSupporte le markdown/g, 'Supports markdown'],
  [/\bSupporte les émojis/g, 'Supports emojis'],
  [/\bSupporte/g, 'Supports'],
  [/\bComptent dans/g, 'Count toward'],
  [/\bSont affichés/g, 'Are displayed'],
  [/\best affiché/g, 'is displayed'],
  [/\bsont ajoutés/g, 'are added'],
  [/\best ajouté/g, 'is added'],
  [/\bsont placés/g, 'are placed'],
  [/\bSans /g, 'Without '],
  [/\bPour les nouveaux bots/g, 'For new bots'],
  [/\bPour les nouveaux développements/g, 'For new development'],
  [/\bprivilégiez/g, 'prefer'],
  [/\bconservé pour rétrocompatibilité/g, 'kept for backward compatibility'],
  [/\boffre une API plus propre/g, 'offers a cleaner API'],
  [/\bpermet de contrôler finement la disposition/g, 'allows fine control over layout'],
  [/\bMax /g, 'Max '],
  [/\bpar ligne d'action/g, 'per action row'],
  [/\bpar message/g, 'per message'],
  [/\bpar groupe/g, 'per group'],
  [/\bDans un/g, 'In a'],
  [/\bDans une/g, 'In a'],
  [/\bdans un message Discord/g, 'in a Discord message'],
  [/\bdans le message/g, 'in the message'],
  [/\bdans le canal/g, 'in the channel'],
  [/\bdu message/g, 'of the message'],
  [/\bdu serveur/g, 'of the server'],
  [/\bdu bot/g, 'of the bot'],
  [/\bde la commande/g, 'of the command'],
  [/\bde l'utilisateur/g, 'of the user'],
  [/\bde l'API/g, 'of the API'],
  [/\bcôté bot/g, 'bot-side'],
  [/\bla latence utilisateur/g, 'user latency'],
  [/\bla latence WebSocket/g, 'WebSocket latency'],
  [/\bUtilisez/g, 'Use'],
  [/\bpour mentionner/g, 'to mention'],
  [/\bpour distinguer/g, 'to distinguish'],
  [/\bpour déterminer/g, 'to determine'],
  [/\bpour cibler/g, 'to target'],
  [/\bpour récupérer/g, 'to retrieve'],
  [/\bpour filtrer/g, 'to filter'],
  [/\bPratique pour les/g, 'Useful for'],
  [/\bPratique pour la/g, 'Useful for'],
  [/\bPratique pour le/g, 'Useful for'],
  [/\bIdéal pour/g, 'Ideal for'],
  [/\bUtile pour/g, 'Useful for'],
  [/\bRecommandé/g, 'Recommended'],
  [/\bNon recommandé/g, 'Not recommended'],
  [/\bDéconseillé/g, 'Discouraged'],
  [/\bLes valeurs retournées sont des/g, 'The returned values are'],
  [/\bLa valeur retournée est une/g, 'The returned value is a'],
  [/\bLa valeur retournée est un/g, 'The returned value is a'],
  [/\bLes valeurs retournées/g, 'The returned values'],
  [/\bLa valeur/g, 'The value'],
  [/\bLe paramètre/g, 'The parameter'],
  [/\bLes paramètres/g, 'The parameters'],
  [/\bLe nom/g, 'The name'],
  [/\bLes noms/g, 'The names'],
  [/\bL'index/g, 'The index'],
  [/\bL'ID/g, 'The ID'],
  [/\bL'URL/g, 'The URL'],
  [/\bL'emoji/g, 'The emoji'],
  [/\bL'image/g, 'The image'],
  [/\bLe serveur/g, 'The server'],
  [/\bLe fichier/g, 'The file'],
  [/\bLes fichiers/g, 'The files'],
  [/\bLe message/g, 'The message'],
  [/\bLes messages/g, 'The messages'],
  [/\bLe bouton/g, 'The button'],
  [/\bLes boutons/g, 'The buttons'],
  [/\bLe champ/g, 'The field'],
  [/\bLes champs/g, 'The fields'],
  [/\bLe rôle/g, 'The role'],
  [/\bLes rôles/g, 'The roles'],
  [/\bLe salon/g, 'The channel'],
  [/\bLes salons/g, 'The channels'],
  [/\bLe conteneur/g, 'The container'],
  [/\bLes conteneurs/g, 'The containers'],
  [/\bLa galerie/g, 'The gallery'],
  [/\bLe spoiler/g, 'The spoiler'],
  [/\bLe temps/g, 'The time'],
  [/\bL'utilisateur/g, 'The user'],
  [/\bLes utilisateurs/g, 'The users'],
  [/\bL'auteur/g, 'The author'],
  [/\bLe mode spoiler/g, 'Spoiler mode'],
  [/\bLe mode/g, 'The mode'],
  [/\bLa navigation/g, 'Navigation'],
  [/\bLa couleur/g, 'The color'],
  [/\bL'état/g, 'The state'],
  [/\bL'ordre/g, 'The order'],
  [/\bdoit contenir/g, 'must contain'],
  [/\bne doit contenir que/g, 'must only contain'],
  [/\bdoit être/g, 'must be'],
  [/\bdoit faire/g, 'must be'],
  [/\bne doit pas dépasser/g, 'must not exceed'],
  [/\bde caractères/g, 'characters'],
  [/\bselon le niveau de boost/g, 'depending on the boost level'],
  [/\bselon son niveau de boost/g, 'based on its boost level'],
  [/\bselon/g, 'depending on'],
  [/\bLimite de/g, 'Limit of'],
  [/\bMaximum /g, 'Maximum '],
  [/\bMinimum /g, 'Minimum '],
  [/\bTaille max/g, 'Max size'],
  [/\bNe fonctionne que si/g, 'Only works if'],
  [/\bne fonctionne que/g, 'only works'],
  [/\bexiste encore/g, 'still exists'],
  [/\bexiste déjà/g, 'already exists'],
  [/\bComportement indéfini/g, 'Undefined behavior'],
  [/\ble comportement est indéfini/g, 'the behavior is undefined'],
  
  // === Compound patterns ===
  [/\bPour des groupes de /g, 'For groups of '],
  [/\bPour les commandes de /g, 'For '],
  [/\bPour réagir à un message de /g, 'To react to a '],
  [/\bPour le message de réponse/g, 'For the response message'],
  [/\bPour le message déclencheur/g, 'For the trigger message'],
  [/\bContrairement à /g, 'Unlike '],
  [/\bcette fonction cible/g, 'this function targets'],
  [/\bCes fonctions/g, 'These functions'],
  [/\bCette fonction/g, 'This function'],
  [/\bCes fonctions permettent/g, 'These functions allow'],
  [/\bCette approche/g, 'This approach'],
  [/\bCe paramètre/g, 'This parameter'],
  
  // === Function-specific patterns ===
  [/\bdéclencheur \(message de l'utilisateur\)/g, 'trigger message (the user\'s message)'],
  [/\bdéclencheur/g, 'trigger'],
  [/\bmessage déclencheur/g, 'trigger message'],
  [/\bdéclenché la commande/g, 'triggered the command'],
  [/\bqui a déclenché la commande/g, 'that triggered the command'],
  
  // === Misc ===
  [/\bApparaît /g, 'Appears '],
  [/\bapparaît /g, 'appears '],
  [/\bMasque /g, 'Hides '],
  [/\bmasque /g, 'hides '],
  [/\bRévèle /g, 'Reveals '],
  [/\brévèle /g, 'reveals '],
  [/\bFonctionnalité à venir/g, 'Feature coming soon'],
  [/\bFonctionnalité visuelle/g, 'Visual feature'],
  [/\bne font pas partie de/g, 'are not part of'],
  [/\bAPI Discord native/g, 'native Discord API'],
  [/\bAPI native/g, 'native API'],
  [/\bSpécifique à BDFD/g, 'Specific to BDFD'],
  [/\bpropre à BDFD/g, 'specific to BDFD'],
  [/\bà ne pas confondre avec/g, 'not to be confused with'],
  [/\bÀ ne pas confondre avec/g, 'Not to be confused with'],
  [/\bContrairement à/g, 'Unlike'],
  [/\bcontrairement à/g, 'unlike'],
  [/\bqui\b/g, 'which'],
  [/\bqui crée/g, 'which creates'],
  [/\bqui offre/g, 'which offers'],
  [/\bqui permet/g, 'which allows'],
  [/\bqui regroupe/g, 'which groups'],
  [/\bqui contient/g, 'which contains'],
  [/\bcontenant/g, 'containing'],
  [/\bcontenant le/g, 'containing the'],
  [/\bcontenant des/g, 'containing'],
  [/\bpouvant contenir/g, 'that can contain'],
  [/\bpeuvent contenir/g, 'can contain'],
  [/\bpeut contenir/g, 'can contain'],
  [/\bpeuvent coexister/g, 'can coexist'],
  [/\bpeuvent être/g, 'can be'],
  [/\bpeut être/g, 'can be'],
  [/\bdoivent être/g, 'must be'],
  [/\bdoit être utilisé/g, 'must be used'],
  [/\bDoit être utilisé/g, 'Must be used'],
  [/\bdoit avoir/g, 'must have'],
  [/\bDoit avoir/g, 'Must have'],
  [/\bPlusieurs /g, 'Multiple '],
  [/\bplusieurs /g, 'multiple '],
  [/\bChaque /g, 'Each '],
  [/\bchaque /g, 'each '],
  [/\bTous les /g, 'All '],
  [/\btous les /g, 'all '],
  [/\bTout le /g, 'All the '],
  [/\bAffiche /g, 'Displays '],
  [/\baffiche /g, 'displays '],
  [/\bAfficher /g, 'Display '],
  [/\bFournit /g, 'Provides '],
  [/\bfournit /g, 'provides '],
  [/\bStocke /g, 'Stores '],
  [/\bRenvoie /g, 'Returns '],
  [/\brenvoie /g, 'returns '],
  [/\bDéfinit /g, 'Sets '],
  [/\bdéfinit /g, 'sets '],
  [/\bModifie /g, 'Modifies '],
  [/\bmodifie /g, 'modifies '],
  [/\bSupprime /g, 'Deletes '],
  [/\bsupprime /g, 'deletes '],
  [/\bVérifie si /g, 'Checks if '],
  [/\bvérifie si /g, 'checks if '],
  [/\bVérifie l'existence/g, 'Checks the existence'],
  [/\bvérifie l'existence/g, 'checks the existence'],
  [/\bRécupère /g, 'Retrieves '],
  [/\brécupère /g, 'retrieves '],
  [/\bRetourne /g, 'Returns '],
  [/\bretourne /g, 'returns '],
  [/\bCalcule /g, 'Calculates '],
  [/\bcalcule /g, 'calculates '],
  [/\bConvertit /g, 'Converts '],
  [/\bconvertit /g, 'converts '],
  [/\bMesure /g, 'Measures '],
  [/\bmesure /g, 'measures '],
  [/\bCombine /g, 'Combines '],
  [/\bcombine /g, 'combines '],
  [/\bFormate /g, 'Formats '],
  [/\bformate /g, 'formats '],
  [/\bApplique /g, 'Applies '],
  [/\bapplique /g, 'applies '],
  [/\bActive /g, 'Enables '],
  [/\bactive /g, 'enables '],
  [/\bDésactive /g, 'Disables '],
  [/\bdésactive /g, 'disables '],
  [/\bEnvoie /g, 'Sends '],
  [/\benvoie /g, 'sends '],
  [/\bAjoute également/g, 'Also adds'],
  [/\bStyle legacy/g, 'Legacy style'],
  [/\bStyle /g, 'Style '],
  [/\bComposant /g, 'Component '],
  [/\bcomposant /g, 'component '],
  [/\bcomposants /g, 'components'],
  [/\bComposants /g, 'Components'],
  [/\bLigne d'action/g, 'Action row'],
  [/\bligne d'action/g, 'action row'],
  [/\blignes d'action/g, 'action rows'],
  
  // === Ordinals and numbers ===
  [/\bPremier\b/g, 'First'],
  [/\bDeuxième\b/g, 'Second'],
  [/\bTroisième\b/g, 'Third'],
  [/\bpremier\b/g, 'first'],
  [/\bdernier\b/g, 'last'],
  [/\bDernier\b/g, 'Last'],
  [/\btout début\b/g, 'very beginning'],
  [/\bà la fin\b/g, 'to the end'],
  [/\bà la position\b/g, 'at position'],
  [/\bà l'intérieur/g, 'inside'],
  [/\bà l'index/g, 'at the index'],
  [/\bau-dessus du titre/g, 'above the title'],
  [/\bau-dessus/g, 'above'],
  [/\ben haut de/g, 'at the top of'],
  [/\btout en haut/g, 'at the very top'],
  [/\bà gauche/g, 'to the left'],
  [/\bà côté/g, 'side by side'],
  [/\bcôte à côte/g, 'side by side'],
  [/\bEn dessous/g, 'Below'],
  [/\ben dessous/g, 'below'],
  [/\bAprès l'envoi/g, 'After sending'],
  [/\bAvant l'envoi/g, 'Before sending'],
  [/\bau format/g, 'in the format'],
  [/\bau format hexadécimal/g, 'in hexadecimal format'],
  [/\bavec #/g, 'with #'],
  [/\bavec /g, 'with '],
  [/\bAvec /g, 'With '],
  
  // === Conditionals ===
  [/\bSi vous souhaitez/g, 'If you want to'],
  [/\bSi vous voulez/g, 'If you want to'],
  [/\bSi aucune/g, 'If no'],
  [/\bSi aucun/g, 'If no'],
  [/\bSi l'index dépasse/g, 'If the index exceeds'],
  [/\bSi fournie/g, 'If provided'],
  [/\bSi fourni/g, 'If provided'],
  [/\bSi le/g, 'If the'],
  [/\bSi la/g, 'If the'],
  [/\bSi l'/g, 'If the '],
  
  // === Temporal / ordering ===
  [/\bL'ordre visuel/g, 'The visual order'],
  [/\bL'ordre d'ajout/g, 'The order of addition'],
  [/\bAjouté à la fin/g, 'Added to the end'],
  [/\bAjouté au début/g, 'Added to the beginning'],
  [/\bInséré en position/g, 'Inserted at position'],
  [/\bInséré à/g, 'Inserted at'],
  [/\bAvant tous les autres/g, 'Before all other'],
  [/\bAprès tous les autres/g, 'After all other'],
  
  // === Display / UI ===
  [/\bUne petite image ronde/g, 'A small round image'],
  [/\bpetite icône ronde/g, 'small round icon'],
  [/\bdevient un lien cliquable/g, 'becomes a clickable link'],
  [/\bdevient un lien hypertexte/g, 'becomes a hyperlink'],
  [/\blien cliquable/g, 'clickable link'],
  [/\bTexte alternatif/g, 'Alt text'],
  [/\bpleine largeur/g, 'full width'],
  [/\boccupent toute la largeur/g, 'occupy the full width'],
  [/\bCouleur d'accent/g, 'Accent color'],
  
  // === Common endings for notes ===
  [/\bUtilisez `([^`]+)` pour/g, 'Use `$1` to'],
  [/\bCombinez `([^`]+)` et `([^`]+)` pour/g, 'Combine `$1` and `$2` to'],
];

function translatePhrase(text) {
  let result = text;
  for (const [pattern, replacement] of translations) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function isAlreadyFullyEnglish(content) {
  // Check for remaining French text patterns
  const frenchPattern = /[éèêëàâîïôûùçÉÈÊËÀÂÎÏÔÛÙÇ]/;
  const frenchWords = /\b(peut contenir|peuvent contenir|doit être|doivent être|sont ajoutés|est ajouté|est affiché|sont affichés|séparés|affiche|afficher|retourne|renvoie|calcule|mesure|supprime|vérifie|récupère|applique|active|désactive|envoie|combine|formate|convertit|définit|modifie|stocke|fournit|Apparaît|Masque|Révèle|Style legacy|Ligne d'action|côte à côte|par défaut|en cas de|Message d'erreur|accessible publiquement|le bot doit|la permission|Aucun paramètre|Ne nécessite|Supportent|Comptent|privilégiez|rétrocompatibilité|Fonctionnalité à venir|ne font pas partie|à ne pas confondre|comportement indéfini|Identifiant personnalisé|Identifiant unique|Texte affiché|Label affiché|Nombre minimum|Nombre maximum|Couleur hex|Type de|URL de l'image|URL du fichier|si omis|Si omis)\b/;
  
  return !frenchPattern.test(content) && !frenchWords.test(content);
}

let totalProcessed = 0;
let totalSkipped = 0;

for (const file of files) {
  const filePath = path.join(docsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (isAlreadyFullyEnglish(content)) {
    totalSkipped++;
    continue;
  }
  
  // Apply translations
  let translated = content;
  
  // Process line by line for better control
  const lines = translated.split('\n');
  const processedLines = [];
  
  for (const line of lines) {
    // Skip code blocks, empty lines, etc.
    if (line.startsWith('```') || line.trim() === '' || 
        line.match(/^---$/) || line.startsWith('layout:') || 
        line.startsWith('translation_key:') || line.startsWith('category:') ||
        line.startsWith('function_name:') || line.startsWith('syntax:') ||
        line.match(/^\|[-| :]+\|$/)) {
      processedLines.push(line);
      continue;
    }
    
    // Skip lines that are purely code
    if (line.startsWith('$') || (line.startsWith('# $') && !line.includes(' — ') && !line.includes(' - '))) {
      processedLines.push(line);
      continue;
    }
    
    // Translate the line
    let translatedLine = translatePhrase(line);
    processedLines.push(translatedLine);
  }
  
  const finalContent = processedLines.join('\n');
  
  if (finalContent !== content) {
    fs.writeFileSync(filePath, finalContent, 'utf8');
    totalProcessed++;
    console.log(`TRANSLATED: ${file}`);
  } else {
    totalSkipped++;
  }
}

console.log(`\nDone: ${totalProcessed} translated, ${totalSkipped} already English/skipped`);
console.log(`Total: ${files.length} files`);
