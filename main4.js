let moviesData = []; // 영화검색데이터 다시 배열로 담았음 (검색서치부분)

/* api 호출 */
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWNjY2I1ZDc3NmI5YjliYWU0NzQ5MmQyOGMxOWEzOCIsInN1YiI6IjY1OTNiNjI4MDY5ZjBlNDRhMjIxNTczNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rdMqnqX7eza-iQQfPXo0nv8mea9jvRHnGwwY8kNkMGs'
    }
};

/* api 호출 */
const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KO&page=1&sort_by=popularity.desc';

function getMovies() {
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            moviesData = data.results; // 데이터를 전역 변수에 저장
            showMovies(moviesData); // 영화 목록을 보여주는 함수 호출
        })
        .catch(err => console.error(err));
}
getMovies();

// 변수 선언
const movieListContainer = document.querySelector('.card-list'); // ul
const img_url = 'https://image.tmdb.org/t/p/w500';

/* 영화 이미지, 타이틀, 내용 불러오기 */
function showMovies(data) {
    data.forEach((movie) => {
        const { id, title, poster_path, overview, vote_average } = movie; //각각 객체를 movie라는 이름으로 받아와서 사용함.(객체분해할당해줬음)
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
    });

    // 클릭시 id 알럿창 띄우기
    movieListContainer.addEventListener('click', function (e) {
        e.preventDefault();
        const clickedLink = e.target.closest('a[data-id]');
        if (clickedLink) {
            const result = clickedLink.getAttribute('data-id');
            alert(`ID명은 ${result} 입니다.`);
            console.log("ID명은", result, "입니다.");
        }
    });
}

// 변수 선언 (검색 관련)
const searchTxt = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');

// 검색버튼에 이벤트 리스너 추가하기
searchBtn.addEventListener('click', function () {
    searchMovies(searchTxt.value, moviesData);
});

// 검색함수 정의
function searchMovies(text, data){
    const searchList = text.toLowerCase(); // 받은 텍스트를 소문자로 먼저 변환해줌

    // 영화목록 필터링해서 가져오기
    const filterMovies = data.filter(function(movie){
        const title = movie.title.toLowerCase();
        const overview = movie.overview.toLowerCase();

        return title.includes(searchList) || overview.includes(searchList);
    });

    renderMovies(filterMovies);
}

// 필터된 영화목록을 화면에 출력하는 함수
function renderMovies(filteredMovies) {
    const movieListContainer = document.querySelector('.card-list'); // ul
    const img_url = 'https://image.tmdb.org/t/p/w500';

    const movieListFragment = document.createDocumentFragment();

    filteredMovies.forEach((movie) => {
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
        movieListFragment.appendChild(movieList);
    });

    // 기존 목록 비우고 새로운 목록 추가
    movieListContainer.innerHTML = '';
    movieListContainer.appendChild(movieListFragment);
}
