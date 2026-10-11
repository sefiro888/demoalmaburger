(() => {
'use strict';

/* ---------- Datos (carta oficial de almaburgers.com + fotos de Just Eat / Instagram) ---------- */
const P = (n, d, p, t = [], i = '') => ({ n, d, p, t, i });
const MENU = {
  hamburguesas: { label: 'Hamburguesas', items: [
    P('La Puerquita', 'Doble carne smash con queso cheddar, jugoso pulled pork en su salsa, salsa Emmy en ambas tapas y ensalada de cebolla encurtida. Todo en pan brioche.', 18.5, ['mes'], 'la-puerquita'),
    P('La Básica', 'Carne smash con queso cheddar y cebolla caramelizada', 10, ['clásica'], 'la-basica'),
    P('Doble Dosis', 'Doble carne smash, cheddar, panceta, cebolla caramelizada y salsa BBQ', 15.5, [], 'doble-dosis'),
    P('La Golosa', 'Smash burger con panceta crujiente, cheddar fundido, cebolla caramelizada y un toque de crema de Lotus', 17.5, ['dulce'], 'la-golosa'),
    P('Dulce y Verde', 'Smash burger con queso edam, cebolla caramelizada, panceta crujiente y crema de pistacho', 17.5, ['dulce'], 'dulce-y-verde'),
    P('Gordi Deluxe', 'Smash burger con lechuga, tomate, panceta, huevo frito y nuestra salsa de pepinillos (opción vegetariana)', 14.5, ['veg'], 'gordi-deluxe'),
    P('Me Derrito', 'Smash burger con queso, panceta, salsa mayonesa, chispas de bacon y MUUUUCHA salsa cheddar', 15.5),
    P('La Matru', 'Smash burger con queso, panceta crujiente, mayonesa de trufa y patatas paja', 14, ['trufa'], 'la-matru'),
    P('La Cabrona', 'Doble carne smash, queso de cabra, mermelada de bacon, cebolla caramelizada, mayonesa japonesa y salsa BBQ al whisky', 16.5, [], 'la-cabrona'),
    P('La Dori', 'Doble carne smash, queso cheddar, salsa de Doritos, mermelada de bacon, Doritos crocantes y salsa de queso cheddar', 17.5, [], 'la-dori'),
    P('La Triplona', 'Triple carne smash, queso cheddar, panceta, salsa cheddar, mermelada de bacon y mayonesa de bacon', 19.5, [], 'la-triplona'),
    P('Picantona', 'Smash burger con queso cheddar, cebolla caramelizada, pepinillo, thai chilli y salsa chipotle extra picante', 16, ['picante'], 'picantona'),
    P('Chickenesa', 'Pechuga de pollo, lechuga, cebolla morada y nuestra salsa ajonesa', 15.5, ['pollo'], 'chickenesa'),
    P('La Diabla', 'Pechuga de pollo con miel y mostaza, cebolla caramelizada, bits picantes y nuestra salsa secreta picante', 16.5, ['pollo', 'picante'], 'la-diabla'),
    P('Furia de Pollo', 'Doble pechuga de pollo con lechuga iceberg, mayonesa, mermelada de bacon, aros de cebolla y salsa BBQ a la miel', 17, ['pollo'], 'furia-de-pollo'),
    P('La Picosita', 'Pollo crispy bañado en miel con un toque picante, acompañado de una ensalada coleslaw y pepinillo', 17, ['pollo', 'picante', 'nuevo'])
  ]},
  compartir: { label: 'Para compartir', items: [
    P('Totopos', 'Con guacamole o salsa cheddar, panceta y carne picada', 13.8),
    P('Patatas', 'Con queso cheddar y panceta', 8.8, [], 'patatas'),
    P('Patatas trufadas', 'Con mayonesa de trufa y parmesano', 9.5, ['trufa'], 'patatas-trufadas'),
    P('Patatas bravas', 'A elegir alioli o brava', 8.5, [], 'patatas-bravas'),
    P('Tequeños', 'Con guasacaca', 9.5, [], 'tequenos'),
    P('Aros de cebolla', 'Con salsa ajonesa', 5.5, [], 'aros'),
    P('Croquetas', 'Chipirones (4 uds.) o de queso azul con cebolla caramelizada (6 uds.)', 6, [], 'croquetas'),
    P('Alitas picantes', 'Crujientes rebozadas con salsa Buffalo', 12, ['picante', 'pollo'], 'alitas'),
    P('Fingers de pollo', 'Picantes con salsa de miel y mostaza', 9.5, ['pollo', 'picante'], 'fingers'),
    P('Ensalada', 'De tomate, rúcula, burrata, pesto y mermelada de tomate', 13.5, ['veg'], 'ensalada'),
    P('Chopitos', 'Acompañado de alioli y limón', 9.5)
  ]},
  bocadillos: { label: 'Bocadillos', note: 'Tortillas rellenas a elegir: chistorra y queso · panceta y queso · txaka · alioli con jamón · salsa cheddar y panceta.', items: [
    P('Tortilla', 'De patata o rellena', 8.7, ['veg'], 'tortilla'),
    P('Pechuga', 'Empanada con queso, panceta y pimiento rojo', 9.7, ['pollo'], 'pechuga'),
    P('Lomo', 'Con queso, panceta y pimiento rojo', 7.7, [], 'lomo'),
    P('Panceta', 'Con queso y pimiento rojo', 7.4, [], 'panceta'),
    P('Vegetal de atún', 'Lechuga, tomate, cebolla, huevo duro, atún y mahonesa', 8, [], 'vegetal-atun'),
    P('Vegetal con pechuga', 'Lechuga, tomate, cebolla caramelizada, huevo duro, pechuga empanada y mahonesa', 9.8, ['pollo'], 'vegetal-pechuga'),
    P('Alma Burger', 'Carne smash con queso cheddar, panceta y salsa guasacaca', 8.5)
  ]},
  hotdogs: { label: 'Hot dogs', items: [
    P('Hot Clásica', 'Con ketchup, mayonesa y mostaza', 7, [], 'hot-clasica'),
    P('Hot Gordita', 'Patatas paja, cebolla crunchy, parmesano y mayonesa de trufa', 10.5, ['trufa'], 'hot-gordita'),
    P('Hot Quesuda', 'Con salsa cheddar, repollo, cebolla morada y panceta', 10.5, [], 'hot-quesuda'),
    P('Hot Picantona', 'Panceta, chimichurri, repollo, cebolla morada, guasacaca, cebolla crunchy, queso parmesano y salsa picante de jalapeño', 10.5, ['picante'], 'hot-picantona')
  ]},
  postres: { label: 'Postres', items: [
    P('La de toda la vida', 'Tarta de queso clásica', 7, ['dulce'], 'tarta-clasica'),
    P('La Lotus', 'Tarta de queso con crema de Lotus y galleta', 8.5, ['dulce'], 'tarta-lotus'),
    P('La Pistacha', 'Tarta de queso con crema de pistacho', 8.5, ['dulce'], 'tarta-pistacha'),
    P('La Ferrero', 'Tarta de queso con crema de Ferrero Rocher', 8.7, ['dulce'], 'tarta-ferrero'),
    P('La Kinder', 'Tarta de queso con crema de Kinder Bueno blanco', 8.5, ['dulce'], 'tarta-kinder'),
    P('Coulant de chocolate', 'Volcán de chocolate', 6.5, ['dulce'], 'coulant'),
    P('Helado', 'De turrón o caramelo', 3.5, ['dulce']),
    P('Crepe', 'De nutella', 5.5, ['dulce'], 'crepe')
  ]},
  infantil: { label: 'Menú infantil', items: [
    P('Pechuga', 'Empanada, con patatas y croquetas', 9),
    P('Lomo', 'Con patatas y croquetas', 9),
    P('Hamburguesa', 'Con queso, patatas y croquetas', 9)
  ]},
  desayunos: { label: 'Desayunos', note: 'Desayunos de 8:00 a 12:00.', groups: [
    { g: 'Cafés y bebidas especiales', items: [
      P('Espresso', '', 1.7), P('Cortado', '', 1.8), P('Con leche', '', 1.9), P('Cola Cao', '', 2.2), P('Infusiones', '', 1.9),
      P('Ice Caramel Latte', '', 3.5), P('Ice Vainilla Latte', '', 3.5),
      P('Matcha de Mango', '', 4), P('Matcha Berry', '', 4), P('Matcha goloso', '', 4)
    ]},
    { g: 'Bollería', items: [
      P('Croissant', '', 3), P('Croissant relleno de pistacho', '', 3.5, ['dulce']), P('Croissant relleno de nutella', '', 3.5, ['dulce']),
      P('Croissant a la plancha', 'Con mantequilla y mermelada', 4), P('Croissant con jamón York y queso', '', 4.4), P('Napolitana de chocolate', '', 3, ['dulce'])
    ]},
    { g: 'Tostadas', items: [
      P('Tomate y AOVE', 'Acompañado de rúcula, germinados y sésamo', 3, ['veg']),
      P('Mantequilla y mermelada', 'Arándanos, frambuesa y melocotón', 3.4, ['veg']),
      P('Tomate, jamón ibérico y AOVE', '', 4.3),
      P('Burrata, pesto y tomate cherry', 'Acompañado de rúcula, germinados y sésamo', 7.3, ['veg']),
      P('Queso mascarpone, nueces y miel', '', 5.3, ['veg']),
      P('Jamón ibérico, aguacate y tomate', 'Acompañado de rúcula, germinados y sésamo', 5.9),
      P('Crema de cacahuete y plátano', 'Acompañado de pepitas y sirope de chocolate', 4.5, ['dulce']),
      P('Hummus, aguacate y huevo a baja temperatura', 'Hummus de remolacha, sésamo y cebollino', 6.5),
      P('Burrata, jamón ibérico y tomate seco', 'Acompañado de rúcula, germinados y sésamo', 7.9),
      P('Hongos, tomate y huevo poché', 'Acompañado de rúcula, germinados y sésamo', 7.2),
      P('Salmón y mascarpone', 'Con rúcula, hummus de remolacha, germinados y sésamo', 7.5, [], 'tostada-salmon')
    ], note: 'Suplementos: huevo 1,70€ · jamón 2,30€ · aguacate 2,00€ · salmón 2,10€ · burrata 3,50€.' },
    { g: 'Pancakes', items: [
      P('Pancakes de Nutella', 'Acompañado de plátano', 6, ['dulce'], 'pancakes-nutella'),
      P('Pancakes de fruta', 'Acompañado de fruta de temporada', 6.2, ['dulce']),
      P('Pancakes de Oreo', 'Con una cremosa crema de chocolate', 6.5, ['dulce']),
      P('Pancakes de Kinder', 'Con crema de Kinder Bueno blanco', 6.3, ['dulce']),
      P('Pancakes de Ferrero', 'Con crema de Ferrero Rocher', 6.3, ['dulce'], 'pancakes-ferrero'),
      P('Pancakes salados', 'Acompañado de panceta y huevo a la plancha', 7)
    ]},
    { g: 'Bowls', items: [
      P('Bowl de yogurt', 'Fruta de temporada, granola y miel', 6.4),
      P('Bowl de pancake', 'Con dulce de leche y fruta de temporada', 7.5, ['dulce'])
    ]},
    { g: 'Zumos y smoothies', items: [
      P('Zumo de naranja pequeño', '', 2.85), P('Zumo de naranja grande', '', 3.85),
      P('Avocado Paradise', 'Aguacate, plátano y leche condensada', 5.4),
      P('Sun Power', 'Naranja, limón, jengibre, zanahoria y miel', 5.4),
      P('Vital Red', 'Remolacha, zanahoria y manzana', 5.5),
      P('Yellow Bliss', 'Piña y mango', 5.5)
    ]}
  ]}
};
const TAGLABEL = { pollo: 'Pollo', picante: 'Picante', dulce: 'Dulce', veg: 'Vegetariano', trufa: 'Trufa', nuevo: 'Nuevo', mes: 'Burger del mes', 'clásica': 'Clásica' };
const FILTERS = ['pollo', 'picante', 'dulce', 'veg', 'trufa'];
const RIG = '<div class="rig rig--still"><img src="img/mascot-legL.png" alt=""><img src="img/mascot-legR.png" alt=""><img src="img/mascot-body.png" alt=""></div>';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const eur = n => n.toFixed(2).replace('.', ',') + '€';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const OPTS = {
  'compartir|Totopos': ['Con guacamole', 'Con salsa cheddar'],
  'compartir|Patatas bravas': ['Con alioli', 'Con brava'],
  'compartir|Croquetas': ['Chipirones (4 uds.)', 'Queso azul y cebolla caramelizada (6 uds.)'],
  'bocadillos|Tortilla': ['De patata', 'Rellena de chistorra y queso', 'Rellena de panceta y queso', 'Rellena de txaka', 'Rellena de alioli con jamón', 'Rellena de salsa cheddar y panceta'],
  'postres|Helado': ['De turrón', 'De caramelo'],
  'hamburguesas|Gordi Deluxe': ['Normal', 'Versión vegetariana']
};
const allItems = [];
const catPhotos = {}, catCount = {};
Object.entries(MENU).forEach(([k, c]) => {
  (c.groups ? c.groups.flatMap(g => g.items) : c.items).forEach(i => { i.cat = k; i.id = k + '|' + i.n; i.o = OPTS[k + '|' + i.n] || null; allItems.push(i); catCount[k] = (catCount[k] || 0) + 1; if (i.i) catPhotos[k] = (catPhotos[k] || 0) + 1; });
});
Object.keys(catCount).forEach(k => { catPhotos[k] = (catPhotos[k] || 0) / catCount[k] >= .5; });
const byId = id => allItems.find(i => i.id === id);

function card(i, idx) {
  const tags = i.t.length ? `<div class="tags">${i.t.map(t => `<span class="tag ${t === 'nuevo' || t === 'mes' ? 'tag--new' : ''}">${TAGLABEL[t]}</span>`).join('')}</div>` : '';
  let pic = '';
  if (i.i) pic = `<div class="item__img"><img src="img/dishes/s/${i.i}.jpg" alt="${esc(i.n)}" loading="lazy" width="640" height="480"></div>`;
  else if (catPhotos[i.cat]) pic = `<div class="item__img item__img--none">${RIG}</div>`;
  return `<article class="item ${pic ? '' : 'item--compact'}" data-open="${esc(i.id)}" tabindex="0" aria-label="Ver ${esc(i.n)}" style="animation-delay:${Math.min(idx, 12) * 30}ms">${pic}
    <div class="item__body"><h3>${esc(i.n)}</h3>
    ${i.d ? `<p>${esc(i.d)}</p>` : '<p></p>'}${tags}
    <div class="item__foot"><span class="price">${eur(i.p)}</span>
    <button class="add" data-add="${esc(i.id)}" aria-label="Añadir ${esc(i.n)} al pedido">+<span class="add__n"></span></button></div></div>
  </article>`;
}

/* ---------- Carta / desayunos ---------- */
function menuRow(i) {
  const image = i.i ? `<img class="menu-row__photo" src="img/dishes/s/${i.i}.jpg" alt="" loading="lazy" width="144" height="144">` : '';
  const label = i.t.includes('mes') ? '<span class="menu-row__label">Burger del mes</span>' : i.t.includes('picante') ? '<span class="menu-row__label">Picante</span>' : '';
  return `<article class="item menu-row ${image ? 'menu-row--photo' : ''}" data-open="${esc(i.id)}" tabindex="0" aria-label="Ver detalles de ${esc(i.n)}">${image}
    <div class="menu-row__copy">${label}<h3>${esc(i.n)}</h3>${i.d ? `<p>${esc(i.d)}</p>` : ''}<span class="menu-row__details">Ver detalles ↗</span></div>
    <div class="menu-row__action"><span class="price">${eur(i.p)}</span><button class="add" data-add="${esc(i.id)}" aria-label="Añadir ${esc(i.n)} al pedido">+<span class="add__n"></span></button></div>
  </article>`;
}
const menuEl = $('#menu');
if (menuEl) {
  const mode = menuEl.dataset.mode || 'all';
  const state = { tab: mode === 'desayunos' ? 'todo' : 'hamburguesas', filters: new Set(), q: '', sort: 'original' };
  const tabsEl = $('#tabs'), chipsEl = $('#chips'), qEl = $('#q');
  const groups = MENU.desayunos.groups;
  const pool = mode === 'desayunos' ? groups.flatMap(g => g.items) : allItems;
  const hash = decodeURIComponent(location.hash.slice(1));
  if (mode !== 'desayunos' && MENU[hash]) state.tab = hash;

  const tabList = mode === 'desayunos'
    ? [['todo', 'Todo'], ...groups.map((g, k) => ['g' + k, g.g])]
    : Object.entries(MENU).map(([k, c]) => [k, c.label]);
  const matches = i => {
    if (state.filters.size && ![...state.filters].every(f => i.t.includes(f))) return false;
    return state.q ? norm(i.n + ' ' + i.d + ' ' + i.t.join(' ')).includes(norm(state.q)) : true;
  };
  const filters = mode === 'desayunos' ? ['dulce', 'veg'] : FILTERS;
  const compare = (a,b) => state.sort==='asc'?a.p-b.p:state.sort==='desc'?b.p-a.p:0;
  const render = () => {
    tabsEl.innerHTML = tabList.map(([k, l]) => `<button class="tab" role="tab" data-tab="${k}" aria-selected="${!state.q && k === state.tab}">${esc(l)}</button>`).join('');
    const category = $('#menuCategory');
    if (category) {
      category.innerHTML = tabList.map(([k, l]) => `<option value="${k}">${esc(l)}</option>`).join('');
      category.value = state.tab;
    }
    chipsEl.innerHTML = filters.map(f => `<button class="chip" data-f="${f}" aria-pressed="${state.filters.has(f)}">${TAGLABEL[f]}</button>`).join('');
    let html = '', n = 0;
    if (state.q) {
      const res = pool.filter(matches).sort(compare);
      html = res.length ? res.map(menuRow).join('') : `<div class="empty">Nada por aquí con “${esc(state.q)}”. Prueba con otra palabra.</div>`;
    } else if (mode === 'desayunos') {
      groups.forEach((g, k) => {
        if (state.tab !== 'todo' && state.tab !== 'g' + k) return;
        const its = g.items.filter(matches).sort(compare); if (!its.length) return;
        html += `<h3 class="menu__group">${esc(g.g)}</h3>` + its.map(i => { n++; return menuRow(i); }).join('');
        if (g.note) html += `<div class="menu__note">${esc(g.note)}</div>`;
      });
      if (!n) html = `<div class="empty">Nada con esos filtros.</div>`;
    } else {
      const c = MENU[state.tab];
      if (c.note) html += `<div class="menu__note">${esc(c.note)}</div>`;
      const its = (c.groups ? c.groups.flatMap(g => g.items) : c.items).filter(matches).sort(compare);
      html += `<h3 class="menu__group">${esc(c.label)}</h3>`;
      html += its.length ? its.map(menuRow).join('') : `<div class="empty">Ningún plato de esta sección cumple los filtros.</div>`;
      if (c.groups) c.groups.filter(g => g.note).forEach(g => { html += `<div class="menu__note">${esc(g.note)}</div>`; });
    }
    menuEl.innerHTML = html;
    if ($('#resultCount')) $('#resultCount').textContent = menuEl.querySelectorAll('.item').length + ' platos para elegir';
    dispatchEvent(new Event('menu-render'));
  };
  tabsEl.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (!b) return; state.tab = b.dataset.tab; state.q = ''; qEl.value = ''; render(); });
  $('#menuCategory')?.addEventListener('change', e => { state.tab = e.target.value; state.q = ''; qEl.value = ''; render(); });
  chipsEl.addEventListener('click', e => { const b = e.target.closest('[data-f]'); if (!b) return; state.filters.has(b.dataset.f) ? state.filters.delete(b.dataset.f) : state.filters.add(b.dataset.f); render(); });
  qEl.addEventListener('input', e => { state.q = e.target.value.trim(); render(); });
  $('#menuSort')?.addEventListener('change',e=>{state.sort=e.target.value;render()});
  $('#resetMenu')?.addEventListener('click',()=>{state.q='';state.filters.clear();state.sort='original';qEl.value='';$('#menuSort').value='original';render();qEl.focus()});
  tabsEl.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const buttons=[...tabsEl.querySelectorAll('button')],i=buttons.indexOf(document.activeElement),j=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[j].click();tabsEl.querySelectorAll('button')[j].focus()});

  render();
}

