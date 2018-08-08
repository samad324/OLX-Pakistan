
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
    const messaging = firebase.messaging();
    messaging.requestPermission().then(function () {
      console.log('Notification permission granted.');
      return messaging.getToken();
    }).then(function (token) {
      // Displaying user token
      console.log('token >>>> ', token);
      firestore.collection("users").doc(user.uid)
        .update({
          token : token,
          lastToken : (new Date()).toString()
        })
    }).catch(function (err) { // Happen if user deney permission
      console.log('Unable to get permission to notify.', err);
    });
  }
})


function toLogin() {

  
  firebase.auth().onAuthStateChanged(user => {

    if (user) {
      window.location = "src/dashboard/dashboard.html";
    } else {
      window.location = 'src/login/login.html';
    }

  })

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
//           

//           resolve(elem.data())

//         })
//       })
//   })
// })



// Promise.all(prom).then(function (res) {
//   console.log(res)
//   // res.forEach(elem => {
//   //  
//   //   if (elem.empty == false) {
//   //     console.log(elem.data())
//   //   }
//   // })
// })

// categories.forEach(doc => {

//   firestore.collection(doc).get()
//     .then(function (snapshot) {
//       
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

if ('serviceWorker' in navigator) {

  console.log('Service Worker is supported');

  // if service worker supported then register my service worker
  navigator.serviceWorker.register('firebase-messaging-sw.js').then(function (reg) {
    console.log('Successfully Register :^)', reg);

    reg.pushManager.subscribe({
      userVisibleOnly: true
    }).then(function (subscription) {
      console.log('subscription:', subscription.toJSON());
      // GCM were used this endpoint
      console.log('endpoint:', subscription.endpoint);
    });

  }).catch(function (error) {
    console.log('SW Registration Failed: :^(', error);
  });

}




function search() {
  let toSearch = (document.getElementById("searchInp").value).toLowerCase();
  let list = document.getElementById("list");
  list.innerHTML = "";

  for (var i = 0; i < promises.length; i++) {

      // for (var j = 0; j < promises[i].Catagory.length; j++) {
      //     let category = (promises[i].Catagory).toLowerCase();

      //     if (toSearch[0] == category[j]) {
      //         for (var l = 1; l <= toSearch.length; l++) {
      //             if (toSearch == category.slice(j, l)) {
      //                 list.innerHTML += `<option value="${category}" id="${promises[i].adId}">${category}</option>`
      //                 break;
      //             }
      //         }
      //     }
      // }

      for (var k = 0; k < promises[i].adTitle.length; k++) {
          let title = (promises[i].adTitle).toLowerCase();
          if (toSearch[0] == title[k]) {
              for (var m = 1; m <= title.length; m++) {
                  if (toSearch == title.slice(k, m)) {
                      list.innerHTML += `<option value="${title}" title="${promises[i].category}" id="${promises[i].adId}">${title}</option>`
                      break;
                  }
              }
          }

      }



  }





}



function viewAdBySearch(event){
  event.preventDefault();

  let search = document.getElementById("searchInp").value;

  let datalist = document.getElementById("list");
  
  let addToView;
  let catsToView ;

  for(let i = 0; i < datalist.childNodes.length; i++){
      if(search == datalist.childNodes[i].value){
          addToView = datalist.childNodes[i].id;
          catsToView = datalist.childNodes[i].title;
          break;
      }
  }

  localStorage.setItem("adToView",addToView);
  localStorage.setItem("cat",catsToView);
  console.log(addToView, catsToView)
  window.location.href = "src/ad/ad.html"
}

let searches = ["Property For Sell", "Property For Rent", "Cars", "Bikes", "Electronics", "Mobiles", "Jobs", "Services", "Business", "Furniture", "Animals", "Books", "Fashion", "Kids"];


let promises = [];
searches.forEach(Element => {
  let index = 0;
  firestore.collection(Element)
      .get().then(snapshot => {
          if (snapshot.empty == false) {
              snapshot.forEach((doc) => {
                  let data = doc.data();
                  data.adId = snapshot.docs[index].id;
                  index++;
                  promises.push(data)
                  console.log(data)
              })
          }
      })
  index = 0;
})

