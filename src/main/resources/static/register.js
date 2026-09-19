function registerUser() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const bio = document.getElementById("bio").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill all required fields");
        return;
    }

    const user = {
        name: name,
        email: email,
        password: password,
        bio: bio
    };

    fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            return response.json();
        })
        .then(savedUser => {

            alert("Account created successfully!");

            window.location.href = "/login.html";
        })
        .catch(error => {

            console.error("Registration error:", error);

            alert("Registration failed. Email may already exist.");
        });
}