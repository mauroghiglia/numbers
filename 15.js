/* This code is executed when form is loaded */
	
	/* Ensure that Fabrik's loaded */
 
	requirejs(['fab/fabrik'], function () {
	
	/* Hide text area where result are stoked */
	var textArea = document.getElementById('orders___textParameters').findClassUp('fabrikElementContainer');
	textArea.hide();
	/* Copy data stocked in the textarea */
		var blockRef = 'form_15';
		var exact = false;
		var form = Fabrik.getBlock(blockRef, exact, function (block) {
			block.elements.get('orders___disp_param').update(block.elements.get('orders___textParameters').get('value'));
		});
		
	/* Get some variables */
	
	});

function makeCalculations() {
	/* Ensure that Fabrik's loaded */
	requirejs(['fab/fabrik'], function () {
		buildOffer();
	});
}

function copyResults() {
	/* Check if there are already some results in the texarea and copy them into the display element */

	/* Ensure that Fabrik's loaded */
 
	requirejs(['fab/fabrik'], function () {
 
		/* The block I want to use */
		var blockRef = 'form_15';
 
		/* Should we use an exact match for the blockRef? */
		var exact = false;
	
		/* This callback function is run once the block has been loaded. */
		var form = Fabrik.getBlock(blockRef, exact, function (block) {
			if(block.elements.get('orders___textParameters').get('value')) {
				block.elements.get('orders___disp_param').update(block.elements.get('orders___textParameters').get('value'));
			}
		
		/* Hide calculate button if offer is saved */

		var hideCalcButton = false;
		if(hideCalcButton) {
			var offerId = block.elements.get('orders___id').get('value');
			var calcButton = document.getElementById('orders___button_calculate').findClassUp('fabrikElementContainer');
			if (offerId > 0) {
				calcButton.hide();
			} else {
				calcButton.show();
			}
		}

	});
	

});
};

