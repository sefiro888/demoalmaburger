"""Genera las dos versiones de la web (multipágina) a partir de la misma base.
   python _src/build.py  ->  opcion-1-color/  y  opcion-2-fiel-logo/  (+ index.html selector en la raíz)"""
import shutil, pathlib, json
from html import escape

SRC = pathlib.Path(__file__).parent
ROOT = SRC.parent
THEMES = {
    'opcion-1-color':     dict(css='theme-color.css', name='Opción 1 · Color', other='opcion-2-fiel-logo', tcolor='#1a00ad'),
    'opcion-2-fiel-logo': dict(css='theme-fiel.css',  name='Opción 2 · Fiel al logo', other='opcion-1-color', tcolor='#0b0b0b'),
}
PAGES = [('el-alma.html', 'El alma', 'alma'), ('carta.html', 'Carta', 'carta'), ('desayunos.html', 'Desayunos', 'desayunos'),
         ('galeria.html', 'Galería', 'galeria'), ('visitanos.html', 'Visítanos', 'visitanos')]
JE = 'https://www.just-eat.es/restaurants-alma-burger-ordizia/menu'
PUBLIC_URL = 'https://sefiro888.github.io/demoalmaburger/'
SHARE_IMAGE = PUBLIC_URL + 'opcion-2-fiel-logo/img/logo-anim.png'
SHARE_TITLE = 'Alma Burger · Una web con alma'
SHARE_DESCRIPTION = 'Toda la personalidad de Alma Burger en una nueva web: mascotas, carta y desayunos. Descubre las dos propuestas y elige tu favorita.'


def social_meta(title, description, page=''):
    title, description = escape(title, quote=True), escape(description, quote=True)
    url = PUBLIC_URL + page
    return f'''<meta property="og:type" content="website">
<meta property="og:site_name" content="Alma Burger">
<meta property="og:locale" content="es_ES">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SHARE_IMAGE}">
<meta property="og:image:secure_url" content="{SHARE_IMAGE}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="2000">
<meta property="og:image:height" content="2000">
<meta property="og:image:alt" content="Logo original de Alma Burger con su mascota hamburguesa">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="twitter:image" content="{SHARE_IMAGE}">
<link rel="canonical" href="{url}">'''


def rig(w=150, extra=''):
    return (f'<div class="rig {extra}" style="--w:{w}px" aria-hidden="true"><div class="bob">'
            '<img class="legL" src="img/mascot-legL.png" alt=""><img class="legR" src="img/mascot-legR.png" alt="">'
            '<img class="body" src="img/mascot-body.png" alt=""></div></div>')


def walker(w=100, t=26):
    return (f'<div class="walker" aria-hidden="true" style="--w:{w}px;--t:{t}s"><div class="walker__x">'
            f'<div class="walker__flip">{rig(w)}</div></div></div>')


def nav(active):
    links = ''.join(f'<a href="{h}"{" aria-current=\"page\"" if k == active else ""}>{t}</a>' for h, t, k in PAGES)
    return f'''<header class="nav" id="nav">
  <a class="nav__logo" href="index.html" aria-label="Alma Burger, inicio">{rig(46, 'rig--still')}<span>Alma Burger</span></a>
  <nav class="nav__links" aria-label="Principal">{links}</nav>
  <div class="nav__actions">
    <button class="cartbtn" id="cartOpen" aria-label="Abrir mi pedido para recoger"><span class="cartbtn__t">Recoger</span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1.2 11H6.2L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="cartbtn__n" id="cartCount">0</span></button>
    <a class="btn btn--je btn--sm nav__je" href="{JE}" target="_blank" rel="noopener"><span class="long">Pedir a domicilio</span><span class="short">Domicilio</span> ↗</a>
    <button class="burger" id="burgerBtn" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span></button>
  </div>
</header>'''


CTA = f'''<section class="sec cta" style="padding-bottom:140px;border-top:var(--bw) solid var(--ink)">
  <div class="wrap" style="display:flex;flex-wrap:wrap;gap:26px;justify-content:space-between;align-items:center">
    <h2 class="sec__title reveal" style="margin:0">¿Te entra <em>el hambre</em>?</h2>
    <div class="btnrow reveal" style="margin:0">
      <a class="btn btn--je" href="{JE}" target="_blank" rel="noopener">Pedir a domicilio · Just Eat ↗</a>
      <button class="btn" type="button" data-wa-order>Recoger por WhatsApp</button>
      <a class="btn" href="carta.html">Ver la carta</a>
    </div>
  </div>
</section>'''

FOOT = f'''<footer class="foot">
  {walker(96, 30)}
  <img class="foot__word" src="img/wordmark-cream.png" alt="Alma Burger">
  <div class="foot__grid">
    <div><h4>Donde el sabor tiene alma</h4><p>Smash burgers, picoteo, hot dogs, postres y desayunos en el corazón de Ordizia.</p></div>
    <div><h4>Explora</h4><ul><li><a href="index.html">Inicio</a></li>{''.join(f'<li><a href="{h}">{t}</a></li>' for h, t, k in PAGES)}</ul></div>
    <div><h4>Contacto</h4><ul><li>Kale Nagusia 42, 20240 Ordizia</li><li><a href="tel:+34747486092">747 48 60 92</a></li>
      <li><a href="https://wa.me/34747486092" target="_blank" rel="noopener">WhatsApp</a></li>
      <li><a href="https://www.instagram.com/almaburgers/" target="_blank" rel="noopener">Instagram @almaburgers</a></li>
      <li><a href="{JE}" target="_blank" rel="noopener">Just Eat</a></li></ul></div>
  </div>
  <div class="foot__row"><p>© <span class="yr"></span> Alma Burger · Consulta nuestra carta de alérgenos al personal</p><p>Demo de diseño web</p></div>
</footer>'''

