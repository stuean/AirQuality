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
	var x = -1;
	getRadius();
	var rad = vm.radius;
	var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat + "," + vm.lon + "&radius=" + rad;

	var parameters = ["pm10", "no2", "co", "o3", "so2", "pm25"];
	var parameterSwitch = parameters.includes(vm.pType);
	
	var tableCheck = document.getElementById("table");
	if(tableCheck.rows.length > 1){
		table.innerHTML = "";
	}

	var p = GetJSON(url);
	p.then(results => {
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
			if(parameterSwitch == true){
				if(vm.pType == results.results[i].parameter)
				{
				newRow.appendChild(newData6);
				newData7.appendChild(text7);
				newRow.appendChild(newData7);
				newData8.appendChild(text8);
				if(results.results[i].value >= 0 && results.results[i].value <= 50){
					newData8.style.backgroundColor = "green";
				}else if(results.results[i].value >= 51 && results.results[i].value <= 100){
					newData8.style.backgroundColor = "yellow";
				}else if(results.results[i].value >= 101 && results.results[i].value <= 150){
					newData8.style.backgroundColor = "orange";
				}else if(results.results[i].value >= 151 && results.results[i].value <= 200){
					newData8.style.backgroundColor = "red";
				}else if(results.results[i].value >= 201 && results.results[i].value <= 300){
					newData8.style.backgroundColor = "purple";
					newData8.style.color = "white";
				}else{
					newData8.style.backgroundColor = "maroon";
					newData8.style.color = "white";
				}
				newRow.appendChild(newData8);

				document.getElementById("table").appendChild(newRow);	

				url2 = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat + "," + vm.lon + "&radius=" + rad + "&city=" + results.results[i].city;
				var res = results;
				p = GetJSON(url2);
				p.then(function(results){
					var pm25 = 0;
					var countPM25 = 0;
					var pm10 = 0;
					var countPM10 = 0;
					var so2 = 0;
					var countSO2 = 0;
					var no2 = 0;
					var countNO2 = 0;
					var o3 = 0;
					var countO3 = 0;
					var co = 0;
					var countCO = 0;
					var bc = 0;
					var countBC = 0;
					for(j=0; j<results.results.length; j++){
						if(results.results[j].parameter == "pm25"){
							pm25 = pm25 + results.results[j].value;
							countPM25 = countPM25 + 1;	
						}
						if(results.results[j].parameter == "pm10"){
							pm10 = pm10 + results.results[j].value;
							countPM10 = countPM10 + 1;	
						}
						if(results.results[j].parameter == "so2"){
							so2 = so2 + results.results[j].value;
							countSO2 = countSO2 + 1;	
						}
						if(results.results[j].parameter == "no2"){
							no2 = no2 + results.results[j].value;
							countNO2 = countNO2 + 1;	
						}
						if(results.results[j].parameter == "o3"){
							o3 = o3 + results.results[j].value;
							countO3 = countO3 + 1;	
						}
						if(results.results[j].parameter == "co"){
							co = co + results.results[j].value;
							countCO = countCO + 1;	
						}
						if(results.results[j].parameter == "bc"){
							bc = bc + results.results[j].value;
							countBC = countBC + 1;	
						}
					}
					x=x+1;	
					var marker = L.marker([res.results[x].coordinates.latitude, res.results[x].coordinates.longitude]).addTo(map);
					marker.bindPopup(res.results[x].city + '          ' + ' pm25: ' + pm25/countPM25 + ' pm10: ' + pm10/countPM10 + ' so2: ' + so2/countSO2 + ' no2: ' + no2/countNO2 + ' o3: ' + o3/countO3 + ' co: ' + co/countCO + ' bc: ' + bc/countBC);


				}, x, res);
			}
		}, x);
		}
	}else{
	       newRow.appendChild(newData6);
				newData7.appendChild(text7);
				newRow.appendChild(newData7);
				newData8.appendChild(text8);
				if(results.results[i].value >= 0 && results.results[i].value <= 50){
					newData8.style.backgroundColor = "green";
				}else if(results.results[i].value >= 51 && results.results[i].value <= 100){
					newData8.style.backgroundColor = "yellow";
				}else if(results.results[i].value >= 101 && results.results[i].value <= 150){
					newData8.style.backgroundColor = "orange";
				}else if(results.results[i].value >= 151 && results.results[i].value <= 200){
					newData8.style.backgroundColor = "red";
				}else if(results.results[i].value >= 201 && results.results[i].value <= 300){
					newData8.style.backgroundColor = "purple";
					newData8.style.color = "white";
				}else{
					newData8.style.backgroundColor = "maroon";
					newData8.style.color = "white";
				}
				newRow.appendChild(newData8);

				document.getElementById("table").appendChild(newRow);	

				url2 = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat + "," + vm.lon + "&radius=" + rad + "&city=" + results.results[i].city;
				var res = results;
				p = GetJSON(url2);
				p.then(function(results){
					var pm25 = 0;
					var countPM25 = 0;
					var pm10 = 0;
					var countPM10 = 0;
					var so2 = 0;
					var countSO2 = 0;
					var no2 = 0;
					var countNO2 = 0;
					var o3 = 0;
					var countO3 = 0;
					var co = 0;
					var countCO = 0;
					var bc = 0;
					var countBC = 0;
					for(j=0; j<results.results.length; j++){
						if(results.results[j].parameter == "pm25"){
							pm25 = pm25 + results.results[j].value;
							countPM25 = countPM25 + 1;	
						}
						if(results.results[j].parameter == "pm10"){
							pm10 = pm10 + results.results[j].value;
							countPM10 = countPM10 + 1;	
						}
						if(results.results[j].parameter == "so2"){
							so2 = so2 + results.results[j].value;
							countSO2 = countSO2 + 1;	
						}
						if(results.results[j].parameter == "no2"){
							no2 = no2 + results.results[j].value;
							countNO2 = countNO2 + 1;	
						}
						if(results.results[j].parameter == "o3"){
							o3 = o3 + results.results[j].value;
							countO3 = countO3 + 1;	
						}
						if(results.results[j].parameter == "co"){
							co = co + results.results[j].value;
							countCO = countCO + 1;	
						}
						if(results.results[j].parameter == "bc"){
							bc = bc + results.results[j].value;
							countBC = countBC + 1;	
						}
					}
					x=x+1;	
					var marker = L.marker([res.results[x].coordinates.latitude, res.results[x].coordinates.longitude]).addTo(map);
					marker.bindPopup(res.results[x].city + '          ' + ' pm25: ' + pm25/countPM25 + ' pm10: ' + pm10/countPM10 + ' so2: ' + so2/countSO2 + ' no2: ' + no2/countNO2 + ' o3: ' + o3/countO3 + ' co: ' + co/countCO + ' bc: ' + bc/countBC);


				}, x, res);
			}
		}, x);
		}
}
		
		
var callFunc2 = function(){
	
	map2.panTo([vm.lat2, vm.lon2], 13);
	getRadius2();
	var x = -1;
	var rad2 = vm.radius2;
	var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat2 + "," + vm.lon2 + "&radius=" + rad2;
	
			
	var tableCheck = document.getElementById("table2");
	if(tableCheck.rows.length > 1){
		table2.innerHTML = "";
	}
		
	var p = GetJSON(url);
	p.then(results => {
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
			if(results.results[i].value >= 0 && results.results[i].value <= 50){
				newData8.style.backgroundColor = "green";
			}else if(results.results[i].value >= 51 && results.results[i].value <= 100){
				newData8.style.backgroundColor = "yellow";
			}else if(results.results[i].value >= 101 && results.results[i].value <= 150){
				newData8.style.backgroundColor = "orange";
			}else if(results.results[i].value >= 151 && results.results[i].value <= 200){
				newData8.style.backgroundColor = "red";
			}else if(results.results[i].value >= 201 && results.results[i].value <= 300){
				newData8.style.backgroundColor = "purple";
				newData8.style.color = "white";
			}else{
				newData8.style.backgroundColor = "maroon";
				newData8.style.color = "white";
			}
			newRow.appendChild(newData8);
						
			document.getElementById("table2").appendChild(newRow);	
				
		url2 = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat2 + "," + vm.lon2 + "&radius=" + rad2 + "&city=" + results.results[i].city;
		var res = results;
		p = GetJSON(url2);
		p.then(function(results){
			var pm25 = 0;
			var countPM25 = 0;
			var pm10 = 0;
			var countPM10 = 0;
			var so2 = 0;
			var countSO2 = 0;
			var no2 = 0;
			var countNO2 = 0;
			var o3 = 0;
			var countO3 = 0;
			var co = 0;
			var countCO = 0;
			var bc = 0;
			var countBC = 0;
			for(j=0; j<results.results.length; j++){
				if(results.results[j].parameter == "pm25"){
					pm25 = pm25 + results.results[j].value;
					countPM25 = countPM25 + 1;	
				}
				if(results.results[j].parameter == "pm10"){
					pm10 = pm10 + results.results[j].value;
					countPM10 = countPM10 + 1;	
				}
				if(results.results[j].parameter == "so2"){
					so2 = so2 + results.results[j].value;
					countSO2 = countSO2 + 1;	
				}
				if(results.results[j].parameter == "no2"){
					no2 = no2 + results.results[j].value;
					countNO2 = countNO2 + 1;	
				}
				if(results.results[j].parameter == "o3"){
					o3 = o3 + results.results[j].value;
					countO3 = countO3 + 1;	
				}
				if(results.results[j].parameter == "co"){
					co = co + results.results[j].value;
					countCO = countCO + 1;	
				}
				if(results.results[j].parameter == "bc"){
					bc = bc + results.results[j].value;
					countBC = countBC + 1;	
				}
			}
			x=x+1;	
			var marker = L.marker([res.results[x].coordinates.latitude, res.results[x].coordinates.longitude]).addTo(map2);
			marker.bindPopup(res.results[x].city + '          ' + ' pm25: ' + pm25/countPM25 + ' pm10: ' + pm10/countPM10 + ' so2: ' + so2/countSO2 + ' no2: ' + no2/countNO2 + ' o3: ' + o3/countO3 + ' co: ' + co/countCO + ' bc: ' + bc/countBC);
			

		}, x, res);
		}
	}, x);
}

		
		
		
		
		

