window.addEvent('domready', function() {

	request.getFacets();
	request.getProducts();
	var perPage = 9;

});

var firstTime = true;
var querystring = [];
var imagePath = '/redesign/web/productImages/';

var request = {
	getProducts: function(params) {
		params = params || '';
		var facets = "";
		if (firstTime != -1) {
			facets = "view=default";
		}
		var url = "/redesign/jsp/stubs/ProductSearch.jsp?" + params + facets;
		//var url = "productSearch.txt";
		var request = new Json.Remote(url, {
			onComplete: function(jsonObj) {
				$("view").empty();
				for (key in jsonObj.searchResults) {
					var getResults = popCatalog(jsonObj.searchResults[key]);
				}
					if (jsonObj.FacetSearch) {popFacets(jsonObj.FacetSearch);}
			}
		}).send();
	},
	
	getFacets: function() {
		var url = "/redesign/jsp/stubs/SearchFacets.jsp"
		//var url = "searchFacets.txt"
		var request = new Json.Remote(url, {
			onComplete: function(jsonObj) {				
				popFacets(jsonObj);
			}
		}).send();
	},
	
	getDetails: function(sku) {
		var url = "/redesign/jsp/stubs/ProductDetail.jsp?sku=1," + sku
		var request = new Json.Remote(url, {
			onComplete: function(jsonObj) {
				var mydetails = new Overlay(jsonObj);
			}
		}).send();
	}
}
var catalog_event = function (el) {
		var position = $(el).getPosition();
		var title = $(el).getFirst().getProperty("alt");
		var sku = $(el).getFirst().getProperty("id");
		var dimensions = $(el).getCoordinates();
		var div = new Element('div', {'id': 'overBox'}).setStyles({
			left: position.x -1,
			top: position.y -1
		}).addClass('infoBox').injectTop(document.body).addEvent('mouseleave', function(e) {$(div).remove()});
		var prodtitle = new Element('p', {'class': 'productTitle'}).setHTML(title).inject(div);
		var product = $(el).clone().inject(div).addEvent('click', function(e) {
			e = new Event(e).stop();
			new request.getDetails(sku);
		}).addEvent('mousedown', function(e) {
			e = new Event(e).stop();
			var clone = this.clone()
			.setStyles(this.getCoordinates())
			.setStyles({'opacity': 0.7, 'position': 'absolute', 'top': position.y, 'z-index': '10'})
			.addEvent('emptydrop', function() {
				this.remove();
			}).inject(document.body);

			var drag = clone.makeDraggable({
				droppables: $$('#compare', '#stylefile')
			});

			drag.start(e); 
		});
		var functions = new Element('div', {'class': 'functions'}).inject(div);
		var price = new Element('p', {'class': 'price'}).setHTML('$' + $(el).getFirst().getProperty("rel")).injectInside(functions);
		var addStyle = new Element('a', {'class': 'addStyle', 'href': '#'}).injectInside(functions);
		var addCompare = new Element('a', {'class': 'addCompare', 'href': '#'}).injectAfter(addStyle);
}


var popCatalog = function (result) {
	var catalog = $('view');
	if ($('navigation_toggle').style.left=='0px') {
		catalog.addClass('c1');
	} else {
		catalog.addClass('o1');
	}
	var el = new Element('div', {'class': 'glasses'});
	var a = new Element('a', {'href': '#', 'class': 'product'}).injectInside(el);
	var img = new Element('img', {
		'src': '/redesign/web/productImages/' + result.SKU + '_fr.jpg', 
		'id': result.SKU, 
		'alt': result.shortDescription,
		'rel': result.price,
		'class': 'pic'
		}).injectInside(a);
	el.inject(catalog);
	a.addEvent('mouseenter', function(e) {
		catalog_event(this);
	});
}

