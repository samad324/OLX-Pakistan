const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);


console.log(firestore);



let cat = localStorage.getItem("cat");

let adToView = localStorage.getItem("adToView");


console.log(cat, adToView);

let data;

firestore.collection(cat).doc(adToView).get()
    .then(function (snapshot) {
        console.log(snapshot.data());
        data = snapshot.data();
    })


let currentSlide = 0;
let silder = document.getElementById("silder");

function next() {
    if (currentSlide == (data.pics.lenght - 1)) {

    } else {
        silder.backgroundImage = `url(${data.pics[currentSlide]})`;
        currentSlide++;
    }
}

function back() {
    if(currentSlide == 0){

    }else{
        silder.backgroundImage = `url(${data.pics[currentSlide]})`
        currentSlide--
    }

}





function chat(){
    window.location = "../chat/index.html";
}
