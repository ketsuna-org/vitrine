// Documentation search: replaces the sidebar navigation with ranked results while a query is typed.
// Pattern: ARIA 1.2 combobox (the input) controlling a listbox. Focus stays in the input; the highlighted
// result is exposed through aria-activedescendant.
(() => {
  const root = document.querySelector('[data-docs-search]');
  if (!root) return;

  const input = root.querySelector('.docs-search-input');
  const clearButton = root.querySelector('.docs-search-clear');
  const panel = root.querySelector('.docs-search-panel');
  const status = root.querySelector('.docs-search-meta');
  const list = root.querySelector('.docs-search-list');
  const empty = root.querySelector('.docs-search-empty');
  const emptyTitle = root.querySelector('.docs-search-empty-title');
  const MAX_RESULTS = 40;

  // Everything else in the sidebar column is "pure documentation navigation" and is hidden during a search.
  const navigation = () => [...root.parentElement.children].filter(el => el !== root);

  let index = null;
  let loading = null;
  let results = [];
  let active = -1;

  // "$userName", "user_name" and "username" all normalise to "username".
  const norm = value => String(value || '').toLowerCase().replace(/[\s$_.\-\[\]()]/g, '');
  const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const load = () => {
    if (index) return Promise.resolve(index);
    if (!loading) {
      loading = fetch(root.dataset.indexUrl, { credentials: 'same-origin' })
        .then(response => { if (!response.ok) throw new Error(String(response.status)); return response.json(); })
        .then(entries => {
          index = entries.map(entry => {
            const name = entry.f || entry.t;
            return {
              entry,
              name: norm(name),
              title: norm(entry.t),
              cat: (entry.c || '').toLowerCase(),
              desc: (entry.d || '').toLowerCase(),
              syntax: norm(entry.s),
              hay: norm([entry.f, entry.t, entry.c, entry.d, entry.s].join(' ')) + ' ' + [entry.f, entry.t, entry.c, entry.d, entry.s].join(' ').toLowerCase()
            };
          });
          return index;
        })
        .catch(() => { loading = null; return null; });
    }
    return loading;
  };

  // Higher is better; 0 means "no match". Every query word has to match somewhere.
  const score = (item, query, words) => {
    const q = norm(query);
    let s = 0;
    if (item.name === q) s = 1000;
    else if (item.title === q) s = 900;
    else if (item.name.startsWith(q)) s = 800 - Math.min(item.name.length - q.length, 100);
    else if (item.title.startsWith(q)) s = 700 - Math.min(item.title.length - q.length, 100);
    else if (item.name.includes(q)) s = 600;
    else if (item.title.includes(q)) s = 500;
    if (!s) {
      if (!words.every(word => item.hay.includes(word) || item.hay.includes(norm(word)))) return 0;
      s = 100;
      if (item.desc.includes(query.toLowerCase())) s += 40;
      if (item.syntax.includes(q)) s += 20;
      if (item.cat.includes(query.toLowerCase())) s += 10;
    }
    if (item.entry.k === 'Hub') s += 5;
    return s;
  };

  const search = query => {
    const trimmed = query.trim();
    const words = trimmed.toLowerCase().split(/\s+/).filter(Boolean);
    return index
      .map(item => ({ item, score: score(item, trimmed.replace(/^\$/, ''), words.map(word => word.replace(/^\$/, ''))) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score || a.item.entry.t.length - b.item.entry.t.length || a.item.entry.t.localeCompare(b.item.entry.t))
      .map(result => result.item.entry);
  };

  const highlight = (text, words, target) => {
    const terms = words.map(word => word.replace(/^\$/, '')).filter(Boolean).map(escapeRegExp);
    if (!terms.length) { target.append(text); return; }
    const pattern = new RegExp('(' + terms.join('|') + ')', 'gi');
    text.split(pattern).forEach((part, i) => {
      if (i % 2 === 1) { const mark = document.createElement('mark'); mark.textContent = part; target.append(mark); }
      else if (part) target.append(part);
    });
  };

  // A short excerpt centred on the first match, so the reason for a hit is visible.
  const excerpt = (text, words) => {
    if (!text) return '';
    const lower = text.toLowerCase();
    let at = -1;
    for (const word of words) {
      const found = lower.indexOf(word.replace(/^\$/, ''));
      if (found >= 0 && (at < 0 || found < at)) at = found;
    }
    if (at < 0 || text.length <= 120) return text.length > 120 ? text.slice(0, 117) + '…' : text;
    const start = Math.max(0, at - 40);
    const end = Math.min(text.length, start + 120);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  };

  const setActive = (next, scroll = true) => {
    const options = list.children;
    if (active >= 0 && options[active]) { options[active].setAttribute('aria-selected', 'false'); options[active].classList.remove('is-active'); }
    active = next;
    const option = options[active];
    if (option) {
      option.setAttribute('aria-selected', 'true');
      option.classList.add('is-active');
      input.setAttribute('aria-activedescendant', option.id);
      if (scroll) option.scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  };

  const render = query => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    results = search(query);
    list.replaceChildren();
    empty.hidden = results.length > 0;
    list.hidden = results.length === 0;
    if (!results.length) {
      emptyTitle.textContent = `No results for “${query.trim()}”`;
      status.textContent = `No results for ${query.trim()}.`;
      setActive(-1);
      return;
    }
    results.slice(0, MAX_RESULTS).forEach((entry, i) => {
      const option = document.createElement('li');
      option.id = `docs-search-option-${i}`;
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      option.className = 'docs-search-option';
      const link = document.createElement('a');
      link.href = entry.u;
      link.tabIndex = -1;
      const title = document.createElement('span');
      title.className = 'docs-search-title' + (entry.k === 'Function' ? ' is-code' : '');
      highlight(entry.t, words, title);
      const meta = document.createElement('span');
      meta.className = 'docs-search-kind';
      meta.textContent = [entry.k === 'Hub' ? 'Documentation' : entry.k, entry.c].filter(Boolean).join(' · ');
      const head = document.createElement('span');
      head.className = 'docs-search-head';
      head.append(title, meta);
      link.append(head);
      const snippet = excerpt(entry.d, words);
      if (snippet) {
        const text = document.createElement('span');
        text.className = 'docs-search-snippet';
        highlight(snippet, words, text);
        link.append(text);
      }
      option.append(link);
      list.append(option);
    });
    const shown = Math.min(results.length, MAX_RESULTS);
    status.textContent = results.length > shown
      ? `Showing the first ${shown} of ${results.length} results. Refine your search to narrow them.`
      : `${results.length} result${results.length === 1 ? '' : 's'}`;
    status.dataset.visible = results.length > shown ? 'true' : 'false';
    setActive(0, false);
  };

  const setOpen = open => {
    panel.hidden = !open;
    input.setAttribute('aria-expanded', String(open));
    navigation().forEach(el => { el.hidden = open; });
    if (!open) { input.removeAttribute('aria-activedescendant'); active = -1; }
    root.classList.toggle('is-searching', open);
  };

  const update = () => {
    const query = input.value;
    clearButton.hidden = !query;
    if (!query.trim()) { setOpen(false); return; }
    setOpen(true);
    if (!index) {
      list.replaceChildren(); list.hidden = true; empty.hidden = true;
      status.textContent = 'Loading search…';
      load().then(ready => {
        if (!input.value.trim()) return;
        if (!ready) { status.textContent = 'Search is unavailable right now. Use the navigation instead.'; return; }
        render(input.value);
      });
      return;
    }
    render(query);
  };

  const clear = () => { input.value = ''; update(); };

  input.addEventListener('focus', () => { load(); });
  input.addEventListener('input', update);
  clearButton.addEventListener('click', () => { clear(); input.focus(); });

  input.addEventListener('keydown', event => {
    const count = list.children.length;
    if (event.key === 'ArrowDown' && count) { event.preventDefault(); setActive((active + 1) % count); }
    else if (event.key === 'ArrowUp' && count) { event.preventDefault(); setActive((active - 1 + count) % count); }
    else if (event.key === 'Enter') {
      const link = list.children[active]?.querySelector('a');
      if (link) { event.preventDefault(); link.click(); }
    } else if (event.key === 'Escape') {
      // First Escape clears the query and brings the navigation back; a second one closes the mobile drawer.
      if (input.value) { event.preventDefault(); event.stopPropagation(); clear(); }
    }
  });

  list.addEventListener('mousemove', event => {
    const option = event.target.closest('[role="option"]');
    if (option && option !== list.children[active]) setActive([...list.children].indexOf(option), false);
  });

  // "/" or Ctrl/Cmd+K focuses the search from anywhere; on small screens it opens the navigation drawer first.
  const focusSearch = () => {
    const sidebar = document.getElementById('docs-sidebar');
    if (window.innerWidth < 1024 && sidebar && !sidebar.classList.contains('is-active')) {
      document.getElementById('sidebar-toggle-btn')?.click();
    }
    input.focus();
    input.select();
  };
  document.addEventListener('keydown', event => {
    const typing = event.target.closest?.('input, textarea, select, [contenteditable="true"]');
    const slash = event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !typing;
    const palette = event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey) && !event.altKey;
    if (slash || palette) { event.preventDefault(); focusSearch(); }
  });
  document.getElementById('search-toggle-btn')?.addEventListener('click', focusSearch);

  // Leaving the page through a result must not leave the drawer inert; links already close it (see site.js).
  // Back/forward cache restores the field: sync the UI with whatever the browser put back.
  window.addEventListener('pageshow', () => { if (input.value) update(); });
})();
