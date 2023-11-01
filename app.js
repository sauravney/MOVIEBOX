const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieBox = document.querySelector("#movie-box");
const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data);
};
getMovies(apiUrl);

const showMovies = (data) => {
  movieBox.innerHTML = "";
  data.results.forEach((result) => {
    const imagePath =
      result.poster_path === null
        ? "img/image-missing.png"
        : imgPath + result.poster_path;
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
                <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title">
                        <h2> ${result.original_title}  </h2>
                        <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p>
                        ${result.overview}
                    </p>
                 </div>
            `;
    movieBox.appendChild(box);
  });
};

document.querySelector("#search").addEventListener("keyup", function (e) {
  if (e.target.value != "") {
    getMovies(searchApi + e.target.value);
  } else {
    getMovies(apiUrl);
  }
});
