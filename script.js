<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8f5f76bfefe11208a23eba69140d7944f8927e15
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
function displayDates() {
	var dayfromselector = $("<select>")
	dayfromselector.addClass("dayfromselector")
	for (var i = 1; i < 31; i++){
		var dayfromOption = $("<option>")
		// Adds a class of city to our button
		dayfromOption.addClass("from-day");
		// Added a data-attribute
		dayfromOption.attr("day", [i] );
		if ( i < 10 ) {
			dayfromOption.text("0"+jQuery.parseJSON(i)) 
        } 
		else {dayfromOption.text(i + 1)}
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8f5f76bfefe11208a23eba69140d7944f8927e15
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
		dayfromselector.append(dayfromOption)
		$("#From-form").append(dayfromselector);
	}
	var yearfromselector = $("<select>")
	yearfromselector.addClass("yearfromselector")
	for (var i = 0; i < 2; i++){
		var yearfromOption = $("<option>")
		// Adds a class of city to our button
		yearfromOption.addClass("from-year");
		// Added a data-attribute
		yearfromOption.attr("year", 202 + [i]);
		// Added the button to the buttons-view div
		yearfromOption.text(202 + [i])
		yearfromselector.append(yearfromOption)
		$("#From-form").append(yearfromselector);
	}
	var dayUntilselector = $("<select>")
	dayUntilselector.addClass("dayUntilSelector")
	for (var i = 1; i < 31; i++){
<<<<<<< HEAD
<<<<<<< HEAD
=======
		
>>>>>>> 8f5f76bfefe11208a23eba69140d7944f8927e15
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
		var dayUntilOption = $("<option>")
		// Adds a class of city to our button
		dayUntilOption.addClass("until-day");
		// Added a data-attribute
		dayUntilOption.attr("day", [i] );
		if ( i < 10 ) {
			dayUntilOption.text("0"+jQuery.parseJSON(i)) 
        } 
		else {dayUntilOption.text(i + 1)}
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8f5f76bfefe11208a23eba69140d7944f8927e15
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
		dayUntilselector.append(dayUntilOption)
		$("#until-form").append(dayUntilselector);
	}
	var yearUntilselector = $("<select>")
	yearUntilselector.addClass('yearUntilSelector')
	for (var i = 0; i < 2; i++){
		var yearUntilOption = $("<option>")
		// Adds a class of city to our button
		yearUntilOption.addClass("until-year");
		// Added a data-attribute
		yearUntilOption.attr("year", 202 + [i]);
		// Added the button to the buttons-view div
		yearUntilOption.text(i + 2020)
		yearUntilselector.append(yearUntilOption)
		$("#until-form").append(yearUntilselector);
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
	}
}
$("#add-cities").on("click", function(info) {
	$("#hotel-view").empty()
	$("#map").empty()
	$("#attractions-view").empty()
	$("#airBnB-view").empty()
	$("#event-view").empty()
	event.preventDefault();
	var lats =[]
	var logs = []
	var names = []
	var monthfromInput =$("#From-months").val()
	var dayfromInput = $(".dayfromselector").val()
	var yearfromInput = $(".yearfromselector").val()
	var cityinput = $("#city-input").val().trim();
	var monthUntilInput = $("#until-month").val()
	var dayUntilInput = $(".dayUntilSelector").val()
	var yearUntilInput =$(".yearUntilSelector").val()
	var checkin = + yearfromInput + "-"+ monthfromInput + "-"+ dayfromInput 
	var checkout = + yearUntilInput +"-"+ monthUntilInput+"-"+ dayUntilInput
	tripadvisor()
function tripadvisor(){ 
	var tripAdvisorSettings = {
	"async": false,
	"crossDomain": true,
	"url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=10&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + cityinput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
	}
}
$("#attractions-view").text("Attractions: ")
$.ajax(tripAdvisorSettings).done(function (response) {
	console.log(response)
	console.log(response.data[0].result_object.location_id)
	var tripAdvisorID = response.data[0].result_object.location_id
	var lati = response.data[0].result_object.latitude
	var lon = response.data[0].result_object.longitude
	console.log(lati)
	console.log(lon)
	var AdvisorIDsettings = {
		"async": false,
		"crossDomain": true,
		"url": "https://tripadvisor1.p.rapidapi.com/attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&location_id="+tripAdvisorID,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
		}
	}
	$.ajax(AdvisorIDsettings).done(function (response) {
		console.log(response)
		console.log(response.data[0].name)
		console.log(response.data[0].website)
		airBnbAPI()
		googleMaps()
		for (i = 0; i < 5 ; i++) {
		var attractionDivEl = $("<div>");
		attractionDivEl.addClass("attractions");
		attractionDivEl.attr("data-set",[i]);
		attractionDivEl.html("<a href="+ response.data[i].website+">" +response.data[i].name +'</a>');
		var descriptionDivEl = $("<div>");
		descriptionDivEl.addClass("description")
		descriptionDivEl.text(response.data[i].description)
		var image = response.data[i].photo.images.medium.url
		var imageDivEl = $("<img>")
		imageDivEl.attr("src", image)
		imageDivEl.attr("width","20%")
		attractionDivEl.append(descriptionDivEl,imageDivEl )
		$("#attractions-view").append(attractionDivEl)	
		var latitude = response.data[i].latitude
		var longitude = response.data[i].longitude
		var name = response.data[i].name
		lats.push(latitude)
		logs.push(longitude)
		names.push(name)
	}})
	console.log(logs)
	console.log(lats)
	function googleMaps(){
		var script = $('<script>');
		script.attr("src",'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCFEOkbkpCzlLVqGgBY4uflsf8ZXCPq-w&callback=initMap');
		script.attr("defer", true)
	// Attach your callback function to the `window` object
	window.initMap = function() {
		console.log(lati)
	console.log(lon)
	var centerLocation = {lat: Number(lati), lng: Number(lon)};
	  var map = new google.maps.Map(
		  document.getElementById("map"), {zoom: 13, center: centerLocation, gestureHandling: 'cooperative'});
	  // The marker, positioned at Uluru
	  var marker = new google.maps.Marker({position: centerLocation, map: map});
	  for (i = 0; i < logs.length; i++) {
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		var marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(lats[i]), Number(logs[i])),
			map: map,
			title: names[i]
		  });
		  var contentString = '<div id="content">'+
      	'<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+names[i]+'</h1>'+
      '<div id="bodyContent">'+ names[i]+
      '</div>'+
	  '</div>';
		marker.addListener('click', function(e) {
			infowindow.open(map, marker);
		  })
	  }
	};
	console.log(script[0])
	// Append the 'script' element to 'head'
	document.head.append(script[0]);
	}
	function airBnbAPI(){
		var settings = {
		"async": false,
		"crossDomain": true,
		"url": "https://airbnb-com.p.rapidapi.com/listings/nearby/"+lati+"/"+lon+"?min_bathrooms=0&check_out=" + checkout+"&hotel_room=true&max_guests=1&check_in=" + checkin + "&private_room=true&min_bedrooms=0&offset=0&entire_home=true&min_price=0&max_price=5000&min_beds=0&radius=5&shared_room=true",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "airbnb-com.p.rapidapi.com",
			"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
		}
	}
