# AI-Powered Resume Parser with Secure Access

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-blue)
![AI-Powered](https://img.shields.io/badge/AI-Gemini%201.5-red)

A secure backend system for parsing resumes using Google's Gemini AI, with JWT authentication and encrypted credentials.
.

## ✨ Features
- 🔐 **JWT Authentication** (Access & Refresh tokens)
- 🔑 **AES-encrypted credentials storage**
- 📄 **Resume text extraction from PDFs**
- 🧠 **LLM-based resume structuring (Google Gemini API)**
- 📂 **MongoDB Atlas integration**
- 🔍 **Search resumes by name**

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add the following:

```
PORT=3000
DB_URI=your-mongodb-uri
JWT_SECRET_KEY=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
SECRET_KEY=your-encryption-key
GEMINI_API=your-gemini-api-key
username = <username>
password = <password>
```

🔴 **Note:** Keep this file private and never push it to GitHub.

### 4️⃣ Start the Server
```bash
npm start
```
The API will now run on `http://localhost:3000`.

---

## 📌 API Endpoints

### 🔑 Authentication
- **`POST /login`** - Authenticate user & generate JWT tokens
- **`POST /refresh`** - Refresh access token
- **`POST /logout`** - Logout & clear refresh token

### 📄 Resume Processing
- **`POST /protected/extract-data`** (🔒 Protected) - Extract resume details from a PDF URL
- **`GET /protected/resume-search?name=<query>`** (🔒 Protected) - Search applicants by name

---

## 🛠 Project Structure
```
📦 your-repo
 ┣ 📂 Database
 ┃ ┗ 📜 dbConnection.js  # MongoDB connection
 ┣ 📂 Routes
 ┃ ┣ 📜 routes.js  # Public routes (auth)
 ┃ ┗ 📜 protectedRoutes.js  # Protected resume processing routes
 ┣ 📂 Controllers
 ┃ ┣ 📜 authController.js  # Handles login, refresh token, logout
 ┃ ┗ 📜 protectedController.js  # Resume extraction & search logic
 ┣ 📂 Middleware
 ┃ ┗ 📜 auth.js  # JWT authentication middleware
 ┣ 📂 Models
 ┃ ┗ 📜 userModel.js  # Mongoose schema for applicants
 ┣ 📂 llmServices
 ┃ ┗ 📜 llmService.js  # Google Gemini API integration
 ┣ 📜 .env  # Environment variables (DO NOT COMMIT)
 ┣ 📜 server.js  # Main entry point
 ┣ 📜 package.json  # Dependencies & scripts
 ┗ 📜 README.md  # Documentation
```





