# 🚀 DevPulse – Tech Issue & Feature Tracker

A collaborative platform for development teams to report bugs, suggest features, and manage issue workflows efficiently.

---

# 🌐 Live URL

🔗 https://dev-pulse-tech-issue-feature-tracker.vercel.app

---

# ✨ Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-based access control (`contributor` & `maintainer`)
- 🐞 Create and manage bug reports
- 💡 Submit feature requests
- 📋 View all issues with filtering & sorting
- ✏️ Update issue details and workflow status
- 🗑️ Delete issues (maintainer only)
- 🔒 Secure password hashing using bcrypt
- 📦 PostgreSQL database integration
- ⚡ RESTful API architecture
- 🧩 Modular Express & TypeScript backend structure
- 🚨 Centralized error handling middleware
- 📑 Custom reusable response utilities
- 🌍 CORS configuration support

---

# 🛠️ Tech Stack

## Backend
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Raw SQL (`pg`)

## Authentication & Security
- JWT (`jsonwebtoken`)
- bcrypt

## Deployment
- Vercel
- NeonDB

---

# 📁 Project Structure

```bash
src/
│
├── config/
├── db/
├── middleware/
│   ├── auth.ts
│   ├── corsOptions.ts
│   ├── globalErrorHandle.ts
│   ├── logger.ts
│   └── updateAccess.ts
│
├── modules/
│   ├── auth/
│   └── issues/
│
├── types/
├── utility/
├── app.ts
└── server.ts
```

---

# ⚙️ Environment Variables

```env
PORT=3000

DB_CONNECTION=your_postgresql_database_url

JWT_ACCESS_TOKEN_SECRET=your_secret_key

URL=http://localhost:3000
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/nahian-cse-nubtk/DevPulse-Internal-Tech-Issue-Feature-Tracker.git
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# 🗄️ Database Schema Summary

## Users Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR |
| email | VARCHAR UNIQUE |
| password | VARCHAR |
| role | contributor / maintainer |

---

## Issues Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(150) |
| description | TEXT |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | INTEGER |

---

# 🔗 API Endpoints

## Authentication

```http
POST /api/auth/signup
POST /api/auth/login
```

## Issues

```http
POST   /api/issues
GET    /api/issues
GET    /api/issues/:id
PATCH  /api/issues/:id
DELETE /api/issues/:id
```

---

# 🔐 Authentication

Protected routes require JWT token:

```http
Authorization: your_jwt_token
```

---

# 🚀 Deployment

- Backend: Vercel
- Database: NeonDB PostgreSQL

---

# 👨‍💻 Author

Developed by Shaikh Al Nahian
