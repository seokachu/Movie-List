/* api 불러오기 */
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWNjY2I1ZDc3NmI5YjliYWU0NzQ5MmQyOGMxOWEzOCIsInN1YiI6IjY1OTNiNjI4MDY5ZjBlNDRhMjIxNTczNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rdMqnqX7eza-iQQfPXo0nv8mea9jvRHnGwwY8kNkMGs'
    }
};

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc';

/* api 호출 */
function showMovies(){
    fetch(url, options)
        .then(response => response.json())
        .then(data => moviesApi(data.results))
        .catch(err => console.error(err));

}

showMovies();

const movieListContainer = document.querySelector('.card-list'); // ul
const img_url = 'https://image.tmdb.org/t/p/w500';

function moviesApi(data){
    
    for ( let i = 0; i<data.length; i++){
        const movie = data[i];
        const { id, title, poster_path, overview, vote_average } = movie;
        const movieList = document.createElement('li');
        movieList.classList.add('movie-list');
        movieList.innerHTML = `
        <a href="#" data-id="${id}">
            <img src="${img_url + poster_path}" alt="${title}">
            <div class="card-title-list">
                <h2>${title}</h2>
                <p class="average">- 평점 : ${vote_average}</p>
                <p>${overview}</p>
            </div>
        </a>
    `;
    movieListContainer.appendChild(movieList);

    }
}

console.log(moviesApi());

