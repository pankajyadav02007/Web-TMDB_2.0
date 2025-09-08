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