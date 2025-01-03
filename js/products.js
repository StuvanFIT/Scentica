import {app, database, storage} from "./firebaseConfig.js"
import { getDatabase, ref, set, push, child, onValue, remove, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";



const dbRef = ref(database, 'products/');





function retriveProductData(){

   
    onValue(dbRef, (snapshot) =>{

        if (snapshot.exists){
            const productData = snapshot.val();



            filterData(Object.values(productData));
        }
    });

}

function isMenProduct(product){
    return product.gender === "Men" 
}
function isWomenProduct(product){
    return product.gender === "Women" 
}
function isUnisexProduct(product){
    return product.gender === "Unisex" 
}
function inStock(product){
    return product.quantity >0;
}
function outOfStock(product){
    return product.quantity <=0;
}

function filterData(productData){

    let filteredProductData = [];

    //Product Type checked boxes:
    const menCheck = document.getElementById("filter-male-fragrances").checked;
    const womenCheck = document.getElementById("filter-female-fragrances").checked;
    const unisexCheck = document.getElementById("filter-unisex-fragrances").checked;

    if (menCheck) {
        filteredProductData.push(...productData.filter(isMenProduct));
    }

    if (womenCheck) {
        filteredProductData.push(...productData.filter(isWomenProduct));
    }

    if (unisexCheck) {
        filteredProductData.push(...productData.filter(isUnisexProduct));
    }

    // If no filters are selected, use all product data
    if (!menCheck && !womenCheck && !unisexCheck) {
        filteredProductData = productData;
    }


    //Instock or out of stock:
    const in_stock = document.getElementById("sort-in-stock").checked;
    const out_of_stock = document.getElementById("sort-out-stock").checked;

    if (in_stock) {
        filteredProductData = filteredProductData.filter(inStock);
    } else if (out_of_stock) {
        filteredProductData = filteredProductData.filter(outOfStock);
    }



    console.log(filteredProductData);
    sortData(filteredProductData);
}

function sortData(filteredProductData){


    
    const sortChecked = document.querySelector(`.sortForm input[type="checkbox"]:checked`);
    const availabilityChecked = document.querySelector('.availabilityForm input[type="checkbox"]:checked');
    if (sortChecked){

        switch(sortChecked.id){

            case "sort-A-Z":

                filteredProductData.sort((a, b) => a.name.localeCompare(b.name)); 
                break;
            
            case "sort-Z-A":
                filteredProductData.sort((a, b) => b.name.localeCompare(a.name));
                break;
    
    
            case "sort-featured":
    
                break;
    
            case "sort-best-selling":
    
                break;
    
            default:
                break;
        }
    }
    populateProducts(filteredProductData);

}



function populateProducts(productData){
    

    const frag = document.getElementsByClassName("fragrances")[0];
    frag.innerHTML ="";

    productData.forEach(product => {

        console.log(product)



        if (product){

            
            const frag = document.getElementsByClassName("fragrances")[0];


            //Create a card container for the fragrance item:
            const fragItem = document.createElement("div");
            fragItem.className = "card";
            fragItem.id = product.name;

            //Fragrance Image:

            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";

            const image1 = document.createElement("img");
            image1.src= product.images.image1;
            image1.alt = product.name;
            image1.className = "card-image";

            const addItemButton = document.createElement("button"); //create a button to add the item to the cart
            addItemButton.textContent = "ADD TO CART";
            addItemButton.className = "hover-add-to-cart-button";
            addItemButton.addEventListener("click", function(e){
                e.stopPropagation();
                alert("added to cart!")
            })

            const image2 = document.createElement("img");
            image2.src= product.images.image2;
            image2.alt = product.name;
            image2.className = "hover-image";

            imageContainer.appendChild(addItemButton);
            imageContainer.appendChild(image1);
            
            imageContainer.appendChild(image2);



            //Fragrance Information
            const fragInfo = document.createElement("div");
            fragInfo.className = "fragrance-info";

            //Fragrance Name:
            const name = document.createElement("h3");
            name.className = "card-title";
            name.textContent = product.name;
            


            //Fragrance Manufacturer:
            const fragManuDesc = document.createElement("h5");
            fragManuDesc.textContent = product.inspiredQuote;
            fragManuDesc.className = "card-manufacturer";
            
            //Fragrance Review Rating:
            const rating = document.createElement("div");
            rating.className = "star-rating";
            const ratingValue = product.rating || 0;

            // Generate stars based on rating
            for (let i = 1; i <= 5; i++) {
                const starSpan = document.createElement("span");
                starSpan.className = "star";
                starSpan.textContent = "★"; // Unicode star character
                
                // Apply filled class to stars that are less than or equal to the rating value
                if (i <= ratingValue) {
                    starSpan.classList.add("filled");
                }
                
                rating.appendChild(starSpan);
            }
                        
            


            //Add to cart:
            const addToCart = document.createElement("div");
            addToCart.className = "addToCart"

            
            fragItem.appendChild(imageContainer);

            fragInfo.appendChild(name);
            fragInfo.appendChild(fragManuDesc);
            fragInfo.appendChild(rating);

            
            fragItem.appendChild(fragInfo);

            //Attach clickable event listener to the fragrance card:
            fragItem.addEventListener('click', function(e) {
                
                const productDetails = JSON.stringify(product);
                
                localStorage.setItem('currentProduct', productDetails);
                window.location.href = "../public/product_information_page.html";

            })


            frag.appendChild(fragItem);


            // Once the fragrance is added to the DOM, trigger the transition
            setTimeout(() => {
                fragItem.classList.add('loaded');
            }, 100); // Delay to allow DOM to register the element
        }
    });
}


//Add Event Listeners
const filterSortProdBtn = document.getElementById("filter-sort-submit");
filterSortProdBtn.addEventListener('click', retriveProductData);




document.addEventListener('DOMContentLoaded', function(e) {
    retriveProductData();
});




