
import React, { useEffect, useState } from "react";
import { OmbdApiFetch } from "../Fetch/OmbdApiFetch";
import { MovieType } from "./MovieType.type";
import ErrorComponent from "../ErrorHandler/ErrorComponent";
import { ErrorMessagesAPI } from "../ErrorHandler/ErrorMessages";
import MoviesContextProvider from "./Context/MoviesContextProvider";
//import { NavLink } from "react-router-dom";


//const url =  `http://www.omdbapi.com/?s=${genre}&type=movie&apikey=3fe67f82`

// const movieArr = [{Title: 'Last Action Hero', Year: '1993', imdbID: 'tt0107362', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNjdhOGY1OT…zY5MmNmXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg'},
// {Title: 'Looney Tunes: Back in Action', Year: '2003', imdbID: 'tt0318155', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMzRiOWNkOW…zhlNTk2XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg'},
// {Title: 'A Civil Action', Year: '1998', imdbID: 'tt0120633', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BZmEzNjhiZW…GFkMzI4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'},{Title: 'An Action Hero', Year: '2022', imdbID: 'tt15600222', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMDJiOTdmMG…WMzZTg0XkEyXkFqcGdeQXVyOTI3MzI4MzA@._V1_SX300.jpg'},
// {Title: 'Missing in Action', Year: '1984', imdbID: 'tt0087727', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNDczNDljZT…mFjMDQyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'},
// {Title: 'Action Point', Year: '2018', imdbID: 'tt6495770', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjEyMTU5MTk1N15BMl5BanBnXkFtZTgwMzIzMzczNTM@._V1_SX300.jpg'},
// {Title: 'Action Jackson', Year: '1988', imdbID: 'tt0094612', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BYjc0Y2E2Zj…zFmMjI4XkEyXkFqcGdeQXVyNjc5NjEzNA@@._V1_SX300.jpg'},
// {Title: '321 Action', Year: '2020', imdbID: 'tt13423846', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BYTRmYzgyZj…DExNWE5XkEyXkFqcGdeQXVyNjI2ODk3NTM@._V1_SX300.jpg'},
// {Title: 'Missing in Action 2: The Beginning', Year: '1985', imdbID: 'tt0089604', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BOTFhNTdiND…jBjNTBhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg'},
// {Title: 'Class Action', Year: '1991', imdbID: 'tt0101590', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BNWY5Mjk4Zm…zA3MDIzXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_SX300.jpg'}]

const MovieList: React.FC = () => {

    const [movies, setMovies] = useState<Array<MovieType>>([]);
    const [errorMsg, setErrorMsg] = useState<string>("");



    const { errorFetch } = ErrorMessagesAPI;
    const url: string = `http://www.omdbapi.com/?s=spider&type=movie&apikey=3fe67f82`

    const fetchMovie = async () => {
        setErrorMsg("");
    const movieResponse= await OmbdApiFetch<Array<MovieType>>(url);
    console.log(movieResponse)
  
        if (movieResponse && typeof movieResponse !== "string") {
            const movieArray: Array<MovieType> = movieResponse.map((movie :MovieType) => {
            const { Title, Year, imdbID, Type,Poster} = movie;
            return { Title: Title,Year: Year,imdbID:imdbID,Type:Type, Poster:Poster};      
        });
    setMovies(movieArray);
        } else if(!movieResponse){
           setErrorMsg(errorFetch); 
        }  
        else {
            console.log(movieResponse);
            setErrorMsg(movieResponse);
        console.log("error");
    }   
}

useEffect(()=>{
    fetchMovie();
}, [])
    

    return (
        <MoviesContextProvider>
          <div>
                <ul className="movieList">
                {
                    movies.map(movie => {
                        const { Title, Year, imdbID, Poster} = movie;
                        return (
                            <li key={imdbID} className="movieList__item">
                                {/* This could be a NavLink to=`/watch/${imdbID}` */}
                                <a href="./">
                                    <div className="movieList__img-container">
                                    <img className="movieList__img" src={Poster} alt={ Title} /> 
                                    </div>    
                                    <h6 className="movieList__heading">{`${Title}, ${Year}`}</h6>
                                </a>      
                            </li>
                        )
                    })
                }
                </ul>
                {
                 errorMsg && <ErrorComponent>{errorMsg}</ErrorComponent>
                }
          </div>)
        </MoviesContextProvider>
    )
   
}

export default MovieList;

