function joinLink(scheme, host, args) {
  if (!args || !Array.isArray(args) || !args.length) {
    return scheme + "://" + host;
  }
  return scheme + "://" + host + args.join("/");
}

function fixTimeStr(dateTime) {
  var arr = dateTime.split(" ");
  arr[0] = arr[0].split("-").reverse().join("-") + "T";
  return arr.join("") + "Z";
}

function timeToISO(dateTime) {
  const rfcTimePattern =
    /^((?:(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2}(?:\.\d+)?))(Z|[+-]\d{2}:\d{2})?)$/gm;
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
  console.log(input);
  const pathsuffix = ctx.pathsuffix,
    basepath = ctx.basepath,
    proxyResponse = {};

  if (entity === "catalog") {
    proxyResponse.data = [];
    proxyResponse.links = {
      collection: {
        href: joinLink(ctx.reqScheme, ctx.proxyHost, [basepath]) + pathsuffix
      }
    };
    proxyResponse.total = input.length;

    switch (pathsuffix) {
    case "/catalog/packages/base":
      for (var i = 0; i < input.length; i++) {
        input[i].createdTime = timeToISO(input[i].createdTime);
        proxyResponse.data[i] = input[i];
      }
      break;
    case "/catalog/products":
      for (var j = 0; j < input.length; j++) {
        proxyResponse.data[j] = input[j];
      }
      break;
    } // end switch
  } // end if
  if (entity === "clients") {
    console.log("ctx.itemId >>> ", ctx.itemId);
    if (pathsuffix === "/clients" && ctx.reqVerb === "GET") {
      proxyResponse.data = [];
      for (var k = 0; k < input.length; k++) {
        proxyResponse.data[k] = input[k];
        proxyResponse.data[k].balance = Number(proxyResponse.data[k].balance);
      }
      proxyResponse.links = {
        collection: {
          href: joinLink(ctx.reqScheme, ctx.proxyHost, [basepath, pathsuffix])
        }
      };
      proxyResponse.total = input.length;
    } else if (pathsuffix.includes(ctx.itemId)) {
      proxyResponse.data = input;
      proxyResponse.data.balance = Number(proxyResponse.data.balance);
      proxyResponse.links = {
        self: {
          href: joinLink(ctx.reqScheme, ctx.proxyHost, [basepath, pathsuffix])
        }
      };
    } // if GET /clients OR /clients/{clientId}

    if (pathsuffix === "/clients" && ctx.reqVerb === "POST") {
      proxyResponse.links = {
        self: {
          href: joinLink(ctx.reqScheme, ctx.proxyHost, [basepath, pathsuffix, ctx.itemId])
        }
      };
    } // if POST /clients

    if (pathsuffix === "/clients" && ctx.reqVerb === "PATCH") {
      proxyResponse.links = {
        self: {
          href: joinLink(ctx.reqScheme, ctx.proxyHost, [basepath, pathsuffix, ctx.itemId])
        }
      };
    } // if PATCH /clients -> balance or name
  }
  console.log("proxyResponse >>> ", proxyResponse);
  return proxyResponse;
}

if (!module) {
  var module = { exports: {} };
}

module.exports.joinLink = joinLink;
module.exports.timeToISO = timeToISO;
module.exports.transform = transform;
