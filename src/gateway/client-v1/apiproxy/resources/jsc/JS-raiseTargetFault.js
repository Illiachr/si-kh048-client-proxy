/* eslint-disable no-undef */
var errResponse = null;

const resCode = context.getVariable("response.status.code");
const resPhrase = context.getVariable("response.status.phrase");

try {
  errResponse = JSON.parse(context.getVariable("response.content"));
} catch (ex) {
  context.setVariable("siclient.error.code", 500);
  context.setVariable(
    "siclient.error.message",
    "Response was not formatted as JSON"
  );
  context.setVariable(
    "siclient.error.info",
    "https://illiadev93-eval-si.apigee.io"
  );
  context.setVariable("siclient.error.status", 500);
  context.setVariable("siclient.error.reason", "Internal Server Error");
} // try

context.setVariable("siclient.error.code", resCode);
context.setVariable(
  "siclient.error.message",
  errResponse.error || errResponse.message || errResponse.msg
);
context.setVariable(
  "siclient.error.info",
  "https://illiadev93-eval-si.apigee.io"
);
context.setVariable("siclient.error.status", resCode);
context.setVariable("siclient.error.reason", resPhrase);
