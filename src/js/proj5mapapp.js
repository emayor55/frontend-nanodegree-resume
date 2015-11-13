// data MODEL
var dataModel = {
	listOfPlaces:[],
	listOfAddresses:[],
	cities: [
			{city: "Washington,DC", cityName:"Washington, DC"},
			{city: "Chicago", cityName:"Chicago"},
			{city: "manhattan", cityName:"New York City"},
			{city: "Philadelphia", cityName:"Philadelphia"},
			{city: "San Francisco", cityName:"San Francisco"},
			{city: "Berlin, Germany", cityName:"Berlin, Germany"},
			{city: "London, England", cityName:"London, England"},
			{city: "Paris, France", cityName:"Paris, France"},
			{city: "Sydney, Australia", cityName:"Sydney, Australia"}		
			],

	placeTypes: [
			{searchPlaceType: "museum", placeType:"museums"},
			{searchPlaceType: "park", placeType:"parks"},
			{searchPlaceType: "restaurant", placeType:"restaurants"}		
			],

	mapIconsNormal: {museum: 'images/red-dot.png', 
					park: 'images/park.png', 
					restaurant: 'images/restaurant.png'},
					
	mapIconsHover: {museum: 'images/blue-dot.png',
					park: 'images/hoverPark.png',
					restaurant: 'images/hoverPlate.png'},
					
	mapIconsVisited: {museum: 'images/purple.png', 
					park: 'images/visitedPark.png', 
					restaurant: 'images/visitedPlate.png'},

	addNewPlace: function (newPlace) {
		dataModel.listOfPlaces.push(newPlace);
	},

	addAddress: function (place,addr) {
		dataModel.listOfAddresses[place]=addr;
	},

	getCities: function() {
		return dataModel.cities;
	},

	getPlaceTypes: function() {
		return dataModel.placeTypes;
	},

	getListOfPlaces: function() {
		return dataModel.listOfPlaces;
	},

	getListOfAddresses: function() {
		return dataModel.listOfAddresses;
	},

	initList: function() {
		dataModel.listOfPlaces.splice(0,dataModel.listOfPlaces.length);
	},

	initListOfAddresses: function() {
		dataModel.listOfAddresses.splice(0,dataModel.listOfAddresses.length);
	},

	getIcon: function(state,placeType) {
		var icon="";
		switch (state) {
		case ('normal'):
			icon=dataModel.mapIconsNormal[placeType]; break;
		case ('hover'):
			icon=dataModel.mapIconsHover[placeType]; break;
		case ('visited'):
			icon=dataModel.mapIconsVisited[placeType]; break;
		}
		return icon;
	}
}
// END of data MODEL
// list VIEW MODEL ========================
var listViewModel = {
	firstTime: true,
	find: ko.observable(''),
	list: ko.observableArray([]),
	cityList: ko.observableArray([]),
	placeTypeList: ko.observableArray([]),
	selectedCity: ko.observable(),
	selectedPlaceType: ko.observable(),

	setCityList: function () {
		console.log('setCityList called'); 
		cities = dataModel.getCities();
		for (var item in cities) {
			listViewModel.cityList.push(cities[item]);
		};
	},
	
	setCity: function(value) {
		 setUpMap();
	},

	getCity: function() {
		return listViewModel.selectedCity();
	},
	
	getPlaceType: function() {
		return listViewModel.selectedPlaceType();
	},

	setPlaceTypeList: function () {
		//console.log('setPlaceTypeList called'); 
		placeTypes = dataModel.getPlaceTypes();
		for (var i in placeTypes) {
			listViewModel.placeTypeList.push(placeTypes[i]);
		};
	},
	
	setPlaceType: function(value) {
		console.log('setPlaceType called - onchange triggered'); 
		if (listViewModel.firstTime) 
			listViewModel.firstTime=false;
		else
			mapViewModel.setUpPlaces();
	},

	//populates list for display
	initListDisplay: function () {
		list=dataModel.getListOfPlaces().sort();
		listViewModel.list.removeAll();
		for (var i in list) {
			listViewModel.list.push(list[i]);
			}
		},	
	

	bounceOn: function(value) {
			mapViewModel.bounceOn(value); 
		},
	bounceOff: function(value) {
		 	mapViewModel.bounceOff(value); 
		},
	
	//calls mapViewModel method to open/close infoWindow
	openInfo: function(value) {
		mapViewModel.openInfo(value);
	},
	
	//changes list item's text color : text not a true hyperlink
	changeLinkColor: function(item) {
		item.style.color='#5011b3';
	},
	
	//implements search filters; calls mapViewModel method to remove/add back markers 
    search: function(value) {
		listViewModel.list.removeAll();
		var list = dataModel.getListOfPlaces();
		
		// initialize map by removing all markers first
		mapViewModel.resetMarkers(); 

		if (value == '') {
			for (var i in list) {
				listViewModel.list.push(list[i]);
				mapViewModel.addBackMarker(list[i]);
			}
		} else {
			for (var i in list) {
				if (list[i].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
					listViewModel.list.push(list[i]);
					mapViewModel.addBackMarker(list[i]);
				}
			}
		}
	}
};       
// END OF list VIEW MODEL ========================

