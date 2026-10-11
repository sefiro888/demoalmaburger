const fs = require('fs'), path = require('path'), assert = require('assert');
const { JSDOM } = require(process.env.ALMA_QA_MODULES ? path.join(process.env.ALMA_QA_MODULES, 'jsdom') : 'jsdom');
const postcss = require(process.env.ALMA_QA_MODULES ? path.join(process.env.ALMA_QA_MODULES, 'postcss') : 'postcss');
const root = path.resolve(__dirname, '..');
let checks = 0;
function check(value, message) { assert(value, message); checks++; }
function load(theme, page, width, hash = '') {
  const file = path.join(root, theme, page + '.html');
  const dom = new JSDOM(fs.readFileSync(file, 'utf8'), { url: 'https://demo.invalid/' + theme + '/' + page + '.html' + hash, runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, errors = [], opens = [], frames = new Map(); let frameId = 0;
  w.addEventListener('error', e => errors.push(e.error || e.message));
  Object.defineProperty(w, 'innerWidth', {value: width, configurable: true});
  Object.defineProperty(w, 'innerHeight', {value: width < 700 ? 844 : 900, configurable: true});
  w.matchMedia = q => ({matches: q.includes('hover:hover') ? width > 700 : false, addEventListener(){}, removeEventListener(){}});
  w.IntersectionObserver = class { observe(el){el.classList.add('in')} unobserve(){} disconnect(){} };
  w.requestAnimationFrame = f => {frames.set(++frameId, f); return frameId};
  w.cancelAnimationFrame = id => frames.delete(id);
  w.setTimeout = () => 0; w.clearTimeout = () => {};
  w.open = url => opens.push(url); w.confirm = () => true;
  w.HTMLElement.prototype.scrollBy = function(){};
  Object.defineProperty(w.HTMLElement.prototype, 'offsetParent', {get(){return this.parentElement}});
  w.HTMLElement.prototype.getClientRects = function(){return [{}]};
  // jsdom omits the browser's legacy named form properties.
  for (const form of w.document.forms) for (const field of form.elements) if (field.name && !form[field.name]) Object.defineProperty(form, field.name, {value:field});
  w.eval(fs.readFileSync(path.join(root, theme, 'app.js'), 'utf8'));
  if (page === 'index') w.eval(fs.readFileSync(path.join(root, theme, 'precision.js'), 'utf8'));
  const $ = s => w.document.querySelector(s);
  const change = (s, value) => {$(s).value = value; $(s).dispatchEvent(new w.Event('change', {bubbles:true}))};
  const input = value => {$('#q').value = value; $('#q').dispatchEvent(new w.Event('input', {bubbles:true}))};
  const scroll = y => {Object.defineProperty(w, 'scrollY', {value:y, configurable:true}); Object.defineProperty(w.document.documentElement, 'scrollHeight', {value:7000, configurable:true}); w.dispatchEvent(new w.Event('scroll'))};
  return {dom,w,$,change,input,scroll,errors,opens,frames};
}
for (const theme of ['opcion-1-color', 'opcion-2-fiel-logo']) {
  postcss.parse(fs.readFileSync(path.join(root, theme, 'styles.css'), 'utf8'));
  for (const width of [390, 1440]) for (const page of ['index','carta','desayunos','el-alma','galeria','visitanos','404']) {
    const t = load(theme,page,width), {$,w} = t;
    check(t.errors.length === 0, theme+'/'+page+': initialization');
    $('#burgerBtn').click(); check($('#burgerBtn').getAttribute('aria-expanded') === 'true', 'Open navigation');
    w.document.dispatchEvent(new w.KeyboardEvent('keydown', {key:'Escape',bubbles:true})); check($('#burgerBtn').getAttribute('aria-expanded') === 'false', 'Close navigation');
    for (const y of [0,500,3000,6000,0]) t.scroll(y);
    check(!$('#progress').style.transform.includes('NaN'), 'Scroll progress');
    $('#motionToggle').click(); check(w.document.documentElement.classList.contains('motion-paused'), 'Pause motion');
    $('#motionToggle').click(); check(!w.document.documentElement.classList.contains('motion-paused'), 'Resume motion');
    if (page === 'index') {
      check($('#tasteResult').querySelectorAll('.item').length === 2, 'Initial taste');
      $('[data-taste="picante"]').click(); check($('#tasteResult').textContent.includes('Picantona'), 'Taste selection');
      $('[data-rail="1"]').click(); $('#restart').click();
      for(let n=0;n<250;n++){const pending=[...t.frames];t.frames.clear();pending.forEach(([id,f])=>f(n*50))}
      check(!$('#traveler').getAttribute('transform').includes('NaN'), 'Animation numeric coordinates');
    }
    if (page === 'carta' || page === 'desayunos') {
      check($('#menu').querySelectorAll('.item').length === (page === 'carta' ? 16 : 41), 'Initial menu');
      t.change('#menuCategory',page === 'carta' ? 'desayunos' : 'g2');
      check($('#menu').querySelectorAll('.item').length === (page === 'carta' ? 41 : 11), 'Category selection');
      t.input('matcha'); check($('#menu').querySelectorAll('.item').length === 3, 'Search');
      $('#resetMenu').click();
      t.change('#menuCategory',page === 'carta' ? 'hamburguesas' : 'g0');
      t.change('#menuSort','asc');
      const prices=[...w.document.querySelectorAll('#menu .price')].map(x=>Number(x.textContent.replace('€','').replace(',','.')));
      check(prices.every((p,i)=>i===0||p>=prices[i-1]),'Sorting');
      $('#menu .item').click(); check($('#dishModal').classList.contains('on'),'Dish dialog');
      $('#dishModal .modal__x').click(); check(!$('#dishModal').classList.contains('on'),'Close dish dialog');
      $('#menu .add').click(); check($('#cartCount').textContent === '1','Add to cart');
      $('#cartOpen').click(); check($('#cart').classList.contains('open'),'Open cart');
      $('[data-inc="0"]').click(); check($('#cartCount').textContent === '2','Increase quantity');
      $('[data-dec="0"]').click(); check($('#cartCount').textContent === '1','Decrease quantity');
      const ck=$('#checkout');ck.nombre.value='Prueba';ck.cuando.value='hora';ck.hora.value='12:00';
      ck.dispatchEvent(new w.Event('change',{bubbles:true}));check(!$('#fHora').hidden,'Pickup time');
      ck.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
      check(t.opens.some(u=>u.startsWith('https://wa.me/')&&decodeURIComponent(u).includes('Prueba')),'Prepared WhatsApp URL (not sent)');
      $('[data-rm="0"]').click();check($('#cartCount').textContent==='0','Remove item');
      $('#cartClose').click();check(!w.document.documentElement.classList.contains('lock'),'Unlock scroll');
    }
    if(page==='galeria'){
      $('.mi').click();check($('.lb').classList.contains('on'),'Gallery lightbox');$('.lb .n').click();$('.lb .x').click();check(!$('.lb').classList.contains('on'),'Close gallery');
    }
    if(page==='visitanos'){
      const f=$('#reserva');f.nombre.value='Prueba';f.fecha.value='2026-11-20';f.personas.value='2';
      f.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));check(t.opens.some(u=>u.includes('wa.me')),'Prepared reservation URL (not sent)');
    }
    check(t.errors.length===0,theme+'/'+page+': interaction errors '+t.errors.map(String));
    for (const el of w.document.querySelectorAll('[src],a[href],link[href]')) {
      const value=el.getAttribute('src')||el.getAttribute('href');if(!value||/^(https?:|tel:|data:|#)/.test(value))continue;
      const rel=value.split('#')[0].split('?')[0];check(fs.existsSync(path.resolve(root,theme,rel)),'Missing local resource '+value);
    }
    t.dom.window.close();
    console.log(theme+' / '+page+' / '+width+'px: OK (DOM simulation)');
  }
}
console.log(checks+' assertions passed. No browser rendering or visual layout validation performed.');
