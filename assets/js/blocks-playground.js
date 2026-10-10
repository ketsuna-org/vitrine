/* Blocks Playground: edit real app blocks (assets/js/blocks-registry.json) and preview the Discord message. */
(function () {
  'use strict';
  var root = document.getElementById('blocks-playground');
  if (!root) return;

  var SAMPLE = { 'user.username': 'Jeremy', 'user.id': '1234567890', 'user.name': 'Jeremy', 'guild.name': 'Bot Creator Community',
    'guild.membercount': '1,420', 'guild.id': '9876543210', 'channel.id': '1122334455', 'bot.ping': '24' };
  var EDITORS = { embeds: 1, normalComponents: 1, componentV2: 1, modalDefinition: 1, bdfdScript: 1, permissionFlags: 1, list: 1, map: 1, elseIfBranches: 1, nestedActions: 1 };
  var reg, byType = {}, seq = [];

  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') el.className = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] === true) el.setAttribute(k, '');
      else if (attrs[k] !== false && attrs[k] != null) el.setAttribute(k, attrs[k]);
    });
    [].concat(kids == null ? [] : kids).forEach(function (c) { el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function icon(name, cls) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', cls || ''); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    var u = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    u.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/assets/icons/app-blocks.svg#' + name);
    u.setAttribute('href', '/assets/icons/app-blocks.svg#' + name);
    s.appendChild(u); return s;
  }

  function newItem(type) { return { type: type, key: '', values: {}, open: true }; }
  function val(item, f) { return item.values.hasOwnProperty(f.key) ? item.values[f.key] : f.default; }
  function visible(item, b, f) {
    if (!f.visibleWhen) return true;
    return Object.keys(f.visibleWhen).every(function (k) {
      var dep = b.fields.filter(function (x) { return x.key === k; })[0];
      return f.visibleWhen[k].indexOf(String(dep ? val(item, dep) : '')) >= 0;
    });
  }

  function save() { render(); }

  function fieldEl(item, b, f) {
    var v = val(item, f), label = h('span', { class: 'scratch-block-label' }, [h('span', {}, [f.label + (f.required ? ' *' : '')])]);
    var set = function (x) { item.values[f.key] = x; renderPreview(); renderExport(); };
    if (f.type === 'boolean') {
      var cb = h('input', { type: 'checkbox', 'aria-label': f.label, onchange: function (e) { set(e.target.checked); } });
      cb.checked = v === true || v === 'true';
      return h('div', { class: 'scratch-block-toggle-row' }, [h('span', {}, [f.label]), cb]);
    }
    if (f.type === 'multiSelect') {
      var sel = h('select', { class: 'scratch-block-input', 'aria-label': f.label, onchange: function (e) { item.values[f.key] = e.target.value; save(); } },
        (f.options || []).map(function (o) { return h('option', { value: o, selected: String(v) === o }, [o]); }));
      return h('div', { class: 'scratch-block-field' }, [label, sel, f.hint ? h('span', { class: 'scratch-block-hint' }, [f.hint]) : '']);
    }
    if (f.type === 'embeds') return embedsEl(item, f, label);
    if (EDITORS[f.type]) {
      return h('div', { class: 'scratch-block-field' }, [label, h('div', { class: 'scratch-block-input is-editor' }, [(f.hint || f.label) + ' (not editable in the playground)'])]);
    }
    var inp = h('input', { class: 'scratch-block-input', type: f.type === 'number' ? 'number' : 'text', placeholder: f.hint || '', 'aria-label': f.label,
      oninput: function (e) { set(f.type === 'number' ? Number(e.target.value) : e.target.value); } });
    inp.value = v == null ? '' : String(v);
    return h('div', { class: 'scratch-block-field' }, [label, inp]);
  }

  function embedsEl(item, f, label) {
    var L = reg.embedLabels, list = item.values[f.key] || (item.values[f.key] = []);
    var wrap = h('div', { class: 'scratch-block-field' }, [label]);
    list.forEach(function (em, i) {
      var box = h('div', { class: 'scratch-block-input is-editor', style: 'flex-direction:column;align-items:stretch;gap:8px' });
      [['title', L.embed_label_title], ['description', L.common_description], ['color', L.embed_label_color], ['url', L.embed_label_url]].forEach(function (p) {
        var i2 = h('input', { class: 'scratch-block-input', type: 'text', 'aria-label': p[1], placeholder: p[1], oninput: function (e) { em[p[0]] = e.target.value; renderPreview(); renderExport(); } });
        i2.value = em[p[0]] || ''; box.appendChild(i2);
      });
      box.appendChild(h('button', { type: 'button', class: 'bp-btn', onclick: function () { list.splice(i, 1); save(); } }, ['Remove embed']));
      wrap.appendChild(box);
    });
    wrap.appendChild(h('button', { type: 'button', class: 'bp-btn', onclick: function () { list.push({ title: '', description: '', color: '#5865F2' }); save(); } }, ['Add embed']));
    return wrap;
  }

  function cardEl(item, idx) {
    var b = byType[item.type], fam = reg.families[b.family];
    var body = h('div', { class: 'scratch-block-body' });
    b.fields.forEach(function (f) { if (visible(item, b, f)) body.appendChild(fieldEl(item, b, f)); });
    if (!b.fields.length) body.appendChild(h('span', { class: 'scratch-block-more' }, ['This block has no field.']));
    var key = h('input', { class: 'scratch-block-input', type: 'text', value: item.key, 'aria-label': 'Action Key', placeholder: 'result name (optional)', oninput: function (e) { item.key = e.target.value; renderExport(); } });
    body.appendChild(h('div', { class: 'scratch-block-field' }, [h('span', { class: 'scratch-block-label' }, [h('span', {}, [reg.common.fields[0].label])]), key]));
    var ctl = function (txt, label, fn) { return h('button', { type: 'button', class: 'bp-btn', 'aria-label': label, onclick: fn }, [txt]); };
    body.appendChild(h('div', { class: 'bp-row' }, [
      ctl('↑', 'Move up', function () { if (idx > 0) { seq.splice(idx - 1, 0, seq.splice(idx, 1)[0]); save(); } }),
      ctl('↓', 'Move down', function () { if (idx < seq.length - 1) { seq.splice(idx + 1, 0, seq.splice(idx, 1)[0]); save(); } }),
      ctl('Duplicate', 'Duplicate', function () { seq.splice(idx + 1, 0, JSON.parse(JSON.stringify(item))); save(); }),
      ctl('Delete', 'Delete', function () { seq.splice(idx, 1); save(); })]));
    var det = h('details', { class: 'scratch-block-card', style: '--fam:' + fam.color, open: item.open, ontoggle: function (e) { item.open = e.target.open; } }, [
      h('summary', { class: 'scratch-block-header' }, [
        h('span', { class: 'scratch-block-tile' }, [icon(b.icon)]),
        h('span', { class: 'scratch-block-heading' }, [h('span', { class: 'scratch-block-overline' }, [b.category]), h('span', { class: 'scratch-block-title' }, [b.name]), h('span', { class: 'scratch-block-summary' }, [b.type])]),
        icon('expand_more', 'scratch-block-chevron')]),
      body]);
    return det;
  }

  function sub(text) {
    return String(text == null ? '' : text).replace(/\(\(([^()]+)\)\)/g, function (m, n) { var k = n.toLowerCase(); return SAMPLE.hasOwnProperty(k) ? SAMPLE[k] : m; });
  }
  function md(text) { // tiny subset: **bold**, `code`, <@id>
    var frag = document.createDocumentFragment(), re = /(\*\*[^*]+\*\*|`[^`]+`|<@\d+>)/g, parts = text.split(re);
    parts.forEach(function (p) {
      if (/^\*\*/.test(p)) frag.appendChild(h('strong', {}, [p.slice(2, -2)]));
      else if (/^`/.test(p)) frag.appendChild(h('code', {}, [p.slice(1, -1)]));
      else if (/^<@\d+>/.test(p)) frag.appendChild(h('span', { class: 'bp-mention' }, ['@' + SAMPLE['user.username']]));
      else frag.appendChild(document.createTextNode(p));
    });
    return frag;
  }

  var previewEl, exportEl;
  function renderPreview() {
    previewEl.textContent = '';
    var msgs = seq.filter(function (i) { return i.type === 'respondWithMessage' || i.type === 'sendMessage'; });
    if (!msgs.length) { previewEl.appendChild(h('p', { class: 'scratch-block-more' }, ['Add a Respond with Message or Send Message block to see a message.'])); return; }
    msgs.forEach(function (item) {
      var b = byType[item.type], get = function (k) { var f = b.fields.filter(function (x) { return x.key === k; })[0]; return f ? val(item, f) : undefined; };
      var content = sub(get('content')), embeds = (item.values.embeds || []).filter(function (e) { return e.title || e.description; });
      var content_el = h('div', { class: 'discord-msg-content' }, [
        h('div', { class: 'discord-header' }, [h('span', { class: 'discord-username' }, ['Bot Creator Assistant']), h('span', { class: 'discord-bot-tag' }, ['BOT ✔'])])]);
      if (content) content_el.appendChild(h('div', {}, [md(content)]));
      embeds.forEach(function (e) {
        var c = /^#[0-9a-f]{6}$/i.test(e.color || '') ? e.color : '#5865F2';
        content_el.appendChild(h('div', { class: 'discord-embed', style: '--embed-color:' + c }, [
          e.title ? h('div', { class: 'discord-embed-title' }, [sub(e.title)]) : '', e.description ? h('div', { class: 'discord-embed-desc' }, [md(sub(e.description))]) : '']));
      });
      if (get('ephemeral') === true) content_el.appendChild(h('div', { class: 'discord-ephemeral-notice' }, [h('span', {}, ['Only you can see this'])]));
      if (!content && !embeds.length) content_el.appendChild(h('div', { class: 'scratch-block-more' }, ['(empty message)']));
      previewEl.appendChild(h('div', { class: 'discord-simulator-frame' }, [h('div', { class: 'discord-msg-row' }, [h('div', { class: 'discord-avatar' }, ['🤖']), content_el])]));
    });
  }

  function actions() {
    return seq.map(function (item) {
      var b = byType[item.type], payload = {};
      b.fields.forEach(function (f) { if (visible(item, b, f)) payload[f.key] = val(item, f); });
      var a = { type: item.type }; if (item.key) a.key = item.key; a.enabled = true; a.payload = payload; return a;
    });
  }
  function renderExport() { if (document.activeElement !== exportEl) exportEl.value = JSON.stringify(actions(), null, 2); }

  var listEl;
  function render() {
    listEl.textContent = '';
    if (!seq.length) listEl.appendChild(h('p', { class: 'scratch-block-more' }, ['No block yet. Add one below.']));
    seq.forEach(function (item, i) { listEl.appendChild(cardEl(item, i)); if (i < seq.length - 1) listEl.appendChild(h('div', { class: 'scratch-block-connector' }, [h('div', { class: 'scratch-block-connector-line' })])); });
    renderPreview(); renderExport();
  }

  function load(list) {
    seq = list.map(function (a) { if (!byType[a.type]) throw new Error('Unknown block type: ' + a.type); var it = newItem(a.type); it.key = a.key || ''; it.values = JSON.parse(JSON.stringify(a.payload || {})); return it; });
    render();
  }
  var PRESETS = {
    'Slash /ping reply': [{ type: 'respondWithMessage', payload: { embeds: [{ title: '🏓 Pong!', description: 'WebSocket API Latency: ((bot.ping))ms', color: '#5865F2' }] } }],
    'Welcome message': [{ type: 'sendMessage', payload: { content: 'Welcome <@((user.id))> to **((guild.name))**! 🎉 We are now ((guild.memberCount)) members!' } }],
    'Private confirmation': [{ type: 'addRole', payload: { userId: '((user.id))', roleId: '998877665544332211' } }, { type: 'respondWithMessage', payload: { content: '✅ Congratulations ((user.username))! You have been given the Member role.', ephemeral: true } }]
  };

  function build() {
    var cats = []; reg.blocks.forEach(function (b) { byType[b.type] = b; if (b.inPalette && cats.indexOf(b.category) < 0) cats.push(b.category); });
    var catSel = h('select', { 'aria-label': 'Category', class: 'bp-select' }, cats.map(function (c) { return h('option', { value: c }, [c]); }));
    var blkSel = h('select', { 'aria-label': 'Block', class: 'bp-select' });
    function fill() { blkSel.textContent = ''; reg.blocks.filter(function (b) { return b.category === catSel.value && b.inPalette; }).forEach(function (b) { blkSel.appendChild(h('option', { value: b.type }, [b.name])); }); }
    catSel.addEventListener('change', fill); fill();
    listEl = h('div', { class: 'block-flow-canvas bp-list' });
    previewEl = h('div', { class: 'bp-preview' });
    exportEl = h('textarea', { class: 'bp-json', rows: 10, 'aria-label': 'Sequence as JSON', spellcheck: 'false',
      onchange: function (e) { try { load(JSON.parse(e.target.value)); e.target.classList.remove('bad'); } catch (err) { e.target.classList.add('bad'); } } });
    var presets = h('select', { 'aria-label': 'Example', class: 'bp-select', onchange: function (e) { if (e.target.value) load(PRESETS[e.target.value]); e.target.value = ''; } },
      [h('option', { value: '' }, ['Load an example…'])].concat(Object.keys(PRESETS).map(function (k) { return h('option', { value: k }, [k]); })));
    root.textContent = '';
    root.appendChild(h('div', { class: 'bp-grid' }, [
      h('div', {}, [h('h2', {}, ['Blocks']), presets, listEl,
        h('div', { class: 'bp-row' }, [catSel, blkSel, h('button', { type: 'button', class: 'bp-btn bp-primary', onclick: function () { if (blkSel.value) { seq.push(newItem(blkSel.value)); render(); } } }, ['Add block'])])]),
      h('div', {}, [h('h2', {}, ['Discord preview']), previewEl,
        h('h2', {}, ['Saved structure']), h('p', { class: 'scratch-block-hint' }, ['Editable: paste a sequence here to load it. This is the JSON the app stores.']), exportEl,
        h('button', { type: 'button', class: 'bp-btn', onclick: function () { navigator.clipboard && navigator.clipboard.writeText(exportEl.value); } }, ['Copy JSON'])])]));
    load(PRESETS['Slash /ping reply']);
  }

  fetch('/assets/js/blocks-registry.json').then(function (r) { return r.json(); }).then(function (j) { reg = j; build(); })
    .catch(function () { root.textContent = 'Could not load the block registry.'; });
})();
