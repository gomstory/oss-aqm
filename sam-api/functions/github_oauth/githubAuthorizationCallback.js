const { constants } = require('./constants')
const { generateErrorObject } = require('./error')
const { asyncHttpsRequest } = require('./request')
const { URL } = require('url')

function extractCode (event) {
  const queryStringParameters = event.queryStringParameters || {}
  return queryStringParameters.code
}

async function exchangeCodeForToken (code) {
  const api = new URL('/login/oauth/access_token', 'https://github.com')
  api.searchParams.set('client_id', process.env.CLIENT_ID)
  api.searchParams.set('client_secret', process.env.CLIENT_SECRET)
  api.searchParams.set('code', code)
  return asyncHttpsRequest(api, 'POST')
}

exports.handler = async (event) => {
  if (!process.env.CLIENT_ID) {
    return generateErrorObject('CLIENT_ID is not set in environment')
  }

  if (!process.env.CLIENT_SECRET) {
    return generateErrorObject('CLIENT_SECRET is not set in environment')
  }

  if (!process.env.OAUTH_CALLBACK_URL) {
    return generateErrorObject('OAUTH_CALLBACK_URL is not set in environment')
  }

  const code = extractCode(event)

  if (!code) {
    return generateErrorObject('did not get expected query string named [code]')
  }

  let response

  try {
    response = await exchangeCodeForToken(code)
  } catch (e) {
    console.error('response', response)
    return generateErrorObject('Failed to exchange code for access_token')
  }

  if (!response || !response.data.access_token) {
    console.error('response', response)
    return generateErrorObject('did not receive expected [access_token]')
  }

  // Save token to Dynamodb
  const region = process.env["REGION_NAME"]
  const table_name = process.env["TOKEN_TABLE"]
  const AWS = require('aws-sdk');
  AWS.config.update({ region: region });
  const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
  const now = Date.now().toString()
  const params = {
    TableName: table_name,
    Item: {
      "id": now,
      "access_token": response.data.access_token,
      "token_type": response.data.token_type,
      "created_time": now
    }
  };
  
  try {
    var result = await ddb.put(params).promise();
    console.log(result)
  } catch (e) {
    console.error('error', e)
    return generateErrorObject('Failed to save data to dynamoDb')
  }

  return {
    statusCode: 302,
    headers: {
      Location: `${process.env.OAUTH_CALLBACK_URL}?${constants.authRedirectTokenParam}=${response.data.access_token}`
    },
    body: null
  }
}
