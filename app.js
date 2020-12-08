const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
function runSample(projectId = 'rn-bot-muwh') {
	// A unique identifier for the given session
	const sessionId = uuid.v4();

	// Create a new session
	const sessionClient = new dialogflow.SessionsClient({
		keyFilename: 'C:/Users/Saurav/Documents/webdev/chatbot-client/rn-bot-muwh-7756654873d7.json'
	});
	const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

	process.stdin.on('data', (data) => {
		const query = data.toString();
		const request = {
			session: sessionPath,
			queryInput: {
				text: {
					// The query to send to the dialogflow agent
					text: query,
					// The language used by the client (en-US)
					languageCode: 'en-US'
				}
			}
		};

		// Send request and log result
		sessionClient
			.detectIntent(request)
			.then((responses) => {
				const result = responses[0].queryResult;
				console.log();
				console.log(`Bot : ${result.fulfillmentText}`);
				console.log();
				// if (result.intent) {
				// 	console.log(`  Intent: ${result.intent.displayName}`);
				// } else {
				// 	console.log(`  No intent matched.`);
				// }
			})
			.catch((e) => {
				console.log('Error connecting to server');
				process.exit(0);
			});
	});
}
runSample();
