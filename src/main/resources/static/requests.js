const loggedInUser = localStorage.getItem("userId");

if (!loggedInUser) {
    window.location.href = "/login.html";
}


function loadRequests() {

    fetch("http://localhost:8080/api/requests")
        .then(response => response.json())
        .then(requests => {

            const requestsList = document.getElementById("requestsList");

            requestsList.innerHTML = "";

            requests.forEach(request => {

                // Sirf current user ko receive hui requests
                if (request.receiverId != loggedInUser) {
                    return;
                }

                const requestCard = document.createElement("div");

                requestCard.classList.add("request-card");

                requestCard.innerHTML = `
                    <h2>Skill Swap Request</h2>

                    <p>
                        User ID: ${request.senderId}
                    </p>

                    <p>
                        Status: ${request.status}
                    </p>

                    ${
                    request.status === "PENDING"
                        ? `
                            <button
                                class="accept-btn"
                                onclick="updateRequest(${request.id}, 'ACCEPTED')">
                                Accept
                            </button>

                            <button
                                class="reject-btn"
                                onclick="updateRequest(${request.id}, 'REJECTED')">
                                Reject
                            </button>
                        `
                        : ""
                }
                `;

                requestsList.appendChild(requestCard);
            });

        })
        .catch(error => {
            console.error("Error loading requests:", error);
        });
}


function updateRequest(requestId, status) {

    fetch(
        `http://localhost:8080/api/requests/${requestId}/status?status=${status}`,
        {
            method: "PUT"
        }
    )
        .then(response => response.json())
        .then(updatedRequest => {

            alert(`Request ${status.toLowerCase()}!`);

            loadRequests();

        })
        .catch(error => {

            console.error("Error updating request:", error);

            alert("Failed to update request");

        });
}


loadRequests();