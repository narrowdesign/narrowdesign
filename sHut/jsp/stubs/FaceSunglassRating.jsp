<%@page contentType="html/text"%>
<%@page import="org.json.simple.JSONArray" %>
<%@page import="org.json.simple.JSONObject" %>
<%@page import="java.util.Random" %>

<%
String cmd = request.getParameter("cmd");
String key = request.getParameter("key");
String sku = request.getParameter("sku");

if (cmd.equals("get"))
{
	//create the combinations
	String[] keyArray = key.split(",");
	String[] skuArray = sku.split(",");
	
	JSONObject obj = new JSONObject();
	JSONObject obj2 = new JSONObject();
	Random gen = new Random();
	
	for (int i=0; i<keyArray.length; i++)
	{
		for (int j=0; j<skuArray.length; j++)
		{
			int n = gen.nextInt(4) + 1;
			obj2.put(keyArray[i] + "_" + skuArray[j], n + "");
		}
	}
	obj.put("results", obj2);
	out.print(obj);
	out.flush();
}

else if (cmd.equals("set"))
{
	Random gen = new Random();
	int n = gen.nextInt(4) + 1;
	JSONObject obj = new JSONObject();
	JSONObject obj2 = new JSONObject();
	obj2.put(key + "_" + sku, n + "");		
	obj.put("results", obj2);
	out.print(obj);
	out.flush();
}

%>