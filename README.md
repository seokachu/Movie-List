## TMDB API를 이용한 영화 검색 사이트 만들기 with Vanilla Javascript
>완성 예제
https://seokachu.github.io/movie


![Screenshot 2024-01-08 at 02 40 06](https://github.com/seokachu/movie/assets/116704646/8d717fa4-12d6-4541-b822-335e2e9e8c1e)


## 1. API를 불러와 인기있는 영화 20개를 로딩하여 불러오기
```javascript
/* api 호출 */
function getMovies() {
	fetch(url, options)
		.then(response => response.json())
		.then(data => showMovies(data.results))
		.catch(err => console.error(err));

}
```


## 2. 검색창 구현
![Screenshot 2024-01-08 at 03 28 34](https://github.com/seokachu/movie/assets/116704646/de0a2146-689f-4882-8cab-4a2d5f443e41)

```javascript
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
```


## 4. 영화 내용 클릭시 각각의 영화 ID를 불러오고, 모달창으로 구현
![Screenshot 2024-01-08 at 02 57 54](https://github.com/seokachu/movie/assets/116704646/e68edf00-aa88-4f4b-9907-e242507cb02a)



```javascript
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

```


## 5. @keyframe를 이용하여 모달창에 애니메이션을 넣기

![Screenshot 2024-01-08 at 03 02 37-min](https://github.com/seokachu/movie/assets/116704646/3199776e-7ae7-4bf2-99fe-02144e808820)

```css
.modal-wrap .modal.active{
    animation: modalup .3s .3s forwards;
}


@keyframes modalup{
    from{
        transform: translateY(100vh);
    }
    to{
        transform: translateY(0);
    }
}
```

## 6. scroll시 위로가기 버튼 구현
![Screenshot 2024-01-08 at 03 16 53](https://github.com/seokachu/movie/assets/116704646/354a1314-3f8b-4aef-bd49-1bdae25a17fa)
```javascript
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

```


