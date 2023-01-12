const { default: axios } = require("axios")
class Characters {
    static showAnime(req, res) {
        let { q,limit,min_score } = req.query
        axios({
            method: 'get',
            url: `https://api.jikan.moe/v4/anime`,
            params: {
                q, limit, min_score
            }
        })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch((error) => console.log(error))
    }
    static showPopularAnime(req,res){
        axios({
            method: 'get',
            url: "https://api.jikan.moe/v4/top/anime",
        })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch((error) => console.log(error))
    }
    static showAnimeById(req,res){
        let id = req.params.animeId
        axios({
            method: 'get',
            url: `https://api.jikan.moe/v4/anime/${id}`,
        })
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch((error) => console.log(error))
    }
    static showVideos(req,res){
        axios({
            method: 'GET',
            url: `https://youtube-v31.p.rapidapi.com/search?q=anime&part=snippet,id&regionCode=US&maxResults=5&order=date`,
            headers:{
                "X-RapidAPI-Key":process.env.X_RAPID_APIKey,
                "X-RapidAPI-Host":"youtube-v31.p.rapidapi.com"
            }
        })
            .then(({ data }) => {
                res.status(200).json(data.items)
            })
            .catch((error) => console.log(error))
    }
}
module.exports = Characters