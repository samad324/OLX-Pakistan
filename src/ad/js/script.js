if (!navigator.onLine) {
    let myAds = JSON.parse(localStorage.getItem("myAds"));
    let user = localStorage.getItem("user");
    let adToView = localStorage.getItem("adToView")
    let userData = JSON.parse(localStorage.getItem("userData"))


    document.getElementById("btnSave").style.display = "none"
    document.getElementById("chatWithThisUser").style.display = "none"

    for (let key in myAds) {
        if (key == user) {
            myAds[key].map(ad => {
                if (ad.adId == adToView) {

                    let data = ad
                    let index = data.time.indexOf("G");
                    data.time = data.time.slice(0, index)

                    let silder = document.getElementById("slideImg");
                    silder.style.backgroundImage = `url(${data.pics[0]})`


                    let adTitle = document.getElementById("adTitle");
                    adTitle.innerHTML = data.adTitle;

                    let location = document.getElementById("location");
                    location.innerHTML += `
        <img src="../../images/room.png" style="width:16px">
        <span>${data.providence},${data.city}</span>
        <span style="border:1px solid #414141" class="ml-2 mr-2"></span>
        <span>${data.time} </span>
        `

                    let price = document.getElementById("price");
                    price.innerHTML = `Rs.${data.price}`

                    recieverId = data.adderId

                    let userImg = document.getElementById("userImg");
                    let userName = document.getElementById("userName");
                    let phoneNum = document.getElementById("phone")


                    userImg.src = userData.profileImg;
                    userName.innerHTML = userData.name;
                    phoneNum.innerHTML = userData.number;



                    let discription = document.getElementById("dis");
                    discription.innerHTML = data.discription


                }
            })
        }
    }








    document.addEventListener("fetch", function (event) {
        caches.match(event.request).then(res => {
            return res;
        })
    })





}



const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
const auth = firebase.auth();


auth.onAuthStateChanged(user => {
    if (!user) {
        document.getElementById("btnSave").style.display = "none"
        document.getElementById("chatWithThisUser").style.display = "none"
    } else {
        document.getElementById("loginBtn").style.display = "none";
    }

})









let cat = localStorage.getItem("cat");

let adToView = localStorage.getItem("adToView");




let data;

firestore.collection(cat).doc(adToView).get()
    .then(function (snapshot) {
        console.log(snapshot.data());
        data = snapshot.data();
        let index = data.time.indexOf("G");
        data.time = data.time.slice(0, index)

        let silder = document.getElementById("slideImg");
        silder.style.backgroundImage = `url(${data.pics[0]})`


        let adTitle = document.getElementById("adTitle");
        adTitle.innerHTML = data.adTitle;

        let location = document.getElementById("location");
        location.innerHTML += `
        <img src="../../images/room.png" style="width:16px">
        <span>${data.providence},${data.city}</span>
        <span style="border:1px solid #414141" class="ml-2 mr-2"></span>
        <span>${data.time} </span>
        `

        let price = document.getElementById("price");
        price.innerHTML = `Rs.${data.price}`

        recieverId = data.adderId

        let userImg = document.getElementById("userImg");
        let userName = document.getElementById("userName");
        let phoneNum = document.getElementById("phone")

        firestore.collection("users").doc(data.adderId)
            .get().then(doc => {
                userImg.src = doc.data().profileImg;
                userName.innerHTML = doc.data().name;
                phoneNum.innerHTML = doc.data().number;
                let recieverPic = document.getElementById("recieverPic");
                let otherUser = document.getElementById("recieverName");

                recieverPic.src = doc.data().profileImg;
                otherUser.innerHTML = doc.data().name
            })


        let discription = document.getElementById("dis");
        discription.innerHTML = data.discription
    })


let currentSlide = 0;
let silder = document.getElementById("slideImg");


function next() {
    if (currentSlide == (data.pics.length)) {

    } else {
        silder.style.backgroundImage = `url(${data.pics[currentSlide + 1]})`;
        currentSlide++;
    }
}

function back() {

    if (currentSlide <= 0) {

    } else {
        silder.style.backgroundImage = `url(${data.pics[currentSlide - 1]})`
        currentSlide--
    }

}




// function saveIt() {
//     let myAds = JSON.parse(localStorage.getItem("myAds"));
//     if (!myAds) {
//         console.log("MyAds Created")
//         localStorage.setItem("myAds", "[]")
//     }
//     let cat = localStorage.getItem("cat");
//     let ad = localStorage.getItem("adToView");

