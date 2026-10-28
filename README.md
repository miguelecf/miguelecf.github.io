# miguelecf.github.io

Mi sitio personal. Es HTML y CSS puro: sin build ni dependencias.
Se publica solo en https://miguelecf.github.io/ cada vez que hago push a `main`.

## Estructura

```
index.html            Todo el contenido de la página
styles.css            Todos los estilos (colores, tipografías, diseño)
origo/                Landing de Origo, con su propio HTML, CSS, fuentes e imágenes
assets/
  favicon.svg         Ícono de la pestaña
  docs/
    cv-miguel-caraballo.pdf
  img/
    perfil/           Mi foto y la imagen para compartir el link (og.jpg)
    proyectos/
      financepet/     Capturas de FinancePet
      gestion-eventos/
      elgordo-ia/
```

## Cómo cambiar cosas

**Textos.** Todo está en `index.html`, dividido en bloques con comentarios
como `<!-- ===== PROYECTOS ===== -->`. Buscá la sección y editá el texto.

**Agregar un trabajo.** En EXPERIENCIA, copiá un `<article class="job">`
completo y pegalo arriba del primero. El más nuevo va primero.

**Agregar un proyecto.** En PROYECTOS, copiá un `<article class="project">`
completo y cambiá el título, la descripción, las tecnologías y el link.

**Agregar capturas a un proyecto.**
1. Poné las imágenes en `assets/img/proyectos/<proyecto>/`, con nombres cortos
   y sin espacios (por ejemplo `inicio.png`). Sin datos de clientes ni
   contraseñas a la vista.
2. En `index.html`, dentro del `<div class="project-preview ...">` del
   proyecto, reemplazá la ilustración por esto (podés poner varias `<img>`):

   ```html
   <div class="preview-shots">
     <img
       src="assets/img/proyectos/elgordo-ia/terminal.png"
       alt="Qué se ve en la captura"
       loading="lazy"
     />
   </div>
   ```

   FinancePet ya está armado así: copialo de ahí.

**Cambiar colores.** Arriba de `styles.css`, en el bloque `:root`. Cada color
tiene un comentario que dice dónde se usa. Cambiándolo ahí, cambia en todo el
sitio.

**Actualizar el CV.** Reemplazá `assets/docs/cv-miguel-caraballo.pdf` por el
nuevo, con el mismo nombre.

## Verlo en mi computadora antes de publicar

```bash
python3 -m http.server 8000
```

Después abrí http://localhost:8000.

## Publicar

```bash
git add .
git commit -m "Describe el cambio"
git push
```

Tarda uno o dos minutos en verse en la web.
