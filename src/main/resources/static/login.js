function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter email and password");
        return;
    }

    const loginData = {
        email: email,
        password: password
    };

    fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
        .then(response => response.json())
        .then(user => {

            if (!user) {
                alert("Invalid email or password");
                return;
            }

            localStorage.setItem("userId", user.id);
            localStorage.setItem("userName", user.name);

            window.location.href = "/users.html";
        })
        .catch(error => {

            console.error("Login error:", error);
            alert("Something went wrong");

        });
}