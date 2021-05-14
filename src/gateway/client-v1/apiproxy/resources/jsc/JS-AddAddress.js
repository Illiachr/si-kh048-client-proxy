 // get the flow variable 'address'
const address = context.getVariable('address');

// parse the response payload into the responsePayload object
const responsePayload = JSON.parse(context.getVariable('response.content'));
try{
    // add address to the response
    responsePayload.address = address;

    // convert the response object back into JSON
    context.setVariable('response.content', JSON.stringify(responsePayload));

    context.setVariable('mashupAddressSuccess', true);

} catch(e){
    // catch any exception
    print('Error occurred when trying to add the address to the response.');
    context.setVariable('mashupAddressSuccess', false);
}