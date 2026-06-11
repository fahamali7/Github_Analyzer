const pool = require("../config/db");


const saveProfile = async (
    profileData
) => {

    const query = `
        INSERT INTO github_profiles (
            username,
            name,
            bio,
            followers,
            following,
            public_repos,
            public_gists,
            total_stars,
            total_forks,
            profile_url,
            avatar_url
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            bio = VALUES(bio),
            followers = VALUES(followers),
            following = VALUES(following),
            public_repos = VALUES(public_repos),
            public_gists = VALUES(public_gists),
            total_stars = VALUES(total_stars),
            total_forks = VALUES(total_forks),
            profile_url = VALUES(profile_url),
            avatar_url = VALUES(avatar_url)
    `;

    const [result] =
        await pool.query(query, [
            profileData.username,
            profileData.name,
            profileData.bio,

            profileData.followers,
            profileData.following,

            profileData.public_repos,
            profileData.public_gists,

            profileData.total_stars,
            profileData.total_forks,

            profileData.profile_url,
            profileData.avatar_url
        ]);

    return result;
};

const getAllProfiles = async () => {

    const query = `
        SELECT *
        FROM github_profiles
        ORDER BY analyzed_at DESC
    `;

    const [rows] = await pool.query(query);

    return rows;
};

const getProfileByUsername = async (username) => {

    const query = `
        SELECT *
        FROM github_profiles
        WHERE username = ?
    `;

    const [rows] = await pool.query(query, [username]);

    return rows[0];
};

module.exports = {
    saveProfile,
    getAllProfiles,
    getProfileByUsername
};