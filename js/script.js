
function toSubmitAnAd() {
    firebase.auth().onAuthStateChanged(function (user){
        if(user){
            window.location.href = "src/submitAnAd/submitAnAd.html"
        }else{
            window.location.href = "src/login/login.html"
        }
    })
    
}
function toMyAccount(){
    firebase.auth().onAuthStateChanged(function (user){
        if(user){
            window.location.href = "src/dashboard/dashboard.html"
        }else{
            window.location.href = "src/login/login.html"
        }
    })
}