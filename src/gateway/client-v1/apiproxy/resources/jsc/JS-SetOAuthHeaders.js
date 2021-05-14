(function() {
  var userGrantBasic = context.getVariable("userGrant.basic");
  var clientId = context.getVariable("client_id");
  var clientSecret = context.getVariable("verifyapikey.VAK-VerifyKey.client_secret");
  // var login = context.getVariable("userGrant.login");
  // var pwd = context.getVariable("userGrant.pwd");

  context.setVariable("response.header.grant_type", "password");
  // context.setVariable("response.header.client_app_id", clientAppId);
  context.setVariable("response.header.Authorization", userGrantBasic);
  // context.setVariable("response.header.Authorization", basicAuthHeader(clientId, clientSecret));
})();