<<<<<<< HEAD
=======
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
	}
}

$("#add-cities").on("click", function(info) {
	$("#hotel-view").empty()
	$("#map").empty()
	$("#attractions-view").empty()
	$("#airBnB-view").empty()
	$("#event-view").empty()
	event.preventDefault();
	var lats =[];
	var logs = [];
	var names = [];
	var images = [];
	var descriptions = []
	var urls = []
	var monthfromInput =$("#From-months").val()
	var dayfromInput = $(".dayfromselector").val()
	var yearfromInput = $(".yearfromselector").val()
	var cityinput = $("#city-input").val().trim();
	var monthUntilInput = $("#until-month").val()
	var dayUntilInput = $(".dayUntilSelector").val()
	var yearUntilInput =$(".yearUntilSelector").val()
	var checkin = + yearfromInput + "-"+ monthfromInput + "-"+ dayfromInput 
	var checkout = + yearUntilInput +"-"+ monthUntilInput+"-"+ dayUntilInput
	tripadvisor()



function tripadvisor(){ 
	var tripAdvisorSettings = {
	"async": false,
	"crossDomain": true,
	"url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=10&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + cityinput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
	}
}
$("#attractions-view").text("Attractions: ")
$.ajax(tripAdvisorSettings).then(function (response) {
	var tripAdvisorID = response.data[0].result_object.location_id
	var lati = response.data[0].result_object.latitude
	var lon = response.data[0].result_object.longitude
	var AdvisorIDsettings = {
		"async": true,
		"crossDomain": true,
		"url": "https://tripadvisor1.p.rapidapi.com/attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&location_id="+tripAdvisorID,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
		}
	}
	
	$.ajax(AdvisorIDsettings).done(function (response) {
		console.log(response)
		airBnbAPI()
		googleMaps()
		
		
		for (i = 0; i < 5 ; i++) {
		var attractionDivEl = $("<div>");
		attractionDivEl.addClass("attractions");
		attractionDivEl.attr("data-set",[i]);
		attractionDivEl.html("<a href="+ response.data[i].website+">" +response.data[i].name +'</a>');
		var descriptionDivEl = $("<div>");
		descriptionDivEl.addClass("description")
		descriptionDivEl.text(response.data[i].description)
		
		var image = response.data[i].photo.images.small.url
		var imageDivEl = $("<img>")
		imageDivEl.attr("src", image)
		imageDivEl.attr("width","20%")
		attractionDivEl.append(descriptionDivEl,imageDivEl )
		$("#attractions-view").append(attractionDivEl)	
		var latitude = response.data[i].latitude
		var longitude = response.data[i].longitude
		var name = response.data[i].name
		var description = response.data[i].description
		var url = response.data[i].website
		lats.push(latitude)
		logs.push(longitude)
		names.push(name)
		descriptions.push(description)
		images.push(image)
		urls.push(url)
	}})
	function googleMaps(){
		var script = $('<script>');
		script.attr("src",'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCFEOkbkpCzlLVqGgBY4uflsf8ZXCPq-w&callback=initMap');
		script.attr("defer", true)
	
	// Attach your callback function to the `window` object
	window.initMap = function() {
	var centerLocation = {lat: Number(lati), lng: Number(lon)};
	var map = new google.maps.Map(
		  document.getElementById("map"), {zoom: 12, center: centerLocation, gestureHandling: 'cooperative'});
	var infowindow = new google.maps.InfoWindow();
	var marker, i;
	  for (i = 0; i < logs.length; i++) {
		
		var marker = new google.maps.Marker({
            position: new google.maps.LatLng(Number(lats[i]), Number(logs[i])),
			map: map,
			title: names[i],
			
		  });
		  google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
			  infowindow.setContent('<div id="content">'+
			  '<div id="siteNotice">'+
			  '</div>'+
			  '<a href="'+urls[i]+'">'+ '<h1 id="firstHeading" class="firstHeading">'+names[i]+'</a></h1>'+
			  '<div id="bodyContent">'+
			  '<p>'+descriptions[i]+'</p>'+ 
			  '<img src ='+images[i]+'>'+
			  '</div>'+
			  '</div>')
			  infowindow.open(map, marker);
			}
		  })(marker, i))
	  }
	};

	document.head.append(script[0]);
	}

	function airBnbAPI(){
		var settings = {
		"async": false,
		"crossDomain": true,
		"url": "https://airbnb-com.p.rapidapi.com/listings/nearby/"+lati+"/"+lon+"?min_bathrooms=0&check_out=" + checkout+"&hotel_room=true&max_guests=1&check_in=" + checkin + "&private_room=true&min_bedrooms=0&offset=0&entire_home=true&min_price=0&max_price=5000&min_beds=0&radius=5&shared_room=true",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "airbnb-com.p.rapidapi.com",
			"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
		}
	}
	
