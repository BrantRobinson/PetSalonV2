// On page load, check saved preference
$(document).ready(function () {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
        $("html").attr("data-bs-theme", "dark");
        $("body").addClass("dark-mode");
        $("#mode-btn").text("Switch to Light Mode");
    } else {
        $("html").removeAttr("data-bs-theme");
        $("body").removeClass("dark-mode");
        $("#mode-btn").text("Switch to Dark Mode");
    }
});

// Toggle dark mode
$("#mode-btn").click(function () {
    const $html = $("html");

    $("body").toggleClass("dark-mode");

    if ($html.attr("data-bs-theme") === "dark") {
        $html.removeAttr("data-bs-theme");
        localStorage.setItem("darkMode", "false");
        $(this).text("Switch to Dark Mode");
    } else {
        $html.attr("data-bs-theme", "dark");
        localStorage.setItem("darkMode", "true");
        $(this).text("Switch to Light Mode");
    }
});

//function to populate the services form dropdown for available services
function populateServiceDropdown() {
    const serviceDropdown = $("#serviceDropdown");
    serviceDropdown.empty();

    loadServices();
    console.log("Services loaded:", services);

    if (services.length > 0) {
        services.forEach(service => {
            console.log("Adding service:", service.name);
            serviceDropdown.append(`<option value="${service.name}">${service.name}</option>`);
        });
    } else {
        serviceDropdown.append(`<option disabled>No services available</option>`);
    }
}

//populate the services dropdown menu
$(document).ready(function () {
    $('#registerModal').on('show.bs.modal', function (event) {
        console.log("Modal opening… populating dropdown");
        
        // Populate all services
        populateServiceDropdown();

        // Figure out which button triggered the modal
        const button = $(event.relatedTarget); 
        const selectedService = button.data('service'); 
        console.log("Service clicked:", selectedService);

        // If we got one, select it in the dropdown
        if (selectedService) {
            $('#serviceDropdown').val(selectedService);
        }
    });
});

//function to get services from local storage
function loadServices() {
    const stored = localStorage.getItem("services");
    if (stored) {
        const parsed = JSON.parse(stored);
        services = parsed.map(s => new Service(s.name, s.description, s.price/100, s.image));
    }
}

// all the services.js script since I'm having issues with having it in 2 separate files
//create the Service Class 
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
    new Service ("Pet Shampoo", "Our Pet Shampoo service gently cleans and conditions your pet's coat, leaving it soft, shiny, and refreshed. Using pet-safe products, we wash away dirt and odors while giving your companion a soothing massage that promotes relaxation and healthy skin.", 25.99, "./img/services-img1.png"),
    new Service ("Nail Trim", "Our Nail Trim keeps your pet's paws comfortable and healthy. We carefully trim each nail to a safe length, smoothing rough edges to prevent snagging, reduce discomfort, and support natural posture and movement.", 15.99, "./img/services-img2.png"),
    new Service ("Mist Treatment", "The Mist Treatment hydrates and revitalizes your pet's skin and coat with a fine, nourishing spray. Infused with natural botanicals, it soothes dryness and leaves your pet relaxed, refreshed, and radiant.", 15.99, "./img/services-img3.png")
];

//form validation for the services and registration forms
//check the form input field as the cursor leaves it or as the user types

$("#servicesRegistrationForm input").on("blur input", function () {
    checkInputs(this);
});

$("#registrationForm input").on("blur input", function () {
    checkInputs(this);
});


//check the forms if the register button is clicked but the form isn't submitted yet because all the required fields aren't filled in
// listen to clicks for both buttons
$("#registerButton").click(function() {
    validateForm("#servicesRegistrationForm");
});

$("#petRegisterButton").click(function() {
    validateForm("#registrationForm");
});

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

        saveServices();
        
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

