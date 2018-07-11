const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
const auth = firebase.auth();
const messaging = firebase.messaging();
let currentUser = undefined;
let chatsDiv = document.getElementById("allChats");

console.log("firestore", firestore);
console.log("auth", auth);
console.log("messaging", messaging);


auth.onAuthStateChanged(function (user) {

})
let cUser = localStorage.getItem("user")

firestore.collection("messages").where("recieverId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(element => {
            console.log(element.doc.data())
            firestore.collection("messages").doc(element.doc.id).collection("message")
                .onSnapshot(function(res){
                    res.docChanges().forEach(mess => {
                        console.log(mess.doc.data())
                    })
                })
        });
    })





firebase.messaging().requestPermission()
    .then((res) => {
        console.log("premession Grantred ;)");
        return firebase.messaging().getToken()
    }).then(token => {
        console.log(token);
    }).catch((err) => {
        console.log(err)
    })



function sendMessage(event) {
    event.preventDefault();

    let message = document.getElementById("input").value;
    let recieverId = localStorage.getItem("adderId");
    let senderId = localStorage.getItem("user");

    let found = false

    firestore.collection("messages").where("senderId", "==", senderId).where("recieverId", "==", recieverId)
        .get().then((doc) => {
            doc.forEach(element => {
                found = true;
                firestore.collection("messages").doc(doc.docs[0].id).collection("message").add({
                    message: message,
                    senderId: senderId,
                    time: new Date()
                }).then(function () {
                    console.log("send and update")
                })
            })

            setTimeout(() => {
                if (found == false) {
                    firestore.collection("messages").add({
                        senderId: senderId,
                        recieverId: recieverId,
                    }).then(docRef => {
                        firestore.collection("messages").doc(docRef.id).collection("message")
                            .add({
                                message: message,
                                senderId: senderId,
                                time: new Date()
                            }).then(messRef => {
                                console.log("send Sucessfull!")
                            })
                    })
                }
            }, 4000)

            // if (doc.empty == true) {
            //     firestore.collection("messages").add({
            //         senderId: senderId,
            //         recieverId: recieverId,
            //     }).then(docRef => {
            //         firestore.collection("messages").doc(docRef.id).collection("message")
            //             .add({
            //                 message: message;
            //             }).then(messRef => {
            //                 console.log("send Sucessfull!")
            //             })
            //     })
            // }else if(doc.empty == false){
            //     firestore.collection("messages").doc(doc.id).collection("messages").add({
            //         message: message
            //     })
            // }
        })
    // firestore.collection("messages").add({
    //     message: message,
    //     senderId: senderId,
    //     recieverId: recieverId,
    // }).then(() => {
    //     console.log("Message Send")
    // })

}


// firestore.collection("abc").where("name", "==" , "samad")
//     .get().then(doc => {
//         doc.forEach(elem =>{
//             console.log("user" , elem.data())
//         })
//     })


// firestore.collection("abc").where("name", "==", "samad").get()
//     .then(doc => {
//         doc.forEach(element => {
//             debugger
//             console.log("elem", element);
//             firestore.collection("abc").doc(element.id).collection("message").get()
//                 .then(snapshot => {
//                     snapshot.forEach(mess => {
//                         console.log("mess", mess.data())
//                     })
//                 })

//             console.log("data", element.data())
//         })
//     })




firestore.collection("abc").where("name", "==", "sa")

    .get().then(function (doc) {
        doc.forEach(elem => {
            console.log(doc, "odcocnooss")
        })
    })
    .catch((e) => {
        console.log("err not fount sa")
    })


// firestore.collection("abc").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
//     .then(function (docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//         console.error("Error adding document: ", error);
//     });







