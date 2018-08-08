


let cat = localStorage.getItem("cat");

let resultDiv = document.getElementById("results");


function load(){
    
    resultDiv.innerHTML = `
        <div class=" constainer d-flex justify-contant-center">
            <img src="../../images/load.gif" class="d-inline-block m-auto" style="width:200px">
        </div>
    `

}

setTimeout(function(){
    if(!navigator.onLine){
        resultDiv.innerHTML = ""
        resultDiv.innerHTML = `
            <h5 class="text-warning text-align-center mt-5">No Internet</h5>
        `
    }
},5000)

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

console.log(firestore)

firestore.collection(cat).get()
    .then(function (doc) {
        let indexNo = 0;
      resultDiv.innerHTML = ""
        doc.forEach(element => {
            console.log(doc.docs)
            console.log(element.data());
            localStorage.setItem("adderId", element.data().adderId)
            let data = element.data()
            resultDiv.innerHTML += `
            <div class="container result mt-2 d-flex flex-row" id="${doc.docs[indexNo].id}" onclick="viewAd(event)">
            <div class="adImg d-flex flex-row justify-contant-center">
                <img src="${data.pics[0]}" class="d-inline-block w-80 m-auto dImg">
            </div>
            <div class="ml-4 justify-content-md-start justify-content-sm-center w-100">
                <h5 id="title" class="mb-0">${data.adTitle}</h5>
                <p class="text-muted mb-0">${data.category}</p>
                <p class="text-muted mb-0">${data.providence}</p>
                <h5 class= "float-left price" >Rs.${data.price}</h5>
            </div>
            </div>
            `
            indexNo++;
        });
    })




function viewAd(event) {
    let target = event.target.parentNode.parentNode;
     localStorage.setItem("adToView", target.id);
    window.location = "../ad/ad.html"
}



firebase.auth().onAuthStateChanged(function (user) {
    let btn = document.getElementById("loginBtn");

    if (user) {
        btn.style.display = "none"
    }
})

function toLogin() {
    window.location = "../login/login.html"
}
function toSubmit() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "../submitAnAd/submitAnAd.html"
        } else {
            window.location.href = "../login/login.html"
        }
    })

}
function toDashboard() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "../dashboard/dashboard.html"
        } else {
            window.location.href = "../login/login.html"
        }
    })
}
function toReg() {
    window.location = "../register/register.html"
}
function toHome() {
    window.location = "../../index.html"
}