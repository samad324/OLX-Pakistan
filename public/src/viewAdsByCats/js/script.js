const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

console.log(firestore)


let cat = localStorage.getItem("cat");

let resultDiv = document.getElementById("results");

resultDiv.innerHTML = "";

firestore.collection(cat).get()
    .then(function (doc) {
        let indexNo = 0;
        doc.forEach(element => {
            console.log(doc.docs)
            console.log(element.data());
            let data = element.data()
            resultDiv.innerHTML += `
            <div class="container result mt-2 d-flex flex-row" id="${doc.docs[indexNo].id}" onclick="viewAd(event)">
            <div class="adImg d-flex">
                <img src="${data.pics[0]}" class="w-80 align-self-center m-auto">
            </div>
            <div class="ml-4 justify-content-md-start justify-content-sm-center w-100">
                <h5 id="title" class="mb-0">${data.adTitle}</h5>
                <p class="text-muted mb-0">${data.category}</p>
                <p class="text-muted">${data.providence}</p>
                <h5 class= "float-left price" >Rs.${data.price}</h5>
            </div>
            </div>
            ` 
            indexNo++;
        });
    })

    function toSubmit(){
        window.location = "../submitAnAd/submitAnAd.html"
    }



    function viewAd(event){
        let target = event.target.parentNode.parentNode;
        localStorage.setItem("adToView",target.id);
        window.location = "../viewAnAd/viewAd.html"
    }