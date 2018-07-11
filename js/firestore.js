
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);



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


// function seaarchInp() {
//   let inp = document.getElementById("seaarchInp").value;

//   let categories = ["Mobile", "Property For Sale", "Property For Rent", "Mobiles", "Bussiness industrial & Agriculture", "Electronics", "Animals", "Verhicals", "Bikes", "Books, Sports & Hobbies", "Beauty & Fashion", "Furniture & Home Decor", "Jobs", "Kids"];
//   let queries = ["category", "adTitle"];

//   let proms = [];

//   for (let i of categories) {
//     console.log(i)
//   }

// }




// let categories = ["Mobiles", "Property For Sale", "Property For Rent", "Mobiles", "Bussiness industrial & Agriculture", "Electronics", "Animals", "Verhicals", "Bikes", "Books, Sports & Hobbies", "Beauty & Fashion", "Furniture & Home Decor", "Jobs", "Kids"];
// // let queries = ["category", "adTitle"];
// let prom = categories.map(i => {
//   console.log(i)
//   return new Promise((resolve, reject) => {
//     firestore.collection(i).where("category", "==", i)
//       .get()
//       .then(doc => {
//         doc.forEach(elem => {
//           debugger

//           resolve(elem.data())

//         })
//       })
//   })
// })



// Promise.all(prom).then(function (res) {
//   console.log(res)
//   // res.forEach(elem => {
//   //   debugger
//   //   if (elem.empty == false) {
//   //     console.log(elem.data())
//   //   }
//   // })
// })

// categories.forEach(doc => {

//   firestore.collection(doc).get()
//     .then(function (snapshot) {
//       debugger
//       snapshot.forEach( elem =>  {
//         console.log(doc,"====>>", elem.data());
//       })
//     })


// })



// firestore.collection("Mobiles").where("category", "==", "Mobiles")
//   .get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   });




// firestore.collection("Mobiles")
//   .get()
//   .then(function (querySnapshot) {
//     console.log(querySnapshot)
//     querySnapshot.forEach(function (doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//     });
//   })
//   .catch(function (error) {
//     console.log("Error getting documents: ", error);
//   });