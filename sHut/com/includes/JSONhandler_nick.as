/*
* narunas@rga.com
* main stage include for the JSON_to_FLASH functionality display
*/
import data.DAL;
import data.JSON;

// ***********************************************************************


parameters = "?cmd=get&key=011,012,013,014,015,016,017,018&sku=1,2,3,4,5,6,7,8"


// ***********************************************************************

function JSONhandler(){
		trace('JSONHandler');
		
		var scope = this;
		//  var jo:JSON = new JSON();
		jo = new JSON();
		var tracer:MovieClip = this.tracer;
		
			
		// var brandsArray:Array = new Array();
		
		
		// incoming parameters
		
		 var varObj:Object = new Object();
		 // varObj = new Object();
		varObj.callPath = _root.callPath;
		varObj.path = _root.path;
		varObj.section = _root.section;
		varObj.prodId = _root.productId;
		
		// instatiating main Classes
		
		var dal:DAL = new DAL();
		var dO:Object = new Object();
		dO.callPath = varObj.callPath;
		
		if(dO.callPath == undefined || dO.callPath == "" || dO.callPath == null)
			{
				dO.callPath = "xml/services.xml";
			}
		
		dO.rO = this;
		dO.rF = dalBuilt;
		dal.initDAL(dO);

}





function dalBuilt(a:Array):Void
{
	   trace('dalBuilt()');
       getRatings();                                                                                                                                            
    
}

function getRatings(Void):Void
{    

	var scope = this;
	var parameters = String(parameters)
	
	
	//
    var jsondata:LoadVars = new LoadVars();
        jsondata.load(DAL.getCall("FaceSunglassRating", parameters));
         tracer.text = "called"    
        jsondata.onData = function(str:String):Void
        {
                            
             scope.gotRatings(scope.jo.parse(str));
        }    
}



// +++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++

function gotRatings(o:Object):Void{
		
	// trace('o: ' + o);
	
	ratingObject = new Object();
	ratingObject = o["results"]; 
	 // this JSON object is loaded and parsed . now let's go to the flash stage
	 JSONloaded();
}
