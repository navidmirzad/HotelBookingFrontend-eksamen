const urlBase = "http://localhost:8080/allhotels";

async function insertHotelCards(hotel) {
    const hotelCardDiv = document.createElement("div");
    hotelCardDiv.className = "card";
    hotelCardDiv.setAttribute("data-id", hotel.hotelId); // Update this line

    // Add styling to give an outline
    hotelCardDiv.style.border = "1px solid #ccc";
    hotelCardDiv.style.padding = "10px";
    hotelCardDiv.style.margin = "10px";

    const hotelContent = document.createElement("div");
    hotelContent.className = "content";

    const hotelName = document.createElement('h2');
    hotelName.innerText = hotel.name;

    const hotelId = document.createElement('p');
    hotelId.innerText = "Hotel ID: " + hotel.hotelId; // Update this line

    const hotelLocation = document.createElement('p');
    hotelLocation.innerText = `${hotel.street}, ${hotel.zipcode}, ${hotel.city}, ${hotel.country}`;

    const hotelLink = document.createElement("a");
    hotelLink.addEventListener("click", function () {
        localStorage.setItem("hotelId", hotel.hotelId); // Update this line
        window.location.href = "showhotel.html";
    });
    hotelLink.innerText = "Click for more";

    hotelCardDiv.appendChild(hotelName);
    hotelCardDiv.appendChild(hotelId);
    hotelCardDiv.appendChild(hotelLocation);

    hotelContent.appendChild(hotelLink);
    hotelCardDiv.appendChild(hotelContent);

    const cardContainer = document.querySelector('.card-container');
    cardContainer.appendChild(hotelCardDiv);
}

async function fetchHotels() {
    const response = await fetch(urlBase);

    if (response.ok) {
        const myHotels = await response.json();
        displayMyHotels(myHotels);
    } else {
        console.log("Error fetching hotels");
    }
}

function displayMyHotels(myHotels) {
    const myHotelsContainer = document.getElementById("hotels-container");
    myHotelsContainer.innerHTML = ""; // Clear existing content

    myHotels.forEach(hotel => {
        console.log(hotel.id);
        insertHotelCards(hotel);
    });
}

document.addEventListener("DOMContentLoaded", fetchHotels);
