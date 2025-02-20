<div align="center">
  
# 📑 Resume Parser API

[<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />](https://nodejs.org/)
[<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />](https://expressjs.com/)
[<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />](https://www.mongodb.com/)
[<img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />](https://cloud.google.com/)
[<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />](https://jwt.io/)
[<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />](https://www.npmjs.com/)

[![GitHub license](https://img.shields.io/github/license/yourusername/resume-parser-api)](https://github.com/yourusername/resume-parser-api/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/resume-parser-api)](https://github.com/yourusername/resume-parser-api/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/resume-parser-api)](https://github.com/yourusername/resume-parser-api/issues)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/resume-parser-api)](https://github.com/yourusername/resume-parser-api/network)

A robust Node.js/Express-based API system that leverages Google Gemini AI for intelligent resume parsing, MongoDB for data persistence, and enterprise-grade security features. The system includes PDF processing, structured data extraction, and advanced search capabilities.

[Getting Started](#getting-started) • [Features](#core-features) • [Documentation](#api-documentation) • [Contributing](#contributing)

</div>

## 🚀 Core Features

<table>
  <tr>
    <td align="center"><b>🤖 AI-Powered</b></td>
    <td align="center"><b>🔐 Secure</b></td>
    <td align="center"><b>📊 Scalable</b></td>
    <td align="center"><b>🔍 Smart Search</b></td>
  </tr>
  <tr>
    <td>Google Gemini AI integration for intelligent data extraction</td>
    <td>JWT & CryptoJS encryption for maximum security</td>
    <td>MongoDB Atlas for efficient data management</td>
    <td>Advanced resume search functionality</td>
  </tr>
</table>

## 🛠️ Technology Stack

<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Backend-Node.js%20&%20Express-green?style=flat-square&logo=node.js" alt="Backend"/>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=flat-square&logo=mongodb" alt="Database"/>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/AI-Google%20Gemini-blue?style=flat-square&logo=google" alt="AI"/>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Security-JWT%20&%20CryptoJS-red?style=flat-square&logo=jsonwebtokens" alt="Security"/>
    </td>
  </tr>
</table>

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account
- Google Gemini AI API access
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-parser-api
cd resume-parser-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with the following configurations:
```env
# Server Configuration
PORT=5000

# Database
DB_URI=your_mongodb_atlas_uri

# API Keys
GEMINI_API_KEY=your_gemini_api_key

# Authentication
JWT_SECRET_KEY=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
SECRET_KEY=your_encryption_key

# Admin Credentials (will be encrypted)
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

4. Start the server:
```bash
npm run start
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint  | Description                  | Request Body                |
|--------|-----------|------------------------------|----------------------------|
| POST   | /login    | Authenticate user            | {username, password}       |
| POST   | /refresh  | Refresh JWT token            | {refreshToken}            |
| POST   | /logout   | Invalidate current session   | -                         |

### Resume Management Endpoints

| Method | Endpoint                  | Auth Required | Description                    |
|--------|---------------------------|---------------|--------------------------------|
| POST   | /protected/extract-data   | Yes          | Parse and store resume data    |
| GET    | /protected/resume-search  | Yes          | Search through stored resumes  |

### Sample Requests & Responses

#### Resume Extraction
```json
// Request
{
  "url": "https://example.com/resume.pdf"
}

// Response
{
  "candidateInfo": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1 (555) 123-4567"
  },
  "education": [
    {
      "degree": "Master of Science",
      "field": "Computer Science",
      "institution": "Stanford University",
      "graduationYear": 2023
    }
  ],
  "experience": [
    {
      "role": "Senior Software Engineer",
      "company": "Tech Corp",
      "duration": {
        "start": "2020-01",
        "end": "present"
      },
      "responsibilities": [
        "Led backend development team",
        "Implemented microservices architecture"
      ]
    }
  ]
}
```

## 🔒 Security Implementation

### Credential Encryption
The system uses CryptoJS for secure credential management:
```javascript
const CryptoJS = require('crypto-js');

// Encryption
const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();

// Decryption
const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECRET_KEY)
                                   .toString(CryptoJS.enc.Utf8);
```

## 📁 Project Structure
```
resume-parser-api/
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── resumeController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── Resume.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── resume.js
│   └── utils/
│       ├── encryption.js
│       └── validation.js
├── config/
│   └── database.js
├── tests/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

<div align="center">

---

<img src="https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge" alt="Made with love"/>

### Star ⭐ this repository if you find it helpful!

[Report Bug](https://github.com/yourusername/resume-parser-api/issues) • [Request Feature](https://github.com/yourusername/resume-parser-api/issues)

</div>
