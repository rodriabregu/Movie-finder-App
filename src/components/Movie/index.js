import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getMovieDetail } from '../../redux/actions';
import { NavLink as Link } from 'react-router-dom';
import style from '../Movie/movie.module.css';
import MovieIcon from '@material-ui/icons/Movie';

export const Movie = () => {
    const { id } = useParams();
    const movie = useSelector(s => s.movieDetail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMovieDetail(id))
    }, [dispatch, id]);

    return (
        <div className={style.movie_center}>
            <div className={style.backhome} >
                <Link className={style.backhomeLink} to='/'>
                    Back to home
                </Link>
            </div>
            <div className={style.movie_card}>
                <h2>{movie.Title} <MovieIcon/></h2>
                <h3>{movie.Runtime}</h3>
                <h3>{movie.Year}</h3>
                <span>⭐ {movie.imdbRating} ⭐</span>
                <span>{movie.Genre}</span>
                <h3><img src={movie.Poster} alt="img not found" ></img></h3>
            </div>
        </div>
    )
}

export default Movie;