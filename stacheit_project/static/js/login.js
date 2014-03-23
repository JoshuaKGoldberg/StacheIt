/**
* Turns "page.html?arg1=val1&arg2=val2" into { "arg1": "val1", "arg2": val2" }
*
* @param {String} raw   The raw string URL (if falsy, location.href is used)
* @param {output} output   An output array to store in (if falsy, a new one is made and returned)
*/
function parseArguments(raw, output) {
  raw = raw || location.href;
  output = output || {};
  ((raw.slice(raw.indexOf('?') + 1, Infinity) || '').split('&') || '').map(function(str, i) {
    i = str.split('=');
    output[i[0]] = i[1];
  });
  return output;
}

var args = parseArguments();

// Fill "username" and "password" into the inputs, if given
if(args.hasOwnProperty("username")) {
  document.getElementById("username").value = args.username;
}
if(args.hasOwnProperty("password")) {
  document.getElementById("password").value = args.password;
}

// If directed, submit the login form immediately
if(args.login_quicker == "on") {
  document.getElementById("login_form").submit();
}