CART = f'''<aside class="cart" id="cart" aria-hidden="true" aria-label="Mi pedido">
  <div class="cart__head"><h2>Pedido para recoger</h2><button id="cartClose" type="button" aria-label="Cerrar pedido">✕</button></div>
  <div class="cart__scroll">
    <div class="cart__empty" id="cartEmpty"><img src="img/mascot.png" alt="" width="110"><p><b>Tu pedido para recoger está vacío</b></p><p>Pulsa <b>+</b> en cualquier plato de la carta.</p>
      <div class="btnrow" style="justify-content:center;margin:14px 0 0"><a class="btn btn--solid btn--sm" href="carta.html">Ver la carta</a><button class="btn btn--sm" type="button" data-surprise>Sorpréndeme</button></div>
      <div class="jebox"><b>¿Lo quieres a domicilio?</b><span>Pídelo en Just Eat.</span><a class="btn btn--je btn--sm" href="{JE}" target="_blank" rel="noopener">Pedir a domicilio ↗</a></div></div>
    <ul class="cart__list" id="cartList" hidden></ul>
    <form class="checkout" id="checkout" hidden>
      <div class="jebox jebox--top"><b>Solo para recoger en el local</b><span>¿A domicilio? Se pide en Just Eat.</span><a class="btn btn--je btn--sm" href="{JE}" target="_blank" rel="noopener">Ir a Just Eat ↗</a></div>
      <h3>Tus datos</h3>
      <div class="form__row"><label>Nombre<input name="nombre" required autocomplete="name" placeholder="Tu nombre"></label><label>Teléfono <small>(opcional)</small><input name="tel" type="tel" autocomplete="tel" placeholder="6XX XX XX XX"></label></div>
      <div class="form__row"><label>¿Cuándo lo recoges?<select name="cuando"><option value="asap">Lo antes posible</option><option value="hora">A una hora concreta</option></select></label>
        <label id="fHora" hidden>Hora<input type="time" name="hora"></label></div>
      <label>Alergias o intolerancias<input name="alergias" maxlength="140" placeholder="Gluten, lactosa, frutos secos…"></label>
      <label>Notas del pedido<textarea name="notas" rows="2" maxlength="240" placeholder="Algo más que debamos saber"></textarea></label>
      <p class="hint warn" id="closedNote" hidden></p>
    </form>
  </div>
  <div class="cart__foot" id="cartFoot" hidden>
    <div class="cart__total"><span>Total</span><b id="cartTotal">0,00€</b></div>
    <button class="btn btn--solid btn--block" type="submit" form="checkout">Enviar pedido para recoger</button>
    <div class="cart__alt"><button class="lnk" id="cartClear" type="button">Vaciar pedido</button><span>·</span><a href="{JE}" target="_blank" rel="noopener">¿A domicilio? Just Eat ↗</a></div>
    <p>Se abrirá WhatsApp con tu pedido escrito y el local te lo confirmará. Pedidos solo para recoger.</p>
  </div>
</aside>
<div class="scrim" id="scrim"></div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<button class="orderbar" id="orderbar" type="button" hidden><span class="orderbar__n" id="orderbarN">0</span><span>Ver mi pedido</span><b id="orderbarT">0,00€</b></button>
<div class="progress" id="progress" aria-hidden="true"></div>
<a class="wa" href="https://wa.me/34747486092" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.6-4.8A9 9 0 1 1 8 19.5L3 21Z"/><path d="M9 10c0 2.800 2.200 5 5 5l1.200-1.300-1.800-1-.8.700a4 4 0 0 1-1.700-1.700l.7-.8-1-1.800L9 10Z" fill="currentColor" stroke="none"/></svg></a>'''



def shell(active, title, desc, body, tcolor, page=''):
    return f'''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="{tcolor}">
{social_meta(title, desc, page)}
<link rel="icon" type="image/png" href="img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
<script type="application/ld+json">{{"@context":"https://schema.org","@type":"Restaurant","name":"Alma Burger","url":"https://almaburgers.com","telephone":"+34747486092","servesCuisine":["Hamburguesas","Desayunos","Postres"],"priceRange":"€€","address":{{"@type":"PostalAddress","streetAddress":"Kale Nagusia 42","postalCode":"20240","addressLocality":"Ordizia","addressRegion":"Gipuzkoa","addressCountry":"ES"}},"geo":{{"@type":"GeoCoordinates","latitude":43.054023,"longitude":-2.178607}},"sameAs":["https://www.instagram.com/almaburgers/"]}}</script>
</head>
<body>
<a class="skip" href="#contenido">Saltar al contenido</a>
{nav(active)}
<main id="contenido">
{body}
</main>
{CTA}
{FOOT}
{CART}
<nav class="mobile-dock" aria-label="Accesos rápidos"><a href="carta.html">La carta</a><button type="button" data-wa-order>Recoger</button><a href="visitanos.html">Visítanos</a></nav><button class="motion-toggle" type="button" id="motionToggle" aria-pressed="false">Pausar movimiento</button>
<script src="app.js"></script>
{('<script src="precision.js"></script>') if active == '' and 'motion-stage' in body else ''}
</body>
</html>'''


