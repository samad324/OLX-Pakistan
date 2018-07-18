
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
    window.location = "src/dashboard/dashboard.html"
}