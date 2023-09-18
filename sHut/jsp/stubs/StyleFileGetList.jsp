<%@page contentType="html/text"%>
<%@page import="org.json.simple.JSONArray" %>
<%@page import="org.json.simple.JSONObject" %>

<%
String cmd = request.getParameter("cmd");

if (cmd != null && cmd.equals("sf"))
{
	JSONObject styleFileGroupObj = new JSONObject();
	JSONArray styleFileArray = new JSONArray();
	
	JSONObject styleFile1 = new JSONObject();
	JSONObject styleFile2 = new JSONObject();
	JSONObject styleFile3 = new JSONObject();
	JSONObject styleFile4 = new JSONObject();
	JSONObject styleFile5 = new JSONObject();
	
	styleFile1.put("prada", "Prada Collection 2007");
	styleFile2.put("dkny", "DKNY Collection 2007");
	styleFile3.put("versace", "Versace Collection 2007");
	styleFile4.put("genre1", "Crazy Genre1 Grouping");
	styleFile5.put("genre2", "Nice Genre2 Bundle");
	
	styleFileArray.add(styleFile1);
	styleFileArray.add(styleFile2);
	styleFileArray.add(styleFile3);
	styleFileArray.add(styleFile4);
	styleFileArray.add(styleFile5);
	
	styleFileGroupObj.put("styleFileList", styleFileArray);
	out.print(styleFileGroupObj);
	out.flush();
}

%>