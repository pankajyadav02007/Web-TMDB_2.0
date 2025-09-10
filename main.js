console.log("connected");

const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTg4NTA4MDJhMzQ0YTQwMzk0MTQzMTI5MGI0YjUzNSIsIm5iZiI6MTc1NzMzNDE1Ni44NDMwMDAyLCJzdWIiOiI2OGJlY2E4YzY2NTg0ODUyMzU5YmM3MDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EuwxlaAIt4O_tWqWOK8KtpUPkce2DL_THbyNJJ-_uso"

const movieGenresListEl = document.getElementById("movieGenresList");

movieGenresListEl.addEventListener ("change",(e) => {
console.log(e.target.value);
window.open(`/genres-movies.html?${e.target.value}`);
});

//Fetch header option config
const headerOptions = {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`
};

// Find all Genres Movies List
function getMovieGenres(){
    fetch("https://api.themoviedb.org/3/genre/movie/list",{
        method: "GET",
        headers: headerOptions,
    })
    .then((res) => {
        console.log(res);
        if(!res.ok){
throw new Error (`Response status: ${res.status}`) 
        }

        res
        .json()
        .then((data) => {
            console.log(data);
            movieGenresListEl.innerHTML = "";
            for(let i = 0; i < data.genres.length; i++){
                movieGenresListEl.innerHTML = movieGenresListEl.innerHTML + `<Option value="id=${data.genres[i].id}&name=${data.genres[i].name}">${data.genres[i].name}</Option>`;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

// UpComing movies
function getUpcomingMovieList(){
    fetch("https://api.themoviedb.org/3/movie/upcoming",{
        method: "GET",
        headers: headerOptions,
    })
    .then((res) => {
        console.log(res);
        if(!res.ok){
throw new Error (`Response status: ${res.status}`) 
        }

        res
        .json()
        .then((data) => {
            console.log(data.results);

            const upComingMovie = data.results || [];

            const upComingMovieEl = document.getElementById("upComing-movie");

            for(let i = 0; i < data.upComingMovie.length; i++){
                upComingMovieEl.innerHTML = upComingMovieEl.innerHTML +
                 `<figure class="movie-card">
                <img src = "https://image.tmdb.org/t/p/w500${upComingMovie[i].poster_path}"/>
                <figcaption class = "movie-info">
                <h3>${upComingMovie[i].title}</h3>
                <p>${upComingMovie[i].overview}</p>
                <div class = "release-date">Release: ${upComingMovie[i].release-date}</div>
                </figcaption>
                </figure>`;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}

// movie list
function getMovieList(catName, id){
    fetch(`https://api.themoviedb.org/3/movie/${catName}`,{
        method: "GET",
        headers: headerOptions,
    })
    .then((res) => {
        console.log(res);
        if(!res.ok){
throw new Error (`Response status: ${res.status}`) 
        }

        res
        .json()
        .then((data) => {
            console.log(data.results);

            const movies = data.results || [];

            const movieConierEl = document.getElementById("upComing-movie");

            for(let i = 0; i < movies.length; i++){
                movieConierEl.innerHTML = movieConierEl.innerHTML +
                 `<figure class="movie-card">
                <img src = "https://image.tmdb.org/t/p/w500${movies[i].poster_path}"/>
                <figcaption class = "movie-info">
                <h3>${movies[i].title}</h3>
                <p>${movies[i].overview}</p>
                <div class = "release-date">Release: ${movies[i].release-date}</div>
                </figcaption>
                </figure>`;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    })
    .catch((err) => {
        console.log(err);
    });
}


window.addEventListener("load", () => {
getMovieGenres();
getMovieList("upcoming", "upcoming-movies")
getMovieList("popular", "popular-movies")
getMovieList("top_rated", "top-reted-movies")
});