	(function() {

		///////////////////////////////////////////////////////////////////////
		// Первый скролл(объект) и его свойства-методы
		///////////////////////////////////////////////////////////////////////

		var first = {

			paralax_rele: true,
			arrow: {},

			mouse_move_toggle: function(b){

				if(b){
					addEventListener('mousemove', first.mouse_move_function);
				}
				else {
					removeEventListener('mousemove', first.mouse_move_function);
					first.cart1.style.transition="";
					first.cart2.style.transition= "";
				}
			},

			mouse_move_function: function(e){

				var percentFirstRight = (e.pageX-offsetLeftFirst1Cart)/rightFirst1Offset; 
				var percentSecondRight = (e.pageX-offsetLeftFirst1Cart)/rightFirst1Offset; 

				var percentFirstTop = (e.pageY-offsetTopFirst1Cart)/topFirst1Offset;
				var percentSecondTop = (e.pageY-offsetTopFirst2Cart)/topFirst2Offset;

				function move_carts(){
				
						first.cart1.style.left = first.cartLeft1+(percentFirstRight*80)+"px";
						first.cart2.style.left = first.cartLeft2+(percentSecondRight*40)+"px";

						first.cart1.style.top = first.cartTop1-(percentFirstTop*30)+"px";
						first.cart2.style.top = first.cartTop2+(percentSecondTop*30)+"px";
					}

				if(first.paralax_rele && current===0){
				
					first.cart1.style.transition = "all linear .2s";
					first.cart2.style.transition = "all linear .2s";
					first.paralax_rele=false;

				setTimeout(function(){

					move_carts.call(first);

				}, 20);

					setTimeout(function(){
							first.cart1.style.transition = "all linear .0s";
							first.cart2.style.transition = "all linear .0s";
						}, 250);
			}

				else {

					move_carts.call(first);

				}
			},
			animated: function(prev){

				first.reload(prev);

				setTimeout(function(){

				switch(prev){

					case 1:
					case 3:
							first.wrapper.style.top = "0px";

							first.cart1.style.top = "20px";
							first.cart1.style.opacity = ".8";

							first.logo.style.marginLeft = "0px";
							first.logo.style.opacity = "1";
							first.contacts.style.marginRight = "0px";
							first.contacts.style.opacity = '1';

								//  ЗАПУСКАЮ ПОЯВЛЕНИЕ СТРЕЛКИ

					case 2: 
					case 4:
					case 5: 
							setTimeout(function() {

								first.arrow.container.className = first.arrow.container.className+' animated';

									setTimeout(function() {
										first.mouse_move_toggle(1);
												
										}, 300);

										first.wrapper_main.style.opacity = "1";	
										first.cart2.style.left = "50px";
										first.cart2.style.opacity = "1";

								}, 50);

							prev==2 && (first.wrapper.style.left = "0");
							prev==4 && (function(){
										first.wrapper.style.top = "0px";
											first.wrapper.style.zIndex = "40";
											setTimeout(function(){
												first.wrapper.style.zIndex = "";
											}, 600);
										}());							
							break;
						}

					}, 20);

			},
			clear: function(next){

				first.mouse_move_toggle(0);
				common.disp_time.apply(this);

				switch(next){

					case 1: 
					case 3: 
							// ПРЯЧУ ПЕРВУЮ КАРТУ

							setTimeout(function() {
								//  ПРЯЧУ ВТОРУЮ КАРТУ
								first.wrapper_main.style.opacity = "0";
								first.cart1.style.cssText="top: 500px; opacity: 0;";
								first.cart2.style.cssText="left: -500px; opacity: 0;";

							}, 50);

							// ПРЯЧУ ЛЕВЫЙ ЛОГОТИП

							first.logo.style.marginLeft = "-400px";
							first.logo.style.opacity = "0";

							//  ПРЯЧУ ТЕЛЕФОНЫ И АДРЕС

							first.contacts.style.marginRight = "-500px";
							first.contacts.style.opacity = '0';

							setTimeout(function(){

								first.arrow.container.className = first.arrow.container.className.replace(" animated", "");
							
							}, 250);
							break;

					case 2: 
							 setTimeout(function(){
								first.wrapper.style.left = "-100%";
							}, 20);
							break;
					case 4: 
							first.wrapper.style.top = "-100%";
							break;
				}
			},

			reload: function(prev){

					first.wrapper.className = first.wrapper.className + " transition_zero";
					first.paralax_rele = true;
					this.wrapper.style.display = "block";
					first.wrapper.style.top = "0px";

				switch(prev){

					case 1:
							first.cart1.style.cssText="top: 500px; opacity: 0;";
							first.cart2.style.cssText="left: -500px; opacity: 0;";
							first.logo.style.cssText="margin-left: -400px; opacity: 0;";
							first.contacts.style.cssText="margin-right: -500px; opacity: 0;";

							first.wrapper.style.left = "0";
							first.wrapper_main.style.opacity = "0";
							first.cart1.style.transition ="";
							first.cart2.style.transition= "";

							first.arrow.container.className = first.arrow.container.className.replace(" animated", "");
							
							break;

					case 2: 
							first.wrapper.style.left = "-100%";
							first.cart1.style.top = "20px";
							first.cart1.style.opacity = ".8";

							first.logo.style.marginLeft = "0";
							first.logo.style.opacity = "1";
							first.contacts.style.marginRight = "0";
							first.contacts.style.opacity = '1';

							first.wrapper_main.style.opacity = "1";	
									
							first.cart2.style.left = "50px";
							first.cart2.style.opacity = "1";

							first.arrow.container.className = first.arrow.container.className.replace(" animated", "");
							
							break;
					case 4:
							first.wrapper.style.top = "-100%";
					case 5:
							first.wrapper.style.left = "0";
							first.cart1.style.top = "20px";
							first.cart1.style.opacity = ".8";

							first.logo.style.marginLeft = "";
							first.logo.style.opacity = "1";
							first.contacts.style.marginRight = "0";
							first.contacts.style.opacity = '1';

							first.wrapper_main.style.opacity = "1";	
									
							first.cart2.style.left = "50px";
							first.cart2.style.opacity = "1";

							first.arrow.container.className = first.arrow.container.className.replace(" animated", "");
							
							break;

					}

					setTimeout(function(){
						first.wrapper.className = first.wrapper.className.replace(/ transition_zero/g, "");
					}, 20)
			}

		};

		///////////////////////////////////////////////////////////////
			/////// Второй скролл(объект) и его свойства-методы////
		///////////////////////////////////////////////////////////////////////

		var second = {

			cart: {},

			animated: function(prev){

				this.reload(prev);

				setTimeout(function(){

				switch(prev){

					case 0:
							second.cart.wrapper.style.top = "150px";

							second.logo.style.marginLeft = "0px";
							second.logo.style.opacity = "1";
							second.title.style.marginTop = "0px";
							second.cart.title.style.margin = "10px 0 0 0";


							setTimeout(function() {

								second.footer_wrapper.style.margin ="0px";

								/// ПОЯВЛЯЕТСЯ КАРТА

								second.cart.wrapper.style.transform = "scale3d(.8, 1, 1)";
								for(n=0; n<second.cart.divs.length; n++){

									second.cart.divs[n].className =second.cart.divs[n].className + " class_transform_zero";

								}


								// появляется фон и иконки
									
									setTimeout(function(){

											second.cart.over1.style.transition = "opacity ease-in-out .4s";
											second.cart.over6.style.transition = "opacity ease-in-out .4s";
											second.cart.over.style.transition = "opacity ease-in-out .2s";

											second.cart.over1.style.opacity = ".5";
											second.cart.over6.style.opacity = ".5";
											second.cart.over.style.opacity = "1";

											for(n=0; n<second.over_icons.length; n++){

														second.over_icons[n].style.opacity = "1";

													}


									}, 350);


									second.footer_wrapper.style.marginBottom ="0px";

									setTimeout(function(){
										second.wrapper.style.background = "";
									},100);

							}, 150);
							break;

						case 2:
						case 4:
								second.wrapper.style.marginLeft = "0";
								break;

					}

				}, 20);

			},

			clear: function(next){

				common.disp_time.apply(this);

				switch(next){

					case 0: 	setTimeout(function(){
									second.wrapper.style.background = "rgba(0,0,0,0)";
								}, 100);

								this.cart.over.style.opacity = "0";
								this.cart.over1.style.opacity = "0";
								this.cart.over6.style.opacity = "0";

								this.cart.title.style.margin = "10px 0 0 -2500px";
								
								second.logo.style.opacity = "0";
								second.logo.style.marginLeft = "-100%";
								this.title.style.marginTop = "-100px";

								this.cart.wrapper.style.transform = "scale3d(.9, 1, 1)";
									/// СКЛАДЫВАЮ КАРТУ

								for(n=0; n<this.cart.divs.length; n++){
									this.cart.divs[n].className =this.cart.divs[n].className.replace(/ class_transform_zero/g, "");
								}

								setTimeout(function(){
									second.cart.wrapper.style.transition = "top linear .4s";
									second.cart.wrapper.style.top = "700px";
									second.footer_wrapper.style.marginBottom = "-100px";
								}, 220);

								break;

					case 2: 	
					case 4:
								setTimeout(function(){
									second.wrapper.style.marginLeft = "-100%";
								}, 20);
								break;
				}

			},

			reload: function(prev){

					second.wrapper.className = second.wrapper.className+" transition_zero";
				this.wrapper.style.display = "block";

				switch(prev){

					case 0: 
							second.wrapper.style.marginLeft = "0";
							second.cart.wrapper.style.transition = "top linear .3s";
							second.wrapper.style.background = "none";
							///////////////////////
							second.cart.wrapper.style.top = "";

							second.logo.style.marginLeft = "";
							second.logo.style.opacity = "";
							second.title.style.marginTop = "";
							second.cart.title.style.margin = "";

								second.footer_wrapper.style.margin ="";
								second.cart.wrapper.style.transform = "";

								for(n=0; n<second.cart.divs.length; n++){
									second.cart.divs[n].className =second.cart.divs[n].className.replace(/ class_transform_zero/g, "");
								}

							second.cart.over1.style.transition = "";
							second.cart.over6.style.transition = "";
							second.cart.over.style.transition = "";

							second.cart.over1.style.opacity = "";
							second.cart.over6.style.opacity = "";
							second.cart.over.style.opacity = "";
							for(n=0; n<second.over_icons.length; n++){
								second.over_icons[n].style.opacity = "";
									}
							second.footer_wrapper.style.marginBottom ="";
							break;

					case 2:
					case 4: 
							var n;

							second.wrapper.style.marginLeft = "-100%";

					case 3: prev==3 && (second.wrapper.style.marginLeft = "0px");
							second.wrapper.style.background = "rgb(241,241,241)";
							second.cart.wrapper.style.top = "150px";
							
							second.logo.style.marginLeft = "0px"
							second.title.style.marginTop = "0px";
							second.cart.title.style.margin = "10px 0 0 0";
							second.footer_wrapper.style.marginBottom = "0px";

								for(n=second.cart.divs.length; n;){
									second.cart.divs[--n].className =second.cart.divs[n].className + " class_transform_zero";
								}

								second.cart.wrapper.style.transform = "scale3d(.8, 1, 1)";
								second.cart.over1.style.opacity = ".5";
								second.cart.over6.style.opacity = ".5";
								second.cart.over.style.opacity = "1";

								for(n=second.over_icons.length; n;){
									second.over_icons[--n].style.opacity = "1";
								}


							break;

					case 5: break;
				}

				setTimeout(function(){
					second.wrapper.className = second.wrapper.className.replace(/ transition_zero/g, "");
				}, 20);
			}
		};


		///////////////////////////////////////////////////////////////////////
		// Третий скролл(объект) и его свойства-методы
		///////////////////////////////////////////////////////////////////////

		var third = {

			animated: function(prev){

				this.reload(prev);

				setTimeout(function(){

				switch(prev){
					case 0:
					case 4:
					case 1: third.wrapper.style.right = "0";
							break;

					case 2: break;
					case 3: break;
					case 4: break;
					case 5: break;
					}

				}, 20)

			
			},
			clear: function(next){

				common.disp_time.apply(this);
				this.polzunok_reload();

				switch(next){

					case 0: 	
								setTimeout(function(){
									third.wrapper.style.right = "-100%";
								}, 20);
								break;

					case 1:		setTimeout(function(){
									third.wrapper.style.right= "-100%";
								}, 20)
								this.polzunok_reload();
								break;

					case 3: 	
								break;
					case 4: 	third.wrapper.style.right = "100%";
								break;
						
				}
			},

			polzunok_reload: function (){

				setTimeout(function(){

						third.our.big.style.width = "640px";
						third.our.style.width = "640px";

					}, 400);
			},

			drag: function(e){

				e.preventDefault();
				addEventListener('mousemove', third.move);
			 	addEventListener('mouseup', third.drop);
			 },

			 drop: function(){

			 	removeEventListener('mousemove', third.move);
				removeEventListener('mouseup', third.drop);
			 },

			 move: function(e){

				var width = (document.documentElement.clientWidth-e.pageX-88)+"px";
				third.our.big.style.width = width;
				third.our.style.width = width;
			},

			reload: function(prev){
				
				third.wrapper.className = third.wrapper.className+" transition_zero";
				this.wrapper.style.display = "block";
				
				switch(prev){

					case 0:
					case 1:
					case 4:
						third.wrapper.style.right= "-100%";
						break;

					case 3:
					case 5:
						third.wrapper.style.right = "0px";
						break;
				}
			

				setTimeout(function(){
					third.wrapper.className = third.wrapper.className.replace(/ transition_zero/g, "");
				}, 20);
			}

		};

		///////////////////////////////////////////////////////////////////////
		// Четвертый скролл(объект) и его свойства-методы
		///////////////////////////////////////////////////////////////////////

		var forth = {

			animated: function(prev){

				this.reload(prev);

				setTimeout(function(){

				switch(prev){

					case 4: forth.wrapper.style.left = "0";
					case 0: 
					case 1:
					case 5:
					case 2:  		// фон
							forth.wrapper.style.top = "0px";
							setTimeout(function(){
							// заголовки

							forth.title.style.top = "10px";
							forth.title.style.opacity = "1";
							forth.desc.style.opacity = "1";
							forth.desc.style.top = "80px";

							// карты

							setTimeout(function(){
								forth.first_cart.style.left="0";
								forth.first_cart.style.opacity="1";
								forth.second_cart.style.right="0";
								forth.second_cart.style.opacity="1";

								// фон карт

								setTimeout(function(){
									forth.first_fon.style.opacity="1";
									forth.second_fon.style.opacity="1";

									// текст стрелок

									setTimeout(function(){	
										forth.left_desc.style.opacity = "1";
										forth.right_desc.style.opacity = "1";

										// стрелки
										setTimeout(function(){

											for(n=0; n<forth.arrow.length; n++){

												forth.arrow[n].style.width = "85px";

											}

											// лист тарифов

												forth.list.style.bottom = "20px";

											}, 100);// стрелки

										}, 200);// текст стрелок

									}, 230);// фон карт

								}, 100);// карты
							
							}, 350);// заголовки
							break;
					}

				}, 20);
			},

			clear: function(next){

				common.disp_time.apply(this);

				switch(next){


					case 0:
					case 1:
					case 2:
							forth.title.style.top = "-100px";
							forth.title.style.opacity = "0";
							forth.desc.style.top = "-30px";
							forth.desc.style.opacity = "0";

						setTimeout(function(){

							forth.wrapper.style.top = "100%";
							
							}, 200);

							forth.first_fon.style.opacity = "0";
							forth.second_fon.style.opacity = "0";


						for(n=0; n<forth.arrow.length; n++){

							forth.arrow[n].style.width = "0px";

						}

							forth.list.style.bottom = "-160px";
							forth.left_desc.style.opacity = "0";
							forth.right_desc.style.opacity = "0";
				
							forth.first_cart.style.left="-550px";
							forth.second_cart.style.right="-560px";
							break;
						
					case 4: forth.wrapper.style.left = "-100%";
							break;

				}
			},
			reload: function(prev){

				forth.wrapper.className = forth.wrapper.className + " transition_zero";
				this.wrapper.style.display = "block";
				
				switch(prev){


					case 1:
					case 0:
					case 2:
					case 5:
						forth.wrapper.style.left = "0";
						forth.wrapper.style.top = "-100%";
						prev==5 && (function(){forth.wrapper.style.top = "0px"; alert();});	
					case 4:
						prev==4 && (forth.wrapper.style.left = "-100%");
						forth.title.style.top = "-100px";
						forth.title.style.opacity = "0";

						forth.desc.style.top = "-30px";
						forth.desc.style.opacity = "0";

						forth.first_fon.style.opacity = "0";
						forth.second_fon.style.opacity = "0";

						forth.list.style.bottom = "-160px";

						forth.left_desc.style.opacity = "0";

						forth.right_desc.style.opacity = "0";

						forth.first_cart.style.left="-550px";
						forth.first_cart.style.opacity="0";

						forth.second_cart.style.right="-560px";
						forth.second_cart.style.opacity="0";

							for(var n=forth.arrow.length; n;){
								forth.arrow[--n].style.width = "0px";
							}
						break;


				}
					setTimeout(function(){
						forth.wrapper.className = forth.wrapper.className.replace(/ transition_zero/g, "");
					}, 20);


			}
		};

		///////////////////////////////////////////////////////////////////////
		// Пятый скролл(объект) и его свойства-методы
		///////////////////////////////////////////////////////////////////////

		var fifth = {

			animated: function(prev){

				this.reload(prev);

				switch(prev){
					case 3: 
					case 5:
						fifth.wrapper.style.zIndex = "30";
					case 0:
					case 1:
					case 2:

						setTimeout(function(){

							var ind = 0;

							setTimeout(function(){

				 				fifth.footer.style.bottom = "-1px";
 								fifth.youtube.style.right = "120px";

					 			setTimeout(function(){

		 							fifth.village.style.backgroundPosition = "0 0";

		 							setTimeout(function(){

		 								fifth.cuker.style.backgroundPosition = "0 0";

		 							}, 390);

		 						}, 150);

				 			}, 100);
									
					 	var fifth_partners_int =  setInterval(function(){

					 		if(ind<fifth.partners_cell.length){

					 			fifth.partners_cell[ind].style.opacity = "1";
					 			fifth.partners_cell[ind].style.top = "0";
					 			ind++;
					 		}
					 		else {

					 			clearInterval(fifth_partners_int);
					 			ind = 0;

					 			var toggle_int = setInterval(function(){

					 					if(ind<fifth.partners_toggle.length){

					 						fifth.partners_toggle[ind].style.opacity = "1";
					 						ind++;
					 					}
					 					else {
					 						clearInterval(toggle_int);
					 					}
					 				}, 100);

						 			}

						 		}, 100);

							}, 200);
									break;

				}
			},
			clear: function(next){

				common.disp_time.apply(this);

				switch(next){

					case 1:
					case 2:
						fifth.wrapper.style.zIndex = "-1";
						setTimeout(function(){
							fifth.wrapper.style.zIndex = "";
						}, 600);

					default: 
					setTimeout(function(){
						fifth.wrapper.style.display = "none";
					}, 600);
				}
			},
			reload: function(prev){

				fifth.wrapper.className = fifth.wrapper.className+ " transition_zero";
				this.wrapper.style.display = "block";
				
				switch(prev){

					default:

					var n;

					fifth.wrapper.style.zIndex = "-1";
					fifth.wrapper.style.display = "block";

						fifth.footer.style.bottom = "-140px";
						fifth.youtube.style.right = "-450px";

					for(n=fifth.partners_cell.length; n;){

						fifth.partners_cell[--n].style.opacity = "0";
						fifth.partners_cell[n].style.top = "100px";
					}

					fifth.village.style.backgroundPosition = "0 100px";
					fifth.cuker.style.backgroundPosition = "0 40px";

					for(n=fifth.partners_toggle.length; n;){
						fifth.partners_toggle[--n].className = fifth.partners_toggle[n].className.replace(" fifth_partners_toggle-active", "");
						fifth.partners_toggle[n].style.opacity = "0";
					}

					fifth.partners_toggle[0].className = fifth.partners_toggle[0].className+" fifth_partners_toggle-active"	;

					fifth.partners_wrapper_fill.item(0).style.left="0px";
					fifth.partners_wrapper_fill.item(1).style.left="500px";
					fifth.partners_wrapper_fill.item(2).style.left="500px";

				}

				setTimeout(function(){
						fifth.wrapper.className = fifth.wrapper.className.replace(/ transition_zero/g, "");
					}, 20)

				setTimeout(function(){
					fifth.wrapper.style.zIndex = "";
				}, 700);

			},
			partners_func:function(){
				var prevBlock = parseInt(this.innerHTML);

				for(n=0; n<fifth.partners_toggle.length; n++){
					fifth.partners_toggle[n].className = fifth.partners_toggle[n].className.replace(" fifth_partners_toggle-active", "");
				}

				fifth.partners_toggle[prevBlock-1].className = fifth.partners_toggle[prevBlock-1].className+" fifth_partners_toggle-active"	;

				switch(prevBlock){

					case 1: 
							if(fifth.active_toggle===3){

								fifth.partners_wrapper_fill.item(0).style.left="0px";
								fifth.partners_wrapper_fill.item(2).style.left="500px";

								fifth.partners_wrapper_fill.item(1).style.transition="left .0s";

									setTimeout(function(){

										fifth.partners_wrapper_fill.item(1).style.left="500px";

										setTimeout(function(){

											fifth.partners_wrapper_fill.item(1).style.transition="left ease-in-out .6s";
										}, 20);

									}, 20);
							}
							else {

								fifth.partners_wrapper_fill.item(0).style.left="0px";
								fifth.partners_wrapper_fill.item(1).style.left="500px";
								fifth.partners_wrapper_fill.item(2).style.left="500px";

							}
							fifth.active_toggle=1;

							break;

					case 2: 
							fifth.partners_wrapper_fill.item(0).style.left="-500px";
							fifth.partners_wrapper_fill.item(2).style.left="500px";
							fifth.partners_wrapper_fill.item(1).style.left="0px";
							fifth.active_toggle=2;
							break;

					case 3: 
							if(fifth.active_toggle===1){

							fifth.partners_wrapper_fill.item(0).style.left="-500px";
							fifth.partners_wrapper_fill.item(2).style.left="0px";

							fifth.partners_wrapper_fill.item(1).style.transition="left .0s";

								setTimeout(function(){

									fifth.partners_wrapper_fill.item(1).style.left="-500px";

									setTimeout(function(){

											fifth.partners_wrapper_fill.item(1).style.transition="left ease-in-out .6s";
										}, 20);

									}, 20);

							}

							else {

								fifth.partners_wrapper_fill.item(0).style.left="-500px";
								fifth.partners_wrapper_fill.item(1).style.left="-500px";
								fifth.partners_wrapper_fill.item(2).style.left="0px";

							}
							fifth.active_toggle=3;
							break;
				}
			},
			active_toggle: 1
		};

		///////////////////////////////////////////////////////////////////////
		// Шестой скролл(объект) и его свойства-методы
		///////////////////////////////////////////////////////////////////////

		var sixth = {
			animated: function(prev){
				this.reload(prev);

				setTimeout(function(){

					switch(prev){

						case 0:
						case 1:
						case 2:
						case 3:
						case 4:  sixth.wrapper.style.zIndex = "150";
								var i =0;
								sixth.wrapper.style.top = "0px";

								setTimeout(function(){

									sixth.title.style.opacity = "1";
									sixth.manager.answer.style.opacity = "1";
									sixth.manager.question.style.opacity = "1";

									sixth.manager.style.bottom = "-2px";
									sixth.manager.question.style.right = "110px";
									sixth.manager.question.style.top = "100px";
									sixth.manager.answer.style.top = "280px";
									sixth.manager.answer.style.right = "150px";
									sixth.title.style.marginTop = "10px";

								}, 400)
								var intBlocks = setInterval(function(){
									
									if(i<sixth.blocks.length){
										sixth.blocks[i].style.left = "0";
										i++;
										}
										else {
											clearInterval(intBlocks);
										}

								}, 200);

								setTimeout(function(){
									sixth.wrapper.style.zIndex = "";
								}, 650);
								break;
						}
					}, 20);
			},
			clear: function(next){

				common.disp_time.apply(this);

				switch(next){

					default:
					sixth.wrapper.style.zIndex = "150";
						sixth.wrapper.style.top = "100%";
						setTimeout(function(){
							sixth.wrapper.style.zIndex = "";
						}, 600);
				}
			},
			reload: function(prev){

				sixth.wrapper.className = sixth.wrapper.className +" transition_zero";
				this.wrapper.style.display = "block";
				
				switch(prev){

					case prev>=0:
					default:

					sixth.wrapper.style.top = "100%";

					sixth.title.style.opacity = "0";
					sixth.manager.answer.style.opacity = "0";
					sixth.manager.question.style.opacity = "0";

					sixth.manager.style.bottom = "-426px";
					sixth.manager.question.style.right = "-200px";
					sixth.manager.question.style.top = "-130px";
					sixth.manager.answer.style.top = "20px";
					sixth.manager.answer.style.right = "-200px";
					sixth.title.style.marginTop = "-100px";

						sixth.wrapper.style.transition = "top ease-in-out .5s";
						sixth.manager.style.transition = "bottom linear .35s";
						sixth.manager.question.style.transition = "top ease-in-out .5s, right ease-in-out .5s";
						sixth.manager.answer.style.transition = "top ease-in-out .5s, right ease-in-out .5s";
						sixth.title.style.transition = "margin ease-in-out .3s";

				var f = 0;

				var clearBlocks = setInterval(function(){

					if(f!=0){

						sixth.blocks[f-1].style.left = "-900px";

					}
					
					if(f<sixth.blocks.length){

						sixth.blocks[f].style.transition = "left 0s";
						f++;
						
						}

						else {
							sixth.blocks[f-1].style.left = "-900px";
							clearInterval(clearBlocks);


							for(n=0; n<sixth.blocks.length; n++){
								sixth.blocks[n].style.transition = "left ease-in-out .7s";
							}

						}

				}, 20);

				}

				setTimeout(function(){
						sixth.wrapper.className = sixth.wrapper.className.replace(/ transition_zero/g, "");
					}, 20)

			},

			questions_click: function(){
				function turnOn(obj){

				obj.parentNode.getElementsByClassName('sixth_questions-answer').item(0).style.height = "50px";
				obj.parentNode.getElementsByClassName('sixth_questions-answer').item(0).style.paddingTop = "13px";

				for(n=0;n<sixth.answers.length; n++){
							sixth.answers[n].parentNode.getElementsByClassName('sixth_questions-cross').item(0).style.opacity = "1";
							sixth.answers[n].parentNode.getElementsByClassName('sixth_questions-triangle').item(0).style.opacity = "0";
							sixth.answers[n].parentNode.getElementsByClassName('sixth_questions-title').item(0).style.background = "";
							sixth.answers[n].parentNode.getElementsByClassName('sixth_questions-title').item(0).style.color = "";
						}

					obj.parentNode.getElementsByClassName('sixth_questions-cross').item(0).style.opacity = "0";
					obj.parentNode.getElementsByClassName('sixth_questions-triangle').item(0).style.opacity = "1";
					obj.style.background = "rgba(0,0,200,.5)";	
					obj.style.color = "rgba(255,255,255,1)";	
				}


				function turnOff(obj){

					for(n=0;n<sixth.answers.length; n++){
							sixth.answers[n].style.height = "0";
							sixth.answers[n].style.paddingTop = "0";
						}

					obj.parentNode.getElementsByClassName('sixth_questions-cross').item(0).style.opacity = "1";
					obj.parentNode.getElementsByClassName('sixth_questions-triangle').item(0).style.opacity = "0";
					obj.style.background = "";	
					obj.style.color = "";	
				

				}

				turnOff(this);

				if(this.getAttribute('data-number')!==current_answer){
						turnOn(this);
						toggle_answer=false;
				}

				else {
					if(toggle_answer){

						turnOn(this);
						toggle_answer=false;
					}

					else {
						toggle_answer=true;
					}
				}

				current_answer = this.getAttribute('data-number');
			},
			manager: {}
		};

		///////////////////////////////////////////////////////////////////////
		// Объект Меню и его свойства-методы
		///////////////////////////////////////////////////////////////////////

		var menu = {

			array: ['first', 'second', 'third', 'forth', 'fifth', 'sixth'],
			blocks_over: function(){

				var current = parseInt(this.className.match(/\d+/g))-1;
				var currentText = menu.array[current]+" scroll";

				this.style.transition = "transform ease-in-out .2s, width .15s ease-in-out .2s";
				this.style.transform = "rotate(0deg)";
				this.style.width = "8em";

				setTimeout(function(){
					var intIndex = 0;
					var intText = setInterval(function(){

						if(intIndex<=currentText.length  && menu.blocks.item(current).style.transform == "rotate(0deg)" && menu.blocks.item(current).style.width == "8em"){
							menu.blocks[current].innerHTML = currentText.substr(0, intIndex);
							intIndex++;
						}
						else {
							clearInterval(intText);
						}
					}, 20);
				}, 330);
			},

			blocks_out: function() {
				this.innerHTML = "";
				this.style.transition = "transform .2s ease-in-out .15s, width .15s ease-in-out";
				this.style.width = "1.5em";
				this.style.transform = "rotate(45deg)";
			},

			blocks_click: function(){

				var next = parseInt(this.className.match(/\d+/g))-1;
				common.scroll_trucky();

				switch(current){  // откуда
					case 0: 
							switch(next){  // куда

								case 1: 
									setTimeout(function(){
										second.animated(0);
									}, 50)
									first.clear(1);
									break;

								case 2: 
									first.clear(2);
									third.animated(0);
									break;

								case 3: 
									first.clear(3);
									setTimeout(function(){
										forth.animated(0);
									}, 120);
									break;

								case 4: 
									fifth.animated(0);
									first.clear(4);
									break;

								case 5:
									sixth.animated(0);
									first.clear(5);
									break;
							}
							break;
					case 1: 
							switch(next){
								case 0:	
									first.animated(1);
									second.clear(0);
									break;

								case 2: 
									second.clear(2);
									third.animated(1);
									break;

								case 3:
									forth.animated(1);
									second.clear(3);
									break;

								case 4: 
									fifth.animated(1);
									second.clear(4);
									break;


								case 5:
									sixth.animated(1);
									second.clear(5);
									break;

							}
							break;
					case 2: 
							switch(next){
								case 0:
									third.clear(0);
									first.animated(2);
									break;

								case 1: 
									second.animated(2);
									third.clear(1);
									break;

								case 3: 
									forth.animated(2);
									third.clear(3);
									break;

								case 4:
									fifth.animated(2);
									third.clear(4);
									break;

								case 5:
									sixth.animated(2);
									third.clear(5);
									break;
							}
							break;
					case 3: 
							switch(next){
								case 0:
									forth.clear(0);
									setTimeout(function(){
										first.animated(3);
									}, 200);
									break;

								case 1:
									forth.clear(1);
									second.animated(3);
									break;

								case 2: 
									third.animated(3);
									forth.clear(2);
									break;

								case 4: 
									forth.clear(4);
									fifth.animated(3);
									break;

								case 5:
									sixth.animated(3);
									forth.clear(5);
									break;
							}
							break;
					case 4: 
							switch(next){
								case 0: 
									first.animated(4);
									fifth.clear(0);
									break;

								case 1:
									second.animated(4);
									fifth.clear(1);
									break;

								case 2:
									third.animated(4);
									fifth.clear(2);
									break;

								case 3:
									forth.animated(4);
									fifth.clear(3);
									break;

								case 5: 
									sixth.animated(4);
									fifth.clear(5);
									break;
							}
							break;
					case 5: 
							switch(next){
								case 0: 
									sixth.clear(0);
									first.animated(5);
									break;

								case 1:
									sixth.clear(1);
									second.animated(5);
									break;

								case 2: 
									sixth.clear(2);
									third.animated(5);
									break;

								case 3:
									forth.animated(5);
									setTimeout(function(){
										sixth.clear(3);
									}, 20)
									break;

								case 4:
									fifth.animated(5);
									sixth.clear(4);
									break;
							}
							break;
				}


				current = next;
			}

		};

		///////////////////////////////////////////////////////////////////////
		// Общий объект и его свойства-методы
		///////////////////////////////////////////////////////////////////////

		var common = {
			first_class_element: function(classname){
				return document.getElementsByClassName(classname).item(0);
			},
			margin_zero: function(obj, duration){
				obj.style.display = "block";
				if(!obj.style.transition)
					obj.style.transition = "margin ease-in-out "+duration;
				else
					obj.style.transition =obj.style.transition+ " ,margin ease-in-out "+duration;

				obj.style.margin = "0";
			},
			scroll_trucky: function(){

				var prev = current;
				
				setTimeout(function(){

					eval(menu.array[prev]+".wrapper.className="+menu.array[prev]+".wrapper.className.replace(' current_z-index', '');");

					setTimeout(function(){

						eval(menu.array[current]+".wrapper.className="+menu.array[current]+".wrapper.className+' current_z-index';");

					}, 200);

				}, 300);

				/// ОТКЛЮЧАЮ ПРОСЛУШКУ СОБЫТИЙ НА ВРЕМЯ СБОРКИ СКРОЛЛА

				removeEventListener('keypress', keyFunc);
				removeEventListener('wheel', wheelListen);

				for(n=0;n<menu.blocks.length; n++){
					menu.blocks[n].removeEventListener('click', menu.blocks_click);
		 		}

				// включаю заглушку
				
				addEventListener('keypress', keyNull);
				addEventListener('wheel', keyNull);

				// ВОЗВРАЩАЮ ПРОСЛУШКУ

					setTimeout(function(){

						removeEventListener('keypress', keyNull);
						removeEventListener('wheel', keyNull);			

						addEventListener('keypress', keyFunc);
						addEventListener('wheel', wheelListen);

						for(n=0;n<menu.blocks.length; n++){
							menu.blocks[n].addEventListener('click', menu.blocks_click);
		 				}
					}, 700);
			},
			disp_time: function(){
				var $this = this;
				setTimeout(function(){
					$this.wrapper.style.display = "none";
				}, 650);
			}
		};

		////////////////////////////////////////////////////////////////////////////

		var wheelListen = function(e) {

			e.preventDefault;
			common.scroll_trucky();
			
			switch(e.deltaY){

				case 3: 

					switch(current){

						case 0:   /// 	С 1 НА 2
							first.clear(1);
								setTimeout(function(){
									second.animated(0);
								}, 50);
							break;

						case 1:   // СО 2 НА 3
							second.clear(2);
							third.animated(1);
							break;
							 
						case 2: //  С 3 НА 4
							forth.animated(2);
							third.clear(3);
							break;
						case 3: // С 4 НА 5
							forth.clear(4);
							fifth.animated(3);
							break;
							
						case 4: //  С 5 НА 6
							sixth.animated(4);
							fifth.clear(5);
							break;
							
						}
								
						if(current<5){
							++current;
							}
						break;

								///////////////////////////////////////////////////////

				case -3: 
						switch(current){

							case 1:  //  С 2 НА 1
									setTimeout(function(){
										first.animated(1);
									}, 50);
									second.clear(0);
								break;

							case 2:  //  C 3 НА 2
								third.clear(1);
								second.animated(2);
								break;

							case 3: // С 4 НА 3
								third.animated(3);
								forth.clear(2);
								break;

							case 4: // С 5 НА 4
								forth.animated(4);
								fifth.clear(3);
								break;

							case 5:  /// С 6 НА 5
								fifth.animated(5);
								sixth.clear(4);
								break;
							}

						if(current>0){
							--current;
						}
						break;

				default:  break;

			}
		}

		var current = 0;
		var offsetLeftFirst1Cart,offsetLeftFirst1Cart, rightFirst1Offset;
		var offsetLeftFirst2Cart,offsetLeftFirst2Cart, rightFirst2Offset;
		var current_answer = false, toggle_answer=false;

		var init = function() {

			setUpListeners();
		}

		var defineVariables = function(e) {


		 	first.wrapper = common.first_class_element('first_wrapper');
		 	first.contacts = common.first_class_element('first_title_contacts');
		 	first.wrapper_main = common.first_class_element('first_main_wrapper');
		 	first.cart1 = common.first_class_element('first_main_cart1');
		 	first.cart2 = common.first_class_element('first_main_cart2');
		 	first.logo = common.first_class_element('first_title_logo');
		 	first.arrow.container = common.first_class_element('arrow_container');
			first.cartTop1 = parseInt(getComputedStyle(first.cart1).top);
			first.cartLeft1 = parseInt(getComputedStyle(first.cart1).left);
			first.cartTop2 = parseInt(getComputedStyle(first.cart2).top);
			first.cartLeft2 = parseInt(getComputedStyle(first.cart2).left);


		 	second.wrapper = common.first_class_element('second_wrapper');
		 	second.footer_wrapper = common.first_class_element('second_footer_wrapper');
		 	second.logo = common.first_class_element('second_logo_desc');
		 	second.title = common.first_class_element('second_logo_title');
		 	second.cart.wrapper = common.first_class_element('traf_wrapper');
		 	second.cart.divs = second.cart.wrapper.getElementsByTagName('div');
		 	second.cart.over1 = common.first_class_element('traf_over1');
		 	second.cart.over6 = common.first_class_element('traf_over6');
		 	second.cart.title = common.first_class_element('second_cart_title');
		 	second.cart.over = common.first_class_element('second_over-icons');
		 	second.over_icons = document.getElementsByClassName('second_over-icons_cell');


		 	third.wrapper = common.first_class_element('third_wrapper');
		 	third.circle = common.first_class_element('third_center-line_circle');
		 	third.our = common.first_class_element('third_our');
		 	third.our.big = common.first_class_element('third_our_big');

		 	forth.wrapper= common.first_class_element('forth_wrapper');
		 	forth.title = common.first_class_element('forth_title');
		 	forth.desc = common.first_class_element('forth_desc');
		 	forth.first_cart = common.first_class_element('forth_first-cart');
		 	forth.first_fon = common.first_class_element('forth_first-fon');
		 	forth.second_cart = common.first_class_element('forth_second-cart');
		 	forth.second_fon = common.first_class_element('forth_second-fon');
		 	forth.left_desc = common.first_class_element('forth_arrow_desc-left');
		 	forth.right_desc = common.first_class_element('forth_arrow_desc-right');
		 	forth.arrow = document.getElementsByClassName('forth_arrow');
		 	forth.list = common.first_class_element('forth_list-wrapper');


		 	fifth.wrapper = common.first_class_element('fifth_wrapper');
		 	fifth.partners_wrapper_fill = document.getElementsByClassName('fifth_partners_wrapper-fill');
		 	fifth.partners_cell = common.first_class_element('fifth_partners_wrapper-fill-1').getElementsByClassName('fifth_partners_cell');
		 	fifth.partners_toggle = document.getElementsByClassName('fifth_partners_toggle');
		 	fifth.village = common.first_class_element('fifth_smi_icons-village');
		 	fifth.cuker = common.first_class_element('fifth_smi_icons-cuker');
		 	fifth.footer = common.first_class_element('fifth_footer-wrapper');
		 	fifth.youtube = common.first_class_element('fifth_youtube-wrapper');


		 	sixth.questions = document.getElementsByClassName('sixth_questions-title');
		 	sixth.answers = document.getElementsByClassName('sixth_questions-answer');
		 	sixth.blocks = document.getElementsByClassName('sixth_questions-block');
		 	sixth.manager = common.first_class_element('sixth_manager');
		 	sixth.manager.question = common.first_class_element('sixth_manager_question');
		 	sixth.manager.answer = common.first_class_element('sixth_manager_button');
		 	sixth.title = common.first_class_element('sixth_title');
		 	sixth.wrapper = common.first_class_element('sixth_wrapper');


		 	menu.blocks = document.getElementsByClassName('menu_block');


		 	offsetLeftFirst1Cart = offsetCount(first.cart1).left, rightFirst1Offset = document.documentElement.clientWidth-offsetLeftFirst1Cart;
			offsetLeftFirst2Cart = offsetCount(first.cart2).left, rightFirst2Offset = document.documentElement.clientWidth-offsetLeftFirst2Cart;
			offsetTopFirst1Cart = offsetCount(first.cart2).top, topFirst1Offset = document.documentElement.clientHeight-offsetTopFirst1Cart;
			offsetTopFirst2Cart = offsetCount(first.cart2).top, topFirst2Offset = document.documentElement.clientHeight-offsetTopFirst2Cart;


		 	///onloadFunctions


		 	first.arrow.container.className = first.arrow.container.className+' animated';

		 	// Add Listeners After Define Variables

		 	for(n=0;n<menu.blocks.length; n++){
		 		menu.blocks[n].addEventListener('mouseover', menu.blocks_over);
				menu.blocks[n].addEventListener('mouseout', menu.blocks_out);
				menu.blocks[n].addEventListener('click', menu.blocks_click);
		 	}


		 	for(i=0; i<sixth.questions.length;i++){
		 		sixth.questions[i].addEventListener('click', sixth.questions_click);
		 	}

		 	third.circle.addEventListener('mousedown', third.drag);

		 	for(f=0; f<fifth.partners_toggle.length; f++){
		 		fifth.partners_toggle.item(f).addEventListener('click', fifth.partners_func);
		 	}

		 	first.mouse_move_toggle(1);

		 	// ИНИЦИАЛИЗАЦИЯ ПЕРВОЙ АНИМАЦИИ
		 	first.reload();
		 	first.animated(1);


		}

		var setUpListeners = function() {

			addEventListener('load', defineVariables);
			addEventListener('keypress', keyFunc);
			addEventListener('wheel', wheelListen);
			addEventListener('click', function(){})

		}

		var offsetCount = function(obj) {

				var offsetLeft = obj.offsetLeft, offsetTop = obj.offsetTop, offsetParent = obj.offsetParent;

			while(offsetParent){

				offsetLeft+=offsetParent.offsetLeft;
				offsetTop+=offsetParent.offsetTop;
				offsetParent=offsetParent.offsetParent;

			}

			return {
				top: offsetTop,
				left: offsetLeft
			}

		}

		var keyFunc = function(e) {

			e.preventDefault();

			if(e.keyCode==40){
				e.deltaY = 3;
			}
			else if(e.keyCode==38){
				e.deltaY = -3;
			}

			wheelListen(e);
		}

		var keyNull = function(e) {

			e.preventDefault();
		}


		var textDraw = function(text, obj) {

			var i = 0;
			var txt = text;
			obj.style.display = "block";

				var timeOutDraw = setInterval( function() {

					if(i<=txt.length){
						obj.innerHTML = txt.substr(0, i);
						i++;
					}
					else {
						clearInterval(timeOutDraw);
					}

				}, 10);

				timeOutDraw;

		}

	return init();

}());