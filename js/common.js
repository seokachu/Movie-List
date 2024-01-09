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


