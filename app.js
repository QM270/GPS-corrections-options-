/* GPS Corrections Options — navigator over the decision tree in data.js */

const T = window.GPS_TREE;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---- parent map, so breadcrumbs work from any deep link ---- */
const parent = {};
for (const [id, n] of Object.entries(T)) (n.children || []).forEach(c => parent[c] = id);

function pathTo(id){
  const path = [];
  let cur = id;
  while (cur) { path.unshift(cur); cur = parent[cur]; }
  return path;
}

/* ---- flat index of every part number, for search ---- */
const INDEX = [];
for (const [id, n] of Object.entries(T)) {
  (n.parts || []).forEach(p => INDEX.push({
    id, pn: p.pn, term: p.term, via: p.via, ask: p.ask,
    label: [n.title, n.sub].filter(Boolean).join(' ')
  }));
}

let state = 'home';

function go(id, push = true){
  if (!T[id]) id = 'home';
  state = id;
  if (push && location.hash.slice(1) !== id) location.hash = id;
  $('search').value = '';
  $('results').hidden = true;
  $('view').hidden = false;
  render();
  window.scrollTo({top: 0, behavior: 'instant'});
}

/* ---- render ---- */
function crumbLabel(id){ return id === 'home' ? 'Start' : T[id].title; }

function renderCrumbs(){
  const path = pathTo(state);
  $('crumbs').innerHTML = path.map((id, i) => {
    const last = i === path.length - 1;
    return `<button class="crumb${last ? ' here' : ''}" type="button" ${last ? 'disabled' : `data-go="${id}"`}
      >${esc(crumbLabel(id))}</button>` + (last ? '' : `<span class="crumb-sep">›</span>`);
  }).join('');
}

function renderNode(){
  const n = T[state];
  let h = `<div class="node-head">`;
  h += `<h1 class="node-title">${esc(n.title)}`;
  if (n.accuracy) h += ` <span class="badge" data-acc='${esc(n.accuracy)}'>${esc(n.accuracy)}</span>`;
  h += `</h1>`;
  if (n.sub) h += `<p class="node-sub">${esc(n.sub)}</p>`;
  if (n.image && !n.children) h += `<img class="node-img" src="./img/${esc(n.image)}" alt="${esc(n.title)}">`;
  if (n.note) h += `<p class="note">${esc(n.note)}</p>`;
  if (n.question) h += `<p class="node-q">${esc(n.question)}</p>`;
  h += `</div>`;

  if (n.children) {
    h += `<div class="choices">` + n.children.map(cid => {
      const c = T[cid];
      const thumb = c.image ? `<img class="choice-thumb" src="./img/${esc(c.image)}" alt="">` : '';
      const badge = c.accuracy ? `<span class="badge" data-acc='${esc(c.accuracy)}'>${esc(c.accuracy)}</span>` : '';
      const sub = c.sub || (c.note && c.note.length < 60 ? c.note : '');
      return `<button class="choice" type="button" data-go="${cid}">
        ${thumb}
        <span class="choice-body">
          <span class="choice-title">${esc(c.title)}</span>
          ${sub ? `<span class="choice-sub">${esc(sub)}</span>` : ''}
        </span>
        ${badge}
        <span class="choice-arrow" aria-hidden="true">›</span>
      </button>`;
    }).join('') + `</div>`;
  }

  if (n.parts) {
    h += `<div class="parts">` + n.parts.map(p => `
      <div class="part" data-via="${esc(p.via)}">
        <span class="part-body">
          <span class="part-term">${esc(p.term)}</span>
          ${p.pn ? `<span class="part-pn">${esc(p.pn)}</span>` : ''}
          ${p.ask ? `<span class="part-ask">${esc(p.ask)}</span>` : ''}
          <span class="part-via">Order through ${esc(p.via)}</span>
        </span>
        ${p.pn ? `<button class="copy" type="button" data-copy="${esc(p.pn)}">Copy</button>` : ''}
      </div>`).join('') + `</div>`;
  }

  if (n.contact && !n.parts) {
    h += `<div class="contact-box">${esc(n.note || 'Contact Product Support or your Tech Specialist.')}</div>`;
  }

  $('view').innerHTML = h;
}

function render(){ renderCrumbs(); renderNode(); }

/* ---- search ---- */
function runSearch(q){
  q = q.trim().toLowerCase();
  if (!q){ $('results').hidden = true; $('view').hidden = false; renderCrumbs(); return; }
  $('view').hidden = true;
  $('crumbs').innerHTML = '';
  const hits = INDEX.filter(r =>
    (r.pn && r.pn.toLowerCase().includes(q)) ||
    r.term.toLowerCase().includes(q) ||
    r.label.toLowerCase().includes(q) ||
    (T[r.id].title + ' ' + (T[r.id].sub || '')).toLowerCase().includes(q)
  );
  const seen = new Set();
  const nodeHits = Object.entries(T).filter(([id, n]) =>
    (n.title + ' ' + (n.sub || '')).toLowerCase().includes(q) && !n.parts);

  let h = '';
  if (hits.length){
    h += `<p class="res-head">${hits.length} part${hits.length > 1 ? 's' : ''}</p>`;
    h += hits.map(r => {
      const trail = pathTo(r.id).slice(1).map(i => T[i].title).join(' › ');
      return `<button class="res" type="button" data-go="${r.id}">
        <span class="res-pn">${esc(r.pn || '—')}</span>
        <span class="choice-body">
          <span class="res-term">${esc(r.term)}</span>
          <span class="res-path">${esc(trail)}</span>
        </span>
        <span class="choice-arrow" aria-hidden="true">›</span>
      </button>`;
    }).join('');
  }
  if (nodeHits.length){
    h += `<p class="res-head" style="margin-top:16px">Screens</p>`;
    h += nodeHits.map(([id, n]) => {
      const trail = pathTo(id).slice(1).map(i => T[i].title).join(' › ');
      return `<button class="res" type="button" data-go="${id}">
        <span class="choice-body">
          <span class="res-term">${esc(n.title)}</span>
          <span class="res-path">${esc(trail)}</span>
        </span>
        <span class="choice-arrow" aria-hidden="true">›</span>
      </button>`;
    }).join('');
  }
  if (!h) h = `<p class="no-res">Nothing matches “${esc(q)}”.</p>`;
  $('results').innerHTML = h;
  $('results').hidden = false;
}

/* ---- events ---- */
document.addEventListener('click', e => {
  const goBtn = e.target.closest('[data-go]');
  if (goBtn){ go(goBtn.dataset.go); return; }
  const copyBtn = e.target.closest('[data-copy]');
  if (copyBtn){
    const pn = copyBtn.dataset.copy;
    navigator.clipboard.writeText(pn).then(
      () => toast(`Copied ${pn}`),
      () => toast('Copy not available')
    );
  }
});
$('btnHome').addEventListener('click', () => go('home'));
$('search').addEventListener('input', e => runSearch(e.target.value));
window.addEventListener('hashchange', () => go(location.hash.slice(1) || 'home', false));

function toast(msg){
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1900);
}

go(location.hash.slice(1) || 'home', false);
