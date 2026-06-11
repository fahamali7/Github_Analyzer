# GitHub Profile Analyzer API

A Node.js + Express.js backend service that analyzes GitHub user profiles using the GitHub Public API, generates useful insights, and stores the analysis in a MySQL database.

## Features

* Fetch public GitHub profile information
* Fetch public repositories of a GitHub user
* Generate useful profile insights
* Store analyzed profiles in MySQL
* Update existing profile analyses automatically
* Retrieve all analyzed profiles
* Retrieve a specific analyzed profile

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* Axios
* dotenv

---

## Project Structure

```text
github-profile-analyzer/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── githubController.js
│
├── models/
│   └── profileModel.js
│
├── routes/
│   └── githubRoutes.js
│
├── services/
│   └── githubService.js
│
├── utils/
│   └── insightsGenerator.js
│
├── .env
├── app.js
└── package.json
```

---

## Insights Generated

The application generates and stores the following insights:

| Insight                 | Description                      |
| ----------------------- | -------------------------------- |
| Followers               | Number of followers              |
| Following               | Number of users followed         |
| Public Repositories     | Total public repositories        |
| Public Gists            | Total public gists               |
| Total Stars             | Sum of stars across repositories |
| Total Forks             | Sum of forks across repositories |
| Average Stars           | Average stars per repository     |
| Account Age             | Age of GitHub account in days    |
| Most Starred Repository | Repository with highest stars    |

---

## Database Schema

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    followers INT,
    following INT,
    public_repos INT,
    public_gists INT,
    total_stars INT,
    total_forks INT,
    avg_stars DECIMAL(10,2),
    account_age_days INT,
    most_starred_repo VARCHAR(255),
    profile_url VARCHAR(255),
    avatar_url VARCHAR(255),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/github-profile-analyzer.git

cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer

GITHUB_TOKEN=your_github_token
```

> GitHub Token is optional but recommended to avoid API rate limits.

---

## Running the Application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

## API Endpoints

### Analyze and Store a GitHub Profile

**POST**

```http
/api/github/analyze/:username
```

Example:

```http
POST /api/github/analyze/octocat
```

Response:

```json
{
  "success": true,
  "message": "Profile analyzed successfully",
  "data": {
    "username": "octocat",
    "followers": 1000,
    "public_repos": 10,
    "total_stars": 250
  }
}
```

---

### Get All Analyzed Profiles

**GET**

```http
/api/github/profiles
```

Response:

```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

---

### Get Single Analyzed Profile

**GET**

```http
/api/github/profiles/:username
```

Example:

```http
GET /api/github/profiles/octocat
```

Response:

```json
{
  "success": true,
  "data": {
    "username": "octocat",
    "followers": 1000,
    "public_repos": 10
  }
}
```

---

## Deployment

This application can be deployed using:

* Render (Backend Hosting)
* Railway (MySQL Database)
* AWS EC2
* DigitalOcean
* VPS Hosting

---

## Future Improvements

* Pagination support
* Search and filtering
* Swagger API documentation
* Repository language analytics
* Followers/Following ratio analysis
* Most used programming language
* GitHub organization insights
* Caching using Redis

---

## Author

Developed as part of a Backend Assessment using:

* Node.js
* Express.js
* MySQL
* GitHub API