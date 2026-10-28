# Capturas de proyectos

Los tres paneles actuales son ilustraciones conceptuales, no capturas del producto. Se identifican como tales en la página.

Para agregar tus capturas:

1. Guardá las imágenes acá como `financepet.webp`, `gestion-eventos.webp` y `elgordo-ia.webp`. Recomendado: 1440 × 900, sin datos de clientes ni credenciales.
2. En `index.html`, buscá el comentario `<!-- Captura:` de cada proyecto.
3. Reemplazá **el contenido** del correspondiente `<div class="project-preview ...">` por:

```html
<img
  src="assets/projects/financepet.webp"
  alt="Agenda de turnos de FinancePet"
  width="1440"
  height="900"
  loading="lazy"
/>
```

Adaptá el nombre y el texto alternativo a cada imagen. Conservá el contenedor `.project-preview`: ya es responsive. Al reemplazar todo su contenido también eliminás la leyenda «Vista conceptual».

El sitio es HTML y CSS estático: no necesita compilación. GitHub Pages publica desde `main`.
