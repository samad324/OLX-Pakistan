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


let cUser = localStorage.getItem("user");
let chats = new Set();

let previosChatsDiv = document.getElementById("allChats");

firestore.collection("messages").where("recieverId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(element => {
            chats.add(element.doc.id);
            firestore.collection('users').doc(element.doc.data().senderId).get()
                .then(doc => {
                    debugger
                    if(!doc.data()) return 
                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row" id=${element.doc.id} onclick = "startChat(event)" >
                        <div class="align-self-center">
                        <img src=${doc.data().profileImg} class="profileImg align-self-center cursor-pointer">
                        </div>
                        <div class="ml-3 d-flex flex-column align-self-center cursor-pointer">
                        <h5>${doc.data().name}</h5>
                        <span class="cursor-pointer">message....</span>
                        <span class="cursor-pointer">At: time</span>
                        </div>
                        </div>

                         `

                })

        })
    })


// setTimeout(() => {
//     console.log(chats);
//     chats.forEach(elem => {

//     })

// },4000)



function startChat(event) {
    let chatBox = document.getElementsByClassName("chatBox")[0];

    if (event.target.nodeName == "SPAN" || event.target.nodeName == "H5" || event.target.nodeName == "IMG") {
        let target = (event.target.parentNode.parentNode).id;
        console.log(target);
        
        chatBox.id = target;
        firestore.collection("messages").doc(target)
            .get().then(doc => {
                if(doc.data().senderId !== localStorage.getItem("user")){
                    localStorage.setItem("adderId" , doc.data().senderId)
                }else if(doc.data().recieverId !== localStorage.getItem("user")){
                    localStorage.setItem("adderId" , doc.data().recieverId)
                }
                initailizeChatListner(target);
            })
        
    }



}




firestore.collection("messages").where("senderId", "==", cUser)
    .onSnapshot(function (querySnapshot) {
        querySnapshot.docChanges().forEach(element => {
            chats.add(element.doc.id);
            firestore.collection('users').doc(element.doc.data().recieverId).get()
                .then(doc => {

                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row" id=${element.doc.id}>
                        <div class="align-self-center">
                        <img src=${doc.data().profileImg} class="profileImg align-self-center cursor-pointer">
                        </div>
                        <div class="ml-3 d-flex flex-column align-self-center">
                        <h5 class="cursor-pointer">${doc.data().name}</h5>
                        <span class="cursor-pointer">message....</span>
                        <span class="cursor-pointer">At: time</span>
                        </div>
                        </div>
                         `

                })

        })
    })


// firestore.collection("messages").where("senderId", "==", cUser)
//     .onSnapshot(function (querySnapshot) {
//         querySnapshot.docChanges().forEach(element => {
//             chats.add(element.doc.id)
//         })
//     })

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





let roomFound = false;

let currentChat;


if (recieverId && senderId) {
    let chatBox = document.getElementsByClassName("chatBox")[0];
    let messageDiv = document.getElementById("messageDiv");



    console.log("working")
    firestore.collection("messages").where("senderId", "==", senderId)
        .where("recieverId", "==", recieverId)

        .get().then(function (snapshot) {
            snapshot.forEach(function (chatRoom) {
                roomFound = true;
                console.log("chat room Found>>>", chatRoom)
                currentChat = chatRoom.id;
                chatBox.id = chatRoom.id;

                initailizeChatListner(currentChat)

                // firestore.collection("messages").doc(chatRoom.id)
                //     .collection("message")
                //     .get().then(function (messageRoom) {

                //         messageRoom.forEach(function (message) {
                //             console.log("message DATA++++++++", message.data())
                //             if (message.data().senderId == senderId) {

                //                 messageDiv.innerHTML += `
                //                     <div class="bg-green m-2 float-right">
                //                      <p class="text-white font-weight-bold p-3">${message.data().message}</p>
                //                     </div>
                //          `

                //             } else{

                //                 messageDiv.innerHTML += `
                //             <div class="m-2 border">
                //              <p class="font-weight-bold p-3">${message.data().message}</p>
                //             </div>
                //  `

                //             }

                //         })

                //     })


            })

        })







}






function createRoom() {
    return new Promise((resolve, reject) => {
        firestore.collection("messages").add({
            senderId: senderId,
            recieverId: recieverId,
        }).then(chatRoom => {
            chatBox.id = chatRoom.id;
            currentChat = chatRoom.id;
            console.log("Chat room Created With This ID >", chatRoom.id);
            initailizeChatListner(chatRoom.id)
            resolve(chatRoom.id);

        })

    })

}
let chatInitialed = false;

function sendMessage(event) {
    event.preventDefault();

    let messageToSend = document.getElementById("input").value;
    let chatBox = document.getElementsByClassName("chatBox")[0]
    debugger
    if (chatBox.id) {
        firestore.collection("messages").doc(chatBox.id)
            .collection("message").doc( ((new Date).getTime()).toString() ).set({
                message: messageToSend,
                senderId: senderId,
                recieverId : recieverId,
                time: (new Date).toString()
            }).then(docRef => {
                if (chatInitialed == false) {

                    initailizeChatListner(chatBox.id);
                    chatInitialed = true

                }
            })

    } else {

        firestore.collection("messages").add({
            senderId: senderId,
            recieverId: recieverId
        }).then(docRef => {
            chatBox.id = docRef.id;
            sendMessage();


        })


        // firestore.collection("messages").doc(currentChat)
        //     .collection("message").add({
        //         message: messageToSend,
        //         senderId: senderId,
        //         time: (new Date).toString()

        //     }).then(() => {
        //         initailizeChatListner(currentChat);
        //         chatBox.id = 
        //     })

    }





}


// function sendMessage(event) {
//     event.preventDefault();

//     let messageToSend = document.getElementById("input").value;
//     let chatBox = document.getElementsByClassName("chatBox")[0]
//     debugger
//     if (chatBox.id) {
//         createRoom().then((chatRoomId) => {

//             initailizeChatListner(chatRoomId)

//             firestore.collection("messages").doc(chatRoomId)
//                 .collection("message").add({
//                     message: messageToSend,
//                     senderId: senderId,
//                     time: (new Date).toString()

//                 })
//         })


//     } else {

//         firestore.collection("messages").doc(currentChat)
//             .collection("message").add({
//                 message: messageToSend,
//                 senderId: senderId,
//                 time: (new Date).toString()

//             }).then(() => {
//                 initailizeChatListner(currentChat)
//             })

//     }





// }


let messageDiv = document.getElementById("messageDiv");


function initailizeChatListner(chatId) {

    const chatID = chatId;
    debugger
    if (chatID) {

        messageDiv.innerHTML = "";

        firestore.collection("messages").doc(chatID)
            .collection("message")
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.doc.data().senderId == senderId) {

                        messageDiv.innerHTML += `
                                    <div class="bg-green m-2 float-right message">
                                     <p class="text-white font-weight-bold p-3">${change.doc.data().message}</p>
                                    </div>
                         `

                    }

                    else {

                        messageDiv.innerHTML += `
                                    <div class="border m-2 message">
                                     <p class="font-weight-bold text-black p-3">${change.doc.data().message}</p>
                                    </div>
                         `

                    }


                })

            })

    }

}



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





messaging.onMessage(function (payload) {
    console.log('onMessage', payload);
});