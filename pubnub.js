var requestBody;
var responseBody;
var status;
var sm;
var pubkey = '';
var subkey = '';
var channel = '';
var message = '';
var encodedMsg = encodeURI(message);
var uuid = '';

try {
  sm = new sn_ws.RESTMessageV2('PubNub', 'get');
  response = sm.execute();
  responseBody = response.haveError() ? response.getErrorMessage() : response.getBody();
  status = response.getStatusCode();
} catch (ex) {
  responseBody = ex.getMessage();
  status = '500';
} finally {
  requestBody = sm ? sm.getRequestBody() : null;
}

gs.info('Request Body: ' + requestBody);
gs.info('Response: ' + responseBody);
gs.info('HTTP Status: ' + status);
