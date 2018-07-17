const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.sendNotification = functions.firestore.document('/messages/{roomId}/message/{messageId}')
    .onWrite((event) => {

        console.info("event After >>>", event.after)
        let resieverId = event.after.data().recieverId
        return admin.firestore().collection("users").doc(resieverId).get().then((user) => {

            if (!user.data()) return;

            const snapshot = user.data();
            const payload = {
                notification: {
                    title: `New Message From ${snapshot.name}`,
                    body: event.after.data().message,
                    icon: snapshot.profileImg
                }
            }
            const token = snapshot.token;
            console.info("payload >>>", payload)
            return admin.messaging().sendToDevice(token, payload);
        });
    })