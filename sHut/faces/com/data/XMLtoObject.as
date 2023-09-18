import data.Hashtable;

/**	@class Utilities.XMLtoObject
	@author Chuck Genco
	@version 1.0
	@description A group of XML parsing utilites<br><br>Version History:<p>
		<blockquote><pre>1.0 Initial Release</pre></blockquote></p>
	@usage <p><blockquote><pre><code></code></pre></blockquote></p>
*/
class data.XMLtoObject
{
	/**	@method parseToObject
		@description Based on XMLNode.makeXMLSA 1.0 by Max Ziebell <a href="http://proto.layer51.com/d.aspx?f=1311">http://proto.layer51.com/d.aspx?f=1311</a><br>
		I converted his AS1 class to an AS2 static class. Called recursively.
		@param p_node: XMLNode
		@usage <code>USAGE</code>
		@return Object
	*/

	
	public static function parseToObject(p_node:XMLNode):Object
		{
		//trace("here");
		return parseToHash(p_node, true);	
		}
		
	/**	@method parseToHash
		@description Based on XMLNode.makeXMLSA 1.0 by Max Ziebell <a href="http://proto.layer51.com/d.aspx?f=1311">http://proto.layer51.com/d.aspx?f=1311</a><br>
		I converted his AS1 class to an AS2 static class adding Noel's Hashtable. Called recursively.
		@param p_node: XMLNode
		@usage <code>USAGE</code>
		@return String
	*/
	
	public static function parseToHash( p_node: XMLNode, overrideHash:Boolean)
	{	var i: Number;
		var nName: String;
		var nType: Number;
		var cNode: XMLNode;
		var cId;
		
		var resultsObj: Object = processAttributes( p_node, null, overrideHash );

		for ( var i = 0; i < p_node.childNodes.length; i++ )
		{
			cNode = p_node.childNodes[ i ];
			
			nName = cNode.nodeName;
			nType = cNode.nodeType;
			
			if ( nType == 3 )
			{
				//resultsObj._value = cNode.nodeValue;
				resultsObj.value = cNode.nodeValue;
			}
			else if ( nType == 1 && nName != undefined )
			{
				var sObj = parseToHash( cNode, overrideHash);
				
				// comment out the next block to disable hash
				if ( sObj.id != undefined && overrideHash != true)
				{
					if ( resultsObj[ nName ] == undefined )
					{
						resultsObj[ nName ] = sObj;
					}
					else if ( !( resultsObj[ nName ] instanceof Hashtable ) )
					{
						var tempObj: Object = resultsObj[ nName ];
						resultsObj[ nName ] = new Hashtable();
						resultsObj[ nName ].putItem( tempObj.id, tempObj );
						
					}
					resultsObj[ nName ].putItem( sObj.id, sObj );
				}
				else
				{
					if ( resultsObj[ nName ] == undefined )
					{
						// just stor the value
						resultsObj[ nName ] = sObj;
						continue;
					}
					
					else if ( !( resultsObj[ nName ] instanceof Array ) )
					{
						resultsObj[ nName ] = new Array( resultsObj[ nName ] );
					}
					
					resultsObj[ nName ].push( sObj );
				}
				
				// end
			}
		}
		// Return object
		return resultsObj;
	}
	
		
	public static function processAttributes( dataNode: XMLNode, dataObj: Object, overrideHash:Boolean ): Object
	{
		if ( dataObj == undefined ) dataObj = new Object();
		var value: String;
		
		// just grab all the attributes and add them as properties to the object
		
		for( var item in dataNode.attributes )
		{
			value = dataNode.attributes[ item ];
		
			if ( item.toLowerCase().indexOf( "id" ) > -1 && overrideHash != true)
			{	
				dataObj[ item ] = value;
			}
			else
			{
				dataObj[ item ] = convertValue( value );
			}
		}
	
		return dataObj;
	}
	
	
	private static function convertValue( valueStr: String )
	{
		var valueNum: Number = parseInt( valueStr );
		
		if ( valueStr == "true" )
		{
			return true;
		}
		else if ( valueStr == "false" )
		{
			return false;
		}
		else if ( valueStr == String( valueNum ) )
		{
			return valueNum;
		}
		else
		{
			return valueStr;
		}
	}
}