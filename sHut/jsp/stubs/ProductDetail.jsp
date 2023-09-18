<%@page contentType="text/html"%>
<%@page import="org.json.simple.JSONArray" %>
<%@page import="org.json.simple.JSONObject" %>

<%
String sku = request.getParameter("sku");

if (sku != null)
{
	String[] skuList = sku.split(",");
	int skuListCount = skuList.length;
	
	JSONObject globalObj = new JSONObject();
	globalObj.put("skuCount", skuListCount + "");
	
	JSONArray skuListArray = new JSONArray();
	
	for (int i=0; i<skuListCount; i++)
	{
		JSONObject productDetailObj = new JSONObject();
		productDetailObj.put("name", "RE2512");
		productDetailObj.put("brand", "Revo");
		productDetailObj.put("shortDescription", "Revo Short Decscription Text");
		productDetailObj.put("longDescription", "Clean lines and traditional styling make these sunglasses a versatile choice for any occasion. Plus, Revo sunglasses feature special coatings developed by NASA so you can look good and protect your eyes.");
		productDetailObj.put("sku", skuList[i]);
		productDetailObj.put("price", "179.95");
		productDetailObj.put("newAtSGH", "true");
		productDetailObj.put("firstAtSGH", "true");
		productDetailObj.put("breakagePlan", "Better be careful!!!!!");
		productDetailObj.put("returnsAndWarranty", "Anytime, anyplace ;)");
		productDetailObj.put("aboutBrand", "Revo is great; trust us!");
		
		JSONObject productDetailLensObj = new JSONObject();
		productDetailLensObj.put("color", "black");
		productDetailLensObj.put("shape", "aviator");
		productDetailLensObj.put("material", "polycarbonate");
		productDetailLensObj.put("treatment", "gradient UVA, UVB protection, UVC protection");
		
		JSONObject productDetailFrameObj = new JSONObject();
		productDetailFrameObj.put("material", "plastic");
		productDetailFrameObj.put("color", "grey");
		productDetailFrameObj.put("style", "rimless");
		productDetailFrameObj.put("size", "large");
		productDetailFrameObj.put("templeLength", "120mm");
		
		JSONArray productDetailsFeaturesBenefitArray = new JSONArray();
		productDetailsFeaturesBenefitArray.add("certificate of authenticity");
		productDetailsFeaturesBenefitArray.add("prada cleaning cloth");
		productDetailsFeaturesBenefitArray.add("prada logo");
		productDetailsFeaturesBenefitArray.add("black temples");
		productDetailsFeaturesBenefitArray.add("greco log at hinge");
		productDetailsFeaturesBenefitArray.add("hard case");		
		
		productDetailObj.put("productDetailLensObj", productDetailLensObj);		
		productDetailObj.put("productDetailFrameObj", productDetailFrameObj);
		productDetailObj.put("productDetailsFeaturesBenefitArray", productDetailsFeaturesBenefitArray);		
		
		//sibling stuff
		JSONArray productDetailsSiblingsArray = new JSONArray();
		JSONObject siblingDetailObj1 = new JSONObject();
		siblingDetailObj1.put("sku", "111111");
		siblingDetailObj1.put("frameColor", "red");
		siblingDetailObj1.put("lensColor", "black");
		productDetailsSiblingsArray.add(siblingDetailObj1);
		
		JSONObject siblingDetailObj3 = new JSONObject();
		siblingDetailObj3.put("sku", "333333");
		siblingDetailObj3.put("frameColor", "black");
		siblingDetailObj3.put("lensColor", "grey");
		productDetailsSiblingsArray.add(siblingDetailObj3);
		
		JSONObject siblingDetailObj2 = new JSONObject();
		siblingDetailObj2.put("sku", "222222");
		siblingDetailObj2.put("frameColor", "yellow");
		siblingDetailObj2.put("lensColor", "blue");
		productDetailsSiblingsArray.add(siblingDetailObj2);
		
		productDetailObj.put("siblings", productDetailsSiblingsArray);
		
		
		//cross sales stuff
		JSONArray productDetailsCrossSalesArray = new JSONArray();
		productDetailsCrossSalesArray.add("111111");
		productDetailsCrossSalesArray.add("222222");
		productDetailsCrossSalesArray.add("333333");
		productDetailsCrossSalesArray.add("444444");
		productDetailsCrossSalesArray.add("555555");
		productDetailsCrossSalesArray.add("666666");
		productDetailsCrossSalesArray.add("777777");
		productDetailsCrossSalesArray.add("888888");
		
		productDetailObj.put("crossSales", productDetailsCrossSalesArray);
		
		skuListArray.add(productDetailObj);
	}
	globalObj.put("skuListArray", skuListArray);
	out.print(globalObj);
	out.flush();
}

%>


