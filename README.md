# 🩺 Sistema de Gestión de Consultas Médicas

Este proyecto es una plataforma web para la gestión y solicitud de citas médicas. Permite a los usuarios registrarse, agendar citas con los doctores disponibles, visualizar su historial y cancelar citas si es necesario. El proyecto está estructurado en un único repositorio que integra tanto el Frontend como el Backend.

---

## 🚀 Arquitectura y Tecnologías

### Frontend

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **Vercel**: Plataforma utilizada para el despliegue rápido y optimizado del frontend.

### Backend

- **Node.js & Express**: Entorno de ejecución y framework para la construcción de la API REST.
- **PostgreSQL**: Base de datos relacional para el almacenamiento seguro de usuarios, doctores y citas.
- **Azure**: Plataforma en la nube utilizada para el hospedaje del servidor backend y la base de datos PostgreSQL.

---

## 🌟 Características Principales (CRUD)

El sistema está enfocado principalmente en el flujo del paciente/cliente:

- **Autenticación**: Registro e inicio de sesión de usuarios.
- **Panel de Citas (CRUD Completo)**:
  - **Create**: Solicitar y programar una nueva cita con un doctor disponible.
  - **Read**: Visualizar el historial de citas pendientes y pasadas.
  - **Update/Delete**: Cancelar o modificar el estado de las citas de forma sencilla.
- *Nota*: La lista de doctores está predefinida en el sistema, asegurando un flujo de usuario enfocado puramente en la experiencia del paciente.

---

## 📂 Estructura del Repositorio

El proyecto utiliza una estructura de monorrepo limpia para facilitar el desarrollo y despliegue:

```text
├── backend/          # Código del servidor (Node.js + Express)
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/         # Código de la interfaz de usuario (React)
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md         # Documentación del proyecto
└── ...

```

🛠️ Instalación y Configuración Local
Prerrequisitos

    Node.js (versión LTS recomendada)
    
    Una instancia de PostgreSQL corriendo localmente

Pasos para levantar el proyecto

    Clonar el repositorio:

Bash

   git clone [git@github.com:snake-17/medicalProyect.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
   cd backend/frontend

    Configurar el Backend:

Bash

   cd backend
   npm install

    Crea un archivo .env en la carpeta backend/ siguiendo el formato:

Code snippet

     PORT=5000
     DATABASE_URL=postgresql://usuario:password@localhost:5432/nombre_bd
     JWT_SECRET=tu_clave_secreta_aqui

- Inicia el servidor de desarrollo:
  
  ```bash
     npm run dev
  ```
3. **Configurar el Frontend:**
   
   ```bash
   cd ../frontend
   npm install
   
    Crea un archivo .env en la carpeta frontend/ para apuntar a tu API local:
   ```

Code snippet

     REACT_APP_API_URL=http://localhost:5000

- Inicia la aplicación de React:
  
  ```bash
  npm start
  ```

---

## ☁️ Despliegue (Deployment)

- **Frontend:** Desplegado y optimizado en **Vercel**.
- **Backend & Base de Datos:** Alojados en **Microsoft Azure**.
- *Nota de disponibilidad:* Para optimizar el uso de recursos y créditos de la nube, las instancias de Azure (servidor y base de datos) se pausan temporalmente cuando el proyecto no está en fase de demostración activa o evaluación técnica.
