/**
* @class AdvArray
* @author Noel Billig (noel@rga.com)
* @version 0.1
* @description An extension of the standard Flash Array.
*   AdvArray simply adds indexing and removal functionality
* @param   ary  (Array) An array to be copied into AdvArray
*/
class data.AdvArray extends Array {
    
    function AdvArray(ary:Array) {

        if (ary != null) {
            for (var i=0; i < ary.length; i++) {
                this[i] = ary[i];
            }
        }
        
    }
    
    
    
    /**
    * @method indexof
    * @description Checks and returns the index (position) of the item in the array
    * @param item (Object) - The item to be checked
    * @return Number - The position of the item in the array (starting at 0). -1 is returned for items not found in the array.
    */
    function indexOf(item:Object):Number {
        for (var i:Number=0; i < this.length; i++) {
            if (this[i] == item) return i;
        }
        return -1;
    }
    
    
    
    /**
    * @method contains
    * @description Checks if the passed object is contained in the Array
    * @param item (Object) - The item to be checked
    * @return Boolean - A flag determining if the item is contained in the Array
    */
    function contains(item:Object):Boolean{

        return (this.indexOf(item) != -1);
    }

    
    
    /**
    * @method remove
    * @description Removes the first instance of the specified item from the array
    * @param item (Object) - The item to be removed from the Array
    */
    function remove(item:Object):Object {
        var index:Number = this.indexOf(item);
        if (index != -1) {
            var ritem:Object = this[index];
            this.splice(index,1);
            return ritem;
        }
    }
    
    /**
    * @method removeItemAt
    * @description Removes the item at the specified index
    * @param index (Number) - The index of the item to be removed
    */
    function removeItemAt(index:Number):Void {
        this.splice(index,1);
    }
    
    /**
    * @method clone
    * @description Returns a shallow clone of this AdvArray
    * @return AdvArray - A shallow clone of this AdvArray
    */
    function clone(Void):AdvArray {
        var newAr:AdvArray = new AdvArray();
        for (var i=0; i < this.length; i++) {
            newAr.push(this[i]);
        }
        return newAr;
    }

   function toString(Void):String {
        return "[AdvArray ("+super.toString()+")]";
    }
}