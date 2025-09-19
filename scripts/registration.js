
function deletePet(i) {
    pets.splice(i, 1); 
    savePets();

    calculateTotalPets(); 
    calculateTotalAge();   
    clearRegTable();       
    populateRegTable();    
}


calculateTotalPets();
calculateTotalAge();
populateRegTable();

