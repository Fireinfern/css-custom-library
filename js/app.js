async function GetFragment(direction) {
    let result;
    await fetch(direction)
        .then(response => response.text())
        .then(data => {
            result = data;
        });
    return result;
}

(async function (window) {
    const Handlebars = window.Handlebars
    const $ = document;
    const SectionContainer = $.getElementById("section-container");

    const Sections = {
        "text-section": await GetFragment("./fragments/TextSection.hbs"),
        "card-section": await GetFragment("./fragments/CardSection.hbs")
    }

    const NavItems = $.getElementsByClassName("navbar-item");

    for (let i = 0; i < NavItems.length; i++) {
        let sectionId = NavItems[i].dataset.section;
        NavItems[i].addEventListener("click", (event) => {
            SectionContainer.innerHTML = Sections[sectionId];
            SectionContainer.style.animation = "fadeIn ease 1s"
            SectionContainer.addEventListener("webkitAnimationEnd", (event) => {
                event.target.style.animation = "";
            });

        });
    }

})(window)