def phero(crumb, h1, lead, pic=None, pic_alt='', dark=False):
    illustrations = {
        'Carta': ('carta', 'El hot dog de Alma presenta la carta'),
        'Desayunos': ('desayunos', 'La hamburguesa de Alma disfruta de un café'),
        'El alma': ('alma', 'La hamburguesa de Alma abraza un corazón'),
        'Galería': ('galeria', 'La hamburguesa de Alma posa con una cámara'),
        'Visítanos': ('visitanos', 'El hot dog de Alma te da la bienvenida'),
    }
    if crumb in illustrations:
        asset, alt = illustrations[crumb]
        iw, ih = (1536, 1024) if asset == 'carta' else (1347, 1167)
        return f'''<section class="phero phero--illustrated phero--{asset}" aria-labelledby="page-title">
  <div class="phero__canvas" aria-hidden="true"></div>
  <div class="wrap phero__layout">
    <nav class="crumbs" aria-label="Migas de pan"><a href="index.html">Inicio</a><span>/</span><span>{crumb}</span></nav>
    <figure class="phero__illustration"><img src="img/illustrations/{asset}.png" alt="{alt}" width="{iw}" height="{ih}" fetchpriority="high"></figure>
    <div class="phero__intro">
      <h1 id="page-title">{h1}</h1>
      <p class="lead">{lead}</p>
    </div>
  </div>
</section>'''
    p = f'<figure class="phero__pic reveal"><img src="img/{pic}" alt="{pic_alt}"></figure>' if pic else ''
    return f'''<section class="phero{' phero--dark' if dark else ''}{' phero--pic' if pic else ''}">
  <div class="wrap">
    <nav class="crumbs" aria-label="Migas de pan"><a href="index.html">Inicio</a><span>/</span><span>{crumb}</span></nav>
    <h1 class="reveal">{h1}</h1>
    <p class="lead reveal">{lead}</p>
  </div>
  {p}
  <div class="phero__line"></div>
  {walker(104, 24)}
</section>'''


# ---------------------------------------------------------------- páginas
STAGE = (SRC / 'precision-stage.svg.html').read_text(encoding='utf-8')
MOTION_CONTROLS = (SRC / 'precision-controls.html').read_text(encoding='utf-8')


IG = ''.join(f'<a class="ig reveal" href="https://www.instagram.com/almaburgers/" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><img src="img/{f}" alt="" loading="lazy"></a>' for f in ['burger.jpg', 'picoteo.jpg', 'pancake.jpg', 'trufadas.jpg', 'matcha.jpg', 'tostada.jpg'])


