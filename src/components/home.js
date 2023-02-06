import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { getLatest, getPopular, getTopRated, getUpcoming, getSearchResults, addToFavoriteList, 
    addToWatchLaterList,
    getFavorites,
    getWatchLater,
    removeMovieFavoriteList,
    removeMovieWatchLaterList
} from '../redux/actions';
import MoviesList from './movieList';
import Movie from './movie';

const Home = () => {
    const dispatch = useDispatch();
    const moviesList = useSelector((state) => state.moviesReducer.movies);
    const searchResult = useSelector((state) => state.moviesReducer.searchResult);
    const favoriteList = useSelector((state) => state.moviesReducer.favoriteList);
    const watchList = useSelector((state) => state.moviesReducer.watchList);

   

    const [ movies, setMovies ] = useState({});
    const [ searchMovies, setSearchResult ] = useState([]);
    const [ toggleSearch, setSearchToggle ] = useState(false);
    const [ searchString, setSearchString ] = useState('');
    let sessionId = localStorage.getItem('session_id');
    let accountId = localStorage.getItem('account_id');


    useEffect(() => {
        dispatch(getLatest());
        dispatch(getPopular());
        dispatch(getTopRated());
        dispatch(getUpcoming());
        dispatch(getFavorites());
        dispatch(getWatchLater());
    }, [dispatch])

    useEffect(() => {
        setMovies({...moviesList});

    }, [moviesList, favoriteList, watchList]);

  
    const addToFavorite = (id) => {
        dispatch(addToFavoriteList(sessionId, accountId, { media_type: 'movie', media_id: id, favorite: true }))
    }

    const removeFromFavorite = (id) => {
        dispatch(removeMovieFavoriteList(sessionId, accountId, { media_type: 'movie', media_id: id, favorite: false }))
    }


    const removeFromWatchList = (id) => {
        dispatch(removeMovieWatchLaterList(sessionId, accountId, { media_type: 'movie', media_id: id, watchlist: false }))
    }

    const addToWatchList = (id) => {
        dispatch(addToWatchLaterList(sessionId, accountId, { media_type: 'movie', media_id: id, watchlist: true }))
    }

    useEffect(() =>{
        setSearchResult({...searchResult});
        setSearchToggle(!toggleSearch);
    }, [searchResult])

    const handleClear = () => {
        setSearchToggle(!toggleSearch);
        setSearchString('');
    }

    return <div>
       <div className='mt-5 home-page'>
        <div className="hero">
        <div className='d-flex justify-content-end align-items-center'>
            <Container className='p-5'>
                <Row className='px-md-5 px-xs-1'>
                        <Col md={10} xs={8}>
                        <Form.Control 
                            size="lg" 
                            type="text" 
                            value={searchString} 
                            placeholder="search a movie" 
                            onChange={(e) => setSearchString(e.target.value) }
                        />
                        </Col>
                        <Col md={2} xs={4}>
                            <Button 
                            size="lg" 
                                onClick={() => toggleSearch ? dispatch(getSearchResults(searchString)) : handleClear()   }>{ toggleSearch ? <Search/> : 'Clear' }
                            </Button>
                        </Col>
                </Row>
            </Container>
        </div>
        </div>
        
        <Container className="homepage-theme pt-4 mx-md-auto">
            { toggleSearch ? <Row style={{ margin: "auto" }}>
                <Col md={12} className="p-0">
                    <div> 
                        <Container className="px-5">
                            <Row className="shows-section pb-5">
                                <MoviesList 
                                movies={movies}
                                 addToFavorite={addToFavorite}
                                  addToWatchList={addToWatchList}
                                  removeFromFavorite={removeFromFavorite}
                                  removeFromWatchList={removeFromWatchList}
                                  favoriteList={favoriteList}
                                  watchList={watchList}
                                  />
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
            : 
            <Row style={{ margin: "auto" }}>
                <Col md={12} className="p-0">
                    <div> 
                        <Container className="px-5 show-row-grid">
                        {
                     searchResult.length ? searchResult.map((m, k) =>  
                     <Movie 
                        show={m}  
                        key={k}
                        addToFavorite={addToFavorite}
                        addToWatchList={addToWatchList}
                        removeFromFavorite={removeFromFavorite}
                        removeFromWatchList={removeFromWatchList}
                        favoriteList={favoriteList}
                        watchList={watchList}
                     />)
                : ""}
                </Container>
                </div>
                </Col>
            </Row>
            }
        </Container>
       </div>
    </div>
}

export default Home;