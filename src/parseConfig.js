// parseConfig.js
import Parse from "parse";

// Initialize Parse with Back4App credentials
Parse.initialize("s9lCqixuSrqpLUe8P7LWITgpqWE3gSo6ox6I40WS", "B5yn86As94GTRRpmNcIpGSUi0bylQ2iIZp9fMIas");
Parse.serverURL = "https://parseapi.back4app.com";

export default Parse;

/* 
If you run into any issues with these keys, tinker around with these keys:
The second argument for the Parse.initialize function is supposed to be the javascript key

Application ID
Main ID that uniquely specifies this app.
Used with one of the keys below.
s9lCqixuSrqpLUe8P7LWITgpqWE3gSo6ox6I40WS

Client key
Use this in consumer clients, such as
the iOS or Android SDKs.
A0ojg6MFNm5ZtRIviLBpxuqIhXCPSbVLNaxOIh9G

JavaScript key
Use this when making requests from JavaScript clients.
B5yn86As94GTRRpmNcIpGSUi0bylQ2iIZp9fMIas

.NET key
Use this when making requests from
Windows, Xamarin, or Unity clients.
USDOSi2x0vsvXxLvYbSGY3pRWYk2YwtEYJmkSfJ4

REST API key
Use this when making requests from server-side REST applications. Keep it secret!
REST key
zeNpkegly1Jnwh5ZRzm6wpUupLokXPdURDiR1l93



*/