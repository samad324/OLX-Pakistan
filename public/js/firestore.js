var config = {
    apiKey: "AIzaSyB-D2oL6e261Ejfa9nlzKNodgIXkrkTVPc",
    authDomain: "whatsapp324889.firebaseapp.com",
    databaseURL: "https://whatsapp324889.firebaseio.com",
    projectId: "whatsapp324889",
    storageBucket: "whatsapp324889.appspot.com",
    messagingSenderId: "441553373571"
  };
  firebase.initializeApp(config);


  var firestore = firebase.firestore();



  function viewit(event){
    let cat = event.target.nextSibling.nextSibling.innerHTML;
    console.log(cat);
    localStorage.setItem("cat",cat);
    window.location = "src/viewAdsByCats/viewAds.html"
  }