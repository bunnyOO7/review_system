let currentReviewId = null;

const API_URL = "https://review-system-1-ub1h.onrender.com";
const GOOGLE_REVIEW_URL = "https://g.page/r/CUn49duBi3nNEBM/review";

window.onload = function(){
    loadReviewOnPageLoad();
};

async function loadReviewOnPageLoad(){

    const savedReview = localStorage.getItem("savedReview");
    const savedReviewId = localStorage.getItem("savedReviewId");

    if(savedReview){
        document.getElementById("reviewText").value = savedReview;
        currentReviewId = savedReviewId;
        return;
    }

    const response = await fetch(`${API_URL}/get-review`);
    const data = await response.json();

    if(data.review){
        document.getElementById("reviewText").value = data.review;
        currentReviewId = data.id;

        localStorage.setItem("savedReview", data.review);
        localStorage.setItem("savedReviewId", data.id);

        document.getElementById("status").innerHTML =
        "Review loaded.";
    } else {
        document.getElementById("status").innerHTML =
        "No reviews left.";
    }
}

function copyReview(){

    const text = document.getElementById("reviewText").value;

    if(!text.trim()){
        document.getElementById("status").innerHTML =
        "No review to copy.";
        return;
    }

    navigator.clipboard.writeText(text);

    document.getElementById("status").innerHTML =
    "Review copied successfully.";
}

function openGoogleReview(){

    localStorage.removeItem("savedReview");
    localStorage.removeItem("savedReviewId");

    window.open(GOOGLE_REVIEW_URL, "_blank");
}
