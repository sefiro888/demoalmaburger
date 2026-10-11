# Verificación · 11/10/2026

Las pruebas recorren las dos versiones, sus siete páginas y escenarios de 390 y 1440 px mediante simulación DOM con jsdom. Pasan 1.468 comprobaciones. La simulación no representa visualmente una pantalla ni valida dimensiones reales, solapamientos, carga de imágenes o fuentes, ni el scroll real de un navegador.

Se verifican inicio y ejecución del JavaScript, menú de navegación y cierre con Escape, eventos de scroll e indicador de progreso, pausa y repetición de animación, selección de antojos, categorías y búsqueda, orden por precio, fichas de platos, carrito y cantidades, apertura y cierre de ventanas, desbloqueo del scroll, galería, y composición de enlaces de pedidos y reservas a WhatsApp. Los enlaces se interceptan: no se envían mensajes. Se valida la sintaxis CSS y la existencia de recursos locales.

La revisión visual en móvil y ordenador queda pendiente porque el navegador bloqueó el protocolo file: y prohibió realizar el mismo acceso mediante alternativas. No se afirma que el diseño visual esté libre de errores.

## Repetir las pruebas

Se necesita Node.js 24 o posterior:

```text
npm install --prefix checks
npm test --prefix checks
```

Se mantienen las fotografías originales, los datos de carta y las cinco ilustraciones editoriales. `REVISION-CONTENIDO.md` documenta las fuentes de información.
