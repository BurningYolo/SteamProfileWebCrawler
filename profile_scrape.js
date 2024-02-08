const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');

async function fetchData(name_or_id) {
    try {
        const url = `https://steamcommunity.com/id/${name_or_id}/`;
        const response = await axios.get(url);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);

            const status = extractText($(config.status_class_id));
            console.log('Status:', status);

            const summary = extractText($(config.profile_summary_class_id));
            console.log('Summary:', summary);

            const recentGames = extractText($(config.recent_games_class_id));
            console.log('Recent Games:', recentGames);

            fetchCommentsData(name_or_id); 

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function fetchCommentsData(name_or_id)
{
    try {
        const url = `https://steamcommunity.com/id/${name_or_id}/allcomments`;
        const response = await axios.get(url);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);

            const comments = extractText($(config.comments_class_id));
            console.log('Comments:', comments);

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}




function extractText(element) {
    return element.text().trim();
}

const name_or_id = config.name_or_id;
fetchData(name_or_id);
