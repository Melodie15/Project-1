
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
	var lats =[]
	var logs = []
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
	hotelsAPI()


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
		function googleMaps(){
			var script = $('<script>');
			script.attr("src",'https://maps.googleapis.com/maps/api/js?key=AIzaSyCCFEOkbkpCzlLVqGgBY4uflsf8ZXCPq-w&callback=initMap');
			script.attr("defer", true)
		
		// Attach your callback function to the `window` object
		window.initMap = function() {
			console.log(lati)
		console.log(lon)
		var location = {lat: Number(lati), lng: Number(lon)};
		  // The map, centered at Uluru
		  var map = new google.maps.Map(
			  document.getElementById("map"), {zoom: 15, center: location});
		  // The marker, positioned at Uluru
		  var marker = new google.maps.Marker({position: location, map: map});
		};
		console.log(script[0])
		// Append the 'script' element to 'head'
		document.head.append(script[0]);
		}
		
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
		
	}})

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
	
	$.ajax(settings).done(function (response) {
		console.log(response)
		$("#airBnB-view").text("AirBnb:")
		for (i = 0; i < 5 ; i++) {
			var AirbnbDivEL = $("<div>")
			var AirID = response.listings[i].listing.id
			console.log(response.listings[0].listing.id)
			console.log(response.listings[0].listing.room_and_property_type)
			console.log(response.listings[0].pricing_quote.price_string)
			AirbnbDivEL.addClass("airbnbDiv")
			AirbnbDivEL.html('<a href='+"https://www.airbnb.com/rooms/"+ AirID +"?adults=1&location="+ cityinput +"&check_in=" + checkin + "&" + "check_out=" + checkout + "&display_extensions%5B%5D=MONTHLY_STAYS&source_impression_id=p3_1596475569_Ye1hL0KJyqYINSTH>" + response.listings[i].listing.room_and_property_type + "-  " + response.listings[i].pricing_quote.price_string + '</a>')
			console.log(response)

			$("#airBnB-view").append(AirbnbDivEL)
		}
	});
	};

});
}	
function hotelsAPI(){
	var settings = {
	"async": false,
	"crossDomain": true,
	"url": "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + cityinput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
		"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
	}};

	$.ajax(settings).done(function (response) {
	console.log(response);
	console.log(response.suggestions[0].entities[0].destinationId)
	var city = response.suggestions[0].entities[0].destinationId

	var settings2 = {
	"async": false,
	"crossDomain": true,
	"url": "https://hotels4.p.rapidapi.com/properties/list?currency=USD&locale=en_US&sortOrder=PRICE&destinationId=" + city + "&pageNumber=1&checkIn=" + yearfromInput + "-"+ monthfromInput + "-"+ dayfromInput + "&checkOut=" + yearUntilInput +"-"+ monthUntilInput+"-"+ dayUntilInput+"&pageSize=25&adults1=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
		"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
	}
	}

	$.ajax(settings2).done(function (response) {
	console.log(response)
	console.log(response.data.body.searchResults.results)
	var searchResults = response.data.body.searchResults.results
		for (var i = 0; i < 5; i++) {
			var hotelID = searchResults[i].supplierHotelId
			console.log(checkin)
			var hotelResult = $("<div>");
			hotelResult.addClass("hotel");
			hotelResult.attr("data-name", searchResults[i].name)
			hotelResult.html("<a href=https://www.expedia.com/h" + hotelID +".Hotel-Information?chkin=" + checkin +'&chkout=' +checkout+">"+searchResults[i].name +'</a>')

			var rateDiv = $("<div>")
			console.log (searchResults[0].ratePlan.price.current)
			var rate = searchResults[0].ratePlan.price.current
			rateDiv.text("Daily Rates: " + rate)
			
			var reviewDiv = $("<div>")
			console.log (searchResults[0].ratePlan.price.current)
			var rate = searchResults[0].guestReviews.rating
			reviewDiv.text("Guest Reviews: " + rate +"/10")


			hotelResult.append(rateDiv, reviewDiv)
			
			$("#hotel-view").append(hotelResult); 
		}
	})
}
)};
});





displayDates()
