const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const jestOpenAPI = require('jest-openapi');

const { transform } = require('../gateway/client-v1/apiproxy/resources/jsc/utils');

const openApiFilePath = path.normalize(path.join(__dirname, './specs/si-client-proxy.yml'));

jestOpenAPI(openApiFilePath);

const envCtx = {
  reqScheme: 'https',
  proxyHost: 'illiadev93-eval-test.apigee.net',
  basepath: '/sicp/api/v1',
  pathsuffix: '/catalog/packages/base',
  itemId: 'packages'
}

describe('transform response: catalog - base packages', () => {
  it('should satisfy schema in spec', () => {
    
    const entity = 'catalog';
    envCtx.pathsuffix = '/catalog/packages/base';
    const { BASE_PACKAGES: input } = require('./mock/response');

    expect(transform(entity, input, envCtx)).toSatisfySchemaInApiSpec('PackagesList');
  });
});