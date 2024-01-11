const urlBase = "http://localhost:8080/allhotels";

const putUrl = "http://localhost:8080/edithotel";

const deleteUrl = "http://localhost:8080/deletehotel";

async function insertHotelCards(hotel) {
    const cardContainer = document.querySelector('.card-container');
    const hotelCardDiv = document.createElement("div");
    hotelCardDiv.className = "hotel-card";
    hotelCardDiv.setAttribute("data-id", hotel.hotelId);

    // Add styling to give an outline
    hotelCardDiv.style.border = "1px solid #ccc";
    hotelCardDiv.style.padding = "10px";
    hotelCardDiv.style.margin = "10px";

    const hotelContent = document.createElement("div");
    hotelContent.className = "content";

    const hotelName = document.createElement('h2');
    hotelName.innerText = hotel.name;

    const hotelId = document.createElement('p');
    hotelId.innerText = "Hotel ID: " + hotel.hotelId;

    // Fetch hotel info including room count
    const hotelInfoUrl = "http://localhost:8080/roomcount";
    const hotelInfoResponse = await fetch(hotelInfoUrl);
    const hotelInfoList = await hotelInfoResponse.json();

    // Find the corresponding hotel DTO in the hotelInfoList
    const hotelInfo = hotelInfoList.find(hotelDTO => hotelDTO.hotel.hotelId === hotel.hotelId);

    const hotelLocation = document.createElement('p');
    hotelLocation.innerText = `${hotel.street}, ${hotel.zipcode}, ${hotel.city}, ${hotel.country}`;

    const hotelLink = document.createElement("a");
    hotelLink.addEventListener("click", function () {
        localStorage.setItem("hotelId", hotel.hotelId);
        window.location.href = "showhotel.html";
    });
    hotelLink.innerText = "Click for more";

    hotelCardDiv.appendChild(hotelName);
    hotelCardDiv.appendChild(hotelId);
    hotelCardDiv.appendChild(hotelLocation);
    if (hotelInfo) {
        // Display room count information
        const roomCountInfo = document.createElement('p');
        roomCountInfo.innerText = `Number of Rooms: ${hotelInfo.roomCount} rooms`;
        hotelCardDiv.appendChild(roomCountInfo);
    }


    hotelContent.appendChild(hotelLink);
    hotelCardDiv.appendChild(hotelContent);

    cardContainer.appendChild(hotelCardDiv);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.backgroundColor = "#ff8c00";
    editButton.style.color = "white";
    hotelCardDiv.appendChild(editButton);

    editButton.addEventListener("click", function () {
        openEditModal(hotel);
    });

    const deleteButton = createDeleteHotelButton(hotel);
    hotelCardDiv.appendChild(deleteButton);
}

function openEditModal(hotel) {
    const editModal = document.getElementById("myModal2");
    const modalForm = editModal.querySelector("form");

    modalForm.innerHTML = `
    <h3>Hotel name</h3>
    <input type="hidden" name="id" value="${hotel.id}">
    <input type="text" class="name" name="name" value="${hotel.name}" required>
    <h3>Street</h3>
    <input type="text" class="street" name="street" value="${hotel.street}" required>
    <h3>City</h3>
    <input type="text" class="city" name="city" value="${hotel.city}" required>
    <h3>Zip code</h3>
    <input type="text" class="zipcode" name="zipcode" value="${hotel.zipcode}" required>
    <h3>Country</h3>
    <input type="text" class="country" name="country" value="${hotel.country}" required>
    <br> <br>
    
    <button id="update-hotel-btn">Update</button>
  `;

    const updateButton = modalForm.querySelector("#update-hotel-btn");
    updateButton.addEventListener("click", async function (e) {
        e.preventDefault();

        const editedName = modalForm.querySelector(".name").value;
        const editedStreet = modalForm.querySelector(".street").value;
        const editedCity = modalForm.querySelector(".city").value;
        const editedZipcode = modalForm.querySelector(".zipcode").value;
        const editedCountry = modalForm.querySelector(".country").value;

        const editedHotel = {
            name: editedName,
            street: editedStreet,
            city: editedCity,
            zipcode: editedZipcode,
            country: editedCountry,
        };

        const response = await postObjectAsJson(putUrl + "/" + hotel.hotelId, editedHotel, "PUT");
        console.log("Response Status:", response.status);

        if (response.ok) {
            alert("Hotel updated!");
            window.location.reload();
        } else {
            const errorText = await response.text();
            console.error("Error:", errorText);
            alert("Hotel not updated");
            window.location.reload();
        }

        editModal.style.display = "none";
    });

    const closeButton = editModal.querySelector(".close");
    closeButton.addEventListener("click", function () {
        editModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    });

    editModal.style.display = "block";
}

function createDeleteHotelButton(hotel) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete-hotel-btn";

    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";

    // Add a click event listener to delete the movie
    deleteButton.addEventListener("click", async function () {
        await deleteHotel(hotel.hotelId);
    });

    return deleteButton;
}

async function deleteHotel(hotelId) {
    const url = `${deleteUrl}/${hotelId}`;
    const response = await fetch(url, {
        method: 'DELETE',
    });

    console.log(response);

    if (response.status === 200) {
        alert("Hotel deleted!");
        window.location.reload();
        return response;
    } else {
        alert("Hotel not deleted");
        window.location.reload();
    }
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
    myHotels.forEach(hotel => {
        insertHotelCards(hotel);
    });
}

document.addEventListener("DOMContentLoaded", fetchHotels);
