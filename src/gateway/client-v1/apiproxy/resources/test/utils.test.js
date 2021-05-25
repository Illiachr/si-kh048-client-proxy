const utils = require('../jsc/utils');

describe('joinLink', () => {
    const { joinLink } = utils;
    const schema = 'https';
    const host = 'illiadev93-eval-test.apigee.net';
    const args = ['/sicp/api/v1', 'clients', '123456'];

    test('should be defined', () => {
        expect(joinLink).toBeDefined();
    });

    test('should return link', () => {
        const result = 'https://illiadev93-eval-test.apigee.net/sicp/api/v1/clients/123456';
        expect(joinLink(schema, host, args)).toEqual(result);
    });
});

describe('timeToRFC', () => {
    const { timeToISO } = utils;
  
    test('should be defined', () => {
        expect(timeToISO).toBeDefined();
    });

    test('should return time in RFC format', () => {
        const dateTime = ['24-03-2021 01:55:47', '2021-03-24T01:55:47.000Z'];
        const result = '2021-03-24T01:55:47.000Z';
        const rfcTimePattern = /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[+-]\d{2}:\d{2})?)$/gm;

        expect(timeToISO(dateTime[0])).toEqual(result);
        expect(timeToISO(dateTime[0])).toMatch(rfcTimePattern);

        expect(timeToISO(dateTime[1])).toEqual(result);
        expect(timeToISO(dateTime[1])).toMatch(rfcTimePattern);
    });
});

describe('transform() defined', () => {
    const { transform } = utils;
    expect(transform).toBeDefined();
});