var queryString = new Array();

function setValues()
{
	var query = new String(location);
	var variables = new String();   
	var values = new Array();
	var queries = new Array();
	variables = query.indexOf("?") != -1 ? new String(query.substr(query.indexOf("?")+1)) : new String();
	values = variables.split("&");   
	
	for (var i = 0 ; i < values.length ; i++)
	{
		queries = values[i].split("=");
		if(queries[0] != "")
		{
			queryString[queries[0]] = queries[1];
		}
	}
}

function getQuery(name)
{
	setValues();
	if(queryString[name]!= null)
	{
		return queryString[name];
	}
	else
	{
		return "";
	}
}