def home():
    marq = ''.join(f'<span>{t}</span><i>✶</i>' for t in ['Smash burgers', 'Picoteo', 'Hot dogs', 'Desayunos hasta las 12:00', 'Tartas de queso', 'Matcha'])
    return f'''<section class="hero hero--brand">
  <div class="hero__brand">
    <h1 class="sr-only">Alma Burger · Hamburguesas y desayunos en Ordizia</h1>
    <div class="stagewrap">{STAGE}{MOTION_CONTROLS}</div>
  </div>
  <div class="hero__welcome">
    <p class="kicker">Ordizia · Kale Nagusia 42</p>
    <h2 class="hero__headline">Donde el sabor<br>tiene <em>alma.</em></h2>
    <p class="hero__intro">Buenas burgers, desayunos con calma y momentos para compartir.</p>
    <div class="hero__cta">
      <a class="btn btn--solid" href="carta.html">Elige tu burger →</a>
      <a class="btn" href="desayunos.html">Ver desayunos</a>
    </div>
    <p class="hero__delivery"><button class="lnk" type="button" data-wa-order>Para recoger</button><span aria-hidden="true"> · </span><a href="{JE}" target="_blank" rel="noopener">A domicilio ↗</a></p>
    <p class="hero__status"><span class="dot"></span><span id="openStatus">Hamburguesería · Ordizia</span></p>
    <a class="hero__story-link" href="#nuestra-historia">Nuestra historia ↓</a>
  </div>
</section>
<div class="wrap"><nav class="quick-routes" aria-label="Descubre la carta"><a href="carta.html#hamburguesas"><span>Smash burgers<small>Encuentra la tuya</small></span><b>↗</b></a><a href="carta.html#compartir"><span>Para compartir<small>La mejor compañía</small></span><b>↗</b></a><a href="desayunos.html"><span>Desayunos<small>Empieza con alma</small></span><b>↗</b></a><a href="carta.html#postres"><span>Algo dulce<small>Deja un hueco</small></span><b>↗</b></a></nav></div>
<section class="sec home-story" id="nuestra-historia" aria-labelledby="home-story-title">
  <div class="wrap home-story__grid">
    <div class="home-story__copy">
      <p class="kicker reveal">Nuestra historia</p>
      <h2 class="sec__title reveal" id="home-story-title">Todo empezó <em>con una idea.</em></h2>
      <p class="home-story__lead reveal">Un lugar para disfrutar de buenas hamburguesas y compartir momentos con amigos.</p>
      <p class="reveal">Así nació Alma Burger: con ganas de cocinar con cariño y dar importancia a cada ingrediente. Elegimos la carne y el pan con cuidado y preparamos cada hamburguesa al momento.</p>
      <p class="reveal">Para nosotros, la experiencia también está en la compañía y en sentirse a gusto. Seguimos creciendo con esa misma ilusión: que te sientas como en casa y tengas ganas de volver.</p>
      <a class="btn reveal" href="el-alma.html">Conoce el alma de Alma →</a>
    </div>
    <figure class="home-story__art reveal"><img src="img/illustrations/alma.png" alt="La hamburguesa de Alma abraza un corazón" loading="lazy" width="1347" height="1167"></figure>
  </div>
</section>
<div class="marquee" aria-hidden="true"><div class="marquee__track">{marq}{marq}</div></div>

<section class="sec"><div class="wrap taste"><div class="taste__intro"><p class="kicker">Tu próxima favorita</p><h2 class="sec__title">¿Qué te <em>pide el cuerpo?</em></h2><p>Elige tu antojo. Te acercamos dos burgers de nuestra carta para empezar.</p><div class="taste__choices" role="group" aria-label="Elige tu antojo"><button data-taste="clasica" aria-pressed="true">Algo clásico</button><button data-taste="potente" aria-pressed="false">Con todo</button><button data-taste="picante" aria-pressed="false">Un toque picante</button></div></div><div class="taste__result" id="tasteResult" aria-live="polite"></div></div></section>
<section class="sec featured-section" style="padding-top:0">
  <div class="wrap">
    <div class="sec__head"><div><p class="kicker reveal">Los destacados</p><h2 class="sec__title reveal">Favoritos <em>con alma</em></h2></div>
      <a class="featured-link reveal" href="carta.html">Toda la carta →</a></div>
    <div class="menu menu--list featured-list" id="featured" aria-label="Platos destacados"></div>
  </div>
</section>

<section class="sec sec--ink" id="como-pedir">
  <div class="wrap">
    <p class="kicker kicker--dark reveal">Pedir es fácil</p><h2 class="sec__title reveal">Elige cómo <em>quieres pedir</em></h2>
    <div class="paths paths--2">
      <div class="path path--main reveal"><span class="path__tag">A domicilio</span><b>En Just Eat</b><span>La forma más cómoda de recibir tu pedido en casa. Se abre nuestra página de Just Eat: allí eliges tus platos y pagas.</span><a class="btn btn--je" href="{JE}" target="_blank" rel="noopener">Pedir a domicilio · Just Eat ↗</a></div>
      <div class="path reveal"><span class="path__tag">Para recoger</span><b>Por WhatsApp</b><span>Arma tu pedido aquí, envíalo en un toque y pásate a recogerlo cuando esté listo.</span><button class="btn btn--line" type="button" data-wa-order>Empezar pedido para recoger</button></div>
    </div>
    <div class="steps" style="margin-top:52px">
      <div class="step reveal"><h3>1 · Elige tus platos</h3><p>Pulsa <b>+</b> en la carta. Si un plato tiene opciones (salsa, relleno…), te las preguntamos.</p></div>
      <div class="step reveal"><h3>2 · Completa tus datos</h3><p>Tu nombre, a qué hora lo recoges y si tienes alergias. Puedes añadir notas a cada plato.</p></div>
      <div class="step reveal"><h3>3 · Envía y recoge</h3><p>Se abre WhatsApp con el pedido escrito. Te lo confirmamos y lo recoges en Kale Nagusia 42.</p></div>
    </div>
    <p class="reveal" style="margin-top:26px;text-align:center">¿No sabes qué pedir? <button class="lnk" type="button" data-surprise style="color:var(--dark-pop);font-size:1rem">Sorpréndeme</button></p>
  </div>
</section>

<section class="sec sec--band">
  <div class="wrap split">
    <div class="split__pic reveal"><figure class="ph" style="inset:0 8% 8% 0;transform:rotate(-3deg)"><img src="img/burger.jpg" alt="La Puerquita" loading="lazy"></figure>
      <figure class="ph" style="width:38%;aspect-ratio:1;right:0;bottom:0;transform:rotate(5deg)"><img src="img/cabrona.jpg" alt="Hamburguesa con queso de cabra y patatas" loading="lazy"></figure></div>
    <div>
      <p class="kicker reveal">Burger del mes</p>
      <h2 class="sec__title reveal">La <em>Puerquita</em></h2>
      <p class="reveal" style="font-size:1.15rem;max-width:30em">Doble carne smash con queso cheddar, jugoso pulled pork en su salsa, salsa Emmy en ambas tapas y ensalada de cebolla encurtida. Todo en pan brioche. Potente, cremosa y tremendamente puerquita.</p>
      <div class="btnrow reveal" style="margin-top:26px"><span class="price" style="font-size:2rem;font-family:var(--display)">18,50€</span>
        <button class="btn btn--solid" type="button" data-add="hamburguesas|La Puerquita">Añadir a mi pedido +</button></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="kicker reveal">Descubre</p><h2 class="sec__title reveal">Todo Alma, <em>en un vistazo</em></h2>
    <div class="tease" style="margin-top:30px">
      <a class="tz tz--illustrated tz--carta tz--wide reveal" href="carta.html"><span class="tz__scene"><img src="img/illustrations/carta.png" alt="" loading="lazy" width="1536" height="1024"></span><span class="tz__go" aria-hidden="true">→</span><div class="tz__in"><span class="tz__eyebrow">Elige tu antojo</span><h3>La carta</h3><p>Hamburguesas, picoteo, bocadillos, hot dogs y postres.</p></div></a>
      <a class="tz tz--illustrated tz--desayunos tz--wide reveal" href="desayunos.html"><span class="tz__scene"><img src="img/illustrations/desayunos.png" alt="" loading="lazy" width="1347" height="1167"></span><span class="tz__go" aria-hidden="true">→</span><div class="tz__in"><span class="tz__eyebrow">Buenos días, Alma</span><h3>Desayunos</h3><p>Tostadas, pancakes, bowls y matcha hasta las 12:00.</p></div></a>
      <a class="tz tz--illustrated tz--alma reveal" href="el-alma.html"><span class="tz__scene"><img src="img/illustrations/alma.png" alt="" loading="lazy" width="1347" height="1167"></span><span class="tz__go" aria-hidden="true">→</span><div class="tz__in"><span class="tz__eyebrow">Lo que nos mueve</span><h3>El alma</h3><p>Nuestra historia.</p></div></a>
      <a class="tz tz--illustrated tz--galeria reveal" href="galeria.html"><span class="tz__scene"><img src="img/illustrations/galeria.png" alt="" loading="lazy" width="1347" height="1167"></span><span class="tz__go" aria-hidden="true">→</span><div class="tz__in"><span class="tz__eyebrow">Momentos con alma</span><h3>Galería</h3><p>Mejor verlo que contarlo.</p></div></a>
      <a class="tz tz--illustrated tz--visitanos reveal" href="visitanos.html"><span class="tz__scene"><img src="img/illustrations/visitanos.png" alt="" loading="lazy" width="1347" height="1167"></span><span class="tz__go" aria-hidden="true">→</span><div class="tz__in"><span class="tz__eyebrow">Te esperamos</span><h3>Visítanos</h3><p>Kale Nagusia 42, Ordizia.</p></div></a>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec__head"><div><p class="kicker reveal">Síguenos</p><h2 class="sec__title reveal" style="margin:0">@almaburgers <em>en Instagram</em></h2></div>
      <div class="btnrow reveal" style="margin:0"><a class="btn btn--solid btn--sm" href="https://www.instagram.com/almaburgers/" target="_blank" rel="noopener">Instagram ↗</a><a class="btn btn--sm" href="https://www.tiktok.com/@almaburgerss" target="_blank" rel="noopener">TikTok @almaburgerss ↗</a></div></div>
    <div class="igrow">{IG}</div>
  </div>
</section>'''


