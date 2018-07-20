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
        let index = data.time.indexOf("G");
        console.log(index)
        data.time = data.time.slice(0,index)

        let silder = document.getElementById("slideImg");
        silder.style.backgroundImage = `url(${data.pics[0]})`

        
        let adTitle = document.getElementById("adTitle");
        adTitle.innerHTML = data.adTitle;

        let location = document.getElementById("location");
        location.innerHTML += `
        <img src="../../images/room.png" style="width:16px">
        <span>${data.providence},${data.city}</span>
        <span style="border:1px solid #414141" class="ml-2 mr-2"></span>
        <span>${data.time} </span>
        `

    })


let currentSlide = 0;
let silder = document.getElementById("slideImg");


function next() {
    if (currentSlide == (data.pics.length)) {

    } else {
        silder.style.backgroundImage = `url(${data.pics[currentSlide+1]})`;
        currentSlide++;
    }
}

function back() {
    debugger
    if(currentSlide <= 0){

    }else{
        silder.style.backgroundImage = `url(${data.pics[currentSlide-1]})`
        currentSlide--
    }

}





function chat(){
    window.location = "../chat/index.html";
}