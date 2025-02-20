const extractText = require("../llmServices/llmService");
const Applicant = require("../models/userModel");

const resumeSearch = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "Search term 'name' is required" });
        }

        const regex = new RegExp(name, "i");
        const results = await Applicant.find({ name: { $regex: regex } });

        return res.status(200).json(results);
    } catch (error) {
        console.error("Error during resume search:", error);
        return res.status(500).json({ error: "An error occurred while searching for resumes" });
    }
};

const extractData = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required to extract resume data" });
    }

    try {
        const data = await extractText(url);
        return res.status(200).json({ data });
    } catch (error) {
        console.error("Error extracting data from resume:", error);
        return res.status(500).json({ error: "Failed to extract data from resume" });
    }
};

module.exports = { resumeSearch, extractData };