/* ---------- Destacados (los que Just Eat marca como destacados) ---------- */
const feat = $('#featured');
if (feat) feat.innerHTML = ['Doble Dosis', 'La Puerquita', 'La Dori', 'La Triplona', 'Gordi Deluxe', 'Patatas trufadas']
  .map((n, k) => card(allItems.find(i => i.n === n), k)).join('');

/* ---------- Contadores ---------- */
$$('[data-stat]').forEach(el => {
  const k = el.dataset.stat;
  el.textContent = k === 'burgers' ? MENU.hamburguesas.items.length : k === 'dishes' ? allItems.length : k;
});

/* ---------- Horario y estado (orientativo, según Toppings & Salads) ---------- */
const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const HOURS = { 0: [9, 23.5], 1: [8, 23], 2: [8, 23], 3: [8, 23], 4: [8, 23], 5: [8, 24], 6: [9, 24] };
const fmt = h => `${String(Math.floor(h) % 24).padStart(2, '0')}:${h % 1 ? '30' : '00'}`;
const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
const today = now.getDay(), hr = now.getHours() + now.getMinutes() / 60;
const hoursEl = $('#hours');
if (hoursEl) {
  hoursEl.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => `<li class="${d === today ? 'today' : ''}"><span>${DAYS[d]}</span><span>${fmt(HOURS[d][0])} – ${fmt(HOURS[d][1])}</span></li>`).join('');
  $('#todayLabel').textContent = 'hoy, ' + DAYS[today].toLowerCase();
}
const st = $('#openStatus');
if (st) {
  const [o, c] = HOURS[today], open = hr >= o && hr < c;
  st.textContent = open ? `Abierto ahora · hasta las ${fmt(c)}` : `Cerrado ahora · abrimos ${hr < o ? 'hoy' : 'mañana'} a las ${fmt(hr < o ? o : HOURS[(today + 1) % 7][0])}`;
  st.previousElementSibling.classList.toggle('on', open);
}
$$('.yr').forEach(e => e.textContent = new Date().getFullYear());

