import data.AdvArray;

class data.Hashtable
	{
	var keys:AdvArray;
	var values:AdvArray;
	
	function Hashtable(Void) {
		keys = new AdvArray();
		values = new AdvArray();
	}
	
	function putItem(key:Object,value:Object):Void {
		
		var index:Number = keys.indexOf(key);
	
		if (index == -1) {
			
			keys.push(key);
			values.push(value);
			
		} else {
			
			values[index] = value;
			
		}
		
	}
	
	
	function getItem(key:Object):Object {
		var index:Number = keys.indexOf(key);
		return values[index];
	}
	
	
	function removeItem(key:Object):Void {
		var index:Number = keys.indexOf(key);
		keys.removeItemAt(index);
		values.removeItemAt(index);
	}
	
	
	function getKeys(Void):AdvArray {
		return keys.clone();
	}
	
	function getValues(Void):AdvArray {
		return values.clone();
	}
	
	/*
		Returns the number of items in the hashtable
	*/
	function getSize(Void):Number {
		return this.keys.length;
	}

	
	/*
		Returns a shallow copy of the hashtable
	*/
	function clone(Void):Hashtable {
		var newHash:Hashtable = new Hashtable();
		newHash.keys = keys.clone();
		newHash.values = values.clone();
		return newHash;
	}

	/*
		Returns a human readable version of the hashtable
	*/
	function toString(Void):String {
		var str:String = "[Hashtable ";
		for (var i=0; i < keys.length; i++) {
			str += keys[i]+"="+values[i];
			if (i != keys.length-1) str += ",";
		}
		str += "]";
		return str;
	}
	
}