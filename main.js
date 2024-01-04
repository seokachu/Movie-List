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
function getMovies() {
    fetch(url, options)
        .then(response => response.json())
        .then(data => showMovies(data.results))
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
    const movieId = document.querySelectorAll('.movie-list a'); //li a

    movieId.forEach( id => {
        id.addEventListener('click', function (e) {
            e.preventDefault();
            const result = id.getAttribute('data-id');
            alert(`ID명은 ${result} 입니다.`);
            console.log("ID명은"+id+"입니다.");
        });
    });
}



/* 영화검색창 보이기 */
const searchTxt = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');

//검색함수 정의
function searchMovies(text){
    const searchList = text.value.toLowerCase(); //받은 텍스트를 소문자로 먼저 변환해줌, value는 해당 요소의 값에 접근하는 속성임.
    
    //영화목록 필터링해서 가져오기
    const filterMovies = showMovies().filter(function(){
      
    });
};

//검색버튼에 이벤트 리스너 추가하기
searchBtn.addEventListener('click',function(){
    searchMovies(searchTxt);
});