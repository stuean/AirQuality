	//instantiate leaflet map
	
	
	var map = L.map('map').setView([48.86, 2.35], 13);
	var map2 = L.map('map2').setView([52.52, 13.405], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map2);

	
var callFunc = function(){
	map.panTo([vm.lat, vm.lon], 13);
	getRadius();
	console.log(vm.radius);
	var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat + "," + vm.lon + "&radius=" + vm.radius;

	var p = GetJSON(url);
	p.then(results => {
	console.log(results);
	for(i=0; i<results.results.length; i++){
		var newRow = document.createElement("tr");
		var newData = document.createElement("td");
		var text10 = document.createTextNode(results.results[i].location);
		var newData1 = document.createElement("td");
		var text1 = document.createTextNode(results.results[i].city + "   ");
		var newData2 = document.createElement("td");
		var text2 = document.createTextNode(results.results[i].coordinates.latitude + "   ");
		var newData9 = document.createElement("td");
		var text9 = document.createTextNode(results.results[i].coordinates.longitude + "   ");
		var newData3 = document.createElement("td");
		var text3 = document.createTextNode(results.results[i].country + "   ");
		var newData4 = document.createElement("td");
		var text4 = document.createTextNode(results.results[i].date.utc + "   ");
		var newData5 = document.createElement("td");
		var text5 = document.createTextNode(results.results[i].location + "   ");
		var newData6 = document.createElement("td");
		var text6 = document.createTextNode(results.results[i].parameter + "   ");
		var newData7 = document.createElement("td");
		var text7 = document.createTextNode(results.results[i].unit + "   ");
		var newData8 = document.createElement("td");
		var text8 = document.createTextNode(results.results[i].value + "   ");
		newData1.appendChild(text1);
		newRow.appendChild(newData1);
		newData2.appendChild(text2);
		newRow.appendChild(newData2);
		newData9.appendChild(text9);
		newRow.appendChild(newData9);
		newData3.appendChild(text3);
		newRow.appendChild(newData3);
		newData4.appendChild(text4);
		newRow.appendChild(newData4);
		newData5.appendChild(text5);
		newRow.appendChild(newData5);
		newData6.appendChild(text6);
		newRow.appendChild(newData6);
		newData7.appendChild(text7);
		newRow.appendChild(newData7);
		newData8.appendChild(text8);
		newRow.appendChild(newData8);
						
		document.getElementById("row").appendChild(newRow);	
			}
		});
		}

		map.on('dragend', function(){
			setTimeout(function(){
				vm.lat = map.getCenter().lat;
				vm.lon = map.getCenter().lng;
				getRadius();
				console.log(vm.radius);
				var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat + "," + vm.lon + "&radius=" + vm.radius;
				var p = GetJSON(url);
				p.then(results => {
					console.log(results);
				});
			}, 1000);
		});
		map2.on('dragend', function(){
			setTimeout(function(){
				vm.lat2 = map2.getCenter().lat;
				vm.lon2 = map2.getCenter().lng;
				getRadius2();
				var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat2 + "," + vm.lon2 + "&radius=" + vm.radius2;	
				var p = GetJSON(url);
			}, 1000);
		});
   
   
	//	var marker = L.marker([55, 5]).addTo(map);
	//	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
   

   
		var callFunc2 = function(){
	
			map2.panTo([vm.lat2, vm.lon2], 13);
			getRadius2();
			
			var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat2 + "," + vm.lon2 + "&radius=" + vm.radius2;
		
			var p = GetJSON(url);
		}
				
				

			
		function getRadius(){
			var northEastLat = map.getBounds()._northEast.lat;
			var northEastLon = map.getBounds()._northEast.lng;				
			var southWestLat = map.getBounds()._southWest.lat;
			var southWestLon = map.getBounds()._southWest.lng;
						
			var lat1 = northEastLat*Math.PI/180;
			var lon1 = northEastLon*Math.PI/180;
			var lat2 = southWestLat*Math.PI/180;
			var lon2 = southWestLon*Math.PI/180;
		
			var dLat = southWestLat-northEastLat;
			var dLon = southWestLon-northEastLon;

			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2) * Math.sin(dLon/2)
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var distance = 3958.8 * c;
			var radius = distance/2;
			var radiusMeters = radius * 1609.34;
			vm.radius = radiusMeters;
		}
			
		function getRadius2(){
			var northEastLat = map2.getBounds()._northEast.lat;
			var northEastLon = map2.getBounds()._northEast.lng;
			var southWestLat = map2.getBounds()._southWest.lat;
			var southWestLon = map2.getBounds()._southWest.lng;
						
			var lat1 = northEastLat*Math.PI/180;
			var lon1 = northEastLon*Math.PI/180;
			var lat2 = southWestLat*Math.PI/180;
			var lon2 = southWestLon*Math.PI/180;
		
			var dLat = southWestLat-northEastLat;
			var dLon = southWestLon-northEastLon;
	
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon/2) * Math.sin(dLon/2)
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var distance = 3958.8 * c;
			var radius = distance/2;
			console.log(radius);
			var radiusMeters = radius * 1609.34;
			console.log(radiusMeters);
			vm.radius2 = radiusMeters;
		}
	
			
		function GetJSON(url){
		var p = new Promise((resolve, reject) => {
			var req = new XMLHttpRequest();
			req.onreadystatechange = function(){
				if(req.readyState == 4 && req.status == 200){
					var data = JSON.parse(req.response);
					resolve(data);
				}
				else if(req.readyState == 4){
					reject("Error:" + req.status);
				}
			};
			req.open("GET", url, true);
			req.send();
		});
		return p;
		}
	
	
