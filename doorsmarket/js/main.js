var mainModule = (function(){

	var regVCart = /{"cart-count":/g;
		console.log(decodeURIComponent(document.cookie));




	/// устанавливаю куки, если нету

		if(!decodeURIComponent(document.cookie).match(regVCart)){
			var cookie = "";
			var time = new Date();
			time.setTime(time.getTime() + 1000*60*60*24*30);
			cookie+=encodeURIComponent('{"cart-count":{}};');
			cookie+=encodeURIComponent(" expires: ")+time.toGMTString()+encodeURIComponent(";");
			cookie+=encodeURIComponent("path="+document.location.hostname+";");
			document.cookie=cookie;

		}

		console.log(decodeURIComponent(document.cookie));

	var json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);

	// подгружаю список товаров в формате xml

	//// XML

	var load_xml = function(name) {

		var tempRequest, answer;

		try {  // all

						tempRequest = new XMLHttpRequest();
						tempRequest.open("GET", name, true);
						tempRequest.send(null);
						tempRequest.onreadystatechange = function(){
							if(this.readyState==4 && this.status==200){
								xmlDoc = tempRequest.responseXML.documentElement;
								document.xmlDoc = xmlDoc;

								// вызываю зависящие от этого параметра функции


								cart_amount_func();
								cart_build();
							}
						};

					}

			catch(e){ 

				alert(e.message);

				}
		}


	var xmlDoc;
	 	load_xml("list_gifts.xml");

	/// подсчитываю текущую сумму покупок

	var cart_amount;

	var cart_amount_func = function() {

		cart_amount = document.getElementsByClassName('cart_description_gift_amount').item(0);

		var cart_sum = 0;
		var xml_price;
		Object.keys(json_obj_cookie['cart-count']).forEach(function(item, i, arr) {
			xml_price = parseInt(xmlDoc.getElementsByTagName('gift').item(parseInt(item)-1).childNodes[4].textContent);
			cart_sum+=xml_price*parseInt(json_obj_cookie['cart-count'][item]);
		});

		cart_amount.textContent = "На сумму "+cart_sum;
	}


	/// количество товаров в корзине

	var cart_count_cookie = function() {

		var cart_count_cookie = 0;
		json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);

		Object.keys(json_obj_cookie['cart-count']).forEach(function(item, i, arr) {
			cart_count_cookie+=json_obj_cookie['cart-count'][item];
		});

		return cart_count_cookie;
	}


	var clear_cart_click = false;

	var cart_ids = new Array();
	var cart_count = document.getElementsByClassName('cart_count').item(0),
		cart_description_count = document.getElementsByClassName('cart_description_gift_count').item(0);

	var app_button = document.getElementsByClassName('button_application').item(0),
		zamer_button = document.getElementsByClassName('buttons_zamerchik').item(0),
		callback_button = document.getElementsByClassName('buttons_callback').item(0),
		callback_header = document.getElementsByClassName('header-nav-link-a').item(1);

	var zamer_form = document.getElementsByClassName('zamer_form').item(0),
		zamer_header = document.getElementsByClassName('header-nav-link-a').item(0);
	var zamer_fon = document.getElementsByClassName('zamer_fon').item(0);
	var zamer_cross = document.getElementsByClassName('zamer_cross').item(0);

	var callback_fon = document.getElementsByClassName('callback_fon').item(0),
		callback_form = document.getElementsByClassName('callback_form').item(0),
		callback_cross=document.getElementsByClassName('callback_cross').item(0);

	var application_form = document.getElementsByClassName('application_form').item(0),
		application_cross = document.getElementsByClassName('application_cross').item(0),
		application_fon = document.getElementsByClassName('application_fon').item(0);

	var gift_items_collection = document.getElementsByClassName('wrapper_gifts_item_wrap');

	var gift_buttons = document.getElementsByClassName('wrapper_gifts_item_button'),
		description_buttons = document.getElementsByClassName('gift_layout_description_button').item(0);

	var gift_buttons_boolean = false;

	var clear_cart_button = document.getElementsByClassName('cart_description_clear').item(0),
		cart_description_go = document.getElementsByClassName('cart_description_go').item(0),
		cart_icon = document.getElementsByClassName('cart_icon').item(0);

	var init = function() {
		setUpListeners();
		cart_description_count.textContent = "Товаров "+cart_count_cookie();
		cart_count.textContent = cart_count_cookie();
	}

	var setUpListeners = function() {
		app_button.addEventListener('click', app_button_click);
		zamer_button.addEventListener('click', zamer_button_click);
		zamer_header.addEventListener('click', zamer_button_click)
		callback_button.addEventListener('click', callback_button_click);
		callback_header.addEventListener('click', callback_button_click);
		zamer_fon.addEventListener('click', zamer_fon_close);
		zamer_cross.addEventListener('click', zamer_fon_close);
		callback_fon.addEventListener('click', callback_fon_close);
		callback_cross.addEventListener('click', callback_fon_close);
		application_cross.addEventListener('click', app_button_close);
		application_fon.addEventListener('click', app_button_close);
		clear_cart_button.addEventListener('click', clear_cart);
		cart_description_go.addEventListener('click', cart_description_went);
		cart_icon.addEventListener('click', cart_description_went);
		
		if(document.location.toString().search("gift")!=-1){
				description_buttons.addEventListener('click', gift_page_buttons_click);
		}
		
		for(i=0; i<gift_items_collection.length; i++){
			gift_items_collection.item(i).addEventListener('click', gift_items_click);
			gift_buttons.item(i).addEventListener('click', gift_buttons_click);
		}
	}

	/// очищаю корзину при клике очистить


	var clear_cart = function() {
		clear_cart_click = true;
		document.cookie = encodeURIComponent(decodeURIComponent(document.cookie).replace(/{.*}/g, '{"cart-count":{}}'));
		cart_description_count.textContent = "Товаров 0";
		cart_count.textContent = 0;
		cart_amount.textContent = "На сумму 0";

		if(document.location.href.match(/\w+\.html/g)=="cart.html"){
			document.location = document.location;
		}

		setTimeout(function() {clear_cart_click=false}, 10);
	}

	var cart_description_went = function() {

		
		if(!clear_cart_click){

				//Object.defineProperty(document, 'cookie', {configurable: false, enumerable: false, writable: false});
				document.location = "cart.html";
			}

	}
var gift_buttons_click = function() {
		

		json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);
		var current_id = parseInt(this.parentNode.childNodes[0].getAttribute('data-link').match(/\d+/g)[0]);
		var current_count = json_obj_cookie['cart-count'][current_id];
		
		if(current_count==undefined){
			json_obj_cookie['cart-count'][current_id]=1;
		}

		else {
			json_obj_cookie['cart-count'][current_id]++;
		}

		gift_buttons_boolean=true;

		document.cookie = encodeURIComponent(decodeURIComponent(document.cookie).replace(/{.*}/g, JSON.stringify(json_obj_cookie)));

		console.log(decodeURIComponent(document.cookie));

		cart_count.textContent = cart_count_cookie();


		cart_description_count.textContent = "Товаров "+cart_count_cookie();
		cart_amount_func();
	}

	var gift_page_buttons_click = function() {

		json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);
		var current_id = parseInt(this.parentNode.parentNode.childNodes[2].getAttribute('src').match(/\d+/g)[0]);
		var current_count = json_obj_cookie['cart-count'][current_id];

		if(current_count==undefined){
			json_obj_cookie['cart-count'][current_id]=1;
		}

		else {
			json_obj_cookie['cart-count'][current_id]++;
		}

		document.cookie = encodeURIComponent(decodeURIComponent(document.cookie).replace(/{.*}/g, JSON.stringify(json_obj_cookie)))
		console.log(decodeURIComponent(document.cookie));

		cart_count.textContent = cart_count_cookie();
		cart_description_count.textContent = "Товаров "+cart_count_cookie();
		cart_amount_func();

	}

	var gift_items_click = function() {

		if(gift_buttons_boolean){

		}
		else {

			document.location = this.getElementsByTagName('img').item(0).getAttribute("data-link")+".html";
			}
		gift_buttons_boolean = false;

	}


	var app_button_click = function(e) {

		e.preventDefault();

		app_button.style.zIndex = "101";

		application_form.className = application_form.className.replace(" animated keyframe_application_form_reverse", "");
		app_button.className = app_button.className.replace(" animated keyframe_app_button_reverse","");
		application_fon.className = application_fon.className.replace(" animated fadeOut", "");

		application_form.className = application_form.className + " animated keyframe_application_form";
		app_button.className = app_button.className + " animated keyframe_app_button";
		application_fon.className = application_fon.className + " animated fadeIn";

		app_button.removeEventListener('click', app_button_click);
		app_button.addEventListener('click', app_button_close);
		application_form.style.display = "block";
	
	}

	var app_button_close = function() {

		app_button.style.zIndex = "0";

		application_form.className = application_form.className.replace(" animated keyframe_application_form", "");
		app_button.className = app_button.className.replace(" animated keyframe_app_button","");
		application_fon.className = application_fon.className.replace(" animated fadeIn", "");

		application_form.className = application_form.className + " animated keyframe_application_form_reverse";
		app_button.className = app_button.className + " animated keyframe_app_button_reverse";
		application_fon.className = application_fon.className + " animated fadeOut";

		app_button.removeEventListener('click', app_button_close);
		app_button.addEventListener('click', app_button_click);
	}

	var zamer_button_click = function(e){

		e.preventDefault();

		zamer_form.style.display = "block";
		zamer_fon.style.display = "block";
		zamer_form.className = zamer_form.className + " animated fadeIn";
		zamer_fon.className = zamer_fon.className + " animated fadeIn";
		zamer_fon.className = zamer_fon.className.replace(" animated fadeOut", "");
		zamer_form.className = zamer_form.className.replace(" animated fadeOut", "");
	}

	var zamer_fon_close = function() {
		zamer_form.className = zamer_form.className + " animated fadeOut";
		zamer_fon.className = zamer_fon.className + " animated fadeOut";
		zamer_form.className = zamer_form.className.replace(" animated fadeIn", "");
		zamer_fon.className = zamer_fon.className.replace(" animated fadeIn", "");
		setTimeout(function() {
			zamer_form.style.display = "none";
			zamer_fon.style.display = "none";
		}, 300);
	}

	var callback_button_click = function(e) {

		e.preventDefault();

		callback_fon.style.display = "block";
		callback_form.style.display = "block";

		callback_form.className = callback_form.className.replace(" animated topOut", "");
		callback_fon.className = callback_fon.className.replace(" animated fadeOut", "");
		callback_fon.className = callback_fon.className + " animated fadeIn";
		callback_form.className = callback_form.className + " animated topIn";

	}

	var callback_fon_close = function() {

		
		callback_form.className = callback_form.className.replace(" animated topIn", "");
		callback_fon.className = callback_fon.className.replace(" animated fadeIn", "");
		callback_fon.className = callback_fon.className + " animated fadeOut";
		callback_form.className = callback_form.className + " animated topOut";

		setTimeout(function() {
			callback_fon.style.display = "none";
			callback_form.style.display = "none";
		}, 300);

	}

	return {
		init: init
	};


})();

mainModule.init();