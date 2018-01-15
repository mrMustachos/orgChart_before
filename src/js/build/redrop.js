// // clean up
// $('.gridster li[data-row="11"], .gridster li[data-row="6"]').remove();
// $('.gridster li').each(function() {
// 	var currentClick = $(this).attr('data-row');
// 	var cutRow = parseInt(currentClick) -10;

// 	$(this).not('li[data-row="1"]').attr('data-row', cutRow).attr('data-truerow', cutRow);

// 	$(".gridster li").removeAttr('id');
// 	$(".gridster li").each(function(i) {
// 		i = i + 1;
// 		$(this).attr('id', 'li' + i);
// 	});
// });


$(window).ready(function() {

	////// Center Chart in Window /////////////////////////////////////////////////////////////

	$('.chart').scrollTo(0);
	$.scrollTo(0);

	////// Svgeezy Fallback Code //////////////////////////////////////////////////////////////

	svgeezy.init(false, 'png');

	////// Clean Up Name List /////////////////////////////////////////////////////////////////

	$(function(){
		$('#nameList').listnav();
		$('.ln-letters a.ln-disabled').each(function() {
			var classes = $(this).attr('class');
			$(this).replaceWith('<div class="empty '+ classes+'">' + $(this).text() + '</div>')
		});
		
		var lis = $("#nameList li");
		for(var i = 0; i < lis.length; i+=6) {
			lis.slice(i, i+6).wrapAll("<li class='li_group'><ul></ul></li>");
		}
	});
	$("#nameBank").hide().removeAttr('class');

	////// Tabbed Buttons /////////////////////////////////////////////////////////////////////

	(function ($) { 
		$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
		
		$('.tab ul.tabs li a').click(function (g) { 
			var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
			
			tab.find('ul.tabs > li').removeClass('current');
			$(this).closest('li').addClass('current');
			
			tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
			tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

			g.preventDefault();
		} );
	})(jQuery);

	////// Initiate Gridster //////////////////////////////////////////////////////////////////

	var grid_canvas = $(".gridster > ul").gridster({
		widget_margins: [5, 5],
		widget_base_dimensions: [130, 5],
		avoid_overlapped_widgets: false,
		// autogenerate_stylesheet: false,
		min_cols: 30,
		shift_larger_widgets_down: false,
		
		serialize_params: function($w, wgd) {
			return {
				id: $($w).attr('id'),
				class: $($w).attr('class'),
				htmlContent: $($w).html(),
				tile_name: $($w).attr('data-tilename'),
				true_row: $($w).attr('data-truerow'),
				span_row: $($w).attr('data-spanpush'),
				col: $($w).attr('data-col'),
				row: $($w).attr('data-row'),
				size_x: $($w).attr('data-sizex'),
				size_y: $($w).attr('data-sizey'),
			};
		}
	}).data('gridster');

	////// Set Quick Calls ////////////////////////////////////////////////////////////////////

	var resetIDs = function () {
		$(".gridster li").removeAttr('id');
		$(".gridster li").each(function(i) {
			i = i + 1;
			$(this).attr('id', 'li' + i);
		});
	}
	var fixOrder = function () {
		$('li.gs_w[data-col="01"]').attr('data-col','1');
		$('li.gs_w[data-col="02"]').attr('data-col','2');
		$('li.gs_w[data-col="03"]').attr('data-col','3');
		$('li.gs_w[data-col="04"]').attr('data-col','4');
		$('li.gs_w[data-col="05"]').attr('data-col','5');
		$('li.gs_w[data-col="06"]').attr('data-col','6');
		$('li.gs_w[data-col="07"]').attr('data-col','7');
		$('li.gs_w[data-col="08"]').attr('data-col','8');
		$('li.gs_w[data-col="09"]').attr('data-col','9');
	}
	var fixColumns = function () {

		var saftyValueGet = $('.gridster li[data-col="1"]');
		
		saftyValueGet.each(function() {
			var colValueNew = $(this).map(function() {
				return $(this).data('truerow');
			});

			$('.gridster .gs_w').each(function() {
				var rowDataNew = $(this).data('truerow');

				for (i = 0; i < colValueNew.length; i++) {
					if (colValueNew[i] == rowDataNew) {
						var trueRowNew = parseInt(rowDataNew);

						// $(this).removeAttr('data-truerow');
						$(this).removeAttr('data-row');
						$(this).attr('data-row', trueRowNew);
						$(this).removeData('truerow');
					}
				}
			});
		});
	}
	var setColumns = function () {

		$('.gridster li[data-col="1"]').each(function() {
			$(this).removeAttr('data-truerow');
			var colValueGet = $(this).map(function() {
				return $(this).data('row');
			});

			$('.gridster .gs_w').each(function() {
				var rowDataGet = $(this).data('row');

				for (i = 0; i < colValueGet.length; i++) {
					if (colValueGet[i] == rowDataGet) {
						var trueRowGet = parseInt(rowDataGet);

						$(this).attr('data-truerow', trueRowGet);
						$(this).removeData('row');
					}
				}
			});
		});
	}
	var setSpans = function () {

		var spannerFix = $('.gridster .gs_w');
		
		spannerFix.each(function() {
			var spanValueGet = $(this).map(function() {
				return $(this).data('spanpush');
			});

			$('.gridster .gs_w').each(function() {
				var spanDataGet = $(this).data('spanpush');

				for (i = 0; i < spanValueGet.length; i++) {
					if (spanValueGet[i] == spanDataGet) {
						var spannerGet = parseInt(spanDataGet);

						// $(this).removeAttr('data-spanpush');
						$(this).removeAttr('style').css({'display': 'list-item', 'left': spannerGet+'px'});
						$(this).removeData('spanpush');
					}
				}
			});
		});
	}
	var resetChartHeightLoad = function () {
		var chartHeight = $('.gridster ul').height();
			chartHeight = chartHeight+'px';

		$('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': chartHeight});
	}
	function maxRow(selector) {
		// var min=null, max=null;
		var max=null;

		$(selector).each(function() {
			var row = parseInt($(this).attr('data-row'), 10);
			if (isNaN(row)) { return; }
			// if ((min===null) || (row < min)) { min = row; }
			if ((max===null) || (row > max)) { max = row; }
		});

		// return [min, max];
		return [max];
	}
	var chartBottom = function () {
		var bottomRow = maxRow('.gridster li');
			bottomRow = 'li.gs_w[data-row="'+ bottomRow +'"]';
			bottomRow = $(bottomRow);

		bottomRow.addClass('nope');
	}
	function maxCol(selector) {
		// var min=null, max=null;
		var max=null;

		$(selector).each(function() {
			var col = parseInt($(this).attr('data-col'), 10);
			if (isNaN(col)) { return; }
			// if ((min===null) || (col < min)) { min = col; }
			if ((max===null) || (col > max)) { max = col; }
		});

		// return [min, max];
		return [max];
	}
	function minCol(selector) {
		var min=null;

		$(selector).each(function() {
			var col = parseInt($(this).attr('data-col'), 10);
			if (isNaN(col)) { return; }
			if ((min===null) || (col < min)) { min = col; }
		});

		return [min];
	}
	var addChartPadding = function () {
		var lastCol = maxCol('.gridster li');
		var tileWidth = $('.gridster li').width();
			tileWidth = tileWidth + 10;
		var totalChartWidth = tileWidth * lastCol;
			totalChartWidth = totalChartWidth + 50;
			totalChartWidth = totalChartWidth+'px';

		$('.gridster').css('width', totalChartWidth);
	}
	var dataClass = function () {
		$('.gridster .gs_w').each(function() {

			if ($(this).attr('data-sizey') == '1') {
			}
			else {
				var dataClassMake = $(this).attr('class');
				$(this).removeAttr('data-class')
				$(this).attr('data-class', dataClassMake);
			}

		});
	}
	var dataID = function () {
		$('.gridster .gs_w').each(function() {
			var dataMakeID = $(this).attr('id');
				dataMakeID = dataMakeID.replace('li', '');

			$(this).removeAttr('data-id');
			$(this).attr('data-id', dataMakeID);
		});
	}
	var saveGrid = function () {
		setColumns();
		resetIDs();
		localforage.setItem('griddata', grid_canvas.serialize(), function(err, result) { 
			console.log(err);
			console.log(result);
			console.log(result.value);
		});
	}
	var clearGrid = function () {
		localforage.clear();
		window.location.reload();
	}

	////// Gridster Build /////////////////////////////////////////////////////////////////////

	localforage.getItem('griddata', function(err, value) {

		if (value == null) {

			// Build New Chart
			var json = [
				{"id":"li1","class":"tile blocking gs_w nope","col":"1","row":"1","size_x":"1","size_y":"5"},
				{"id":"li2","class":"tile blocking gs_w nope","col":"2","row":"1","size_x":"1","size_y":"5"},
				{"id":"li3","class":"tile blocking gs_w nope","col":"3","row":"1","size_x":"1","size_y":"5"},
				{"id":"li4","class":"tile blocking gs_w nope","col":"4","row":"1","size_x":"1","size_y":"5"},
				{"id":"li5","class":"tile blocking gs_w nope","col":"5","row":"1","size_x":"1","size_y":"5"},
				{"id":"li6","class":"tile blocking gs_w nope","col":"6","row":"1","size_x":"1","size_y":"5"},
				{"id":"li7","class":"tile blocking gs_w nope","col":"7","row":"1","size_x":"1","size_y":"5"},
				{"id":"li8","class":"tile blocking gs_w nope","col":"8","row":"1","size_x":"1","size_y":"5"},
				{"id":"li9","class":"tile blocking gs_w nope","col":"9","row":"1","size_x":"1","size_y":"5"},
				{"id":"li10","class":"tile blocking gs_w nope","col":"10","row":"1","size_x":"1","size_y":"5"},
				{"id":"li11","class":"tile blocking gs_w nope","col":"11","row":"1","size_x":"1","size_y":"5"},
				{"id":"li12","class":"tile blocking gs_w nope","col":"12","row":"1","size_x":"1","size_y":"5"},
				{"id":"li13","class":"tile blocking gs_w nope","col":"13","row":"1","size_x":"1","size_y":"5"},
				{"id":"li14","class":"tile blocking gs_w nope","col":"14","row":"1","size_x":"1","size_y":"5"},
				{"id":"li15","class":"tile blocking gs_w nope","col":"15","row":"1","size_x":"1","size_y":"5"},
				{"id":"li16","class":"tile blocking gs_w nope","col":"16","row":"1","size_x":"1","size_y":"5"},
				{"id":"li17","class":"tile blocking gs_w nope","col":"17","row":"1","size_x":"1","size_y":"5"},
				{"id":"li18","class":"tile blocking gs_w nope","col":"18","row":"1","size_x":"1","size_y":"5"},
				{"id":"li19","class":"tile blocking gs_w nope","col":"19","row":"1","size_x":"1","size_y":"5"},
				{"id":"li20","class":"tile blocking gs_w nope","col":"20","row":"1","size_x":"1","size_y":"5"},
				{"id":"li21","class":"tile blocking gs_w nope","col":"21","row":"1","size_x":"1","size_y":"5"},
				{"id":"li22","class":"tile blocking gs_w nope","col":"22","row":"1","size_x":"1","size_y":"5"},
				{"id":"li23","class":"tile blocking gs_w nope","col":"23","row":"1","size_x":"1","size_y":"5"},
				{"id":"li24","class":"tile blocking gs_w nope","col":"24","row":"1","size_x":"1","size_y":"5"},
				{"id":"li25","class":"tile blocking gs_w nope","col":"25","row":"1","size_x":"1","size_y":"5"},
				{"id":"li26","class":"tile blocking gs_w nope","col":"26","row":"1","size_x":"1","size_y":"5"},
				{"id":"li27","class":"tile blocking gs_w nope","col":"27","row":"1","size_x":"1","size_y":"5"},
				{"id":"li28","class":"tile blocking gs_w nope","col":"28","row":"1","size_x":"1","size_y":"5"},
				{"id":"li29","class":"tile blocking gs_w nope","col":"29","row":"1","size_x":"1","size_y":"5"},
				{"id":"li30","class":"tile blocking gs_w nope","col":"30","row":"1","size_x":"1","size_y":"5"}
			];
			
			for(i=0; i<json.length; i++) {

				// add a leading zero to fix the build out
				if(json[i].col < 10) {
					colID = '0'+json[i].col;
				} else {
					colID = json[i].col;
				}

				// Build New Chart
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" class="'+json[i]['class']+'"></li>', json[i].size_x, json[i].size_y, colID, json[i].row);

			}
			fixOrder();
			addChartPadding();

			setColumns();
			setSpans();
			dataClass();
			dataID();

			// clean up inported JSON
			$('.gridster li').empty();
			$('input[type=\'radio\'].radioBtnClass').each(function() {
				var lablr = $(this).attr('value');
				var named = $(this).attr('name');

				$('.gridster li[data-tilename="'+lablr+'"]').each(function() {
					$(this).append('<div class="nameBox"><span class="remover icon-remove" data-tilename="'+lablr+'"></span><span>'+named+'</span></div>');
				});
			});
		} else {

			var json = value;
			for(i=0; i<json.length; i++) {

				// add a leading zero to fix the build out
				if(json[i].col < 10) {
					colID = '0'+json[i].col;
				} else {
					colID = json[i].col;
				}
				grid_canvas.add_widget('<li id="'+json[i]['id']+'" data-spanpush="'+json[i]['span_row']+'" data-truerow="'+json[i]['true_row']+'" data-tilename="'+json[i]['tile_name']+'" class="'+json[i]['class']+'">'+json[i]['htmlContent']+'</li>', json[i].size_x, json[i].size_y, colID, json[i].row);
			}
			fixOrder();
			fixColumns();
			resetChartHeightLoad();
			setSpans();
			addChartPadding();

			dataClass();
			dataID();
		}

		$('.gridster li').each(function() {
			var namePull = $(this).attr('data-tilename');
			$("input[value="+namePull+"].radioBtnClass").attr("disabled", true).prop("checked", true);
			$("input[value="+namePull+"].radioBtnClass").parent().addClass('used');
		});

	});
	
	////// Save Progress //////////////////////////////////////////////////////////////////////

	$('#seralize').on('click', function(e, i) {
		e.preventDefault();
		saveGrid();
	});

	////// Clear Back to Default //////////////////////////////////////////////////////////////

	$('#def_button').on('click', function(e, i) {
		e.preventDefault();
		clearGrid();
	});
	
	////// Create a Tile Row //////////////////////////////////////////////////////////////////

	var blocks = [
		{ col: 1, row: 1, size_x: 1, size_y: 5 },
		{ col: 2, row: 1, size_x: 1, size_y: 5 },
		{ col: 3, row: 1, size_x: 1, size_y: 5 },
		{ col: 4, row: 1, size_x: 1, size_y: 5 },
		{ col: 5, row: 1, size_x: 1, size_y: 5 },
		{ col: 6, row: 1, size_x: 1, size_y: 5 },
		{ col: 7, row: 1, size_x: 1, size_y: 5 },
		{ col: 8, row: 1, size_x: 1, size_y: 5 },
		{ col: 9, row: 1, size_x: 1, size_y: 5 },
		{ col: 10, row: 1, size_x: 1, size_y: 5 },
		{ col: 11, row: 1, size_x: 1, size_y: 5 },
		{ col: 12, row: 1, size_x: 1, size_y: 5 },
		{ col: 13, row: 1, size_x: 1, size_y: 5 },
		{ col: 14, row: 1, size_x: 1, size_y: 5 },
		{ col: 15, row: 1, size_x: 1, size_y: 5 },
		{ col: 16, row: 1, size_x: 1, size_y: 5 },
		{ col: 17, row: 1, size_x: 1, size_y: 5 },
		{ col: 18, row: 1, size_x: 1, size_y: 5 },
		{ col: 19, row: 1, size_x: 1, size_y: 5 },
		{ col: 20, row: 1, size_x: 1, size_y: 5 },
		{ col: 21, row: 1, size_x: 1, size_y: 5 },
		{ col: 22, row: 1, size_x: 1, size_y: 5 },
		{ col: 23, row: 1, size_x: 1, size_y: 5 },
		{ col: 24, row: 1, size_x: 1, size_y: 5 },
		{ col: 25, row: 1, size_x: 1, size_y: 5 },
		{ col: 26, row: 1, size_x: 1, size_y: 5 },
		{ col: 27, row: 1, size_x: 1, size_y: 5 },
		{ col: 28, row: 1, size_x: 1, size_y: 5 },
		{ col: 29, row: 1, size_x: 1, size_y: 5 },
		{ col: 30, row: 1, size_x: 1, size_y: 5 }
	];
	$('#add_tile').on('click', function(e, i) {
		e.preventDefault();

		var firstRowTile = maxCol('.gridster li[data-row="1"]');
			firstRowTile = $('.gridster li[data-row="1"][data-col="'+firstRowTile+'"]').attr('id');
			firstRowTile = firstRowTile.replace('li', '');


		$('.gridster li').each(function() {

			var addTileGetDataID = $(this).map(function() {
				return $(this).data('id');
			}).get();

			var addTileRefineArray = $.map(addTileGetDataID, function(n) {
				return n <= firstRowTile ? n + 0 : null;
			});

			// moves chart down before adding in new row
			$('.gridster li').each(function() {
				var rowTileGetDataID = $(this).data('id');
				for (i = 0; i < addTileRefineArray.length; i++) {
					if (addTileRefineArray[i] == rowTileGetDataID) {
						var addTileGetUpdateID = '#li'+rowTileGetDataID;
						grid_canvas.move_widget_down($(addTileGetUpdateID), 5);
						$(this).removeData('id');
					}
				}
			});
		});

		$.each(blocks, function(i, widget){
			grid_canvas.add_widget('<li class="tile blocking"></li>', this.size_x, this.size_y, this.col, this.row);

			resetIDs();
			setColumns();
			dataClass();
			dataID();
		});

		// $('#add_div, #edit_block, #remove_div, #remove_block, #insert_div, #insert_block, #block_connectors, #half_step, #half_stepRemove, #seralize, #archive, #add_span2, #add_span3').prop("disabled", false);
	});

	////// Create a Divider Row ///////////////////////////////////////////////////////////////

	var dividers = [
		{ col: 1, row: 1, size_x: 1, size_y: 1 },
		{ col: 2, row: 1, size_x: 1, size_y: 1 },
		{ col: 3, row: 1, size_x: 1, size_y: 1 },
		{ col: 4, row: 1, size_x: 1, size_y: 1 },
		{ col: 5, row: 1, size_x: 1, size_y: 1 },
		{ col: 6, row: 1, size_x: 1, size_y: 1 },
		{ col: 7, row: 1, size_x: 1, size_y: 1 },
		{ col: 8, row: 1, size_x: 1, size_y: 1 },
		{ col: 9, row: 1, size_x: 1, size_y: 1 },
		{ col: 10, row: 1, size_x: 1, size_y: 1 },
		{ col: 11, row: 1, size_x: 1, size_y: 1 },
		{ col: 12, row: 1, size_x: 1, size_y: 1 },
		{ col: 13, row: 1, size_x: 1, size_y: 1 },
		{ col: 14, row: 1, size_x: 1, size_y: 1 },
		{ col: 15, row: 1, size_x: 1, size_y: 1 },
		{ col: 16, row: 1, size_x: 1, size_y: 1 },
		{ col: 17, row: 1, size_x: 1, size_y: 1 },
		{ col: 18, row: 1, size_x: 1, size_y: 1 },
		{ col: 19, row: 1, size_x: 1, size_y: 1 },
		{ col: 20, row: 1, size_x: 1, size_y: 1 },
		{ col: 21, row: 1, size_x: 1, size_y: 1 },
		{ col: 22, row: 1, size_x: 1, size_y: 1 },
		{ col: 23, row: 1, size_x: 1, size_y: 1 },
		{ col: 24, row: 1, size_x: 1, size_y: 1 },
		{ col: 25, row: 1, size_x: 1, size_y: 1 },
		{ col: 26, row: 1, size_x: 1, size_y: 1 },
		{ col: 27, row: 1, size_x: 1, size_y: 1 },
		{ col: 28, row: 1, size_x: 1, size_y: 1 },
		{ col: 29, row: 1, size_x: 1, size_y: 1 },
		{ col: 30, row: 1, size_x: 1, size_y: 1 }
	];
	$('#add_div').on('click', function(e, i) {
		e.preventDefault();

		if ($('.gs_w[data-row="1"]').attr('data-sizey') == '1') {
			console.log("cant do it");
		}
		else {
			var firstRowDivider = maxCol('.gridster li[data-row="1"]');
				firstRowDivider = $('.gridster li[data-row="1"][data-col="'+firstRowDivider+'"]').attr('id');
				firstRowDivider = firstRowDivider.replace('li', '');

			$('.gridster li').each(function() {
				var addDividerGetDataID = $(this).map(function() {
					return $(this).data('id');
				}).get();
				var addDividerRefineArray = $.map(addDividerGetDataID, function(n) {
					return n <= firstRowDivider ? n + 0 : null;
				});

				// moves chart down before adding in new row
				$('.gridster li').each(function() {
					var rowDividerGetDataID = $(this).data('id');
					for (i = 0; i < addDividerRefineArray.length; i++) {
						if (addDividerRefineArray[i] == rowDividerGetDataID) {
							var addDividerGetUpdateID = '#li'+rowDividerGetDataID;
							grid_canvas.move_widget_down($(addDividerGetUpdateID), 1);
							$(this).removeData('id');
						}
					}
				});
			});

			$.each(dividers, function(i, widget){
				grid_canvas.add_widget('<li class="divider blocking"></li>', this.size_x, this.size_y, this.col, this.row);

				resetIDs();
				setColumns();
				dataClass();
				dataID();
			});

		}
	});

	////// Nav BTN Unlock State Variables /////////////////////////////////////////////////////

	var saftyZones = $(".gridster ul, #nameBank");
	var level2 = $("#nameBank");

	// This is a variable to determine if the given event handler is active or
	// disabled. This will be used by the event handler for conditional execution.
	var isHandlerActive = false;

	////// Changing Tile States ///////////////////////////////////////////////////////////////

	// Bind the trigger link to show the modal window.
	$("#edit_tile").click(function(event) {

		var tileGrabber = $('.gridster .gs_w.tile');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		tileGrabber.addClass('tile_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-edit').addClass('icon-working');

		// Now that modal window is shown, we need to activate its event handler.
		isHandlerActive = true;
		// Prevent default.
		event.preventDefault();
	});

	////// Cycle Through Tile Types ///////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.tile.tile_unlocked', function(){
		// switch from blocking to box for the chart tiles
		if ($(this).hasClass('blocking')) {
			$(this).addClass('box').append('<div class="nameBox"></div>');
			$(this).removeClass('blocking');
		}
		// switch from box to thru for the chart tiles
		else if ($(this).hasClass('box')) {
			$(this).addClass('thru');
			$(this).removeClass('box').empty();
		}
		// switch from thru to blocking for the chart tiles
		else {
			$(this).addClass('blocking');
			$(this).removeClass('thru');
		}
	});

	////// Changing Tile Type /////////////////////////////////////////////////////////////////

	// Bind the trigger link to show the modal window.
	$("#type_switch").click(function(event) {

		var tileGrabber = $('.gridster .gs_w.tile');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		tileGrabber.addClass('type_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-edit').addClass('icon-working');

		// Now that modal window is shown, we need to activate its event handler.
		isHandlerActive = true;
		// Prevent default.
		event.preventDefault();
	});

	////// Cycle Through Types Varieties //////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.tile.type_unlocked', function(){
		// switch from box to thru for the chart tiles
		if ($(this).hasClass('department')) {
			$(this).addClass('pt');
			$(this).removeClass('department');
		}
		// switch from box to thru for the chart tiles
		else if ($(this).hasClass('pt')) {
			$(this).addClass('contractor');
			$(this).removeClass('pt');
		}
		// switch from thru to blocking for the chart tiles
		else if ($(this).hasClass('contractor')) {
			$(this).removeClass('contractor');
		}
		// switch from blocking to box for the chart tiles
		else {
			$(this).addClass('department');
		}
	});

	////// Changing Divider States ////////////////////////////////////////////////////////////

	$("#edit_divider").click(function(event) {

		var dividerGrabber = $('.gridster .gs_w.divider');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		dividerGrabber.addClass('divider_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-edit').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Cycle Through Divider Types ////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.divider.divider_unlocked', function(){
		// switch from blocking to thru for the chart dividers
		if ($(this).hasClass('blocking')) {
			$(this).addClass('thru');
			$(this).removeClass('blocking');
		}
		// switch from thru to reachRight for the chart dividers
		else if ($(this).hasClass('thru')) {
			$(this).addClass('reachRight');
			$(this).removeClass('thru');
		}
		// switch from reachRight to full for the chart dividers
		else if ($(this).hasClass('reachRight')) {
			$(this).addClass('full');
			$(this).removeClass('reachRight');
		}
		// switch from full to reachLeft for the chart dividers
		else if ($(this).hasClass('full')) {
			$(this).addClass('reachLeft');
			$(this).removeClass('full');
		}
		// switch from reachLeft to blocking for the chart dividers
		else {
			$(this).addClass('blocking');
			$(this).removeClass('reachLeft');
		}
	});

	////// Remove the Down Connector //////////////////////////////////////////////////////////

	$("#add_nope").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('nope_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-nope').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Nope Action ////////////////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster .nope_unlocked.gs_w', function(){
		$(this).toggleClass('nope');
	});

	////// Name That Block ////////////////////////////////////////////////////////////////////

	$("#add_name").click(function(event) {

		var nameTileGrabber = $('.gridster .gs_w.tile.box:not(.name_placed)');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		nameTileGrabber.addClass('name_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-name').addClass('icon-working');
		$('.remover').show();
	
		isHandlerActive = true;

		event.preventDefault();
	});

	////// Put a Name On It ///////////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster .tile.gs_w.box', function(event) {

		if ($('.gridster .tile.gs_w.box').hasClass('name_unlocked')) {
			
			var chartID = $('.gridster');
			var namerHider = $('.headerHider .nameShield');

			level2.show();
			$('.gridster li').removeClass('name_holder');
			$(this).addClass('name_holder');
			chartID.addClass('activeChart').removeClass('passiveChart');
			chartID.prepend('<div class="gridShield"></div>');
			namerHider.remove();

			isHandlerActive = true;
			event.preventDefault();
		}
	});

	// Add in name
	$(document).on('click', 'input[type=\'radio\'].radioBtnClass', function(){
		var lablr = $(this).attr('value');
		var named = $(this).attr('name');

		$('.gridster .gs_w.tile.box.name_unlocked.name_holder .nameBox').append('<span class="remover icon-remove" data-tilename="'+lablr+'"></span><span>'+named+'</span>');
		$('.gridster .gs_w.tile.box.name_unlocked.name_holder').addClass('name_placed').attr('data-tilename', lablr).removeClass('name_holder');

		if($('.gridster .gs_w.tile.box.name_unlocked.name_holder')) {

			$(this).attr("disabled", true);
			$(this).parent().addClass('used');
		}

		$('.gridster .gridShield').remove();
		$('.headerHider').prepend('<div class="nameShield"></div>');
	});

	// remove name
	$(document).on('click', '.gs_w.tile.box.name_placed .nameBox .remover', function(event){
		
		if ($(this).attr('data-tilename')){

			var findval = $(this).attr('data-tilename');

			var theInput = ("input[value=" + findval + "].radioBtnClass");
			var theBlock = ("li[data-tilename=" + findval + "].gs_w.box.name_placed");

			$(theInput).prop('checked', false).removeAttr('disabled');
			$(theInput).parent().removeClass('used');
			$(theBlock).empty().append('<div class="nameBox"></div>');
			$(theBlock).removeClass('name_placed').addClass('name_unlocked').removeAttr('data-tilename');

		}
	});

	////// Add in a Double Block Spanner //////////////////////////////////////////////////////

	$("#add_span2").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('span2_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-hop').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Cycle Through 2x Spanner States ////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.span2_unlocked', function(){
		event.preventDefault();

		var spannerBuildID = $(this).attr('id');
			spannerBuildID = spannerBuildID.replace('li', '');
			spannerBuildID = parseInt(spannerBuildID);
		
		var spannerBuildClick = '#li' +spannerBuildID;

		var toBeRemoved = spannerBuildID + 1;
			toBeRemoved = '#li' +toBeRemoved;
		
		var toBeAdded = spannerBuildID + 1;
			toBeAdded = 'li' +toBeAdded;

		var doubledPush = $(spannerBuildClick).css('left');
			doubledPush = doubledPush.replace('px', '');
			doubledPush = parseInt(doubledPush) + 70;
		var inlinePush = doubledPush+ 'px';

		var clickClass = $(spannerBuildClick).attr('class');
			clickClass = clickClass.replace(' gs_w', '');
			clickClass = clickClass.replace(' doubled', '');

		var clickCol = $(spannerBuildClick).attr('data-col');
			clickCol = parseInt(clickCol) + 1;

		var clickRow = $(spannerBuildClick).attr('data-row');
			clickRow = parseInt(clickRow);

		var clickXsize = $(spannerBuildClick).attr('data-sizex');
			clickXsize = parseInt(clickXsize);

		var clickYsize = $(spannerBuildClick).attr('data-sizey');
			clickYsize = parseInt(clickYsize);

		// Remove Spanner
		if ($(this).hasClass('doubled')) {

			$(this).removeAttr('style').css('display', 'list-item').removeAttr('data-spanpush');

			var addedTileDataClass = $(spannerBuildClick).attr('class');
				addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
				addedTileDataClass = addedTileDataClass.replace(' doubled', '');
			$(spannerBuildClick).attr('data-class', addedTileDataClass);

			if ($(this).hasClass('tile')) {

				var widgetsTile = [
					['<li class="'+clickClass+'" id="'+toBeAdded+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsTile, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $("#"+toBeAdded).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
						addedTileDataClass = addedTileDataClass.replace(' doubled', '');
					$("#"+toBeAdded).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}
			else {
				var widgetsDivider = [
					['<li class="'+clickClass+'" id="'+toBeAdded+'"></li>', clickXsize, clickYsize, clickCol, clickRow]
				];
				$.each(widgetsDivider, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $("#"+toBeAdded).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
						addedTileDataClass = addedTileDataClass.replace(' doubled', '');
					$("#"+toBeAdded).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}

			$('.gridster ul').each(function () {
				$(this).find("#"+toBeAdded).insertAfter($(this).find(spannerBuildClick));
			});
			$(spannerBuildClick).removeClass('doubled');

		}

		// Create Spanner
		else {

			grid_canvas.remove_widget($(toBeRemoved), true, function(){
				$(spannerBuildClick).addClass('doubled').css({'display': 'list-item', 'left': inlinePush}).attr('data-spanpush', doubledPush);

				var addedTileDataClass = $(spannerBuildClick).attr('class');
					addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
				$(spannerBuildClick).attr('data-class', addedTileDataClass);

				if ($(spannerBuildClick).hasClass('tile')) {
					$(this).addClass('box').removeClass('blocking');

					var addedTileDataClass = $(spannerBuildClick).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span2_unlocked', '');
					$(spannerBuildClick).attr('data-class', addedTileDataClass);
				}
			});

		}
	});

	////// Add in a Tripled Block Spanner //////////////////////////////////////////////////////

	$("#add_span3").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('span3_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-hop').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Cycle Through 3x Spanner States ////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.span3_unlocked', function(){
		event.preventDefault();

		var spannerBuildID = $(this).attr('id');
			spannerBuildID = spannerBuildID.replace('li', '');
			spannerBuildID = parseInt(spannerBuildID);
		
		var spannerBuildClick = '#li' +spannerBuildID;

		var toBeRemovedRight = spannerBuildID + 1;
			toBeRemovedRight = '#li' +toBeRemovedRight;

		var toBeRemovedLeft = spannerBuildID - 1;
			toBeRemovedLeft = '#li' +toBeRemovedLeft;
		
		var toBeAddedRight = spannerBuildID + 1;
			toBeAddedRight = 'li' +toBeAddedRight;

		var toBeAddedLeft = spannerBuildID - 1;
			toBeAddedLeft = 'li' +toBeAddedLeft;

		var tripledPush = $(spannerBuildClick).css('left');
			tripledPush = tripledPush.replace('px', '');
			tripledPush = parseInt(tripledPush);

		var clickClass = $(spannerBuildClick).attr('class');
			clickClass = clickClass.replace(' gs_w', '');

		var clickCol = $(spannerBuildClick).attr('data-col');
			clickCol = parseInt(clickCol);

		var clickColRight = parseInt(clickCol) + 1;
		var clickColLeft = parseInt(clickCol) - 1;

		var clickRow = $(spannerBuildClick).attr('data-row');
			clickRow = parseInt(clickRow);

		var clickXsize = $(spannerBuildClick).attr('data-sizex');
			clickXsize = parseInt(clickXsize);

		var clickYsize = $(spannerBuildClick).attr('data-sizey');
			clickYsize = parseInt(clickYsize);

		// change to single right
		if ($(this).hasClass('tripled') && $(this).hasClass('center')) {
			var TpushRight = tripledPush + 70;
			var inlineTpushRight = TpushRight+ 'px';

			$(spannerBuildClick).addClass('right').removeClass('center').css({'display': 'list-item', 'left': inlineTpushRight}).attr('data-spanpush', TpushRight);
			
			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
		}

		// change to single Left
		else if ($(this).hasClass('tripled') && $(this).hasClass('right')) {
			var TpushLeft = tripledPush - 140;
			var inlineTpushLeft = TpushLeft+ 'px';

			$(spannerBuildClick).removeAttr('style').addClass('left').removeClass('right').css({'display': 'list-item', 'left': inlineTpushLeft}).attr('data-spanpush', TpushLeft);

			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
		}

		// change to doubled
		else if ($(this).hasClass('tripled') && $(this).hasClass('left')) {
			var TpushLeft1st = tripledPush;
			var inlineTpushLeft1st = TpushLeft1st+ 'px';

			var TpushLeft2nd = tripledPush + 140;
			var inlineTpushLeft2nd = TpushLeft2nd+ 'px';

			$(spannerBuildClick).removeAttr('style').addClass('first').removeClass('left').css({'display': 'list-item', 'left': inlineTpushLeft1st}).attr('data-spanpush', TpushLeft1st);
			
			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);

			if ($(this).hasClass('tile')) {

				var widgetsTile3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedRight+'"></li>', clickXsize, clickYsize, clickColRight, clickRow]
				];
				$.each(widgetsTile3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeAttr('style').addClass('second').removeClass('left first').css({'display': 'list-item', 'left': inlineTpushLeft2nd}).attr('data-spanpush', TpushLeft2nd);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $(toBeRemovedRight).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedRight).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);

				});
			}

			else {
				var widgetsDivider3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedRight+'"></li>', clickXsize, clickYsize, clickColRight, clickRow]
				];
				$.each(widgetsDivider3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeAttr('style').addClass('second').removeClass('left first').css({'display': 'list-item', 'left': inlineTpushLeft2nd}).attr('data-spanpush', TpushLeft2nd);

					var addedTileDataID = spannerBuildID + 1;
					var addedTileDataClass = $(toBeRemovedRight).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedRight).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);

				});
			}
			
			$('.gridster ul').each(function () {
				$(this).find("#"+toBeAddedRight).insertAfter($(this).find(spannerBuildClick));
			});
		}

		// back to default
		else if ($(this).hasClass('tripled') && $(this).hasClass('first')) {
			$(spannerBuildClick).removeAttr('style').removeAttr('data-spanpush').removeClass('tripled first').css('display', 'list-item');
			$(toBeRemovedRight).removeAttr('style').removeAttr('data-spanpush').removeClass('tripled second').css('display', 'list-item');

			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			var dataClassUpdate2nd = $(toBeRemovedRight).attr('class');
				dataClassUpdate2nd = dataClassUpdate2nd.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
			$(toBeRemovedRight).attr('data-class', dataClassUpdate2nd);

			if ($(this).hasClass('tile')) {

				var widgetsTile3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedLeft+'"></li>', clickXsize, clickYsize, clickColLeft, clickRow]
				];
				$.each(widgetsTile3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeClass('tripled first');

					var addedTileDataID = spannerBuildID - 1;
					var addedTileDataClass = $(toBeRemovedLeft).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedLeft).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}

			else {
				var widgetsDivider3 = [
					['<li class="'+clickClass+'" id="'+toBeAddedLeft+'"></li>', clickXsize, clickYsize, clickColLeft, clickRow]
				];
				$.each(widgetsDivider3, function(i, widget){
					grid_canvas.add_widget.apply(grid_canvas, widget).removeClass('tripled first');

					var addedTileDataID = spannerBuildID - 1;
					var addedTileDataClass = $(toBeRemovedLeft).attr('class');
						addedTileDataClass = addedTileDataClass.replace(' span3_unlocked', '');
					$(toBeRemovedLeft).attr('data-truerow', clickRow).attr('data-class', addedTileDataClass).attr('data-id', addedTileDataID);
				});
			}

			$('.gridster ul').each(function () {
				$(this).find("#"+toBeAddedLeft).insertBefore($(this).find(spannerBuildClick));
			});
			
		}

		// Add single centered
		else {
			grid_canvas.remove_widget($(toBeRemovedRight), true);
			grid_canvas.remove_widget($(toBeRemovedLeft), true);
			$(spannerBuildClick).addClass('tripled center');
			
			var dataClassUpdate = $(spannerBuildClick).attr('class');
				dataClassUpdate = dataClassUpdate.replace(' span3_unlocked', '');
			$(spannerBuildClick).attr('data-class', dataClassUpdate);
		}
	});

	////// Add in Chart Half Step //////////////////////////////////////////////////////////////

	$("#half_step").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('halfStep_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-add').addClass('icon-working');

		isHandlerActive = true;
		
		event.preventDefault();
	});

	////// Half Step Add Action ///////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.halfStep_unlocked', function() {

		var currentClick = $(this).attr('data-row');
			currentClick = parseInt(currentClick);
		var currentFirstRow = maxCol('.gridster li[data-row="'+currentClick+'"]');
			currentFirstRow = $('.gridster li[data-row="'+currentClick+'"][data-col="'+currentFirstRow+'"]').attr('id');
			currentFirstRow = currentFirstRow.replace('li', '');

		$('.gridster li[data-row="'+currentClick+'"]').addClass('stepped');
		var connectorUpdate = $('.stepped').attr('class');
			connectorUpdate = $('.stepped').attr('data-class', connectorUpdate);

		$('.gridster').prepend('<div class="gridShield"></div>');
					
		// moves chart down before adding in new row
		$('.gridster li').each(function() {
			var insertTileValueGet = $(this).map(function() {
				return $(this).data('id');
			}).get();

			var refinedArray = $.map(insertTileValueGet, function(n) {
				return n <= currentFirstRow ? n + 0 : null;
			});

			$('.gridster li').each(function() {
				var rowDataGet = $(this).data('id');
				for (i = 0; i < refinedArray.length; i++) {
					if (refinedArray[i] == rowDataGet) {
						var insertRowUpdate = '#li'+rowDataGet;
						var insertRowGrabber = $(insertRowUpdate).attr('data-row');
							insertRowGrabber = parseInt(insertRowGrabber, 10) - 3;

						$(this).attr('data-row', insertRowGrabber);
						$(this).attr('data-truerow', insertRowGrabber);
						grid_canvas.register_widget($(insertRowUpdate));

						$(this).removeData('id');
					}
				}
			});
		});

		var chartHeightUpdate = $('.gridster ul').height();
			chartHeightUpdate = parseInt(chartHeightUpdate, 10) - 45;
			chartHeightUpdate = chartHeightUpdate+'px';
		$('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': chartHeightUpdate});
		setSpans();
	});

	////// Add in Chart Half Step //////////////////////////////////////////////////////////////

	$("#half_stepRemove").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('halfStepRemove_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-remove').addClass('icon-working');

		isHandlerActive = true;
		
		event.preventDefault();
	});

	////// Half Step Remove Action ////////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.halfStepRemove_unlocked', function() {

		var currentClick = $(this).attr('data-row');
			currentClick = parseInt(currentClick);
		var currentFirstRow = maxCol('.gridster li[data-row="'+currentClick+'"]');
			currentFirstRow = $('.gridster li[data-row="'+currentClick+'"][data-col="'+currentFirstRow+'"]').attr('id');
			currentFirstRow = currentFirstRow.replace('li', '');

		$('.stepped').removeClass('stepped');
		var connectorRemove = $('.gridster li[data-row="'+currentClick+'"]').attr('class');
			connectorRemove = $('.gridster li[data-row="'+currentClick+'"]').attr('data-class', connectorRemove);

		$('.gridster').prepend('<div class="gridShield"></div>');
					
		// moves chart down before adding in new row
		$('.gridster li').each(function() {
			var insertTileValueGet = $(this).map(function() {
				return $(this).data('id');
			}).get();

			var refinedArray = $.map(insertTileValueGet, function(n) {
				return n <= currentFirstRow ? n + 0 : null;
			});

			$('.gridster li').each(function() {
				var rowDataGet = $(this).data('id');
				for (i = 0; i < refinedArray.length; i++) {
					if (refinedArray[i] == rowDataGet) {
						var insertRowUpdate = '#li'+rowDataGet;
						var insertRowGrabber = $(insertRowUpdate).attr('data-row');
							insertRowGrabber = parseInt(insertRowGrabber, 10) + 3;

						$(this).attr('data-row', insertRowGrabber);
						$(this).attr('data-truerow', insertRowGrabber);

						$(this).removeData('id');
					}
				}
			});
		});
		setSpans();

		var chartHeightUpdate = $('.gridster ul').height();
			chartHeightUpdate = parseInt(chartHeightUpdate, 10) + 45;
			chartHeightUpdate = chartHeightUpdate+'px';
		$('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': chartHeightUpdate});
	});
	
	////// Add in Connector ////////////////////////////////////////////////////////////////////

	$("#tile_connectors").click(function(event) {

		var dividerGrabber = $('.gridster .gs_w.tile');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		dividerGrabber.addClass('connectors_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-connector').addClass('icon-working');

		isHandlerActive = true;

		event.preventDefault();
	});

	////// Changing Connector States //////////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.connectors_unlocked', function(){
		// switch from thru to reachRight for the chart tile
		if ($(this).hasClass('box')) {

			
			// switch from reachRight to full for the chart tile
			if ($(this).hasClass('reachRight')) {
				$(this).addClass('reachLeft');
				$(this).removeClass('reachRight');
			}
			// switch from full to reachLeft for the chart tile
			else if ($(this).hasClass('reachLeft')) {
				$(this).addClass('full jumbo');
				$(this).removeClass('reachLeft');
			}
			// switch from full to reachLeft for the chart tile
			else if ($(this).hasClass('full')) {
				$(this).removeClass('full jumbo connector');
			}
			else {
				$(this).addClass('reachRight connector');
			}
		}
		else {
			if ($(this).hasClass('blocking')) {
				$(this).addClass('reachRight connector');
				$(this).removeClass('blocking');
			}
			// switch from reachRight to full for the chart tile
			else if ($(this).hasClass('reachRight')) {
				$(this).addClass('full');
				$(this).removeClass('reachRight');
			}
			// switch from full to reachLeft for the chart tile
			else if ($(this).hasClass('full')) {
				$(this).addClass('reachLeft');
				$(this).removeClass('full');
			}
			// switch from reachLeft to blocking for the chart tile
			else {
				$(this).addClass('blocking');
				$(this).removeClass('reachLeft connector');
			}
		}
	});

	////// Add in a Row ////////////////////////////////////////////////////////////////////////

	$("#insert_tile").click(function(event) {

		var grabber = $('.gridster .gs_w');
		var clickedID = $(this).attr('id');
			clickedID = '#'+ clickedID;
		var navBTN = $(clickedID);
		var navBTNicon = $(clickedID+' span');

		grabber.addClass('insertTile_unlocked');
		navBTN.addClass('active');
		navBTNicon.removeClass('icon-insert_block').addClass('icon-working');

		isHandlerActive = true;
		
		event.preventDefault();
	});

	////// Cycle Through 3x Spanner States ////////////////////////////////////////////////////

	$(document).on('click', '.gridster li.gs_w.insertTile_unlocked', function() {

		var Xgrabber = $(this).attr('data-sizex');
		var Ygrabber = $(this).attr('data-sizey');
		var currentClick = $(this).attr('data-row');
			currentClick = parseInt(currentClick);

		var currentFirstRow = maxCol('.gridster li[data-row="'+currentClick+'"]');
			currentFirstRow = $('.gridster li[data-row="'+currentClick+'"][data-col="'+currentFirstRow+'"]').attr('id');
			currentFirstRow = currentFirstRow.replace('li', '');

		var insertionPoint = parseInt(currentFirstRow) + 1;

		$('.gridster').prepend('<div class="gridShield"></div>');
		
		$('.gridster li[data-row="'+currentClick+'"]').each(function() {
			$(this).addClass('insertAfter');
			var rebuildSpan = $(this).attr('data-spanpush');
			var rebuildID = $(this).attr('id');
			var rebuildCol = $(this).attr('data-col');
			var rebuildClass = $(this).attr('class');
				rebuildClass = rebuildClass.replace(' name_placed', '');
				rebuildClass = rebuildClass.replace(' nope', '');
				rebuildClass = rebuildClass.replace(' insertAfter', '');

			var widgetsXetraTile = [
				['<li class="insertedRow '+rebuildClass+'" data-truerow="'+currentClick+'" data-spanpush="'+rebuildSpan+'"></li>', Xgrabber, Ygrabber, rebuildCol, currentClick]
			];

			$.each(widgetsXetraTile, function(i, widget){
				grid_canvas.add_widget.apply(grid_canvas, widget).insertBefore('#li'+insertionPoint);
				$('.gridster li.insertedRow').each(function(i) {
					i = i + 1;
					$(this).attr('id', 'ar' + i);
				});

			});
		});

		// moves chart down before adding in new row
		$('.gridster li').each(function() {
			var insertTileValueGet = $(this).map(function() {
				return $(this).data('id');
			}).get();

			var refinedArray = $.map(insertTileValueGet, function(n) {
				// return n > currentClick ? n + 0 : null;
				return n <= currentFirstRow ? n + 0 : null;
			});

			$('.gridster li').each(function() {
				var rowDataGet = $(this).data('id');
				for (i = 0; i < refinedArray.length; i++) {
					if (refinedArray[i] == rowDataGet) {
						var insertRowUpdate = '#li'+rowDataGet;
						grid_canvas.move_widget_down($(insertRowUpdate), 5);

						$(this).removeData('id');
					}
				}
			});
		});

		if ($('.gridster li[data-row="'+currentClick+'"]').hasClass('box')) {
			$('.gridster li[data-row="'+currentClick+'"]').append('<div class="nameBox"></div>');
		}

		var chartHeight = $('.gridster ul').height();
			chartHeight = parseInt(chartHeight) + 75;
			chartHeight = chartHeight+'px';
		$('.gridster ul').removeAttr('style').css('height', chartHeight);

		var insertedRow = $('.insertedRow').map(function(i) { return this.id; });
			insertedRow = insertedRow.get();
		var insertAfter = $('.insertAfter').map(function(i) { return this.id; });
			insertAfter = insertAfter.get();

		$('.gridster ul').each(function () {
			$(this).find("#"+insertedRow).insertAfter($(this).find("#"+insertAfter));
		});
		$('.gridster li').removeClass('insertAfter insertedRow');
		$('.gridster ul').each(function () {
			$(this).find("#ar1").insertBefore($(this).find("#ar2"));
		});

	});

	////// Remove a Row ////////////////////////////////////////////////////////////////////////

	// $("#remove_block").click(function(event) {

	// 	var grabber = $('.gridster .gs_w');
	// 	var clickedID = $(this).attr('id');
	// 		clickedID = '#'+ clickedID;
	// 	var navBTN = $(clickedID);
	// 	var navBTNicon = $(clickedID+' span');

	// 	grabber.addClass('removeTile_unlocked');
	// 	navBTN.addClass('active');
	// 	navBTNicon.removeClass('icon-remove_block').addClass('icon-working');

	// 	isHandlerActive = true;
		
	// 	event.preventDefault();
	// });

	//// Cycle Through 3x Spanner States ////////////////////////////////////////////////////

	// $(document).on('click', '.gridster li.gs_w.removeTile_unlocked', function() {
	// 	var Xgrabber = $(this).attr('data-sizex');
	// 	var Ygrabber = $(this).attr('data-sizey');
	// 	var currentClick = $(this).attr('data-row');
	// 		currentClick = parseInt(currentClick);

	// 	var currentFirstRow = maxCol('.gridster li[data-row="'+currentClick+'"]');
	// 		currentFirstRow = $('.gridster li[data-row="'+currentClick+'"][data-col="'+currentFirstRow+'"]').attr('id');
	// 		currentFirstRow = currentFirstRow.replace('li', '');

	// 	var insertionPoint = parseInt(currentFirstRow) + 1;

	// 	$('.gridster').prepend('<div class="gridShield"></div>');
		
	// 	$('.gridster li[data-row="'+currentClick+'"]').each(function() {
	// 		var rebuildID = $(this).attr('id');

	// 		grid_canvas.remove_widget($('#'+rebuildID), true);
	// 	});

	// 	// moves chart down before adding in new row
	// 	// $('.gridster li').each(function() {
	// 	// 	var insertTileValueGet = $(this).map(function() {
	// 	// 		return $(this).data('id');
	// 	// 	}).get();

	// 	// 	var refinedArray = $.map(insertTileValueGet, function(n) {
	// 	// 		// return n > currentClick ? n + 0 : null;
	// 	// 		return n <= currentFirstRow ? n + 0 : null;
	// 	// 	});

	// 	// 	$('.gridster li').each(function() {
	// 	// 		var rowDataGet = $(this).data('id');
	// 	// 		for (i = 0; i < refinedArray.length; i++) {
	// 	// 			if (refinedArray[i] == rowDataGet) {
	// 	// 				var insertRowUpdate = '#li'+rowDataGet;
	// 	// 				grid_canvas.move_widget_up($(insertRowUpdate), 5);

	// 	// 				$(this).removeData('id');
	// 	// 			}
	// 	// 		}
	// 	// 	});
	// 	// });

	// 	// $('.gridster li[data-row="-10"]').attr('data-row', '1');

	// 	// var chartHeight = $('.gridster ul').height();
	// 	// 	chartHeight = parseInt(chartHeight) - 75;
	// 	// 	chartHeight = chartHeight+'px';
	// 	// $('.gridster ul').removeAttr('style').css('height', chartHeight);
	// });

	////// Step Out of Line ///////////////////////////////////////////////////////////////////

	// Bind a mouseUp event on the document so that we can close the modal window when it is open.
	$(document).on("mousedown", function() {
		// Check to see if this event handler is "active". If it is not, then exit.
		if (!isHandlerActive) {
			return;
		}

		var grabber = $('.gridster .gs_w');
		var tileGrabber = $('.gridster .gs_w.tile');
		var dividerGrabber = $('.gridster .gs_w.divider');
		var nameTileGrabber = $('.gridster .gs_w.tile.box');

		var activeID = $(this).find("button.active").attr('id');
			activeID = '#'+ activeID;
		var navActiveBTN = $(activeID);
		var navActiveBTNicon = $(activeID+' span');

		var chartID = $('.gridster');
		var gridShield = $('.gridster .gridShield');
		var namerShield = $('.headerHider');

		// remove edit tile
		if (activeID == '#edit_tile') {
			tileGrabber.removeClass('tile_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("tiles locked.");
		}

		// remove edit divider
		if (activeID == '#edit_divider') {
			dividerGrabber.removeClass('divider_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("dividers locked.");
		}

		// remove edit tile type
		if (activeID == '#type_switch') {
			tileGrabber.removeClass('type_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-edit');
			navActiveBTN.removeClass('active');

			console.log("tile type locked.");
		}

		// remove add nope
		if (activeID == '#add_nope') {
			grabber.removeClass('nope_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-nope');
			navActiveBTN.removeClass('active');

			console.log("nope locked.");
		}

		// remove add name
		if (activeID == '#add_name') {
			nameTileGrabber.removeClass('name_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-name');
			navActiveBTN.removeClass('active');
			$('.remover').hide();

			console.log("names locked.");
		}

		// remove name card
		if (chartID.hasClass('activeChart')) {
			nameTileGrabber.removeClass('name_holder');
			level2.hide();
			chartID.addClass('passiveChart').removeClass('activeChart');
			gridShield.remove();
			namerShield.prepend('<div class="nameShield"></div>');

			console.log("name place locked.");
		}

		// remove 2x spanner
		if (activeID == '#add_span2') {
			grabber.removeClass('span2_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-hop');
			navActiveBTN.removeClass('active');

			console.log("double locked.");
		}

		// remove 3x spanner
		if (activeID == '#add_span3') {
			grabber.removeClass('span3_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-hop');
			navActiveBTN.removeClass('active');

			console.log("tripled locked.");
		}

		// remove add half step row
		if (activeID == '#half_step') {
			$('.gridShield').remove();
			grabber.removeClass('halfStep_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-add');
			navActiveBTN.removeClass('active');

			console.log("add half step locked.");
		}

		/// remove remove half step row
		if (activeID == '#half_stepRemove') {
			$('.gridShield').remove();
			grabber.removeClass('halfStepRemove_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-remove');
			navActiveBTN.removeClass('active');

			console.log("remove half step locked.");
		}

		/// remove remove half step row
		if (activeID == '#tile_connectors') {
			$('.gridShield').remove();
			grabber.removeClass('connectors_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-connector');
			navActiveBTN.removeClass('active');

			console.log("remove connector locked.");
		}

		// remove insert row
		if (activeID == '#insert_tile') {
			$('.gridShield').remove();
			grabber.removeClass('insertTile_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-insert_block');
			navActiveBTN.removeClass('active');

			console.log("insert a tile row locked.");
		}

		// remove remove row
		if (activeID == '#remove_block') {
			$('.gridShield').remove();
			grabber.removeClass('removeTile_unlocked');
			navActiveBTNicon.removeClass('icon-working').addClass('icon-remove_block');
			navActiveBTN.removeClass('active');

			console.log("remove a tile row locked.");
		}

		// Now that the modal window is hidden, we need to disable its event handler.
		isHandlerActive = false;
	});

	////// Safty Zones ////////////////////////////////////////////////////////////////////////

	saftyZones.on("mousedown", function(event) {
		return false;
	});

	////// Save Out Progress For Later Use ////////////////////////////////////////////////////

	$('#archive').on('click', function(e, i) {
		e.preventDefault();

		var positions = JSON.stringify(grid_canvas.serialize());
		var blockPositions = $($("style")[1]).html();

		$('.jsonCopy, .cssPos').remove();
		$('.demo').after('<div class="cssPos"></div>');
		$('.cssPos').after('<div class="jsonCopy" /div>');
		$('.cssPos').html(blockPositions).before('<h2 class="printoutHeader">CSS Placement For Maintenance</h2>');
		$('.jsonCopy').html(positions).before('<h2 class="printoutHeader">JSON Output For Maintenance</h2>');

		$('.jsonCopy').contents().filter(function() {
			return this.nodeType == Node.TEXT_NODE && this.nodeValue.indexOf('undefined') >= 0;
		}).each(function() {
			this.nodeValue = this.nodeValue.replace(/\undefined\b/g, "dead");
		});

		$(".jsonCopy").text(function () {
			return $(this).text().replace("[", "var json = [");
		});
		$(".jsonCopy").text(function () {
			return $(this).text().replace("}]", "}];");
		});

		$('#tidy').prop("disabled", false);
		
		$('.gridster li').each(function() {
			var deadName = $(this).attr('data-tilename');

			if (deadName == 'undefined') {
				$(this).attr('data-tilename', 'dead');
			}
			else { return }
		});

		$('.gridster li').each(function() {
			var deadSpan = $(this).attr('data-spanpush');

			if (deadSpan == 'undefined') {
				$(this).attr('data-spanpush', 'dead');
			}
			else { return }
		});
	});

	////// Tidy Up For Deployment /////////////////////////////////////////////////////////////

	$('#tidy').on('click', function(e, i) {
		e.preventDefault();
		$('.printoutHeader, .cssPos, .jsonCopy').remove();

		$("head").append('<style type="text/css" id="spannerOffset"></style>');
		$("head").append('<style type="text/css" id="refinedPositioning"></style>');

		grid_canvas.remove_widget($('.gridster li.blocking'), true, function(){
			resetIDs();
			dataID();
			// var reHeight = $('.gridster ul').height();
			// 	reHeight = reHeight+'px';
			// $('.gridster ul').removeAttr('style').css({'position': 'relative', 'height': reHeight});
			// $('#deployr').prop("disabled", false);
		});

		$('.gridster li').removeClass('name_placed');
		$('#deployr').prop("disabled", false);
	});

	////// Deploy That shit Son ///////////////////////////////////////////////////////////////

	$('#deployr').on('click', function(e, i) {
		e.preventDefault();

		$(".gridster li").each(function(i) {
			var titlePuller = $(this).attr('data-tilename');
			if (titlePuller == 'dead') { return }
			else {
				$('.gridster li[data-tilename="'+titlePuller+'"]').removeAttr('id').attr('id', titlePuller);
			}
			$(this).removeAttr('data-tilename');

		});

		$('.gridster li[id^="li"]').each(function(i) {
			var idChecker = $(this).attr('id');
			$('#'+idChecker).addClass('tweakIDs');
			
			$('.gridster li.tweakIDs').each(function(i) {
				i = i + 1;
				$(this).attr('id', 'gs_w' + i);
			});
		});

		$('.gridster li').removeClass('tweakIDs');

		$(".gridster li").each(function(i) {
			var spannerPuller = $(this).attr('data-spanpush');
			if (spannerPuller == 'dead') {
				$(this).removeAttr('data-spanpush');
			}
			else {
				$('.gridster li[data-spanpush="'+spannerPuller+'"]').each(function(i) {
					var collectedIDs = $(this).attr('id');
					$('#spannerOffset').append('#'+collectedIDs+' { left: '+spannerPuller+'px; }');
				});
			}
			$(this).removeAttr('data-spanpush').css('display', 'list-item');
		});

		$('.gridster li').each(function() {
			var item = $(this);
			var ID = item.attr('id');
			var position = item.position();
			var height = item.height();
			var width = item.width();

			$('#refinedPositioning').append('#'+ID+' { height: '+height+'px; width: '+width+'px; left: '+position.left+'px; top: '+position.top+'px; }');
		});

		$('#_gridster_auto_css, #spannerOffset').remove();
		$('.gridster li').removeAttr('data-truerow').removeAttr('data-class').removeAttr('data-col').removeAttr('data-sizex').removeAttr('data-sizey').removeAttr('data-row').removeAttr('style').empty();

		var positions = $('.gridster').html();
		var blockPositions = $('#refinedPositioning').html();
		var gridsterWidthGrab = $('.gridster').width();

		$('.demo').after('<textarea class="cssRePos"></textarea>');
		$('.cssRePos').after('<textarea class="chartHTML" /textarea>');
		$('.cssRePos').html(blockPositions).before('<h2 class="printoutHeader">CSS Placement For Live</h2>');
		$('.chartHTML').html(positions).before('<h2 class="printoutHeader">JSON Output For Live</h2>').prepend('chart width: '+gridsterWidthGrab+'px');
	});

});

function center() {
	$('body').scrollTo( '50%', {axis: 'x'} );
};

// Center chart in window
$(document).ready(center); // When the page first loads
$(window).resize(center); // When the browser changes size