/* ---------- Pedido por WhatsApp ---------- */
const WA = '34747486092';
const openNow = (() => { const [o, c] = HOURS[today]; return hr >= o && hr < c; })();
const nextOpen = (() => { const [o] = HOURS[today]; return hr < o ? `hoy a las ${fmt(o)}` : `mañana a las ${fmt(HOURS[(today + 1) % 7][0])}`; })();
let cart = [];
try { cart = JSON.parse(localStorage.getItem('alma-cart2') || '[]'); } catch (e) { cart = []; }
cart = Array.isArray(cart) ? cart.filter(l => byId(l.id)) : [];
const persist = () => { try { localStorage.setItem('alma-cart2', JSON.stringify(cart)); } catch (e) {} };
const lineTotal = l => byId(l.id).p * l.qty;
const total = () => cart.reduce((s, l) => s + lineTotal(l), 0);
const count = () => cart.reduce((s, l) => s + l.qty, 0);
const countOf = id => cart.filter(l => l.id === id).reduce((s, l) => s + l.qty, 0);

const cartEl = $('#cart'), scrim = $('#scrim'), toastEl = $('#toast'), bar = $('#orderbar');
let editing = null, toastT;
function toast(msg) {
  toastEl.innerHTML = `<span>${msg}</span><button type="button" data-view>Ver pedido</button>`;
  toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 3200);
}
toastEl.addEventListener('click', e => { if (e.target.closest('[data-view]')) { toastEl.classList.remove('on'); openCart(true); } });
let cartReturnFocus=null;
cartEl.inert=true;
const lock = o => document.documentElement.classList.toggle('lock', !!o);
function openCart(o) {
  if(o){cartReturnFocus=document.activeElement;cartEl.inert=false;}else{cartEl.inert=true;cartReturnFocus?.focus();}
  cartEl.setAttribute('role','dialog');cartEl.setAttribute('aria-modal',String(o));
  cartEl.classList.toggle('open', o); scrim.classList.toggle('on', o); cartEl.setAttribute('aria-hidden', !o); lock(o);
  if (o) setTimeout(() => $('#cartClose').focus(), 50);
}
function push(id, opt = '', qty = 1) {
  const l = cart.find(x => x.id === id && x.opt === opt);
  if (l) l.qty += qty; else cart.push({ id, opt, note: '', qty });
  persist(); draw();
  const b = $('#cartOpen'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
}
function addItem(id) {
  const it = byId(id);
  if (it.o) return openOpt(it);
  push(id); toast(`<b>${esc(it.n)}</b> añadido ✓`);
}

/* modal de opciones */
const om = document.createElement('div'); om.className = 'modal'; om.id = 'optModal';
om.innerHTML = `<div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="omT"><button class="modal__x" type="button" aria-label="Cerrar">✕</button>
  <h3 id="omT"></h3><p class="modal__s" id="omS"></p><div class="choices" id="omChoices"></div>
  <button class="btn btn--solid btn--block" id="omOk" type="button">Añadir al pedido</button></div>`;
document.body.appendChild(om);
let omItem = null;
function openOpt(it) {
  omItem = it; $('#omT').textContent = it.n; $('#omS').textContent = `${eur(it.p)} · Elige una opción`;
  $('#omChoices').innerHTML = it.o.map((c, k) => `<label class="choice"><input type="radio" name="opt" value="${esc(c)}" ${k ? '' : 'checked'}><span>${esc(c)}</span></label>`).join('');
  om.classList.add('on'); lock(true);
}
const closeModals = () => { $$('.modal').forEach(m => m.classList.remove('on')); lock(cartEl.classList.contains('open')); };
om.addEventListener('click', e => {
  if (e.target === om || e.target.closest('.modal__x')) closeModals();
  if (e.target.closest('#omOk')) {
    const v = $('input[name=opt]:checked', om).value; push(omItem.id, v); closeModals(); toast(`<b>${esc(omItem.n)}</b> (${esc(v.toLowerCase())}) añadido ✓`);
  }
});

/* dibujar carrito */
function draw() {
  const n = count(), t = total();
  $('#cartCount').textContent = n;
  $('#cartTotal').textContent = eur(t);
  $('#cartEmpty').hidden = n > 0; $('#checkout').hidden = !n; $('#cartList').hidden = !n; $('#cartFoot').hidden = !n;
  $('#cartList').innerHTML = cart.map((l, k) => { const i = byId(l.id); return `<li>
    <div class="ln"><b>${l.qty}× ${esc(i.n)}</b><span>${eur(lineTotal(l))}</span></div>
    ${l.opt ? `<small>${esc(l.opt)}</small>` : ''}
    <div class="qty"><button type="button" data-dec="${k}" aria-label="Quitar uno">−</button><span>${l.qty}</span><button type="button" data-inc="${k}" aria-label="Añadir uno">+</button>
      <button type="button" class="lnk" data-note="${k}">${l.note ? 'Editar nota' : 'Añadir nota'}</button><button type="button" class="lnk" data-rm="${k}">Quitar</button></div>
    ${editing === k ? `<input class="noteinp" data-ni="${k}" maxlength="120" value="${esc(l.note)}" placeholder="Sin cebolla, poco hecha…">` : (l.note ? `<small class="note">“${esc(l.note)}”</small>` : '')}</li>`; }).join('');
  if (editing !== null) { const inp = $('[data-ni]'); if (inp) inp.focus(); }
  $('#orderbarN').textContent = n; $('#orderbarT').textContent = eur(t);
  bar.hidden = !n || cartEl.classList.contains('open'); document.body.classList.toggle('has-bar', !!n);
  sync();
}
function sync() {
  $$('[data-add]').forEach(b => { const n = countOf(b.dataset.add); b.classList.toggle('in', n > 0); const s = $('.add__n', b); if (s) s.textContent = n || ''; });
}
addEventListener('menu-render', sync);
document.addEventListener('click', e => { const b = e.target.closest('[data-add]'); if (b) addItem(b.dataset.add); });
$('#cartList').addEventListener('click', e => {
  const g = a => { const x = e.target.closest(`[${a}]`); return x ? +x.getAttribute(a) : null; };
  const inc = g('data-inc'), dec = g('data-dec'), rm = g('data-rm'), nt = g('data-note');
  if (inc !== null) cart[inc].qty++;
  if (dec !== null) { cart[dec].qty--; if (cart[dec].qty <= 0) cart.splice(dec, 1); }
  if (rm !== null) cart.splice(rm, 1);
  if (nt !== null) { editing = editing === nt ? null : nt; }
  persist(); draw();
});
const saveNote = e => { const inp = e.target.closest('[data-ni]'); if (!inp) return; cart[+inp.dataset.ni].note = inp.value.trim(); editing = null; persist(); draw(); };
$('#cartList').addEventListener('focusout', saveNote);
$('#cartList').addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.matches('[data-ni]')) { e.preventDefault(); saveNote(e); } });
$('#cartClear').addEventListener('click', () => { if (!cart.length || confirm('¿Vaciar el pedido?')) { cart = []; persist(); draw(); } });
$('#cartOpen').addEventListener('click', () => openCart(true));
$('#cartClose').addEventListener('click', () => openCart(false));
bar.addEventListener('click', () => openCart(true));
scrim.addEventListener('click', () => openCart(false));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { openCart(false); closeModals(); pm && pm.classList.remove('on'); } });

