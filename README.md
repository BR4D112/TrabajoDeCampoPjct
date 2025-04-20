BR4D112: Crea el readme.md, en español, aclara que use el pnpm run dev, y que para hacer las pruebas del login, se hace cambia el metodo en el FormPanel, igual está incluido el .env.development y se usa 

GitHub Copilot: ```markdown
# TrabajoDeCampoPjct

Este proyecto es una aplicación React diseñada para gestionar el inicio de sesión y otras funcionalidades relacionadas. A continuación, se detallan las instrucciones para ejecutar el proyecto y realizar pruebas.

## Requisitos previos

- Node.js instalado en tu sistema.
- PNPM como gestor de paquetes. Si no lo tienes instalado, puedes hacerlo ejecutando:

```bash
npm install -g pnpm
```

## Instalación

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Instala las dependencias ejecutando:

```bash
pnpm install
```

## Ejecución del proyecto

Para iniciar el servidor de desarrollo, utiliza el siguiente comando:

```bash
pnpm run dev
```

Esto iniciará el proyecto en modo desarrollo. Por defecto, estará disponible en `http://localhost:5173`.

## Pruebas del Login

El proyecto incluye un sistema de autenticación que puede ser probado utilizando respuestas simuladas (mock) o conectándose al servidor real. Para cambiar entre estos métodos, edita el archivo `FormPanel.jsx` ubicado en `src/pages/login/`.

### Cambiar entre métodos de autenticación

En el archivo `FormPanel.jsx`, localiza la función `handleLogin`. Por defecto, se utiliza el método `testAuth` para pruebas locales. Si deseas conectarte al servidor real, reemplaza la línea:

```javascript
result = await testAuth(email, password);
```

Por:

```javascript
result = await auth(email, password);
```

### Variables de entorno

El proyecto utiliza un archivo `.env.development` para configurar las variables de entorno necesarias. Asegúrate de que este archivo esté presente en la raíz del proyecto y contenga las siguientes variables:

```env
VITE_API_BASE_URL=http://tu-servidor-api.com
```

Reemplaza `http://tu-servidor-api.com` con la URL de tu servidor.

## Notas adicionales

- El proyecto incluye respuestas simuladas en el archivo `mockResponses.js` para facilitar las pruebas locales.
- Si encuentras algún problema, revisa la consola del navegador para obtener más detalles sobre los errores.

¡Disfruta trabajando en este proyecto!
```