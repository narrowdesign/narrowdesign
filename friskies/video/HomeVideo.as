import video.*;
import mx.video.FLVPlayback;
import mx.utils.Delegate;

class video.HomeVideo extends MovieClip {
	
	// source of the xml
	private var xmlPath:String;
	
	// related to the parsing of the xml
	private var xmlSource:XML;
	private var dataObject:Object;
	
	// Delay variables
	private var startDelay:Number;
	private var betweenDelay:Number;
	private var delayInt:Number; // the interval
	
	// The root path to the videos
	private var videoPath:String;
	
	// An array of videos, and their x/y coordinates
	private var catVideos:Array;	
	private var currentVid:Number; // storing the current video
	
	// The Video Holder!
	public var videoSpot:FLVPlayback;
		
	function HomeVideo() {	
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
		
		videoPath = dataObject.rootPath + dataObject.HomeVideos.directory;

		catVideos = new Array();
		for (var i:Number = 0; i<dataObject.HomeVideos.video.length; i++){
			var tOb:Object = dataObject.HomeVideos.video[i];
			catVideos.push({fileName:tOb.fileName, x:tOb.x, y:tOb.y});
		}
		
		// Randomly sort the videos using silliness...
		catVideos = catVideos.sort(arShuffle);
		
		// On Load, set-up the fun
		startItUp();
	}
	
	private function startItUp():Void {
		// turn the video player visiblity off (just in case!)
		videoSpot.visible = false;
	
		// when the video is complete, play the next video
		var ref:MovieClip = this;
		videoSpot.addEventListener("complete", Delegate.create(ref, nextVid));
		
		// show the first video first!
		currentVid = 0;
		
		// set the interval before the first video plays
		delayInt = setInterval(Delegate.create(this, playVideo), startDelay * 1000);
	}
	
	private function playVideo():Void{
		clearInterval(delayInt);
	
		trace("Play Cat Video ("+catVideos[currentVid].fileName+")");
		
		// Set the videos x/y coordinates
		videoSpot._x = catVideos[currentVid].x;
		videoSpot._y = catVideos[currentVid].y;

		// make it visible and play it
		videoSpot._visible = true;
		videoSpot.contentPath = videoPath + catVideos[currentVid].fileName;
		
		// advance to the next video (or back to the first if we are at the end)
		currentVid ++;
		if( currentVid > catVideos.length - 1 ) currentVid = 0;
	}
	
	private function nextVid():Void{
		// turn the video off
		videoSpot._visible = false;
		
		// set the interval until the next video should be played
		delayInt = setInterval(Delegate.create(this, playVideo), betweenDelay * 1000);
	}
	
	private function arShuffle(a:Number, b:Number):Number{
		var num : Number = Math.round(Math.random() * 2) - 1;
		return num;
	}
	
}