# Task Management Web App

A full-stack **Next.js 13+** web application for managing tasks with authentication, task filtering, and CRUD operations.
Built using **Next.js (App Router)**, **React Query**, **MongoDB (Mongoose)**, **JWT authentication**, and **TailwindCSS**.

---

## 🚀 Features

* User authentication (register, login, JWT-based auth)
* Protected routes with middleware
* Create, read, update, and delete tasks
* Task filtering by **status** and **search**
* Pagination for tasks
* Responsive UI with TailwindCSS
* Optimistic UI updates via React Query

---

## 📦 Tech Stack

* **Frontend**: Next.js 13+, React Query, TailwindCSS, Lucide Icons
* **Backend**: Next.js API Routes, MongoDB with Mongoose
* **Auth**: JSON Web Tokens (JWT), bcryptjs (password hashing)

---

## ⚙️ Prerequisites

* Node.js **18+**
* npm or yarn
* MongoDB instance (local or cloud, e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DarshD22/Task-Management-App
cd Task-Management-App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a **`.env.local`** file in the root directory:

```bash
MONGODB_URI=mongodb-connection-string
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```
task-manager/
├── app/
│   ├── api/              # API routes (auth + tasks CRUD)
│   ├── (auth)/           # Auth pages (login, register)
│   ├── dashboard/        # Dashboard page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── providers.tsx     # React Query provider
├── lib/                  # DB connection, auth utils, API client
├── models/               # Mongoose models (User, Task)
├── components/           # UI components
└── middleware.ts         # Protect dashboard routes
```

---

## 🔑 Authentication

* **Register** → `/api/auth/register`
* **Login** → `/api/auth/login`
* Middleware checks token for protected routes like `/dashboard`.

---

## 📝 API Endpoints

### Auth

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login existing user

### Tasks

* `GET /api/tasks` → Get paginated tasks with filters
* `POST /api/tasks` → Create new task
* `PUT /api/tasks/:id` → Update task
* `DELETE /api/tasks/:id` → Delete task

---

## 📸 Screens (Sample)

* **Login / Register**
* **Dashboard with Task List**
* **Add/Edit/Delete Task**
* **Filters + Pagination**

---

## 🛠️ Deployment

* Deploy frontend/backend together on **Vercel**.
* Ensure environment variables are set in **Vercel Dashboard** (`MONGODB_URI`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`).
* MongoDB can be hosted on **Atlas** or a cloud VM.

---

