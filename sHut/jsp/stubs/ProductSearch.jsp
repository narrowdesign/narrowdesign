<%
String sortBy = request.getParameter("sortBy");
String searchFacets = request.getParameter("searchFacets");
String view = request.getParameter("view");
String searchTerm = request.getParameter("searchTerm");

//if this is a global search, return the different type of responses
if (view != null && view.equals("global"))
{
	
}

//if both were left null, then just return the normal product list
else if (sortBy == null && searchFacets == null)
{
	%>
	{"searchResultsCount":"50","searchResults":{"r15":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"15","price":"150"},"r48":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"48","price":"150"},"r19":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"19","price":"150"},"r27":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"27","price":"150"},"r1":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"1","price":"150"},"r4":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"4","price":"150"},"r49":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"49","price":"150"},"r5":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"5","price":"150"},"r29":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"29","price":"150"},"r10":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"10","price":"150"},"r43":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"43","price":"150"},"r3":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"3","price":"150"},"r33":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"33","price":"150"},"r50":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"50","price":"150"},"r45":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"45","price":"150"},"r38":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"38","price":"150"},"r20":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"20","price":"150"},"r31":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"31","price":"150"},"r13":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"13","price":"150"},"r11":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"11","price":"150"},"r25":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"25","price":"150"},"r47":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"47","price":"150"},"r26":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"26","price":"150"},"r34":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"34","price":"150"},"r12":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"12","price":"150"},"r37":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"37","price":"150"},"r7":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"7","price":"150"},"r39":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"39","price":"150"},"r46":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"46","price":"150"},"r17":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"17","price":"150"},"r24":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"24","price":"150"},"r18":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"18","price":"150"},"r6":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"6","price":"150"},"r40":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"40","price":"150"},"r32":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"32","price":"150"},"r22":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"22","price":"150"},"r21":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"21","price":"150"},"r23":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"23","price":"150"},"r44":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"44","price":"150"},"r2":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"2","price":"150"},"r16":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"16","price":"150"},"r42":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"42","price":"150"},"r8":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"8","price":"150"},"r28":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"28","price":"150"},"r41":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"41","price":"150"},"r14":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"14","price":"150"},"r35":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"35","price":"150"},"r9":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"9","price":"150"},"r30":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"30","price":"150"},"r36":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"36","price":"150"}},
	<%
}

//if ONLY sortBy was specified switch 1 and 50
else if (sortBy != null && searchFacets == null)
{
	%>
	{"searchResultsCount":"50","searchResults":{"r15":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"15","price":"150"},"r48":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"48","price":"150"},"r19":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"19","price":"150"},"r27":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"27","price":"150"},"r1":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"50","price":"150"},"r4":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"4","price":"150"},"r49":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"49","price":"150"},"r5":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"5","price":"150"},"r29":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"29","price":"150"},"r10":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"10","price":"150"},"r43":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"43","price":"150"},"r3":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"3","price":"150"},"r33":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"33","price":"150"},"r50":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"1","price":"150"},"r45":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"45","price":"150"},"r38":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"38","price":"150"},"r20":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"20","price":"150"},"r31":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"31","price":"150"},"r13":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"13","price":"150"},"r11":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"11","price":"150"},"r25":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"25","price":"150"},"r47":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"47","price":"150"},"r26":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"26","price":"150"},"r34":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"34","price":"150"},"r12":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"12","price":"150"},"r37":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"37","price":"150"},"r7":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"7","price":"150"},"r39":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"39","price":"150"},"r46":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"46","price":"150"},"r17":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"17","price":"150"},"r24":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"24","price":"150"},"r18":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"18","price":"150"},"r6":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"6","price":"150"},"r40":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"40","price":"150"},"r32":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"32","price":"150"},"r22":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"22","price":"150"},"r21":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"21","price":"150"},"r23":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"23","price":"150"},"r44":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"44","price":"150"},"r2":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"2","price":"150"},"r16":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"16","price":"150"},"r42":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"42","price":"150"},"r8":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"8","price":"150"},"r28":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"28","price":"150"},"r41":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"41","price":"150"},"r14":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"14","price":"150"},"r35":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"35","price":"150"},"r9":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"9","price":"150"},"r30":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"30","price":"150"},"r36":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"36","price":"150"}},
	<%
}

