import React from 'react';
import Movie from './movie';

const MoviesList = ({ movies, addToWatchList, addToFavorite, removeFromFavorite,  removeFromWatchList, favoriteList, watchList   }) => {
    return <div className='mt-2'>
                {
                    Object.keys(movies).map((category, i) => 
                        <div key={i}>
                            <div className="d-flex justify-content-left heading p-2 mt-4">
                                <h2>{category}</h2>
                            </div>
                            <div className="show-row-grid">
                               {
                                    movies[category] && movies[category].map((m, k) =>  
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
                               }
                            </div>
                        </div>  
                    )
                }
    </div>
}

export default MoviesList;