def alma():
    return phero('El alma', 'Donde cada hamburguesa tiene <em>alma</em>', 'Ingredientes elegidos, recetas únicas y un sabor que invita a volver. Esta es nuestra forma de entender la hamburguesa.', 'cabrona.jpg', 'Hamburguesa con queso de cabra y patatas fritas') + f'''
<section class="sec">
  <div class="wrap">
    <p class="kicker reveal">Nuestra historia</p>
    <h2 class="statement reveal">La hamburguesa es la excusa. <span>Lo que importa es compartir el momento.</span></h2>
    <p class="reveal story-origin">Alma nació con la idea de ofrecer hamburguesas de calidad en un lugar para reunirse con amigos. La selección de la carne y el pan, la preparación al momento y las ganas de seguir creciendo forman parte de esa historia.</p>
    <div class="pillars">
      <article class="pillar reveal"><span class="pillar__n">01</span><h3>Ingredientes con carácter</h3><p>Elegimos cada ingrediente, desde la carne hasta el pan. Sin atajos, con recetas únicas que te harán volver.</p></article>
      <article class="pillar reveal"><span class="pillar__n">02</span><h3>Al momento, siempre</h3><p>Cada pedido se prepara cuando lo pides. Smash a la plancha, queso fundido y a la mesa mientras aún humea.</p></article>
      <article class="pillar reveal"><span class="pillar__n">03</span><h3>Como en casa</h3><p>Queremos que cada visita sea un momento para compartir y que te sientas como en casa. Bienvenido a Alma Burger.</p></article>
    </div>
  </div>
</section>

<section class="sec sec--ink">
  <div class="wrap">
    <div class="stats">
      <div class="stat reveal"><b data-stat="burgers"></b><span>hamburguesas en carta</span></div>
      <div class="stat reveal"><b data-stat="dishes"></b><span>platos y bebidas</span></div>
      <div class="stat reveal"><b data-stat="8:00"></b><span>abrimos con desayunos</span></div>
      <div class="stat reveal"><b data-stat="1"></b><span>mascota con gafas</span></div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="kicker reveal">El método</p><h2 class="sec__title reveal">¿Qué es una <em>smash burger</em>?</h2>
    <div class="steps" style="margin-top:40px">
      <div class="step reveal"><h3>Una bola de carne</h3><p>Cada burger empieza con una bola de carne que va directa a una plancha muy caliente.</p></div>
      <div class="step reveal"><h3>Se aplasta (smash)</h3><p>Al aplastarla contra la plancha se forma una costra crujiente que concentra todo el sabor.</p></div>
      <div class="step reveal"><h3>Queso y a la mesa</h3><p>Cheddar fundido, tus toppings favoritos y directa del fuego a tu plato.</p></div>
    </div>
  </div>
</section>

<section class="sec sec--band">
  <div class="wrap split">
    <div class="split__pic"><figure class="ph ph--1 reveal"><img src="img/picoteo.jpg" alt="Aros de cebolla, patatas y croquetas" loading="lazy"></figure>
      <figure class="ph ph--2 reveal"><img src="img/matcha.jpg" alt="Matcha helado" loading="lazy"></figure>
      <figure class="ph ph--3 reveal"><img src="img/pancake.jpg" alt="Pancakes de Ferrero" loading="lazy"></figure></div>
    <div><p class="kicker reveal">Más que hamburguesas</p><h2 class="sec__title reveal">De 8:00 de la mañana <em>a la noche</em></h2>
      <p class="reveal" style="font-size:1.1rem;max-width:30em">Empezamos el día con café, tostadas y pancakes, seguimos con bocadillos y hot dogs, y cerramos con smash burgers, picoteo y tartas de queso.</p>
      <div class="btnrow reveal" style="margin-top:24px"><a class="btn btn--solid" href="desayunos.html">Ver desayunos</a><a class="btn" href="carta.html">Ver la carta</a></div></div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <p class="kicker reveal">Preguntas frecuentes</p><h2 class="sec__title reveal">Lo que <em>nos preguntáis</em></h2>
    <div class="faq" style="margin-top:30px">
      <details class="reveal"><summary>¿Tenéis opciones vegetarianas?</summary><p>Sí: la Gordi Deluxe tiene opción vegetariana, además de ensalada con burrata, tortilla de patata y varias tostadas.</p></details>
      <details class="reveal"><summary>¿Y alérgenos?</summary><p>Tenemos carta de alérgenos: pídesela a nuestro equipo y te ayudamos a elegir con tranquilidad.</p></details>
      <details class="reveal"><summary>¿Hacéis entrega a domicilio?</summary><p>Sí, a través de Just Eat. Por WhatsApp (o llamando al 747 48 60 92) atendemos pedidos para recoger en el local.</p></details>
      <details class="reveal"><summary>¿Puedo reservar mesa?</summary><p>Claro. Desde la página <a href="visitanos.html#reserva"><b>Visítanos</b></a> te preparamos el mensaje de WhatsApp en un momento.</p></details>
      <details class="reveal"><summary>¿Hay menú infantil?</summary><p>Sí: pechuga empanada, lomo o hamburguesa con queso, siempre con patatas y croquetas, por 9,00€.</p></details>
      <details class="reveal"><summary>¿Hasta qué hora hay desayunos?</summary><p>Servimos desayunos desde que abrimos hasta las 12:00.</p></details>
    </div>
  </div>
</section>'''


