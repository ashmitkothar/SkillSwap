console.log("Chat JS loaded!");
const loggedInUser = localStorage.getItem("userId");

if (!loggedInUser) {
    window.location.href = "/login.html";
}

const user1 = Number(localStorage.getItem("userId"));
const user2 = Number(localStorage.getItem("chatPartnerId"));

// Load chat user's name
function loadChatUser() {

    fetch(`http://localhost:8080/api/users/${user2}`)
        .then(response => response.json())
        .then(user => {

            document.getElementById("chatUserName").textContent = user.name;

        })
        .catch(error => {
            console.error("Error loading user:", error);
        });
}


// Load messages
function loadMessages() {

    fetch(`http://localhost:8080/api/messages/conversation?user1=${user1}&user2=${user2}`)
        .then(response => response.json())
        .then(messages => {

            const chatBox = document.getElementById("chatBox");

            chatBox.innerHTML = "";

            messages.forEach(message => {

                const messageElement = document.createElement("div");

                messageElement.classList.add("message");

                const time = message.sentAt
                    ? new Date(message.sentAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                    : "";

                if (message.senderId === user1) {

                    messageElement.classList.add("sent");

                    messageElement.innerHTML = `
                        <span>${message.content}</span>

                        <div class="message-bottom">

                            <small>${time}</small>

                            <button class="edit-btn"
                                onclick="editMessage(${message.id}, '${message.content.replace(/'/g, "\\'")}')">
                                Edit
                            </button>

                            <button class="delete-btn"
                                onclick="deleteMessage(${message.id})">
                                Delete
                            </button>

                        </div>
                    `;

                } else {

                    messageElement.classList.add("received");

                    messageElement.innerHTML = `
                        <span>${message.content}</span>
                        <small>${time}</small>
                    `;
                }

                chatBox.appendChild(messageElement);
            });

            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            console.error("Error loading messages:", error);
        });
}


// Send message
function sendMessage() {

    const input = document.getElementById("messageInput");
    const content = input.value.trim();

    if (content === "") {
        return;
    }

    console.log("Sending message...");
    console.log("Sender ID:", user1);
    console.log("Receiver ID:", user2);

    const message = {
        senderId: user1,
        receiverId: user2,
        content: content
    };

    fetch("http://localhost:8080/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
        .then(async response => {

            console.log("Response status:", response.status);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    `Message failed: ${response.status} - ${JSON.stringify(data)}`
                );
            }

            return data;
        })
        .then(savedMessage => {

            console.log("Message sent successfully:", savedMessage);

            input.value = "";

            loadMessages();
        })
        .catch(error => {

            console.error("Error sending message:", error);

            alert("Message send nahi hua. Console me error check karo.");
        });
}

// Delete message
function deleteMessage(messageId) {

    fetch(`http://localhost:8080/api/messages/${messageId}?userId=${user1}`, {
        method: "DELETE"
    })
        .then(() => {

            loadMessages();

        })
        .catch(error => {
            console.error("Error deleting message:", error);
        });
}


// Edit message
function editMessage(messageId, oldContent) {

    const newContent = prompt("Edit your message:", oldContent);

    if (newContent === null) {
        return;
    }

    if (newContent.trim() === "") {
        return;
    }

    fetch(`http://localhost:8080/api/messages/${messageId}?userId=${user1}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: newContent.trim()
        })
    })
        .then(response => response.json())
        .then(updatedMessage => {

            loadMessages();

        })
        .catch(error => {
            console.error("Error editing message:", error);
        });
}


// Initial load
loadChatUser();
loadMessages();


// Enter key to send
document.getElementById("messageInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


// Auto refresh every 3 seconds
setInterval(loadMessages, 3000);
function logout() {

    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    window.location.href = "/login.html";
}