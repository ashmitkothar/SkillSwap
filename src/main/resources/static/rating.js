let selectedRating = 0;

const stars = document.querySelectorAll(".star");

stars.forEach(star => {

    star.addEventListener("click", function () {

        selectedRating = Number(this.dataset.rating);

        stars.forEach(s => {
            s.classList.remove("active");
        });

        stars.forEach(s => {

            if (Number(s.dataset.rating) <= selectedRating) {
                s.classList.add("active");
            }

        });

    });

});


function submitRating() {

    const reviewerId = Number(localStorage.getItem("userId"));
    const reviewedUserId =
        Number(document.getElementById("reviewedUserId").value);

    const feedback =
        document.getElementById("feedback").value.trim();

    if (!reviewerId) {
        alert("Please login first");
        return;
    }

    if (!reviewedUserId) {
        alert("Please enter partner User ID");
        return;
    }

    if (selectedRating === 0) {
        alert("Please select a rating");
        return;
    }

    const ratingData = {

        reviewerId: reviewerId,
        reviewedUserId: reviewedUserId,
        rating: selectedRating,
        feedback: feedback

    };

    fetch("http://localhost:8080/api/ratings", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(ratingData)

    })

        .then(async response => {

            if (!response.ok) {
                throw new Error("Rating submission failed");
            }

            return response.json();

        })

        .then(savedRating => {

            alert("Rating submitted successfully! ⭐");

            document.getElementById("feedback").value = "";

            selectedRating = 0;

            stars.forEach(s => {
                s.classList.remove("active");
            });

        })

        .catch(error => {

            console.error("Rating error:", error);

            alert("Failed to submit rating");

        });
}