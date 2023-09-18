/*
       _            _            _             _            _           _            _          
      /\ \         /\ \         /\ \     _    /\ \         /\ \        /\ \         /\ \     _  
      \_\ \       /  \ \       /  \ \   /\_\ /  \ \____   /  \ \      /  \ \       /  \ \   /\_\
      /\__ \     / /\ \ \     / /\ \ \_/ / // /\ \_____\ / /\ \ \    / /\ \ \     / /\ \ \_/ / /
     / /_ \ \   / / /\ \_\   / / /\ \___/ // / /\/___  // / /\ \_\  / / /\ \_\   / / /\ \___/ / 
    / / /\ \ \ / /_/_ \/_/  / / /  \/____// / /   / / // / /_/ / / / /_/_ \/_/  / / /  \/____/  
   / / /  \/_// /____/\    / / /    / / // / /   / / // / /__\/ / / /____/\    / / /    / / /   
  / / /      / /\____\/   / / /    / / // / /   / / // / /_____/ / /\____\/   / / /    / / /    
 / / /      / / /______  / / /    / / / \ \ \__/ / // / /\ \ \  / / /______  / / /    / / /     
/_/ /      / / /_______\/ / /    / / /   \ \___\/ // / /  \ \ \/ / /_______\/ / /    / / /      
\_\/       \/__________/\/_/     \/_/     \/_____/ \/_/    \_\/\/__________/\/_/     \/_/       

*/                                                                                                

var canvas = document.getElementById('pattern');
var ctx = canvas.getContext('2d');
var canvasHolder = document.getElementById('holder');

var i;
var patternInterval;

function newPattern() {
	i=0;
	clearInterval(patternInterval)
	ctx.restore();
	rotation = Math.floor(Math.random()*-20)-20;
	w = Math.floor(Math.random()*(window.innerWidth/4))+60;
	h = Math.floor(Math.random()*(window.innerHeight/4))+60;
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	patternInterval = setInterval(function(){
		canvasHolder.style.opacity=1;
		ctx.lineWidth = .3;
		ctx.save();
		ctx.strokeStyle = 'rgb('+Math.floor((105+(i/8)))+','+Math.floor((168-(i/4)))+','+Math.floor((154+(i/20)))+')';		
		ctx.translate((i*5)-w,h/4)
		ctx.rotate(i/rotation);
		ctx.strokeRect (-w/2, 0, w, h);
		
		ctx.restore();
		i++;
		if(i>500){
			canvasHolder.style.opacity=0;
			clearInterval(patternInterval)
			setTimeout(newPattern,1000)
		}
	},30)
}