//     firestore.collection(cat).doc(ad)
//         .get().then(res => {
//             debugger
//             let data = JSON.parse(localStorage.getItem("myAds"))
//                 let dataToAd = res.data();
//                 dataToAd.adId = ad;
//             if (data.length != 0) {
//                 data.map(item => {
//                     if (item.adTitle == res.data().adTitle) {
//                         alert("already Added!!!")
//                     } else {
//                         data.push(dataToAd)
//                         localStorage.setItem("myAds", JSON.stringify(data))
//                         alert("added")
//                     }
//                 })
//             } else {
//                 data.push(dataToAd)
//                 localStorage.setItem("myAds", JSON.stringify(data));
//                 alert("added")
//             }

//         })

// }


function saveIt() {
    let myAds = JSON.parse(localStorage.getItem("myAds"));
    if (!myAds) {
        console.log("MyAds Created")
        localStorage.setItem("myAds", "{}")
    }
    let cat = localStorage.getItem("cat");
    let ad = localStorage.getItem("adToView");

    firestore.collection(cat).doc(ad)
        .get().then(res => {



            let data = JSON.parse(localStorage.getItem("myAds"))
            let dataToAd = res.data();
            dataToAd.adId = ad;

            let userFound = false;
            let user = localStorage.getItem("user")
            for (let key in data) {
                if (key == user) {
                    userFound = true
                    let adFound = false
                    data[user].map(ads => {
                        if (ads.adId == ad) {
                            alert("Already Added")
                            adFound = true
                        }
                    })

                    if (adFound == false) {
                        let newData = data[key];
                        newData.push(dataToAd);
                        data[user] = newData;
                        localStorage.setItem("myAds", JSON.stringify(data))
                        alert("added")
                    }
                }
            }

            if (userFound == false) {
                data[user] = [dataToAd];
                localStorage.setItem("myAds", JSON.stringify(data))
                alert("added")
            }




            firestore.collection("users").doc(user)
                .collection("ads").where("adId", "==", ad)
                .get().then(doc => {
                    if (doc.empty) {
                        firestore.collection("users").doc(user)
                            .collection("ads").add(dataToAd)
                    }
                })



            // if (data.length != 0) {
            //     data.map(item => {
            //         if (item.adTitle == res.data().adTitle) {
            //             alert("already Added!!!")
            //         } else {
            //             data.push(dataToAd)
            //             localStorage.setItem("myAds", JSON.stringify(data))
            //             alert("added")
            //         }
            //     })
            // } else {
            //     data.push(dataToAd)
            //     localStorage.setItem("myAds", JSON.stringify(data));
            //     alert("added")
            // }

        })

}









// ======================================================================



let currentUser = undefined;
let chatsDiv = document.getElementById("allChats");



let reciever



var recieverId
var senderId = localStorage.getItem("user");











let roomFound = false;

let currentChat;

function chat() {

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

                    auth.onAuthStateChanged(user => {
                        firestore.collection("messages").doc(chatRoom.id)
                            .get().then(doc => {
                                if (doc.data().senderId !== user.uid) {
                                    reciever = doc.data().senderId
                                } else if (doc.data().recieverId !== user.uid) {
                                    reciever = doc.data().recieverId
                                }
                                if (chatInitialed == false) {
                                    initailizeChatListner(chatRoom.id);
                                    chatInitialed = true;
                                }

                            })
                    })

                    if (chatInitialed == false) {
                        initailizeChatListner(currentChat)
                        chatInitialed = true
                    }


                })

            })







    }


}



let chatInitialed = false;

function sendMessage(event) {
    event.preventDefault();

    if (reciever && (reciever !== recieverId)) {
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
            recieverId: recieverId,
            adId: localStorage.getItem("adToView"),
            category: localStorage.getItem("cat")
        }).then(docRef => {
            chatBox.id = docRef.id;

            firestore.collection("messages").doc(docRef.id)
                .collection("message").doc(((new Date).getTime()).toString()).set({
                    message: messageToSend,
                    senderId: senderId,
                    seen: false,
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
    var objDiv = document.getElementById("messageDiv");
    objDiv.scrollTop = objDiv.scrollHeight;
}



firebase.messaging().onMessage(function (payload) {
    console.log('onMessage', payload);
});