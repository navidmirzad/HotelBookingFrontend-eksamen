function fetchAnyUrl(url) {
    return  fetch(url).then(response => response.json());
}

const buttons = document.getElementById("buttons");

document.addEventListener('DOMContentLoaded', function () {

    const userName = document.getElementById("modalUsername");
    const password = document.getElementById("modalPassword");
    const submitBtn = document.getElementById("modalSubmitButton");
    const url = "http://localhost:8080/login";
    const guestUrl = "http://localhost:8080/guests";
    let guest = {};
    sessionStorage.clear();

    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault();
        guest.userName = userName.value;
        guest.password = password.value;


        try {
            const response = await postObjectAsJson(url, guest, "POST");

            if (response.ok) {
                sessionStorage.setItem("userName", guest.userName);
                const userCheck = await fetchAnyUrl(guestUrl);
                const userExists = userCheck.some(user => {
                    return user.userName === guest.userName && user.password === guest.password;
                });
                if (userExists) {
                    closeLoginModal();
                    const logoutBtn = document.createElement("button");
                    logoutBtn.style.backgroundColor = "red";
                    logoutBtn.textContent = "Log out";
                    buttons.appendChild(logoutBtn);

                    document.getElementById("loginButton").style.display = "none";
                    document.getElementById("createButton").style.display = "none";

                    alert("You are now logged in");

                    logoutBtn.addEventListener("click", function () {
                        sessionStorage.clear();
                        location.reload();
                    });
                } else {
                    alert("Invalid username or password");
                }
            }
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
    });
});