//if ONLY searchFacets was specified, remove 2
else if (sortBy == null && searchFacets != null)
{
	%>
	{"searchResultsCount":"50","searchResults":{"r15":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"15","price":"150"},"r48":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"48","price":"150"},"r19":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"19","price":"150"},"r27":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"27","price":"150"},"r1":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"1","price":"150"},"r4":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"4","price":"150"},"r49":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"49","price":"150"},"r5":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"5","price":"150"},"r29":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"29","price":"150"},"r10":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"10","price":"150"},"r43":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"43","price":"150"},"r3":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"3","price":"150"},"r33":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"33","price":"150"},"r50":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"50","price":"150"},"r45":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"45","price":"150"},"r38":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"38","price":"150"},"r20":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"20","price":"150"},"r31":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"31","price":"150"},"r13":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"13","price":"150"},"r11":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"11","price":"150"},"r25":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"25","price":"150"},"r47":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"47","price":"150"},"r26":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"26","price":"150"},"r34":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"34","price":"150"},"r12":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"12","price":"150"},"r37":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"37","price":"150"},"r7":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"7","price":"150"},"r39":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"39","price":"150"},"r46":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"46","price":"150"},"r17":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"17","price":"150"},"r24":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"24","price":"150"},"r18":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"18","price":"150"},"r6":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"6","price":"150"},"r40":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"40","price":"150"},"r32":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"32","price":"150"},"r22":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"22","price":"150"},"r21":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"21","price":"150"},"r23":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"23","price":"150"},"r44":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"44","price":"150"},"r16":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"16","price":"150"},"r42":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"42","price":"150"},"r8":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"8","price":"150"},"r28":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"28","price":"150"},"r41":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"41","price":"150"},"r14":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"14","price":"150"},"r35":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"35","price":"150"},"r9":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"9","price":"150"},"r30":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"30","price":"150"},"r36":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"36","price":"150"}},
	<%
}

