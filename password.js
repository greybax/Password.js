/**************************************
 *
 *   Module for generating
 *   random passwords
 *
 *   Created by
 *   Aleksandr Filatov (c)
 * 
 *************************************/
var Password = (function() {

	var _digits              = "0123456789";
	var _alphabet            = "abcdefghijklmnopqrstuvwxyz";
	var _alphabetCapitalized = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var _spec                = "~`-_!@#$%^&*()+/{[]}|\\;:'<>?";
	
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
	var _generateOnePass = function(config, chars) {
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
			useDigits               : true,
			useAlphabet             : true,
			useAlphabetCapitalized  : true,
			useSpec                 : true,

			numberOfPasswords       : 1,
			length                  : 5
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
						"pass" : _generateOnePass(config, chars)
					}
				);
			}
			
			return JSON.stringify(passwordArray);
		},

		/***************************************
		*    Public common method 
		*    for calculation password entropy
		* *************************************/
		checkEntropy: function(password) {
			if (password.length < 0) {
				return 0;
			}
			
			var alphabetChars = _alphabet.length;
			var alphabetCapitalizedChars = _alphabetCapitalized.length;
			var specChars = _spec.length;
			var digitChars = _digits.length;
			
			var fAlphabet = false;
			var fAlphabetCapitalized = false;
			var fSpec = false;
			var fDigit = false;
			var charset = 0;

			for (var i = 0; i < password.length; i++) {
				var c = password.charAt(i);

				if (_alphabet.indexOf(c) != -1)
					fAlphabet = true;
				else if (_alphabetCapitalized.indexOf(c) != -1)
					fAlphabetCapitalized = true;
				else if (_spec.indexOf(c) != -1)
					fSpec = true;
				else if (_digits.indexOf(c) != -1)
					fDigit = true;
			}

			if (fAlphabet)
				charset += alphabetChars;
			if (fAlphabetCapitalized)
				charset += alphabetCapitalizedChars;
			if (fSpec)
				charset += specChars;
			if (fDigit)
				charset += digitChars;
			
			return Math.floor(Math.log(charset) * (password.length / Math.log(2)));
		},

		/***************************************
		*    Public encryption method 
		*    for entering password
		* *************************************/
		encrypt: function (message, length) {
			// If the message is the empty string, return the empty string.
			if(message == "") {
				return "";
			}

			// Calculate the offset of the first character.
			var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
				for(var last = 0, i = 0, len = message.length; i < len; i++) {
					last = (message.charCodeAt(i) + 31 * last) % 59;
			}

			// Adjust for the specified length if it was given.
			length = length || message.length;
				while(len < length) {
					message += message;
					len += len;
			}
			message = message.slice(0, length);

			// Generate the encrypted string.
			for(var ret = "", i = 0; i < length; i++) {
				ret += chars[last = (i + last + message.charCodeAt(i)) % 64];
			}
			return ret;
		}
	}
}());