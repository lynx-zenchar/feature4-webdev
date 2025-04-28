// parseConfig.js
import Parse from "parse";
import { LiveQueryClient } from "parse";

// 1. Initialize Parse
const APP_ID   = "s9lCqixuSrqpLUe8P7LWITgpqWE3gSo6ox6I40WS";
const JS_KEY   = "B5yn86As94GTRRpmNcIpGSUi0bylQ2iIZp9fMIas";
const REST_KEY = "zeNpkegly1Jnwh5ZRzm6wpUupLokXPdURDiR1l93";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com";


/*
DISABLE LIVEQUERY FOR NOW UNTIL ACCOUNT GETS VERIFIED

// 2. Set up LiveQuery client
//    Replace YOUR_SUBDOMAIN with the one you configured in Back4App (often the same as APP_ID)
const LIVE_QUERY_URL = "wss://YOUR_SUBDOMAIN.b4a.io";  
const liveQueryClient = new LiveQueryClient({
  applicationId: APP_ID,
  javascriptKey: JS_KEY,
  serverURL: LIVE_QUERY_URL,
  // (optionally) restKey: REST_KEY, // not needed for client-side
});

// 3. Open the connection
liveQueryClient.open();

// 4. Attach to Parse so you can do:
//      const sub = Parse.liveQueryClient.subscribe(query);
Parse.liveQueryClient = liveQueryClient;


 */


export default Parse; // KEEP OUTSIDE
