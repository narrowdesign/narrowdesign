<%@page contentType="html/text"%>
<%@page import="org.json.simple.JSONArray" %>
<%@page import="org.json.simple.JSONObject" %>

<%
String content = request.getParameter("content");
String brandId = request.getParameter("brandId");

if (content != null && content.equals("brandList"))
{
//	JSONArray array=new JSONArray();
//	array.add("Anne Klein New York");
//	array.add("Arnette");
//	array.add("Bolle");
//	array.add("Brooks Brother");
//	array.add("Burberry");
//	array.add("Bvlgari");
//	array.add("D&G");
//	array.add("DKNY");
//	array.add("Dolce & Gabbana");
//	array.add("Donna Karan");
//	array.add("Maui Jim");
//	array.add("Oakley");
//	array.add("Persol");
//	array.add("Polo Ralph Lauren");
//	array.add("Prada");
//	array.add("Prada Linea Rossa");
//	array.add("Puma");
//	array.add("Purple Label");
//	array.add("Ralph");
//	array.add("Ralph Lauren");
//	array.add("Ray-Ban");
//	array.add("Ray-Ban Jr.");
//	array.add("Revo");
//	array.add("Salvatore Ferragamo");
//	array.add("Serengeti");
//	array.add("Versace");
//	array.add("Vogue");	

//	out.print(array.toString());
//	out.flush();
	
	//THIS WAS COMMENTED SO TAHT I COULD JUST DUMP TEH WHOLE THING
	JSONObject object=new JSONObject();
	JSONArray array = new JSONArray();
	
	JSONObject obj1 = new JSONObject();
	obj1.put("brandId", "anneklein");
	obj1.put("displayName", "Anne Klein");
	obj1.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/anneklein.jpg");
	array.add(obj1);

	JSONObject obj2 = new JSONObject();
	obj2.put("brandId", "akny");
	obj2.put("displayName", "Anne Klein New York");
	obj2.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj2);
	
	JSONObject obj3 = new JSONObject();
	obj3.put("brandId", "arnette");
	obj3.put("displayName", "Arnette");
	obj3.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/arnette.jpg");
	array.add(obj3);
	
	JSONObject obj4 = new JSONObject();
	obj4.put("brandId", "bolle");
	obj4.put("displayName", "Bolle");
	obj4.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj4);
	
	JSONObject obj5 = new JSONObject();
	obj5.put("brandId", "brooksbrother");
	obj5.put("displayName", "Brooks Brother");
	obj5.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj5);
	
	JSONObject obj6 = new JSONObject();
	obj6.put("brandId", "burberry");
	obj6.put("displayName", "Burberry");
	obj6.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj6);
	
	JSONObject obj7 = new JSONObject();
	obj7.put("brandId", "bvlgari");
	obj7.put("displayName", "Bvlgari");
	obj7.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj7);
	
	JSONObject obj8 = new JSONObject();
	obj8.put("brandId", "cartier");
	obj8.put("displayName", "Cartier");
	obj8.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj8);
	
	JSONObject obj9 = new JSONObject();
	obj9.put("brandId", "chanel");
	obj9.put("displayName", "Chanel");
	obj9.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj9);
	
	JSONObject obj10 = new JSONObject();
	obj10.put("brandId", "clubmonaco");
	obj10.put("displayName", "Club Monaco");
	obj10.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj10);
	
	JSONObject obj11 = new JSONObject();
	obj11.put("brandId", "coach");
	obj11.put("displayName", "Coach");
	obj11.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj11);
	
	JSONObject obj12 = new JSONObject();
	obj12.put("brandId", "dg");
	obj12.put("displayName", "D&G");
	obj12.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj12);
	
	JSONObject obj13 = new JSONObject();
	obj13.put("brandId", "dkny");
	obj13.put("displayName", "DKNY");
	obj13.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj13);
	
	JSONObject obj14 = new JSONObject();
	obj14.put("brandId", "dolcegabana");
	obj14.put("displayName", "Dolce & Gabana");
	obj14.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj14);
	
	JSONObject obj15 = new JSONObject();
	obj15.put("brandId", "donnakaran");
	obj15.put("displayName", "Donna Karan");
	obj15.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/rl_polo.jpg");
	array.add(obj15);
	
	JSONObject obj16 = new JSONObject();
	obj16.put("brandId", "fendi");
	obj16.put("displayName", "Fendi");
	obj16.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj16);
	
	JSONObject obj17 = new JSONObject();
	obj17.put("brandId", "mauijim");
	obj17.put("displayName", "Maui Jim");
	obj17.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj17);
	
	JSONObject obj18 = new JSONObject();
	obj18.put("brandId", "miumiu");
	obj18.put("displayName", "Miu Miu");
	obj18.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj18);
	
	JSONObject obj19 = new JSONObject();
	obj19.put("brandId", "nike");
	obj19.put("displayName", "Nike");
	obj19.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/rl_purple.jpg");
	array.add(obj19);

	JSONObject obj20 = new JSONObject();
	obj20.put("brandId", "ninewest");
	obj20.put("displayName", "Nine West");
	obj20.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj20);
	
	JSONObject obj21 = new JSONObject();
	obj21.put("brandId", "oakley");
	obj21.put("displayName", "Oakley");
	obj21.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/ralphlauren.jpg");
	array.add(obj21);
	
	JSONObject obj22 = new JSONObject();
	obj22.put("brandId", "persol");
	obj22.put("displayName", "Persol");
	obj22.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/persol.jpg");
	array.add(obj22);
	
	JSONObject obj23 = new JSONObject();
	obj23.put("brandId", "poloralphlauren");
	obj23.put("displayName", "Polo By Ralph Lauren");
	obj23.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/rl_polo.jpg");
	array.add(obj23);
	
	JSONObject obj24 = new JSONObject();
	obj24.put("brandId", "prada");
	obj24.put("displayName", "Prada");
	obj24.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj24);
	
	JSONObject obj25 = new JSONObject();
	obj25.put("brandId", "pradalinearossa");
	obj25.put("displayName", "Prada Linea Rossa");
	obj25.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj25);
	
	JSONObject obj26 = new JSONObject();
	obj26.put("brandId", "puma");
	obj26.put("displayName", "Puma");
	obj26.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj26);
	
	JSONObject obj27 = new JSONObject();
	obj27.put("brandId", "purpleralghlauren");
	obj27.put("displayName", "Purple Label by Ralph Lauren");
	obj27.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/rl_purple.jpg");
	array.add(obj27);

	JSONObject obj28 = new JSONObject();
	obj28.put("brandId", "ralph");
	obj28.put("displayName", "Ralph");
	obj28.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj28);
	
	JSONObject obj29 = new JSONObject();
	obj29.put("brandId", "ralphlauren");
	obj29.put("displayName", "Ralph Lauren");
	obj29.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/ralphlauren.jpg");
	array.add(obj29);
	
	JSONObject obj30 = new JSONObject();
	obj30.put("brandId", "rayban");
	obj30.put("displayName", "Ray Ban");
	obj30.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj30);
	
	JSONObject obj31 = new JSONObject();
	obj31.put("brandId", "raybanjr");
	obj31.put("displayName", "Ray Ban Jr");
	obj31.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj31);
	
	JSONObject obj32 = new JSONObject();
	obj32.put("brandId", "revo");
	obj32.put("displayName", "Revo");
	obj32.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj32);
	
	JSONObject obj33 = new JSONObject();
	obj33.put("brandId", "salvatore");
	obj33.put("displayName", "Salvatore Ferragno");
	obj33.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj33);
	
	JSONObject obj34 = new JSONObject();
	obj34.put("brandId", "seanjean");
	obj34.put("displayName", "Sean Jean");
	obj34.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj34);
	
	JSONObject obj35 = new JSONObject();
	obj35.put("brandId", "serengeti");
	obj35.put("displayName", "Serengeti");
	obj35.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj35);
	
	JSONObject obj36 = new JSONObject();
	obj36.put("brandId", "stevemadden");
	obj36.put("displayName", "Steve Madden");
	obj36.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj36);
	
	JSONObject obj37 = new JSONObject();
	obj37.put("brandId", "vogue");
	obj37.put("displayName", "Vogue");
	obj37.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj37);
	
	JSONObject obj38 = new JSONObject();
	obj38.put("brandId", "versus");
	obj38.put("displayName", "Versus");
	obj38.put("transImg", "http://localhost:8080/redesign/web/latest/images/brands/transitions/DEFAULT_TRANS.jpg");
	array.add(obj38);	
	
	object.put("brands", array);
	out.print(object);
	out.flush();
}

