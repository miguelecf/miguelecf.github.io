# miguelecf.github.io

> Bienvenido a mi página personal <3

Este es mi rincón en la web: quién soy, en qué he trabajado y lo que voy
construyendo. HTML y CSS puro, sin build ni dependencias, y se publica solo
en **[miguelecf.github.io](https://miguelecf.github.io/)** con cada push a `main`.

## Lo que vas a encontrar

- **Mi historia** — experiencia y el camino hasta acá.
- **Proyectos** — en una vista compacta, con capturas desplegables de FinancePet: [FinancePet](https://miguelecf.github.io/#proyectos),
  [Origo](https://miguelecf.github.io/origo/), [Atlify](https://miguelecf.github.io/atlify/), gestión de eventos y ElGordo IA.
- **Mi CV** — [descargable en PDF](assets/docs/cv-miguel-caraballo.pdf).

## Editar

Todo el contenido vive en `index.html` (por secciones comentadas) y los
estilos en `styles.css`, con los colores arriba en `:root`. Para verlo local:

```bash
python3 -m http.server 8000
```

Commit y push, y en un par de minutos está en la web.

Chequeo de diseño, con Playwright disponible en Node y el servidor activo:

```bash
node scripts/check-layout.cjs http://localhost:8000/
```

Revisa escritorio y móvil, navegación fija, anclas, capturas y descarga del CV.
