var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://hotels4.p.rapidapi.com/properties/get-details?locale=en_US&currency=USD&checkOut=2020-01-15&adults1=1&checkIn=2020-01-08&id=424023",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "hotels4.p.rapidapi.com",
		"x-rapidapi-key": "8fc8315f1amsh70aff4e1a3ba621p1d89e4jsn59ed596832c4"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