/* ================ This function prepares the offer ========================= */
function buildOffer() {
/**
* Ensure that Fabrik's loaded
*/
 
requirejs(['fab/fabrik'], function () {
 
	/* The block I want to use */
	var blockRef = 'form_15';
 
	/* Should we use an exact match for the blockRef? */
	var exact = false;
  
	/* This callback function is run once the block has been loaded. */
	var form = Fabrik.getBlock(blockRef, exact, function (block) {
	
	/* Dati occupazionali */
		var offerId = block.elements.get('orders___id').get('value');
		console.log('Offer ID '+offerId);
		var open_days = block.elements.get('orders___open_days').get('value');
		var yexp = block.elements.get('orders___yexp').get('value').toFloat;
		var period = block.elements.get('orders___period').get('value').toFloat;
		var total_rooms = block.elements.get('orders___total_rooms').get('value');
		var totalBeds = block.elements.get('orders___totalBeds').get('value').toFloat;
		var rooms_sold = block.elements.get('orders___rooms_sold').get('value');
		var arrdep = block.elements.get('orders___arrdep').get('value').toFloat;
		var presences = block.elements.get('orders___presences').get('value').toFloat;
		
		/* Medie occupazionali */
		var r_stay = block.elements.get('orders___r_stay').get('value');
		var r_occ = block.elements.get('orders___r_occ').get('value');
		var r_occ_rate = block.elements.get('orders___r_occ_rate').get('value').toFloat;
		var b_occ_rate = block.elements.get('orders___b_occ_rate').get('value').toFloat;
		var r_day_occ_av = block.elements.get('orders___r_day_occ_av').get('value').toFloat;
		var p_occ_day_rate = block.elements.get('orders___p_occ_day_rate').get('value').toFloat;
		var r_daily_stay_av  = block.elements.get('orders___r_daily_stay_av').get('value').toFloat;
		var r_daily_dep_av = block.elements.get('orders___r_daily_dep_av').get('value').toFloat;
 
		/*
		 * ===========================================================================================================
		 * Order Lines Section - In this section we read all the data from each offer line and store them in an object
		 * ===========================================================================================================
		 */
		 
		/* This is the array that will contain offer lines objects */
		var offerLines = [];
		
		/* This is the constructor for any object containing an offer line */
		function offerLine() {
			this.line_room_type = 0;
			this.room_name;
			this.rooms = 0;
			this.roomProminency = 0;
			this.roomQuote = 0;
			this.line_rbeds = 0;
			this.nr_num = 0;
			this.line_product = 0;
			this.art_name;
			this.cat = 0;
			this.int_code = 0;
			this.logistics = 0;
			this.buy_price = 0;
			this.pre_markup = 0;
			this.markup = 0;
			this.bax_qty = 0;
			this.bax_carton = 0;
			this.appraisal = 0;
			this.line_quantity = 0;
			this.lines_replenish_mode = 0;
			this.avail = 0;
			this.prod_code = 0;
			this.sell_price = 0;
			this.acquistoNetto = 0;
			this.acquistoRoRs = 0;
			this.margine = 0;
			this.margineFisso = 25;
			this.venditaNetta = 0;
			this.venditaRoRs = 0;
			this.fixCoeff = 2;
			this.shotel = 0;
			this.scons = 0;
			this.appraisedUsage = 0;
			this.eta = 0;
			this.referring = 0;
			this.calcCoeff = 0;
			this.calculatedQuantity = 0;
			this.selectedQuantity = 0;
			this.appraisedQuantity = 0;
		};
		
		var thisLine = new offerLine();
	
	/* Starts reading articles lines only if at least one is present */
	var checkOfferLines = block.elements.get('orders_7_repeat___line_room_type_0').get('value')
	if (checkOfferLines) {
		
		/* Uses this procedure only if there is no offer ID (offer has not been saved, yet) */
		if(!offerId) {
			var lineIndex = 0;
			Object.each(block.elements, function (element, key) {
				if (key.contains('orders_7_repeat___line_room_type')) {
					lineIndex = offerLines.length;
					offerLines[lineIndex] = new offerLine();
					console.log(lineIndex);
					offerLines[lineIndex].line_room_type = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___room_name')) {
					offerLines[lineIndex].room_name = element.get('value');
				} else if (key.contains('orders_7_repeat___rooms')) {
					offerLines[lineIndex].rooms = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___line_rbeds')) {
					offerLines[lineIndex].line_rbeds = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___nr_num')) {
					offerLines[lineIndex].nr_num = element.get('value');
				} else if (key.contains('orders_7_repeat___line_product')) {
					offerLines[lineIndex].line_product = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___art_name')) {
					offerLines[lineIndex].art_name = element.get('value');
				} else if (key.contains('orders_7_repeat___cat')) {
					offerLines[lineIndex].cat = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___int_code')) {
					offerLines[lineIndex].int_code = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___logistics')) {
					offerLines[lineIndex].logistics = element.get('value');
				} else if (key.contains('orders_7_repeat___buy_price')) {
					offerLines[lineIndex].buy_price = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___pre_markup')) {
					offerLines[lineIndex].pre_markup = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___markup')) {
					offerLines[lineIndex].markup = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___bax_qty')) {
					offerLines[lineIndex].bax_qty = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___bax_carton')) {
					offerLines[lineIndex].bax_carton = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___appraisal')) {
					offerLines[lineIndex].appraisal = element.get('value');
				} else if (key.contains('orders_7_repeat___line_quantity')) {
					offerLines[lineIndex].line_quantity = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___lines_replenish_mode')) {
					offerLines[lineIndex].lines_replenish_mode = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___avail')) {
					offerLines[lineIndex].avail = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___prod_code')) {
					offerLines[lineIndex].prod_code = element.get('value');
					console.log(offerLines[lineIndex].prod_code);
				} else if (key.contains('orders_7_repeat___sell_price')) {
					offerLines[lineIndex].sell_price = element.get('value').toFloat();
				} else if (key.contains('orders_7_repeat___eta')) {
					offerLines[lineIndex].eta = element.get('value');
				} else if (key.contains('orders_7_repeat___referring')) {
					offerLines[lineIndex].referring = element.get('value').toFloat();
				}
			});
		} else {
			/* Uses this procedure only if there is an offer ID (offer has been already saved) */
			console.log('This is a saved offer');
			var lineIndex = 0;
			var elementLines = 0;
			var currentElementNumber = 0;
			var thisElementNumber = 0;
			Object.each(block.elements, function (element, key) {
				if (key.contains('orders_7_repeat___line_room_type')) {
					offerLines[lineIndex] = new offerLine();
					offerLines[lineIndex].line_room_type = element.get('value').toFloat();
					lineIndex++;
					elementLines++;
				} else if (key.contains('orders_7_repeat___room_name')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
						offerLines[lineIndex].room_name = element.get('value');
						lineIndex++;
				} else if (key.contains('orders_7_repeat___rooms')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
					offerLines[lineIndex].rooms = element.get('value').toFloat();
					lineIndex++;
				} else if (key.contains('orders_7_repeat___line_rbeds')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
					offerLines[lineIndex].line_rbeds = element.get('value').toFloat();
					lineIndex++;
				} else if (key.contains('orders_7_repeat___prod_code')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
					offerLines[lineIndex].prod_code = element.get('value');
					lineIndex++;
				} else if (key.contains('orders_7_repeat___art_name')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
					offerLines[lineIndex].art_name = element.get('value');
					lineIndex++;
				} else if (key.contains('orders_7_repeat___buy_price')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
					offerLines[lineIndex].buy_price = element.get('value').toFloat();
					lineIndex++;
				} else if (key.contains('orders_7_repeat___pre_markup')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
					offerLines[lineIndex].pre_markup = element.get('value').toFloat();
					lineIndex++;
				} else if (key.contains('orders_7_repeat___markup')) {
					if (lineIndex > elementLines - 1) {
						lineIndex = 0;
					}
					offerLines[lineIndex].markup = element.get('value').toFloat();
					lineIndex++;
				} 
				
			});
			
			/* Facciamo i primi calcoli interni alle linee e diamo una stampata sulla console delle linee lette */
			for(i=0;i<offerLines.length;i++) {
				offerLines[i].sell_price = offerLines[i].buy_price + (offerLines[i].buy_price * offerLines[i].pre_markup / 100);
				console.log(offerLines[i].buy_price +'   '+ offerLines[i].pre_markup +'   '+ offerLines[i].sell_price.toFixed(5));
				console.log('# '+i+' Type '+offerLines[i].line_room_type+' - '+offerLines[i].room_name+' N. '+offerLines[i].rooms+' rooms of '+offerLines[i].line_rbeds+' beds '
				+' Article cod. '+offerLines[i].prod_code+' Name '+offerLines[i].art_name.slice(0,10));
			}
		}
			
			/* Ora, per ogni linea d'ordine, calcoliamo la prominency della camera rispetto al totale delle camere dell'hotel */
			for(i=0;i<offerLines.length;i++) {
				offerLines[i].roomProminency = offerLines[i].rooms / total_rooms * 100;
			}
			
			
			/* Ora calcoliamo i coefficenti di stima per ogni articolo */
			for(i=0;i<offerLines.length;i++) {
				if (offerLines[i].referring == 0) {
					offerLines[i].appraisal = offerLines[i].appraisal / 100;
				} else {
					offerLines[i].appraisal = r_occ * offerLines[i].appraisal / 100;
				}
				offerLines[i].calcCoeff = (r_occ / r_stay * offerLines[i].appraisal) + ((r_occ / r_stay * offerLines[i].appraisal) * offerLines[i].fixCoeff /100);
			}
			
			/* Test linee d'ordine
			console.log('Linee ordine');
			for(i=0;i<offerLines.length;i++) {
				console.log('Line '+i+' Tipo camera '+offerLines[i].line_room_type+' Nome camera '+offerLines[i].room_name);
			}
			 */
			/* Ora calcoliamo le quantità di articoli calcolate per ogni linea d'ordine */
			for(i=0;i<offerLines.length;i++) {
			
				if(offerLines[i].lines_replenish_mode == 0) {
					offerLines[i].calculatedQuantity = offerLines[i].line_quantity * offerLines[i].rooms;
					offerLines[i].selectedQuantity = offerLines[i].line_quantity;
				} else {
					offerLines[i].calculatedQuantity = offerLines[i].line_quantity * offerLines[i].rooms * offerLines[i].line_rbeds;
					offerLines[i].selectedQuantity = offerLines[i].line_quantity * offerLines[i].line_rbeds;
				}
			}
			
			/* Qui calcoliamo quantità previste e prezzo di vendita di ogni prodotto riga per riga */
			for(i=0;i<offerLines.length;i++) {
				offerLines[i].acquistoRoRs = offerLines[i].sell_price * offerLines[i].calcCoeff;
				offerLines[i].margine = offerLines[i].sell_price * offerLines[i].margineFisso /100;
				offerLines[i].venditaNetta = offerLines[i].sell_price + offerLines[i].margine;
				offerLines[i].venditaRoRs = offerLines[i].venditaNetta * offerLines[i].calcCoeff;
				offerLines[i].appraisedUsage = offerLines[i].selectedQuantity * offerLines[i].calcCoeff * offerLines[i].roomProminency * rooms_sold / 100;
				offerLines[i].roomQuote = offerLines[i].roomProminency * rooms_sold;
				offerLines[i].shotel = offerLines[i].venditaRoRs * offerLines[i].selectedQuantity;
				offerLines[i].scons = offerLines[i].acquistoRoRs * offerLines[i].selectedQuantity;
			}
			
			/* ========= Ora ordiniamo gli articoli eliminando i doppioni ========*/
			
			/* This is the array that will contain order lines objects */
			var orderLines = [];
			
			/* This is the constructor for any object containing an order line */
			function orderLine() {
				this.prod_code;
				this.line_product;
				this.appraisedUsage = 0;
				this.cartonQty = 0;
				this.cartonsTotal = 0;
				this.shotel = 0;
				this.scons = 0;
				
			};
			

			var updated = false;
			var newOrderLine;
			for(i=0;i<offerLines.length;i++) {
				updated = false;
				for(n=0;n<orderLines.length;n++) {
					if (orderLines[n].prod_code == offerLines[i].prod_code) {
						orderLines[n].appraisedUsage += offerLines[i].appraisedUsage;
						updated = true;
					}
				}
				if(updated == false) {
					newOrderLine = new orderLine();
						newOrderLine.prod_code = offerLines[i].prod_code;
						newOrderLine.line_product = offerLines[i].line_product;
						newOrderLine.appraisedUsage = offerLines[i].appraisedUsage;
						newOrderLine.cartonQty = offerLines[i].bax_qty * offerLines[i].bax_carton;
						newOrderLine.cartonsTotal = offerLines[i].appraisedUsage / (offerLines[i].bax_qty * offerLines[i].bax_carton);
						newOrderLine.shotel = offerLines[i].shotel;
						newOrderLine.scons = offerLines[i].scons;
					
					orderLines.push(newOrderLine);
				}
			}
			
			/* Preventivo per camera su articoli selezionati */
			
			/* This is the array that will contain order rooms lines objects */
			var orderRoomLines = [];
			
			/* This is the constructor for any object containing an order room line */
			function orderRoomLine() {
				this.line_room_type = 0;
				this.room_name;
				this.shotel = 0;
				this.scons = 0;
				this.totaleAnnoHotel = 0;
				this.totaleAnnoConsorziata = 0;
			};
			
			var updated = false;
			var newOrderRoomLine;
			for(i=0;i<offerLines.length;i++) {
				updated = false;
				for(n=0;n<orderRoomLines.length;n++) {
					if (orderRoomLines[n].line_room_type == offerLines[i].line_room_type) {
						orderRoomLines[n].shotel += offerLines[i].shotel;
						orderRoomLines[n].scons += offerLines[i].scons;
						updated = true;
					}
				}
				if(updated == false) {
					newOrderRoomLine = new orderRoomLine();
						newOrderRoomLine.line_room_type = offerLines[i].line_room_type;
						newOrderRoomLine.room_name = offerLines[i].room_name;
						newOrderRoomLine.shotel = offerLines[i].shotel;
						newOrderRoomLine.scons = offerLines[i].scons;
					
					orderRoomLines.push(newOrderRoomLine);
				}
			}
			
			/* Totalizzazione dell'offerta a camera */
			var sommatoriaAnnoHotel = 0;
			var sommatoriaAnnoConsorziata = 0;
			var mediaRoomHotel = 0;
			var mediaRoomConsorziata = 0;
			var margineValuta = 0;
			var marginePercentuale = 0;
			for(i=0;i<orderRoomLines.length;i++) {
				
				orderRoomLines[i].totaleAnnoHotel += orderRoomLines[i].shotel * offerLines[i].roomQuote / 100;
				orderRoomLines[i].totaleAnnoConsorziata += orderRoomLines[i].scons * offerLines[i].roomQuote / 100;
				sommatoriaAnnoHotel += orderRoomLines[i].totaleAnnoHotel;
				sommatoriaAnnoConsorziata += orderRoomLines[i].totaleAnnoConsorziata
				mediaRoomHotel = sommatoriaAnnoHotel / rooms_sold;
				mediaRoomConsorziata = sommatoriaAnnoConsorziata / rooms_sold;
				margineValuta = sommatoriaAnnoHotel - sommatoriaAnnoConsorziata;
				marginePercentuale = ((mediaRoomHotel / mediaRoomConsorziata) - 1) *100;
			}
			
			/* ======================== Display dell'offerta ======================================== */
			/* Camere */
			var displayArticles = "<p><b>PREVENTIVO CAMERE</b><p><table border='1'><tr class='resultLineHeader'><td class='resultTableHeader' id='Column1'>Tipo camera</td><td class='resultTableHeader' id='Column2'>Hotel</td><td class='resultTableHeader' id='Column3'>Consorziata</td><td class='resultTableHeader' id='Column4'>Tot. anno Hotel</td><td class='resultTableHeader' id='Column5'>Tot. anno consorziata</td></tr>";
			for(i=0;i<orderRoomLines.length;i++){
				displayArticles += '<tr><td>' + orderRoomLines[i].room_name + "</td><td class='resultNumber'>" + orderRoomLines[i].shotel.toFixed(4) + "</td><td class='resultNumber'>" + orderRoomLines[i].scons.toFixed(4) + "</td><td class='resultNumber'>" + orderRoomLines[i].totaleAnnoHotel.toFixed(2) + "</td><td class='resultNumber'>" + orderRoomLines[i].totaleAnnoConsorziata.toFixed(2) + '</td></tr>';
			}
			displayArticles += "<tr class='resultLastRoomLine'><td><b>Media Room</b></td><td class='resultNumber'>"+mediaRoomHotel.toFixed(4)+"</td><td class='resultNumber'>"+mediaRoomConsorziata.toFixed(4)+"</td><td class='resultNumber'>"+sommatoriaAnnoHotel.toFixed(2)+"</td><td class='resultNumber'>"+sommatoriaAnnoConsorziata.toFixed(2)+'</td></tr>';
			displayArticles += "<tr></td><td></td><td></td><td></td><td><b>Margine</b></td><td class='resultNumber'>"+margineValuta.toFixed(2)+'</td></tr>';
			displayArticles += "<tr></td><td></td><td></td><td></td><td><b>Margine %</b></td><td class='resultNumber'>"+marginePercentuale.toFixed(2)+'</td></tr>';
			displayArticles += '</table>';
			/* Distinta prodotti */
			displayArticles += "<br /><br /><p><b>DISTINTA PRODOTTI</b><p><table border='1'><tr class='resultLineHeader'><td class='resultTableHeader' id='Column1'>Cod. Produttore</td><td class='resultTableHeader' id='Column2'>Prodotto</td><td class='resultTableHeader' id='Column3'>Q.ta stimata</td><td width='100px' class='resultTableHeader' id='Column4'>Scatoloni</td></tr>";
			for(i=0;i<orderLines.length;i++){
				displayArticles += '<tr><td>'+orderLines[i].prod_code+"</td><td class='resultNumber'>"+orderLines[i].line_product+ "</td><td class='resultNumber'>" + orderLines[i].appraisedUsage.toFixed(2)+"</td><td class='resultNumber'>"+ orderLines[i].cartonsTotal.toFixed(1) +'</td></tr>';
			}
			block.elements.get('orders___textParameters').update(displayArticles);
			block.elements.get('orders___disp_param').update(block.elements.get('orders___textParameters').get('value'));
		
	} else {
		block.elements.get('orders___textParameters').update("Non sono stati inserite linee d'ordine!!!");
		block.elements.get('orders___disp_param').update(block.elements.get('orders___textParameters').get('value'));
	}
	
  });
});
};
