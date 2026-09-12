# Lux Aeterna

Presentación estática en español de GPT-6 Astra, GPT-5.6 Sol, GPT-5.6 Terra y GPT-5.6 Luna. Proyecto independiente de Apolo Sol Invictus.

## Sitio

`index.html` contiene la estructura; `app.js` incluye el contenido y la navegación; `styles.css` define la experiencia responsive. Las ocho imágenes de fondo están en `assets/`.

Sin compilación, dependencias de producción, claves API ni servicios de backend. Se puede servir la carpeta raíz con cualquier servidor estático. Para desarrollo: `python -m http.server 4173 --bind 127.0.0.1`.

## Navegación

- Rueda vertical, ↑ / ↓, PageUp / PageDown: cambia de agente por pantalla completa.
- Flechas de la interfaz, ← / → o gesto horizontal: cambia de escena dentro del agente.
- Inicio / Fin: primer / último agente.
- En pantallas pequeñas y con texto ampliado, el contenido extenso se puede desplazar antes de pasar al siguiente agente.
- El diálogo “La colección” contiene fuentes, contexto y un control para reducir movimiento. También se respeta la preferencia del sistema.

## Contenido y fuentes

Consultadas el 12 de septiembre de 2026:

- https://developers.openai.com/api/docs/models/gpt-6-astra
- https://developers.openai.com/api/docs/models/gpt-5.6-sol
- https://developers.openai.com/api/docs/models/gpt-5.6-terra
- https://developers.openai.com/api/docs/models/gpt-5.6-luna

Los ejemplos de trabajo son propuestas editoriales. Las capacidades de un agente dependen de las herramientas y permisos del entorno. Las imágenes son interpretaciones artísticas, no representaciones oficiales de los modelos. No se publican benchmarks inventados ni se implica afiliación con OpenAI.

## Publicación

El sitio funciona en GitHub Pages desde la raíz de la rama principal. Las rutas de recursos son relativas para admitir el subdirectorio `/openai/`.
