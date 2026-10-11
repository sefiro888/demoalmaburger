# Alma Burger · demo web

Propuesta de rediseño web para **Alma Burger** (Kale Nagusia 42, Ordizia). Sitio estático, sin dependencias ni paso de compilación para verlo.

## Ver la demo
- `index.html` → selector con las dos versiones
- `opcion-1-color/` → crema + negro del logo + azul de su carta + amarillo de apoyo
- `opcion-2-fiel-logo/` → solo negro y crema, fiel al logo

Cada versión tiene: Inicio · El alma · Carta · Desayunos · Galería · Visítanos (+ 404).

## Qué incluye
- Cuatro secuencias con la mascota original: mordisco, balanceo, voltereta y equilibrio. El visor `alma-burger-cinco-entradas.html` permite comparar, pausar, avanzar y ver a cámara lenta.
- Balanceo integrado en las dos portadas, con repetición manual y control general de movimiento.
- Selector de antojos con platos de la carta, accesos directos a categorías y navegación inferior en móvil.
- Carta y desayunos con listas ligeras, fotos pequeñas y precios visibles. Selector de categoría fijo en móvil; búsqueda directa y filtros/orden dentro de un desplegable. Se conservan las fichas y el pedido.
- Carta interactiva (≈90 platos) con ficha de cada plato, foto completa y opciones
- Pedido **para recoger por WhatsApp** (carrito con notas, hora y alergias) y **Just Eat** destacado para pedidos a domicilio
- Menú sorpresa, reserva de mesa por WhatsApp, galería con visor, responsive y accesible

## Regenerar
El código fuente está en `_src/`. Las dos versiones se generan con:

```
python _src/build.py
```

> Demo de diseño. Las fotografías y el material original de marca proceden de Alma Burger (web, Instagram y Just Eat). La redacción es una adaptación para esta propuesta; las cinco ilustraciones editoriales nuevas se han creado con IA a partir de referencias de las mascotas, y no son recursos oficiales. Algunas imágenes de Just Eat están marcadas por la plataforma como generadas por IA y son orientativas.

## Animación y diseño

`_src/precision-animation.js` contiene las cuatro coreografías; `_src/precision-stage.svg.html` conserva el logo y la mascota; `_src/refinement.css` contiene los ajustes compartidos por las dos versiones. El generador actualiza las páginas sin borrar las carpetas de salida. El selector principal sigue conservando las dos versiones.

La primera pantalla del inicio da prioridad al logo animado, la bienvenida y dos accesos (carta y desayunos). La historia sigue cerca del inicio.

## Verificación

Consulta `VERIFICACION.md` para las pruebas realizadas, cómo repetirlas y la revisión visual pendiente. El repositorio se publica como `demoalmaburger`; contiene las dos versiones y el visor de las cuatro animaciones.
