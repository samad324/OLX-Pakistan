console.log(firebase.auth())
function logout() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("sign out");
        window.location = "../login/login.html"
    }).catch(function (error) {
        // An error happened.
    });
}


function toChat(){
    window.location = "../chat/index.html"
}