map.on('dragend', function(){
	setTimeout(function(){
		vm.lat = map.getCenter().lat;
		vm.lon = map.getCenter().lng;
		getRadius();
		var x = -1;
		var rad = vm.radius;
		var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat + "," + vm.lon + "&radius=" + rad;
		var tableCheck = document.getElementById("table");
		if(tableCheck.rows.length > 1){
			table.innerHTML = "";
		}		
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
				if(results.results[i].value >= 0 && results.results[i].value <= 50){
					newData8.style.backgroundColor = "green";
				}else if(results.results[i].value >= 51 && results.results[i].value <= 100){
					newData8.style.backgroundColor = "yellow";
				}else if(results.results[i].value >= 101 && results.results[i].value <= 150){
					newData8.style.backgroundColor = "orange";
				}else if(results.results[i].value >= 151 && results.results[i].value <= 200){
					newData8.style.backgroundColor = "red";
				}else if(results.results[i].value >= 201 && results.results[i].value <= 300){
					newData8.style.backgroundColor = "purple";
					newData8.style.color = "white";
				}else{
					newData8.style.backgroundColor = "maroon";
					newData8.style.color = "white";
				}
				newRow.appendChild(newData8);
						
				document.getElementById("table").appendChild(newRow);	
				
		url2 = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat + "," + vm.lon + "&radius=" + rad + "&city=" + results.results[i].city;
		var res = results;
		p = GetJSON(url2);
		p.then(function(results){
			var pm25 = 0;
			var countPM25 = 0;
			var pm10 = 0;
			var countPM10 = 0;
			var so2 = 0;
			var countSO2 = 0;
			var no2 = 0;
			var countNO2 = 0;
			var o3 = 0;
			var countO3 = 0;
			var co = 0;
			var countCO = 0;
			var bc = 0;
			var countBC = 0;
			for(j=0; j<results.results.length; j++){
				if(results.results[j].parameter == "pm25"){
					pm25 = pm25 + results.results[j].value;
					countPM25 = countPM25 + 1;	
				}
				if(results.results[j].parameter == "pm10"){
					pm10 = pm10 + results.results[j].value;
					countPM10 = countPM10 + 1;	
				}
				if(results.results[j].parameter == "so2"){
					so2 = so2 + results.results[j].value;
					countSO2 = countSO2 + 1;	
				}
				if(results.results[j].parameter == "no2"){
					no2 = no2 + results.results[j].value;
					countNO2 = countNO2 + 1;	
				}
				if(results.results[j].parameter == "o3"){
					o3 = o3 + results.results[j].value;
					countO3 = countO3 + 1;	
				}
				if(results.results[j].parameter == "co"){
					co = co + results.results[j].value;
					countCO = countCO + 1;	
				}
				if(results.results[j].parameter == "bc"){
					bc = bc + results.results[j].value;
					countBC = countBC + 1;	
				}
			}
			x=x+1;	
			var marker = L.marker([res.results[x].coordinates.latitude, res.results[x].coordinates.longitude]).addTo(map);
			marker.bindPopup(res.results[x].city + '          ' + ' pm25: ' + pm25/countPM25 + ' pm10: ' + pm10/countPM10 + ' so2: ' + so2/countSO2 + ' no2: ' + no2/countNO2 + ' o3: ' + o3/countO3 + ' co: ' + co/countCO + ' bc: ' + bc/countBC);
			

		}, x, res);
			}
		}, x);			
	}, 1000);
});
map2.on('dragend', function(){
	setTimeout(function(){
		vm.lat2 = map2.getCenter().lat;
		vm.lon2 = map2.getCenter().lng;
		getRadius2();
		var x = -1;
		var rad2 = vm.radius2;
		var url = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat2 + "," + vm.lon2 + "&radius=" + rad2;	
			
		var tableCheck = document.getElementById("table2");
		if(tableCheck.rows.length > 1){
			table2.innerHTML = "";
		}
					
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
				if(results.results[i].value >= 0 && results.results[i].value <= 50){
					newData8.style.backgroundColor = "green";
				}else if(results.results[i].value >= 51 && results.results[i].value <= 100){
					newData8.style.backgroundColor = "yellow";
				}else if(results.results[i].value >= 101 && results.results[i].value <= 150){
					newData8.style.backgroundColor = "orange";
				}else if(results.results[i].value >= 151 && results.results[i].value <= 200){
					newData8.style.backgroundColor = "red";
				}else if(results.results[i].value >= 201 && results.results[i].value <= 300){
					newData8.style.backgroundColor = "purple";
					newData8.style.color = "white";
				}else{
					newData8.style.backgroundColor = "maroon";
					newData8.style.color = "white";
				}
				newRow.appendChild(newData8);
						
				document.getElementById("table2").appendChild(newRow);	
				
		url2 = "https://api.openaq.org/v1/measurements?coordinates=" + vm.lat2 + "," + vm.lon2 + "&radius=" + rad2 + "&city=" + results.results[i].city;
		var res = results;
		p = GetJSON(url2);
		p.then(function(results){
			var pm25 = 0;
			var countPM25 = 0;
			var pm10 = 0;
			var countPM10 = 0;
			var so2 = 0;
			var countSO2 = 0;
			var no2 = 0;
			var countNO2 = 0;
			var o3 = 0;
			var countO3 = 0;
			var co = 0;
			var countCO = 0;
			var bc = 0;
			var countBC = 0;
			for(j=0; j<results.results.length; j++){
				if(results.results[j].parameter == "pm25"){
					pm25 = pm25 + results.results[j].value;
					countPM25 = countPM25 + 1;	
				}
				if(results.results[j].parameter == "pm10"){
					pm10 = pm10 + results.results[j].value;
					countPM10 = countPM10 + 1;	
				}
				if(results.results[j].parameter == "so2"){
					so2 = so2 + results.results[j].value;
					countSO2 = countSO2 + 1;	
				}
				if(results.results[j].parameter == "no2"){
					no2 = no2 + results.results[j].value;
					countNO2 = countNO2 + 1;	
				}
				if(results.results[j].parameter == "o3"){
					o3 = o3 + results.results[j].value;
					countO3 = countO3 + 1;	
				}
				if(results.results[j].parameter == "co"){
					co = co + results.results[j].value;
					countCO = countCO + 1;	
				}
				if(results.results[j].parameter == "bc"){
					bc = bc + results.results[j].value;
					countBC = countBC + 1;	
				}
			}
			x=x+1;	
			var marker = L.marker([res.results[x].coordinates.latitude, res.results[x].coordinates.longitude]).addTo(map2);
			marker.bindPopup(res.results[x].city + '          ' + ' pm25: ' + pm25/countPM25 + ' pm10: ' + pm10/countPM10 + ' so2: ' + so2/countSO2 + ' no2: ' + no2/countNO2 + ' o3: ' + o3/countO3 + ' co: ' + co/countCO + ' bc: ' + bc/countBC);
			

		}, x, res);
			}
		}, x);		
	}, 1000);
});	
		
