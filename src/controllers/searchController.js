const axios = require('axios');

// Function to get YouTube videos
const fetchYouTubeVideos = async (query) => {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
            q: query,
            part: 'snippet',
            type: 'video',
            maxResults: 5,
            key: process.env.YOUTUBE_API_KEY,
        }
    });
    return response.data.items;
};

// Function to get Google search results
const fetchGoogleSearchResults = async (query) => {
    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
            q: query,
            cx: process.env.GOOGLE_CX_ID,
            key: process.env.GOOGLE_API_KEY,
        }
    });
    return response.data.items;
};

// Main search handler function
const searchContent = async (req, res) => {
    try {
        const query = req.query.term;
        const [youtubeResults, googleResults] = await Promise.all([
            fetchYouTubeVideos(query),
            fetchGoogleSearchResults(query)
        ]);

        // Sending results to frontend
        res.json({ youtube: youtubeResults, articles: googleResults });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching search results', error: error.message });
    }
};

module.exports = { searchContent };
