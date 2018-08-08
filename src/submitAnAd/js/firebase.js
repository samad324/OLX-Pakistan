
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

const storage = firebase.storage();
const auth = firebase.auth();
console.log("storage", storage);
console.log("auth", auth);
console.log("firestore", firestore);

let currenntUser;

auth.onAuthStateChanged(user => {
    if(user) currenntUser = user.uid
})




// var user = firebase.auth().currentUser;

// if (user) {
//   // User is signed in.
// } else {
//   // No user is signed in.
// }


function uploadPic(array) {

    let promises = [];
    array.forEach(element => {
        let file = element.files[0]
        if (file) {
            promises.push(new Promise(function (resolve, reject) {
                let fileName = file.name;
                var storageRef = firebase.storage().ref();
                let fileRef = "/images/" + Math.random() + ".jpg";
                let imgRef = storageRef.child(fileRef)
                imgRef.put(file).then(function (snapshot) {
                    imgRef.getDownloadURL().then(function (url) {
                        console.log("url+++", url)
                        resolve(url);
                    })
                });
            })
            )
        }

    })

    return promises

}

function submitAnAdd(event) {
    event.preventDefault();

    let adTitle = document.getElementById("adtitle").value;
    let category = document.getElementById("category").value;
    let discription = document.getElementById("discription").value;
    let providence = document.getElementById("providence").value;
    let price = document.getElementById("price").value;
    let pics = document.getElementsByName("pics");
    let submitBtn = document.getElementById("submitBtn");
    let city = document.getElementById("city").value;

    submitBtn.innerHTML = `
        <img src="../../images/loading.gif" style= "width:16px">
    `

    let promises = uploadPic(pics);
    Promise.all(promises).then(function (picsUrl) {
        let data = {
            adTitle: adTitle,
            category: category,
            discription: discription,
            providence: providence,
            city : city,
            price: price,
            pics: picsUrl,
            adderId: currenntUser,
            time : (new Date).toString()
        };

        firestore.collection(category).add(data)
            .then(function (DocRef) {
                console.log("Data Added!!", DocRef)
                adTitle.value = ""
                category.value = ""
                discription.value = ""
                providence.value = ""
                price.value = ""
                submitBtn.innerHTML = "submit"
                window.location = "../dashboard/dashboard.html"
            })
    })

}

