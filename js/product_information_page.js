


export function displayProductInfo(){

    let currentProduct = localStorage.getItem("currentProduct") || '';
    if (currentProduct) {
        console.log(JSON.parse(currentProduct));
        
    }
}


displayProductInfo();