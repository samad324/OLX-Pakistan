const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


console.log(firestore);



let cat = localStorage.getItem("cat");

let adToView = localStorage.getItem("adToView");


console.log(cat, adToView);



firestore.collection(cat).doc(adToView).get()
    .then(function (snapshot) {
        console.log(snapshot.data())
    })