import React, { useEffect} from 'react';

import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Container, Button} from 'react-bootstrap';
import { Heart, Bookmark, HeartFill, BookmarkFill } from 'react-bootstrap-icons';
import { 
    getFavorites,
    getWatchLater,
    addToFavoriteList,
    addToWatchLaterList,
    removeMovieFavoriteList,
    removeMovieWatchLaterList
} from '../redux/actions';
const List = (movies) => {

    const dispatch = useDispatch();
    let path = window.location.pathname;
    let sessionId = localStorage.getItem('session_id');
    let accountId = localStorage.getItem('account_id');
   
    const favoriteList = useSelector((state) => state.moviesReducer.favoriteList);
    const watchList = useSelector((state) => state.moviesReducer.watchList);

    useEffect(() => {
        if(path === '/favorite-list') dispatch(getFavorites());
        else dispatch(getWatchLater());
    }, [dispatch, path]);

    const addToFavorite = (id) => {
        dispatch(addToFavoriteList(sessionId, accountId, { media_type: 'movie', media_id: id, favorite: true }))
        // navigate(0);
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


    const toggleFavorite = (id) => {
        return favoriteList.find((m) => m && m.id === id ) ? true : false;
    }

    const toggleWatchList = (id) => {
        return watchList.find((m) => m && m.id === id ) ? true : false;
    }


    const list = path === '/favorite-list' ? favoriteList : watchList
return <div className='mt-5'>
            <Container className='p-5 w-xs-100 w-md-50'>
                
            {
              list.length ? list.map((movie, key) => movie ? <Card className='my-3 list-card rounded' key={key} >
                    <Card.Body style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`, backgroundSize: 'cover', borderRadius: '5px'}}> 
                        <Row className='text-white blur p-md-5 p-xs-1'>
                            <Col sm={3} className='d-flex justify-content-center'>
                                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" style={{objectFit: 'contain', borderColor: 'white', border: '1px solid', height: '250px', width: '168px', borderRadius: '10px'}}/>
                            </Col>
                            <Col sm={7}>
                                <h2 className='mt-2'>{movie.title}</h2>
                                <Card.Subtitle className="mb-2 text-muted text-white">released on : {`${movie.release_date}`}</Card.Subtitle>
                                <Card.Text>
                                    {movie.overview}
                                </Card.Text>
                                <Card.Text className='d-flex'>
                                    <Button className='circle-btn'><span className='d-flex justify-content-center'>{toggleFavorite(movie.id) ? <HeartFill className='icon-red' onClick={() => removeFromFavorite(movie.id)}/> :<Heart onClick={() => addToFavorite(movie.id)}/>}</span></Button>
                                    <Button className='circle-btn'><span className='ml-2 d-flex justify-content-center'>{toggleWatchList(movie.id) ? <BookmarkFill onClick={() => removeFromWatchList(movie.id)}/> :<Bookmark onClick={() => addToWatchList(movie.id)}/>}</span></Button>
                                </Card.Text>
                            
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>: "")
        : ""}
            </Container>
        </div>
}

export default List;