else if (brandId != null)
{
	if (brandId.equals("akny"))
	{

		JSONObject object=new JSONObject();
		object.put("displayName", "Anne Klein New York");
		object.put("shortDescription", "Anne Klein New York is great. They have hte best glasses ever! This will make you chic and cool. Try them today :)");
		object.put("longDescription", "Description: Anne Klein New York is great Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		object.put("styleFileId", "akny");
		object.put("styleFileName", "Anne Klein New York Fashions!");
		object.put("catalogBrandFacetId", "akny"); //this is what is used as a brand search facet
		object.put("warrantyInformation", "Description: Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		//object.put("bgImg", "http://www.sgh.com/akny_bg.jpg");
		object.put("sculpture", "http://localhost:8080/redesign/web/latest/images/brands/sculptures/DEFAULT_SCULPTURE.png");

		out.print(object);
		out.flush();
 	}
	
	else if (brandId.equals("arnette"))
	{

		JSONObject object=new JSONObject();
		object.put("displayName", "Arnette");
		object.put("shortDescription", "Arnette is great. They have hte best glasses ever! This will make you chic and cool. Try them today :)");
		object.put("longDescription", "Description: Arnette Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		object.put("styleFileId", "arnette");
		object.put("styleFileName", "Arnette New York Fashions!");
		object.put("catalogBrandFacetId", "arnette"); //this is what is used as a brand search facet
		object.put("warrantyInformation", "Description: Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		//object.put("bgImg", "http://www.sgh.com/arnette_bg.jpg");
		object.put("sculpture", "http://localhost:8080/redesign/web/latest/images/brands/sculptures/DEFAULT_SCULPTURE.png");

		out.print(object);
		out.flush();
 	}
	
	else
	{
		JSONObject object=new JSONObject();
		object.put("displayName", "default");
		object.put("shortDescription", "default is great. They have hte best glasses ever! This will make you chic and cool. Try them today :)");
		object.put("longDescription", "Description: default Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		object.put("styleFileId", "default");
		object.put("styleFileName", "default New York Fashions!");
		object.put("catalogBrandFacetId", "default"); //this is what is used as a brand search facet
		object.put("warrantyInformation", "Description: Cumsan ut al la facil utat. Ut wisl do dolum dolore tat, venum do cons aliquis molesequisi. Dolore vullaor aliquisl utat volor sequat, veliquam, consequat lutpate feu facidui endigniatem do con euguert, cullam zzriiuscidui er sum auguerat laor sum ilit in ulput lor am, volobor tionescte vero ero conse velent ilit nonsed eum vent lortisim deliqui ssequis nulla feugait velestisl ex eugait wisl ullamco nsenuiat.");
		//object.put("bgImg", "http://www.sgh.com/arnette_bg.jpg");
		object.put("sculpture", "http://localhost:8080/redesign/web/latest/images/brands/sculptures/DEFAULT_SCULPTURE.png");

		out.print(object);
		out.flush();
	}
}


%>