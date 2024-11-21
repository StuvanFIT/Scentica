import { database } from "./firebaseConfig.js";
import { getDatabase, ref, set, push, child, onValue, update, get, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";


export function displayProductInfo(){

    let currentProduct = JSON.parse(localStorage.getItem("currentProduct"))|| '';
    if (currentProduct) {

        console.log(currentProduct)

        //Append images to the art gallery:
        displayImageGallery(currentProduct);

        //Append product information to the details section:
        displayProdDetails(currentProduct);

        displayProdAccords(currentProduct);







    }
}

function displayImageGallery(currentProduct){
    
    const currGallery = document.querySelector(".galleryContainer");
        
    const image1 = document.createElement("img");
    image1.src= currentProduct.images.image1;
    image1.alt = currentProduct.name;
    image1.className = "gallery-image";
    
    const image2 = document.createElement("img");
    image2.src= currentProduct.images.image2;
    image2.alt = currentProduct.name;
    image2.className = "gallery-image";

    const image3 = document.createElement("img");
    image3.src= currentProduct.images.image3;
    image3.alt = currentProduct.name;
    image3.className = "gallery-image";

    const image4 = document.createElement("img");
    image4.src= currentProduct.images.image4;
    image4.alt = currentProduct.name;
    image4.className = "gallery-image";


    currGallery.appendChild(image1);
    currGallery.appendChild(image2);
    currGallery.appendChild(image3);
    currGallery.appendChild(image4);
}

function displayProdDetails(currentProduct){

    const prodTitle = document.getElementById("prodTitle");
    prodTitle.textContent = currentProduct.name;

    const prodReviewsRating = document.getElementById("prodReviewRating");
    const ratingValue = currentProduct.rating || 0;

    // Generate stars based on rating
    for (let i = 1; i <= 5; i++) {
        const starSpan = document.createElement("span");
        starSpan.className = "star";
        starSpan.textContent = "★"; // Unicode star character
        
        // Apply filled class to stars that are less than or equal to the rating value
        if (i <= ratingValue) {
            starSpan.classList.add("filled");
        }
        
        prodReviewsRating.appendChild(starSpan);
    }


    const prodDesc = document.getElementById("prodDesc");
    prodDesc.textContent = currentProduct.description;

    
    const prodIngredients = document.getElementById("prodIngredients");
    prodIngredients.textContent = currentProduct.ingredients;


    const prodType = document.getElementById("prodType");
    prodType.textContent = "Eau De Toilette";


    //Create the size options buttons:
    console.log(currentProduct)
    const volumeOptions = document.querySelector(".volumeOptions");
    console.log(volumeOptions)
    currentProduct.sizeOptions.forEach(size =>{
        console.log(size)

        const btn = document.createElement("button");
        btn.textContent = `${size}ml`;
        btn.classList.add("sizeButton");

        volumeOptions.appendChild(btn);
    })

    
}


function displayProdAccords(currentProduct) {
    console.log(currentProduct);

    // Retrieve the accords
    const prodAccords = currentProduct.mainAccords;

    // Function to create image element asynchronously
    const createImgElement = async (note) => {
        const accordsPath = ref(database, "accords/");
        const snapshot = await get(accordsPath); // Await the database call

        if (snapshot.exists()) {
            const accordValues = snapshot.val();
            const noteImg = document.createElement("img");
            noteImg.src = accordValues[note]; // Retrieve the image URL for the note
            noteImg.alt = note;
            noteImg.className = "accord-image";


            const imageTextContainer = document.createElement("div");
            imageTextContainer.classList.add("image-text-container");

    
            const accordText = document.createElement("h2");
            accordText.innerHTML = note;

            imageTextContainer.appendChild(noteImg)
            imageTextContainer.appendChild(accordText);





            return imageTextContainer; // Return the created image element
        }

        return null; // Return null if the accord doesn't exist
    };

    // Render notes into the container
    const renderNotes = async (notes, containerID) => {
        const container = document.getElementById(containerID);
        
        container.innerHTML = ""; // Clear existing content


        for (const note of Object.keys(notes)) {
            const imgElement = await createImgElement(note); // Await the image creation
            console.log(imgElement);

            if (imgElement) container.appendChild(imgElement); // Append the image if it exists
        }
    };

    // Render top notes
    renderNotes(prodAccords.topNotes, "top-notes");
    renderNotes(prodAccords.middleNotes, "middle-notes");
    renderNotes(prodAccords.baseNotes, "base-notes");
}



var wrappers = document.getElementsByClassName("wrapper");

// Add event listeners to each button
for (var i = 0; i < wrappers.length; i++) {
    wrappers[i].addEventListener("click", function (e) {
        e.stopPropagation;
        
        // Find the closest .wrapper parent, then select the .wrapper-content inside it
        const wrapperContent = this.nextElementSibling;
    
        // Toggle the "visible" class on the wrapper-content
        wrapperContent.classList.toggle("visible");

        // Change the button text based on visibility
        console.log(this)
        const expandButton = this.querySelector(".expandButton");
        console.log(expandButton)


        if (wrapperContent.classList.contains("visible")) {
            console.log("k")
            expandButton.textContent = "-";  // Collapse icon when content is shown
        } else {
            expandButton.textContent = "+";  // Expand icon when content is hidden
        }
    });
}








displayProductInfo();