<<<<<<< HEAD
>>>>>>> 8f5f76bfefe11208a23eba69140d7944f8927e15
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
	$.ajax(settings).done(function (response) {
		console.log(response)
		$("#airBnB-view").text("AirBnb:")
		for (i = 0; i < 5 ; i++) {
			var AirbnbDivEL = $("<div>")
			var AirID = response.listings[i].listing.id
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
			console.log(response.listings[0].listing.id)
			console.log(response.listings[0].listing.room_and_property_type)
			console.log(response.listings[0].pricing_quote.price_string)
			AirbnbDivEL.addClass("airbnbDiv")
			AirbnbDivEL.html('<a href='+"https://www.airbnb.com/rooms/"+ AirID +"?adults=1&location="+ cityinput +"&check_in=" + checkin + "&" + "check_out=" + checkout + "&display_extensions%5B%5D=MONTHLY_STAYS&source_impression_id=p3_1596475569_Ye1hL0KJyqYINSTH>" + response.listings[i].listing.room_and_property_type + "-  " + response.listings[i].pricing_quote.price_string + '</a>')
			console.log(response)
<<<<<<< HEAD
=======
			AirbnbDivEL.addClass("airbnbDiv")
			AirbnbDivEL.html('<a href='+"https://www.airbnb.com/rooms/"+ AirID +"?adults=1&location="+ cityinput +"&check_in=" + checkin + "&" + "check_out=" + checkout + "&display_extensions%5B%5D=MONTHLY_STAYS&source_impression_id=p3_1596475569_Ye1hL0KJyqYINSTH>" + response.listings[i].listing.room_and_property_type + "-  " + response.listings[i].pricing_quote.price_string + '</a>')

>>>>>>> 8f5f76bfefe11208a23eba69140d7944f8927e15
=======

			AirbnbDivEL.addClass("airbnbDiv")
			AirbnbDivEL.html('<a href='+"https://www.airbnb.com/rooms/"+ AirID +"?adults=1&location="+ cityinput +"&check_in=" + checkin + "&" + "check_out=" + checkout + "&display_extensions%5B%5D=MONTHLY_STAYS&source_impression_id=p3_1596475569_Ye1hL0KJyqYINSTH>" + response.listings[i].listing.room_and_property_type + "-  " + response.listings[i].pricing_quote.price_string + '</a>')


>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
			$("#airBnB-view").append(AirbnbDivEL)
		}
	});
	};
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
});
}	
});
displayDates()
<<<<<<< HEAD
=======
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36

});
}	
});


displayDates()
<<<<<<< HEAD
>>>>>>> 8f5f76bfefe11208a23eba69140d7944f8927e15
=======

>>>>>>> 8cf88bad4d1b51b680f15352052d8c633a3d4c36
