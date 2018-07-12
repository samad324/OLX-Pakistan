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
let cUser = localStorage.getItem("user");
let chats = new Set();

firestore.collection("messages").where("recieverId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(element => {
            chats.add(element.doc.id)
        })
    })

firestore.collection("messages").where("senderId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(element => {
            chats.add(element.doc.id)
        })
    })

// let chatsSize = chats.size;
// setInterval(function () {
//     let chatsFinalSize = chats.size;

//     // if(chatsFinalSize > chatsSize){
//     chats.forEach(id => {
//         firestore.collection("messages").doc(id).get()
//             .then(doc => {
//                 console.log("docData===>>>>>", doc.data())
//             })
//     })
//     // }


// }, 2000)



// firestore.collection("messages").where("recieverId", "==", cUser)
//     .onSnapshot(function (querySnapshot) {
//         querySnapshot.docChanges().forEach(element => {
//             console.log(element.doc.data())
//             firestore.collection("messages").doc(element.doc.id).collection("message")
//                 .onSnapshot(function(res){
//                     res.docChanges().forEach(mess => {
//                         chats.add(element.doc.id)
//                         console.log(mess.doc.data())
//                     })
//                 })
//         });
//     })

//     firestore.collection("messages").where("senderId", "==", cUser)
//     .onSnapshot(function (querySnapshot) {
//         querySnapshot.docChanges().forEach(element => {
//             console.log(element.doc.data())
//             firestore.collection("messages").doc(element.doc.id).collection("message")
//                 .onSnapshot(function(res){
//                     res.docChanges().forEach(mess => {
//                         chats.add(element.doc.id)
//                         console.log(mess.doc.data())
//                     })
//                 })
//         });
//     })





// firebase.messaging().requestPermission()
//     .then((res) => {
//         console.log("premession Grantred ;)");
//         return firebase.messaging().getToken()
//     }).then(token => {
//         console.log(token);
//     }).catch((err) => {
//         console.log(err)
//     })




// function sendMessage(event) {
//     event.preventDefault();

//     let message = document.getElementById("input").value;
//     let messageDiv = document.getElementById("messageDiv");

//     let found = false

//     firestore.collection("messages").where("senderId", "==", senderId).where("recieverId", "==", recieverId)
//         .get().then((doc) => {
//             doc.forEach(element => {
//                 found = true;
//                 firestore.collection("messages").doc(doc.docs[0].id).collection("message").add({
//                     message: message,
//                     senderId: senderId,
//                     time: (new Date()).toString()
//                 }).then(function () {
//                     console.log("send and update")
//                 })
//             })

//             setTimeout(() => {
//                 if (found == false) {
//                     firestore.collection("messages").add({
//                         senderId: senderId,
//                         recieverId: recieverId,
//                     }).then(docRef => {
//                         firestore.collection("messages").doc(docRef.id).collection("message")
//                             .add({
//                                 message: message,
//                                 senderId: senderId,
//                                 time: (new Date()).toString()
//                             }).then(messRef => {
//                                 console.log("send Sucessfull!")
//                             })
//                     })
//                 }
//             }, 4000)

//         })
// }


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



var recieverId = localStorage.getItem("adderId");
var senderId = localStorage.getItem("user");



// if (recieverId && senderId) {
//     let chatBox = document.getElementsByClassName("chatBox")[0];
//     let messageDiv = document.getElementById("messageDiv");
//     let found = false
//     console.log(recieverId, senderId)
//     firestore.collection("messages").where("senderId", "==", senderId).where("recieverId", "==", recieverId)
//         .onSnapshot((doc) => {
//             doc.docChanges().forEach(change => {
//                 found = true;
//                 localStorage.setItem("currentChat",change.doc.id);
//                 firestore.collection("messages").doc(change.doc.id).collection("message")
//                     .onSnapshot(mess => {
//                         mess.docChanges().forEach(newMessage => {
//                             chatBox.id = doc.id;
//                             if (newMessage.doc.data().senderId == cUser) {
//                                 messageDiv.innerHTML += `
//                            <div class="bg-green m-2 float-right">
//                             <p class="text-white font-weight-bold p-3">${newMessage.doc.data().message}</p>
//                            </div>
//                         `
//                             } else if (newMessage.doc.data().recieverId == recieverId) {
//                                 messageDiv.innerHTML += `
//                            <div class="m-2">
//                             <p class="font-weight-bold p-3">${newMessage.doc.data().message}</p>
//                            </div>
//                         `
//                             } else if (newMessage.doc.data().senderId == recieverId) {
//                                 messageDiv.innerHTML += `
//                            <div class="m-2">
//                             <p class="font-weight-bold p-3">${newMessage.doc.data().message}</p>
//                            </div>
//                         `
//                             } else if (newMessage.doc.data().recieverId == cUser) {
//                                 messageDiv.innerHTML += `
//                            <div class="bg-green m-2 float-right">
//                             <p class="text-white font-weight-bold p-3">${newMessage.doc.data().message}</p>
//                            </div>
//                         `
//                             }
//                         })
//                     })
//             })