// map VIEW MODEL ========================
var mapViewModel = {
	map:{},
	markerIconNormal: "",
	markerIconHover: "",
	markerIconVisited: "",
	lastMarkerIcon: "",
	lastInfoWindowOpen:"", 
	infoWindowSet:{},
	markersSet:{},
	latlng:"",
	bounds:{},
	
	setUpLocation: function () {
		var city = listViewModel.getCity();
		var geoCoder = new google.maps.Geocoder;
		var request = {
			address: city
			};
		geoCoder.geocode(request,mapViewModel.checkStatus);
	},
	
	checkStatus: function (data,status) {
		if (status==google.maps.GeocoderStatus.OK) {
			var lat=data[0].geometry.location.lat();	
			var lng=data[0].geometry.location.lng();
			mapViewModel.initMap(lat,lng);
		} else {
			console.log('GeocoderStatus is not OK'); 
		}
	},
	
	initMap: function(lat,lng) {
		mapViewModel.latlng = new google.maps.LatLng(lat,lng);
		var mapOptions = {center:mapViewModel.latlng,zoom:10,disableDefaultUI:true};
		mapViewModel.map = new google.maps.Map(document.querySelector('#map'),mapOptions);
		mapViewModel.setUpPlaces(); 
	},
	
	resetMarkers: function () {
		if (mapViewModel.markersSet)
			for (var i in mapViewModel.markersSet) mapViewModel.markersSet[i].setMap(null);
		},

	displayAllMarkers: function () {
		if (mapViewModel.markersSet)
			for (var i in mapViewModel.markersSet) mapViewModel.markersSet[i].setMap(mapViewModel.map);
		},

	addBackMarker: function (label) {
		if (mapViewModel.markersSet[label]) 
			mapViewModel.markersSet[label].setMap(mapViewModel.map);
		else 
			console.log('marker for '+label+' not found'); 
		},
	
	initMarkers: function () {
		if (mapViewModel.markersSet) {
			mapViewModel.resetMarkers();
			mapViewModel.markersSet={};
		}
		},
	
	setUpPlaces: function() {
		var placeType=listViewModel.getPlaceType();
		var request = {
			location: mapViewModel.latlng,
			radius: 5000,
			rankBy: 'rating',
			query: placeType,
			types: placeType
			};
		mapViewModel.initMarkers(); 
		service = new google.maps.places.PlacesService(mapViewModel.map);
		service.textSearch(request, mapViewModel.processResults);
		window.mapBounds = new google.maps.LatLngBounds();
		mapViewModel.bounds=window.mapBounds; 
		},

	//parses results from Google maps request; calls dataModel method to add to list
	processResults: function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			dataModel.initList();
			dataModel.initListOfAddresses();
			var placeType=listViewModel.getPlaceType();
			for (var i = 0; i < results.length; i++) {
				if (results[i].types.valueOf().indexOf(placeType)>=0) {
					var place = results[i].name;
					var addr = results[i].formatted_address;
					if ($.inArray(place,dataModel.getListOfPlaces()) < 0) {
						dataModel.addNewPlace(place);
						dataModel.addAddress(place,addr); 
						mapViewModel.createMapMarker(results[i]);
					}
				} else {
					console.log(results[i].name+' is not a '+placeType); 
				}
			}
		}
		listViewModel.initListDisplay();
		},

	createMapMarker: function(locInfo) {
		var lat = locInfo.geometry.location.lat();  // latitude from the place service
		var lng = locInfo.geometry.location.lng();  // longitude from the place service
		var name = locInfo.name;   // name of the place from the place service
		var address = locInfo.formatted_address;   // name of the place from the place service
		var location=listViewModel.getCity();
		var place=listViewModel.getPlaceType();

		var placeType = listViewModel.getPlaceType(); 

		mapViewModel.markerIconNormal=dataModel.getIcon('normal',placeType); 
		mapViewModel.markerIconHover=dataModel.getIcon('hover',placeType); 
		mapViewModel.markerIconVisited=dataModel.getIcon('visited',placeType); 

		var marker = new google.maps.Marker({
			map: mapViewModel.map,
			position: locInfo.geometry.location,
			icon: mapViewModel.markerIconNormal,
			title: name+'. Click to see reviews and learn more.'
		});
		
		mapViewModel.markersSet[name]=marker

		api.callYelp(name,location);
		
		if (listViewModel.getPlaceType()!='restaurant') 
			api.callWiki(name);

		// create infoWindow 
		var infoWindow = new google.maps.InfoWindow({
			content: mapViewModel.formatInfoHtml(name,address),
			maxWidth: 200,
			maxHeight: 300
		});
		
		mapViewModel.infoWindowSet[name]=infoWindow; 

		google.maps.event.addListener(marker, 'click', function() {
			if (mapViewModel.lastInfoWindowOpen) { //lastInfoWindowOpen.close();
				if (mapViewModel.lastInfoWindowOpen == infoWindow) {
					infoWindow.close();
					mapViewModel.lastInfoWindowOpen=null; 
				} else {
					mapViewModel.lastInfoWindowOpen.close(); 
					infoWindow.open(mapViewModel.map,marker); 
					mapViewModel.lastInfoWindowOpen=infoWindow;
				}
			} else {
					infoWindow.open(mapViewModel.map,marker); 
					mapViewModel.lastInfoWindowOpen=infoWindow;
			}
			marker.setIcon(mapViewModel.markerIconVisited) 
			lastMarkerIcon=mapViewModel.markerIconVisited;
		});
		
		google.maps.event.addListener(marker, 'mouseover', function() {
			lastMarkerIcon=marker.getIcon(); 
			marker.setIcon(mapViewModel.markerIconHover) ;
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			marker.setIcon(lastMarkerIcon) ;
		});

		mapViewModel.bounds=window.mapBounds; 
		mapViewModel.bounds.extend(new google.maps.LatLng(lat,lng));

		// fit the map to the new marker
		mapViewModel.map.fitBounds(mapViewModel.bounds);
		// center the map
		mapViewModel.map.setCenter(mapViewModel.bounds.getCenter());
		},
		
	openInfo: function(value) {
		var infoWindow=mapViewModel.infoWindowSet[value];
		var marker=mapViewModel.markersSet[value];
		
		if (infoWindow) {
			if (mapViewModel.lastInfoWindowOpen) {  // if there is an open window
				if (mapViewModel.lastInfoWindowOpen == infoWindow) {
					infoWindow.close();
					mapViewModel.lastInfoWindowOpen=null; 
				} else {
					mapViewModel.lastInfoWindowOpen.close(); 
					infoWindow.open(mapViewModel.map,marker); 
					marker.setAnimation(null);
					mapViewModel.lastInfoWindowOpen=infoWindow;
				}
			} else {
					infoWindow.open(mapViewModel.map,marker); 
					marker.setAnimation(null);
					mapViewModel.lastInfoWindowOpen=infoWindow;
			}
		}
		
		marker.setIcon(mapViewModel.markerIconVisited)
		lastMarkerIcon=marker.getIcon(); 
		;
	},
		
	setMarkerVisited: function(value) {
		if (mapViewModel.markersSet[value]) 
			mapViewModel.markersSet[value].setIcon(mapViewModel.markerIconVisited);
		},

	bounceOn: function(value) {
		if (mapViewModel.markersSet[value]) {
			lastMarkerIcon=mapViewModel.markersSet[value].getIcon(); 
			mapViewModel.markersSet[value].setIcon(mapViewModel.markerIconHover);
			mapViewModel.markersSet[value].setAnimation(google.maps.Animation.BOUNCE);
			}			
		},
	bounceOff: function(value) {
		 if (mapViewModel.markersSet[value]) {
			mapViewModel.markersSet[value].setAnimation(null);
			mapViewModel.markersSet[value].setIcon(lastMarkerIcon);
			}
		},
	
	//formats all html for infoWindow
 	formatInfoHtml: function(var1,var2,data) {
		var html_str="";
		if (data) {
			var addresses=dataModel.getListOfAddresses(); 
			if (data.url)           //url defined    
				html_str=html_str+'<a href="'+data.url+'" target="_blank" title="Click to read reviews">'+var1+'</a><br>';
			if (data.rating_img_url_small && data.review_count) //count defined 
				html_str=html_str+'<img src="images/yelp_logo_40x20.png" alt="Yelp logo image"></img><img src="'+data.rating_img_url_small+'" alt="Rating image"></img>'
							+data.review_count+' reviews';
			if (data.snippet_text) 	//snippet_text defined 					
				html_str=html_str+'<p class="snippet">'+data.snippet_text+'</p>';
			if (data.image_url)    //image_url defined 
				html_str=html_str+'<img src="'+data.image_url+'" height="100" width="100" alt="Reviewer image"></img>';
			if (data.mobile_url)   //mobile_url defined 					
				html_str=html_str+'<a href="'+data.mobile_url+'" target="_blank" title="Click to read reviews">Read reviews</a>';
			if (addresses[var1])   //address defined  
				html_str=html_str+'<p class="snippet">Address: '+addresses[var1]+'</p>';
			if (var2.indexOf('<a') > 0) { //wiki link already present
				wiki_url=var2.substr(var2.indexOf('<a'),1000);  // recover wiki link
				html_str=html_str+wiki_url;  //append to yelp info
			} 
		} else {
			if (var1.indexOf('http')==0) 
				html_str=var2+'<a href="'+var1+'" target="_blank" title="Click to read article">Wikipedia article</a>';
			else
				html_str='<p>'+var1+'</p><p class="snippet">Address: '+var2+'</p>';
		}
		return html_str;
	},
	
	//loads yelp info to info window if any...
	addInfo: function(data, textStats, XMLHttpRequest){
		var place,name,html_str,content;
		var found=false;
		var placeType=listViewModel.getPlaceType();
		var locations=dataModel.getListOfPlaces()
		for (var i=0; i<data.businesses.length;i++) {
			found=false;
			name=data.businesses[i].name;
			for (var item in locations) {
				place=locations[item];
				if (name.indexOf(place) >=0 || place.indexOf(name)>=0)  {
					if (placeType=='restaurant') { // no further filtering done 
						found=true;
						break;
					} else {
						for (var j in data.businesses[i].categories) {
							for (var k in data.businesses[i].categories[j]){
								if (data.businesses[i].categories[j][k].toLowerCase().indexOf(placeType)>=0) {
									found=true;
									break;
								}
							}
						if (found) { break;}
						}
					}
				}
				if (found) {break;}
			};
			if (found && mapViewModel.infoWindowSet[place]) {
					content=mapViewModel.infoWindowSet[place].getContent();
					if (content.indexOf('review')==-1) { // yelp info not loaded yet 
						html_str = mapViewModel.formatInfoHtml(place,content,data.businesses[i]); 
						mapViewModel.infoWindowSet[place].setContent(html_str);
					}
					break; 
				} 
			};
		},
	
	//adds link for wiki article, if any
	addWikiLink : function(data) {
		var content="";
		var html_str="";
		var found=false; 
		var name=data[0];
		var url=data[3][0];

		var locations=dataModel.getListOfPlaces(); 

		for (var item in locations) {
			place=locations[item]
			if (name.indexOf(place) >=0 || place.indexOf(name)>=0) {
				found=true;
				break;
				}
			};
		if (found && url && mapViewModel.infoWindowSet[place]) {
			content=mapViewModel.infoWindowSet[place].getContent();
			if (content.indexOf('Wikipedia')==-1){
				html_str=mapViewModel.formatInfoHtml(url,content);
				mapViewModel.infoWindowSet[place].setContent(html_str); 
			}
		} 
	},
	};	
