const { saveProfile, getAllProfiles, getProfileByUsername } = require('../models/profileModel');
const {getUser, getRepos} = require('../services/githubService');
const generateInsights = require('../utils/insights');


const analyzeProfile = async(req, res) =>{
    try {
        const {username} = req.params;
        const user = await getUser(username);
        const repos = await getRepos(username);
        const insights = generateInsights(user, repos);
        await saveProfile(insights);
        res.status(200).json({
            success: true,
            message: " Profile analyzed successfully",
            data: insights

        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message });
    }
}
    const fetchAllProfiles = async(req, res) =>{
        try {
            const profiles = await getAllProfiles();
            res.status(200).json({
                success: true,
                data: profiles, 
                count: profiles.length
            });

        } catch (error) {
            res.status(500).json({ 
                success: false,
                error: error.message });
        }
    }
    
    const fetchProfileByUsername = async (req, res) => {
        try {
            const {username} = req.params;
            const profile = await getProfileByUsername(username);

            if (!profile) {

            return res.status(404).json({
                success: false,
                message:
                    "Profile not found"
            });

        }

        res.status(200).json({
            success: true,
            data: profile
        });

        } catch (error) {
            res.status(500).json({ 
                success: false,
                error: error.message });
        }
    }

module.exports = {analyzeProfile, fetchAllProfiles, fetchProfileByUsername};