import React, { useEffect } from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, HeartFill, BookmarkFill } from 'react-bootstrap-icons';

const Movie = ({ show , addToFavorite, addToWatchList, removeFromFavorite, removeFromWatchList, favoriteList, watchList }) => {

    const toggleFavorite = (id) => {
        return favoriteList.find((m) => m && m.id === id ) ? true : false;
    }

    const toggleWatchList = (id) => {
        return watchList.find((m) => m && m.id === id ) ? true : false;
    }

    const stopParentEvent = (e) => {
        e.preventDefault()
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    return <Col className='d-flex justify-content-center mt-3'>
                
                <Card className='movie-card w-100'>   
                    <Link to={`/movie/${show.id}`} style={{ position: 'relative', zIndex: 0}}>
                        <Card.Img className='movie-poster' variant='top' src={`https://image.tmdb.org/t/p/original${show.poster_path}`}/>
                        <div className='overlay-actions'>
                        <Button className='circle-btn-sm p-0'>
                            <span className='d-flex justify-content-center'>
                                {toggleFavorite(show.id) ? 
                                <HeartFill className='icon-red' onClick={(e) => {
                                    stopParentEvent(e);
                                    removeFromFavorite(show.id)}}/> 
                                :<Heart onClick={(e) => {  stopParentEvent(e); addToFavorite(show.id)}}/>}
                             </span>
                        </Button>
                        <Button className='circle-btn-sm p-0'>
                            <span className='d-flex justify-content-center'>
                                {toggleWatchList(show.id) ? 
                                <BookmarkFill onClick={(e) => {  stopParentEvent(e); removeFromWatchList(show.id)}}/> 
                                :<Bookmark onClick={(e) => {  stopParentEvent(e); addToWatchList(show.id)}}/>}</span></Button>
                        </div>
                    </Link>
                    <Card.Text className="title-text card-info pt-2">
                        <span><h6>{show.title}</h6></span>
                        {/* <span>{show.release_date}</span> */}
                       
                    </Card.Text>
                </Card>
                
            </Col>
}

export default Movie;