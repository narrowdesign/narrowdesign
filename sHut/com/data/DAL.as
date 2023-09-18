/*
* 	narunas@rga.com
* 	The data access layer that will handle all requests for data access on the SGH site
* 	
* 	class path: all .fla's should set class path to "com"
*   all classes asume a root as "com" 
* 	
* 	naming convention: Classes start in Capitals, includes in lower case.
* 
* 
* 	usage:
* 	all calls to public methods in this class are static: "DAL.getObject()", DAL.setObject", etc.
* 	more instructions to come
* 
* */
import data.JSON;



class data.DAL
{
	private static var dal:DAL;

	private var inObj:Object;
	private var rObj:Object;
	private var rFunc:Function;
	
	// services
	private var servObjArray:Array;
	
	
	
	public function DAL(Void)
	{
		// singleton, invoked once on loading the stage
		if(dal) return;
		dal = this;
	}
	
	
	public function initDAL(o:Object):Void
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
		
		return dal.readCallArray(id, params);

	}
	
	private function readCallArray(id:String, p:String):String
	{
		var st:String =  new String();
		
		for(var i:Number = 0; i < dal.servObjArray.length; i++)
		{
			// pablo removed
			// trace(dal.servObjArray[i].callId.toString());
			if(id.toString() === dal.servObjArray[i].callId.toString())
			{
				
				st = dal.servObjArray[i].callPath + p ;
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
				dal.buildServicesObj(this);
				
				
			} else {
				
				trace("no services information loaded: XML should be here: " + dal.inObj.callPath);
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
			// pablo removed
			// trace("Service name: " + o.callId + " call: " +  o.callPath);
			servObjArray.push(o);
		}
		
		dal.callBack();
	
		
	}

	private function callBack(Void):Void
	{
		// this call back to stage happens only when the DAL is fully ready for use
		rFunc.apply(rObj, []);
		
	}
}
