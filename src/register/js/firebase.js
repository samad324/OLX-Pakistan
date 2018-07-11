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


function registerUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cPassword = document.getElementById("cPassword").value;
    let name = document.getElementById("name").value;
    let img = document.getElementById("imgs").files[0];

    let data = {
        email: email,
        name: name
    }

    console.log(data);

    if (password !== cPassword) {
        let passInp = document.getElementById("cPassword");
        passInp.style.border = "1px solid #ff0000";
        return false
    }

    let btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.innerHTML = `
        <img src="images/loading.gif" style="width: 14px">
    `


    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (res) {
        console.log(res);
        localStorage.setItem("user", res.user.uid)
        btnSubmit.innerHTML = "Register";
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            firestore.collection("users").doc(res.user.uid).set(data)
                .then(function (docRef) {
                    window.location = "../../index.html"
                })
        })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message)
            });

    }).catch(function (error) {
        // An error happened.
    });



}


function toLogin() {
    window.location = "../login/login.html"
}



function uploadPic(img) {

    let promises = [];
        let file = element.files[0]
        if (file) {
            promises.push(new Promise(function (resolve, reject) {
                let fileName = file.name;
                var storageRef = firebase.storage().ref();
                let fileRef = "/ProPics/" + Math.random() + ".jpg";
                let imgRef = storageRef.child(fileRef)
                imgRef.put(file).then(function (snapshot) {
                    imgRef.getDownloadURL().then(function (url) {
                        console.log("url+++", url)
                        resolve(url);
                    })
                })
            })
        })

        if(img){
            
        }

    return promises

}