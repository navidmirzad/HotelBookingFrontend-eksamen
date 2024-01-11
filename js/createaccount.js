document.addEventListener("DOMContentLoaded", function () {

    // Select form elements
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phoneNumber = document.getElementById("phoneNumber")
    const email = document.getElementById("email");
    const userName = document.getElementById("userName");
    const password = document.getElementById("password")
    const submitBtn = document.getElementById("submitBtn");


    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const guest = {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            userName: userName.value,
            password: password.value,
        };

        const postUrl = "http://localhost:8080/createaccount";

        try {
            const response = await postObjectAsJson(postUrl, guest, "POST");

            if (response.ok) {
                alert("Account Created!");
                window.location.reload();
            } else {
                alert("Error creating account");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });


    async function postObjectAsJson(url, object, httpVerb) {
        const objectAsJsonString = JSON.stringify(object);
        console.log(objectAsJsonString);
        const fetchOptions = {
            method: httpVerb,
            headers: {
                "Content-Type": "application/json",
            },
            body: objectAsJsonString,
        };

        const response = await fetch(url, fetchOptions);
        console.log(response);
        return response;
    }
});

function openCreateAccountModal() {
    var modal = document.getElementById("createAccountModal");
    modal.style.display = "block";
}

function closeCreateAccountModal() {
    var modal = document.getElementById("createAccountModal");
    modal.style.display = "none";
}