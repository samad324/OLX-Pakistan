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



function LoginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let passsord = document.getElementById("password").value;

    let btn = document.getElementById("btn");
    btn.innerHTML = `
        <img src = "images/loading.gif" class="loadingImg">
    `
    firebase.auth().signInWithEmailAndPassword(email, passsord)
        .then(function (res) {
            localStorage.setItem("user", res.user.uid);
            console.log(res);
            firestore.collection("users").doc(res.user.uid)
                .get().then(user => {
                    localStorage.setItem("userData", JSON.stringify(user.data()));
                    let myAds = {}
                    myAds[res.user.uid] = [];
                    localStorage.setItem("myAds", JSON.stringify(myAds))


                    firestore.collection("users").doc(res.user.uid)
                        .collection("ads").get()
                        .then(doc => {
                            doc.forEach(elem => {

                                let demo = document.getElementById("demo");
                                
                                demo.src = elem.data().pics[0]

                                let myAds = JSON.parse(localStorage.getItem("myAds"))
                                myAds[res.user.uid].push(elem.data())
                                localStorage.setItem("myAds", JSON.stringify(myAds))

                            })
                        }).then(() => {
                            btn.innerHTML = "login"
                            window.location = "../../index.html";
                        })




                })
        }).catch(function (err) {
            alert(err.message)
            btn.innerHTML = "login"
        })
}


function toreg() {
    window.location = "../register/register.html";
}




function prom() {
    return new Promise(function (resolve, reject) {

    })
}