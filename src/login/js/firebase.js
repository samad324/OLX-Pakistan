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
        <img src = "images/loading.gif" class="loadingImg">
    `
    firebase.auth().signInWithEmailAndPassword(email,passsord)
        .then(function(res){
            console.log(res);
            localStorage.setItem("user",res.user.uid)
            btn.innerHTML = "login"
            window.location = "../../index.html";
        }).catch(function(err){
            console.log(err.message)
            btn.innerHTML = "login"
        })
}


function toreg(){
    window.location= "../register/register.html";
}
