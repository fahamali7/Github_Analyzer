const axios = require('axios');

// Create axios instance with GitHub API defaults
const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000, // 10 second timeout
  headers: {
    'User-Agent': 'Node.js GitHub Client',
    'Accept': 'application/vnd.github.v3+json'
  }
});

// Add authentication token if available
if (process.env.GITHUB_TOKEN) {
  githubAPI.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
}

const getUser = async(username) => {
  try {
    if (!username || typeof username !== 'string') {
      throw new Error('Invalid username provided');
    }

    console.log(`✓ Fetching GitHub user: ${username}`);
    
    const res = await githubAPI.get(`/user/${username}`);
    
    console.log(`✓ Successfully fetched user: ${username}`);
    return res.data;
    
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      console.error(`✗ GitHub API Error (${error.response.status}):`, error.response.data.message);
      const errorMsg = error.response.status === 404 
        ? `User '${username}' not found` 
        : error.response.data.message || 'GitHub API error';
      throw new Error(errorMsg);
    } else if (error.request) {
      // Request made but no response
      console.error("✗ No response from GitHub API:", error.message);
      throw new Error('GitHub API is unreachable. Please try again later.');
    } else {
      // Error in request setup
      console.error("✗ Error setting up request:", error.message);
      throw error;
    }
  }
};

const getRepos = async(username) => {
  try {
    if (!username || typeof username !== 'string') {
      throw new Error('Invalid username provided');
    }

    console.log(`✓ Fetching repos for: ${username}`);
    
    const res = await githubAPI.get(`/user/${username}/repos`, {
      params: {
        per_page: 100,
        sort: 'updated'
      }
    });
    
    console.log(`✓ Found ${res.data.length} repositories`);
    return res.data;
    
  } catch (error) {
    if (error.response) {
      console.error(`✗ GitHub API Error (${error.response.status}):`, error.response.data.message);
      throw new Error(error.response.data.message || 'Failed to fetch repositories');
    } else if (error.request) {
      console.error("✗ No response from GitHub API:", error.message);
      throw new Error('GitHub API is unreachable');
    } else {
      console.error("✗ Error:", error.message);
      throw error;
    }
  }
};

module.exports = { getUser, getRepos };