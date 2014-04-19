Password.js
===========

Javascript library for generate random passwords

<p><h3>Possible characters in passwords are: </h3>
  <ul>
    <li> 0123456789 </li>
    <li> abcdefghijklmnopqrstuvwxyz </li>
    <li> ABCDEFGHIJKLMNOPQRSTUVWXYZ</li>
    <li> -_!@#$%^&*()+/{[]}|\;:'<>? </li>
  </ul>
</p>

<p><h3>Config settings (by default):</h3>
<p>If you want you can override this config <i>(for example Password.config.useDigits = false)</i> </p>
<pre>
<code>
  config: {
  			useDigits               : true,
  			useAlphabet             : true,
  			useAlphabetCapitalized  : true,
  			useSpec                 : true,
  			
  			numberOfPasswords       : 1,
  			length                  : 5
  		}
  </code>
</pre>

<p><h3>Check password entropy:</h3>
<p> bits = Math.floor(Math.log(charset)*(lenght/Math.log(2))) </p>
<ul>
  <li> <b> bits </b> - bit resistance </li>
  <li> <b> log </b> - natural logarithm </li>
  <li> <b> length </b> - password length </li>
  <li> <b> charset </b> - sets the total size for each of the types below, if they exist in possible characters in     passwords </li>
</ul>

<i> Example: </i> Password.checkEntropy('jjF25jVNGI') equals 59

</p>

<p><h3>Simply to use:</h3>
  <ul>
    <li> Put it library in you project and link it </li>
    <li> Configure it in Password.config settings </li>
    <li> Password.generate() returns passwords in JSON format </li>
  </ul>
</p>
