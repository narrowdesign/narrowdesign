Fx.Morph = Fx.Styles.extend({
 
	start: function(className){
 
		var to = {};
 
		$each(document.styleSheets, function(style){
			var rules = style.rules || style.cssRules;
			$each(rules, function(rule){
				if (!rule.selectorText.test('\.' + className + '$')) return;
				Fx.CSS.Styles.each(function(style){
					if (!rule.style || !rule.style[style]) return;
					var ruleStyle = rule.style[style];
					to[style] = (style.test(/color/i) && ruleStyle.test(/^rgb/)) ? ruleStyle.rgbToHex() : ruleStyle;
				});
			});
		});
		return this.parent(to);
	}
 
});
 
Fx.CSS.Styles = ["color", "width", "height", "left", "top", "bottom", "right", "fontSize", "letterSpacing", "lineHeight", "textIndent", "opacity"];
 
Fx.CSS.Styles.extend(Element.Styles.padding);
Fx.CSS.Styles.extend(Element.Styles.margin);
 
Element.Styles.border.each(function(border){
	['Width', 'Color'].each(function(property){
		Fx.CSS.Styles.push(border + property);
	});
});
 
var compare_morph = new Fx.Morph('compare', {wait: false});

var sf_morph = new Fx.Morph('stylefile', {wait: false}); 

$('compare_closed').addEvent('click', function(e){
	new Event(e).stop();
 
	compare_morph.start('compare_closed');
});
 
$('compare_open').addEvent('click', function(e){
	new Event(e).stop();
 
	compare_morph.start('compare_open');
 	sf_morph.start('stylefile_closed');
	$('stylefile').style.zIndex='6';
	$('compare').style.zIndex='7';
});
 
$('stylefile_closed').addEvent('click', function(e){
	new Event(e).stop();
 
	sf_morph.start('stylefile_closed');
});
 
$('stylefile_open').addEvent('click', function(e){
	new Event(e).stop();
	sf_morph.start('stylefile_open');
	compare_morph.start('compare_closed');
	$('stylefile').style.zIndex='7';
	$('compare').style.zIndex='6';
});

$$('#compare', '#stylefile').each(function(drop, index){
		
	drop.addEvents({
		'drop': function(el, obj){
			var gonogo=true;
			var pic = el.getFirst();
			
			var checks = $ES('.pic',drop); 
			checks.each(function(check){
				if (pic.src==check.src)
				{
					gonogo=false;
				}
			});
			
			if (gonogo==true)
			{	
				var clone = el.clone();
				clone.removeEvents();
				clone.inject(drop);
				clone.setStyles({'opacity': 1, 'position': ''});
				
				clone.getFirst().setStyles({'width': 75});

				clone.addEvent('mousedown', function(e) {
					e = new Event(e).stop();
					
					var reclone = this.clone();
					
					reclone.setStyles(this.getCoordinates());
					reclone.setStyles({'opacity': 0.7, 'position': 'absolute'});
					reclone.inject(document.body);
					reclone.addEvent('emptydrop', function() {
						clone.remove();
						this.remove();
					});

					var drag = reclone.makeDraggable({
						droppables: $$('#compare', '#stylefile')
					});
					
					drag.start(e); 
				});
			}
			el.remove();
		}
	});
});

var accordion = new Accordion('div.toggler', 'div.toggled', {
	fixedHeight: 389,
	onActive: function(toggler, element){
		toggler.setStyle('background', 'url(images/menu_downArrow.gif) #FFFFFF no-repeat top right;');
	},
 
	onBackground: function(toggler, element){
		toggler.setStyle('background', 'url(images/menu_rightArrow.gif) #FFFFFF no-repeat top right;');
	}
}, $('navigation'));

var accordion_stylefile = new Accordion('div.toggler', 'div.toggled', {
	fixedHeight: 235,
	onActive: function(toggler, element){
		toggler.setStyle('background', 'url(images/menu_downArrow.gif) #FFFFFF no-repeat top right;');
	},
 
	onBackground: function(toggler, element){
		toggler.setStyle('background', 'url(images/menu_rightArrow.gif) #FFFFFF no-repeat top right;');
	}
}, $('pdp_features'));

var nav_slide_elements = $$('#navigation_border', '#navigation_toggle');

var nav_slide = new Fx.Elements(nav_slide_elements, {wait: false, duration: 500, transition: Fx.Transitions.Back.easeOut});

$('navigation_toggle').addEvent('click', function(e){
	e = new Event(e);
	
	if ($('navigation_toggle').style.left=='0px')
	{
		var vo = $('view').style.left.toInt();
		nav_slide.start({
			'0': {
			'left': [-236,0]
			},
			'1': {
			'left': [0, 236]
			}
		});
	}
	else
	{	
		var vo = $('view').style.left.toInt();
		nav_slide.start({
			'0': {
			'left': [0,-236]
			},
			'1': {
			'left': [236, 0]
			}
		});
	}
	e.stop();
});


var right_arrow = new Fx.Style('view', 'left',{duration:500});

$('right_arrow').addEvent('click', function(e){
	var vo = $('view').style.left.toInt();
	var no = 680;
	if ($('navigation_toggle').style.left=='0px')
	{
		var no = 916;
	}
	right_arrow.start(vo, vo-no);
});

var left_arrow = new Fx.Style('view', 'left',{duration:500});

$('left_arrow').addEvent('click', function(e){
	var vo = $('view').style.left.toInt();
	var no = 680;
	if ($('navigation_toggle').style.left=='0px')
	{
		var no = 916;
	}
	left_arrow.start(vo, vo+no);
});

function create_trays () {
	// $('view').remove();

}


