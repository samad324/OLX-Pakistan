
function toLogin() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location = "src/dashboard/dashboard.html";
        }else{
            window.location = 'src/login/login.html';
        }
    })
}

function toSubmitAnAd() {
    window.location = "src/submitAnAd/submitAnAd.html"
}