// END OF map VIEW MODEL ========================

// API  ========================	
var api = {	
	
	//calls Yelp API
	callYelp : function(search,near){
		var auth = {
			consumerKey : 'TaKtZegj3JmlcXZ4qvefrw',
			consumerSecret : 'LuJGs0Ep_1XkfjKso_k62SDn7js',
			accessToken : 'WTB32nqSvrTL2-eI3gKQZ4Rp6vbPsnTb',
			accessTokenSecret : '8xdXNsJ5mNRioQLXvK0I4oCDk_I',
			};
		var number = 5;
		var accessor = {
			consumerSecret : auth.consumerSecret,
			tokenSecret : auth.accessTokenSecret
			};
		parameters = [];
		parameters.push(['term', search]);
		parameters.push(['limit', number]);
		parameters.push(['location', near]);
		parameters.push(['callback', 'pcb']);
		parameters.push(['oauth_consumer_key', auth.consumerKey]);
		parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
		parameters.push(['oauth_token', auth.accessToken]);
		parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
		var message = {
			'action' : 'http://api.yelp.com/v2/search',
			'method' : 'GET',
			'parameters' : parameters
		};

		OAuth.setTimestampAndNonce(message);
		OAuth.SignatureMethod.sign(message, accessor);
		var parameterMap = OAuth.getParameterMap(message.parameters);
		var apiRequestTimeout = setTimeout(function() {console.log('Yelp call for '+search+' timed out.')}, 5000)
		$.ajax({
			url: message.action,
			data: parameterMap,
			dataType: 'jsonp',
			success: function (data, textStats, XMLHttpRequest) {
					mapViewModel.addInfo(data, textStats, XMLHttpRequest)
					clearTimeout(apiRequestTimeout); 			
				},
			error:function(e) {
				console.log("this is the error object "+e); 
				console.log("In error: Sorry, could not find Yelp reviews about "+search); 
				}
			});
		},
		
	//calls Wikipedia API		
	callWiki : function(myQuery) {
		var apiRequestTimeout = setTimeout(function() {console.log('Wikipedia call for '+myQuery+' timed out.')}, 5000);			
		$.ajax({
			url: "http://en.wikipedia.org/w/api.php",
			data: "action=opensearch&search="+myQuery+"&format=json",
			dataType: "jsonp",
			success: function(data) {
					mapViewModel.addWikiLink(data);
					clearTimeout(apiRequestTimeout); 
				},
			error: function(e) {
				console.log("this is the error object "+e); 
				console.log("In error: Sorry, could not find Wikipedia items about "+myQuery); 
				}
			})
	},
}
 
ko.applyBindings(listViewModel); 
listViewModel.find.subscribe(listViewModel.search);	
	 
function setUpMap() {
	mapViewModel.setUpLocation();
	window.addEventListener('resize', function(e) {
		mapViewModel.map.fitBounds(mapViewModel.bounds);
	});
};

function setUpLists() {
	listViewModel.setCityList();
	listViewModel.setPlaceTypeList(); 
}; 

window.addEventListener('load',setUpLists()); 