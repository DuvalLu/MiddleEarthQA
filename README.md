# ⚔️ Middle-Earth Q&A

A Lord of the Rings themed forum where fans can register, log in, and discuss questions about the original trilogy. Built as a full-stack bootcamp final project using 3-tier architecture.

---

## 🗂️ Categories

- The Fellowship
- Races of Middle-Earth
- Locations & Places
- Weapons & Artifacts
- The War of the Ring

---

## 🛠️ Tech Stack

**Frontend:** React, React Router, Axios  
**Backend:** Node.js, Express.js  
**Database:** MySQL

---

## 🌐 Live Demo

- **Frontend:** https://middle-earth-qa.vercel.app
- **Backend API:** https://middleearthqa-backend.onrender.com
- **Database:** FreeSQLDatabase (remote MySQL)

> Note: The backend is hosted on Render's free tier and may take 30-60 seconds to wake up on first request.

---

## ⚙️ Installation Instructions

### Prerequisites

- Node.js installed
- MySQL installed and running
- MySQL Workbench (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/DuvalLu/MiddleEarthQA.git
```

### 2. Database Setup

- Open MySQL Workbench
- Run the `database/schema.sql` file to create the database, tables, and seed data

### 3. Backend Setup

```bash
cd BACKEND
npm install
```

Create a `.env` file in the BACKEND folder with the following:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=forum_app
JWT_SECRET=your_secret_key
```

Then start the server:

```bash
node server.js
```

You should see:

```
Server running on port 5000
MySQL Connected
```

### 4. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

---

## 🚀 Features

- User registration with form validation
- Secure login with hashed passwords (bcrypt) and JWT authentication
- Browse questions by category
- Ask questions within a category
- Answer questions posted by other users
- Logout functionality

---

## 📁 Project Structure

```
├── BACKEND/
│   ├── config/        # Database connection
│   ├── routes/        # API routes (auth, categories, questions, answers)
│   ├── .env           # Environment variables (not included in repo)
│   └── server.js      # Express server entry point
├── frontend/
│   └── src/
│       ├── pages/     # Login, Register, Dashboard
│       └── App.js     # Routes
└── database/
    └── schema.sql     # Database schema and seed data
```

---

## 🔐 Security

- Passwords are hashed using bcrypt before storing
- Authentication handled via JSON Web Tokens (JWT)
- Environment variables used to protect sensitive credentials
