//-----------------------------------------------------------------------//
// GeneratePopUpWindow displays the predetermined URL in a pop-up window.
//
// Parameters:		strURL				URL of the new window.
//					strWindowName		Name for target.
//					strWindowFeatures	Comma-separated list of window
//										features.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/15/2000
//-----------------------------------------------------------------------//	
function GeneratePopUpWindow(strURL, strWindowName, strWindowFeatures)
{
	var strError				// Declare error string
	strError = ""				// Initialize to empty string
	
	// Did we get a URL???
	if (strURL == "")
		// No...explain why
		alert("Generation of pop-up window aborted...please enter a valid URL parameter");
	else
	{
		// Yes...but let's check the parameters
		
		// Check Window Name parameter
		if (strWindowName == "")
		{
			strError = "\nWindow Name";					//Set error message
			strWindowName = "CelebSites";				//Store generic window name
		}
		
		// Check Window Features parameter
		if (strWindowFeatures == "")
		{
			strError = strError + "\nWindow Features";	//Set error message
			strWindowFeatures = "height=100,width=300";	//Store minimum window features
		}
		
		// Display error message if it's not blank
		if (strError != "")
			alert("Javascript Function GeneratePopUpWindow\nThe following parameters are missing:\n" + strError + "\n\nA generic window name and minimum window features will be used.");
			
		// Generate pop-up window
		window.open(strURL, strWindowName, strWindowFeatures);
	}
}

//-----------------------------------------------------------------------//
// GetReferringPage returns the URL of the calling page.
//
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/15/2000
//-----------------------------------------------------------------------//	
function GetReferringPage()
{
	return document.referrer
}

//-----------------------------------------------------------------------//
// GetBrowserName returns the name of the browser such as "Netscape" or
// "Microsoft Internet Explorer"
//
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/15/2000
//-----------------------------------------------------------------------//	
function GetBrowserName()
{
	return navigator.appName;
}

//-----------------------------------------------------------------------//
// GetBrowserVersion returns the version of the browser such as "3.0" or
// "4.0" or "4.61" or etc...
//
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/15/2000
//-----------------------------------------------------------------------//	
function GetBrowserVersion()
{
	// Declare string version
	var strVersion = navigator.appVersion;
	
	// Return browser version starting at '0' and
	// where the first space is found 'strVersion.indexOf(" ")'
	return strVersion.substring(0, strVersion.indexOf(" "));
}

//-----------------------------------------------------------------------//
// GetBrowserNameandVersion returns both the browser's name and version.
//
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/15/2000
//-----------------------------------------------------------------------//	
function GetBrowserNameandVersion()
{
	// Get and return the name and version by calling the two functions
	return GetBrowserName() + " " + GetBrowserVersion();
}

//-----------------------------------------------------------------------//
// ChangeToLowerCase converts all characters to lowercase.
//
// Parameters:		strField	String used for conversion.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/15/2000
//-----------------------------------------------------------------------//	
function ChangeToLowerCase(strField)
{
	return strField.toLowerCase();
}

//-----------------------------------------------------------------------//
// FieldSelectandFocus sends control to the form object.
//
// Parameters:		strFormObject	Form object to apply control.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/15/2000
//-----------------------------------------------------------------------//	
function FieldSelectandFocus(strFormObject)
{
	if (strFormObject.type == "text")
		strFormObject.select();
	strFormObject.focus();				
}

function CompatibleWithJavascript()
{
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
	document.images[strCurrentImageName].src = strNewImage;
}

//-----------------------------------------------------------------------//
// ChangeTwoImages replaces two current images with two new images,
// respectively.
//
// Parameters:		strCurrentImageNameOne	Name property of image one 
//											to change.
//					strNewImageOne			Source of new image one.
//					strCurrentImageNameTwo  Name property of image two
//											to change.
//					strNewImageTwo			Source of new image two.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/17/2000
//-----------------------------------------------------------------------//	
function ChangeTwoImages(strCurrentImageNameOne, strNewImageOne, strCurrentImageNameTwo, strNewImageTwo)
{
	document.images[strCurrentImageNameOne].src = strNewImageOne;
	document.images[strCurrentImageNameTwo].src = strNewImageTwo;
}

