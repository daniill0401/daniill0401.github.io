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


	/// сборка корзины

	function cart_build() {

		var appendObject = document.getElementsByClassName('cartpage_content').item(0);
			var amount = 0;
			var cartpage_all_value;

		var xmlDoc = document.xmlDoc;


		var json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);

		Object.keys(json_obj_cookie['cart-count']).forEach(function(item, i, arr) {



			var position = xmlDoc.getElementsByTagName('gift').item(i).childNodes[1].textContent;
			var model = xmlDoc.getElementsByTagName('gift').item(i).childNodes[3].textContent;
			var price = parseInt(xmlDoc.getElementsByTagName('gift').item(i).childNodes[4].textContent);
			var image = xmlDoc.getElementsByTagName('gift').item(i).childNodes[6].textContent;
			var count = parseInt(json_obj_cookie['cart-count'][item]);
			var gift_id = parseInt(item);

			amount+=price*count;


			var wrapper_block = document.createElement('div');
			wrapper_block.className = "cartpage_gift";

			var image_block = document.createElement('div');
			image_block.className = "cartpage_gift_image";
			image_block.style.backgroundImage="url("+image+")";
			wrapper_block.appendChild(image_block);

			var description_block = document.createElement('div');
			description_block.className = "cartpage_gift_description";
			wrapper_block.appendChild(description_block);

			var description_title_block = document.createElement('div');
			description_title_block.className = "cartpage_gift_description_title";
			description_block.appendChild(description_title_block);

			var description_title_name_block = document.createElement('p');
			description_title_name_block.className = "cartpage_gift_description_title_name";
			description_title_name_block.textContent = "Позиция: "
			description_title_block.appendChild(description_title_name_block);

			var description_title_key_block = document.createElement('p');
			description_title_key_block.className = "cartpage_gift_description_title_key";
			description_title_key_block.textContent = position;
			description_title_block.appendChild(description_title_key_block);


			var description_model_block = document.createElement('div');
			description_model_block.className = "cartpage_gift_description_model";
			description_block.appendChild(description_model_block);

			var description_model_name_block = document.createElement('p');
			description_model_name_block.className = "cartpage_gift_description_model_name";
			description_model_name_block.textContent = "Модель: "
			description_model_block.appendChild(description_model_name_block);

			var description_model_key_block = document.createElement('p');
			description_model_key_block.className = "cartpage_gift_description_model_key";
			description_model_key_block.textContent = model;
			description_model_block.appendChild(description_model_key_block);

			var howmuch_block = document.createElement('div');
			howmuch_block.className = "cartpage_gift_howmuch";
			wrapper_block.appendChild(howmuch_block);

			var hidden_value = document.createElement('div');
			hidden_value.setAttribute('data-id', gift_id);
			hidden_value.className="cartpage_gift_howmuch_hidden";
			howmuch_block.appendChild(hidden_value);

			var first_button = document.createElement('div');
			first_button.className = "cartpage_gift_howmuch_button cartpage_gift_howmuch_button_up";
			var first_triangle = document.createElement('div');
			first_triangle.className = "cartpage_gift_howmuch_button_triangle cartpage_gift_howmuch_button_triangle_up";
			first_button.appendChild(first_triangle);
			howmuch_block.appendChild(first_button);

			var second_button = document.createElement('div');
			second_button.className = "cartpage_gift_howmuch_button cartpage_gift_howmuch_button_down";
			var second_triangle = document.createElement('div');
			second_triangle.className = "cartpage_gift_howmuch_button_triangle cartpage_gift_howmuch_button_triangle_down";
			second_button.appendChild(second_triangle);
			howmuch_block.appendChild(second_button);

			var input = document.createElement('input');
			input.className = "cartpage_gift_howmuch_value";
			input.setAttribute('type', 'text');
			input.setAttribute('value', count);
			howmuch_block.appendChild(input);

			var gift_sum = document.createElement('div');
			gift_sum.className = "cartpage_gift_sum";
			wrapper_block.appendChild(gift_sum);

			var gift_sum_title = document.createElement('p');
			gift_sum_title.className = "cartpage_gift_sum_title";
			gift_sum_title.textContent = "Сумма: ";
			gift_sum.appendChild(gift_sum_title);

			var gift_sum_value = document.createElement('p');
			gift_sum_value.className = "cartpage_gift_sum_value";
			gift_sum_value.textContent = count*price+" р.";
			gift_sum.appendChild(gift_sum_value);

				
			appendObject.appendChild(wrapper_block);

		});

		var cartpage_all = document.createElement('div');
		cartpage_all.className = "cartpage_all";
		appendObject.appendChild(cartpage_all);
		
		var cartpage_all_title = document.createElement('div');
		cartpage_all_title.className="cartpage_all_title";
		cartpage_all_title.textContent = "Итого: ";
		cartpage_all.appendChild(cartpage_all_title);

		cartpage_all_value = document.createElement('div');
		cartpage_all_value.className = "cartpage_all_value";
		cartpage_all_value.textContent=amount+" р";
		cartpage_all.appendChild(cartpage_all_value);


			var button_up = document.getElementsByClassName('cartpage_gift_howmuch_button_up');
			var button_down = document.getElementsByClassName('cartpage_gift_howmuch_button_down');

			for(i=0; i<button_up.length; i++){

				button_up.item(i).addEventListener('click', button_up_func);
				button_down.item(i).addEventListener('click', button_down_func);
			}


				/// обновление данных в иконке корзины разом

				var cart_count_cookie = function() {

					var cart_count_cookie = 0;
					var json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);

					Object.keys(json_obj_cookie['cart-count']).forEach(function(item, i, arr) {
						cart_count_cookie+=json_obj_cookie['cart-count'][item];
					});

					return cart_count_cookie;
				}

				var cart_amount_func = function() {

					var json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);
					var cart_amount = document.getElementsByClassName('cart_description_gift_amount').item(0);

					var cart_sum = 0;
					var xml_price;
					Object.keys(json_obj_cookie['cart-count']).forEach(function(item, i, arr) {
						xml_price = parseInt(xmlDoc.getElementsByTagName('gift').item(parseInt(item)-1).childNodes[4].textContent);
						cart_sum+=xml_price*parseInt(json_obj_cookie['cart-count'][item]);
					});

					cart_amount.textContent = "На сумму "+cart_sum;
				}


				var reload_cart_icon = function() {
					document.getElementsByClassName('cart_count').item(0).textContent = cart_count_cookie();
					document.getElementsByClassName('cart_description_gift_count').item(0).textContent = "Товаров "+cart_count_cookie();
					cart_amount_func();
				}


			function button_up_func() {
				var current_price = parseInt(this.parentNode.nextSibling.childNodes[1].textContent)/parseInt(this.parentNode.getElementsByClassName('cartpage_gift_howmuch_value').item(0).value);
				var value = parseInt(this.parentNode.getElementsByClassName('cartpage_gift_howmuch_value').item(0).value);
				this.parentNode.nextSibling.childNodes[1].textContent=current_price*(value+1)+" р.";
				value++;
				this.parentNode.getElementsByClassName('cartpage_gift_howmuch_value').item(0).value=value;
				amount+=current_price;
				cartpage_all_value.textContent=amount+" р.";


				json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);
				var current_id = parseInt(this.parentNode.childNodes[0].getAttribute('data-id'));
				var current_count = json_obj_cookie['cart-count'][current_id];
				json_obj_cookie['cart-count'][current_id]++;

				document.cookie = encodeURIComponent(decodeURIComponent(document.cookie).replace(/{.*}/g, JSON.stringify(json_obj_cookie)))
				
				reload_cart_icon();
			}

			function button_down_func() {
				var current_price = parseInt(this.parentNode.nextSibling.childNodes[1].textContent)/parseInt(this.parentNode.getElementsByClassName('cartpage_gift_howmuch_value').item(0).value);
				var value = parseInt(this.parentNode.getElementsByClassName('cartpage_gift_howmuch_value').item(0).value);
				if(value-1==0){
					value=1;
				}
					else {
						value--;
						amount-=current_price;

						json_obj_cookie = JSON.parse(decodeURIComponent(document.cookie).match(/{.*}/g)[0]);
						var current_id = parseInt(this.parentNode.	childNodes[0].getAttribute('data-id'));
						var current_count = json_obj_cookie['cart-count'][current_id];
						json_obj_cookie['cart-count'][current_id]--;

						document.cookie = encodeURIComponent(decodeURIComponent(document.cookie).replace(/{.*}/g, JSON.stringify(json_obj_cookie)))
				
						reload_cart_icon();

						cartpage_all_value.textContent=amount+" р.";
				
						this.parentNode.nextSibling.childNodes[1].textContent=current_price*(value)+" р.";
						this.parentNode.getElementsByClassName('cartpage_gift_howmuch_value').item(0).value=value;
				

				}

			}



	}
