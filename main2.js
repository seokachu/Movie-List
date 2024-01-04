
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
function showMovies() {
    fetch(url, options)
        .then(response => response.json())
        .then(data => moviesApi(data.results))
        .catch(err => console.error(err));
}

showMovies();

const movieListContainer = document.querySelector('.card-list'); // ul
const img_url = 'https://image.tmdb.org/t/p/w500';


function moviesApi(data) {
    for (let i = 0; i < data.length; i++) {
      const cardList = document.getElementById('main-card');
      let movieTitle = data[i]['title'];
      let movieOverview = data[i]['overview'];
      let posterPath = data[i]['poster_path'];
      let voteAverage = data[i]['vote_average'];
      let id = data[i]['id'];
  
      let temp_hteml = `<div class="col">
        <a class="alink" data-linkBtn="${id}" href="#">
           <div class="card h-100">
             <img src="https://image.tmdb.org/t/p/w500${posterPath}" >
             <div class="card-body">
              <h5 class="card-title">${movieTitle}</h5>
              <p class="card-text">${movieOverview}</p>
            <p class="card-average">${voteAverage}</p>
            </div>
          </div>
        </a>
      </div>
    `;
      cardList.insertAdjacentHTML('beforeend', temp_hteml);
    }
    let alink = document.querySelectorAll('.alink');
  
    for (let j = 0; j < id.length; j++) {
      alink.addEventListener('click', function (e) {
        e.preventDefault(); //a태그 막아. Html도 클릭이라서 이중클릭됨.
        let idfor = alink[j];
        console.log(idfor);
        const result = id.getAttribute('data-linkBtn');
        alert(`ID명은 ${result} 입니다.`);
      });
    }
  }