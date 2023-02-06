import axios from 'axios';
const baseUrl = 'https://api.themoviedb.org/3/'


axios.interceptors.request.use(function (config) {
    config = {...config, params: {
        'api_key': 'ead2643a8020b1b306795eadfdcfabfc',
        ...config.params
    }};
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const getTopRatedmovies = () => {
    return axios.get(baseUrl+'movie/top_rated?page=1');
}

export const getUpcomingmovies = () => {
    return axios.get(baseUrl+'movie/upcoming?page=1');
}

export const getPopularmovies = () => {
    return axios.get(baseUrl+'movie/popular?page=1');
}

export const getLatestmovies = () => {
    return axios.get(baseUrl+'movie/now_playing?page=1');
}

export const searchmovies = (searchString) => {
    return axios.get(baseUrl+`search/movie?page=1&query=${searchString}`);
}

export const createSession = (token) => {
    return axios.post(baseUrl+`authentication/session/new`, { request_token: token});
}

export const validateWithLogin = (token) => {
    return axios.post(baseUrl+`authentication/token/validate_with_login`, { username: 'vikramS', password: 'vikram@123', request_token: token})
}

export const authenticateUser = () => {
    return axios.get(baseUrl+'authentication/token/new');
}

export const getAccount = (session) => {
    return axios.get(baseUrl+`account?session_id=${session}`)
}

export const addToWatchList = (session, account, body) => {
    return axios.post(baseUrl+`account/${account}/watchlist?session_id=${session}`, body)
}

export const addToFavorite = (session, account, body) => {
    return axios.post(baseUrl+`account/${account}/favorite?session_id=${session}`, body)
}

export const removeFromWatchList = (session, account, body) => {
    return axios.post(baseUrl+`account/${account}/watchlist?session_id=${session}`, body)
}

export const removeFromFavorite = (session, account, body) => {
    return axios.post(baseUrl+`account/${account}/favorite?session_id=${session}`, body)
}

export const getWatchList = (session, account) => {
    return axios.get(baseUrl+`account/${account}/watchlist/movies?session_id=${session}`);
}

export const getFavoriteList = (session, account) => {
    return axios.get(baseUrl+`account/${account}/favorite/movies?session_id=${session}`);
}

export const getMovieDeatils = (movie_id) => {
    return axios.get(baseUrl+`movie/${movie_id}?append_to_response=videos,images,reviews,recommendations,credits`)
}

