# Fakebook

A modular, production-focused social networking reference application built with a Java (Spring) multi-module backend and a modern React + Vite frontend. This README explains the architecture, key features, how to run the project (development and Docker), environment variables, and contributor guidance — crafted to help engineers quickly understand, run, and contribute to the project.

---

## Quick highlights

- Backend: Java 23, Spring Boot multi-module (domain, infrastructure, application, controller, start).
- Frontend: React 19, Vite, Tailwind-based UI, i18n, Firebase storage integration, real-time chat (WebSocket + STOMP).
- Auth: JWT-based authentication and token refresh flows.
- Dev ergonomics: Hot reload for the frontend (Vite), Maven for the backend, Docker and docker-compose for local stacks.

---

## Project purpose

Fakebook is a full-stack sample/social application designed as a learning and evaluation platform. It demonstrates:
- Clean separation of concerns via a multi-module Maven backend.
- Modern frontend tooling and patterns (React + Vite, providers, hooks, and modular components).
- Real-time messaging using WebSocket/STOMP.
- Secure authentication with JWT and token management.
- Integration with external storage (Firebase) for user assets.

---

## Repo layout (high-level)

- `/fe` — Frontend (React + Vite). Key files: `package.json`, `src/App.jsx`, routes, hooks, services, and UI components.
- `/be` — Backend parent module (Maven). Contains 5 modules:
  - `domain` — core domain models
  - `infrastructure` — adapters, repositories
  - `application` — business logic/services
  - `controller` — REST/WebSocket controllers
  - `start` — Spring Boot starter module (produces executable jar)
- `/be/environment` — docker-compose for running backend + MySQL locally.

---

## Tech stack

- Backend: Java 23, Spring Boot, Spring Security, java-jwt, Lombok, WebSocket (spring-boot-starter-websocket)
- Frontend: React 19, Vite, TailwindCSS, i18next, Firebase, Axios, Formik, Yup
- Realtime: STOMP over WebSocket (`@stomp/stompjs`)
- Build & packaging: Maven (multi-module), Vite
- Containerization: Docker, Docker Compose

---

## Local development (recommended)

Prerequisites (install on your machine):
- Java 23 (OpenJDK 23)
- Maven 3.8+
- Node.js (18+ recommended) and npm or yarn
- Docker & Docker Compose (for containerized runs)

Important: examples below assume you are using Windows `cmd.exe` (replace with PowerShell or bash equivalents where needed).

1) Start the frontend (dev mode)

Open a terminal and run:

```cmd
cd fe
npm install
npm run dev
```

(Or with yarn)

```cmd
cd fe
yarn
yarn dev
```

Vite will start with hot module reload (HMR). The local URL will be printed by Vite (commonly http://localhost:5173).

2) Start the backend (local Maven build)

From the repository root (or `be` folder):

```cmd
cd be
mvn -DskipTests clean package
```

Run the Spring Boot jar produced by the `start` module. Replace `<jar-file>.jar` with the actual filename generated in `be\start\target`.

```cmd
java -jar start\target\<artifact>-1.0-SNAPSHOT.jar
```

Alternatively, run directly with Maven (convenient during development):

```cmd
cd be\start
mvn spring-boot:run
```

3) Run with Docker Compose (backend + MySQL)

The compose file is located at `be/environment/docker-compose.yaml`. It builds the backend Docker image using the `be/Dockerfile` and starts a MySQL service.

Example (cmd.exe):

```cmd
cd be\environment
:: set required environment variables for docker-compose interpolation
set BE_PORT=8080
set DB_HOST_NAME=mysql
set DB_PORT=3306
set DB_NAME=fakebook_db
set DB_USERNAME=fakebook_user
set DB_PASSWORD=secret
set DB_ROOT_PASSWORD=supersecret

docker-compose up --build
```

Note: `docker-compose.yaml` expects these environment variables. You may also place them in a `.env` file adjacent to the compose file.

---

## Environment variables (quick reference)

The following are referenced by the backend `docker-compose` configuration:

- BE_PORT — external port for the backend service (e.g., 8080)
- DB_HOST_NAME — hostname for MySQL service (used inside compose)
- DB_PORT — MySQL port (default 3306)
- DB_NAME — database name
- DB_USERNAME — database user
- DB_PASSWORD — database password
- DB_ROOT_PASSWORD — root user password

Frontend may use Vite env vars (VITE_ prefix) if present for API base URLs or feature flags — check `fe/src/config` or `fe/src/service` for usages.

---

## Notable implementation details

- Authentication: JWT token handling and refresh flows live in the frontend util (tokenService) and backend security configuration (Spring Security + java-jwt).
- Real-time chat: STOMP client (`@stomp/stompjs`) on the frontend and Spring WebSocket on the backend provide pub/sub messaging for chat.
- Media storage: frontend integrates Firebase SDK for uploading user images.
- Modular design: backend modules separate domain, application logic, infrastructure adapters, controllers, and the runnable `start` module.
- Frontend structure: provider-based global state, hooks for contacts/chat, and reusable UI components.

---

## Useful developer scripts

Frontend (from `fe`):
- npm run dev — start dev server (HMR)
- npm run build — production build
- npm run preview — preview the production build
- npm run lint — run ESLint
- npm run prettier — format code with Prettier

Backend (from `be`):
- mvn -DskipTests clean package — build all modules and create jar
- mvn -pl start spring-boot:run — run start module in dev mode

Docker:
- docker-compose up --build — build images and start services
- docker-compose down -v — tear down and remove volumes

---

## Project conventions and coding guidance

- Java: target Java 23; follow package separation used by modules. Use Lombok for boilerplate reduction, prefer immutability in domain objects where appropriate.
- Frontend: follow existing component and hooks structure (`src/components`, `src/hooks`, `src/service`). Use i18n for user-facing strings; keep logic in services and hooks, not in view components.
- Tests: add unit tests in the standard Maven/Node locations (JUnit for backend, your preferred test runner for frontend).

---

Thank you for checking out Fakebook — a modular, opinionated starter for a social app with modern frontend tooling and a production-ready Java backend.
