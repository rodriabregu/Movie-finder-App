
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { removeMovieFavorite } from '../../redux/actions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import style from '../Search/search.module.css'
import './favorites.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        marginTop: "-4px",
    },
    },
}));

export const Favorites = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const movies = useSelector(s => s.moviesFavourites);
    const moviesFavorites = JSON.parse(localStorage.getItem('movie-favourites'));

	const saveToLocalStorage = items => {
		localStorage.setItem('movie-favourites', JSON.stringify(items));
	};

    const removeFavorite = (movieimdbID) => {
        const newFavouriteList = moviesFavorites.filter((e) => e.imdbID !== movieimdbID);
        dispatch(removeMovieFavorite(movieimdbID))
        saveToLocalStorage(newFavouriteList);
    }


    return (
        <div>
            <h2>Movies favorites</h2>
            <div> 
                <ul className={style.sheetgrid}>
                {  moviesFavorites &&
                moviesFavorites[0] ?
                    moviesFavorites?.map((movie, index) => (
                        <div className={style.movie_card} key={index}>
                            <Link to={`/movie/${movie.imdbID}`}>
                                <span>{movie.Title}</span>
                                <span><img src={movie.Poster} alt="img not found" /></span>
                            </Link>
                                <div className={classes.root}>
                                    <IconButton aria-label="delete" onClick={() => removeFavorite(movie.imdbID)}>
                                    <DeleteIcon />
                                    </IconButton>
                                </div>
                        </div>
                    ))
                    :   movies?.map(movie => (
                            <div key={movie.imdbID}>
                                <Link to={`/movie/${movie.imdbID}`}>
                                    <span>{movie.Title}</span>
                                    <span><img src={movie.Poster} alt="img not found" /></span>
                                </Link>
                                <button onClick={() => removeFavorite(movie.imdbID)}>
                                    <div className={classes.root}>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </button>
                            </div>
                        ))
                }
                </ul>
            </div>
            <div className='backhome'>
            <Link to='/'>
                Back to home
            </Link>
            </div>
        </div>
    );
};

export default Favorites;