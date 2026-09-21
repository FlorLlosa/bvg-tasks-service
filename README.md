# BVG Tasks Service

Microservicio encargado de la gestión de tareas, ítems, sectores y plantillas de tareas del sistema.

Forma parte de una arquitectura de microservicios compuesta por:

- API Gateway
- Users/Auth Service
- Tasks Service

## Tecnologías

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- MySQL

## Funcionalidades

### Gestión de tareas

- Creación de tareas
- Listado de tareas
- Consulta de tareas por ID
- Actualización de tareas
- Cambio de estado
- Asignación de tareas a usuarios
- Consulta de tareas asignadas a un usuario

### Ítems de tareas

Las tareas pueden contener diferentes ítems o subtareas.

El servicio permite:

- Agregar ítems a una tarea
- Marcar ítems como completados
- Consultar los ítems asociados a una tarea

### Sectores

Permite crear sectores que pueden utilizarse para organizar las tareas dentro del sistema.

### Plantillas de tareas

El sistema permite definir plantillas reutilizables para facilitar la creación de tareas.

Las plantillas permiten:

- Crear una plantilla
- Consultar una plantilla
- Agregar ítems a una plantilla
- Crear una nueva tarea a partir de una plantilla

## Base de datos

Este microservicio posee su propia base de datos MySQL:

```text
bvg_tasks_db
```

Principales entidades:

- Task
- TaskItem
- Sector
- TaskTemplate
- TaskTemplateItem

Las relaciones y migraciones se administran mediante Prisma ORM.

## Relación con Users/Auth

Este microservicio no accede directamente a la base de datos de usuarios.

Las tareas almacenan identificadores de usuario, por ejemplo:

```text
assignedUserId
createdByUserId
```

La autenticación, los roles y los permisos son responsabilidad del microservicio Users/Auth y del API Gateway.

Esto permite mantener separadas las responsabilidades y las bases de datos de los distintos microservicios.

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/bvg_tasks_db"
PORT=3002
```

## Prisma

Generar el cliente de Prisma:

```bash
npx prisma generate
```

Aplicar las migraciones:

```bash
npx prisma migrate dev
```

## Ejecutar el microservicio

Modo desarrollo:

```bash
npm run start:dev
```

Por defecto el servicio se ejecuta en:

```text
http://localhost:3002
```

## Endpoints principales

### Tasks

```text
GET   /tasks
GET   /tasks/:id
GET   /tasks/assigned/:userId
POST  /tasks
PATCH /tasks/:id
PATCH /tasks/:id/status
PATCH /tasks/:id/assign
```

### Task Items

```text
POST  /tasks/:id/items
PATCH /tasks/:taskId/items/:itemId/complete
```

### Task Templates

```text
POST /tasks/templates
GET  /tasks/templates/:id
POST /tasks/templates/:templateId/items
POST /tasks/templates/:templateId/create-task
```

### Sectors

```text
POST /sectors
```

## Arquitectura

El servicio se ejecuta de manera independiente y mantiene su propia base de datos.

En el funcionamiento integrado del sistema, las solicitudes se realizan a través del API Gateway:

```text
Cliente / Postman
        |
        v
API Gateway :3000
        |
        +----------------------+
        |                      |
        v                      v
Users/Auth :3001         Tasks Service :3002
        |                      |
        v                      v
bvg_users_db             bvg_tasks_db
```

El API Gateway valida la autenticación y los permisos del usuario mediante Users/Auth antes de permitir las operaciones protegidas sobre Tasks.

## Autorización

Los permisos relacionados con tareas son administrados por Users/Auth y validados por el API Gateway.

Entre ellos:

- `TASKS_READ`
- `TASKS_CREATE`
- `TASKS_UPDATE`
- `TASKS_ASSIGN`

Por lo tanto, Tasks se concentra en la lógica de negocio relacionada con las tareas mientras que la autenticación y autorización permanecen desacopladas.

## Repositorios relacionados

Este proyecto forma parte del backend BVG y trabaja en conjunto con:

- `bvg-user-service`
- `bvg-api-gateway`

## Autora

Florencia Llosa

Proyecto - Prácticas Profesionalizantes III