/* formulario de pedido */
const ck = $('#checkout');
$('#closedNote').hidden = openNow;
$('#closedNote').textContent = `Ahora estamos cerrados. Puedes enviar el pedido y lo prepararemos al abrir (${nextOpen}).`;
try { const c = JSON.parse(localStorage.getItem('alma-cust') || '{}'); if (c.nombre) ck.nombre.value = c.nombre; if (c.tel) ck.tel.value = c.tel; } catch (e) {}
const syncForm = () => { $('#fHora').hidden = ck.cuando.value !== 'hora'; ck.hora.required = ck.cuando.value === 'hora'; };
ck.addEventListener('change', syncForm); syncForm();
ck.addEventListener('submit', e => {
  e.preventDefault(); if (!cart.length) return;
  const v = Object.fromEntries(new FormData(ck));
  try { localStorage.setItem('alma-cust', JSON.stringify({ nombre: v.nombre, tel: v.tel })); } catch (er) {}
  const cuando = v.cuando === 'hora' ? `a las ${v.hora}` : 'lo antes posible';
  const lines = cart.map(l => `• ${l.qty}x ${byId(l.id).n}${l.opt ? ` (${l.opt})` : ''} — ${eur(lineTotal(l))}${l.note ? `\n   ↳ ${l.note}` : ''}`);
  const info = [`*Nombre:* ${v.nombre}`, v.tel && `*Teléfono:* ${v.tel}`, `*Tipo:* Para recoger en el local`, `*Recogida:* ${cuando}`].filter(Boolean);
  const extra = [v.alergias && `*Alergias/intolerancias:* ${v.alergias}`, v.notas && `*Notas:* ${v.notas}`].filter(Boolean);
  const msg = ['¡Hola Alma Burger! Quiero hacer un pedido para recoger 🍔', '', ...info, '', '*Pedido:*', ...lines, '', `*Total:* ${eur(total())} (IVA incluido)`, ...(extra.length ? ['', ...extra] : []), '', '¿Me confirmáis? ¡Gracias!'].join('\n');
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

/* menú «Pedir» de la cabecera */
const pb = $('#pedirBtn'), pm = $('#pedirMenu');
if (pb) {
  pb.addEventListener('click', e => { e.stopPropagation(); const o = pm.classList.toggle('on'); pb.setAttribute('aria-expanded', o); });
  document.addEventListener('click', e => { if (!e.target.closest('.pedir')) { pm.classList.remove('on'); pb.setAttribute('aria-expanded', false); } });
}
const goOrder = () => {
  pm && pm.classList.remove('on');
  if (count()) return openCart(true);
  if (menuEl && menuEl.dataset.mode === 'all') { menuEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); toast('Pulsa <b>+</b> en los platos que quieras'); }
  else location.href = 'carta.html#pedir';
};
document.addEventListener('click', e => { if (e.target.closest('[data-wa-order]')) { e.preventDefault(); goOrder(); } });
if (location.hash === '#pedir' && menuEl) setTimeout(() => toast('Pulsa <b>+</b> en los platos que quieras'), 600);

/* menú sorpresa */
const sm = document.createElement('div'); sm.className = 'modal'; sm.id = 'surprise';
sm.innerHTML = `<div class="modal__box modal__box--wide" role="dialog" aria-modal="true" aria-labelledby="smT"><button class="modal__x" type="button" aria-label="Cerrar">✕</button>
  <h3 id="smT">Tu menú sorpresa</h3><p class="modal__s">Una burger, algo para compartir y un postre. Si no te gusta, otra tirada.</p>
  <div class="reels" id="reels"></div><div class="modal__row"><span class="price" id="smTotal"></span><button class="btn" type="button" id="smAgain">Otra tirada</button><button class="btn btn--solid" type="button" id="smAdd">Añadir los 3 al pedido</button></div></div>`;
document.body.appendChild(sm);
const rnd = a => a[Math.floor(Math.random() * a.length)];
let picks = [], spinning = false;
const pools = [['Burger', MENU.hamburguesas.items], ['Para compartir', MENU.compartir.items], ['Postre', MENU.postres.items]];
function spin() {
  if (spinning) return; spinning = true;
  picks = pools.map(([l, p]) => { const it = rnd(p); return { it, opt: it.o ? rnd(it.o) : '' }; });
  const rs = $('#reels'); rs.innerHTML = pools.map(([l]) => `<div class="reel spin"><small>${l}</small><div class="reel__v">…</div></div>`).join('');
  $('#smTotal').textContent = ''; $('#smAdd').disabled = true;
  const els = $$('.reel', rs);
  els.forEach((el, k) => {
    const v = $('.reel__v', el), t0 = Date.now(), dur = 900 + k * 450;
    const iv = setInterval(() => {
      if (Date.now() - t0 > dur) {
        clearInterval(iv); const { it, opt } = picks[k]; el.classList.remove('spin'); el.classList.add('done');
        v.innerHTML = `${it.i ? `<img src="img/dishes/s/${it.i}.jpg" alt="">` : ''}<b>${esc(it.n)}</b>${opt ? `<em>${esc(opt)}</em>` : ''}<span>${eur(it.p)}</span>`;
        if (k === 2) { spinning = false; $('#smAdd').disabled = false; $('#smTotal').textContent = 'Total ' + eur(picks.reduce((s, p) => s + p.it.p, 0)); }
      } else v.textContent = rnd(pools[k][1]).n;
    }, 70);
  });
}
const openSurprise = () => { sm.classList.add('on'); lock(true); spin(); };
document.addEventListener('click', e => { if (e.target.closest('[data-surprise]')) { pm && pm.classList.remove('on'); openSurprise(); } });
sm.addEventListener('click', e => {
  if (e.target === sm || e.target.closest('.modal__x')) closeModals();
  if (e.target.closest('#smAgain')) spin();
  if (e.target.closest('#smAdd') && !spinning) { picks.forEach(p => push(p.it.id, p.opt)); closeModals(); openCart(true); }
});

/* progreso de lectura */
const prog = $('#progress');
const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; };
addEventListener('scroll', onScroll, { passive: true }); onScroll();
draw();

