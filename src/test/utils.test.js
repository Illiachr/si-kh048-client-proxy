const utils = require('../gateway/client-v1/apiproxy/resources/jsc/utils');

describe('joinLink', () => {
  const { joinLink } = utils;
  let schema = 'https';
  let host = 'illiadev93-eval-test.apigee.net';
  let args = [];
  let basePath = '/client/api/v1';
  let entity = 'clients';
  let id = '123456';

  beforeEach(() => {
    schema = 'https';
    host = 'illiadev93-eval-test.apigee.net';
    args = [basePath, entity, id];
  });

  test('should be defined', () => {
    expect(joinLink).toBeDefined();
  });

  test('should return link', () => {
    const result = 'https://illiadev93-eval-test.apigee.net/client/api/v1/clients/123456';
    expect(joinLink(schema, host, args)).toEqual(result);
  });
});