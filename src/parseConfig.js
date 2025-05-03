// parseConfig.js
import Parse from "parse";
import { LiveQueryClient } from "parse";

// 1. Initialize Parse
const APP_ID   = "s9lCqixuSrqpLUe8P7LWITgpqWE3gSo6ox6I40WS";
const JS_KEY   = "B5yn86As94GTRRpmNcIpGSUi0bylQ2iIZp9fMIas";
const REST_KEY = "zeNpkegly1Jnwh5ZRzm6wpUupLokXPdURDiR1l93";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com";

// 2. Set up LiveQuery client
//    Replace YOUR_SUBDOMAIN with your Back4App LiveQuery subdomain
const LIVE_QUERY_URL = "wss://taskmanager.b4a.io";
const liveQueryClient = new LiveQueryClient({
  applicationId: APP_ID,
  javascriptKey: JS_KEY,
  serverURL: LIVE_QUERY_URL,
});

// 3. Open the connection and attach to Parse
liveQueryClient.open();
Parse.liveQueryClient = liveQueryClient;

export default Parse;