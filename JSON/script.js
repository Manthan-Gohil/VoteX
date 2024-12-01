class PageContent {
    constructor(data) {
        this.data = data;
    }

    // Render header section
    renderHeader() {
        const { title, navLinks, loginButton } = this.data.header;

        // Title animation
        const captainContent = document.querySelector(".captain1-content");
        const title1 = document.createElement("h2");
        const title2 = document.createElement("h2");
        title1.textContent = title;
        title2.textContent = title;
        captainContent.appendChild(title1);
        captainContent.appendChild(title2);

        // Navigation links
        const nav = document.querySelector("nav");
        navLinks.forEach(link => {
            const navLink = document.createElement("a");
            navLink.href = link.href;
            navLink.textContent = link.text;
            nav.appendChild(navLink);
        });

        // Login button
        const loginButtonElement = document.createElement("button");
        loginButtonElement.textContent = loginButton.text;
        const loginLink = document.createElement("a");
        loginLink.href = loginButton.href;
        loginLink.appendChild(loginButtonElement);
        document.querySelector("header").appendChild(loginLink);
    }

    // Render main section
    renderMain() {
        const { left, right } = this.data.main;

        // Welcome text
        const upperTextDiv = document.querySelector(".upper .text");
        left.welcomeText.forEach(text => {
            const p = document.createElement("p");
            p.textContent = text;
            upperTextDiv.appendChild(p);
        });

        // Start voting button
        const startVotingButton = document.createElement("button");
        startVotingButton.textContent = left.startVotingButton.text;
        const votingLink = document.createElement("a");
        votingLink.href = left.startVotingButton.href;
        votingLink.appendChild(startVotingButton);
        document.querySelector(".mid").appendChild(votingLink);

        // Follow us text and icons
        document.querySelector(".follow").textContent = left.followUsText;
        const iconsDiv = document.querySelector(".icons");
        left.socialLinks.forEach(link => {
            const iconLink = document.createElement("a");
            iconLink.href = link.href;
            iconLink.innerHTML = `<i class="${link.icon}"></i>`;
            iconLink.style.color = "#455EEF";
            iconsDiv.appendChild(iconLink);
        });

        // Right image
        const rightImageDiv = document.querySelector(".right .image");
        rightImageDiv.style.backgroundImage = `url(${right.imageUrl})`;
    }

    // Render "Why Choose Us" section
    renderWhyChooseUs() {
        const { sectionTitle, description, cards } = this.data.whyChooseUs;

        // Section title and description
        document.querySelector(".captain3 h1").textContent = sectionTitle;
        document.querySelector(".captain3 .upper-para").textContent = description;

        // Cards
        const container = document.querySelector(".captain3 .container");
        cards.forEach(card => {
            const cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.style.setProperty("--clr", "#c6d1ea");

            const contentDiv = document.createElement("div");
            contentDiv.classList.add("content");

            const img = document.createElement("img");
            img.src = card.imageUrl;
            img.alt = card.title;

            const title = document.createElement("h2");
            title.textContent = card.title;

            const description = document.createElement("p");
            description.innerHTML = card.description;

            contentDiv.appendChild(img);
            contentDiv.appendChild(title);
            contentDiv.appendChild(description);
            cardDiv.appendChild(contentDiv);
            container.appendChild(cardDiv);
        });
    }

    // Render "About" section
    renderAboutSection() {
        const { title, description, socialLinks } = this.data.about;

        // About section titles and description
        const rightSection = document.querySelector(".captain2 .right .text");
        title.forEach(titleText => {
            const titleElement = document.createElement("h1");
            titleElement.classList.add("section-title");
            titleElement.textContent = titleText;
            rightSection.appendChild(titleElement);
        });

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;
        rightSection.appendChild(descriptionElement);

        // Social links
        const iconsDiv = document.querySelector(".captain2 .right .icons");
        socialLinks.forEach(link => {
            const iconLink = document.createElement("a");
            iconLink.href = link.href;
            iconLink.innerHTML = `<i class="${link.icon}"></i>`;
            iconLink.style.color = "#455EEF";
            iconsDiv.appendChild(iconLink);
        });
    }

    // Render "Contact" section
    renderContactSection() {
        const { heading, description, address } = this.data.contact;

        // Contact heading and description
        const leftSection = document.querySelector(".captain4 .left");
        heading.forEach(headingText => {
            const headingElement = document.createElement("h1");
            headingElement.textContent = headingText;
            leftSection.appendChild(headingElement);
        });

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;
        leftSection.appendChild(descriptionElement);

        // Contact details
        const rightSection = document.querySelector(".captain4 .right .all-text");
        const addressDetails = [
            { icon: "fa-solid fa-location-dot", text: address.location },
            { icon: "fa-solid fa-envelope", text: address.email },
            { icon: "fa-solid fa-phone", text: address.phone }
        ];

        const countryHeading = document.createElement("h4");
        countryHeading.textContent = address.country;
        rightSection.appendChild(countryHeading);

        addressDetails.forEach(detail => {
            const detailDiv = document.createElement("div");
            detailDiv.classList.add("first");

            const icon = document.createElement("i");
            icon.className = detail.icon;

            const text = document.createElement("p");
            text.textContent = detail.text;

            detailDiv.appendChild(icon);
            detailDiv.appendChild(text);
            rightSection.appendChild(detailDiv);
        });
    }

    // Load all content sections
    loadContent() {
        this.renderHeader();
        this.renderMain();
        this.renderWhyChooseUs();
        this.renderAboutSection();
        this.renderContactSection();
    }
}

// Fetch JSON and render content
(async function initializePage() {
    const response = await fetch("content.json");
    const data = await response.json();
    const pageContent = new PageContent(data);
    pageContent.loadContent();
})();
