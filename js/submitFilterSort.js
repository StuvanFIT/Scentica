

function handleSort(){

    //Retreived the status check boxes for each sort option:
    const sortChecked = document.querySelector(`.sortForm input[type="checkbox"]:checked`);
    const availabilityChecked = document.querySelector('.availabilityForm input[type="checkbox"]:checked');

    if (sortChecked){

        switch(sortChecked.id){

            case "sort-A-Z":

    
                break;
            
            case "sort-Z-A":
    
                break;
    
    
            case "sort-featured":
    
                break;
    
            case "sort-best-selling":
    
                break;
    
            default:
                alert("No id found for sorting option!")
        }
    }

}

function sort_a_to_z(){



}









