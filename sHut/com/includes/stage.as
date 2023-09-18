
/*
* narunas@rga.com
* main stage include for the JSON_to_FLASH functionality display
* 
*
* */
import data.DAL;
import data.JSON;



var scope = this;
var jo:JSON = new JSON();
var tracer:MovieClip = this.tracer;
tracer._txt.multiline = true;
tracer._txt.autoSize = "left";
var brandsArray:Array = new Array();


    // incoming parameters

    var varObj:Object = new Object();
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
        dO.callPath = "xml/services_dev.xml";
    }
    
    dO.rO = this;
    dO.rF = dalBuilt;
    dal.initDAL(dO);

function dalBuilt(a:Array):Void
{
        getBrands();                                                                                                                                            
    
}

function getBrands(Void):Void
{    
    var jsondata:LoadVars = new LoadVars();
        jsondata.load(DAL.getCall("StyleFileGetCurated", "prada,chanel"));
        jsondata.onData = function(str:String):Void
        {
                trace(str);
                scope.gotBrands(scope.jo.parse(str));
            
        }    
}

function gotBrands(o:Object):Void
{

    for(var x in o)
    {
		var xo = new Object();
        
        xo.name = x;
		xo.shortDescription = o[x][0].shortDescription;
        xo.styleFileName = o[x][0].styleFileName;
		xo.skuListArray = new Array();
		
		for(var a:Number = 0; a < o[x][0].skuListArray.length; a++)
		{
			var xbo:Object = new Object();
			xbo.brand = o[x][0].skuListArray[a].brand;
			xbo.firstAtSGH = o[x][0].skuListArray[a].firstAtSGH;
			xbo.newAtSGH = o[x][0].skuListArray[a].newAtSGH;
			xbo.price = o[x][0].skuListArray[a].price;
			xbo.sku = o[x][0].skuListArray[a].sku;
			xbo.name = o[x][0].skuListArray[a].name;
			xo.skuListArray.push(xbo);
		}
		
        
  
        brandsArray.push(xo);
        
    }
    
    traceArray();
    
}

function traceArray()
{
	
	var tString = new String();
	tString = "";

    for(var i:Number = 0; i < brandsArray.length; i++)
    
    {
		
			tString += "top brand name: " + brandsArray[i].name + "\n";
			//tString += "short description: " + brandsArray[i].shortDescription + "\n";
			
			for(var a:Number = 0; a < brandsArray[i].skuListArray.length; a++)
			{
				tString += "\t name: " + brandsArray[i].skuListArray[a].name + "\n";
				tString += "\t \t brand: " + brandsArray[i].skuListArray[a].brand + "\n";
				tString += "\t \t sku: " + brandsArray[i].skuListArray[a].sku + "\n";
				tString += "\t \t price : " + brandsArray[i].skuListArray[a].price + "\n";// firstAtSGH //newAtSGH
				tString += "\t \t first : " + brandsArray[i].skuListArray[a]. firstAtSGH + "\n";
				tString += "\t \t new : " + brandsArray[i].skuListArray[a].newAtSGH + "\n";
			}
    }

	tracer._txt.text = tString;
}
function getSingleBrand(id:String):Void
{
        var jsondata:LoadVars = new LoadVars();
        jsondata.load(DAL.getCall("GetBrandInformation", id));
        jsondata.onData = function(str:String):Void
        {
                trace(str);
                scope.receivedSingleBrand(scope.jo.parse(str));
            
        }
}

function receivedSingleBrand(o:Object):Void
{
    var traceString:String = new String();
    traceString = "";
    traceString += "display name: " + o.displayName + "\n";
    traceString += "facet id: " + o.catalogBrandFacetId + "\n";
    traceString += "style file id: " + o.styleFileId + "\n";
    traceString += "warranty info: " + o.warrantyInformation + "\n";
    traceString += "styleFilename: " + o.styleFileName + "\n";
    traceString += "short Desc: " + o.shortDescription;
    traceString += "sculpute: " + o.sculpture + "\n";
    traceString += "background Img: " + o.bgImg + "\n";
    traceString += "long Desc: " + o.longDescription + "\n";
    tracer._txt.text  = traceString;
    
}


// button functionality
btn1.onPress  = function()
{

    scope.getBrands();
    
}

btn2.onPress = function()
{
    this.id = "burberry"; // <<<<<< FAKE;
    scope.getSingleBrand(this.id);
    //
}
