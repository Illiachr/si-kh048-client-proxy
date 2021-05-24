const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const jestOpenAPI = require('jest-openapi');
const axios = require('axios');
const { transform } = require('../gateway/client-v1/apiproxy/resources/jsc/utils');

const openApiFilePath = path.normalize(path.join(__dirname, './specs/si-client-proxy.yml'));

// try {
//   const doc = yaml.load(fs.readFileSync(openApiFilePath, 'utf8'));
//   console.log(doc);
// } catch (e) {
//   console.log(e);
// }

jestOpenAPI(openApiFilePath);

describe('GET /catalog/packages/base', () => {
  it('should satisfy OpenAPI spec', async () => {
    // Get an HTTP response from your server (e.g. using axios)
    const res = await axios.get('https://illiadev93-eval-test.apigee.net/sicp/api/v1/catalog/packages/base',
    {
      headers: { apikey: "Rhb0BLsayLw7hcJpKPUbiuxGNBry7ZfY" }
    });

    // console.log(res);

    expect(res.status).toEqual(200);

    // Assert that the HTTP response satisfies the OpenAPI spec
    expect(res).toSatisfyApiSpec();
  });
});

describe('transform response: catalog - base packages', () => {
  it('should satisfy schema in spec', () => {
    
  const entity = 'catalog';

  const envCtx = {
    reqScheme: 'https',
    proxyHost: 'illiadev93-eval-test.apigee.net',
    basepath: '/sicp/api/v1',
    pathsuffix: '/catalog/packages/base',
    itemId: 'packages'
  }
  const input = require('./mock/packagesBaseResponse');

    expect(transform(entity, input, envCtx)).toSatisfySchemaInApiSpec('PackagesList');
  });
});