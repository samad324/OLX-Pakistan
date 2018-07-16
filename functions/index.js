const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.sendNotification = functions.firestore.document('/messages/{roomId}/messages/{messageId}')
.onWrite((event) => {
    const payload = {
        notification: {
            title: 'New Message from',
            body: 'New Message Body',
            status: 'Wohoo its work',
        }
    }

    console.info(payload)
    console.info("event >>>", event)
    let resieverId = event.after.data().recieverId
    return admin.firestore().collection("users").doc(resieverId).get().then((user) => {

        if (!user.data()) return;

        const snapshot = user.data();
        const token = snapshot.token;

        return admin.messaging().sendToDevice(token, payload);
    });
})