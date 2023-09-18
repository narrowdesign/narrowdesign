import video.*;
import mx.video.FLVPlayback;
import mx.utils.Delegate;

class video.InteriorVideo extends MovieClip {
	
	// related to the parsing of the xml
	private var xmlSource:XML;
	private var dataObject:Object;
	private var xmlPath:String;
	
	// Delay variables
	private var startDelay:Number;
	private var betweenDelay:Number;
	private var delayInt:Number; // the interval
	
	// The root path to the videos
	private var activePath:String;
	private var idlePath:String;
	
	// State Variable
	private var currentState:String;
	
	// two arrays of videos (idle & active), and their x/y coordinates
	private var idleVideos:Array;	
	private var currentIdleVid:Number; // storing the current idle video
	private var idlePlaying:Boolean;
	private var activeVideos:Array;
	private var currentActiveVid:Number; // storing the current active video
	
	// The Video Holders!
	public var videoSpot:FLVPlayback;
		
	function InteriorVideo() {
		// The state (either active or idle) that determines what video group to play
		currentState = "active";
		idlePlaying = false;
		
		// The delay, in seconds, before a video starts
		startDelay = 2;
		// The delay, in seconds, between videos		
		betweenDelay = 0;
		
		xmlPath = "friskyVideos.xml";
				
		// Load the XML
		dataObject = new Object;
        xmlSource = new XML();
        xmlSource.ignoreWhite = true;
		xmlSource.onLoad = Delegate.create(this, doXMLParse);
        xmlSource.load(xmlPath);
	}
	
	private function doXMLParse():Void{
		dataObject = XMLParse.getInstance().initSmartParse(xmlSource);
		delete xmlSource;
		
		activePath = dataObject.rootPath + dataObject.InteriorVideos.ActiveVids.directory;
		idlePath = dataObject.rootPath + dataObject.InteriorVideos.IdleVids.directory;

		activeVideos = new Array();
		for (var i:Number = 0; i<dataObject.InteriorVideos.ActiveVids.video.length; i++){
			var tOb:Object = dataObject.InteriorVideos.ActiveVids.video[i];
			activeVideos.push({fileName:tOb.fileName, x:tOb.x, y:tOb.y});
		}
		
		idleVideos = new Array();
		for (var i:Number = 0; i<dataObject.InteriorVideos.IdleVids.video.length; i++){
			var tOb:Object = dataObject.InteriorVideos.IdleVids.video[i];
			idleVideos.push({fileName:tOb.fileName, x:tOb.x, y:tOb.y});
		}
		
		// Randomly sort the videos using silliness...
		idleVideos = idleVideos.sort(arShuffle);
		activeVideos = activeVideos.sort(arShuffle);
		
		startItUp();
	}	
	
	private function startItUp():Void {	
		// turn the video player visiblity off (just in case!)
		videoSpot.visible = false;
		
		videoSpot.autoRewind = true;		
	
		// when the video is complete, play the next video
		var ref:MovieClip = this;
		videoSpot.addEventListener("complete", Delegate.create(ref, nextVid));
		
		// show the first videos first!
		currentActiveVid = 0;
		currentIdleVid = 0;
		
		// set the interval before the first video plays
		if(currentState == "active") delayInt = setInterval(Delegate.create(this, playActiveVideo), startDelay * 1000);
		else delayInt = setInterval(Delegate.create(this, playIdleVideo), startDelay * 1000);		
	}
	
	private function playActiveVideo():Void{
		clearInterval(delayInt);
		trace("Play Active Cat Video ("+activeVideos[currentActiveVid].fileName+")");
		
		// Set the videos x/y coordinates
		videoSpot._x = activeVideos[currentActiveVid].x;
		videoSpot._y = activeVideos[currentActiveVid].y;

		// make it visible and play it
		videoSpot._visible = true;
		videoSpot.contentPath = activePath + activeVideos[currentActiveVid].fileName;
	}
	private function playIdleVideo():Void{
		clearInterval(delayInt);
		trace("Play Idle Cat Video ("+idleVideos[currentIdleVid].fileName+")");
		
		// Set the videos x/y coordinates
		videoSpot._x = idleVideos[currentIdleVid].x;
		videoSpot._y = idleVideos[currentIdleVid].y;

		// make it visible and play it
		videoSpot._visible = true;
		videoSpot.contentPath = idlePath + idleVideos[currentIdleVid].fileName;
		
		idlePlaying = true;
	}
	
	private function nextVid():Void{
		if(currentState=="active"){
			idlePlaying = false;
			
			// turn the video off
			videoSpot._visible = false;
		
			// advance to the next video (or back to the first if we are at the end)
			currentActiveVid ++;
			if( currentActiveVid > activeVideos.length - 1 ) currentActiveVid = 0;
				
			// set the interval until the next video should be played
			delayInt = setInterval(Delegate.create(this, playActiveVideo), betweenDelay * 1000);
		}
		else if(idlePlaying) videoSpot.play();
		else{		
			// turn the video off
			videoSpot._visible = false;

			// advance to the next video (or back to the first if we are at the end)
			currentIdleVid ++;
			if( currentIdleVid > idleVideos.length - 1 ) currentIdleVid = 0;

			// set the interval until the next video should be played
			delayInt = setInterval(Delegate.create(this, playIdleVideo), betweenDelay * 1000);
		}
	}
	
	private function arShuffle(a:Number, b:Number):Number{
		var num : Number = Math.round(Math.random() * 2) - 1;
		return num;
	}
	
	public function changeState(ns:String):Void{
		trace("Current state change: " + ns);
		currentState = ns;
	}
}