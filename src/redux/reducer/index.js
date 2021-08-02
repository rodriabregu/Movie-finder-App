import {
    ADD_MOVIE_FAVORITE,
    GET_MOVIES,
    GET_MOVIES_DETAIL,
    REMOVE_MOVIE_DETAIL,
} from '../actions';

const initialState = {
    moviesFavourites: [],
    moviesLoaded: [],
    movieDetail: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIE_FAVORITE:
        return {
            ...state,
            moviesFavourites: state.moviesFavourites.concat(action.payload)
        }
        case GET_MOVIES:
        return {
            ...state,
            moviesLoaded: action.payload.Search
        }
        case GET_MOVIES_DETAIL: 
        return {
            ...state,
            movieDetail: action.payload,
        }
        case REMOVE_MOVIE_DETAIL:
        return {
            ...state,
            moviesFavourites: state.moviesFavourites.filter(m => m.imdbID !== action.payload),
        }
        default: return state;
    };
};

export default rootReducer;