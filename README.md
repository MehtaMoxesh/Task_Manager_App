# 🚀 Task Manager Pro: Full-Stack Productivity App

A robust, modern Task Management application featuring a secure **Spring Boot** backend and a responsive **Angular** frontend. 

## ✨ Key Features

- **🔐 Secure Authentication**: Integrated JWT-based login and registration system. 
- **📈 Global Task Dashboard**: 
    - **Admins**: Can oversee, edit, and delete all tasks in the system with creator insights.
    - **Users**: Enjoy a private workspace where only their tasks are visible.
- **🏷️ Smart Task Attributes**:
    - **Dynamic Priority**: LOW, MEDIUM, HIGH.
    - **Status Tracking**: TODO, IN_PROGRESS, COMPLETED.
    - **Due Date Integration**: Keep track of deadlines with a modern date selector.
- **📱 Premium UI**: Built with Angular Material for a sleek, responsive experience.

---

## 🏗️ Project Architecture

```text
Internship-Project/
├── backend/                # Spring Boot REST API
│   ├── src/main/java       # Java Source Code
│   ├── src/main/resources  # Configuration (YAML, SQL)
│   └── pom.xml             # Maven Project Definition
├── frontend/               # Angular Web Application
│   ├── src/app/core        # Core Business Logic (Services, Models)
│   ├── src/app/features    # Feature Modules (Auth, Tasks, Home)
│   └── angular.json        # Angular Workspace Configuration
└── README.md               # You are here!
```

---

## 🚀 Technical Stack

### Backend
- **Framework**: Spring Boot 3.2.4
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **Database**: MySQL 8.x + Spring Data JPA
- **Build Tool**: Maven

### Frontend
- **Framework**: Angular 17
- **Logic**: RxJS, TypeScript
- **Styling**: Angular Material, Vanilla CSS
- **Proxy**: Angular Dev Server Proxy to Backend

---

## 🛠️ API Endpoints

| Category | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/login` | `POST` | Login & receive JWT |
| **Auth** | `/api/auth/register` | `POST` | Register a new user |
| **Tasks** | `/api/tasks` | `GET` | List all tasks (Admin see all, User see own) |
| **Tasks** | `/api/tasks` | `POST` | Create a new task |
| **Tasks** | `/api/tasks/{id}` | `PUT` | Update a task (Full CRUD for Admin) |
| **Tasks** | `/api/tasks/{id}` | `DELETE`| Delete a task |
| **Users** | `/api/users` | `GET` | Manage all users (Admin only) |

---

## 🏁 Getting Started

### 📝 Prerequisites
- **Java**: 17 or higher
- **Node.js**: 18.x or higher
- **MySQL**: 8.x running with user-creation privileges

### 🛠️ Step 1: Backend Setup
```bash
cd backend
# Run Maven wrapper (Windows)
.\mvnw spring-boot:run
```
*The app will automatically seed test users on the first run.*

### 🛠️ Step 2: Frontend Setup
```bash
cd frontend
npm install
npm run start
```
*Access the app at: http://localhost:4200*

---

## 📝 Dummy Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `admin123` |
| **User** | `user@test.com` | `password123` |

---

## 🛠️ System Design Notes
- **User Isolation**: All task-level CRUD operations in `TaskService` check for the user's role and ID to prevent unauthorized data access.
- **Data Seeding**: A `DataInitializer` bean ensures test accounts are present and their passwords match the current encryption algorithm.
- **Proxy Config**: The frontend uses `proxy.conf.json` to route `/api` calls safely to `http://127.0.0.1:8080`.