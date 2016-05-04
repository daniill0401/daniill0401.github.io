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

	//addEventListener('load', cart_build);



