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


function LoginUser(event){
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    let passsord = document.getElementById("password").value;

    let btn = document.getElementById("btn");
    btn.innerHTML = `
        <img src = "images/loading.gif" style=width : 14px>
    `
    firebase.auth().signInWithEmailAndPassword(email,passsord)
        .then(function(res){
            btn.innerHTML = "login"
            console.log(res)
        }).catch(function(err){
            console.log(err.message)
        })
}