//-----------------------------------------------------------------------//
// ConfirmWithOKandCancelActions displays a confirm dialog box.  If the
// user clicks "OK" then the statements in the strOKAction parameter is
// executed.  If the user clicks "Cancel" then the statements in the
// strCancelAction parameter is executed.
//
// Parameters:		strMessage		Message to display in dialog box.
//					strOKAction		Action(s) to execute if "OK" is 
//									chosen.
//					strCancelAction	Action(s) to execute if "Cancel is
//									chosen.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function ConfirmWithTrueandFalseActions(strMessage, strOKAction, strCancelAction)
{
	// Display confirm dialog box
	if (confirm(strMessage))
	{
		// Execute strOKAction
		if (strOKAction != "")
			eval(strOKAction);
	}
	else
	{
		// Execute strCancelAction if it is not
		if (strCancelAction != "")
			eval(strCancelAction);
	}
}

//-----------------------------------------------------------------------//
// AlertWithAction displays an Alert dialog box and executes the
// strAction parameter if it is not empty.
//
// Parameters:		strAction		Action to execute.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function AlertWithAction(strMessage, strAction)
{
	// Display Alert dialog box
	alert(strMessage);
	
	// Execute strAction if it's not empty
	if (strAction != "")
		eval(strAction)
}

//-----------------------------------------------------------------------//
// RedirectWithDelay loads another page after a specified amount of time.
//
// Parameters:		strHREF			URL/Page to execute.
//					intCountDown	Amount of time in seconds before
//									the page loaded.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function RedirectWithDelay(strHREF, intCountDown)
{
	setTimeout(eval("location.href = '" + strHREF + "'"), parseInt(intCountDown * 1000))
}

//-----------------------------------------------------------------------//
// RuntThisActionWithDelay executes an action after a specified amount
// of time.
//
// Parameters:		strAction		Action to execute.
//					intCountDown	Amount of time in seconds before the
//									action is executed.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function RunThisActionWithDelay(strAction, intCountDown)
{
	setTimeout(strAction, parseInt(intCountDown * 1000))
}

function GetScreenSize()
{
}

function GetResolution()
{
}

//-----------------------------------------------------------------------//
// GenerateRandomNumber generates a random number based on the number of
// elements possible.
//
// Parameters:		intNumberofElements		Number of possible elements.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function GenerateRandomNumber(intNumberofElements)
{
	// Generate number
	var intRandomNumber = Math.ceil(Math.random() * intNumberofElements);
	
	// Return number
	return intRandomNumber;	
}

//-----------------------------------------------------------------------//
// GenerateRandomImages generates a random image from an array of images
// based on a random number.
//
// Parameters:		strImageName		Name of image to change.
//					strImagesToDisplay	String list of images.
//					strImagePath		Image path.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function GenerateRandomImages(strImageName, strImagesToDisplay, strImagePath)
{
	// Create array of images
	var aryImages = strImagesToDisplay.split("*");
	
	// Store the number of images in array
	var intNumberofImages = aryImages.length;
	
	// Call a change of the image based on a randomly generated number.
	ChangeImage(strImageName, strImagePath + aryImages[(GenerateRandomNumber(intNumberofImages) - 1)]);
}

//-----------------------------------------------------------------------//
// StartRandomImages starts the generation of random images based on 
// a time interval.
//
// Parameters:		strImageName		Name of image to change.
//					strImagesToDisplay	String list of images.
//					strImagePath		Image path.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function StartRandomImages(strImageName, strImagesToDisplay, intTimeInterval, strImagePath)
{
	// Set the Javascript method setInterval to call GenerateRandomImages based on
	// intTimeInterval which must be in milliseconds.
	setInterval("GenerateRandomImages('" + strImageName + "','" + strImagesToDisplay + "','" + strImagePath + "')", parseInt(intTimeInterval) * 1000)
}

//-----------------------------------------------------------------------//
// BackButtonAction loads the previous URL in the history list. In other
// words, an action similar to a browser's back button is executed.
//
// Parameters:		None
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function BackButtonAction()
{
	history.back();
}

//-----------------------------------------------------------------------//
// GetLastModifiedDate retrieves and returns the last date the page was
// modified. 
//
// Note: the last date was displayed in mm/dd/yyyy hh:mm:ss
// format. Results may vary.
//
// Parameters:		None
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function GetLastModifiedDate()
{
	// Get last modified date in string datatype
	var strLastModifiedDate = document.lastModified;
	
	// Convert and save last modified date in date datatype
	var datLastModifiedDate = Date.parse(strLastModifiedDate);
	
	// Is the date an unknown date (or January 1, 1970 GMT)?
	if (datLastModifiedDate == 0)
		return "Unknown";
	else 
		return strLastModifiedDate;
}

