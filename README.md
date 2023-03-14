# Tech returners IMDB full-stack application (Group Task)
Built using create-react-app for the frontend and express for the backend, a simple IMDB clone

## Table of Contents

- Tech returners IMDB full-stack application (Group Task)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Installing](#installing)
  - [Usage](#usage)

## About
This was a task from Tech Returners to make a full-stack application in a group of 4 people. The task was open ended - We were told to use a public api and build a frontend and backend for it, we chose [OMDb API](https://www.omdbapi.com/)

## Prerequisites
register for a key at [OMDb API](https://www.omdbapi.com/)

## Getting Started
Open a terminal and navigate to a desired folder to clone the respository to and use 
```
git clone https://github.com/glend1/tr-omdb-api-fullstack/
```

## Installing
Make sure you have a new version of node installed on your computer then run

```
npm run custom-install
```

you must also populate `.env.local` in `server/` with the following key(s)
```
API_KEY=<your-key> //this value is required
SERVER_PORT=3001 //optional value
DB_HOST=localhost //optional value
DB_PORT=5432 //optional value
DB_ROOT_USER=postgres //only used for database setup
DB_ROOT_PASSWORD=password //only used for database setup
DB_USER=movie_user //optional value
DB_PASSWORD=password //optional value
DB_DATABASE=movie_db // optional value
DB_TABLE=movie_table // optional value
```

provided is a postgres setup script it is not robust or well tested. it can be run from `npm run db-setup`.

## Usage
to run the application

```
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The REST api will be located at;

[http://localhost:3001/api/v1/search/{title}/{page}](http://localhost:3001/api/v1/search/). this requires a `title` url path with a movie name search term, optionally you may include a `page` value. This will return;
```
//On error
{
  "Response": "False",
  "Error": "Too many results."
}
//On success
{
  "Search": [
    {
      "Title": "Sin City: A Dame to Kill For",
      "Year": "2014",
      "imdbID": "tt0458481",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5ODYwNjgxMF5BMl5BanBnXkFtZTgwMTcwNzAyMjE@._V1_SX300.jpg"
    },
    ... +9 others
    ]
    "totalResults": "484",
    "Response": "True"
}
```

[http://localhost:3001/api/v1/movie/{id}](http://localhost:3001/api/v1/movie/). this requires a `id` url path with a valid IMDB id. This will return;
```
//On error
{
  "Response": "False",
  "Error": "Too many results."
}
//On success
{
  "Title": "Sin City: A Dame to Kill For",
  "Year": "2014",
  "Rated": "R",
  "Released": "22 Aug 2014",
  "Runtime": "102 min",
  "Genre": "Action, Crime, Thriller",
  "Director": "Frank Miller, Robert Rodriguez",
  "Writer": "Frank Miller",
  "Actors": "Mickey Rourke, Jessica Alba, Josh Brolin",
  "Plot": "Some of Sin City's most hard-boiled citizens cross paths with a few of its more reviled inhabitants.",
  "Language": "English",
  "Country": "United States",
  "Awards": "4 wins & 6 nominations",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5ODYwNjgxMF5BMl5BanBnXkFtZTgwMTcwNzAyMjE@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "6.5/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "43%"
    },
    {
      "Source": "Metacritic",
      "Value": "46/100"
    }
  ],
  "Metascore": "46",
  "imdbRating": "6.5",
  "imdbVotes": "164,450",
  "imdbID": "tt0458481",
  "Type": "movie",
  "DVD": "18 Nov 2014",
  "BoxOffice": "$13,757,804",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}
```

there are 4 different endpoints for the wishlist;

[http://localhost:3001/api/v1/wishlist](http://localhost:3001/api/v1/wishlist). is a GET method. This will return;
```
[val1, val2, val3 ...]
```

[http://localhost:3001/api/v1/wishlist/{id}](http://localhost:3001/api/v1/wishlist/). is a GET method. This will return;
```
{ id: true }
```

[http://localhost:3001/api/v1/wishlist](http://localhost:3001/api/v1/wishlist). is a POST method. This will return;
```
{ created: true }
```

[http://localhost:3001/api/v1/wishlist](http://localhost:3001/api/v1/wishlist). is a DELETE method. This will return;
```
{ deleted: true }
```


## Tests
Tests can be run
```
npm run test-client
npm run test-server
```
