const API_URL = "http://127.0.0.1:8000";

// const API_URL = "https://review-system-1-ub1h.onrender.com";

const GOOGLE_REVIEW_URL =
"https://g.page/r/CUn49duBi3nNEBM/review";

window.onload = function(){
    loadReview();
};

async function loadReview(){

    try{

        const response =
        await fetch(`${API_URL}/get-review`);

        const data = await response.json();

        if(data.review){

            document.getElementById("reviewText").value =
            data.review;

            document.getElementById("status").innerHTML =
            "Review loaded.";

        } else {

            document.getElementById("status").innerHTML =
            "No reviews left.";
        }

    } catch(error){

        console.log(error);

        document.getElementById("status").innerHTML =
        "Backend connection failed.";
    }
}

function copyReview(){

    const text =
    document.getElementById("reviewText").value;

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

    window.open(GOOGLE_REVIEW_URL, "_blank");

    setTimeout(() => {

        document.getElementById("reviewText").value = "";

        loadReview();

    }, 1000);
}