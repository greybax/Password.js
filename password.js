/**************************************
 *
 *   Module for generating
 *   random passwords
 *
 *   Created by 
 *   Aleksandr Filatov (c)
 * 
 * ***********************************/
var Password = (function() {

	var _digits              = "0123456789";
	var _alphabet            = "abcdefghijklmnopqrstuvwxyz";
	var _alphabetCapitalized = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var _spec                = "-_!@#$%^&*()+/{[]}|\;:'<>?";

	var _randInt = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	var _agregateChars = function(useDigits, useAlphabet, useAlphabetCapitalized, useSpec) {
		var chars = "";

		if (useDigits)
			chars += _digits;
		if (useAlphabet)
			chars += _alphabet;
		if (useAlphabetCapitalized)
			chars += _alphabetCapitalized;
		if (useSpec)
			chars += _spec;
			
		return chars;
	};
	
	/***************************************
	*   Private method
	*   for generating random one password
	* *************************************/
	var _generateOne = function(config, chars) {
		var password = "";

		for(var i = 0; i < config.length; i++){
			// generate a random position in
			// possible character string
			var randomPos = _randInt(0, chars.length - 1);

			// get the char at this position from
			// possible character string
			var c = chars.charAt(randomPos);

			// append character to already
			// generated string
			password += c;
		}
		
		// return the password
		return password;
	};

	return {
	
		/***************************************
		*    Common config settings 
		* *************************************/
		config: {
			useDigits 				: true,
			useAlphabet 			: true,
			useAlphabetCapitalized  : true,
			useSpec 				: true,
			
			numberOfPasswords 		: 1,
			length 					: 5
		},

		/***************************************
		*    Public common method 
		*    for generating passwords
		* *************************************/
		generate: function(){	
			var config = this.config;
			
			var chars = _agregateChars(
				config.useDigits,
				config.useAlphabet,
				config.useAlphabetCapitalized,
				config.useSpec
			);

			var passwordArray = [];
			for (i = 0; i < config.numberOfPasswords; i++) {
				passwordArray.push({
						"key"  : i,
						"pass" : _generateOne(config, chars)
					}
				);
			}
			
			return JSON.stringify(passwordArray);			
		}
	}
}());