/* ---------- Reserva por WhatsApp ---------- */
const rf = $('#reserva');
if (rf) {
  const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  rf.fecha.min = d.toISOString().slice(0, 10);
  rf.addEventListener('submit', e => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(rf));
    const f = new Date(v.fecha + 'T00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const msg = `¡Hola Alma Burger! Quisiera reservar mesa:\n• Nombre: ${v.nombre}\n• Personas: ${v.personas}\n• Día: ${f}\n• Hora: ${v.hora}${v.nota ? '\n• Nota: ' + v.nota : ''}\n\n¿Me confirmáis? ¡Gracias!`;
    window.open('https://wa.me/34747486092?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  });
}

/* ---------- Lightbox ---------- */
const mis = $$('.mi');
if (mis.length) {
  const lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Foto ampliada');
  lb.innerHTML = '<button class="x" aria-label="Cerrar">✕</button><button class="p" aria-label="Anterior">‹</button><img alt="" hidden><button class="n" aria-label="Siguiente">›</button><p></p>';
  document.body.appendChild(lb);
  let cur = 0;
  const show = k => { cur = (k + mis.length) % mis.length; const im = $('img', mis[cur]); $('img', lb).hidden = false; $('img', lb).src = im.currentSrc || im.src; $('img', lb).alt = im.alt; $('p', lb).textContent = $('figcaption', mis[cur])?.textContent || im.alt; lb.classList.add('on'); };
  mis.forEach((m, k) => m.addEventListener('click', () => show(k)));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.matches('.x')) lb.classList.remove('on'); if (e.target.matches('.p')) show(cur - 1); if (e.target.matches('.n')) show(cur + 1); });
  document.addEventListener('keydown', e => { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') lb.classList.remove('on'); if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
}

/* ---------- Nav, reveal, parallax ---------- */
const nav = $('#nav'), links = $('.nav__links'), burger = $('#burgerBtn');
const stuck = () => nav.classList.toggle('is-stuck', scrollY > 30);
addEventListener('scroll', stuck, { passive: true }); stuck();
function closeNavigation(){links.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Abrir menú')}
burger.addEventListener('click', () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', o);burger.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú') });
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&links.classList.contains('open')){closeNavigation();burger.focus()}});
document.addEventListener('click',e=>{if(!nav.contains(e.target))closeNavigation()});
links.addEventListener('click',e=>{if(e.target.closest('a'))closeNavigation()});

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
const hv = $('#heroVisual');
if (hv && matchMedia('(hover:hover)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  const ph = $$('.hero__photo', hv);
  hv.addEventListener('mousemove', e => {
    const r = hv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    ph[0].style.transform = `rotate(${-3 + x * 3}deg) translate(${x * 10}px,${y * 10}px)`;
    ph[1].style.transform = `rotate(${5 - x * 4}deg) translate(${-x * 16}px,${-y * 16}px)`;
  });
}

/* ---------- Ficha del plato (ventana con la foto completa) ---------- */
const JE = 'https://www.just-eat.es/restaurants-alma-burger-ordizia/menu';
const AI_SLUGS = new Set(['la-basica', 'la-golosa', 'la-cabrona', 'la-diabla', 'tequenos', 'alitas', 'ensalada', 'panceta', 'hot-clasica', 'hot-gordita', 'hot-quesuda', 'hot-picantona', 'tarta-lotus', 'tarta-pistacha', 'tarta-ferrero', 'coulant', 'crepe']);
const dm = document.createElement('div'); dm.className = 'modal dish'; dm.id = 'dishModal';
dm.innerHTML = `<div class="dish__box" role="dialog" aria-modal="true" aria-labelledby="dishT">
  <button class="modal__x" type="button" aria-label="Cerrar">✕</button>
  <div class="dish__media" id="dishMedia"><div class="dish__bg" id="dishBg"></div><img id="dishImg" alt="" decoding="async" hidden><div class="dish__none" id="dishNone"></div>
    <span class="dish__ai" id="dishAi" hidden>Imagen orientativa generada por IA</span>
    <button class="dish__nav dish__nav--p" type="button" aria-label="Plato anterior">‹</button><button class="dish__nav dish__nav--n" type="button" aria-label="Plato siguiente">›</button>
    <span class="dish__count" id="dishCount"></span></div>
  <div class="dish__info"><span class="dish__cat" id="dishCat"></span><h3 id="dishT"></h3><div class="tags" id="dishTags"></div><p class="dish__desc" id="dishDesc"></p>
    <div class="choices" id="dishOpts"></div>
    <div class="dish__foot"><div class="dish__buy"><span class="price" id="dishPrice"></span><div class="stepper"><button type="button" data-q="-1" aria-label="Menos">−</button><span id="dishQ">1</span><button type="button" data-q="1" aria-label="Más">+</button></div></div>
    <button class="btn btn--solid btn--block" type="button" id="dishAdd"></button></div>
    <p class="dish__fine">Pedido para recoger por WhatsApp. ¿A domicilio? <a href="${JE}" target="_blank" rel="noopener">Pídelo en Just Eat ↗</a><br>Consulta nuestra carta de alérgenos al personal. Las imágenes son orientativas.</p></div></div>`;
document.body.appendChild(dm);
const D = { list: [], k: 0, qty: 1, from: null };
const dq = s => $(s, dm);
function renderDish(dir) {
  const it = byId(D.list[D.k]); if (!it) return;
  const box = dq('.dish__box');
  const m = dq('#dishMedia');
  m.classList.remove('swap-l', 'swap-r'); void m.offsetWidth; if (dir) m.classList.add(dir > 0 ? 'swap-r' : 'swap-l');
  const img = dq('#dishImg'), bg = dq('#dishBg'), none = dq('#dishNone');
  if (it.i) {
    img.hidden = false; none.hidden = true; img.alt = it.n;
    bg.style.backgroundImage = `url(img/dishes/s/${it.i}.jpg)`;
    img.src = `img/dishes/${it.i}.jpg`;
  } else { img.hidden = true; none.hidden = false; none.innerHTML = RIG; bg.style.backgroundImage = 'none'; }
  dq('#dishAi').hidden = !(it.i && AI_SLUGS.has(it.i));
  dq('#dishCat').textContent = MENU[it.cat].label;
  dq('#dishT').textContent = it.n;
  dq('#dishTags').innerHTML = it.t.map(t => `<span class="tag ${t === 'nuevo' || t === 'mes' ? 'tag--new' : ''}">${TAGLABEL[t]}</span>`).join('');
  dq('#dishDesc').textContent = it.d || 'Sin descripción. Pregúntanos en el local si tienes dudas.';
  dq('#dishOpts').innerHTML = it.o ? `<p class="choices__t">Elige una opción</p>` + it.o.map((c, k) => `<label class="choice"><input type="radio" name="dopt" value="${esc(c)}" ${k ? '' : 'checked'}><span>${esc(c)}</span></label>`).join('') : '';
  dq('#dishPrice').textContent = eur(it.p);
  D.qty = 1; dq('#dishQ').textContent = 1; dishBtn();
  dq('#dishCount').textContent = D.list.length > 1 ? `${D.k + 1} / ${D.list.length}` : '';
  $$('.dish__nav', dm).forEach(b => b.hidden = D.list.length < 2);
  box.scrollTop = 0; dq('.dish__info').scrollTop = 0;
  [1, -1].forEach(d => { const o = byId(D.list[(D.k + d + D.list.length) % D.list.length]); if (o && o.i) new Image().src = `img/dishes/${o.i}.jpg`; });
}
const dishBtn = (done) => { const it = byId(D.list[D.k]); dq('#dishAdd').textContent = done ? 'Añadido ✓' : `Añadir al pedido · ${eur(it.p * D.qty)}`; };
function openDish(id, from) {
  const vis = $$('.item[data-open]').filter(e => e.offsetParent !== null).map(e => e.dataset.open);
  D.list = vis.includes(id) ? [...new Set(vis)] : [id]; D.k = D.list.indexOf(id); D.from = from || null;
  renderDish(0); dm.classList.add('on'); lock(true); setTimeout(() => dq('.modal__x').focus(), 60);
}
const stepDish = d => { D.k = (D.k + d + D.list.length) % D.list.length; renderDish(d); };
document.addEventListener('click', e => {
  const it = e.target.closest('.item[data-open]');
  if (it && !e.target.closest('.add')) openDish(it.dataset.open, it);
});
document.addEventListener('keydown', e => {
  const it = e.target.closest && e.target.closest('.item[data-open]');
  if (it && e.target === it && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openDish(it.dataset.open, it); }
  if (!dm.classList.contains('on')) return;
  if (e.key === 'ArrowLeft') stepDish(-1);
  if (e.key === 'ArrowRight') stepDish(1);
});
dm.addEventListener('click', e => {
  if (e.target === dm || e.target.closest('.modal__x')) { closeModals(); if (D.from) D.from.focus({ preventScroll: true }); return; }
  if (e.target.closest('.dish__nav--p')) stepDish(-1);
  if (e.target.closest('.dish__nav--n')) stepDish(1);
  const q = e.target.closest('[data-q]');
  if (q) { D.qty = Math.max(1, Math.min(20, D.qty + +q.dataset.q)); dq('#dishQ').textContent = D.qty; dishBtn(); }
  if (e.target.closest('#dishAdd')) {
    const it = byId(D.list[D.k]); const o = $('input[name=dopt]:checked', dm);
    push(it.id, o ? o.value : '', D.qty); dishBtn(true); setTimeout(() => dm.classList.contains('on') && dishBtn(), 1400);
    toast(`<b>${esc(it.n)}</b>${D.qty > 1 ? ` ×${D.qty}` : ''} añadido ✓`);
  }
});
// deslizar la foto para cambiar de plato
(() => {
  const m = dq('#dishMedia'); let x0 = null, y0 = 0;
  m.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  m.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && D.list.length > 1) stepDish(dx < 0 ? 1 : -1); }, { passive: true });
})();



