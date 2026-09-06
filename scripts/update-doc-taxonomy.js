const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', '_docs');

const componentFiles = [
  'addbutton', 'addbuttoncv2', 'addactionrow', 'addstringselect', 'addstringselectoption',
  'newselectmenu', 'editselectmenu', 'editselectmenuoption', 'addselectmenuoption',
  'addchannelselect', 'addroleselect', 'adduserselect', 'addmentionableselect',
  'addcategoryselect', 'addvoiceselect', 'newmodal', 'addmodalselect', 'addmodaltextinput',
  'addmodaltextdisplay', 'addmodalcheckbox', 'addmodalcheckboxgroup', 'addmodalradiogroup',
  'addmodalfileupload', 'addtextinput', 'addtextdisplay', 'addsection', 'addcontainer',
  'addseparator', 'addmediagallery', 'addmediagalleryitem', 'addcheckboxgroupoption',
  'addradiogroupoption', 'editbutton', 'removebuttons', 'removecomponent',
  'removeallcomponents', 'customid', 'getstringselectvalue', 'getstringselectvalues',
  'getchannelselectchannelid', 'getchannelselectchannelids', 'getroleselectroleid',
  'getroleselectroleids', 'getuserselectuserid', 'getuserselectuserids',
  'getmentionableselectuserid', 'getmentionableselectuserids', 'sendresponse', 'ephemeral',
];

const descriptions = {
  addbutton: 'Adds an interactive button to a message (legacy style).',
  addbuttoncv2: 'Adds an interactive button using the modern component layout.',
  addactionrow: 'Starts a new action row for buttons or select menus.',
  addstringselect: 'Adds a string select dropdown menu to a message.',
  newmodal: 'Creates a modal dialog with text inputs.',
  customid: 'Returns the custom ID of the interaction component that triggered the callback.',
  globalcooldown: 'Sets a cooldown shared across all servers for a command.',
  servercooldown: 'Sets a per-server cooldown for a command.',
  loop: 'Repeats a block of actions a fixed number of times.',
  func: 'Defines a reusable function block in BDScript.',
  funcend: 'Ends a function block started with $func.',
  error: 'Throws a custom error and stops command execution.',
  mcp: 'Model Context Protocol server for AI-assisted documentation lookup.',
  ephemeral: 'Makes the response visible only to the user who triggered the interaction.',
};

for (const slug of componentFiles) {
  const filePath = path.join(docsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/category: "Embed & Message"/g, 'category: "Components & Interactions"');
  if (descriptions[slug] && !content.includes('description:')) {
    content = content.replace(
      /^(---\r?\n(?:layout: doc\r?\n)?(?:title:.*\r?\n)?translation_key: docs\r?\n)/m,
      `$1description: ${descriptions[slug]}\n`,
    );
    if (!content.includes('description:')) {
      content = content.replace(/^---\r?\n/, `---\ndescription: ${descriptions[slug]}\n`);
    }
  }
  fs.writeFileSync(filePath, content);
}

for (const [slug, desc] of Object.entries(descriptions)) {
  if (componentFiles.includes(slug)) continue;
  const filePath = path.join(docsDir, `${slug}.md`);
  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8').includes('description:')) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/^---\r?\n/, `---\ndescription: ${desc}\n`);
  fs.writeFileSync(filePath, content);
}

console.log('Updated component categories and descriptions.');
