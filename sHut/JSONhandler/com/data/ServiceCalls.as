/*
* 	narunas@rga.com
* 	The ServiceCalls class will handle all requests for JSON Service calls on the SGH site
* 	
* 	class path: all .fla's should set class path to "com"
*   all classes assume a root as "com" 
* 	
* 	naming convention: Classes start in Capitals, includes in lower case.
* 
* 
* 	usage:
* Assumption is that there will be a single instance of this class needed to handle
* the parsing and returning the corresponding JSON call according to supplied ID 
* 
* 
* 
* 	
* 
* */
import data.JSON;



class data.ServiceCalls
{
	private static var srv:ServiceCalls;

	private var inObj:Object;
	
	///return call object and function 
	private var rObj:Object;
	private var rFunc:Function;
	
	// services
	private var servObjArray:Array;
	
	
	
	public function ServiceCalls(Void)
	{
		// singleton, invoked once on loading the stage
		if(srv) return;
		srv = this;
	}
	
	
	public function initServices(o:Object):Void
	{
		// stage callback functionality
		inObj = new Object();
		inObj = o;
		rObj = new Object();
		rObj = o.rO;
		rFunc = new Function();
		rFunc = o.rF;
		
		
		// services xml handling
		readSevicesXml();
		
	}
	
	public static function getCall(id:String, params:String):String
	{
		
		return srv.readCallArray(id, params);

	}
	
	private function readCallArray(id:String, p:String):String
	{
		var st:String =  new String();
		
		for(var i:Number = 0; i < srv.servObjArray.length; i++)
		{
			trace(srv.servObjArray[i].callId.toString());
			if(id.toString() === srv.servObjArray[i].callId.toString())
			{
				
				st = srv.servObjArray[i].callPath + p ;
			}

		}
		
		return st;	

		
	}
	

	private function readSevicesXml(Void):Void
	{
		var servXml:XML = new XML();
		servXml.ignoreWhite = true;
		servXml.load(inObj.callPath);
		
		servXml.onData = function(xm:String) {
			if(xm)
			{

				this.parseXML(xm);
				srv.buildServicesObj(this);
				
				
			} else {
				
				trace("no services information loaded: XML should be here: " + srv.inObj.callPath);
			}
		}
		
		servXml = null;
		
	}
	private function buildServicesObj(xm:XML):Void
	{
		
		servObjArray = new Array();
		for (var i:Number = 0; i < xm.firstChild.childNodes.length; i++)
		{
			var o:Object = new Object();
			o.callId = xm.firstChild.childNodes[i].attributes["id"];
			o.callPath = xm.firstChild.childNodes[i].firstChild
			trace("Service name: " + o.callId + " call: " +  o.callPath);
			servObjArray.push(o);
		}
		
		srv.callBack();
	
		
	}

	private function callBack(Void):Void
	{
		// this call back to stage happens only when the ServiceCalls is fully ready for use
		rFunc.apply(rObj, []);
		
	}
}
