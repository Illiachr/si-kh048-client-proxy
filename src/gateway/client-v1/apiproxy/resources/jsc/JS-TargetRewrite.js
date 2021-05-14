(function() {
    var pathSuffix = context.getVariable('proxy.pathsuffix');
    var targetUrl = context.getVariable('target.url');
  try {
    var path = rwRoute(targetUrl, pathSuffix);
    context.setVariable('target.url', path);
  } catch (e) {
    setErrorMessage(error.message);
  }
})();

function setErrorMessage(message) {
	context.setVariable("js.error.message", message);
	throw new Error("JS error");
}
