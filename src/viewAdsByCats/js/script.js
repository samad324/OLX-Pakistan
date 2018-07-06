const firestore = firebase.firestore();

console.log(firestore)


let cat = localStorage.getItem("cat");

firestore.collection(cat).get()
    .then(function(doc){
        doc.forEach(element => {
            console.log(element.data());
        });
    })