//             setTimeout(() => {
//                 if (found == false) {
//                     firestore.collection("messages").add({
//                         senderId: senderId,
//                         recieverId: recieverId,
//                     }).then(docRef => {
//                         chatBox.id = docRef.id;
//                     })
//                 }
//             }, 4000)
//         })

// }











// function sendMessage(event) {
//     event.preventDefault();

//     let message = document.getElementById("input").value;
//     let recieverId = localStorage.getItem("adderId");
//     let senderId = localStorage.getItem("user");

//     let found = false

//     firestore.collection("messages").where("senderId", "==", senderId).where("recieverId", "==", recieverId)
//         .get().then((doc) => {
//             doc.forEach(element => {
//                 found = true;
//                 firestore.collection("messages").doc(doc.docs[0].id).collection("message").add({
//                     message: message,
//                     senderId: senderId,
//                     time: (new Date()).toString()
//                 }).then(function () {
//                     console.log("send and update")
//                 })
//             })

//             setTimeout(() => {
//                 if (found == false) {
//                     firestore.collection("messages").add({
//                         senderId: senderId,
//                         recieverId: recieverId,
//                     }).then(docRef => {
//                         firestore.collection("messages").doc(docRef.id).collection("message")
//                             .add({
//                                 message: message,
//                                 senderId: senderId,
//                                 time: (new Date()).toString()
//                             }).then(messRef => {
//                                 console.log("send Sucessfull!")
//                             })
//                     })
//                 }
//             }, 4000)

//             // if (doc.empty == true) {
//             //     firestore.collection("messages").add({
//             //         senderId: senderId,
//             //         recieverId: recieverId,
//             //     }).then(docRef => {
//             //         firestore.collection("messages").doc(docRef.id).collection("message")
//             //             .add({
//             //                 message: message;
//             //             }).then(messRef => {
//             //                 console.log("send Sucessfull!")
//             //             })
//             //     })
//             // }else if(doc.empty == false){
//             //     firestore.collection("messages").doc(doc.id).collection("messages").add({
//             //         message: message
//             //     })
//             // }
//         })
//     // firestore.collection("messages").add({
//     //     message: message,
//     //     senderId: senderId,
//     //     recieverId: recieverId,
//     // }).then(() => {
//     //     console.log("Message Send")
//     // })

// }







let currentChat;


if (recieverId && senderId) {
    let chatBox = document.getElementsByClassName("chatBox")[0];
    let messageDiv = document.getElementById("messageDiv");
    let roomFound = false;


    console.log("working")
    firestore.collection("messages").where("senderId", "==", senderId)
        .where("recieverId", "==", recieverId)

        .get().then(function (snapshot) {
            snapshot.forEach(function (chatRoom) {
                roomFound = true;
                console.log("chat room Found>>>", chatRoom)
                currentChat = chatRoom.id;
                chatBox.id = chatRoom.id;

                firestore.collection("messages").doc(chatRoom.id)
                    .collection("message")
                    .get().then(function (messageRoom) {

                        messageRoom.forEach(function (message) {
                            console.log("message DATA++++++++", message.data())
                            if (message.data().senderId == senderId) {

                                messageDiv.innerHTML += `
                                    <div class="bg-green m-2 float-right">
                                     <p class="text-white font-weight-bold p-3">${message.data().message}</p>
                                    </div>
                         `

                            } else if (message.data().senderId !== recieverId || message.data().senderId == senderId) {

                                messageDiv.innerHTML += `
                            <div class="m-2 border">
                             <p class="font-weight-bold p-3">${message.data().message}</p>
                            </div>
                 `

                            }

                        })

                    })


            })

        })


    setTimeout(() => {
        if (roomFound == false) {
            firestore.collection("messages").add({
                senderId: senderId,
                recieverId: recieverId,
            }).then(chatRoom => {
                chatBox.id = chatRoom.id;
                currentChat = chatRoom.id;
                console.log("Chat room Created With This ID >", chatRoom.id)
            })
        }
    }, 8000)




}





function sendMessage(event) {
    event.preventDefault();

    let messageToSend = document.getElementById("input").value;

    firestore.collection("messages").doc(currentChat)
        .collection("message").add({
            message: messageToSend,
            senderId: senderId,
            time: (new Date).toString()

        })


}



let messageDiv = document.getElementById("messageDiv");

 
setTimeout(function(){




firestore.collection("messages").doc(currentChat)
    .collection("message")
    .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
            if (change.doc.data().senderId == senderId) {

                messageDiv.innerHTML += `
                                    <div class="bg-green m-2 float-right">
                                     <p class="text-white font-weight-bold p-3">${change.doc.data().message}</p>
                                    </div>
                         `

            }

            else if(change.data().senderId !== recieverId || change.data().senderId == senderId){
                
                messageDiv.innerHTML += `
                                    <div class="border m-2">
                                     <p class="font-weight-bold p-3">${change.doc.data().message}</p>
                                    </div>
                         `

            }


        })

    })



},10000)

function signOut() {

    let btn = document.getElementById("logOUt");
    btn.innerHTML = `
        <img src="">
    `
    firebase.auth().signOut().then(function (res) {
        console.log("LOG OUT SuccessFull!!!");
        window.location = "../../index.html"
    })
}