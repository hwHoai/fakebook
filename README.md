# Fakebook - Social Network 🌐

## 1. Project Introduction 👋

Fakebook is a modern social networking web application designed to connect people. It provides a platform for users to interact, share their thoughts, and communicate in real-time. The project is built with a decoupled architecture, featuring a robust Java Spring Boot backend and a dynamic React frontend.

## 2. Visual Demo 🎥

A video demonstration of the Fakebook application is available below. It showcases the user interface, features, and overall user experience.

![Fakebook Demo](./docs/demo/fakebook_demo.gif)

## 3. Key Features ✨

- **User Authentication**: Secure user registration and login system using JWT.
- **Real-time Chat**: Instant messaging with other users powered by WebSockets (StompJS).
- **News Feed**: A dynamic feed to view posts from friends and recommended users. Users can create, read, update, and delete their own posts.
- **User Profiles**: View and manage user profiles, including personal information and posts.
- **Search**: Find other users on the platform by their name.
- **Follow System**: Users can follow and unfollow others to see their posts in the news feed.
- **Responsive UI**: A modern and responsive user interface built with React and Tailwind CSS.

## 4. Tech Stack 🛠️

### Backend ☕

- **Java 23**
- **Spring Boot 3.4.2**
- **Spring Security**: For authentication and authorization.
- **Spring Web & WebSocket**: For REST APIs and real-time communication.
- **Maven**: Dependency management.
- **JSON Web Token (JWT)**: For securing APIs.
- **Lombok**: To reduce boilerplate code.

### Frontend ⚛️

- **React 19**
- **Vite**: Frontend tooling and build tool.
- **Tailwind CSS**: For styling.
- **Axios**: For making HTTP requests to the backend.
- **StompJS**: WebSocket client for real-time features.
- **React Router**: For client-side routing.
- **i18next**: For internationalization.
- **Formik & Yup**: For form handling and validation.
- **Shadcn/ui**: For UI components.

### Database & DevOps 🐬

- **MySQL**: Relational database.
- **Docker & Docker Compose**: For containerization and local development environment setup.
- **Firebase Storage**: For storing user-uploaded images and videos.

## 5. Project Structure 📁

The project is organized into two main parts: a backend (`be`) and a frontend (`fe`).

```
/
├── be/         # Backend (Spring Boot)
│   ├── application/
│   ├── controller/
│   ├── domain/
│   ├── infrastructure/
│   ├── start/
│   ├── environment/
│   └── pom.xml
│
├── fe/         # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── constant/
│   │   ├── hooks/
│   │   ├── redux/
│   │   ├── route/
│   │   ├── screen/
│   │   ├── service/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
└── docs/       # Documentation and demo assets
```

- **`be`**: The backend is a multi-module Maven project following Domain-Driven Design (DDD) principles.

  - `start`: The main entry point of the Spring Boot application.
  - `controller`: Contains REST controllers for handling API requests.
  - `application`: Contains application services and business logic.
  - `domain`: Contains domain models and entities.
  - `infrastructure`: Handles data persistence, external services, and other infrastructure concerns.
  - `environment`: Contains `docker-compose.yaml` for setting up the development environment.

- **`fe`**: The frontend is a React application built with Vite.
  - `src/screen`: Contains the main pages of the application (Login, Register, Chat, etc.).
  - `src/components`: Contains reusable UI components.
  - `src/service`: Contains services for communicating with the backend API.
  - `src/hooks`: Contains custom React hooks for managing state and side effects.
  - `src/redux`: For state management.

## 6. Project Endpoints 🔌

The backend exposes a set of RESTful APIs and WebSocket endpoints. Below is a summary of the main endpoints available under the `/api/v1` prefix.

### Authentication (`/api/v1/user`)

- `POST /register`: User registration.
- `POST /login`: User login.
- `POST /renew_tokens`: Refresh access token using a refresh token.

### Users & Profiles (`/api/v1/user`)

- `GET /info/{userId}`: Get a user's public profile information.
- `PATCH /update/user_avatar`: Update the current user's avatar.
- `GET /search`: Search for users by a query string.
- `GET /search_profile`: Search for user profiles with follow status relative to the current user.
- `GET /recommend/{userId}`: Get a list of recommended users to follow.
- `GET /contacts/{userId}`: Get the contact list (friends) of a user.

### Following (`/api/v1/user`)

- `POST /follow/{profileUserId}`: Follow a user.
- `POST /unfollow/{profileUserId}`: Unfollow a user.
- `GET /check_follow/{profileUserId}`: Check if the current user is following another user.

### Feeds/Posts (`/api/v1/feed`)

- `POST /create`: Create a new post.
- `GET /new_feeds`: Get the news feed for a logged-in user.
- `GET /guest/new_feeds`: Get the news feed for a guest user.
- `GET /user_feeds/{userId}`: Get all feeds posted by a specific user.

### Messaging (`/api/v1/message`)

- `GET /inbox/{userId}`: Get the user's message inbox list.
- `GET /chat/{friendId}`: Get the chat history with a specific friend (paginated).
- `POST /chat/mark_read/{friendId}`: Mark messages from a friend as read.

### Real-time Chat (WebSocket) 💬

- **Endpoint**: `/ws`
- **Send Message**: `@MessageMapping("/chat")` - Send a chat message to this destination.
- **Receive Messages**: Subscribe to `/topic/messages/{userId}` to receive real-time messages.

---
