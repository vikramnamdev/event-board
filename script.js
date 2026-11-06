// A2: const is used by default. let is used only for values that change.
const pageTitle = "IIITV Campus Event Board"; // string
const defaultSeatLimit = 30; // number
const isEventBoardOnline = true; // boolean

// B1: Select elements using querySelector, querySelectorAll and getElementById.
const eventGrid = document.querySelector(".event-grid");
const searchInput = document.querySelector("#event-search");
const eventForm = document.getElementById("event-form");
const eventsStatus = document.querySelector("#events-status");
const formStatus = document.querySelector("#form-status");
const menuButton = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

// A3: This array is filled with event objects received from events.json.
// let is appropriate because the array is assigned after fetch completes.
let events = [];

// A4 + A6: Return one readable status label for an event.
function getSeatStatus(ev) {
    if (ev.seats === 0) {
        return "Full";
    } else if (ev.seats < 5) {
        return "Few left";
    } else {
        return "Open";
    }
}

// A6: A function with a parameter and a return value.
function formatEvent(ev) {
    return `${ev.title} | ${formatDate(ev.date)} | ${getSeatStatus(ev)}`;
}

// Helper function: format an ISO date for display.
function formatDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// A8: count is local to this function and cannot be accessed outside it.
function getEventCountLabel(list) {
    const count = list.length;
    return `${count} event${count === 1 ? "" : "s"} found`;
}

// A5: Use a for...of loop to process every event object.
function logEventSummary() {
    for (const ev of events) {
        console.log(formatEvent(ev));
    }
}

// B2 + B3: Create event cards from the data instead of hard-coding them in HTML.
function renderEvents(list) {
    eventGrid.textContent = "";

    if (list.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No events match your search.";
        emptyMessage.classList.add("empty-message");
        eventGrid.appendChild(emptyMessage);
        return;
    }

    for (const ev of list) {
        const card = document.createElement("article");
        card.classList.add("event-card");
        card.setAttribute("data-event-id", String(ev.id));

        const heading = document.createElement("h3");
        heading.textContent = ev.title;

        const date = document.createElement("p");
        date.textContent = `Date: ${formatDate(ev.date)}`;

        const description = document.createElement("p");
        description.textContent = ev.description;

        const location = document.createElement("p");
        location.textContent = `Location: ${ev.location}`;

        const mode = document.createElement("span");
        mode.classList.add("event-mode");
        mode.textContent = ev.online ? "Online event" : "On campus";
        mode.classList.toggle("is-online", ev.online);

        const seats = document.createElement("p");
        seats.classList.add("seat-status");
        seats.textContent = `Seats: ${ev.seats} | Status: ${getSeatStatus(ev)}`;

        const rsvpButton = document.createElement("button");
        rsvpButton.type = "button";
        rsvpButton.textContent = ev.seats === 0 ? "Full" : "RSVP";
        rsvpButton.setAttribute("data-action", "rsvp");
        rsvpButton.disabled = ev.seats === 0;

        if (ev.seats === 0) {
            card.classList.add("full");
        }

        card.appendChild(heading);
        card.appendChild(date);
        card.appendChild(description);
        card.appendChild(location);
        card.appendChild(mode);
        card.appendChild(seats);
        card.appendChild(rsvpButton);
        eventGrid.appendChild(card);
    }

    // B1: querySelectorAll selects all generated event cards.
    const cards = document.querySelectorAll(".event-card");
    console.log(`Rendered ${cards.length} event cards.`);
}

// A7 + B6: Arrow function with filter() searches as the user types.
const filterEvents = (searchText) => {
    const searchTerm = searchText.trim().toLowerCase();
    const filteredEvents = events.filter((ev) =>
        `${ev.title} ${ev.date} ${ev.location} ${ev.description}`
            .toLowerCase()
            .includes(searchTerm)
    );

    renderEvents(filteredEvents);
    eventsStatus.textContent = getEventCountLabel(filteredEvents);
};

// B4: Hamburger button toggles the navigation list.
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
    const isOpen = navLinks.classList.contains("nav-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
});

// B5: Event delegation uses event.target to identify the clicked RSVP button.
// The click bubbles from the button to the event-grid container.
eventGrid.addEventListener("click", (event) => {
    const clickedButton = event.target.closest('[data-action="rsvp"]');

    if (!clickedButton || !eventGrid.contains(clickedButton)) {
        return;
    }

    const card = clickedButton.closest(".event-card");
    const eventId = Number(card.getAttribute("data-event-id"));
    const selectedEvent = events.find((ev) => ev.id === eventId);

    if (selectedEvent && selectedEvent.seats > 0) {
        selectedEvent.seats -= 1;
        console.log(`RSVP received for ${selectedEvent.title}. Seats left: ${selectedEvent.seats}`);
        filterEvents(searchInput.value);
    }
});

// B6: Filter on every input change. Escape clears the search field.
searchInput.addEventListener("input", () => {
    filterEvents(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        searchInput.value = "";
        filterEvents("");
        searchInput.blur();
    }
});

// B7: Fetch events.json and handle loading, success and error states.
async function loadEvents() {
    eventsStatus.textContent = "Loading events...";
    eventsStatus.style.fontWeight = "600"; // B3: style property changes presentation.

    try {
        const response = await fetch("./events.json");

        if (!response.ok) {
            throw new Error(`Could not load events (HTTP ${response.status}).`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("The event data format is not valid.");
        }

        events = data;
        renderEvents(events);
        eventsStatus.textContent = getEventCountLabel(events);
        console.log("Events loaded successfully:", events);
        console.log("Page:", pageTitle, "| Default seat limit:", defaultSeatLimit,
            "| Board online:", isEventBoardOnline);
        logEventSummary();
    } catch (error) {
        console.error("Fetch error:", error);
        eventsStatus.textContent =
            "Sorry, events could not be loaded. Please run this project with Live Server or a local web server and try again.";
        eventsStatus.classList.add("error-message");
    }
}

// B8: Built-in validation plus one custom setCustomValidity rule.
const eventNameInput = document.getElementById("event-name");

eventNameInput.addEventListener("input", () => {
    const cleanedName = eventNameInput.value.trim();

    if (cleanedName.length < 2) {
        eventNameInput.setCustomValidity("Please enter an event name with at least 2 characters.");
    } else {
        eventNameInput.setCustomValidity("");
    }
});

eventForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // checkValidity() checks required, type=email, minlength and custom validity.
    if (!eventForm.checkValidity()) {
        eventForm.reportValidity();
        formStatus.textContent = "Please correct the highlighted fields.";
        formStatus.classList.add("error-message");
        return;
    }

    const formData = new FormData(eventForm);
    const newEvent = {
        id: Date.now(),
        title: String(formData.get("event-name")).trim(),
        date: String(formData.get("event-date")),
        seats: defaultSeatLimit,
        online: false,
        description: String(formData.get("event-description")).trim(),
        location: String(formData.get("event-location")).trim()
    };

    events.push(newEvent);
    filterEvents(searchInput.value);
    formStatus.textContent = `Thank you! "${newEvent.title}" has been added to the event list for this session.`;
    formStatus.classList.remove("error-message");
    eventForm.reset();
    eventNameInput.setCustomValidity("");
    console.log("New event added:", newEvent);
});

// B9: Helpful initial DevTools message and start the data request.
console.log("Campus Event Board JavaScript is running.");
loadEvents();
