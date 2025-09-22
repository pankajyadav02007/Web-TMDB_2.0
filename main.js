console.log("connected");

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTg4NTA4MDJhMzQ0YTQwMzk0MTQzMTI5MGI0YjUzNSIsIm5iZiI6MTc1NzMzNDE1Ni44NDMwMDAyLCJzdWIiOiI2OGJlY2E4YzY2NTg0ODUyMzU5YmM3MDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EuwxlaAIt4O_tWqWOK8KtpUPkce2DL_THbyNJJ-_uso";

const movieGenresListEl = document.getElementById("movieGenresList");

movieGenresListEl.addEventListener("change", (e) => {
  console.log(e.target.value);
  window.open(`/genres-movies.html?${e.target.value}`);
});

//Fetch header option config
const headerOptions = {
  accept: "application/json",
  Authorization: `Bearer ${API_TOKEN}`,
};

// Carousel Section
function Carousel(moviesArr = []) {
  const sliderContainer = document.getElementById("now-playing-container");
  let index = 0;
  setInterval(() => {
    sliderContainer.innerHTML = `<section class="slider">
        <img
          src="https://image.tmdb.org/t/p/original/${moviesArr[index].backdrop_path}"
          style="height: 450px"
        />
        <div class="slider-info">
          <h3>${moviesArr[index].title}</h3>
          <p>${moviesArr[index].overview}</p>
        </div>
      </section>`;

    index = index + 1;
    if (index >= moviesArr.length) {
      index = 0;
    }
  }, 5000);
}

// Find all Genres Movies List
function getMovieGenres() {
  fetch("https://api.themoviedb.org/3/genre/movie/list", {
    method: "GET",
    headers: headerOptions,
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      res
        .json()
        .then((data) => {
          console.log(data);
          movieGenresListEl.innerHTML = "";
          for (let i = 0; i < data.genres.length; i++) {
            movieGenresListEl.innerHTML =
              movieGenresListEl.innerHTML +
              `<button><a href='genres-movie.html?id=${data.genres[i].id}'>${data.genres[i].name}</a></button>`;
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

// click button to show movie
function getMovieByGenresId(id) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
    {
      method: "GET",
      headers: headerOptions,
    }
  )
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      res.json().then((data) => {
        console.log(data);
        const movies = data.results;
        console.log(data);
        const movieContainerEl = document.getElementById("genMoviesList");
        movieContainerEl.innerHTML = "";
        for (let i = 0; i < movies.length; i++) {
          movieContainerEl.innerHTML =
            movieContainerEl.innerHTML +
            `<a href="movies-details.html?id=${movies[i].id}">
<img src="https://image.tmdb.org/t/p/w500/${movies[i].poster_path}" alt="${movies[i].title}" title="${movies[i].title}">
<div class="card-content">
<p class="rating">⭐ ${movies[i].vote_average}</p>
<h3 class="movie-title">${movies[i].title}</h3>
</div>
</a>`;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// click cards and show all details
function movieCards() {
  fetch("", {
    method: "GET",
    headers: headerOptions,
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      res.json().then((data) => {
        console.log(data);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// UpComing movies
function getUpcomingMovieList() {
  fetch("https://api.themoviedb.org/3/movie/upcoming", {
    method: "GET",
    headers: headerOptions,
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      res
        .json()
        .then((data) => {
          console.log(data.results);

          const upComingMovie = data.results || [];
          Carousel(upComingMovie);
          const upComingMovieEl = document.getElementById("upcoming-movies");

          for (let i = 0; i < upComingMovie.length; i++) {
            upComingMovieEl.innerHTML =
              upComingMovieEl.innerHTML +
              `<figure class="movie-card">
                 <a href="movies-details.html?id=${upComingMovie[i].id}">
                <img src = "https://image.tmdb.org/t/p/w500${upComingMovie[i].poster_path}"/>
                <figcaption class = "movie-info">
                <h3>${upComingMovie[i].title}</h3>
                <p>${upComingMovie[i].overview}</p>
                <div class = "release-date">Release: ${upComingMovie[i].release_date}</div>
                </figcaption>
                </a>
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
function getMovieList(catName, id) {
  fetch(`https://api.themoviedb.org/3/movie/${catName}`, {
    method: "GET",
    headers: headerOptions,
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      res.json().then((data) => {
        console.log(data.results);

        const movies = data.results || [];

        const movieConierEl = document.getElementById(id);

        for (let i = 0; i < movies.length; i++) {
          movieConierEl.innerHTML =
            movieConierEl.innerHTML +
            `<figure class="movie-card">
                  <a href="movies-details.html?id=${movies[i].id}">
                <img src = "https://image.tmdb.org/t/p/w500${movies[i].poster_path}"/>
                <figcaption class = "movie-info">
                <h3>${movies[i].title}</h3>
                <p>${movies[i].overview}</p>
                <div class = "release-date">Release: ${movies[i].release_date}</div>
                </figcaption>
                </a>
                </figure>`;
        }
      });
      // .catch((err) => {
      //   console.log(err);
      // });
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("load", () => {
  getMovieGenres();
});
