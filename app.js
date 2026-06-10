require("dotenv").config();

const express = require("express");
const pool = require("./config/db");
const {getUser, getRepos} = require('./services/githubService');

const app = express();

app.use(express.json());

app.get("/github/:username", async(req, res) =>{
  const {username} = req.params;

  try {
    const user = await getUser(username);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(400).json({
      message: "Error fetching GitHub user",
      error: error.message
    });
  }
});

app.get("/github/:username/repos", async(req, res) =>{
  const {username} = req.params;

  try {
    const repos = await getRepos(username);
    res.json({
      username,
      totalRepos: repos.length,
      repos: repos.map(repo => ({
        name: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        description: repo.description
      }))
    });
  } catch (error) {
    console.error("Error fetching repos:", error.message);
    res.status(400).json({
      message: "Error fetching GitHub repositories",
      error: error.message
    });
  }
});

app.get("/", async (req, res) => {
  try {
    console.log("✓ Try block executed");
    const [rows] = await pool.query("SELECT 1");
    console.log("✓ Database query successful");

    res.json({
      message: "API Running",
      database: "Connected"
    });
  } catch (error) {
    console.error("✗ Error in try block:", error.message);
    res.status(500).json({
      message: "Database Connection Failed",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
}); 