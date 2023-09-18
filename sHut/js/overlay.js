var Overlay = new Class({
	result: new Object(),
	infoBox: new Object(),
	layover: new Object(),
	close: new Object(),
	
	initialize: function (result) {
		this.result = result;
		this.create();
		this.popDetail(this.infoBox, result);
	},

	create: function() {
		var dimensions = $("content").getCoordinates();
		this.layover = $('overlay');
		this.infoBox = this.layover.getNext().empty().setStyles({
			height: 470,
			left: dimensions.left + 10,
			top: dimensions.top + 20
		});
		if (this.layover.getStyle('opacity') != 0.75) {
			var showLayover = new Fx.Style(this.layover, 'opacity').start(0,0.75);
			var showInfobox = new Fx.Style(this.infoBox, 'opacity').start(0,1);
			this.layover.setStyle('display', 'block');
			this.infoBox.setStyle('display', 'block');
		}
		$(this.layover).addEvent("click", this.close.bindWithEvent(this));
	},
	
	popDetail: function (el, result) {
		var resultkey = []
		for(key in result) {
			resultkey.push(key);
		}
		var type =	result.skuListArray.length == 1 ? "pdp" :
					resultkey[0] == "otherFeaturedStyleFilesArray" ? "curated" :
					resultkey[0] == "styleFileList" ? "sf" :
					result.skuListArray.length >= 2 ? "compare" : "other";			
		el.id = type;
		
		var content = this.format(result, type);
		content.injectInside(el);
		if (type == "pdp") {
			this.createAccordion($('pdp_features'));
			this.createTabs($$('#pdp .tabs')[0]);
		}
	},
		
	format: function(obj, type) {
		var dimensions = this.infoBox.getCoordinates();
		var div = new Element('div', {'id': 'details'});
		this.close = new Element('a', {'id': 'close'}).setHTML('close').injectInside(div).addEvent("click", this.close.bindWithEvent(this));
		if (type == "pdp") {
			var left = new Element('div', {'class': 'left'}).injectInside(div);
			var touts = ["New!", "First at Sunglass Hut", "Exclusive", "No longer available", "In-store only"]
			var tout = new Element('p', {'class': 'tout'}).injectInside(left);
			if (obj.skuListArray[0].newAtSGH == "true") {new Element('span').setHTML(touts[0]).setStyle("font-weight", "bold").injectInside(tout);}
			if (obj.skuListArray[0].firstAtSGH == "true") {new Element('span').setHTML(touts[1]).inject(tout);}
			var title = new Element('h2').setHTML(obj.skuListArray[0].brand).injectAfter(tout);
			var options = new Element('div', {'id': 'prodOptions'}).injectAfter(title);
				new Element('span', {'class': 'price'}).setHTML(obj.skuListArray[0].price).setStyle("font-weight", "bold").injectInside(options);
				new Element('span').setHTML("SKU: " + obj.skuListArray[0].sku).injectInside(options);
				new Element('span').setHTML(obj.skuListArray[0].name).injectInside(options);
				var print = new Element('a', {'class': 'task', 'id': 'pdp_stylefile', 'href': '#'}).setHTML("Add to my stylefile").injectInside(options);
			var views = new Element('div', {'id': 'glass_views'}).injectAfter(options);
				var front_view = new Element('a', {'class': 'icn on', 'id': 'pdp_front', 'href': '#'}).injectInside(views).addEvent('click', function(e) {
					e = new Event(e).stop();
					$ES('a.icn', 'glass_views').removeClass('on');
					image.setProperty('src', imagePath+obj.skuListArray[0].sku+'_fr.jpg');
					this.toggleClass('on');
				});
					var front_image = new Element('img', {'src': 'images/icn_front_view.gif'}).injectInside(front_view);
				var qt_view = new Element('a', {'class': 'icn', 'id': 'pdp_qt', 'href': '#'}).injectAfter(front_view).addEvent('click', function(e) {
					e = new Event(e).stop();
					$ES('a.icn', 'glass_views').removeClass('on');
					image.setProperty('src', imagePath+obj.skuListArray[0].sku+'_qt.jpg');
					this.toggleClass('on');
				});
					var qt_image = new Element('img', {'src': 'images/icn_qt_view.gif'}).injectInside(qt_view);
				var side_view = new Element('a', {'class': 'icn', 'id': 'pdp_side', 'href': '#'}).injectAfter(qt_view).addEvent('click', function(e) {
					e = new Event(e).stop();
					$ES('a.icn', 'glass_views').removeClass('on');
					image.setProperty('src', imagePath+obj.skuListArray[0].sku+'_sd.jpg');
					this.toggleClass('on');
				});
					var side_image = new Element('img', {'src': 'images/icn_side_view.gif'}).injectInside(side_view);
				var glass_case = new Element('a', {'class': 'icn', 'id': 'pdp_case', 'href': '#'}).injectAfter(side_view).addEvent('click', function(e) {
					e = new Event(e).stop();
					$ES('a.icn', 'glass_views').removeClass('on');
					image.setProperty('src', imagePath+obj.skuListArray[0].sku+'_cs.jpg');
					this.toggleClass('on');
				});
					var glass_image = new Element('img', {'src': 'images/icn_case.gif'}).injectInside(glass_case);
				var face_view = new Element('a', {'class': 'icn', 'id': 'pdp_face', 'href': '#'}).injectAfter(glass_case).addEvent('click', function(e) {
					e = new Event(e).stop();
					$ES('a.icn', 'glass_views').removeClass('on');
					image.setProperty('src', imagePath+obj.skuListArray[0].sku+'_fc.jpg');
					this.toggleClass('on');
				});
					var face_image = new Element('img', {'src': 'images/icn_face_view.gif'}).injectInside(face_view);
			var frame_lens = new Element('div', {'id': 'frame_lens'}).injectAfter(views);
			obj.skuListArray[0].siblings.each(function(item, index) {
				var color_combo = new Element('a', {'rel': obj.skuListArray[0].siblings[index].sku, 'title': obj.skuListArray[0].siblings[index].frameColor + ' / ' + obj.skuListArray[0].siblings[index].lensColor, 'class': 'icn', 'href': '#'}).injectInside(frame_lens).addEvent('click', function(e) {
					e = new Event(e).stop();
					new request.getDetails(obj.skuListArray[0].siblings[index].sku);
				});
					var frame_color = new Element('img', {'src': 'images/icn_pdp_frame_'+ obj.skuListArray[0].siblings[index].frameColor+'.gif'}).injectInside(color_combo);
					var lens_color = new Element('img', {'src': 'images/icn_pdp_lens_'+obj.skuListArray[0].siblings[index].lensColor+'.gif'}).injectAfter(frame_color);
			});
			var current_fram_lens = new Element('span').setHTML(obj.skuListArray[0].productDetailFrameObj.color + ' / ' + obj.skuListArray[0].productDetailLensObj.color).inject(frame_lens);
			var image = new Element('img', {'class': 'pdp_image', 'src': imagePath+obj.skuListArray[0].sku+'_fr.jpg'}).setStyle('width','475px').injectAfter(frame_lens);
			var right = new Element('div', {'class': 'right_col'}).injectAfter(left);
			var actions = new Element('div', {'id': 'ext_actions'}).injectInside(right);
				var print = new Element('a', {'class': 'task', 'id': 'pdp_print', 'href': '#'}).setHTML("Print").injectInside(actions);
				var email = new Element('a', {'class': 'task', 'id': 'pdp_email', 'href': '#'}).setHTML("Email").injectAfter(print);
				var blog = new Element('a', {'class': 'task', 'id': 'pdp_blog', 'href': '#'}).setHTML("Blog it").injectAfter(email);				
				var findStore = new Element('a', {'class': 'task', 'id': 'pdp_findStore', 'href': '#'}).setHTML("Find it in a store").injectAfter(blog);
			var tabs = new Element('div', {'class': 'tabs'}).injectAfter(actions);
				var tabs_overview = new Element('span').addClass('on').setHTML('overview').inject(tabs);
				var tabs_overview = new Element('span').setHTML('features').inject(tabs);
			var overview = new Element('div', {'id': 'pdp_overview'}).addClass('tab_content on').injectAfter(tabs);
				var description = new Element('p').setHTML(obj.skuListArray[0].longDescription).injectInside(overview);
			var features = new Element('div', {'id': 'pdp_features'}).addClass('tab_content').injectAfter(overview);
				var benefits = new Element('div', {'class': 'toggler'}).setHTML('Features + Benefits').injectInside(features);
					var benefits_content = new Element('div', {'class': 'toggled'}).injectAfter(benefits);
					var ul_benefits = new Element('ul').injectInside(benefits_content);
					var ulright = new Element('ul', {'class': 'right'}).injectAfter(ul_benefits);
					obj.skuListArray[0].productDetailsFeaturesBenefitArray.each(function(item, index) {
						var li = new Element('li').setHTML(item);
							if (index >= obj.skuListArray[0].productDetailsFeaturesBenefitArray.length/2) {
								li.injectInside(ulright);
							} else {
								li.injectInside(ul_benefits);
							}
					});
					var benefits_lens = new Element('h3').setHTML('Lens').injectAfter(ulright);
					var lens_list = new Element('ul').injectAfter(benefits_lens);
					var lens_listright = new Element('ul', {'class': 'right'}).injectAfter(lens_list);
					for (key in obj.skuListArray[0].productDetailLensObj) {
						var li = new Element('li').setHTML(key + ': ' + obj.skuListArray[0].productDetailLensObj[key]).injectInside(lens_list);
					}
					lens_list.getLast().injectInside(lens_listright);
					var benefits_frame = new Element('h3').setHTML('Frame').inject(benefits_content);
					var frame_list = new Element('ul').injectAfter(benefits_frame);
					var frame_listright = new Element('ul', {'class': 'right'}).injectAfter(frame_list);
					for (key in obj.skuListArray[0].productDetailFrameObj) {
						var li = new Element('li').setHTML(key + ': ' + obj.skuListArray[0].productDetailFrameObj[key]).injectInside(frame_list);
					}
					frame_list.getLast().injectInside(frame_listright);
					frame_list.getLast().injectInside(frame_listright);
				var breakage = new Element('div', {'class': 'toggler'}).setHTML('Breakage Protection Plan').inject(features);
					var breakage_content = new Element('div', {'class': 'toggled'}).setHTML(obj.skuListArray[0].breakagePlan).injectAfter(breakage);
				var returns = new Element('div', {'class': 'toggler'}).setHTML('Returns + Warranty').inject(features);
					var returns_content = new Element('div', {'class': 'toggled'}).setHTML(obj.skuListArray[0].returnsAndWarranty).injectAfter(returns);
				var about = new Element('div', {'class': 'toggler'}).setHTML('About ' + obj.skuListArray[0].brand).inject(features);
					var about_content = new Element('div', {'class': 'toggled'}).setHTML(obj.skuListArray[0].aboutBrand).injectAfter(about);
			var related = new Element('div', {'id': 'related'}).setStyle('width', dimensions.width).inject(div);
				var crosssales = new Element('div', {'id': 'cross_sales'}).inject(related);
				obj.skuListArray[0].crossSales.each(function(item,index) {
					var cross_link = new Element('a', {'id': obj.skuListArray[0].crossSales[index] + '_crosslink', 'class': 'similar_item'}).injectInside(crosssales).addEvent('click', function(e) {
						e = new Event(e).stop();
						new request.getDetails(obj.skuListArray[0].crossSales[index]);
					});
					var cross_image = new Element('img', {'id': obj.skuListArray[0].crossSales[index] + '_cross', 'class': 'similar_image', 'src': imagePath+obj.skuListArray[0].crossSales[index]+'_fr.jpg'}).inject(cross_link);
				});
				//var featuredstyles = new Element('div', {'id': 'featuredstyles'}).inject(related);
				//obj.skuListArray[0].crossSales.each(function(item,index) {
				//	var featured_link = new Element('a', {'id': obj.skuListArray[0].productDetailsFeaturesBenefitArray[index] + '_featuredlink'}).injectInside(featuredstyles).addEvent('click', function(e) {
				//		e = new Event(e).stop();
				//		new request.getDetails(obj.skuListArray[0].productDetailsFeaturesBenefitArray[index]);
				//	});
				//	var featured_image = new Element('img', {'id': obj.skuListArray[0].crossSales[index] + '_cross', 'src': imagePath+obj.skuListArray[0].productDetailsFeaturesBenefitArray[index]+'_fr.jpg'}).inject(featured_link);
				//});
		} else if (type == "compare") {
			var title = new Element('h2').setHTML('Product Comparison').inject(div);
			obj.skuListArray.each(function(item, index) {
				var glass_container = new Element('div', {'class': 'glass_compare', 'id': obj.skuListArray[index].sku + '_compare'}).setStyles({
					width: (dimensions.width- 25)/obj.skuListArray.length
					}).inject(div);
				var box1 = new Element('div', {'class': 'comparebox'}).inject(glass_container);
					var title = new Element('h3').setHTML(obj.skuListArray[index].brand).inject(box1);
					var imagebox = new Element('div', {'class': 'imagebox'}).inject(box1);
					var image = new Element('img', {'class': 'compare_image', 'src': imagePath+obj.skuListArray[index].sku+'_fr.jpg'}).inject(imagebox);
					var touts = ["New", "First at Sunglass Hut", "Exclusive", "No longer available", "In-store only"]
					var compare_functions = new Element('div', {'class': 'functions'}).inject(box1);
					var tout = new Element('p', {'class': 'tout'}).injectInside(compare_functions);
					if (obj.skuListArray[index].newAtSGH == "true") {new Element('span').setHTML(touts[0]).injectInside(tout);}
					if (obj.skuListArray[index].firstAtSGH == "true") {new Element('span').setHTML(touts[1]).inject(tout);}
					//var price = new Element('p', {'class': 'price'}).setHTML('$' + $(el).getFirst().getProperty("rel")).inject(actions);
					var addStyle = new Element('a', {'class': 'addStyle', 'href': '#'}).injectInside(compare_functions);
					var clear = new Element('div', {'class': 'clear'}).inject(compare_functions);
				var box2 = new Element('div', {'class': 'comparebox'}).injectAfter(box1);
					var material_head = new Element('h4').setHTML('Lens Material').inject(box2);
					var lens_material = new Element('p').setHTML(obj.skuListArray[index].productDetailLensObj.material).inject(box2);
					var treatment_head = new Element('h4').setHTML('Lens Treatment').inject(box2);
					var lens_treatment = new Element('p').setHTML(obj.skuListArray[index].productDetailLensObj.treatment).inject(box2);
				var box3 = new Element('div', {'class': 'comparebox'}).injectAfter(box2);
					var fr_mat_head = new Element('h4').setHTML('Frame Material').inject(box3);
					var frame_material = new Element('p').setHTML(obj.skuListArray[index].productDetailFrameObj.material).inject(box3);
					var fr_feat_head = new Element('h4').setHTML('Frame Features').inject(box3);
					var frame_features = new Element('p').setHTML(obj.skuListArray[index].productDetailFrameObj.style).inject(box3);
				var box4 = new Element('div', {'class': 'comparebox'}).injectAfter(box3);
					var fr_mat_head = new Element('h4').setHTML('Price').inject(box4);
					var comp_price = new Element('p').setHTML(obj.skuListArray[index].price).inject(box4);
			});
			var options = new Element('div', {'id': 'prodOptions'}).injectAfter(title);
			var views = new Element('div', {'id': 'glass_views'}).inject(options);
				var front_view = new Element('a', {'class': 'icn on', 'id': 'pdp_front', 'href': '#'}).injectInside(views).addEvent('click', function(e) {
					e = new Event(e).stop();
					$ES('a.icn', 'glass_views').removeClass('on');
					$$('img.compare_image').each(function(item, index) {
						var source = item.src.replace("qt","fr");
						item.setProperty('src', source);
					});
					this.toggleClass('on');
				});
					var front_image = new Element('img', {'src': 'images/icn_front_view.gif'}).injectInside(front_view);
				var qt_view = new Element('a', {'class': 'icn', 'id': 'pdp_qt', 'href': '#'}).injectAfter(front_view).addEvent('click', function(e) {
					e = new Event(e).stop();
					$ES('a.icn', 'glass_views').removeClass('on');
					$$('img.compare_image').each(function(item, index) {
						var source = item.src.replace("fr","qt");
						item.setProperty('src', source);
					});
					this.toggleClass('on');
				});
					var qt_image = new Element('img', {'src': 'images/icn_qt_view.gif'}).injectInside(qt_view);
		}
		return div;			
	},
	
	close: function() {
		new Fx.Style($('overlay'), 'opacity').start(0.75, 0, {onComplete: $('overlay')});
		new Fx.Style($E('.pane'), 'opacity').start(1,0, {onComplete: $('overlay').getNext().empty()});
		this.popDetail.content = null;
	},
	
	refresh: function(sku) {
		//this.popDetail(this.infoBox, result);
		request.getDetails(sku);
		//new Fx.Style($E('.pane #details'), 'opacity').start(0, {
		//	onComplete: $('overlay').getNext().empty().setStyle('display', 'none')
		//});		
	},

	createAccordion: function(parent_el) {
		var pdp_accordion = new Accordion('div.toggler', 'div.toggled', {
			fixedHeight: 190,
			onActive: function(toggler, element){
				toggler.setStyle('background', 'url(images/menu_downArrow.gif) #fff no-repeat top right;');
				element.setStyles({'border-bottom': '1px solid #c5c5c5', 'padding': '5px 10px'});
			},

			onBackground: function(toggler, element){
				toggler.setStyle('background', 'url(images/menu_rightArrow.gif) #fff no-repeat top right;');
				element.setStyles({'padding': '0 10px'});
			}
		}, parent_el);
	},
	
	createTabs: function(parent_el) {
		$(parent_el).getChildren().each(function(item, index) {
			item.addEvent('click', function(e) {
				e = new Event(e).stop();
				$(parent_el).getChildren().removeClass('on');
				$$('.tab_content').removeClass('on');
					this.toggleClass('on');
					$('pdp_' + item.getText()).toggleClass('on');
			});
		});
	}

});