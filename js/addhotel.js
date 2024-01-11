document.addEventListener('DOMContentLoaded', function () {
    const hotelModal = document.getElementById("addHotel");
    const postBtn = document.getElementById("postHotel");
    const closeButton = document.getElementById("closeHotelModal");

    postBtn.onclick = function (event) {
        event.preventDefault();
        hotelModal.style.display = "block";
    }

    closeButton.onclick = function () {
        hotelModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == hotelModal) {
            hotelModal.style.display = "none";
        }
    }

    const name = document.getElementById("name");
    const street = document.getElementById("street")
    const city = document.getElementById("city")
    const zipcode = document.getElementById("zipcode")
    const country = document.getElementById("country")
    const submitHotel = document.getElementById("submitHotel")


    submitHotel.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const hotel = {
            name: name.value,
            street: street.value,
            city: city.value,
            zipcode: zipcode.value,
            country: country.value
        };

        const postUrl = "http://localhost:8080/addhotel";

        try {
            const response = await postObjectAsJson(postUrl, hotel, "POST");
            console.log("jeg poster");

            if (response.ok) {
                alert("Hotel added!");
                window.location.reload();
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
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response
}


