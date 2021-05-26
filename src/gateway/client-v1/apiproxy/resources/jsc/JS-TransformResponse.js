/* eslint-disable no-undef */

(function () {
  var parsedResponse = null;
  const originalResponse = context.getVariable("response.content");

  try {
    if (originalResponse.lenght) {
      parsedResponse = JSON.parse(originalResponse);
    } else { parsedResponse = {}; }
    
  } catch (err) {
    throw new Error("Response was not formatted as JSON");
  }

  var response = null;
  const entity = context.getVariable("urirequest.entity");
  const responseStatus = context.getVariable("response.status.code");

  const envCtx = {
    reqVerb: context.getVariable("req_verb"),
    reqScheme: context.getVariable("req_scheme"),
    proxyHost: context.getVariable("proxy_host"),
    basepath: context.getVariable("proxy.basepath"),
    pathsuffix: context.getVariable("proxy.pathsuffix"),
    itemId: context.getVariable("urirequest.id") || context.getVariable("accesstoken.CUID"),
  };

  if (parsedResponse) {
    response = transform(entity, parsedResponse, envCtx);
    context.setVariable("response.content", JSON.stringify(response, null, 2));

    if (envCtx.reqVerb === "POST" && envCtx.pathsuffix === "/clients" && responseStatus === "204" ) {
      context.setVariable("response.status.code", "201");
      context.setVariable("response.status.phrase", "Created");
    }
  }
})();