//if sortBy and searchFacets were specified, switch 1 and 50 AND remvoe 2
else if (sortBy != null && searchFacets != null)
{
	%>
	{"searchResultsCount":"50","searchResults":{"r15":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"15","price":"150"},"r48":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"48","price":"150"},"r19":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"19","price":"150"},"r27":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"27","price":"150"},"r1":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"50","price":"150"},"r4":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"4","price":"150"},"r49":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"49","price":"150"},"r5":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"5","price":"150"},"r29":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"29","price":"150"},"r10":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"10","price":"150"},"r43":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"43","price":"150"},"r3":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"3","price":"150"},"r33":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"33","price":"150"},"r50":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"1","price":"150"},"r45":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"45","price":"150"},"r38":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"38","price":"150"},"r20":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"20","price":"150"},"r31":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"31","price":"150"},"r13":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"13","price":"150"},"r11":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"11","price":"150"},"r25":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"25","price":"150"},"r47":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"47","price":"150"},"r26":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"26","price":"150"},"r34":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"34","price":"150"},"r12":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"12","price":"150"},"r37":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"37","price":"150"},"r7":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"7","price":"150"},"r39":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"39","price":"150"},"r46":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"46","price":"150"},"r17":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"17","price":"150"},"r24":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"24","price":"150"},"r18":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"18","price":"150"},"r6":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"6","price":"150"},"r40":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"40","price":"150"},"r32":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"32","price":"150"},"r22":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"22","price":"150"},"r21":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"21","price":"150"},"r23":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"23","price":"150"},"r44":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"44","price":"150"},"r16":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"16","price":"150"},"r42":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"42","price":"150"},"r8":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"8","price":"150"},"r28":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"28","price":"150"},"r41":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"41","price":"150"},"r14":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"14","price":"150"},"r35":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"35","price":"150"},"r9":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"9","price":"150"},"r30":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"30","price":"150"},"r36":{"firstAtSGH":"true","newAtSGH":"true","shortDescription":"Prada Sleekness","SKU":"36","price":"150"}},
	<%
}

	
//do not send back the facet updates if we are on the default view
if (view == null || !view.equals("default") || view.equals("global"))
{
%>


	
"FacetSearch":

	{ 
	"brands":
    {
       "displayText":"brands",
       "endecaName":"brand",
       "shortDescription":"Lorem ipsum dolor sit amet",
       "description":"lorem ipsum",
       "enabled":"true",
       "children":
          [
             {
                "displayText":"Anne Klein",
                "endecaName":"AnneKlein",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"true"
             },
             {
                "displayText":"Bolle",
                "endecaName":"Bolle",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"false"
             },
             {
                 "displayText":"Anne Klein New York",
                 "endecaName":"AnneKleinNewYork",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"true"
              },
              {
                 "displayText":"Arnette",
                 "endecaName":"arnette",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"false"
              },
              {
                  "displayText":"Brooks Brothers",
                  "endecaName":"brooksbrothers",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"true"
               },
               {
                  "displayText":"Burberry",
                  "endecaName":"burberry",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"false"
               },
               {
                   "displayText":"Bvlgari",
                   "endecaName":"bvlgari",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"true"
                },
                {
                   "displayText":"Cartier",
                   "endecaName":"cartier",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"false"
                },
                {
                    "displayText":"Chanel",
                    "endecaName":"chanel",
                    "shortDescription":"Lorem ipsum dolor sit amet",
                    "description":"Lorem ipsum dolor sit amet",
                    "enabled":"true"
                 },
                 {
                    "displayText":"Club Monaco",
                    "endecaName":"clubmonaco",
                    "shortDescription":"Lorem ipsum dolor sit amet",
                    "description":"Lorem ipsum dolor sit amet",
                    "enabled":"false"
                 },
                 {
                     "displayText":"Coach",
                     "endecaName":"coach",
                     "shortDescription":"Lorem ipsum dolor sit amet",
                     "description":"Lorem ipsum dolor sit amet",
                     "enabled":"true"
                  },
                  {
                     "displayText":"D&G",
                     "endecaName":"dg",
                     "shortDescription":"Lorem ipsum dolor sit amet",
                     "description":"Lorem ipsum dolor sit amet",
                     "enabled":"false"
                  },
                  {
                      "displayText":"DKNY",
                      "endecaName":"dkny",
                      "shortDescription":"Lorem ipsum dolor sit amet",
                      "description":"Lorem ipsum dolor sit amet",
                      "enabled":"true"
                   },
                   {
                      "displayText":"Dolce & Gabbana",
                      "endecaName":"dolcegabbana",
                      "shortDescription":"Lorem ipsum dolor sit amet",
                      "description":"Lorem ipsum dolor sit amet",
                      "enabled":"false"
                   },
                   {
                       "displayText":"Donna Karan",
                       "endecaName":"donnakaran",
                       "shortDescription":"Lorem ipsum dolor sit amet",
                       "description":"Lorem ipsum dolor sit amet",
                       "enabled":"true"
                    },
                    {
                       "displayText":"Fendi",
                       "endecaName":"fendi",
                       "shortDescription":"Lorem ipsum dolor sit amet",
                       "description":"Lorem ipsum dolor sit amet",
                       "enabled":"false"
                    },
                    {
                        "displayText":"Maui Jim",
                        "endecaName":"mauijim",
                        "shortDescription":"Lorem ipsum dolor sit amet",
                        "description":"Lorem ipsum dolor sit amet",
                        "enabled":"true"
                     },
                     {
                        "displayText":"Miu Miu",
                        "endecaName":"miumiu",
                        "shortDescription":"Lorem ipsum dolor sit amet",
                        "description":"Lorem ipsum dolor sit amet",
                        "enabled":"false"
                     },
                     {
                         "displayText":"Nike",
                         "endecaName":"nike",
                         "shortDescription":"Lorem ipsum dolor sit amet",
                         "description":"Lorem ipsum dolor sit amet",
                         "enabled":"true"
                      },
                      {
                         "displayText":"Nine West",
                         "endecaName":"ninewest",
                         "shortDescription":"Lorem ipsum dolor sit amet",
                         "description":"Lorem ipsum dolor sit amet",
                         "enabled":"false"
                      },
                      {
                          "displayText":"Oakley",
                          "endecaName":"oakley",
                          "shortDescription":"Lorem ipsum dolor sit amet",
                          "description":"Lorem ipsum dolor sit amet",
                          "enabled":"true"
                       },
                       {
                          "displayText":"Persol",
                          "endecaName":"persol",
                          "shortDescription":"Lorem ipsum dolor sit amet",
                          "description":"Lorem ipsum dolor sit amet",
                          "enabled":"false"
                       },
                       {
                           "displayText":"Polo by Ralph Lauren",
                           "endecaName":"polobyralphlauren",
                           "shortDescription":"Lorem ipsum dolor sit amet",
                           "description":"Lorem ipsum dolor sit amet",
                           "enabled":"true"
                        },
                        {
                           "displayText":"Prada",
                           "endecaName":"prada",
                           "shortDescription":"Lorem ipsum dolor sit amet",
                           "description":"Lorem ipsum dolor sit amet",
                           "enabled":"false"
                        },
                        {
                            "displayText":"Prada Linea Rossa",
                            "endecaName":"pradalinearossa",
                            "shortDescription":"Lorem ipsum dolor sit amet",
                            "description":"Lorem ipsum dolor sit amet",
                            "enabled":"true"
                         },
                         {
                            "displayText":"Puma",
                            "endecaName":"puma",
                            "shortDescription":"Lorem ipsum dolor sit amet",
                            "description":"Lorem ipsum dolor sit amet",
                            "enabled":"false"
                         },
                         {
                             "displayText":"Purple Label by Ralph Lauren",
                             "endecaName":"purplebyralphlauren",
                             "shortDescription":"Lorem ipsum dolor sit amet",
                             "description":"Lorem ipsum dolor sit amet",
                             "enabled":"true"
                          },
                          {
                             "displayText":"Ralph",
                             "endecaName":"ralph",
                             "shortDescription":"Lorem ipsum dolor sit amet",
                             "description":"Lorem ipsum dolor sit amet",
                             "enabled":"false"
                          },
                          {
                              "displayText":"Ralph Lauren",
                              "endecaName":"ralphlauren",
                              "shortDescription":"Lorem ipsum dolor sit amet",
                              "description":"Lorem ipsum dolor sit amet",
                              "enabled":"true"
                           },
                           {
                              "displayText":"Ray-Ban",
                              "endecaName":"rayban",
                              "shortDescription":"Lorem ipsum dolor sit amet",
                              "description":"Lorem ipsum dolor sit amet",
                              "enabled":"false"
                           },
                           {
                               "displayText":"Ray-Ban Junior",
                               "endecaName":"raybanjunior",
                               "shortDescription":"Lorem ipsum dolor sit amet",
                               "description":"Lorem ipsum dolor sit amet",
                               "enabled":"true"
                            },
                            {
                               "displayText":"Revo",
                               "endecaName":"revo",
                               "shortDescription":"Lorem ipsum dolor sit amet",
                               "description":"Lorem ipsum dolor sit amet",
                               "enabled":"false"
                            },
                            {
                                "displayText":"Salvatore Ferragamo",
                                "endecaName":"salvatoreferragamo",
                                "shortDescription":"Lorem ipsum dolor sit amet",
                                "description":"Lorem ipsum dolor sit amet",
                                "enabled":"true"
                             },
                             {
                                "displayText":"Sean John",
                                "endecaName":"seanjohn",
                                "shortDescription":"Lorem ipsum dolor sit amet",
                                "description":"Lorem ipsum dolor sit amet",
                                "enabled":"false"
                             },
                             {
                                 "displayText":"Serengeti",
                                 "endecaName":"serengeti",
                                 "shortDescription":"Lorem ipsum dolor sit amet",
                                 "description":"Lorem ipsum dolor sit amet",
                                 "enabled":"true"
                              },
                              {
                                 "displayText":"Steve Madden",
                                 "endecaName":"stevemadden",
                                 "shortDescription":"Lorem ipsum dolor sit amet",
                                 "description":"Lorem ipsum dolor sit amet",
                                 "enabled":"false"
                              },
                              {
                                  "displayText":"Versace",
                                  "endecaName":"versace",
                                  "shortDescription":"Lorem ipsum dolor sit amet",
                                  "description":"Lorem ipsum dolor sit amet",
                                  "enabled":"true"
                               },
                               {
                                  "displayText":"Versus",
                                  "endecaName":"versus",
                                  "shortDescription":"Lorem ipsum dolor sit amet",
                                  "description":"Lorem ipsum dolor sit amet",
                                  "enabled":"false"
                               },
                               {
                                   "displayText":"Vogue",
                                   "endecaName":"vogue",
                                   "shortDescription":"Lorem ipsum dolor sit amet",
                                   "description":"Lorem ipsum dolor sit amet",
                                   "enabled":"true"
                                }                        
          ]
    },
"style":
   {
       "displayText":"style",
       "endecaName":"style",
       "shortDescription":"Lorem ipsum dolor sit amet",
       "description":"lorem ipsum",
       "enabled":"true",
       "frame_shapes":
          [
             {
                "displayText":"aviator",
                "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/aviator.gif",
                "endecaName":"aviator",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"true"
             },
             {
                 "displayText":"butterfly",
                 "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/butterfly.gif",
                 "endecaName":"buttefly",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"true"
              },
             {
                "displayText":"oval",
                "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/oval.gif",
                "endecaName":"oval",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"false"
             },
             {
                 "displayText":"round",
                 "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/round.gif",
                 "endecaName":"round",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"true"
              },
              {
                 "displayText":"tea cups",
                 "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/tea_cups.gif",
                 "endecaName":"teacups",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"false"
              },
              {
                  "displayText":"cat eyes",
                  "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/cateye.gif",
                  "endecaName":"cateyes",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"true"
               },
               {
                  "displayText":"rectangle",
                  "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/rectangle.gif",
                  "endecaName":"rectangle",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"false"
               },
               {
                   "displayText":"pillow",
                   "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/pillow.gif",
                   "endecaName":"pillow",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"false"
                },
                {
                    "displayText":"rimless",
                    "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/rimless.gif.jpg",
                    "endecaName":"rimless",
                    "shortDescription":"Lorem ipsum dolor sit amet",
                    "description":"Lorem ipsum dolor sit amet",
                    "enabled":"false"
                 },
                 {
                     "displayText":"semi-rimless",
                     "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/semi_rimless.gif",
                     "endecaName":"semirimless",
                     "shortDescription":"Lorem ipsum dolor sit amet",
                     "description":"Lorem ipsum dolor sit amet",
                     "enabled":"false"
                  },
                  {
                      "displayText":"shield",
                      "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/shield.gif",
                      "endecaName":"shield",
                      "shortDescription":"Lorem ipsum dolor sit amet",
                      "description":"Lorem ipsum dolor sit amet",
                      "enabled":"false"
                   },
                   {
                       "displayText":"square",
                       "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/square.gif",
                       "endecaName":"square",
                       "shortDescription":"Lorem ipsum dolor sit amet",
                       "description":"Lorem ipsum dolor sit amet",
                       "enabled":"false"
                    },
                    {
                        "displayText":"wrap",
                        "imageURL":"http://sgh-dev/redesign/web/latest/images/frameshapes/wrap.gif",
                        "endecaName":"wrap",
                        "shortDescription":"Lorem ipsum dolor sit amet",
                        "description":"Lorem ipsum dolor sit amet",
                        "enabled":"false"
                     }
          ]
   },
"features":
   {
       "displayText":"features",
       "endecaName":"features",
       "shortDescription":"Lorem ipsum dolor sit amet",
       "description":"lorem ipsum",
       "enabled":"true",
       "frame":
          [
             {
                "displayText":"Spring Hinges",
                "endecaName":"springHinges",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"true"
             },
             {
                 "displayText":"Grip Temples",
                 "endecaName":"griptemples",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"true"
              },
              {
                  "displayText":"activewear",
                  "endecaName":"activewear",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"true"
               },
               {
                   "displayText":"nose pads",
                   "endecaName":"nosepads",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"true"
                }
          ],
       "lens":
          [
             {
                "displayText":"Polarized",
                "endecaName":"polarized",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"true"
             },
             {
                 "displayText":"Photochromic",
                 "endecaName":"photochromic",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"true"
              },
              {
                  "displayText":"Interchangeable",
                  "endecaName":"interchangeable",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"true"
               },
               {
                   "displayText":"UVA/UVB protection",
                   "endecaName":"UVA/UVBprotection",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"true"
                },
                {
                    "displayText":"scratch resistant",
                    "endecaName":"sratchresistant",
                    "shortDescription":"Lorem ipsum dolor sit amet",
                    "description":"Lorem ipsum dolor sit amet",
                    "enabled":"true"
                 },
                 {
                     "displayText":"hydrophobic coating",
                     "endecaName":"hydrophobiccoating",
                     "shortDescription":"Lorem ipsum dolor sit amet",
                     "description":"Lorem ipsum dolor sit amet",
                     "enabled":"true"
                  },
                  {
                      "displayText":"mirrored",
                      "endecaName":"mirrored",
                      "shortDescription":"Lorem ipsum dolor sit amet",
                      "description":"Lorem ipsum dolor sit amet",
                      "enabled":"true"
                   },
                   {
                       "displayText":"anti-reflective coating",
                       "endecaName":"antireflectivecoating",
                       "shortDescription":"Lorem ipsum dolor sit amet",
                       "description":"Lorem ipsum dolor sit amet",
                       "enabled":"true"
                    }
          ]
   },
"material":
   {
       "displayText":"material",
       "endecaName":"material",
       "shortDescription":"Lorem ipsum dolor sit amet",
       "description":"lorem ipsum",
       "enabled":"true",
       "frame":
          [
             {
                "displayText":"Plastic",
                "endecaName":"plastic",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"false"
             },
             {
                 "displayText":"metal",
                 "endecaName":"metal",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"false"
              },
              {
                  "displayText":"Nylon",
                  "endecaName":"nylon",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"false"
               }
          ],
       "lens":
          [
             {
                "displayText":"lightweight glass",
                "endecaName":"lightweightglass",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"true"
             },
             {
                 "displayText":"plastic",
                 "endecaName":"plastic",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"true"
              },
              {
                  "displayText":"glass",
                  "endecaName":"glass",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"true"
               },
               {
                   "displayText":"polycarbonate",
                   "endecaName":"polycarbonate",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"true"
                }
          ]
   },
"color":
 {
       "displayText":"color",
       "endecaName":"color",
       "shortDescription":"Lorem ipsum dolor sit amet",
       "description":"lorem ipsum",
       "enabled":"true",
       "frame":
          [
             {
          	  "displayText":"red",
          	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                "endecaName":"red",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"false"
             },
             {
           	  "displayText":"fuchia",
           	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                 "endecaName":"fuchia",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"false"
              },
              {
             	  "displayText":"orange",
             	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                   "endecaName":"orange",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"false"
                },
                {
                 	  "displayText":"yellow",
                 	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                       "endecaName":"yellow",
                       "shortDescription":"Lorem ipsum dolor sit amet",
                       "description":"Lorem ipsum dolor sit amet",
                       "enabled":"false"
                },
                {
              	  "displayText":"green",
              	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                    "endecaName":"green",
                    "shortDescription":"Lorem ipsum dolor sit amet",
                    "description":"Lorem ipsum dolor sit amet",
                    "enabled":"false"
                 },
                 {
               	  "displayText":"blue",
               	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                     "endecaName":"blue",
                     "shortDescription":"Lorem ipsum dolor sit amet",
                     "description":"Lorem ipsum dolor sit amet",
                     "enabled":"false"
                  },
                  {
                	  "displayText":"purple",
                	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                      "endecaName":"purple",
                      "shortDescription":"Lorem ipsum dolor sit amet",
                      "description":"Lorem ipsum dolor sit amet",
                      "enabled":"false"
                   },   
                   {
                 	  "displayText":"gold",
                 	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                       "endecaName":"gold",
                       "shortDescription":"Lorem ipsum dolor sit amet",
                       "description":"Lorem ipsum dolor sit amet",
                       "enabled":"false"
                    }, 
                    {
                  	  "displayText":"black",
                  	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                        "endecaName":"black",
                        "shortDescription":"Lorem ipsum dolor sit amet",
                        "description":"Lorem ipsum dolor sit amet",
                        "enabled":"false"
                     },
                     {
                   	  "displayText":"sun",
                   	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                         "endecaName":"sun",
                         "shortDescription":"Lorem ipsum dolor sit amet",
                         "description":"Lorem ipsum dolor sit amet",
                         "enabled":"false"
                      },
                      {
                    	  "displayText":"grey",
                    	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                          "endecaName":"grey",
                          "shortDescription":"Lorem ipsum dolor sit amet",
                          "description":"Lorem ipsum dolor sit amet",
                          "enabled":"false"
                       },
                       {
                     	  "displayText":"pearl",
                     	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                           "endecaName":"pearl",
                           "shortDescription":"Lorem ipsum dolor sit amet",
                           "description":"Lorem ipsum dolor sit amet",
                           "enabled":"false"
                        },
                        {
                      	  "displayText":"mustard",
                      	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                            "endecaName":"mustard",
                            "shortDescription":"Lorem ipsum dolor sit amet",
                            "description":"Lorem ipsum dolor sit amet",
                            "enabled":"false"
                         },
                         {
                       	  "displayText":"graphite",
                       	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                             "endecaName":"graphite",
                             "shortDescription":"Lorem ipsum dolor sit amet",
                             "description":"Lorem ipsum dolor sit amet",
                             "enabled":"false"
                          },
                          {
                        	  "displayText":"white",
                        	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                              "endecaName":"white",
                              "shortDescription":"Lorem ipsum dolor sit amet",
                              "description":"Lorem ipsum dolor sit amet",
                              "enabled":"false"
                           },
                           {
                         	  "displayText":"invisible",
                         	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                               "endecaName":"invisible",
                               "shortDescription":"Lorem ipsum dolor sit amet",
                               "description":"Lorem ipsum dolor sit amet",
                               "enabled":"false"
                            },
                            {
                          	  "displayText":"zebra",
                          	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                                "endecaName":"zebra",
                                "shortDescription":"Lorem ipsum dolor sit amet",
                                "description":"Lorem ipsum dolor sit amet",
                                "enabled":"false"
                             },
                             {
                           	  "displayText":"brown",
                           	  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                                 "endecaName":"brown",
                                 "shortDescription":"Lorem ipsum dolor sit amet",
                                 "description":"Lorem ipsum dolor sit amet",
                                 "enabled":"false"
                              }
          ],
       "lens":
          [
             {
          	   "displayText":"red",
                "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                "endecaName":"red",
                "shortDescription":"Lorem ipsum dolor sit amet",
                "description":"Lorem ipsum dolor sit amet",
                "enabled":"false"
             },
             {
          	   "displayText":"pink",
                 "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                 "endecaName":"pink",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"false"
             },
             {
          	   "displayText":"orange",
                  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                  "endecaName":"orange",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"false"
             },
             {
          	   "displayText":"yellow",
                   "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                   "endecaName":"yellow",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"false"
             },
             {
          	   "displayText":"green",
                    "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                    "endecaName":"green",
                    "shortDescription":"Lorem ipsum dolor sit amet",
                    "description":"Lorem ipsum dolor sit amet",
                    "enabled":"false"
             },
             {
          	   "displayText":"blue",
                     "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                     "endecaName":"blue",
                     "shortDescription":"Lorem ipsum dolor sit amet",
                     "description":"Lorem ipsum dolor sit amet",
                     "enabled":"false"
              },
              {
           	   "displayText":"purple",
                 "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                 "endecaName":"purple",
                 "shortDescription":"Lorem ipsum dolor sit amet",
                 "description":"Lorem ipsum dolor sit amet",
                 "enabled":"false"
              },
              {
           	   "displayText":"gold",
                  "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                  "endecaName":"gold",
                  "shortDescription":"Lorem ipsum dolor sit amet",
                  "description":"Lorem ipsum dolor sit amet",
                  "enabled":"false"
              },
              {
           	   "displayText":"graphite",
                   "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                   "endecaName":"graphite",
                   "shortDescription":"Lorem ipsum dolor sit amet",
                   "description":"Lorem ipsum dolor sit amet",
                   "enabled":"false"
              },
              {
           	   "displayText":"white",
                    "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                    "endecaName":"white",
                    "shortDescription":"Lorem ipsum dolor sit amet",
                    "description":"Lorem ipsum dolor sit amet",
                    "enabled":"false"
              },
              {
           	   "displayText":"mustard",
                     "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                     "endecaName":"mustard",
                     "shortDescription":"Lorem ipsum dolor sit amet",
                     "description":"Lorem ipsum dolor sit amet",
                     "enabled":"false"
              },
              {
           	   "displayText":"grey",
                      "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                      "endecaName":"grey",
                      "shortDescription":"Lorem ipsum dolor sit amet",
                      "description":"Lorem ipsum dolor sit amet",
                      "enabled":"false"
               },
               {
             	   "displayText":"black",
                        "colorURL":"http://sgh-dev/redesign/web/latest/images/colors/wrap.gif",
                        "endecaName":"black",
                        "shortDescription":"Lorem ipsum dolor sit amet",
                        "description":"Lorem ipsum dolor sit amet",
                        "enabled":"false"
                 }
          ]
   } }

<%
}
%>


}