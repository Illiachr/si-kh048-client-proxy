(function() {
    try {
        var scheme = context.getVariable('req_scheme');
        var host = context.getVariable('proxy_host');
        var basepath = context.getVariable('proxy_base_path');
        var entity = context.getVariable('urirequest.entity');
        var id = context.getVariable('urirequest.id') || context.getVariable('customer_id');

        // parse the response payload into the responsePayload object
        var responsePayloadJSON = context.getVariable('response.content');
        var responsePayload = JSON.parse(responsePayloadJSON);

        var selfLink = joinLink(scheme, host, [basepath, entity, id]);
        
        // add link to the response
        responsePayload.self = selfLink;

        // convert the response object back into JSON
        context.setVariable('response.content', JSON.stringify(responsePayload));

        context.setVariable('mashupLinkSuccess', true);
    } catch(e){
        // catch exception
        print('Error occurred when trying to add the resourse link to the response.');
        context.setVariable('mashupLinkSuccess', false);
    }
})();
