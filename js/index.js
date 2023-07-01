
// Light mode
(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

// Contact Form

/*
const contactForm = document.getElementById("contact");
console.log(contactForm);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    console.log(formData);
    const formDataJson = JSON.stringify(formData, null, 2);

    fetch("https://formsubmit.co/ajax/galejscott@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: formDataJson
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
});
*/
