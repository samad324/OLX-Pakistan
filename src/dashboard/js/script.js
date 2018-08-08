if (!navigator.onLine) {
    let myAds = document.getElementById("myads")
    let previosChatsDiv = document.getElementById("allChats")
    myAds.innerHTML = `
        <h2 class = "text-align-center mt-5 text-warning">NO INTERNET</h2>
    `
    previosChatsDiv.innerHTML = `
    <h2 class = "text-align-center mt-5 text-warning">NO INTERNET</h2>
    `
}





let fvtDiv = document.getElementById("fvtAds");

let ads = JSON.parse(localStorage.getItem("myAds"))

console.log(ads)



let user = localStorage.getItem("user");

for (let key in ads) {
    if (key == user) {
        ads[key].forEach(element => {

            fvtDiv.innerHTML += `
            <div class="card col-md-4 col-sm-12 adsCard" style="width: 18rem;"  >
            <img class="card-img-top" style="height:260px;" src="${element.pics[0]}" alt="Card image cap">
            <div class="card-body" id="${element.category}">
            <h5 class="card-title">${element.adTitle}</h5>
            <p class="card-text">${element.discription}</p>
            <button onclick="viewOfflineAd(event)" id=${element.adId} class="btn btn-primary w-100 mb-2 viewBtn">view ad</button>
            </div>
            </div>
            `
            document.addEventListener("fetch", function (event) {
                caches.match(event.request).then(res => {
                    return res
                })
            })

        })
    }
}


var config = {
    apiKey: "AIzaSyD5ALJ3Pvfn86ybcI6-uWUuKn8xBL7Fweo",
    authDomain: "olxpakistanpwa.firebaseapp.com",
    databaseURL: "https://olxpakistanpwa.firebaseio.com",
    projectId: "olxpakistanpwa",
    storageBucket: "olxpakistanpwa.appspot.com",
    messagingSenderId: "573103718935"
};
firebase.initializeApp(config);




const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
const auth = firebase.auth();
const messaging = firebase.messaging();










function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("sign out");
        window.location = "../login/login.html"
    }).catch(function (error) {
        // An error happened.
    });
}


function toChat() {
    window.location = "../chat/index.html"
}




let searches = ["Property For Sell", "Property For Rent", "Verhicals", "Bikes", "Electronics", "Mobiles", "Jobs", "Services", "Business", "Furniture", "Animals", "Books", "Fashion", "Kids"];


let myAds = document.getElementById("myads");
let noOfAd = 1;




firebase.auth().onAuthStateChanged(user => {

    if (user) {
        console.log(user)


        searches.forEach(Element => {
            let index = 0;
            firestore.collection(Element).where("adderId", "==", user.uid)
                .get().then(snapshot => {
                    if (snapshot.empty == false) {
                        snapshot.forEach((doc) => {
                            let data = doc.data();
                            console.log(data);
                            myAds.innerHTML += `
                            <div class="d-flex flex-row" id="${snapshot.docs[index].id}" title="${Element}">
                            <div class="border-grey w-10 d-flex justify-content-center">
                                <span class="align-self-center">${noOfAd}</span>
                            </div>
                            <div class="border-grey w-80 d-flex adTitleDiv">
                                <h5 class="align-self-center ml-2 mt-1 nameOfAd" onclick="viewThisAd(event)">${data.adTitle}</h5>
                            </div>
                            <div class="d-flex flex-row btnsAd w-10">
                                <div class="align-self-center">
                                    <button class="btn btn-danger ml-1 btnBig" data-toggle="modal" onclick="adToDelete(event)" data-target="#exampleModal">
                                        <i class="fa fa-trash-alt"></i>
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                            <div class="d-flex flex-row">
                                <button class="btn-danger btn btnSmall align-self-center" onclick="adToDelete(event)" data-toggle="modal" data-target="#exampleModal">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                            `

                            noOfAd++


                            data.adId = snapshot.docs[index].id;
                            index++;
                        })
                    }
                    index = 0;
                })

        })




    }

})




let adToDeleteCat;
let adToDeleteId;

function adToDelete(event) {
    index = 0;
    adToDeleteId = event.target.parentNode.parentNode.id;
    adToDeleteCat = event.target.parentNode.parentNode.title;
    if (!adToDeleteId) {
        adToDeleteId = event.target.parentNode.parentNode.parentNode.id;
        adToDeleteCat = event.target.parentNode.parentNode.parentNode.title;
    }
}

function deleteAd(event) {
    console.log(adToDeleteId)
    console.log(adToDeleteCat)
    document.getElementById(adToDeleteId).remove();
    firestore.collection(adToDeleteCat).doc(adToDeleteId)
        .delete();
}



