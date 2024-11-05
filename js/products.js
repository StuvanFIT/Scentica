import {app, database, storage} from "./firebaseConfig.js"
import { getDatabase, ref, set, push, child, onValue, remove, get } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";



const dbRef = ref(database, 'all_products/');



onValue(dbRef, (snapshot) =>{

    const products = snapshot.val();

    console.log(products)
 

    products.forEach(product => {



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
            image1.src= product.imageURL;
            image1.alt = product.name;
            image1.className = "card-image";


            const image2 = document.createElement("img");
            image2.src= product.transitionURL;
            image2.alt = product.name;
            image2.className = "hover-image";

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
            fragManuDesc.textContent = product.fragManuDesc;
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
                        
            
            //Fragrance Price:
            const fragPrice = document.createElement("h3");
            fragPrice.textContent = `$${product.price}`;
            fragPrice.className = "card-price";

            //Add to cart:
            const addToCart = document.createElement("div");
            addToCart.className = "addToCart"

            
            
            fragItem.appendChild(imageContainer);

            fragInfo.appendChild(name);
            fragInfo.appendChild(fragManuDesc);

            fragInfo.appendChild(rating);
            fragInfo.appendChild(fragPrice);
            
            fragItem.appendChild(fragInfo);
            frag.appendChild(fragItem);



        }
        
        
    });


})

