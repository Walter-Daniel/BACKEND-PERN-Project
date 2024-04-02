# API REST

Este repositorio contiene el código fuente para una API REST desarrollada con Express y TypeScript, que implementa un CRUD (Crear, Leer, Actualizar, Eliminar) de productos.

## Descripción

La API proporciona servicios RESTful para gestionar productos en una base de datos PostgreSQL utilizando Sequelize ORM. Utiliza Swagger para la documentación de la API.

## Scripts

El proyecto incluye los siguientes scripts:

- **dev**: Inicia el servidor en modo de desarrollo utilizando `nodemon` y `ts-node` para reiniciar automáticamente el servidor cuando se detectan cambios en el código fuente.
- **build**: Compila el código TypeScript utilizando TypeScript Compiler (tsc).
- **test**: Ejecuta pruebas unitarias utilizando Jest.
- **test:coverage**: Genera un informe de cobertura de código utilizando Jest.
- **pretest**: Limpia la base de datos antes de ejecutar las pruebas.

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias utilizando `npm install`.
3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno según sea necesario.
4. Ejecuta el servidor en modo de desarrollo utilizando `npm run dev`.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estas pautas:

- Realiza un fork del repositorio.
- Crea una nueva rama para tu función (`git checkout -b feature/nueva-funcionalidad`).
- Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
- Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
- Crea una nueva Pull Request.

## Documentación de la API

La documentación de la API está disponible en [este enlace](https://rest-api-project-r7uo.onrender.com/docs/).
