document.addEventListener('DOMContentLoaded', async function () {
    const roomModal = document.getElementById("addRoom");
    const postRoomBtn = document.getElementById("postRoom");
    const closeRoomButton = document.getElementById("closeRoomModal");
    const hotelDropdown = document.getElementById("hotelId");
    let selectedHotelId; // Declare a variable to store the selected hotel ID

    postRoomBtn.onclick = function (event) {
        event.preventDefault();
        roomModal.style.display = "block";
    }

    closeRoomButton.onclick = function () {
        roomModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == roomModal) {
            roomModal.style.display = "none";
        }
    }

    const hotelInfoUrl = "http://localhost:8080/allhotels";
    const hotelInfoResponse = await fetch(hotelInfoUrl);
    const hotelInfoList = await hotelInfoResponse.json();

    // Populate the dropdown with hotel IDs and names
    hotelInfoList.forEach(hotel => {
        const option = document.createElement("option");
        option.value = hotel.hotelId;
        option.text = `${hotel.hotelId} - ${hotel.name}`;
        hotelDropdown.appendChild(option);
    });

// Add an event listener to update selectedHotelId when the dropdown changes
    hotelDropdown.addEventListener("change", function () {
        selectedHotelId = hotelDropdown.value;
        console.log(selectedHotelId)
    });


    // Add an event listener to update selectedHotelId when the dropdown changes
    hotelDropdown.addEventListener("change", function () {
        selectedHotelId = hotelDropdown.value;
    });

    const roomNumber = document.getElementById("roomnumber");
    const numberOfBeds = document.getElementById("numberofbeds");
    const price = document.getElementById("price");
    const submitRoom = document.getElementById("submitRoom");

    submitRoom.addEventListener("click", async function (event) {
        event.preventDefault();

        const room = {
            hotelId: selectedHotelId, // Use the selected hotel ID
            roomNumber: roomNumber.value,
            numberOfBeds: numberOfBeds.value,
            price: price.value,
        };

        const postUrl = "http://localhost:8080/addroom";

            try {
                const response = await postObjectAsJson(postUrl + "/" + room.hotelId,
                    room, "POST");
                console.log("jeg poster");

                if (response.ok) {
                    alert("Room added!");
                    window.location.reload();
                    window.location.href = "index.html"
                } else {
                    alert("Something went wrong");
                    window.location.reload();
                }
            } finally {
                console.log("")
            }
        });
});

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);

    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString,
    };

    const response = await fetch(url, fetchOptions);
    return response;
}

document.addEventListener("DOMContentLoaded", fetchHotels)
