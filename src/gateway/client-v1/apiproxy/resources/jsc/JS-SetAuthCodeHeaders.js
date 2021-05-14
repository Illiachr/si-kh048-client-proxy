(function() {
  var targetRespCode = context.getVariable("response.status.code");
  var targetReasonPhrase = context.getVariable("response.reason.phrase");
  var appId = context.getVariable("client_id");  

  context.setVariable("targetRespCode", targetRespCode);
  context.setVariable("targetRespPhrase", targetReasonPhrase);

  context.setVariable("response.header.response_type", "code");
  
  context.setVariable("response.header.redirect_URI", "https://illiadev93-test-eval");
  context.setVariable("response.header.app_id", appId);
})();