JEBANNER = f'''
<section class="jebanner"><div class="wrap jebanner__in">
  <div class="jebanner__main"><b>¿Lo quieres a domicilio?</b><span>Pídelo en Just Eat: es la forma más cómoda de recibirlo en casa.</span></div>
  <a class="btn btn--je" href="{JE}" target="_blank" rel="noopener">Pedir a domicilio · Just Eat ↗</a>
  <div class="jebanner__alt"><b>¿Para recoger?</b><span>Pulsa <b>+</b> en los platos y envía el pedido por WhatsApp.</span></div>
</div></section>'''


def menu_panel(breakfast=False):
    title = 'La carta de <em>desayunos</em>' if breakfast else 'La carta, <em>a tu ritmo</em>'
    mode = 'desayunos' if breakfast else 'all'
    label = 'Secciones de desayuno' if breakfast else 'Categorías de la carta'
    hint = 'Café, tostadas, pancakes…' if breakfast else 'Busca tu plato o ingrediente'
    note = 'Desayunos de 8:00 a 12:00.' if breakfast else 'Suplemento por cada ingrediente extra.'
    return f'''<section class="sec menu-section" id="menu-desayunos" aria-label="Carta de platos">
  <div class="wrap">
    <div class="menu-heading">
      <div><h2 class="sec__title">{title}</h2><p>Toca un plato para ver sus detalles. Pulsa + para añadirlo a tu pedido para recoger.</p></div>
      <label class="search"><span aria-hidden="true">⌕</span><input id="q" type="search" placeholder="{hint}" aria-label="Buscar platos" autocomplete="off"></label>
    </div>
    <label class="menu-category" for="menuCategory">¿Qué te apetece?<select id="menuCategory" aria-label="{label}"></select></label>
    <div class="tabs" id="tabs" role="tablist" aria-label="{label}"></div>
    <div class="menu-meta"><output id="resultCount" aria-live="polite"></output><details class="menu-refine"><summary>Filtrar y ordenar</summary>
      <div class="menu-refine__body"><div class="chips" id="chips" aria-label="Filtros"></div>
      <div class="menu-tools"><label>Ordenar <select id="menuSort"><option value="original">Orden de la carta</option><option value="asc">Precio: menor a mayor</option><option value="desc">Precio: mayor a menor</option></select></label><button type="button" id="resetMenu">Limpiar filtros</button></div></div>
    </details></div>
    <div id="menu" class="menu menu--list" data-mode="{mode}" aria-live="polite"></div>
    <p class="carta__note">{note} Consulta nuestra carta de alérgenos al personal.</p>
  </div>
</section>'''


def carta():
    return phero('Carta', 'Elige tu <em>perdición</em>', 'Smash burgers, picoteo para compartir, bocadillos, hot dogs y un final dulce. Encuentra tu próximo antojo.') + menu_panel()


def desayunos():
    return phero('Desayunos', 'Desayunos <em>con alma</em>', 'De 8:00 a 12:00. Donde el café tiene alma y los desayunos también.') + menu_panel(True)


