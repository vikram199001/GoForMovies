import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button} from 'react-bootstrap';
import {
    getMovie,
    addToFavoriteList,
    addToWatchLaterList,
    removeMovieFavoriteList,
    removeMovieWatchLaterList
} from '../redux/actions';
import { Heart, Bookmark, HeartFill, BookmarkFill } from 'react-bootstrap-icons';

const Details = () => {
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.moviesReducer.movieDetails);
    const id = window.location.pathname.split('/').pop();
    let sessionId = localStorage.getItem('session_id');
    let accountId = localStorage.getItem('account_id');
   
    const favoriteList = useSelector((state) => state.moviesReducer.favoriteList);
    const watchList = useSelector((state) => state.moviesReducer.watchList);

    useEffect(() => {
        dispatch(getMovie(id))
    }, [dispatch, id]);

const minutesToHour = totalMinutes => {
    if (!totalMinutes) return `${0}m`;
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    const h = hours > 0 ? `${hours?.toFixed()}h` : '';
    const m = minutes > 0 ? ` ${minutes?.toFixed()}m` : '';
  
    return `${h} ${m}`;
  };

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


const toggleFavorite = (id) => {
    return favoriteList.find((m) => m && m.id === id ) ? true : false;
}

const toggleWatchList = (id) => {
    return watchList.find((m) => m && m.id === id ) ? true : false;
}

    return <div>
            {Object.keys(movie).length ? <Card className='my-3'>
            <div className="py-5 h-100">
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col lg={9} xl={7}>
                        <Card>
                            <div className="rounded-top text-white d-flex flex-row" style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`, backgroundSize: 'cover'}}>
                                <div className="ms-0 d-flex blur w-100 row">
                                    <Col xs={12} md={3} className="my-2">
                                        <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster-img" width="100%" style={{ border: '1px solid white'}}/>
                                    </Col>
                                    <Col xs={12} md={9} className="text-left">
                                        <h2 className='mt-4'>{movie.title}</h2>
                                        <p>Released on: {movie.release_date}</p>
                                        <p className='text-muted'><h5>{movie.tagline}</h5></p>
                                        <div className="mt-5">
                                            <div className="d-flex py-1">
                                                <div>
                                                    <p className="mb-0"><h5>Genre</h5> {movie.genres.length ? movie.genres.map((g) => g.name).join(','): ""}</p>
                                                </div>
                                                <div className="px-3">
                                                    <p className="mb-0"><h5>Duration</h5> {movie.runtime && minutesToHour(movie.runtime)}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0"><h5>Status</h5> {movie.status}</p>
                                                </div>
                                            </div>
                                            <div className='mt-4'>
                                            <Button className='circle-btn'><span className='d-flex justify-content-center'>{toggleFavorite(movie.id) ? <HeartFill className='icon-red' onClick={() => removeFromFavorite(movie.id)}/> :<Heart onClick={() => addToFavorite(movie.id)}/>}</span></Button>
                                            <Button className='circle-btn'><span className='ml-2 d-flex justify-content-center'>{toggleWatchList(movie.id) ? <BookmarkFill onClick={() => removeFromWatchList(movie.id)}/> :<Bookmark onClick={() => addToWatchList(movie.id)}/>}</span></Button>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                                
                            </div>
                           
                            <Card.Body className="p-4 text-black">
                                <div className="mb-5">
                                    <p className="lead fw-normal mb-1">Overview</p>
                                    <div className="p-4" style={{backgroundColor: "#f8f9fa"}}>
                                        <p className="font-italic mb-1">{movie.overview}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className="lead fw-normal mb-0">Cast & Crew</p>
                                    <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                                </div>
                                <Row className="g-2">
                                    {movie.credits && movie.credits.cast.length ? movie.credits.cast.slice(0, 6).map((cast, i) => 
                                    <Col className="mb-2">
                                         <Card alt={i} className="w-100 rounded-3 cast-card">   
                   
                                            <Card.Img className='' variant='top' src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}/>
                  
                                            <Card.Text className="title-text card-info p-2" style={{ minHeight: "90px"}}>
                                                <span><h6>{cast.character}</h6></span>
                                                <span>{cast.original_name}</span>
                                            </Card.Text>
                                            </Card>
                                    </Col>) : ""}
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
          
            </Card> : ""}
    </div>
}

export default Details;