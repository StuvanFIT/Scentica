

import { database } from "./firebaseConfig.js";
import { getDatabase, ref, set, push, child, onValue, update, get, remove} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

function handleAddProduct(){

    //Retrieve all current field inputs from Step 1:
    const prodName = document.getElementById("enter-product-name").value;
    const descProd = document.getElementById("enter-description").value;
    const inspiredQuote = document.getElementById("enter-inspired-desc").value;
    const ingredients = document.getElementById("enter-ingredients").value;
    const gender = document.querySelector(".chooseGenderContainer input[type='radio']:checked").value;

    console.log(gender)
    console.log(prodName)
    console.log(descProd)
    console.log(inspiredQuote)
    console.log(ingredients)


    //Retrieve all current field inputs from Step 2:
    const allAccords = document.querySelectorAll(".accordContainer input[type='checkbox']")
    const selectedAccords = [];
    allAccords.forEach(checkbox =>{
        
        if(checkbox.checked) {
            selectedAccords.push(checkbox.value);
        }
    })
    console.log(selectedAccords)

    //Retrieve all current field inputs from Step 3:
    const url1 = document.getElementById("image1_URL").value;
    const url2 = document.getElementById("image2_URL").value;
    const url3 = document.getElementById("image3_URL").value;
    const url4 = document.getElementById("image4_URL").value;



    console.log(url1)
    console.log(url2)
    console.log(url3)
    console.log(url4)


    //Our New Product Properties:

    const newProduct = {

        name: prodName,
        gender:gender,
        description:descProd,
        inspiredQuote: inspiredQuote,
        ingredients: ingredients,
        mainAccords: selectedAccords,
        images: {
            image1: url1,
            image2: url2,
            image3: url3,
            image4: url4
        }
    }




    const productRef = ref(database, 'products/');

    push(productRef, newProduct)
    .then((productSnapshot) =>{
        console.log("New Product has been pushed to the products database!");

        const productId = productSnapshot.key;
        let genderPath = `categories/unisex`;

        if(gender === "Men"){
            genderPath = `categories/men/`;
        } else if(gender === "Women"){
            genderPath = `categories/women/`;
        }

        const genderRef= ref(database, genderPath + `${productId}`);
       

        set(genderRef, { [productId]: true })
            .then(() => {
                console.log(`Product added to ${gender} category with ID: ${productId}`);
            })
            .catch((error) => {
                console.error("Error adding product to category:", error);
            });

        
    })
    .catch((error) =>{
        console.error("Error: Did not add product sucessfully...", error);
    })

    




}



//Add Event Listeners:

const addNewProductBtn = document.querySelector(".submit-new-product");
addNewProductBtn.addEventListener('click', (e) =>{
    handleAddProduct();
})

