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
			dayfromOption.text("0"+$.parseJSON(i)) 
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
			dayUntilOption.text("0"+$.parseJSON(i)) 
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
	hotelsAPI()

	$(".search").toggle("slow")
	var toggleFormButton =$("<button>")
	toggleFormButton.attr("id", "toggleFormButton")
	toggleFormButton.addClass("button is-small is-primary")
	$("#searchDiv").empty()
	$("#searchDiv").prepend(toggleFormButton)
	toggleFormButton.text("Search Form")
	$("#toggleFormButton").click(function(){
		$(".search").toggle("slow", function(){
			if($(this).is(":visible")){
				$("#toggleFormButton").text("Hide Search");
			} else {
				$("#toggleFormButton").text("Search Another City")
			};
		});
	});
	
	function tripadvisor(){ 
	var tripAdvisorSettings = {
	"crossDomain": true,
	"url": "https://tripadvisor1.p.rapidapi.com/locations/search?location_id=10&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=" + cityinput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
		"x-rapidapi-key": "a12eed2741mshbf906324d670b9ep15278cjsn15bd4d6a3e8b"
	}}

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
			"x-rapidapi-key": "a12eed2741mshbf906324d670b9ep15278cjsn15bd4d6a3e8b"
		}}
	$.ajax(AdvisorIDsettings).done(function (response) {
		console.log(response)
		airBnbAPI()
		
		
		var header = $("<div>")
		header.text("Attractions")
		header.addClass("attractionheader header has-text-centered title is-3")
		$("#attractions-view").append(header)
	
	var toggleAttractionButton =$("<button>")
	toggleAttractionButton.attr("id", "toggleAttractionButton")
	toggleAttractionButton.addClass(" button is-small is-primary")
	$(".attractionheader").append(toggleAttractionButton)
	toggleAttractionButton.text("Show")
	$("#toggleAttractionButton").click(function(){
		$(".attractions").toggle("slow", function(){
			if($(this).is(":visible")){
				$("#toggleAttractionButton").text("Hide");
			} else {
				$("#toggleAttractionButton").text("Show")
			}
		})
	
	})
		for (i = 0; i < 5 ; i++) {
		var attractionDivEl = $("<div>");
		attractionDivEl.addClass("attractions card column");
		var div2 = $("<div>");
		div2.addClass("card-content")
		attractionDivEl.attr("data-set",[i]);
		attractionDivEl.append(div2)
		var p1 = $("<p>");
		p1.addClass("title  has-text-centered")
		p1.text(response.data[i].name)
		var descriptionDivEl = $("<p>");
		descriptionDivEl.addClass("description")
		descriptionDivEl.text(response.data[i].description)
		div2.append(p1,descriptionDivEl)
		var footer = $("<footer>")
		footer.addClass("card-footer")
		attractionDivEl.append(footer)
		
		var p1footer = $("<p>")
		p1footer.addClass("card-footer-item subtitle")
		var span1 = $("<span>")
		span1.html("<a href="+ response.data[i].website+">" +response.data[i].name + " Website" + '</a>')
		p1footer.append(span1)

		var p2footer = $("<p>")
		p2footer.addClass("card-footer-item")
		var span2 = $("<span>")
		p2footer.append(span2)
		var image = response.data[i].photo.images.small.url
		var imageDivEl = $("<img>")
		imageDivEl.attr("src", image)
		imageDivEl.attr("width","150px")
		span2.append(imageDivEl)

		footer.append(p1footer,p2footer)
	
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
		};
		$(".attractions").hide()
	});
	function airBnbAPI(){
		var settings = {
		"crossDomain": true,
		"url": "https://airbnb-com.p.rapidapi.com/listings/nearby/"+lati+"/"+lon+"?min_bathrooms=0&check_out=" + checkout+"&hotel_room=true&max_guests=1&check_in=" + checkin + "&private_room=true&min_bedrooms=0&offset=0&entire_home=true&min_price=0&max_price=5000&min_beds=0&radius=5&shared_room=true",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "airbnb-com.p.rapidapi.com",
			"x-rapidapi-key": "a12eed2741mshbf906324d670b9ep15278cjsn15bd4d6a3e8b"
		}
	}

		var airheader = $("<div>")
		airheader.text("AirBnb")
		airheader.addClass("airheader header has-text-centered title is-3")
		$("#airBnB-view").append(airheader)

	var toggleAirbnbButton =$("<button>")
	toggleAirbnbButton.attr("id", "toggleAirbnbButton")
	toggleAirbnbButton.addClass(" button is-small is-primary")
	$(".airheader").append(toggleAirbnbButton)
	toggleAirbnbButton.text("Show")
	$("#toggleAirbnbButton").click(function(){
		$(".airbnbDiv").toggle("slow", function(){
			if($(this).is(":visible")){
				$("#toggleAirbnbButton").text("Hide");
			} else {
				$("#toggleAirbnbButton").text("Show")
			}
		})
	
	})
	
	$.ajax(settings).done(function (response) {
		console.log(response)
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
			console.log(response.listings[i].listing.coordinate.latitude)
			var latitude = response.listings[i].listing.coordinate.latitude
			var longitude = response.listings[i].listing.coordinate.longitude
			console.log(response.listings[i].listing.coordinate.longitude)
			var name = "AirBnB: " + response.listings[i].listing.name
			var description = response.listings[i].pricing_quote.price_string
			var url = "https://www.airbnb.com/rooms/"+ AirID +"?adults=1&location="+ cityinput +"&check_in=" + checkin + "&" + "check_out=" + checkout + "&display_extensions%5B%5D=MONTHLY_STAYS&source_impression_id=p3_1596475569_Ye1hL0KJyqYINSTH"
			lats.push(latitude)
			logs.push(longitude)
			names.push(name)
			urls.push(url)
			descriptions.push(description + " a night")
			images.push(image)

			googleMaps()
			$(".airbnbDiv").hide()
		}
	});
		};
		
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
		};

