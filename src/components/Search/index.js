import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import { addMovieFavorite, getMovies } from '../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import style from './search.module.css';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
    btnfavorite: {
        margin: theme.spacing(1),
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

/*     useEffect(() => {
        dispatch(getMovies(title));
    }, [title]) */

    return (
    <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={style.inputbutton}>
                    <TextField
                    className={style.inputsearch}
                        id="outlined-basic" 
                        label="Finder movie" 
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
                            Search <SearchIcon/>
                    </Button>
                </div>
            </form>
            
        <div className={style.sheetgrid}>
            {console.log(moviesLoaded)}
        { moviesLoaded.length > 0 ? moviesLoaded?.map((movie, i) => {
            return (
                <div key={i}>
                    <div className={style.movie_card}>
                    <img src={movie.Poster} alt="not found" height="530px" width="352px" />
                        <br/>
                        <Link to={`/movie/${movie.imdbID}`}><div>{movie.Title}</div></Link>
                        <div className={style.movie_info}>
                            <span>{movie.Year}</span>
                            <br/>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.btnfavorite}
                            startIcon={<SaveIcon />} 
                            onClick={() => addFavorite(movie)}>
                            fav
                        </Button>
                        </div>
                    </div>
                </div>
            )
        }) : <h2>    Loading...</h2> }
        </div>
    </div>
    );
};

export default Search;