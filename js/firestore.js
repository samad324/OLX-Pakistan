


var firestore = firebase.firestore();

console.log(firebase.auth())

function viewit(event) {
  let cat = event.target.nextSibling.nextSibling.innerHTML;
  console.log(cat);
  localStorage.setItem("cat", cat);
  window.location = "src/viewAdsByCats/viewAds.html"
}


let cUser;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    cUser = user;
  } else {
    // User is signed out.
    // ...
  }
});


function toLogin() {

  debugger
  if (localStorage.getItem('user')) {
    window.location = "src/dashboard/dashboard.html";
  } else {
    window.location = 'src/login/login.html';
  }
}