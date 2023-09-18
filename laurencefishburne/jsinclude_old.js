
browserName = navigator.appName;
browserVer = parseInt(navigator.appVersion);

if (browserName == "Netscape" && browserVer >= 3) { browserCheck = "ok"; }
else { 
    if (browserName == "Microsoft Internet Explorer" && browserVer >= 3) { browserCheck = "ok"; }
    else { browserCheck = "bad"; }
}

var current_overID;
var last_overID;
current_overID = "";
last_overID = "";
currentphoto_overID = "";
lastphoto_overID = "";
celebName = new String;			// Celebrity name
hitCategory = new String;		// category the page is in, "Hit" category
path = window.document.URL;     // assigns URL to path (a string variable)
if ((browserName == "Microsoft Internet Explorer") && (path.indexOf("http") < 0))  {  //check to see if browser is MSIE local
  parts=path.split("\\");       // parts is an array composed of the pieces of path broken up by backslashes
}	
else {							// if browser is MSIE on web or Netscape local or web
  parts=path.split("/");        // parts is an array composed of the pieces of path broken up by slashes
}

flag = true;
j = parts.length;		
i = j-2;		// start searching in the second to last element in parts array
while ((i>=0) && (flag == true))  {  // search for :,|,.com,html - celebName will be in next element of parts array
  if (parts[i].indexOf(":") >= 0)  {
    flag = false;
	celebName = parts[i+1]; 
	hitCategory = parts[i+2];
  }	
  if (parts[i].indexOf("|") >= 0)  {
    flag = false;
	celebName = parts[i+1];
	hitCategory = parts[i+2];
  }
  if (parts[i].indexOf(".com") >= 0)  {
    flag = false;
	celebName = parts[i+1];
	hitCategory = parts[i+2];
  }
  if (parts[i].indexOf("html") >= 0)  {
    flag = false;
	celebName = parts[i+1];
	hitCategory = parts[i+2];
  }
  if (parts[i].indexOf(".12") >= 0)  {
    flag = false;
	celebName = parts[i+1];
	hitCategory = parts[i+2];
  }
  i--;
}

function MM_preloadImages() { //v1.2
  if (document.images) {
    var imgFiles = MM_preloadImages.arguments;
    var preloadArray = new Array();
    for (var i=0; i<imgFiles.length; i++) {
      preloadArray[i] = new Image;
      preloadArray[i].src = imgFiles[i];
    }
  }
}


function menu_item (image_name,width,height) {
    if (browserCheck == "ok") {
         image_prefix = 'images/mouseovers/' + image_name;
         this.menu_image_off = new Image (width,height);
         this.menu_image_off.src = image_prefix + "_up.gif";
         this.menu_image_on = new Image (width,height);
         this.menu_image_on.src = image_prefix + "_over.gif";
		 this.photo_image_off = new Image (width,height);
         this.photo_image_off.src = image_prefix + "_photo.gif";
         this.photo_image_on = new Image (width,height);
         this.photo_image_on.src = image_prefix + "_photo_over.gif";
     }
 }
 
 function menu_active (itemID) {
    if (browserCheck == "ok") {
         current_overID = itemID;
		 currentphoto_overID = itemID + "photo";
		 if (current_overID != last_overID) {
             document [current_overID].src = menu_item [current_overID].menu_image_on.src;
			 document [currentphoto_overID].src = menu_item [current_overID].photo_image_on.src;
             if (last_overID != "") {
                 document.images [last_overID].src = menu_item [last_overID].menu_image_off.src;
				 document.images [lastphoto_overID].src = menu_item [last_overID].photo_image_off.src;
			 }
             last_overID = current_overID;
			 lastphoto_overID = currentphoto_overID;
         }
     }
 }
 
 function menu_inactive (itemID) {
    if (browserCheck == "ok") {
         current_overID = itemID;
		 currentphoto_overID = itemID + "photo";
		 if (current_overID != "") {
             document.images [current_overID].src = menu_item [current_overID].menu_image_off.src;
			 document.images [currentphoto_overID].src = menu_item [current_overID].photo_image_off.src;
		 }
         current_overID = "";
         last_overID = "";
         currentphoto_overID = "";
         lastphoto_overID = "";
	}
 }
 
 function new_menu_item (image_name,width,height) {
         menu_item [image_name] = new menu_item (image_name,width,height);
 }
 //-----------------------------------------------------------------------//
// ChangeImage replaces the current image with a new image.
//
// Parameters:		strCurrentImageName	Name property of image to change.
//					strNewImage			Source of new image.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function ChangeImage(strCurrentImageName, strNewImage)
{
	document.images[strCurrentImageName].src = "images/mouseovers/" + strNewImage;
}