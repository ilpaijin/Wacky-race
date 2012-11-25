Modernizr.load({

	load : 'http://code.jquery.com/jquery.min.js',
	complete : function(){
		$('document').ready( function(){

			$('.width_transtion').hover( function(){
				console.info('ok hover');
				$(this).addClass('allunga');
			},
			function(){ $(this).removeClass('allunga'); });


			$('#race_wrapper').find('li').hover( function(){
				$(this).find('.numeri_estratti').fadeIn(200);
			},
			function(){ $(this).find('.numeri_estratti').fadeOut(20); } );


			(function(){

				/* --- Array delle corsie --- */
				lis = [].slice.call( document.getElementById('griglia_partenza').getElementsByTagName('li') );
				var winner = false;
				var ArrivalCounter = 1;
				var medail = ['gold','silver','bronze'];

				/* --- lancio del dado --- */
				function rollDice(){ 
					return Math.floor(Math.random()*301); 
				}


				/* --- prende il valore piu alto dell'array dei valori. Per avere il primo durante la gara --- */
				function getPrimo(array){
					return Math.max.apply(Math, array);
				}


				/* --- UI del primo in gara --- */
				function whosthefirst(ay){

					$('#race_wrapper').find('li').removeClass('tempFirst');

					var primo = getPrimo(ay);
					var pos = ay.indexOf(primo);

					$('#race_wrapper').find('li').eq(pos).addClass('tempFirst');

				}


				function drawSpanWithValue(el, val){

					var span = document.createElement('span');
					span.appendChild( document.createTextNode(val) );
					el.getElementsByTagName('p')[0].appendChild(span); 

				}


				/* ---  --- */
				function run() {

					var aProgressVal = [];					

					for ( li in lis ) {

						var elActualValue = parseInt( lis[li].getElementsByTagName('progress')[0].getAttribute('value') );
						var elValueToAdd = rollDice();
						var elNewValue = elValueToAdd + elActualValue;

						/* --- questa va in una init, inutile ciclarla --- */
						var elMaxValue = parseInt( lis[li].getElementsByTagName('progress')[0].getAttribute('max') );

						lis[li].getElementsByTagName('progress')[0].setAttribute('value', elNewValue );

						drawSpanWithValue( lis[li], elValueToAdd );

						if ( elNewValue >= elMaxValue ) {

							var target = lis[li].getElementsByTagName('progress')[0].parentNode.getElementsByTagName('span')[0];

							lis[li].getElementsByTagName('h4')[0].className = 'ha_finito';
							target.innerHTML = ArrivalCounter;
							target.className = target.className +' '+medail[ArrivalCounter - 1];

							winner = true;

							lis.splice(lis.indexOf(lis[li]), 1);

							ArrivalCounter++;

						}
						
						aProgressVal.push( elNewValue );	

					}

					for ( li in lis ) {

						if (!winner)
							whosthefirst(aProgressVal);

						if ( lis[li].getElementsByTagName('h4')[0].className != 'ha_finito' ){
							gara_finita = false;
							return;
						}	
						else {
							// console.info('gara finita');
							gara_finita = true;
						}
						
					}

					if (gara_finita) {

						stopRun(corsa);

						return;
					}

				}

				function startRun(){
					$('#corri').attr('value', 'on').text('Pause race');
					corsa = setInterval( run, 100);
					window.scrollTo(0, 240);
				}

				function stopRun(id){
					$('#corri').attr('value', 'off').text('Run race');

					clearInterval(id);
				}


				$('#race_wrapper #corri').click( function(){

					if ( $(this).attr('value') == 'off' ) {
						startRun();
					}
					else {
						stopRun(corsa);
					}
	
				} );

				$('#race_wrapper #reset').click( function(){

					var root = $('#race_wrapper');
					root.find('h4').find('span').html('');
					root.find('.numeri_estratti').html('');
					root.find('progress').attr('value', 0);
					$('#race_wrapper').find('li').removeClass('primo');
				} );

			}());


		} );
	}

});