<<<<<<< HEAD
=======

	function airBnbAPI(){
		var settings = {
		"crossDomain": true,
		"url": "https://airbnb-com.p.rapidapi.com/listings/nearby/"+lati+"/"+lon+"?min_bathrooms=0&check_out=" + checkout+"&hotel_room=true&max_guests=1&check_in=" + checkin + "&private_room=true&min_bedrooms=0&offset=0&entire_home=true&min_price=0&max_price=5000&min_beds=0&radius=5&shared_room=true",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "airbnb-com.p.rapidapi.com",
			"x-rapidapi-key": "d4d0ed6519msh33b01fff60e8af4p1055fdjsna4a8a8c4be3f"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response)

		var airBnbheader = $("<div>")
        airBnbheader.text("AirBnbs ")
        airBnbheader.addClass("header title is-3 has-text-centered airBnB-header")
        $("#airBnB-view").append(airBnbheader)
		var toggleAirBnBButton =$("<button>")
		toggleAirBnBButton.attr("id", "toggleAirBnBButton")
		toggleAirBnBButton.addClass(" button is-small is-primary")
		$(".airBnB-header").append(toggleAirBnBButton)
		toggleAirBnBButton.text("Show")
		$("#toggleAirBnBButton").click(function(){
			$(".airbnbDiv").toggle("slow", function(){
				if($(this).is(":visible")){
					$("#toggleAirBnBButton").text("Hide");
				} else {
					$("#toggleAirBnBButton").text("Show")
				};
			});
		});
	

		$("#airBnB-view").text("AirBnb")

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

>>>>>>> d3d4883d77fefd5cdb931a89bd368d4b5a048a8a
	});
	};	

	function hotelsAPI(){
		var hotelheader = $("<div>")
		hotelheader.text("Hotels ")
		hotelheader.addClass("header title is-3 has-text-centered hotel-header")
		$("#hotel-view").append(hotelheader)

		var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + cityinput,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "hotels4.p.rapidapi.com",
			"x-rapidapi-key": "a12eed2741mshbf906324d670b9ep15278cjsn15bd4d6a3e8b"
		}};
		$.ajax(settings).done(function (response) {

	var toggleHotelButton =$("<button>")
	toggleHotelButton.attr("id", "toggleHotelButton")
	toggleHotelButton.addClass(" button is-small is-primary")
	$(".hotel-header").append(toggleHotelButton)
	toggleHotelButton.text("Show")
	$("#toggleHotelButton").click(function(){
		$(".hotel-div").toggle("slow", function(){
			if($(this).is(":visible")){
				$("#toggleHotelButton").text("Hide");
			} else {
				$("#toggleHotelButton").text("Show")
			}
		})
	
	})	
		console.log(response);
		console.log(response.suggestions[0].entities[0].destinationId)
		var city = response.suggestions[0].entities[0].destinationId
		var settings2 = {
		"async": true,
		"crossDomain": true,
		"url": "https://hotels4.p.rapidapi.com/properties/list?currency=USD&locale=en_US&sortOrder=PRICE&destinationId=" + city + "&pageNumber=1&checkIn=" + yearfromInput + "-"+ monthfromInput + "-"+ dayfromInput + "&checkOut=" + yearUntilInput +"-"+ monthUntilInput+"-"+ dayUntilInput+"&pageSize=25&adults1=1",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "hotels4.p.rapidapi.com",
			"x-rapidapi-key": "a12eed2741mshbf906324d670b9ep15278cjsn15bd4d6a3e8b"
		}
		}
		$.ajax(settings2).done(function (response) {
		console.log(response)
		console.log(response.data.body.searchResults.results)
		var searchResults = response.data.body.searchResults.results
			for (var i = 0; i < 5; i++) {
				var hotelID = searchResults[i].supplierHotelId
				
				var hotelResult = $("<div>");
				hotelResult.addClass("hotel");
				hotelResult.attr("data-name", searchResults[i].name)
				hotelResult.html("<a href=https:/f/www.expedia.com/h" + hotelID +".Hotel-Information?chkin=" + checkin +'&chkout=' +checkout+">"+searchResults[i].name +'</a>')
				var rateDiv = $("<div>")
				console.log (searchResults[0].ratePlan.price.current)
				var rate = searchResults[i].ratePlan.price.current
				rateDiv.text("Daily Rates: " + rate)
				
				var divImg = $("<div>")
				divImg.addClass("level-left hotel-div")
				var image = searchResults[i].thumbnailUrl
				var imageDivEl = $("<img>")
				imageDivEl.attr("src", image)
				imageDivEl.attr("width","150px")
				
	

				var reviewDiv = $("<div>")
				console.log (searchResults[0].ratePlan.price.current)
				var rating = searchResults[0].guestReviews.rating
				reviewDiv.text("Guest Reviews: " + rating +"/10")
				hotelResult.append(rateDiv, reviewDiv)
				divImg.append(imageDivEl, hotelResult)
				$("#hotel-view").append(divImg); 

				var latitude = searchResults[i].coordinate.lat
				var longitude = searchResults[i].coordinate.lon
				var name = searchResults[i].name
				var description = rate
				var url = "https:/www.expedia.com/h" + hotelID +".Hotel-Information?chkin=" + checkin +'&chkout=' +checkout
				lats.push(latitude)
				logs.push(longitude)
				names.push(name)
				urls.push(url)
				descriptions.push(description + " a night")
				images.push(image)
			}
			console.log(urls)

			$(".hotel-div").hide()
		})
	}
	)};

});



displayDates()
