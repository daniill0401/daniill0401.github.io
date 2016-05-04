var moduleGift = (function() {

	var init = function() {
		setUpListeners();
		gift_img.setAttribute("src", "img/"+currentPage+".jpg");
	}

	var nextPage = document.getElementsByClassName('gift_layout_right_round').item(0),
		previousPage = document.getElementsByClassName('gift_layout_left_round').item(0);

	var currentPage = parseInt(document.location.toString().match(/\d*(?=\.html)/g));

	var gift_img = document.getElementsByClassName('gift_layout_img').item(0);
		
	var setUpListeners = function() {

		nextPage.addEventListener('click', nextPageClick);
		previousPage.addEventListener('click', previousPageClick);

	}


	var nextPageClick = function() {
		document.location = "gift_"+(currentPage+1)+".html";
	}

	var previousPageClick = function() {
		if(currentPage==1){
			alert("Это первая страница :)")
		}
		else {
			document.location = "gift_"+(currentPage-1)+".html";
		}
	}

	return {
		init: init
	}
})();

moduleGift.init();