def galeria():
    ig = [('burger.jpg', 'La Puerquita', 'La Puerquita, burger del mes'), ('picoteo.jpg', 'Picoteo con alma', 'Aros de cebolla, patatas y croquetas'),
          ('cabrona.jpg', 'Queso de cabra', 'Hamburguesa con queso de cabra y patatas'), ('trufadas.jpg', 'Patatas trufadas', 'Patatas trufadas'),
          ('tostada.jpg', 'Tostada de salmón', 'Tostada de salmón, aguacate y hummus de remolacha'), ('matcha.jpg', 'Matcha', 'Matcha helado'),
          ('pancake.jpg', 'Pancakes de Ferrero', 'Pancakes con Ferrero Rocher'), ('matcha-2.jpg', 'Un poquito de matcha', 'Matcha con leche'),
          ('desayuno-capricho.jpg', '¿Desayuno o capricho?', 'Pancakes de nutella con fresas')]
    a = ''.join(f'<figure class="mi reveal"><img src="img/{f}" alt="{alt}" loading="lazy"><figcaption>{c}</figcaption></figure>' for f, c, alt in ig)
    bur = [('la-dori', 'La Dori'), ('la-triplona', 'La Triplona'), ('furia-de-pollo', 'Furia de Pollo'), ('la-matru', 'La Matru'),
           ('doble-dosis', 'Doble Dosis'), ('dulce-y-verde', 'Dulce y Verde'), ('gordi-deluxe', 'Gordi Deluxe'), ('picantona', 'Picantona'), ('chickenesa', 'Chickenesa')]
    b = ''.join(f'<figure class="mi reveal"><img src="img/dishes/{s}.jpg" alt="{n}" loading="lazy"><figcaption>{n}</figcaption></figure>' for s, n in bur)
    return phero('Galería', 'Mejor verlo <em>que contarlo</em>', 'Un paseo por nuestros platos. Pulsa en cualquier foto para verla en grande.', 'trufadas.jpg', 'Patatas trufadas') + f'''
<section class="sec sec--band">
  <div class="wrap">
    <div class="sec__head"><h2 class="sec__title reveal" style="margin:0">Desde la <em>cocina</em></h2>
      <a class="btn btn--solid reveal" href="https://www.instagram.com/almaburgers/" target="_blank" rel="noopener">@almaburgers en Instagram ↗</a></div>
    <div class="masonry">{a}</div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    <p class="kicker reveal">De cerca</p><h2 class="sec__title reveal">Las hamburguesas, <em>una a una</em></h2>
    <div class="masonry" style="margin-top:30px">{b}</div>
    <div class="btnrow" style="margin-top:20px"><a class="btn btn--solid" href="carta.html">Ver la carta completa</a></div>
  </div>
</section>'''


def visitanos():
    return phero('Visítanos', 'Ven a <em>vernos</em>', 'En pleno centro de Ordizia, con terraza. Reserva mesa, pide por WhatsApp o déjate caer.') + f'''
<section class="sec sec--ink">
  <div class="wrap visit__grid">
    <div>
      <p class="kicker kicker--dark reveal">Dónde estamos</p>
      <h2 class="visit__title reveal">Kale Nagusia, 42<br>Ordizia</h2>
      <p class="eyebrow reveal" style="color:var(--ink);margin-bottom:26px"><span class="dot"></span><span id="openStatus">Horario</span></p>
      <div class="btnrow reveal">
        <a class="btn btn--cream" href="https://www.google.com/maps/dir/?api=1&destination=43.054023,-2.178607" target="_blank" rel="noopener">Cómo llegar</a>
        <a class="btn btn--line" href="tel:+34747486092">747 48 60 92</a>
        <a class="btn btn--line" href="https://wa.me/34747486092" target="_blank" rel="noopener">WhatsApp</a>
      </div>
      <h3 class="h reveal">Horario <small id="todayLabel" style="font-weight:500;opacity:.7;font-size:.9rem;margin-left:8px"></small></h3>
      <ul class="hours reveal" id="hours"></ul>
      <p class="fine">Horario orientativo: confirma por teléfono o WhatsApp antes de venir.</p>
      <div class="delivery reveal"><b>¿A domicilio?</b><a href="{JE}" target="_blank" rel="noopener">Pide en Just Eat ↗</a><span style="flex-basis:100%;opacity:.8">¿Para recoger? <button class="lnk" type="button" data-wa-order style="color:var(--dark-pop);font-size:1rem">Pide por WhatsApp</button></span></div>
    </div>
    <div class="map reveal"><iframe title="Mapa de Alma Burger en Ordizia" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=-2.1836%2C43.0515%2C-2.1736%2C43.0565&amp;layer=mapnik&amp;marker=43.054023%2C-2.178607"></iframe></div>
  </div>
</section>
<section class="sec" id="reservar">
  <div class="wrap split">
    <div><p class="kicker reveal">Reserva</p><h2 class="sec__title reveal">Guárdanos <em>tu mesa</em></h2>
      <p class="reveal" style="font-size:1.1rem;max-width:28em">Rellena los datos y se abrirá WhatsApp con tu solicitud lista para enviar. Te confirmamos lo antes posible.</p></div>
    <form class="form reveal" id="reserva">
      <label>Nombre<input name="nombre" required autocomplete="name" placeholder="Tu nombre"></label>
      <div class="form__row">
        <label>Personas<select name="personas">{''.join(f'<option>{n}</option>' for n in range(1, 13))}</select></label>
        <label>Día<input type="date" name="fecha" required></label>
      </div>
      <div class="form__row">
        <label>Hora<input type="time" name="hora" required value="21:00"></label>
        <label>Terraza o interior<select name="nota"><option value="">Me da igual</option><option>Terraza</option><option>Interior</option></select></label>
      </div>
      <button class="btn btn--solid btn--block" type="submit">Enviar solicitud por WhatsApp</button>
    </form>
  </div>
</section>'''


def nf():
    return phero('404', 'Esta página se <em>ha comido</em>', 'No encontramos lo que buscas. Pero tenemos hamburguesas: vuelve a la carta y elige una.') + """
<section class="sec" style="text-align:center"><div class="btnrow" style="justify-content:center"><a class="btn btn--solid" href="index.html">Ir al inicio</a><a class="btn" href="carta.html">Ver la carta</a></div></section>"""


