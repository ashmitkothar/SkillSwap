const loggedInUser = localStorage.getItem("userId");

if (!loggedInUser) {
    window.location.href = "/login.html";
}


// ===============================
// LOAD USERS
// ===============================

function loadUsers() {

    fetch("http://localhost:8080/api/users")

        .then(response => response.json())

        .then(async users => {

            const usersList = document.getElementById("usersList");

            usersList.innerHTML = "";


            for (const user of users) {

                if (user.id == loggedInUser) {
                    continue;
                }


                const skills =
                    user.skills && user.skills.length > 0
                        ? user.skills.map(skill => skill.name).join(", ")
                        : "No skills added";


                const wantToLearn =
                    user.wantToLearn && user.wantToLearn.length > 0
                        ? user.wantToLearn.map(skill => skill.name).join(", ")
                        : "Nothing added";


                // Load rating
                const ratingText = await loadRatings(user.id);


                const userCard = document.createElement("div");

                userCard.classList.add("user-card");


                userCard.innerHTML = `

                    <h2>${user.name}</h2>

                    <p>${user.email}</p>

                    <p>
                        ${user.bio || "No bio available"}
                    </p>

                    <p>
                        <strong>Skills:</strong>
                        ${skills}
                    </p>

                    <p>
                        <strong>Wants to learn:</strong>
                        ${wantToLearn}
                    </p>

                    <p>
                        <strong>Rating:</strong>
                        ${ratingText}
                    </p>

                    <button onclick="openChat(${user.id})">
                        Chat
                    </button>

                    <button onclick="sendSwapRequest(${user.id})">
                        Send Swap Request
                    </button>

                `;


                usersList.appendChild(userCard);
            }

        })

        .catch(error => {

            console.error("Error loading users:", error);

        });
}



// ===============================
// LOAD RATINGS
// ===============================

function loadRatings(userId) {

    return fetch(
        `http://localhost:8080/api/ratings/user/${userId}`
    )

        .then(response => response.json())

        .then(ratings => {

            if (ratings.length === 0) {

                return "No ratings yet";

            }


            const average =
                ratings.reduce(
                    (sum, r) => sum + r.rating,
                    0
                ) / ratings.length;


            return `⭐ ${average.toFixed(1)} (${ratings.length} ratings)`;

        })

        .catch(error => {

            console.error("Rating error:", error);

            return "Rating unavailable";

        });
}



// ===============================
// OPEN CHAT
// ===============================

function openChat(userId) {

    localStorage.setItem(
        "chatPartnerId",
        userId
    );

    window.location.href = "/chat.html";
}



// ===============================
// SEND SWAP REQUEST
// ===============================

function sendSwapRequest(receiverId) {

    const request = {

        senderId: Number(loggedInUser),

        receiverId: receiverId

    };


    fetch("http://localhost:8080/api/requests", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(request)

    })

        .then(response => {

            if (!response.ok) {

                throw new Error("Request failed");

            }

            return response.json();

        })

        .then(savedRequest => {

            alert("Skill swap request sent!");

        })

        .catch(error => {

            console.error(
                "Swap request error:",
                error
            );

            alert("Failed to send swap request");

        });

}



// ===============================
// START
// ===============================

loadUsers();