//-----------------------------------------------------------------------//
// GetTodaysDate retrieves and returns today's date. Date format one is
// mm/dd/yyyy. Date format two is mm/dd/yy.
//
// Parameters:		intFormat	Date format type.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function GetTodaysDate(intFormat)
{
	var intDateFormat = parseInt(intFormat);	// Convert and store format
	var datTodaysDate = new Date();				// Get today's date
	var datDate;								// Declare another date
	
	// Break out into which format is chosen
	switch (intDateFormat)
	{
		// This format is mm/dd/yyyy
		case 1 :
			datDate = (datTodaysDate.getMonth() + 1) + "/" + datTodaysDate.getDate() + "/" + datTodaysDate.getFullYear();
			break;
			
		// This format is mm/dd/yy
		case 2 :
			var strFullYear = datTodaysDate.getFullYear();
			var strYear = strFullYear.toString();
			datDate = (datTodaysDate.getMonth() + 1) + "/" + datTodaysDate.getDate() + "/" + strYear.substring(2,4);
	}
	// Send the date
	return datDate;
}

function PreLoader()
{
}

function ImageScroller()
{
}

//-----------------------------------------------------------------------//
// LoadTwoFrames loads two frames with predetermined pages. Frame One and
// Frame Two must be "siblings" of the current frame. In other words, if
// Frame One or Frame Two is an existing frame but is a "sibling" with
// the parent then this function will not display properly or will
// not work successfully.
//
// Parameters:		strFrameOne		Name of pre-existing frame one.
//					strFrameOneHref	Web page to load in frame one.
//					strFrameTwo		Name of pre-existing frame two.
//					strFrameTwoHref	Web page to load in frame two.
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/16/2000
//-----------------------------------------------------------------------//	
function LoadTwoFrames(strFrameOne, strFrameOneHref, strFrameTwo, strFrameTwoHref)
{
	eval("parent." + strFrameOne + ".location.href = strFrameOneHref;");
	eval("parent." + strFrameTwo + ".location.href = strFrameTwoHref;");
}

function DisableRightClick()
{
}

//-----------------------------------------------------------------------//
// GetImage retrieves the next or previous image from a list of images
// stored in an array. 
//
// Parameters:		strNavigationAction		Button action such as "Next"
//											or "Prev"
//					strImageName			Name of image to change
//					strImagesToDisplay		String of images minus path
//											to image. ("xxx.jpg")
//					strImagePath			Image path such as
//											"../images/celebrity/"
// Author:			V. Songco, Compuware Corporation for #
// Date Created:	05/17/2000
//-----------------------------------------------------------------------//	
function GetImage(strNavigationAction, strImageName, strImagesToDisplay, strImagePath)
{
	// Store the string of images into an array
	var aryImages = strImagesToDisplay.split("*");
	
	// Store the number of images
	var intNumberofImages = aryImages.length;
	
	// Initialize the current image's index...in other words, what is the
	// current image's order in the array
	var intCurrentImageIndex = "NA";
	
	var strImageNameSrc;	// The src of the image to change
	var aryImageNameSrc;	// Array to hold the src of the image to change
	
	// Store the src of the image to change
	strImageNameSrc = document.images[strImageName].src
	
	// Split the src into an array.  This is so we get the last element
	// in the array which is the image filename and extension
	aryImageNameSrc = strImageNameSrc.split("/")

	// Loop through all the images in the array
	for (i = 0; i < aryImages.length; i++)
	{				
		// Does the current image match an element in the image array?
		if (aryImageNameSrc[aryImageNameSrc.length - 1] == aryImages[i])
		{
			// Yes...let's save the index and get out of this loop.
			intCurrentImageIndex = i;
			break;
		}
	}
	
	// Did we find a matching src?
	if (intCurrentImageIndex == "NA")
		// No...so tell them.
		alert("Image not found!!!");
	else
	{
		// Yes...
		
		// Initialize the new image index
		var intNewImageIndex = 0;
		
		// What type of action did the user choose?
		switch (strNavigationAction)
		{
			case "Next" :
				// Get the next image
				intNewImageIndex = i + 1;
				break;
			case "Prev" :
				// Get the previous image
				intNewImageIndex = i - 1;
		}
		
		// Did we try to get an image before the first image???
		if (intNewImageIndex < 0)
			// Yes...so wrap and get the last image.
			document.images[strImageName].src = strImagePath + aryImages[aryImages.length - 1];
		else
		{
			// No...
			
			// Did we try to get an image after the last image???
			if (intNewImageIndex >= aryImages.length)
				// Yes...so wrap and get the first image.
				document.images[strImageName].src = strImagePath + aryImages[0];
			else
				// No...so get the image.
				document.images[strImageName].src = strImagePath + aryImages[intNewImageIndex];
		}
	}
}