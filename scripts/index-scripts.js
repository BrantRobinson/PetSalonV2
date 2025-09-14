const salon = {
    name: "Petty Paws Pet Salon",
    street: "123 Main St.",
    city: "San Diego",
    state: "CA",
    zip: "91942",
    owner: "Larry David",
    welomeMessage: "After being banned from Prissy Paws for calmly pointing out that their lobby smelled like damp Labradoodle, the magazines were older than most of the pets, and the poop-permissive restroom policy was, frankly, appalling... Petty Paws was born. At Petty Paws, pets wait with pets, people wait with people, the chairs are comfortable, the magazines are fresh, and the bathrooms are strictly pee-only. No chaos. No canines in your lap. No public pooping. Just grooming greatness… and a little revenge."
}

//populate index.html with data from salon object
document.getElementById("js-company-name").innerHTML = salon.name;
document.getElementById("js-company-address").innerHTML = `
<p>${salon.street}</p>
<p>${salon.city}, ${salon.state}</p>`;

document.getElementById("js-welcome-message").innerHTML = salon.welomeMessage;