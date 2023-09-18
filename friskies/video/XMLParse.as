//import com.dlasky.util.Debug;
/************************************************************************************************************
 * NOTE THAT VERSION 1.6 MAY POSSIBLY BREAK DEPENDENCIES FOR PREVIOUSLY COMPILED PROJECTS DUE TO NEW
 * NODE PARSING ROUTINES...  ROLL BACK TO 1.3 IF THIS IS AN ISSUE.
 * 
 * 
 * @author  dlasky
 * @version 1.6
 * @since   
 ************************************************************************************************************/

class video.XMLParse {
	
	private static var $instance:XMLParse;
	
	/************************************************************************************************************
	 * 
	 * @usage   
	 * @return  
	 ************************************************************************************************************/
	public function XMLParse() {
		
	}
	
	/************************************************************************************************************
	 * singleton characteristics
     * 
	 * @usage   
	 * @return  
	 ************************************************************************************************************/
	public static function getInstance():XMLParse {
		if ($instance == undefined) {
			$instance = new XMLParse();
		}
		return $instance;	
	}
	
	/************************************************************************************************************
	 * 
	 * @usage   
	 * @param   _xml 
	 * @return  
	 ************************************************************************************************************/
	public function initParseToObject(_xml:XML):Object {
		return parseToObject(_xml.firstChild);
	}
	
	/************************************************************************************************************
	 * parses an XML object with attributes (note that node values are not supported) into dot notation
     * 
	 * @usage   
	 * @param   _xml 
	 * @return  
	 ************************************************************************************************************/
	public function parseToObject(_xml:XMLNode):Object {
		var output = new Object();
		if (_xml.hasChildNodes()) {
			var children:Array = _xml.childNodes;
			for (var x:Number=0; x<children.length; x++) {
				output[children[x].nodeName] = parseToObject(children[x]);
			}
		}
		for (var i in _xml.attributes) {
			output[i] = _xml.attributes[i];
		}
		return output;
	}
	
	/************************************************************************************************************
	 * inits smartparser with an xml object and returns the recursive result
	 * 
	 * @usage   
	 * @param   _xml 
	 * @return  
	 ************************************************************************************************************/
	public function initSmartParse(_xml:XML):Object {
		return smartParse(_xml.firstChild);
	}
	
	/************************************************************************************************************
	 * smartparser recursive.  handes the previously unhandled case where nodes with
	 * duplicate names exist (previously they would overwrite).   new functionality is to create
	 * an array
	 * 
     * also handles the case where the node has no attributes but is simply a textNode (where the nodevalue property is set)
     * 
     * return object format matches the xml format with a few exceptions...
     * 
     * <xml>
     * <node att1="att" att2="2"/>
     * <node att1="new" att2="3"/>
     * <textNode att3="3">
     *      some text here
     * </textNode>
     * </xml>
     * 
     * will return the object
     * .xml
     * .xml.node[0].att1 = "att"
     * .xml.node[0].att2 = 2
     * .xml.node[1].att1 = "new"
     * .xml.node[1].att2 = 3
     * .xml.textNode.value = "some text here"
     * .xml.textNode.att3 = 3
     * 
     * note that the leading dot appears after the object name that the return is stored to... so if your object is 'o'
     * 
     * var o = initSmartParse(xmlobject);
     * o.xml, etc...
     * 
     * also note that where a duplicate node name was encountered (as expected in a schema) an array was automatically created
     * to contain the duplicate node names.
     * 
     * 
	 * @usage   
	 * @param   _xml 
	 * @return  
	 ************************************************************************************************************/
    public function smartParse(_xml:XMLNode):Object {
		var output = new Object();
		if (_xml.childNodes.length > 0) {
			var children:Array = _xml.childNodes;
			for (var x:Number=0; x<children.length; x++) {
                var nn = children[x].nodeName;			
                if (nn == null || nn == undefined) {
                    nn = "value";
                }
                switch (typeof(output[nn])) {
                case "undefined" :
                    output[nn] = smartParse(children[x]);
                break;
                default :
                    if (output[nn][0] == undefined) {
                        var t = output[nn];
                        output[nn] = new Array();
                        output[nn][0] = t;
                        output[nn][1] = smartParse(children[x]);
                    } else {
                        output[nn][output[nn].length] = smartParse(children[x]);
                    }
                break;
                
                }
			}
            //for (var i in _xml.attributes) {
			    //output[i] = _xml.attributes[i];
		    //}
		} else {
            if (_xml.nodeValue != undefined) {
                output = _xml.nodeValue;
            }
        }
		for (var i in _xml.attributes) {
			output[i] = _xml.attributes[i];
		}
		return output;
	}
	
	
	// These two functions are the same as the above 2 (initSmartParse and smartParse) except that they remove 
	// colons from XML Node Names	
	public function initSmartParseNoColons(_xml:XML):Object {
		return smartParseNoColons(_xml.firstChild);
	}
    public function smartParseNoColons(_xml:XMLNode):Object {
		var output = new Object();
		if (_xml.childNodes.length > 0) {
			var children:Array = _xml.childNodes;
			for (var x:Number=0; x<children.length; x++) {
                var nn = children[x].nodeName;
			
				var my_array:Array = nn.split(":");
				if(my_array.length>1) nn = my_array[0] + "_" + my_array[1];				
				
                if (nn == null || nn == undefined) {
                    nn = "value";
                }
                switch (typeof(output[nn])) {
                case "undefined" :
                    output[nn] = smartParseNoColons(children[x]);
                break;
                default :
                    if (output[nn][0] == undefined) {
                        var t = output[nn];
                        output[nn] = new Array();
                        output[nn][0] = t;
                        output[nn][1] = smartParseNoColons(children[x]);
                    } else {
                        output[nn][output[nn].length] = smartParseNoColons(children[x]);
                    }
                break;
                
                }
			}
            //for (var i in _xml.attributes) {
			    //output[i] = _xml.attributes[i];
		    //}
		} else {
            if (_xml.nodeValue != undefined) {
                output = _xml.nodeValue;
            }
        }
		for (var i in _xml.attributes) {
			output[i] = _xml.attributes[i];
		}
		return output;
	}
	
	
}