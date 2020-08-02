
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

$("#add-cities").on("click", function() {
	event.preventDefault();
	var monthfromInput =$("#From-months").val()
	var dayfromInput = $(".dayfromselector").val()
	var yearfromInput = $(".yearfromselector").val()
	var cityinput = $("#city-input").val().trim();
	var monthUntilInput = $("#until-month").val()
	var dayUntilInput = $(".dayUntilSelector").val()
	var yearUntilInput =$(".yearUntilSelector").val()
	console.log( monthfromInput, dayfromInput, yearfromInput)
	console.log(monthUntilInput, dayUntilInput,yearUntilInput)
	var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" + cityinput,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
		"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
	}
	}

	$.ajax(settings).done(function (response) {
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
		"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
	}
	}

	$.ajax(settings2).done(function (response) {
	console.log(response)
	console.log(response.data.body.searchResults.results)
	var searchResults = response.data.body.searchResults.results
		for (var i = 0; i < 5; i++) {
			
			var hotelResult = $("<div>");
			
			hotelResult.addClass("cities list-group-");
			
			hotelResult.attr("data-name", searchResults[i]).name;

			hotelResult.text(searchResults[i].name).css('textTransform', 'capitalize')
			$("#hotel-view").append(hotelResult);
		  } 

	});
});
});
}
displayDates()