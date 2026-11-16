
// Campus Event Board: Assignment 6 + Assignment 7

const $ = (selector) => document.querySelector(selector);

const eventGrid = $(".event-grid");
const searchInput = $("#event-search");
const eventForm = $("#event-form");
const eventsStatus = $("#events-status");
const formStatus = $("#form-status");
const menuButton = $(".nav-toggle");
const navLinks = $(".nav-links");
const eventNameInput = $("#event-name");

const pageTitle = "IIITV Campus Event Board";
const defaultSeatLimit = 30;
let events = [];

function formatDate(value) {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function seatStatus(event) {
    return event.seats === 0
        ? "Full"
        : event.seats < 5
            ? "Few left"
            : "Open";
}

function renderEvents(list) {
    eventGrid.textContent = "";

    if (!list.length) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No events match your search.";
        eventGrid.appendChild(message);
        return;
    }

    list.forEach((ev) => {
        const card = document.createElement("article");
        card.className = "event-card";
        card.dataset.eventId = ev.id;

        const heading = document.createElement("h3");
        heading.textContent = ev.title;

        const date = document.createElement("p");
        date.textContent = `Date: ${formatDate(ev.date)}`;

        const description = document.createElement("p");
        description.textContent = ev.description;

        const location = document.createElement("p");
        location.textContent = `Location: ${ev.location}`;

        const mode = document.createElement("span");
        mode.className = "event-mode";
        mode.textContent = ev.online ? "Online event" : "On campus";
        mode.classList.toggle("is-online", ev.online);

        const seats = document.createElement("p");
        seats.className = "seat-status";
        seats.textContent = `Seats: ${ev.seats} | Status: ${seatStatus(ev)}`;

        const button = document.createElement("button");
        button.type = "button";
        button.dataset.action = "rsvp";
        button.textContent = ev.seats === 0 ? "Full" : "RSVP";
        button.disabled = ev.seats === 0;

        if (ev.seats === 0) card.classList.add("full");

        card.append(
            heading, date, description, location, mode, seats, button
        );

        eventGrid.appendChild(card);
    });

    console.log(
        `Rendered ${document.querySelectorAll(".event-card").length} event cards.`
    );
}

function filterEvents(value = "") {
    const term = value.trim().toLowerCase();

    const filtered = events.filter((ev) =>
        `${ev.title} ${ev.date} ${ev.location} ${ev.description}`
            .toLowerCase()
            .includes(term)
    );

    renderEvents(filtered);

    eventsStatus.textContent =
        `${filtered.length} event${filtered.length === 1 ? "" : "s"} found`;
}
// Assignment 7 B4-B5: Read XML and compare file sizes.
async function loadXmlDetails(jsonSize) {
    try {
        const response = await fetch("./events.xml");
        if (!response.ok) throw new Error("Could not load XML.");

        const xmlText = await response.text();
        const xml = new DOMParser().parseFromString(xmlText, "application/xml");

        if (xml.querySelector("parsererror")) {
            throw new Error("Invalid XML file.");
        }

        const firstTitle = xml.querySelector("title")?.textContent;
        const xmlSize = new Blob([xmlText]).size;

        console.log("First XML event title:", firstTitle);
        console.log("JSON size:", jsonSize, "bytes");
        console.log("XML size:", xmlSize, "bytes");

    } catch (error) {
        console.error("XML error:", error);
    }
}

// Assignment 7 B1-B3: Fetch and process JSON.
async function loadEvents() {
    eventsStatus.textContent = "Loading events...";

    try {
        const response = await fetch("./events.json");

        if (!response.ok) {
            throw new Error(`JSON request failed: ${response.status}`);
        }

        const jsonText = await response.text();
        events = JSON.parse(jsonText);

        if (!Array.isArray(events)) {
            throw new Error("Event data must be an array.");
        }

        renderEvents(events);
        filterEvents(searchInput.value);

        console.log("Events loaded:", events);
        console.log("Page:", pageTitle);

        // B2: First event title and last event seats.
        if (events.length) {
            console.log("First event title:", events[0].title);
            console.log(
                "Last event seats:",
                events[events.length - 1].seats
            );
        }

        // B3: Convert JavaScript data into a JSON string.
        console.log(
            "JSON.stringify() output:",
            JSON.stringify(events, null, 2)
        );

        await loadXmlDetails(new Blob([jsonText]).size);

    } catch (error) {
        console.error("Loading error:", error);

        eventsStatus.textContent =
            "Events could not be loaded. Please use Live Server.";

        eventsStatus.classList.add("error-message");
    }
}
// Mobile navigation.
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");

    menuButton.setAttribute(
        "aria-expanded",
        String(navLinks.classList.contains("nav-open"))
    );
});

// RSVP using event delegation.
eventGrid.addEventListener("click", (event) => {
    const button = event.target.closest('[data-action="rsvp"]');

    if (!button) return;

    const card = button.closest(".event-card");

    const selected = events.find(
        (ev) => ev.id === Number(card.dataset.eventId)
    );

    if (selected && selected.seats > 0) {
        selected.seats--;

        console.log(
            `RSVP received for ${selected.title}. Seats left: ${selected.seats}`
        );

        filterEvents(searchInput.value);
    }
});

// Search events.
searchInput.addEventListener("input", () => {
    filterEvents(searchInput.value);
});

// Escape key clears the search.
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        searchInput.value = "";
        filterEvents();
        searchInput.blur();
    }
});

// Validate event name.
eventNameInput.addEventListener("input", () => {
    eventNameInput.setCustomValidity(
        eventNameInput.value.trim().length < 2
            ? "Please enter an event name with at least 2 characters."
            : ""
    );
});

// Add a new event for the current session.
eventForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!eventForm.checkValidity()) {
        eventForm.reportValidity();
        formStatus.textContent =
            "Please correct the highlighted fields.";
        formStatus.classList.add("error-message");
        return;
    }

    const data = new FormData(eventForm);

    const newEvent = {
        id: Date.now(),
        title: String(data.get("event-name")).trim(),
        date: String(data.get("event-date")),
        seats: defaultSeatLimit,
        free: true,
        online: false,
        description: String(data.get("event-description")).trim(),
        location: String(data.get("event-location")).trim()
    };

    events.push(newEvent);
    filterEvents(searchInput.value);

    formStatus.textContent =
        `Thank you! "${newEvent.title}" has been added for this session.`;

    formStatus.classList.remove("error-message");

    eventForm.reset();
    eventNameInput.setCustomValidity("");

    console.log("New event added:", newEvent);
});

// Start the application.
console.log("Campus Event Board JavaScript is running.");
loadEvents();
