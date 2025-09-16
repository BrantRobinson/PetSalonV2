//crate the Service Class 
class Service {
    constructor(name, description, price, image) {
        this.name = name;
        this.description = description;
        this.price = Math.round(price*100);
        this.image = image;
    }
}

//initialize the services array
let services = [
    new Service ("Pet Shampoo", "Our Pet Shampoo service gently cleans and conditions your pet’s coat, leaving it soft, shiny, and refreshed. Using pet-safe products, we wash away dirt and odors while giving your companion a soothing massage that promotes relaxation and healthy skin.", 25.99, "./img/services-img1.png"),
    new Service ("Nail Trim", "Our Nail Trim keeps your pet’s paws comfortable and healthy. We carefully trim each nail to a safe length, smoothing rough edges to prevent snagging, reduce discomfort, and support natural posture and movement.", 15.99, "./img/services-img2.png"),
    new Service ("Mist Treatment", "The Mist Treatment hydrates and revitalizes your pet’s skin and coat with a fine, nourishing spray. Infused with natural botanicals, it soothes dryness and leaves your pet relaxed, refreshed, and radiant.", 15.99, "./img/services-img3.png")
];

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

        renderServices();
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



//function to display services on the services page
function renderServices() {
    const container = $(".services-cards-container");
    container.empty(); 

    services.forEach(service => {
        const card = $(`
            <div class="services-card">
                <img class="service-img" src="${service.image || './img/default-service.jpg'}" alt="${service.name}">
                <div class="services-detail-card">
                    <h3 class="service-title">${service.name}</h3>
                    <p class="service-price">$${parseFloat(service.price/100).toFixed(2)}</p>
                    <p class="service-description">${service.description}</p>
                    <a href="#" class="services-details-button">Book Now</a>
                </div>
            </div>
        `);
        container.append(card);
    });
}

renderServices ();