import { GET_LATEST_MOVIES, GET_POPULAR_MOVIES, GET_TOP_RATED_MOVIES, GET_UPCOMING_MOVIES, AUTHENTICATE_USER, AUTHENTICATE_USER_ERROR, GET_SEARCH_MOVIES, ADD_TO_FAVORITE, ADD_TO_WATCHLIST, GET_TO_FAVORITE, GET_TO_WATCHLIST, GET_MOVIE_DETAILS, REMOVE_FROM_FAVORITE, REMOVE_FROM_WATCHLIST } from "../types";

const INITIAL_STATE = {
    userData: {},
    movies : {
      latest: [],
      topRated: [],
      upcoming: [],
      popular: [],
     
    },
    watchList: [],
    favoriteList: [],
    searchResult: [],
    movieDetails: {}
};

const moviesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
        if(!action.payload.error)
            localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        userData:{...action.payload},
      };
    case AUTHENTICATE_USER_ERROR:
      return {
        ...state,
        userData: {},
      };
    case GET_LATEST_MOVIES:
        return {
            ...state, 
            movies: { ...state.movies, latest: action.payload }
        }
    case GET_POPULAR_MOVIES:
        return {
            ...state, 
            movies: { ...state.movies, popular: action.payload }
        }
    case GET_TOP_RATED_MOVIES:
          return {
              ...state, 
              movies: { ...state.movies, topRated: action.payload, }
          }
    case GET_UPCOMING_MOVIES:
            return {
                ...state, 
                movies: { ...state.movies, upcoming: action.payload }
            }
    case GET_TO_FAVORITE:
          return {
            ...state, 
            favoriteList: action.payload
          }
    case GET_TO_WATCHLIST:
        return {
          ...state, 
          watchList: action.payload
        }
    case GET_MOVIE_DETAILS:
        return {
          ...state, 
          movieDetails: action.payload
        }
    case GET_SEARCH_MOVIES:
          return {
              ...state, 
              searchResult: action.payload
          }
    case ADD_TO_FAVORITE:
      let favoriteMovie
      Object.keys(state.movies) && Object.keys(state.movies).forEach((cat, k) => {
          let favMovieIndex = state.movies[cat] && state.movies[cat].findIndex((m) => m.id == action.payload);
          if(favMovieIndex > 0) { 
              favoriteMovie = state.movies[cat][favMovieIndex];
          }
          
      })
          return {
              ...state,
              favoriteList: [...state.favoriteList, favoriteMovie]
          }
    case ADD_TO_WATCHLIST:
      let watchListMovie = {}
      Object.keys(state.movies)  && Object.keys(state.movies).forEach((cat, k) => {
        let watchMovieIndex = state.movies[cat] && state.movies[cat].findIndex((m) => m.id == action.payload);
        if(watchMovieIndex) {
          watchListMovie = state.movies[cat][watchMovieIndex];
        }

    })
          return {
            ...state,
            watchList: [...state.watchList, watchListMovie]
          }
    case REMOVE_FROM_FAVORITE:  
      return {
        ...state,
        favoriteList: state.favoriteList.filter((m) => m.id !== action.payload)
      }
    case REMOVE_FROM_WATCHLIST:
    return {
      ...state,
      watchList: state.watchList.filter((m) => m.id !== action.payload)
    }
    default:
      return INITIAL_STATE;
  }
};

export default moviesReducer;