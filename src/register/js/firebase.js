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
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);


function registerUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cPassword = document.getElementById("cPassword").value;

    let data = {
        email,
        password
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
        btnSubmit.innerHTML = "Register";
        firestore.collection("users").add(
            data
        ) 
    })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message)
        });
}
