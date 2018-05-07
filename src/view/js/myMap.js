/*var marker = new google.maps.Marker({
	position: { lat: 47.608013, lng: -122.335167 },
	map: map,
	title: 'Hello World2!'
});	*/

getMarkers();

function getMarkers() {
	$.ajax(
			{
					type: "POST",
					url: "/getPermits",
					data: {},
					contentType: "application/json",
					dataType: "json",
					success: function (res) {

						for (var i = 0; i < res.permits.length && i<100; i++) {
							console.log('plotting', res.permits[i][17] , res.permits[i][18], res.permits[i][0]);
							addMarker(parseFloat(res.permits[i][17]) , parseFloat(res.permits[i][18]), res.permits[i][0]+" ");							
						}
											
					},
					error: function (request, ajaxOptions, thrownError) {
							console.log(request.responseText)
					}
			});
}

function addMarker(lat, lng, title)
{
	var marker = new google.maps.Marker({
		position: { lat: lat, lng: lng },
		map: map,
		title: title
	});	

	google.maps.event.addListener(marker, 'click', function(num) {
		new google.maps.InfoWindow({
			content: title
		}).open(map, marker);
	});
}