# Growth Studio · Tu marca, tu estrategia

Una plantilla gratuita y personalizable para que agentes, profesionales y compañías organicen su contenido de Instagram. Empieza con un espacio en blanco: tu perfil, tu audiencia y tus objetivos.

**Incluye nueve módulos:** base de marca, pilares de contenido, ideas, guiones, calendario de 30 días, producción, publicación manual con aprobación, métricas y optimización. También incluye un asistente para preparar instrucciones que puedes copiar a tu herramienta de IA.

## Crea tu propio Studio

1. Pulsa **Use this template → Create a new repository** en GitHub para crear una copia en tu cuenta. También puedes descargar el ZIP desde **Code → Download ZIP**.
2. Despliega tu copia en Vercel con el botón de instalación que aparece más abajo. Se publicará en una dirección propia de Vercel; un dominio personalizado es opcional.
3. Abre tu dirección y entra en **01 Mi base**. Añade tu nombre o marca, sector, audiencia, mercados separados por comas, problema que resuelves y propuesta de valor.
4. Define tus pilares, genera diez ideas, prepara los guiones y organiza el calendario.

Cada copia funciona por separado. No contiene perfiles, contactos, métricas, cuentas de Instagram ni conexiones de otra instalación. Tampoco recibe automáticamente las actualizaciones de esta plantilla.

## Instalación en Vercel

[![Instalar mi Studio en Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fenriquethebroker25-design%2Fgrowth-studio-template&project-name=mi-growth-studio&repository-name=mi-growth-studio)

Puedes publicar sin variables de entorno para empezar en **modo local**. Para sincronizar dispositivos, configura tu proyecto de Supabase antes del despliegue o añade las variables después y vuelve a desplegar.

- Framework: **Other**.
- Build command: `npm run build`.
- Output directory: `public`.
- Node.js: 24 o posterior.

Consulta las condiciones y los costos del proveedor para tu uso antes de contratar un plan. No necesitas comprar un dominio para probar tu copia.

## Usar en tu computador

Instala Node.js 24 o posterior, abre una terminal en la carpeta descargada y ejecuta:

```sh
npm ci
npm run build
npm start
```

Abre **http://127.0.0.1:4173**. Los datos se guardan en ese navegador. Usa **Exportar respaldo** para conservar una copia o transferirla a otra instalación. Abre la aplicación desde el servidor; no necesitas abrir `index.html` con doble clic.

## Sincronización opcional entre dispositivos

La aplicación está lista para conectarse a **tu propio Supabase**. Cada profesional puede tener una instalación y un proyecto independientes. Una compañía también puede instalar una sola copia: cada cuenta tendrá un espacio privado individual; no es un espacio colaborativo compartido.

1. Crea un proyecto en [Supabase](https://supabase.com/dashboard).
2. Abre su **SQL Editor**, pega [la migración](supabase/migrations/001_studio.sql) y ejecútala una sola vez.
3. En la configuración del proyecto copia su **Project URL** y su **publishable key**.
4. En Vercel → tu proyecto → **Environment Variables**, añade:

   | Nombre | Valor |
   | --- | --- |
   | `SUPABASE_URL` | URL de tu proyecto Supabase |
   | `SUPABASE_PUBLISHABLE_KEY` | Clave pública de ese proyecto |

5. En Supabase → **Authentication → URL Configuration**, configura **Site URL** y **Redirect URLs** con la dirección HTTPS exacta de tu instalación.
6. En **Authentication**, habilita el acceso por correo y configura un proveedor SMTP si tus usuarios lo requieren. El servicio de correo predeterminado tiene restricciones de destinatarios y envío; para compartir con agentes externos, prueba el envío con tu proveedor.
7. Vuelve a desplegar y entra en **Sincronización → Enviar enlace de acceso**. Usa el mismo correo en tus dispositivos.

En local puedes copiar `.env.example` a `.env.local` y completar ambos valores antes de `npm run build`. La URL y la clave pública se incluyen en el navegador. **No uses claves secretas ni `service_role` en estas variables.** La migración limita el acceso a los datos de cada usuario.

El trabajo local no se sube automáticamente al entrar a una cuenta. Exporta un respaldo local, inicia sesión e impórtalo desde Inicio. Si hay cambios simultáneos en dos dispositivos, la app conserva ambas versiones y pide elegir antes de reemplazar datos.

## Instalar en celular o escritorio

Después de abrir tu copia publicada en HTTPS, usa **Instalar aplicación** o **Añadir a pantalla de inicio** en el menú del navegador. La disponibilidad depende del navegador. Tras la primera visita, los archivos de la app quedan disponibles para trabajar sin conexión; la sincronización y el acceso por correo necesitan Internet.

## Personalizar para una compañía

- **Sin código:** nombre o marca, compañía, sector, historia, mercados, audiencia, CTA, pilares y todo el contenido se editan en la app.
- **Con código:** cambia colores en `styles.css`, icono en `icon.svg` y nombre de instalación en `manifest.webmanifest`.
- **Repositorio propio:** conserva los datos y las conexiones de tu organización en su propia instalación. No agregues respaldos personales ni archivos `.env.local` a GitHub.

## Alcance de la herramienta

La generación inicial usa estructuras y plantillas editables. No llama automáticamente a una API de IA. No conecta Instagram, Meta Ads ni WhatsApp, y no publica ni programa en Instagram. Las publicaciones y métricas se registran manualmente. Las ideas deben adaptarse a tu especialidad y los guiones requieren revisión antes de usarlos.

## Verificación técnica

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

Los tests comprueban el perfil vacío, personalización, flujo de contenido, respaldos, separación de cuentas, conflictos y archivos sin datos ni conexiones preconfigurados.

## Compartir con tu equipo

Comparte el enlace de este repositorio o [el mensaje listo para enviar](COMPARTIR.md). Cada persona crea una copia con **Use this template**. Una instalación de compañía no comparte el espacio de trabajo entre sus usuarios.

Licencia MIT: puedes usar, modificar y distribuir la plantilla, incluido su uso comercial, conservando la licencia.