/* Selection helper uses only dishes already present in the menu. */
const tastes={clasica:['La Básica','Doble Dosis'],potente:['La Triplona','La Puerquita'],picante:['Picantona','La Diabla']};
function showTaste(key){const result=$('#tasteResult');if(!result)return;result.innerHTML=tastes[key].map((name,k)=>card(allItems.find(i=>i.n===name),k)).join('');$$('[data-taste]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.taste===key)));dispatchEvent(new Event('menu-render'))}
$$('[data-taste]').forEach(b=>b.addEventListener('click',()=>showTaste(b.dataset.taste)));showTaste('clasica');
$$('[data-rail]').forEach(b=>b.addEventListener('click',()=>$('#featured').scrollBy({left:Number(b.dataset.rail)*330,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})));
const motionToggle=$('#motionToggle');
motionToggle?.addEventListener('click',()=>{const pause=document.documentElement.classList.toggle('motion-paused');motionToggle.setAttribute('aria-pressed',String(pause));motionToggle.textContent=pause?'Activar movimiento':'Pausar movimiento';document.dispatchEvent(new CustomEvent('alma-motion',{detail:pause}))});
document.addEventListener('keydown',e=>{
 if(e.key!=='Tab'||!cartEl.classList.contains('open'))return;
 const focusable=[...cartEl.querySelectorAll('button,a,input,textarea,select')].filter(el=>!el.disabled&&el.getClientRects().length);
 const first=focusable[0],last=focusable.at(-1);
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
});
})();
