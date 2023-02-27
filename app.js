console.log("Movie Pickr");

const mainContainer = document.querySelector(".main-container");
const movieBtn = document.querySelector(".movie-btn");
console.log(mainContainer, movieBtn);
const watchlistContainer = document.querySelector(".watchlist-container");
console.log(watchlistContainer);
const movieDatabaseURL =
  "https://api.themoviedb.org/3/movie/10243?api_key=f50ab56a6675f3c83a1dda67aba2d247&language=en-US";

window.addEventListener("DOMContentLoaded", () => {
  console.log("document parsed");
  watchlistPersistence();
});

// random ID gen
function randomIDGen() {
  let randomNum = " ";
  for (let i = 1; i < 6; i++) {
    let randomNumbers = Math.round(Math.random()) * i;
    // console.log(randomNumbers);
    randomNum = randomNum + randomNumbers;
    console.log(randomNum);
  }
  return randomNum;
}

const randomID = randomIDGen().trim();
console.log(randomID);

// Random number generated in order to randomly select a page from the fetched data
function randomNum() {
  let randomNum = Math.floor(Math.random() * 100) + 1;
  console.log(randomNum);
  return randomNum;
}
randomNum();

// Random number generated in order to select a movie from fetched array
function randomMovieGet() {
  let randomNum = Math.floor(Math.random() * 20);
  console.log(randomNum);
  return randomNum;
}
randomMovieGet();

let newRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=f50ab56a6675f3c83a1dda67aba2d247&language=en-US&page=${randomNum()}`;

async function getMovieData() {
  const response = await fetch(newRatedURL);
  const data = await response.json();
  console.log(response);
  console.log(data);
  const randomMovie = data.results[randomMovieGet()];
  console.log(randomMovie);
  displayMovieDOM(randomMovie);
  // Add to watchlist functionality
  mainContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("watchlist-btn")) {
      console.log("added to watchlist");
      addToWatchlist(randomMovie);
    }
  });
}
getMovieData();

function displayMovieDOM(movieData) {
  // console.log(movieData);
  const {
    backdrop_path,
    original_title,
    overview,
    vote_average,
    title,
    poster_path,
  } = movieData;
  console.log(
    backdrop_path,
    original_title,
    overview,
    vote_average,
    title,
    poster_path
  );
  const movieDisplayContainer = document.createElement("section");
  movieDisplayContainer.classList.add("movie-display");
  const movieDataDOM = `<div class="movie-poster">
          <img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="movie poster" class="movie-poster" />
        </div>
        <article class="movie-details">
          <h2 class="movie-title">${title}</h2>
          <p class="movie-description">
            ${overview}
          </p>
          <h3 class="movie-rating">Rating: ${vote_average}</h3>
          <button class="watchlist-btn">Add to watchlist<img src="./Drawer-Add.svg" class="watchlist-icon" alt="watchlist add" /></button>
        </article>`;
  movieDisplayContainer.innerHTML = movieDataDOM;
  mainContainer.appendChild(movieDisplayContainer);
}

movieBtn.addEventListener("click", () => {
  const clearDOM = [...mainContainer.children][0];
  console.log(clearDOM);
  location.reload();
  clearDOM.remove();
  getMovieData();
  console.log("pick a movie");
});

function addToWatchlist(movieData) {
  const { title, poster_path } = movieData;
  console.log(movieData);
  const newMovieAdded = document.createElement("div");
  newMovieAdded.classList.add("watchlist-poster");
  const watchlistMovieContent = `<img src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}" />
        <footer class="frosted-section">
          <h5>${title}</h5>
        </footer>`;
  newMovieAdded.innerHTML = watchlistMovieContent;
  watchlistContainer.appendChild(newMovieAdded);
  // add desired movie to local storage with a randomly generated id
  let randomMovieID = randomIDGen();
  console.log(randomMovieID);
  addToLocalStorage(randomMovieID, title, poster_path);
}

// Add to local storage functionality
function addToLocalStorage(id, title, poster) {
  const addedMovie = { id: id, title: title, poster: poster };
  let currentMovieList = getLocalStorage("movieList");
  console.log(currentMovieList, addedMovie);
  currentMovieList.push(addedMovie);
  localStorage.setItem("movieList", JSON.stringify(currentMovieList));
}

// Retrieve from local storage functionality
function getLocalStorage() {
  const movieList = JSON.parse(localStorage.getItem("movieList"));
  console.log(movieList);
  if (movieList) {
    return JSON.parse(localStorage.getItem("movieList"));
  } else {
    return [];
  }
}

// Delete from local storage functionality
function deleteFromLocalStorage(id) {
  const currentWatchlist = getLocalStorage();
  console.log(currentWatchlist);
  let filteredWatchlist = currentWatchlist.filter((item) => {
    console.log(item.id);
    if (item.id !== id) {
      return item;
    }
  });
  console.log(filteredWatchlist);
  localStorage.setItem("movieList", JSON.stringify(filteredWatchlist));
}

// Delete movie from DOM watchlist
function deleteFromWatchlist(movieContainer) {
  movieContainer.remove();
}

// Load watchlist from local storage
function watchlistPersistence() {
  const currentWatchlist = getLocalStorage();
  console.log(currentWatchlist);
  currentWatchlist.map((item) => {
    console.log(item);
    const { id, title, poster } = item;
    console.log(id, title, poster);
    const watchlistMovieDiv = document.createElement("div");
    watchlistMovieDiv.classList.add("watchlist-poster");
    const movieDatasetID = document.createAttribute("data-id");
    watchlistMovieDiv.setAttributeNode(movieDatasetID);
    movieDatasetID.value = `${id}`;
    const watchlistMovieContent = `
     <img src="./X-Square.svg" class="delete-icon" alt="delete icon" />
    <img src="https://image.tmdb.org/t/p/original/${poster}" alt="${title}" />
    <footer class="frosted-section">
    <h5>${title}</h5>
          </footer>`;
    watchlistMovieDiv.innerHTML = watchlistMovieContent;
    watchlistContainer.appendChild(watchlistMovieDiv);
  });
}

watchlistContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    console.log("item deleted");
    let currentMovieID = e.target.parentElement.dataset.id;
    console.log(currentMovieID);
    let currentMovieParent = e.target.parentElement;
    console.log(currentMovieParent);
    deleteFromLocalStorage(currentMovieID);
    deleteFromWatchlist(currentMovieParent);
  }
});
