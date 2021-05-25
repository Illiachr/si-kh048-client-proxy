function joinLink (scheme, host, args) {
    if (!args || !Array.isArray(args) || !args.length) {
        return scheme + '://' + host;
    }
    return scheme + '://' + host + args.join('/');
}

function fixTimeStr (dateTime) {
    var arr = dateTime.split(' ');
    arr[0] = arr[0].split('-').reverse().join('-') + 'T';
    return arr.join('') + 'Z';
}

function timeToISO (dateTime) {
    const rfcTimePattern = /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[+-]\d{2}:\d{2})?)$/gm;
    if (rfcTimePattern.test(dateTime)) {
        return new Date(dateTime).toISOString();
    }

    var fixedTime = fixTimeStr(dateTime);

    if (!Date.parse(fixedTime)) {
        return dateTime;
    }

    return new Date(fixedTime).toISOString();
}

function transform(entity, input, ctx) {

    const pathsuffix = ctx.pathsuffix,
        basepath = ctx.basepath,	
        proxyResponse = {
            // data: {},
            // links: {"self": {"href": ''}},
        };

    if (entity === 'catalog') {
        proxyResponse.data = [];
        proxyResponse.links = {'collection': {'href': ''}};
        proxyResponse.total = input.length;
        proxyResponse.offset = ctx.offset || 0;
        proxyResponse.pages = ctx.pages || 0;

        switch (pathsuffix) {
        case '/catalog/packages/base':
            for (var i = 0; i < input.length; i++) {
                input[i].createdTime = timeToISO(input[i].createdTime);
                proxyResponse.data[i] = input[i];
                proxyResponse.links.collection.href = joinLink(ctx.reqScheme, ctx.proxyHost, [basepath]) + pathsuffix;
            }
            break;
        }
    }
	
    return proxyResponse;

}

if (!module) {
    var module = { exports: {} };
}

module.exports.joinLink = joinLink;
module.exports.timeToISO = timeToISO;
module.exports.transform = transform;