function validateForm(formSelector) {
    let valid = true;

    $(`${formSelector} input, ${formSelector} select`).each(function(){
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
                    <a data-bs-toggle="modal" data-service="${service.name}" data-bs-target="#registerModal"href="#" class="services-details-button">Book Now</a>
                </div>
            </div>
        `);
        container.append(card);
    });
}

//function to save services array to loacl storage
function saveServices() {
    localStorage.setItem("services", JSON.stringify(services));
}




//save the 3 prepopulated service to local storage on page load only if there already isn't something saved in local storage otherwise load what is in localStorage

if (!localStorage.getItem("services")) {
    
    saveServices();
} else {
   
    loadServices();
}

//display the services on the services page
renderServices ();

//create pets object constructor 
class Pet {
  constructor(name, bday, gender, service, type, timeIn) {
    this.name = name;
    this.bday = bday;
    this.gender = gender;
    this.service = service;
    this.type = type;
    this.timeIn = timeIn;
  }
}

let pets = [];
// Load existing pets or load 3 defaults if nothing is there yet
loadPets();

if (pets.length === 0) {
    pets = [
        new Pet("Fido", "2020-09-13", "male", "bath", "dog", "2:30 PM"),
        new Pet("Daisy", "2022-01-22", "female", "nails clipped", "cat", "2:32 PM"),
        new Pet("Tweetie", "2024-09-05", "male", "wings clipped", "bird", "2:48 PM")
    ];
    savePets();
}

//save pets function to add it to local storage
function savePets () {
    localStorage.setItem("pets", JSON.stringify(pets));
}

function loadPets () {
    const storedPets = localStorage.getItem("pets");
    if (storedPets) {
        pets = JSON.parse(storedPets);
    }
}

//track the click asctions of the appointment registration form
function register(event) {

    // get contents of the registration form 
    const registerForm = document.querySelector("form");

    event.preventDefault();

    //get form contents
    const petName = registerForm.elements["petName"].value;
    const bDay = registerForm.elements["bDay"].value;
    const gender = registerForm.elements["gender"].value;
    const type = registerForm.elements["type"].value;
    const service = registerForm.elements["service"].value;

    console.log(petName);
    console.log(bDay);
    console.log(gender);
    console.log(type);
    console.log(service);

    const now = new Date();
    const newPet = new Pet(petName, bDay, gender, service, type, now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
    pets.push(newPet);
    savePets();

    calculateTotalPets ();
    calculateTotalAge ();
    clearRegTable ();
    populateRegTable ();

    const modalEl = document.getElementById("registerModal");
    const modal = bootstrap.Modal.getInstance(modalEl); // get active modal
    modal.hide();

    registerForm.reset();
    window.location.href = "./registration.html";


}

//add up the number of pets in the pets array and display it
function calculateTotalPets () {
    let totalPets = pets.length;
    const totalPetsDisplay = document.getElementById("js-total-pets");
    if(totalPetsDisplay) {
        totalPetsDisplay.innerHTML = totalPets;
    }
}

//calculates the age of the pet based on the birthday and stores it in each object of the array. I chose to use bdays instead of ages in case this is something that will be stored later since ages change.


function calculateTotalAge () {
    const today = new Date();

    pets.forEach(pet => {
        const bday = new Date(pet.bday);
        //calculate approximate age
        let age = today.getFullYear() - bday.getFullYear();
        //adjust age if bday hasn't passed yet
        //see if month hasn't arrived yet or if it is the birth month, if the day hasn't arrived yet
        const hasBdayNotPassed =
        (today.getMonth() < bday.getMonth()) ||
        ((today.getMonth() == bday.getMonth()) && (today.getDate() <= bday.getDate())) 

        //if birthday has not passed then subtract a year from age
        if(hasBdayNotPassed) {
            age --;
        }
        //store the age in the object
        pet.age = age;
    });
    //recalculate average age each time a new pet is added
    calculateAverageAges();
}

//calculate the average age of pets in the table
function calculateAverageAges () {
    let averageAge = 0;
    let totalAge = 0;
    pets.forEach(pet => {
        totalAge = totalAge + pet.age;
    });
    totalAge === 0 ? averageAge = 0 : averageAge = (totalAge / pets.length).toFixed(1);

    //diplay average age on webpage
    const avgAgeDisplay = document.getElementById("js-average-age");
    if (avgAgeDisplay) {
        avgAgeDisplay.innerHTML = `${averageAge} years old`;
    }
}

//clears the registration table to add the ability to add more pets and not get duplicates
function clearRegTable () {
    const regTableContents = document.getElementById("js-registration-table");
    if(regTableContents) {
        regTableContents.innerHTML = "";
    }
}

//populates the registration table
function populateRegTable () {
    const regTableContents = document.getElementById("js-registration-table");
    if (regTableContents){
        for (let i = 0; i < pets.length; i++) {
            regTableContents.innerHTML += `
            <tr>
                <td>${pets[i].name}</td>
                <td class="no-display">${pets[i].type}</td>
                <td class="no-display">${pets[i].age}</td>
                <td>${pets[i].service}</td>
                <td>${pets[i].timeIn}</td>
                <td><button class="btn" onClick="deletePet(${i})"><i class="fa-solid fa-trash"></i></button>
            </tr>`
        }
    }
}