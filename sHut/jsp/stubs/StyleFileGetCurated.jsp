<%@page contentType="html/text"%>
<%@page import="org.json.simple.JSONArray" %>
<%@page import="org.json.simple.JSONObject" %>
<%@page import="java.util.Random" %>

<%
String styleFileId = request.getParameter("styleFileId");

if (styleFileId != null)
{
	//see how many items was passed in. spit out in the response the amount of stylefiles that was passed in
	String[] styleFileIdList = styleFileId.split(",");
	int styleFileCount = styleFileIdList.length;
	
	JSONObject styleFileGlobalObj = new JSONObject();
	styleFileGlobalObj.put("styleFileListCount", styleFileCount + "");
	
	Random generator = new Random();
	int randomIndex = generator.nextInt( 51 );
	
	for (int i=1; i<=styleFileCount;i++)
	{
		JSONArray styleFileObjArray = new JSONArray();
		JSONObject styleFileContents = new JSONObject();	
	
		styleFileContents.put("styleFileName", "StyleFile Collection " + i);
		styleFileContents.put("shortDescription", "StyleFile " + i + " shortDescription: Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		styleFileContents.put("longDescription", "StyleFile " + i + " longDescription: Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		
		//array of individual sunglass objects
		JSONArray skuListArray = new JSONArray();
		
		//individual sunglass objects
		JSONObject sku1DetailObject = new JSONObject();
		sku1DetailObject.put("name", "SunglassName1_SF" + i);
		sku1DetailObject.put("brand", "SunglassBrand1_SF" + i);
		sku1DetailObject.put("sku", generator.nextInt(51)+"");
		sku1DetailObject.put("price", "SunglassPrice1_SF" + i);
		sku1DetailObject.put("newAtSGH", "true_SF" + i);
		sku1DetailObject.put("firstAtSGH", "true_SF" + i);
		
		JSONObject sku2DetailObject = new JSONObject();
		sku2DetailObject.put("name", "SunglassName2_SF" + i);
		sku2DetailObject.put("brand", "SunglassBrand2_SF" + i);
		sku2DetailObject.put("sku", generator.nextInt(51)+"");
		sku2DetailObject.put("price", "SunglassPrice2_SF" + i);
		sku2DetailObject.put("newAtSGH", "true_SF" + i);
		sku2DetailObject.put("firstAtSGH", "true_SF" + i);
		
		JSONObject sku3DetailObject = new JSONObject();
		sku3DetailObject.put("name", "SunglassName3_SF" + i);
		sku3DetailObject.put("brand", "SunglassBrand3_SF" + i);
		sku3DetailObject.put("sku", generator.nextInt(51)+"");
		sku3DetailObject.put("price", "SunglassPrice3_SF" + i);
		sku3DetailObject.put("newAtSGH", "true_SF" + i);
		sku3DetailObject.put("firstAtSGH", "true_SF" + i);
		
		JSONObject sku4DetailObject = new JSONObject();
		sku4DetailObject.put("name", "SunglassName4_SF" + i);
		sku4DetailObject.put("brand", "SunglassBrand4_SF" + i);
		sku4DetailObject.put("sku", generator.nextInt(51)+"");
		sku4DetailObject.put("price", "SunglassPrice4_SF" + i);
		sku4DetailObject.put("newAtSGH", "true_SF" + i);
		sku4DetailObject.put("firstAtSGH", "true_SF" + i);
		
		JSONObject sku5DetailObject = new JSONObject();
		sku5DetailObject.put("name", "SunglassName5_SF" + i);
		sku5DetailObject.put("brand", "SunglassBrand5_SF" + i);
		sku5DetailObject.put("sku", generator.nextInt(51)+"");
		sku5DetailObject.put("price", "SunglassPrice5_SF" + i);
		sku5DetailObject.put("newAtSGH", "true_SF" + i);
		sku5DetailObject.put("firstAtSGH", "true_SF" + i);
		
		JSONObject sku6DetailObject = new JSONObject();
		sku6DetailObject.put("name", "SunglassName6_SF" + i);
		sku6DetailObject.put("brand", "SunglassBrand6_SF" + i);
		sku6DetailObject.put("sku", generator.nextInt(51)+"");
		sku6DetailObject.put("price", "SunglassPrice6_SF" + i);
		sku6DetailObject.put("newAtSGH", "true_SF" + i);
		sku6DetailObject.put("firstAtSGH", "true_SF" + i);
		
//		JSONObject sku7DetailObject = new JSONObject();
//		sku7DetailObject.put("name", "SunglassName7_SF" + i);
//		sku7DetailObject.put("brand", "SunglassBrand7_SF" + i);
//		sku7DetailObject.put("sku", generator.nextInt(51)+"");
//		sku7DetailObject.put("price", "SunglassPrice7_SF" + i);
//		sku7DetailObject.put("newAtSGH", "true_SF" + i);
//		sku7DetailObject.put("firstAtSGH", "true_SF" + i);
		
		//MAKE SURE THE 7TH ITEM IS ALWAYS ONE THAT IS IN THE LOCALIZED XML USED FOR STYLEWHEEL
		JSONObject sku7DetailObject = new JSONObject();
		sku7DetailObject.put("name", "SunglassName7_SF" + i);
		sku7DetailObject.put("brand", "SunglassBrand7_SF" + i);
				
		if (styleFileIdList[i-1].equals("Bold"))
			sku7DetailObject.put("sku", "1");
		
		else if (styleFileIdList[i-1].equals("Professional"))
				sku7DetailObject.put("sku", "2");
		
		else if (styleFileIdList[i-1].equals("Glamorous"))
				sku7DetailObject.put("sku", "3");
		
		else if (styleFileIdList[i-1].equals("Smooth"))
				sku7DetailObject.put("sku", "4");
		
		else if (styleFileIdList[i-1].equals("Classy"))
				sku7DetailObject.put("sku", "5");
		
		else if (styleFileIdList[i-1].equals("Urban"))
				sku7DetailObject.put("sku", "6");
		
		else if (styleFileIdList[i-1].equals("Sporty"))
				sku7DetailObject.put("sku", "7");
			
		else if (styleFileIdList[i-1].equals("Tough"))
				sku7DetailObject.put("sku", "8");
		
		else if (styleFileIdList[i-1].equals("Sophisticated"))
				sku7DetailObject.put("sku", "9");
		
		else if (styleFileIdList[i-1].equals("Sassy"))
				sku7DetailObject.put("sku", "10");
		
		else if (styleFileIdList[i-1].equals("Savvy"))
				sku7DetailObject.put("sku", "11");
		
		else if (styleFileIdList[i-1].equals("Sexy"))
				sku7DetailObject.put("sku", "12");
		
		sku7DetailObject.put("price", "SunglassPrice7_SF" + i);
		sku7DetailObject.put("newAtSGH", "true_SF" + i);
		sku7DetailObject.put("firstAtSGH", "true_SF" + i);
		
		//add each sunglass object to the sunglass object array
		skuListArray.add(sku1DetailObject);
		skuListArray.add(sku2DetailObject);
		skuListArray.add(sku3DetailObject);
		skuListArray.add(sku4DetailObject);
		skuListArray.add(sku5DetailObject);
		skuListArray.add(sku6DetailObject);
		skuListArray.add(sku7DetailObject);
	
		styleFileContents.put("skuListArray", skuListArray);
	
		//this is the array of individual styleFileObjects
		styleFileObjArray.add(styleFileContents);
		styleFileGlobalObj.put(styleFileIdList[(i-1)], styleFileObjArray);
	}
	
	//array of other featured stylefile objects
	JSONArray otherFeaturedStyleFilesArray = new JSONArray();
	
	//indivisual other featured stylefile objects
	JSONObject otherFeaturedStyleFile1Object = new JSONObject();
	otherFeaturedStyleFile1Object.put("name", "DKNY COLLECTION 2007");
	otherFeaturedStyleFile1Object.put("id", "dkny");
	
	JSONObject otherFeaturedStyleFile2Object = new JSONObject();
	otherFeaturedStyleFile2Object.put("name", "VERSACE COLLECTION 2007");
	otherFeaturedStyleFile2Object.put("id", "versace");
	
	JSONObject otherFeaturedStyleFile3Object = new JSONObject();
	otherFeaturedStyleFile3Object.put("name", "GENRE! GROUPING");
	otherFeaturedStyleFile3Object.put("id", "genre1");
	
	//add each stylefile object to the stylefile object array
	otherFeaturedStyleFilesArray.add(otherFeaturedStyleFile1Object);
	otherFeaturedStyleFilesArray.add(otherFeaturedStyleFile2Object);
	otherFeaturedStyleFilesArray.add(otherFeaturedStyleFile3Object);
	
	//add the featured style files object to the stylefile object
	styleFileGlobalObj.put("otherFeaturedStyleFilesArray", otherFeaturedStyleFilesArray);
	
	
	out.print(styleFileGlobalObj);
	out.flush();
}

%>