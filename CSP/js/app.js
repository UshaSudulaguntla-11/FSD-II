// ======================================
// WATERWATCH MAIN JAVASCRIPT
// ======================================


// LANGUAGE SELECTION

const language =
    document.getElementById("language");


language.addEventListener("change", function () {

    const selectedLanguage =
        language.value;

    console.log(
        "Selected Language:",
        selectedLanguage
    );

});


// SIMPLE PAGE LOADING MESSAGE

console.log(
    "WaterWatch application loaded successfully."
);


// SMOOTH SCROLL

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});