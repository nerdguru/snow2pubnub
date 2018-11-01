# snow2pubnub

This repo contains a quick-and-dirty implementation of a Service Now script include that is capable of inserting a message onto PubNub.  It was originally created for a demo and not intended for production use.

## PubNub
First, [take a look at the PubNub API in question](https://www.pubnub.com/docs/pubnub-rest-api-documentation#publish-subscribe-publish-v1-via-post-post).

In particular, there's a very convenient GET method that can be used to place a message on the queue

```
https://ps.pndsn.com/publish/{pub_key}/{sub_key}/0/{channel}/0/{payload}{?uuid}
```

### URI Parameters
#### pub_key
string (required) Example: myPubKey
the publish key to use

#### sub_key
string (required) Example: mySubKey
the subscriber key

#### channel
string (required) Example: ch1
the destination of the message

#### callback
string (required) Example: myCallback
response will be wrapped in JSONP function, 0 for no JSONP

#### payload
string (required) Example: %7B%22text%22%3A%22hey%22%7D
url-encoded JSON

#### uuid
string (required) Example: db9c5e39-7c95-40f5-8d71-125765b6f561
A unique alphanumeric ID for identifying the client.


### Example
So the following:
```
curl https://ps.pndsn.com/publish/myPubKey/mySubKey/0/ch1/0/%7B%22text%22%3A%22hey%22%7D?uuid=db9c5e39-7c95-40f5-8d71-125765b6f561
```
Will cause this to show up in Pubnub:
```
{
  "text": "hey"
}
```

## SNOW REST
Service Now has a facility for [setting up REST endpoints](https://developer.servicenow.com/app.do#!/document/content/app_store_doc_outbound_rest_kingston_t_ConfiguringARESTMessage?v=kingston).  Create a new REST message called `PubNub` that has the following endpoint

```
https://ps.pndsn.com/publish/${pubkey}/${subkey}/0/${channel}/0/${encodedMsg}?uuid=${uuid}
```

Once created, in the `HTTP Methods` section, click on the `Default GET`.  In the second set of tabs, there is a tab titled `Variable Substitutions`.  For each of the variables in the URI (`pubkey`, `subkey`, `channel`, `encodeMsg`, and `uuid`), set the names and values accordingly based on what you did for the `curl` test earlier.

Between the two sets of tabs, there is a section titled `Related Links`.  With the `Variable Substitutions` set, click on `Test`.  When doing so, you should now see a new message show up on PubNub that matches whatever you set `encodeMsg` to.

**Note** Right now, I can't get the `channel` variable to set correctly so as a workaround you can hard code your channel name.


## SNOW Business Rule
The contents of `pubnub.js` are derived from the [SNOW provided Yahoo Finance example](https://docs.servicenow.com/bundle/london-application-development/page/app-store/dev_portal/API_reference/RESTMessageV2/reference/r_DirectRESTMessageV2Example.html).  Make a business rule out of it, filling in the appropriate `var` values as needed.

**Note** Right now, I'm unable to get Business Rules to fire correctly so the `pubnub.js` code has not yet been tested.  Specifically, I'm a little worried about whether or not `encodeURI` is available.
