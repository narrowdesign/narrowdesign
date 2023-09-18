$(function(){

findService();

});

//	Define URLs for all services
	function findService() {
		var GetBrandsList;
		var GetBrandInformation;
		var ProductSearch = '';
		var ProductDetail;
		var StyleFileGetList;

		dojo.io.bind({
			url:  "/redesign/web/servicesXML/services_dev.xml",
			mimetype: "text/xml",
			load: function(type, data, evt) {
				var services = [];
				var result = data.getElementsByTagName("service");
				for(var i=0; i<result.length; i++){
					services.push(dojo.dom.textContent(result.item(i)));
					GetBrandsList = services[0];
					GetBrandInformation = services[1];
					ProductSearch = services[2];
					ProductDetail = services[3];
					StyleFileGetList = services[4];
				}
			prodSearch.init(ProductSearch);
			}
		});
	}

//	query against jsp to return selected sunglasses and populate catalog
	var prodSearch = {
		init: function(ProductSearch) {
			$("#brands a").click(function () {
				$(this).addClass("on");
				prodSearch.setup(ProductSearch);
				return false;
			});
		},
		
		setup: function (url) {
			dojo.io.bind({
				url:  url,
				mimetype: "text/html",
				load: function (type, data, evt){
					var jObj=dojo.json.evalJson(data);
					for(var i=0; i < jObj.searchResults.length; i++) {
						var short = jObj.searchResults[i].shortDescription;
						var sku = jObj.searchResults[i].SKU;
						var image = "/redesign/web/productImages/" + sku + "_fr.jpg";
						prodSearch.popCatalog(image, sku);
					}
				}
			});
		},
		
		popCatalog: function(image, sku) {
			var container = dojo.byId("view");
			var emptyBox = dojo.byId("infoBox");
			var newBox = emptyBox.cloneNode(true);
			newBox.id = "infoBox-" + sku;
			newBox.childNodes[0].src = image;
			newBox.childNodes[0].id = sku;
			$("#view").append(newBox);
		}
	}

//	Find form input elements and swap defaults for styled images
var inputfix = {
	inputs: '',
	chkfalse: 'images/chkfalse.gif',
	chktrue: 'images/chktrue.gif',
	radfalse: 'images/radfalse.gif',
	radtrue: 'images/radtrue.gif',

	init: function () {
		inputfix.replaceChecks();
		inputfix.replaceRadio();
	},

	replaceChecks: function () {
	    inputs = document.getElementsByTagName('input');
	    for(var i=0; i < inputs.length; i++) {
		//check if the input is a checkbox
		if(inputs[i].getAttribute('type') == 'checkbox') {
		    inputs[i].id = 'check'+i;
		    var img = document.createElement('img');
		    img.id = 'checkimg'+i;
		     img.className = 'check';
		    img.src = (inputs[i].checked) ? inputfix.chktrue : inputfix.chkfalse;
		    //set image
		    img.onclick = new Function('inputfix.checkChange('+i+')'); 
		    //place image in front of the checkbox
		    inputs[i].parentNode.insertBefore(img, inputs[i]);
		    inputs[i].style.display='none';
		}
	    }
	},

	//change the checkbox status and the replacement image
	checkChange: function (i) {
	    if(document.getElementById('check'+i).checked) {
		document.getElementById('check'+i).checked = '';
		document.getElementById('checkimg'+i).src=inputfix.chkfalse;
	    } else {
		document.getElementById('check'+i).checked = 'checked';
		document.getElementById('checkimg'+i).src=inputfix.chktrue;
	    }
	},

	replaceRadio: function () {
		inputs = document.getElementsByTagName('input');
		for(var i=0; i < inputs.length; i++) {
			if(inputs[i].getAttribute('type') == 'radio') {
				inputs[i].id = 'radio'+i;
				var img = document.createElement('img');
				img.id = 'radimg'+i;
				img.className = 'check';
				img.src = (inputs[i].checked) ? inputfix.radtrue : inputfix.radfalse;
				//set image
				img.onclick = new Function('inputfix.radioChange('+i+')'); 
				//place image in front of the checkbox
				inputs[i].parentNode.insertBefore(img, inputs[i]);
				inputs[i].style.display='none';
			}
		}
	},

	//change the checkbox status and the replacement image
	radioChange: function (i) {
	    if(document.getElementById('radio'+i).checked) {
		document.getElementById('radio'+i).checked = '';
		document.getElementById('radimg'+i).src=inputfix.radfalse;
	    } else {
		document.getElementById('radio'+i).checked = 'checked';
		document.getElementById('radimg'+i).src=inputfix.radtrue;
	    }
	},

	selectbox: function(el) {
		el.previousSibling.childNodes[0].nodeValue = el.options[el.selectedIndex].value;
	}
}

//	Set up anchored pages
	var anchorPage = {
		init: function() {
			var search_anchor = /#.*/;
			var anchor = search_anchor.exec(document.location);
			var search_url = /\w+\.\w.*/;
			var file = search_url.exec(document.location);
			$(".showHide").hide();
			$('a[@href$="'+location.pathname.substring(1)+'"]').addClass("on");
			if (anchor != null) {
				$('#navigation ul.main a').removeClass("on");	//make sure no other section is 'on'
				$(anchor[0]).fadeIn("slow").addClass("on");		//show the proper section and set 'on'
				$("#navigation h2").html($('#navigation ul.main a[@href$="'+anchor[0]+'"]').addClass("on").attr("title"));		//update h2 with proper section title
				$('#navigation ul.main a[@href$="'+anchor[0]+'"]').addClass("on");		//find the correct nav link and set 'on'
			} else {
					$("#mainArea .on").fadeIn("fast");
			}

			$("#navigation ul.main a").click( function(){
				var section = $(this).attr("href");
				$("#navigation h2").html($(this).attr("title"));
				$(".showHide").hide().removeClass("on");
				$(section).fadeIn("slow").addClass("on");
				$("#navigation ul.main a").removeClass("on");
				$(this).addClass("on");
			});
		}
	}
