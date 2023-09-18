
/*
* narunas@rga.com
* main stage include for the JSON_to_FLASH functionality display
* Any questions? my extention is 8338
* 
*
* */
import data.ServiceCalls;
import data.JSON;



var scope = this;
var jo:JSON = new JSON();

// tracing functionality, remove before flight
var tracer:MovieClip = this.tracer;
tracer._txt.multiline = true;
tracer._txt.autoSize = "left";
// 


var brandsArray:Array = new Array();


    // incoming parameters taht will be used to get the service call xml
    var varObj:Object = new Object();
    varObj.callPath = _root.callPath;
	
    
    // instatiating main Classes
    var srv:ServiceCalls = new ServiceCalls();
    var dO:Object = new Object();
    dO.callPath = varObj.callPath;
    
    if(dO.callPath == undefined || dO.callPath == "" || dO.callPath == null)
    {
        dO.callPath = "xml/services_dev.xml";
    }
    
	
	//here we're setting up a return call and function once JSON Service calls are available 
    dO.rO = this;
    dO.rF = servicesBuilt;
    srv.initServices(dO);

function servicesBuilt(a:Array):Void
{
		
        /*
		* here will go any functionality that does not require interaction to read JSON data
		* for example, we can call a method to read and parse any data needed to build a page "on load".
		*/
		
		getAllBrands();
}

/*
	
	NOTE: 
	the two functions, "getAllBrands" and "receivedAllBrands" are a basic sample set 
	of how to read, parse and consume a JSON object. It starts with the first and the event hadler "onData" is used to 
	call the second.
	
	
*/
function getAllBrands(Void):Void
{
	    var jsondata:LoadVars = new LoadVars();
        jsondata.load(ServiceCalls.getCall("GetBrandsList", ""));
        jsondata.onData = function(str:String):Void
        {
                //trace(str);
                scope.receivedAllBrands(scope.jo.parse(str));
            
        }   
	
	
}

function receivedAllBrands(o:Object):Void
{
	/*
	iterating through received object and tracing the values 
	ADD your own object iteration functionality - this is a SAMPLE
	
	trace string - remove before flight
	*/
	var tString = new String();
	tString = "";
	//
	
	for(var x in o)
    {
		tString += "JSON root object : " + x + "\n Count of children : " + o[x].length + "\n";	
 		for(var i:Number = 0; i < o[x].length; i++)
		{
				tString += "\t name: " + o[x][i].displayName + "\n";
				tString += "\t \t image: " + o[x][i].transImg + "\n";
				tString += "\t \t brandId: " + o[x][i].brandId + "\n";
		}
    }
	// loading the tracer box here
	tracer._txt.text  = tString;
}

/*
	NOTE:
	the Following is a sample interaction functionality, called on after the page is built.
	This includes the interaction call, "btn1.onPress", "getStyles()" and "receivedStyles()"
	
	
*/

// button functionality
btn1.onPress  = function()
{

    scope.getStyles();
    
}





function getStyles(Void):Void
{    
    var jsondata:LoadVars = new LoadVars();
        jsondata.load(ServiceCalls.getCall("StyleFileGetCurated", "prada,chanel"));
        jsondata.onData = function(str:String):Void
        {
                //trace(str);
                scope.receivedStyles(scope.jo.parse(str));
            
        }    
}

function receivedStyles(o:Object):Void
{
	/*
	iterating through received object and tracing the values 
	ADD your own object iteration functionality - this is a SAMPLE
	
	tracing string - remove before flight
	*/
	var tString = new String();
	tString = "";
	//
    for(var x in o)
    {
	
		tString += "JSON root object : " + x + "\n Count of children : " + o[x].length + "\n";	
		
		for(var i:Number = 0; i < o[x].length; i++)
		{
				tString += "\t shortDescription: " + o[x][i].shortDescription + "\n";
				tString += "\t styleFileName: " + o[x][i].styleFileName + "\n";
		}
		
    }
    
	tracer._txt.text  = tString;
   
}

