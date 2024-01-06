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

const movieList = document.querySelector('.card-list'); // ul
const img_url = 'https://image.tmdb.org/t/p/w500';

/* 카드 api 추가 */
function showMovies(data) {
	for (let i = 0; i < data.length; i++) {
		let title = data[i]['title'];
		let overview = data[i]['overview'];
		let poster_path = data[i]['poster_path'];
		let vote_average = data[i]['vote_average'];
		let id = data[i]['id'];

		let temp_html = `
			<li class="movie-list" data-id="${id}">
				<a href="#">
				<img src="${img_url + poster_path}" alt="${title}">
				<div class="card-title-list">
					<h2>${title}</h2>
					<p class="average">- 평점 : ${vote_average}</p>
					<p>${overview}</p>
				</div>
				</a>
			</li>
    		`;
		movieList.insertAdjacentHTML('beforeend', temp_html);
	}


	/* 검색창 버튼 클릭시*/
	let searchBtn = document.getElementById('search-btn');

	searchBtn.addEventListener('click', function (e) {
		e.preventDefault();
		let searchTxt = document.getElementById('search-text').value;
		let cards = document.querySelectorAll('.movie-list');

		for (let i = 0; i < cards.length; i++) {
			let title = cards[i]; //각각의 요소를 가지고왔음.
			// console.log(title);
			let titleList = title.querySelector('h2'); //title에있는 h2요소를 가져옴.
			// console.log(titleList);
			let results = titleList.textContent; //다시 textContent로 담음.
			console.log(results);

			if (!results.includes(searchTxt)) { //검색한내용 철자와 result(title)안에 있는 내용을 비교함
				cards[i].style.display = 'none';
			} else {
				//값이 하나라도 포함되어있으면
				cards[i].style.display = 'block';
			}
		}
	});


	/* 알럿창 만들기 */
	// let movieId = document.querySelectorAll('.movie-list');

	// for(let j=0; j<movieId.length; j++){
	//   movieId[j].addEventListener('click',function(e){
	//     e.preventDefault();
	//     console.log(movieId[j]);
	//     const result = movieId[j].getAttribute('data-id');
	//     alert(`ID명은 : ${result} 입니다.`);
	//   });
	// }
	//알럿창에서 모달창으로 변경
	let movieId = document.querySelectorAll('.movie-list');
	const modalBg = document.querySelector('.modal-wrap');
	const modal = document.querySelector('.modal');

	for (let j = 0; j < movieId.length; j++) {

		
		movieId[j].addEventListener('click', function (e) {
			e.preventDefault();
			const result = movieId[j].getAttribute('data-id');
			console.log(result);
			modalBg.style.visibility = 'visible';
			modal.style.visibility = 'visible';
			document.body.classList.add('active');

			//모달 안에있는 내용이 계속 바뀌니까 초기화 해준다.
			modal.innerHTML = '';


			let modal_html = `
			<button class="close-btn" id="btn-close">&times;</button>
			<div class="card-ids">
				<img src="${img_url + data[j]['poster_path']}" alt="${data[j]['title']}">
				<div class="movie-id-list">
					<h2>"영화 ID명"은</h2>
					<p><span>${result}</span> 입니다 &#58;&#41;</p>
				</div>
			</div>
			`;
			modal.insertAdjacentHTML('beforeend', modal_html);
		
			closeBtn = document.getElementById('btn-close');
			closeBtn.addEventListener('click',function(){
				modalClose();
			});
		});
	}
	
		modalBg.addEventListener('click',function(e){
			if(e.target === modalBg){ //target,이벤트가 발생한 실제 요소
				modalClose();
			}
		});

		function modalClose(){
			modalBg.style.visibility = 'hidden';
			modal.style.visibility = 'hidden';
			document.body.classList.remove('active');
		}	
	
}

/* scroll-top */
const btt = document.querySelector('.go-top');
let scrollAmt = 0;


window.addEventListener('scroll', function () {
	scrollAmt = window.scrollY;
	// console.log(scrollAmt);

	if (scrollAmt > 300) {
		btt.style.display = "block";
	} else {
		btt.style.display = "none";
	}
});


btt.addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth"
	});
});

// btt.addEventListener('click',function(){
//   var timer = setInterval(function(){
//     if(scrollAmt != 0){
//       window.scrollBy(0, -200);
//     }else{
//       clearInterval(timer);
//     }
//   });
// });


