if(typeof(xPos) == "undefined") xPos = {};

xPos.Search = {};
xPos.getSearch = function(){// Private
	if(location.search.length > 0){
		var s = location.search.substring(1).split("&");
		for(var i = 0; i < s.length; i++){
			s[i] = s[i].split("=");
			this.Search[s[i][0]] = unescape(s[i][1]);
		}
	}
};
xPos.getSearch();