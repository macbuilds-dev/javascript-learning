const gitHubBtn             = document.getElementById("GitHub-Link");
const frontEndMentorBtn     = document.getElementById("Frontend-Mentor-Link");
const linkedInBtn           = document.getElementById("LinkedIn-Link");
const twitterBtn            = document.getElementById("Twitter-Link");
const instagramBtn          = document.getElementById("Instagram-Link");

gitHubBtn.addEventListener("click", () => {
    window.open("https://github.com/ammarchaudhry5", "_blank");
        //window.location.href = "https://github.com/ammarchaudhry5";
    }
)

frontEndMentorBtn.addEventListener("click", () => {
  window.location.href = "front_end_mentor.html";
});

linkedInBtn.addEventListener("click", () => {
    window.open("https://www.linkedin.com/in/ammar-chaudhry-75b434230/", "_blank");
    }
)

twitterBtn.addEventListener("click", () => {
    window.open("https://x.com/i/flow/login", "_blank");
    }
)

instagramBtn.addEventListener("click", () => {
    window.open("https://www.instagram.com/itx.mac/", "_blank");
    }
)