function getRadius() {		
        var radlat1 = Math.PI * map.getBounds()._northEast.lat/180;
        var radlat2 = Math.PI * map.getBounds()._southWest.lat/180;
        var radlon1 = Math.PI * map.getBounds()._northEast.lng/180;
        var radlon2 = Math.PI * map.getBounds()._southWest.lng/180;
        var theta = map.getBounds()._northEast.lng-map.getBounds()._southWest.lng;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
	dist = dist * 1000; //meters
	radius = dist/2;
        vm.radius = radius;
}
		
function getRadius2() {
			
        var radlat1 = Math.PI * map2.getBounds()._northEast.lat/180;
        var radlat2 = Math.PI * map2.getBounds()._southWest.lat/180;
        var radlon1 = Math.PI * map2.getBounds()._northEast.lng/180;
        var radlon2 = Math.PI * map2.getBounds()._southWest.lng/180;
        var theta = map2.getBounds()._northEast.lng-map2.getBounds()._southWest.lng;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
		dist = dist * 1000; //meters
		radius = dist/2;
        vm.radius2 = radius;
}
		
function GetJSON(url){
	var p = new Promise((resolve, reject) => {
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(req.readyState == 4 && req.status == 200){
				var data = JSON.parse(req.response);
				resolve(data);
			}else if(req.readyState == 4){
				reject("Error:" + req.status);
			}
		};
		req.open("GET", url, true);
		req.send();
	});
	return p;
}
	
	
