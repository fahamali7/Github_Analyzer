require("dotenv").config();

const express = require("express");
const pool = require("./config/db");
const githubRoutes = require('./routes/githubRoutes');

const app = express();

app.use(express.json());

//main route  middleware
app.use("/api/github", githubRoutes);


app.get("/", async (req, res) => {
  try {
    // Verify database connection connection
    const [rows] = await pool.query("SELECT 1");

    res.json({
      status: "success",
      message: "GitHub Profile Analyzer API is Running",
      database: "Connected successfully",
      documentation: {
        base_url: "https://github-analyzer-dutz.onrender.com",
        endpoints: [
          {
            method: "POST",
            route: "/api/github/analyze/:username",
            description: "Fetches user profile and repositories from GitHub, calculates insights, and saves/updates them in the database.",
            example_request: "https://github-analyzer-dutz.onrender.com/api/github/analyze/fahamali7"
          },
          {
            method: "GET",
            route: "/api/github/profiles",
            description: "Retrieves all historically analyzed GitHub profiles saved in the cloud database.",
            example_request: "https://github-analyzer-dutz.onrender.com/api/github/profiles"
          },
          {
            method: "GET",
            route: "/api/github/profiles/:username",
            description: "Retrieves the saved database record for a single username.",
            example_request: "https://github-analyzer-dutz.onrender.com/api/github/profiles/fahamali7"
          }
        ],
        postman_testing_steps: {
          step_1: "Send a GET request to the base URL to verify connection status.",
          step_2: "Send a POST request to /api/github/analyze/your_username to parse and save profile details.",
          step_3: "Send a GET request to /api/github/profiles to view your saved record among all profiles."
        }
      }
    });
  } catch (error) {
    console.error("✗ Database Connection Failure:", error.message);
    res.status(500).json({
      status: "error",
      message: "Database Connection Failed",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`);
}); 