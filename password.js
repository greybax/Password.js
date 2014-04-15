/**************************************
 *
 *   Static methods for generating
 *   random passwords.
 * 
 * ***********************************/
var Password = (function() {

	var digits = "0123456789";
	var alphabet = "abcdefghijklmnopqrstuvwxyz";
	var alphabetCapitalized = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var spec = "-_!@#$%^&*()+/{[]}|\;:'<>?";

	var randInt = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	var agregateChars = function(useDigits, useAlphabet, useAlphabetCapitalized, useSpec) {
		var chars = "";
		
		if (useDigits)
			chars += digits;
		if (useAlphabet)
			chars += alphabet;
		if (useAlphabetCapitalized)
			chars += alphabetCapitalized;
		if (useSpec)
			chars += spec;	
			
		return chars;
	}

	return {
		config: {
			useDigits : true,
			useAlphabet : true,
			useAlphabetCapitalized : true,
			useSpec : true,
			
			numberOfPasswords : 1,
			length : 5
		},
		
		generate: function(){
		
			var password = "";
			
			var config = this.config;
			var chars = agregateChars(config.useDigits, config.useAlphabet, config.useAlphabetCapitalized, config.useSpec);
			  
			// this will be a random sequence,
			// so every character in our password
			// will be picked individually
			for(var i = 0; i < config.length; i++){
				
				// generate a random position in our
				// possible character string
				var randomPos = randInt(0, chars.length - 1);
				
				// get the char at this position from our
				// possible character string
				var c = chars.charAt(randomPos);
				
				// append character to already
				// generated string
				password += c;
			}
			
			// return the password
			return password;
		}
	}
	
}());





