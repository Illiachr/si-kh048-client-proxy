const { joinLink, basicAuthHeader } = require('../jsc/utils');

const link = joinLink('https', 'illiadev93-eval-test.apigee.net', '/client/api/v1', 'clients', '{clientId}');
const basicHeader = basicAuthHeader("Rhb0BLsayLw7hcJpKPUbiuxGNBry7ZfY", "WRdxn2pAA1rsAu6g");
console.log(basicHeader);