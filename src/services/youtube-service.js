import axios from 'axios';
import he from 'he'

const YT_API_KEY = 'AIzaSyCMj38_kYcY6ulLi9FWA5qlYkgUxWUnkoQ'
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
const DETAILS_URL = 'https://www.googleapis.com/youtube/v3/videos'
export const youtubeService = {
    query,
    getSongById,
    getTitle
}

async function query(query) {
    try {
        // console.log("get -> API_KEYS[gCurrApiKey]", API_KEYS[gCurrApiKey])
        const res = await axios.get(`${SEARCH_URL}?videoCategoryId=10&part=id,snippet&videoEmbeddable=true&type=video&maxResults=10&q=${query}&key=${YT_API_KEY}`)
            // const detailsRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=9bZkp7q19f0&part=contentDetails&key=%7B${YT_API_KEY}%7D`)

        // gCount = 0;
        console.log(res.data);
        return res.data
    } catch (err) {
        console.dir(err)
            // if (gCount === API_KEYS.length) {
            //     gCount = 0
            //     throw (err)
            // } else {
            //     // gCurrApiKey++;
            //     // gCount++;
            //     if (gCurrApiKey >= API_KEYS.length) gCurrApiKey = 0;
            //     return get(query);
            // }
    }
}
async function getSongById(youtubeId) {
    try {
        const res = await axios.get(`${DETAILS_URL}?id=${youtubeId}&part=id,contentDetails,snippet&key=${YT_API_KEY}`);
        return res.data
    } catch (err) {
        console.log(err)
        throw err
    }
}


function getTitle(title) {
    // Removes HTML char codes
    let output = he.decode(title);
    // Removes 'Official Video' brackets
    const officialVideoRegex = /[([].?(official.?video)?(official music video)?.?[)\]]/ig
    output = output.replace(officialVideoRegex, '');

    return output;
}