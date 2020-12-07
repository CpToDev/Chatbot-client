const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'rn-bot-muwh') {
	// A unique identifier for the given session
	const sessionId = uuid.v4();

	// Create a new session
	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: 'C:/Users/Saurav/Documents/webdev/chatbot-client/rn-bot-muwh-7756654873d7.json'
	});
	const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

	// The text query request.
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				// The query to send to the dialogflow agent
				text: 'What is the status of my order ?',
				// The language used by the client (en-US)
				languageCode: 'en-US'
			}
		}
	};

	// Send request and log result
	const responses = await sessionClient.detectIntent(request);
	console.log('Detected intent');
	const result = responses[0].queryResult;
	console.log(`  Query: ${result.queryText}`);
	console.log(`  Response: ${result.fulfillmentText}`);
	if (result.intent) {
		console.log(`  Intent: ${result.intent.displayName}`);
	} else {
		console.log(`  No intent matched.`);
	}
}
runSample();
