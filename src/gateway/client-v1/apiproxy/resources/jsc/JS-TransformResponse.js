// (function() {
//     try {
//         var scheme = context.getVariable('req_scheme');
//         var host = context.getVariable('proxy_host');
//         var basepath = context.getVariable('proxy_base_path');
//         var entity = context.getVariable('urirequest.entity');
//         var id = context.getVariable('urirequest.id') || context.getVariable('customer_id');

//         // parse the response payload into the responsePayload object
//         var responsePayloadJSON = context.getVariable('response.content');
//         var responsePayload = JSON.parse(responsePayloadJSON);

//         var selfLink = joinLink(scheme, host, [basepath, entity, id]);
        
//         // add link to the response
//         responsePayload.self = selfLink;

//         // convert the response object back into JSON
//         context.setVariable('response.content', JSON.stringify(responsePayload));

//         context.setVariable('mashupLinkSuccess', true);
//     } catch(e){
//         // catch exception
//         print('Error occurred when trying to add the resourse link to the response.');
//         context.setVariable('mashupLinkSuccess', false);
//     }
// })();

(function() {

    var parsedResponse = null;
    const originalResponse = context.getVariable('response.content');
    
    try {
        parsedResponse = JSON.parse(originalResponse);
    } catch (err) {
        throw new Error('Response was not formatted as JSON');
    }
    
    var response = null;
    const entity = context.getVariable('urirequest.entity');
    
    const envCtx = {
        reqScheme: context.getVariable('request.scheme'),
        proxyHost: context.getVariable('proxy.host'),
        basepath: context.getVariable('proxy.basepath'),
        pathsuffix: context.getVariable('proxy.pathsuffix'),
        itemId: context.getVariable('urirequest.id')
    }
    
    if (parsedResponse) {
        response = transform(entity, parsedResponse, envCtx)
        
        context.getVariable('response.content', JSON.stringify(response, null, 2));
    }

})();
