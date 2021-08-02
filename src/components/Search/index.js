import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { addMovieFavorite, getMovies } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import style from './search.module.css';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    btnfavorite: {
        marginLeft: "270px",
        marginTop: "-40px",
    },
}));

const Search = () => {
    const [title, setTitle] = useState("");
	const [favourites, setFavourites] = useState([]);
    const moviesLoaded = useSelector(s => s.moviesLoaded)
    const dispatch = useDispatch();
    const classes = useStyles();
    console.log('loaded', moviesLoaded)

    const handleChange = e => {
        setTitle(e.target.value)
    };

    const handleSubmit = e => {
    e.preventDefault();
        dispatch(getMovies(title));
    };

	const saveToLocalStorage = items => {
		localStorage.setItem('movie-favourites', JSON.stringify(items));
	};

    const addFavorite = (movie) => {
        const newFavoriteList = [...favourites, movie];
        setFavourites(newFavoriteList);
        dispatch(addMovieFavorite(movie));
        saveToLocalStorage(newFavoriteList);
    }

/* 	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('movie-favourites')
		);
		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []); */

    return (
    <div>
            <Link to='/favorites'>
                Gaturro
            </Link>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <TextField
                        id="outlined-basic" 
                        label="Desired movie" 
                        variant="outlined" 
                        type="text"
                        autoComplete="off"
                        value={title}
                        size="small"
                        onChange={e => handleChange(e)}
                    />
                    <Button variant="outlined"
                        color="primary"
                        type="submit">
                            Search :D
                    </Button>
                </div>
            </form>
        <div className={style.sheetgrid}>
        { moviesLoaded?.map((movie, i) => (
            <div className={style.movie_card} key={i}>
                <div>
                <img src={movie.Poster} alt="not found" height="530px" width="352px" />
                    <Link to={`/movie/${movie.imdbID}`}><div className={style.cardtitle}>{movie.Title}</div></Link>
                    <div className={style.movie_info}>
                        <span>{movie.Year}</span>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button, classes.btnfavorite}
                        /* className={style.btnfavorite} */
                        startIcon={<SaveIcon />} 
                        onClick={() => addFavorite(movie)}>
                        fav
                    </Button>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </div>
    );
};

export default Search;