function viewThisAd(event) {
    let target = event.target.parentNode.parentNode;
    localStorage.setItem("adToView", target.id);
    localStorage.setItem("cat", target.title);
    window.location = "../viewAnAd/viewAd.html"
}

let previosChatsDiv = document.getElementById("allChats");

firebase.auth().onAuthStateChanged(user => {
    if (user) {


        firestore.collection("messages").where("recieverId", "==", user.uid)
            .onSnapshot(function (querySnapshot) {
                querySnapshot.docChanges().forEach(element => {
                    firestore.collection('users').doc(element.doc.data().senderId).get()
                        .then(doc => {

                            let unReadedMessages = 0;

                            firestore.collection(element.doc.data().category)
                                .doc(element.doc.data().adId)
                                .get().then(ad => {





                                    if (!doc.data()) return
                                    previosChatsDiv.innerHTML += `
                        <div class="w-80 m-auto chatDiv d-flex flex-row mb-3 justify-content-between" id=${element.doc.id} onclick = "startChat(event)" >
                        <div class="d-flex flex-row">
                        <div class="align-self-center">
                        <img src=${doc.data().profileImg} class="profileImg align-self-center cursor-pointer" data-toggle="modal" data-target=".bd-example-modal-lg">
                        </div>
                        <div class="ml-3 d-flex flex-column align-self-center cursor-pointer">
                        <h5 data-toggle="modal" data-target=".bd-example-modal-lg">${doc.data().name}</h5>
                        <span class="cursor-pointer" data-toggle="modal" data-target=".bd-example-modal-lg">message....</span>
                        <span class="cursor-pointer" data-toggle="modal" data-target=".bd-example-modal-lg" >At: time</span>
                        <span>ad : ${ad.data().adTitle} </span>
                        </div>
                        </div>
                        <div class="d-flex justify-content-end mr-2 flex-row">
                        <span class="badge badge-primary badge-pill align-self-center" id="${element.doc.id + 2}"></span>
                        </div>
                        </div>
                         `


                                    firestore.collection("messages").doc(element.doc.id).collection("message")
                                        .onSnapshot(message => {
                                            message.docChanges().forEach(newMessage => {
                                                if ((newMessage.doc.data().recieverId == user.uid) && (newMessage.doc.data().seen) == false) {
                                                    unReadedMessages++;
                                                    idOfUnreadedMessages.push(newMessage.doc.id)
                                                    document.getElementById(element.doc.id + 2).innerHTML = unReadedMessages
                                                }
                                            })
                                        })

                                    unReadedMessages = 0;

                                })

                        })

                })
            })

        let idOfUnreadedMessages = [];

        firestore.collection("messages").where("senderId", "==", user.uid)
            .onSnapshot(function (querySnapshot) {
                querySnapshot.docChanges().forEach(element => {
                    firestore.collection('users').doc(element.doc.data().recieverId).get()
                        .then(doc => {

                            let unReadedMessages = 0;
                            
                            firestore.collection(element.doc.data().category)
                                .doc(element.doc.data().adId)
                                .get().then(ad => {


                                    previosChatsDiv.innerHTML += `
                            <div class="w-80 m-auto chatDiv d-flex flex-row mb-3 justify-content-between" id=${element.doc.id} onclick = "startChat(event)" >
                            <div class="d-flex flex-row">
                            <div class="align-self-center">
                            <img src=${doc.data().profileImg} class="profileImg align-self-center cursor-pointer" data-toggle="modal" data-target=".bd-example-modal-lg">
                            </div>
                            <div class="ml-3 d-flex flex-column align-self-center cursor-pointer">
                            <h5 data-toggle="modal" data-target=".bd-example-modal-lg">${doc.data().name}</h5>
                            <span class="cursor-pointer" data-toggle="modal" data-target=".bd-example-modal-lg">message....</span>
                            <span class="cursor-pointer" data-toggle="modal" data-target=".bd-example-modal-lg" >At: time</span>
                            <span>ad : ${ad.data().adTitle} </span>
                            </div>
                            </div>
                            <div class="d-flex justify-content-end mr-2 flex-row" >
                            <span class="badge badge-primary badge-pill align-self-center" id="${element.doc.id + 2}"></span>
                            </div>
                            </div>
                         `

                                    firestore.collection("messages").doc(element.doc.id).collection("message")
                                        .onSnapshot(message => {
                                            message.docChanges().forEach(newMessage => {
                                                if ((newMessage.doc.data().recieverId == user.uid) && (newMessage.doc.data().seen) == false) {
                                                    unReadedMessages++;
                                                    document.getElementById(element.doc.id + 2).innerHTML = unReadedMessages
                                                }
                                            })
                                        })
                                    unReadedMessages = 0;

                                })

                        })

                })
            })

    }

})