var popFacets = function (result) {

	var facet = [result.brands, result.style, result.features, result.material, result.color];
	if (firstTime == true) {
		firstTime = false;

		for (var i=0; i<facet.length; i++) {
			$ES('div.toggler','navigation')[i].setText(facet[i].displayText);
			var list = new Element('span').injectInside($ES('div.toggler','navigation')[i]);
			var container = $ES('div.toggled','navigation')[i];
			for (key in facet[i]) {
				container.setProperties({id: key + "_" + facet[i].displayText});
				var content = new Object;
				if (facet[i][key].constructor === Array) {
					var ul = new Element('ul', {'class': 'left'});
					for (var j=0; j< facet[i][key].length; j++) {				
						content = facet[i][key][j];
						ul.inject(container);
						var li = new Element('li').injectInside(ul);
						if (content.enabled == "false") {
							$(li).addClass("disabled").setProperty("id", content.endecaName).setHTML(content.displayText);
						} else {
							if (content.colorURL == undefined) {
								var a = new Element('a', {'href': '#', 'id': content.endecaName, 'title': content.shortDescription}).setHTML(content.displayText).injectInside(li);
								attachProdListener(a, facet[i].displayText);
							} else {							
								var a = new Element('a', {'href': '#', 'id': content.endecaName, 'title': content.shortDescription}).injectInside(li);
								var img = new Element('img', {'src': content.colorURL, 'alt': content.endecaName}).injectInside(a);
								attachProdListener(a, facet[i].displayText);
							}
						}
					}
				}
			}
		}

		//Brands
		if ($("children_brands")) {
			var ulright = new Element('ul', {'class': 'right'});
			var listlength = $$("#navigation #children_brands ul li").length;
				$$("#navigation #children_brands ul li").each(function(item, index) {
					if (index > listlength/2) {
						item.injectInside(ulright);
					}
				});
			ulright.injectAfter($$("#navigation #children_brands ul.left")[0]);
		}

		//Styles
		if ($("frame_shapes_style")) {
			var heading = new Element('h3').setHTML("Frame Shape").injectTop($("frame_shapes_style"));
		}

		//Features
		if ($("lens_features") || $("lens_material") || $("lens_color")) {
			new Element('h3').setHTML("Frame").injectTop($("lens_features"));
			new Element('h3').setHTML("Lens").injectAfter($$("#lens_features ul")[0]);
			new Element('h3').setHTML("Frame").injectTop($("lens_material"));
			new Element('h3').setHTML("Lens").injectAfter($$("#lens_material ul")[0]);
			new Element('h3').setHTML("Frame").injectTop($("lens_color"));
			new Element('h3').setHTML("Lens").injectAfter($$("#lens_color ul")[0]);
			$$("#lens_color ul").removeClass("left").addClass("row");
		}		
		
	} else if (firstTime === false) {	// Enable/disable facets based on product search results
		facet.each(function(arr, index) {
			var current = facet[index].displayText;
			for (key in arr) {
				var content = new Object;
				if (arr[key].constructor === Array) {
					for (var j=0; j< arr[key].length; j++) {				
						content = arr[key][j];
						var links = $$("#navigation li a");
						var li_disabled = $$("#navigation .disabled");
						$$(links).each(function(item, index) {
							var disabledId = content.endecaName;
							if (content.enabled == "false" && disabledId == item.id) {
								if ($(item).hasChildren) {
									$(item).getChildren.insertTop(item.parent);
								} else {
									$(disabledId).getParent().setProperty("id", disabledId).addClass("disabled").setHTML($(disabledId).getText());
								}
							}
						});
						$$(li_disabled).each(function(item, index) {
							var disabledId = content.endecaName;
							if (content.enabled == "true" && disabledId == item.id) {
								if ($(item).hasChildren) {

								} else {
									var text = item.getText();
									item.setText("").removeClass("disabled");
									var a = new Element('a', {'href': '#', 'id': item.id, 'title': content.shortDescription}).setHTML(text).injectInside(item);
									attachProdListener(a, current);
								}
							}
						});
					}
				}
			}
		});	
	}
}

var attachProdListener = function(el) {
		el.addEvent('click', function(e) {
			e = new Event(e).stop();
			//el.getParent().getParent().getParent().getPrevious().getFirst().appendText(el.getText());
			if (this.hasClass("on")) {
				this.removeClass("on");
				querystring.remove(this.id);
			} else {
				this.addClass("on");
				querystring.push(this.id);
			}
				var req = request.getProducts(querystring);
		});
}