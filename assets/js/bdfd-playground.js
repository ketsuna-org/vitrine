/* BDFD Playground: edit a snippet, draw the Discord preview with BdfdPreviewEngine (assets/js/bdfd-preview.js). Reads only, executes nothing. */
(function () {
  'use strict';
  var root = document.getElementById('bdfd-playground');
  if (!root) return;

  var SAMPLE = { username: 'Jeremy', authorid: '1234567890', guildname: 'Bot Creator Community', servername: 'Bot Creator Community',
    membercount: '1,420', memberscount: '1,420', channelname: 'general', channelid: '1122334455', guildid: '9876543210', serverid: '9876543210', ping: '24', botping: '24' };
  var PRESETS = [
    { name: 'Message simple', code: 'Bonjour $username, bienvenue sur $guildName !' },
    { name: 'Embed', code: '$title[Informations]\n$description[Serveur : $guildName\nMembres : $memberCount]\n$color[#5865F2]\n$addField[Ping;$ping ms;yes]\n$footer[Demandé par $username]' },
    { name: 'Boutons', code: 'Veux-tu continuer ?\n$addButton[no;oui;Oui;success]\n$addButton[no;non;Non;danger]\n$ephemeral' }
  ];

  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') el.className = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) el.setAttribute(k, attrs[k]);
    });
    [].concat(kids == null ? [] : kids).forEach(function (c) { el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }

  // Sample values for argument-less variables, applied to the preview only (never to the editor text).
  function withSamples(code) {
    return code.replace(/\$([a-zA-Z]+)(?![a-zA-Z0-9_]*\[)/g, function (m, n) {
      return Object.prototype.hasOwnProperty.call(SAMPLE, n.toLowerCase()) ? SAMPLE[n.toLowerCase()] : m;
    }).replace(/\$([a-zA-Z]+)\[/g, function (m) { return m; });
  }

  var ta = h('textarea', { class: 'bp-json', rows: '12', spellcheck: 'false', 'aria-label': 'BDFD snippet' });
  var out = h('div', { class: 'bp-preview', 'aria-live': 'polite' });
  var presets = h('div', { class: 'bp-row' }, PRESETS.map(function (p) {
    return h('button', { class: 'bp-btn', type: 'button', onclick: function () { ta.value = p.code; render(); } }, p.name);
  }));

  function render() {
    var eng = window.BdfdPreviewEngine;
    if (!eng) { out.textContent = 'Preview engine not loaded.'; return; }
    var code = withSamples(ta.value).trim();
    var parsed = eng.parseBdfd(code);
    out.innerHTML = code ? eng.renderDiscordSimulator(parsed) : '';
  }

  ta.addEventListener('input', render);
  ta.value = PRESETS[1].code;
  root.appendChild(h('div', { class: 'bp-grid' }, [
    h('div', {}, [h('h2', {}, 'Script'), ta, presets]),
    h('div', {}, [h('h2', {}, 'Discord preview'), out])
  ]));
  if (window.BdfdPreviewEngine) render();
  else window.addEventListener('load', render);
})();
