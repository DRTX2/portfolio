# 🚀 Guía de Despliegue en GitHub Pages

Este proyecto ya está configurado para desplegarse automáticamente en GitHub Pages usando **GitHub Actions**. Sigue estos pasos para poner tu portafolio online.

## 1. Configuración del Proyecto (Antes de subir)

Abre el archivo `astro.config.mjs` en la raíz del proyecto. Necesitas decirle a Astro dónde vivirá tu sitio.

### Caso A: Tu repositorio se llama igual que tu usuario (ej. `midominio.github.io`)

Descomenta y edita solo la línea `site`:

```javascript
export default defineConfig({
  site: 'https://midominio.github.io',
  // base: ignora o borra esta línea
  ...
});
```

### Caso B: Tu repositorio tiene otro nombre (ej. `portfolio`)

Descomenta y edita ambas líneas:

```javascript
export default defineConfig({
  site: 'https://midominio.github.io',
  base: '/portfolio', // El nombre exacto de tu repositorio
  ...
});
```

> **Nota**: Si configuras `base`, asegúrate de que todos tus enlaces internos (como imágenes o links) usen esa base o sean relativos. Astro maneja la mayoría por ti.

---

## 2. Configuración en GitHub

1. Sube tu código a un repositorio en GitHub.
2. Ve a tu repositorio en GitHub y haz clic en la pestaña **Settings** (Configuración).
3. En la barra lateral izquierda, busca la sección **Pages**.
4. En **Build and deployment** > **Source**, selecciona **GitHub Actions**.
   _(Por defecto suele estar en "Deploy from a branch", cámbialo a "GitHub Actions")._

---

## 3. Despliegue Automático

¡Eso es todo! El archivo de workflow que creé en `.github/workflows/deploy.yml` se encarga del resto.

### ¿Cómo funciona el Workflow?

Cada vez que hagas un `git push` a la rama `main`:

1.  **GitHub detecta el cambio** e inicia el workflow.
2.  **Instalación**: Una máquina virtual de Linux descarga tu código e instala las dependencias (`npm install`).
3.  **Construcción**: Ejecuta `npm run build` para que Astro genere tu sitio estático (HTML/CSS/JS).
4.  **Subida**: Sube los archivos generados a los servidores de GitHub Pages.

Puedes ver el progreso en tiempo real en la pestaña **Actions** de tu repositorio. Cuando termine (un círculo verde ✅), tu sitio estará visible en la URL que configuraste.

---

## Solución de Problemas Comunes

- **Estilos o imágenes rotas**: Casi siempre es porque el `base` en `astro.config.mjs` no coincide con el nombre del repositorio.
- **Error en "Actions"**: Revisa los logs. A veces es un error de sintaxis en el código que impide el `npm run build`. Si funciona en local (`npm run build`), debería funcionar en GitHub.
