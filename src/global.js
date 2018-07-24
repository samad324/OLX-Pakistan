function toLogin() {
    window.location = "../login/login.html"
}
function toSubmit() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "../submitAnAd/submitAnAd.html"
        } else {
            window.location.href = "../login.html"
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