TITLES = {
    'index': ('Alma Burger · Hamburguesas y desayunos en Ordizia', 'Smash burgers, picoteo, hot dogs, postres y desayunos en el corazón de Ordizia. Donde el sabor tiene alma.'),
    'alma': ('El alma · Alma Burger', 'La historia de Alma Burger: ingredientes elegidos, recetas únicas y smash burgers hechas al momento en Ordizia.'),
    'carta': ('La carta · Alma Burger', 'Carta completa de Alma Burger: smash burgers, para compartir, bocadillos, hot dogs, postres y menú infantil. Pide por WhatsApp.'),
    'desayunos': ('Desayunos · Alma Burger', 'Desayunos hasta las 12:00 en Ordizia: tostadas, pancakes, bowls, bollería, zumos y matcha.'),
    'galeria': ('Galería · Alma Burger', 'Las mejores fotos de los platos de Alma Burger: hamburguesas, picoteo, desayunos y postres.'),
    'visitanos': ('Visítanos · Alma Burger', 'Kale Nagusia 42, Ordizia. Horario, mapa, contacto y reserva de mesa por WhatsApp.'),
}
BODIES = {'index': home, 'alma': alma, 'carta': carta, 'desayunos': desayunos, 'galeria': galeria, 'visitanos': visitanos}
FILES = {'index': 'index.html', 'alma': 'el-alma.html', 'carta': 'carta.html', 'desayunos': 'desayunos.html', 'galeria': 'galeria.html', 'visitanos': 'visitanos.html'}

SELECTOR = '''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Alma Burger · Elige versión</title>
<link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Bricolage+Grotesque:wght@500;800&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}body{font-family:'Bricolage Grotesque',sans-serif;background:#faf9f5;color:#0b0b0b;min-height:100vh;display:grid;place-items:center;padding:30px}
main{max-width:980px;width:100%;text-align:center}h1{font-family:'Bagel Fat One';font-weight:400;font-size:clamp(2rem,5vw,3.4rem);margin:10px 0 6px}p.s{opacity:.7;margin-bottom:30px}
.g{display:grid;grid-template-columns:1fr 1fr;gap:22px}@media(max-width:700px){.g{grid-template-columns:1fr}}
a{display:block;text-decoration:none;color:inherit;border:3px solid #0b0b0b;border-radius:28px;padding:26px;background:#fff;box-shadow:7px 7px 0 #0b0b0b;transition:transform .2s,box-shadow .2s}
a:hover{transform:translate(-3px,-4px);box-shadow:11px 12px 0 #0b0b0b}h2{font-family:'Bagel Fat One';font-weight:400;font-size:1.7rem;margin-bottom:8px}
.sw{display:flex;gap:8px;justify-content:center;margin:14px 0}.sw i{width:44px;height:44px;border-radius:50%;border:3px solid #0b0b0b}
span.b{display:inline-block;margin-top:10px;background:#0b0b0b;color:#faf9f5;border-radius:99px;padding:8px 20px;font-weight:800}img{height:90px;margin:0 auto}</style></head><body><main>
<img src="opcion-1-color/img/mascot.png" alt=""><h1>Alma Burger · demo web</h1><p class="s">Dos versiones del mismo sitio. Elige cuál ver.</p>
<div class="g"><a href="opcion-1-color/index.html"><h2>Opción 1 · Color</h2><p>Crema + negro del logo, con el azul eléctrico de su carta y un amarillo cheddar de apoyo.</p>
<div class="sw"><i style="background:#faf8f0"></i><i style="background:#0b0b0b"></i><i style="background:#1a00ad"></i><i style="background:#ffc62e"></i></div><span class="b">Ver opción 1</span></a>
<a href="opcion-2-fiel-logo/index.html"><h2>Opción 2 · Fiel al logo</h2><p>Solo los colores del logo: negro y crema. Sin ningún color añadido.</p>
<div class="sw"><i style="background:#faf9f5"></i><i style="background:#0b0b0b"></i></div><span class="b">Ver opción 2</span></a></div></main></body></html>'''


def main():
    for d, t in THEMES.items():
        out = ROOT / d
        out.mkdir(exist_ok=True)
        shutil.copytree(SRC / 'img', out / 'img', dirs_exist_ok=True)
        (out / 'styles.css').write_text((SRC / 'base.css').read_text(encoding='utf-8') + '\n' + (SRC / 'pedido-v2.css').read_text(encoding='utf-8') + '\n' + (SRC / t['css']).read_text(encoding='utf-8') + '\n' + (SRC / 'refinement.css').read_text(encoding='utf-8'), encoding='utf-8')
        shutil.copy(SRC / 'app.js', out / 'app.js')
        (out / 'precision.js').write_text("(() => {\n" + (SRC / 'precision-animation.js').read_text(encoding='utf-8') + "\n})();", encoding='utf-8')
        for k, fn in BODIES.items():
            title, desc = TITLES[k]
            active = {'index': '', 'alma': 'alma', 'carta': 'carta', 'desayunos': 'desayunos', 'galeria': 'galeria', 'visitanos': 'visitanos'}[k]
            (out / FILES[k]).write_text(shell(active, title, desc, fn(), t['tcolor'], f'{d}/{FILES[k]}'), encoding='utf-8')
        (out / '404.html').write_text(shell('', 'Página no encontrada · Alma Burger', 'Página no encontrada', nf(), t['tcolor'], f'{d}/404.html'), encoding='utf-8')
    selector = SELECTOR.replace('<title>Alma Burger · Elige versión</title>', f'<title>{SHARE_TITLE}</title>\n<meta name="description" content="{SHARE_DESCRIPTION}">\n' + social_meta(SHARE_TITLE, SHARE_DESCRIPTION), 1)
    (ROOT / 'index.html').write_text(selector, encoding='utf-8')
    print('ok')


main()
