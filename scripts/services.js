//crate the Service Class 
class Service {
    constructor(name, description, price) {
        this.name = name;
        this.description = description;
        this.price = Math.round(price*100);
    }
}

//initialize the services array
let services = [];




//check the form input field as the cursor leaves it or as the user types
$("#servicesRegistrationForm input").on("blur input", function () {
    checkInputs(this);
});

//check the form if the register button is clicked but the form isn't submitted yet because all the required fields aren't filled in
$("#registerButton").click(function(){
    validateForm();
})

//check the form when it's submitted
$("#servicesRegistrationForm").on("submit", function(event){
    
    event.preventDefault();
    // console.log("Submit fired");

    if(validateForm()) {
        //get the data from the form
        const serviceName = $("#service").val().trim();
        const serviceDescription = $("#serviceDescription").val().trim();
        const servicePrice = $("#servicePrice").val().trim();
        //create new Service object
        const newService = new Service(serviceName, serviceDescription, servicePrice);
        //push the Service object to the services array
        services.push(newService);
        console.log("New Service:", newService);
        console.log("All Services:", services);

        $("#servicesRegistrationForm")[0].reset();
    } else {
        // console.log("form has an error");
    }
});


//clear the form if the clear button is pressed and reset all form field borders to normal
$("#clearButton").click(function(){
    $("#servicesRegistrationForm")[0].reset();
    $("#servicesRegistrationForm input").each(function(){
        $(this).removeClass("border-3 border-danger");
    });
});



function checkInputs (element) {
    if($(element).val().trim() === ""){
        $(element).addClass("border-3 border-danger");
        return false;
    } else {
        $(element).removeClass("border-3 border-danger");
        return true;
    }
}

function validateForm () {
    let valid = true;

    $("#servicesRegistrationForm input").each(function(){
        if(!checkInputs(this)) {
            valid = false;
        }
    });

    return valid;
}