/**************************************
 * 
 *   Static methods for generating
 *   random passwords.
 * 
 * ***********************************/
function Password(){

}

// Possible characters in passwords
Password.chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_!@#$%^&*()+/{[]}|\;:'<>?";


/**************************************
 *
 *   Generates a random password out of
 *   the specified characters
 *
 *   Example:
 *     alert(Password.generate());
 *   for a password with 5 chars by default
 *     alert(Password.generate(10));
 *   for a password with 10 chars
 *
 *   ---------------------------------
 *
 *   length : length of the generated password
 *
 *   Returns a string with the password
 *
 * ***********************************/
Password.generate = function(length){
  
  length = (typeof length === "undefined") ? 5 : length;

  var password = "";
  
  // this will be a random sequence,
  // so every character in our password
  // will be picked individually
  for(var i = 0; i < length; i++){
    
    // generate a random position in our
    // possible character string
    var randomPos = randInt(0, this.chars.length - 1);
    
    // get the char at this position from our
    // possible character string
    var c = this.chars.charAt(randomPos);
    
    // append character to already
    // generated string
    password += c;
  }
  
  // return the password
  return password;
  
};

/**************************************
 * 
 *   Returns a random integer between
 *   min and max
 *   
 *   ---------------------------------
 * 
 *   min : lowest possible integer
 *   max : highest possible integer
 * 
 *   Returns an integer with the random number
 * 
 * ***********************************/
function randInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}