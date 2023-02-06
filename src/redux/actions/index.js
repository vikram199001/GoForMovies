import { ADD_TO_FAVORITE,
  ADD_TO_WATCHLIST,
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_ERROR,
  GET_LATEST_MOVIES,
  GET_POPULAR_MOVIES,
  GET_SEARCH_MOVIES,
  GET_TOP_RATED_MOVIES,
  GET_TO_FAVORITE,
  GET_TO_WATCHLIST,
  GET_UPCOMING_MOVIES,
  GET_MOVIE_DETAILS,
  REMOVE_FROM_WATCHLIST,
  REMOVE_FROM_FAVORITE
} from "../types";
import { authenticateUser,
  getPopularmovies,
  getUpcomingmovies,
  getTopRatedmovies,
  getLatestmovies,
  searchmovies, 
  addToFavorite, 
  addToWatchList, 
  getWatchList, 
  getFavoriteList, 
  getMovieDeatils,
  removeFromFavorite,
  removeFromWatchList
} from '../../services';


export const authenticate = (userData) => (dispatch, getState) => {
  try {
    authenticateUser(userData).then((data) => {
        dispatch({
            type: AUTHENTICATE_USER,
            payload: data.data
          });
    })
  } catch (error) {
    dispatch({ type: AUTHENTICATE_USER_ERROR,
        payload: 'username or password incorrect'
    })
    console.log("Error", error);
  }
};

export const getLatest = () => (dispatch, getState) => {

    try {
            getLatestmovies().then((data) => {
                dispatch({
                    type: GET_LATEST_MOVIES,
                    payload: data.data.results? data.data.results : data.data
                  });
            })
        
      } catch (error) {
        console.log("Error", error);
      }

}
export const getTopRated = () => (dispatch, getState) => {

  try {
          getTopRatedmovies().then((data) => {
              dispatch({
                  type: GET_TOP_RATED_MOVIES,
                  payload: data.data.results
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}
export const getUpcoming = () => (dispatch, getState) => {

  try {
          getUpcomingmovies().then((data) => {
              dispatch({
                  type: GET_UPCOMING_MOVIES,
                  payload: data.data.results
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}
export const getPopular = () => (dispatch, getState) => {

  try {
          getPopularmovies().then((data) => {
              dispatch({
                  type: GET_POPULAR_MOVIES,
                  payload: data.data.results
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}
export const getWatchLater = () => (dispatch, getState) => {
  let session = localStorage.getItem('session_id');
  let account = localStorage.getItem('account_id');
  try {
          getWatchList(session, account).then((data) => {
              dispatch({
                  type: GET_TO_WATCHLIST,
                  payload: data.data.results
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}

export const getFavorites = () => (dispatch, getState) => {
let session = localStorage.getItem('session_id');
let account = localStorage.getItem('account_id');
  try {
    getFavoriteList(session, account).then((data) => {
              dispatch({
                  type: GET_TO_FAVORITE,
                  payload: data.data.results
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}


export const getSearchResults = (searchString) => (dispatch, getState) => {

  try {
          searchmovies(searchString).then((data) => {
              dispatch({
                  type: GET_SEARCH_MOVIES,
                  payload: data.data.results
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}
export const addToFavoriteList = (sessionId, accountId, body) => (dispatch, getState) => {
  try {
          addToFavorite(sessionId, accountId, body).then((data) => {
              dispatch({
                  type: ADD_TO_FAVORITE,
                  payload: body.media_id
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}

export const addToWatchLaterList = (session, account, body) => (dispatch, getState) => {
  try {
          addToWatchList(session, account, body).then((data) => {
              dispatch({
                  type: ADD_TO_WATCHLIST,
                  payload: body.media_id
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}

export const removeMovieFavoriteList = (sessionId, accountId, body) => (dispatch, getState) => {
  try {
          removeFromFavorite(sessionId, accountId, body).then((data) => {
              dispatch({
                  type: REMOVE_FROM_FAVORITE,
                  payload: body.media_id
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}

export const removeMovieWatchLaterList = (session, account, body) => (dispatch, getState) => {
  try {
          removeFromWatchList(session, account, body).then((data) => {
              dispatch({
                  type: REMOVE_FROM_WATCHLIST,
                  payload: body.media_id
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}

export const getMovie = (id) => (dispatch, getState) => {
  try {
          getMovieDeatils(id).then((data) => {
              dispatch({
                  type: GET_MOVIE_DETAILS,
                  payload: data.data
                });
          })
      
    } catch (error) {
      console.log("Error", error);
    }

}
