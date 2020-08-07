
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
		
		var dayUntilOption = $("<option>")
		// Adds a class of city to our button
		dayUntilOption.addClass("until-day");
		// Added a data-attribute
		dayUntilOption.attr("day", [i] );
		if ( i < 10 ) {
			dayUntilOption.text("0"+jQuery.parseJSON(i)) 
        } 
		else {dayUntilOption.text(i + 1)}

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
	"crossDomain": true,
	"url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=10&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + cityinput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "59d8cb6935mshcaa86ae032accc0p101a04jsnd4db267252dd"
	}
}
$("#attractions-view").text("Attractions: ")
$.ajax(tripAdvisorSettings).then(function (response) {
	var tripAdvisorID = response.data[0].result_object.location_id
	var lati = response.data[0].result_object.latitude
	var lon = response.data[0].result_object.longitude
	var AdvisorIDsettings = {
		"crossDomain": true,
		"url": "https://tripadvisor1.p.rapidapi.com/attractions/list?lang=en_US&currency=USD&sort=recommended&lunit=km&location_id="+tripAdvisorID,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
			"x-rapidapi-key": "59d8cb6935mshcaa86ae032accc0p101a04jsnd4db267252dd"
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

	document.head.prepend(script[0]);
	}

	function airBnbAPI(){
		var settings = {
		"crossDomain": true,
		"url": "https://airbnb-com.p.rapidapi.com/listings/nearby/"+lati+"/"+lon+"?min_bathrooms=0&check_out=" + checkout+"&hotel_room=true&max_guests=1&check_in=" + checkin + "&private_room=true&min_bedrooms=0&offset=0&entire_home=true&min_price=0&max_price=5000&min_beds=0&radius=5&shared_room=true",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "airbnb-com.p.rapidapi.com",
			"x-rapidapi-key": "59d8cb6935mshcaa86ae032accc0p101a04jsnd4db267252dd"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response)
		$("#airBnB-view").text("AirBnb:")
		for (i = 0; i < 5 ; i++) {
			var AirbnbDivEL = $("<div>")
			var AirID = response.listings[i].listing.id
			AirbnbDivEL.addClass("airbnbDiv")
			AirbnbDivEL.html('<a href='+"https://www.airbnb.com/rooms/"+ AirID +"?adults=1&location="+ cityinput +"&check_in=" + checkin + "&" + "check_out=" + checkout + "&display_extensions%5B%5D=MONTHLY_STAYS&source_impression_id=p3_1596475569_Ye1hL0KJyqYINSTH>" + response.listings[i].listing.room_and_property_type + "-  " + response.listings[i].pricing_quote.price_string + '</a>')
			$("#airBnB-view").append(AirbnbDivEL)
			var image = response.listings[i].listing.picture_url
			var imageDivEl = $("<img>")
			imageDivEl.addClass("airBnb-image")
			imageDivEl.attr("src", image)
			imageDivEl.attr("width","20%")
			AirbnbDivEL.prepend(imageDivEl)
		}
	});
	};

});
}	
});


displayDates()