function viewOfflineAd(event) {
    console.log(event.target.id, event.target.parentNode.id)
    localStorage.setItem("cat", event.target.parentNode.id);
    localStorage.setItem("adToView", event.target.id)
    window.location = "../ad/ad.html"
}

//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




let currentUser = undefined;
let chatsDiv = document.getElementById("allChats");

console.log("firestore", firestore);
console.log("auth", auth);
console.log("messaging", messaging);


let reciever

function startChat(event) {
    let chatBox = document.getElementsByClassName("chatBox")[0];

    if (event.target.nodeName == "SPAN" || event.target.nodeName == "H5" || event.target.nodeName == "IMG") {
        let target = (event.target.parentNode.parentNode.parentNode).id;
        console.log(target);

        chatBox.id = target;

        auth.onAuthStateChanged(user => {
            firestore.collection("messages").doc(target)
                .get().then(doc => {
                    if (doc.data().senderId !== user.uid) {
                        reciever = doc.data().senderId
                        firestore.collection("users").doc(doc.data().senderId)
                            .get().then(user => {
                                let recieverPic = document.getElementById("recieverPic");
                                let otherUser = document.getElementById("otherUser");

                                recieverPic.src = user.data().profileImg;
                                otherUser.innerHTML = user.data().name
                            })
                    } else if (doc.data().recieverId !== user.uid) {
                        reciever = doc.data().recieverId
                        firestore.collection("users").doc(doc.data().recieverId)
                            .get().then(user => {
                                let recieverPic = document.getElementById("recieverPic");
                                let otherUser = document.getElementById("otherUser");

                                recieverPic.src = user.data().profileImg;
                                otherUser.innerHTML = user.data().name
                            })
                    }
                    if (chatInitialed == false) {
                        initailizeChatListner(target);
                        chatInitialed = true;
                    }

                })
        })


    }



}



var recieverId = localStorage.getItem("adderId");
var senderId = localStorage.getItem("user");











let roomFound = false;

let currentChat;







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

    if (reciever !== recieverId) {
        recieverId = reciever
    }

    let messageToSend = document.getElementById("input").value;
    let chatBox = document.getElementsByClassName("chatBox")[0]

    if (chatBox.id) {
        firestore.collection("messages").doc(chatBox.id)
            .collection("message").doc(((new Date).getTime()).toString()).set({
                message: messageToSend,
                senderId: senderId,
                recieverId: recieverId,
                seen: false,
                time: (new Date).toString()
            }).then(docRef => {
                document.getElementById('input').value = ""
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

            firestore.collection("messages").doc(docRef.id)
                .collection("message").doc(((new Date).getTime()).toString()).set({
                    message: messageToSend,
                    senderId: senderId,
                    recieverId: recieverId,
                    time: (new Date).toString()
                }).then(docRef => {
                    document.getElementById('input').value = ""

                    if (chatInitialed == false) {

                        initailizeChatListner(chatBox.id);
                        chatInitialed = true

                    }
                });


        })



    }





}



let messageDiv = document.getElementById("messageDiv");


function initailizeChatListner(chatId) {

    const chatID = chatId;
    if (chatID) {

        messageDiv.innerHTML = "";

        firestore.collection("messages").doc(chatID)
            .collection("message")
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    let messageCreated = false

                    auth.onAuthStateChanged(user => {
                        firestore.collection("messages").doc(chatID)
                            .collection("message").doc(change.doc.id)
                            .get().then(message => {
                                if ((message.data().recieverId == user.uid) && (message.data().seen == false)) {

                                    firestore.collection("messages").doc(chatID)
                                        .collection("message").doc(change.doc.id)
                                        .update({
                                            seen: true
                                        }).then(() => {

                                        })
                                }
                            })

                    })

                    createMesage(change.doc.id, change.doc.data(), chatID)







                })

            })

    }

}


function createMesage(id, change, chatID) {
    let messageFound = false;
    if (messageDiv.childNodes.length) {
        for (var i = 0; i < messageDiv.childNodes.length; i++) {
            if (id == messageDiv.childNodes[i].id) {
                messageFound = true
            }
        }
    }

    if (messageFound == false) {

        if (change.senderId == senderId) {

            messageDiv.innerHTML += `
                <div class="bg-green m-2 float-right message" id="${id}">
                 <p class="text-white font-weight-bold p-3">${change.message}</p>
                </div>
     `

        }

        else {

            messageDiv.innerHTML += `
                <div class="border m-2 message" id="${id}">
                 <p class="font-weight-bold text-black p-3">${change.message}</p>
                </div>
     `

        }



    }
    document.getElementById(chatID + 2).innerHTML = ""
    var objDiv = document.getElementById("messageDiv");
    objDiv.scrollTop = objDiv.scrollHeight;
}



messaging.onMessage(function (payload) {
    console.log('onMessage', payload);
});