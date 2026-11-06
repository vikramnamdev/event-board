# IIITV Campus Event Board

A simple campus event management website developed as part of **CS445 – Basics of Web Programming, Lab Assignment 6**.

The website allows students to explore upcoming campus events, search for specific events, check seat availability and submit new events.

## Features

* **Dynamic Event Loading:** Event information is loaded from `events.json` using the Fetch API.
* **Event Cards:** JavaScript dynamically creates event cards using DOM manipulation.
* **Search Events:** Search events by title, date, location or description.
* **RSVP Functionality:** Students can reserve available seats. The event status changes to Full when no seats remain.
* **Navigation Menu:** Toggle the navigation menu using the Menu button.
* **Event Submission:** Users can submit new events through the form.
* **Form Validation:** HTML and JavaScript validation checks required fields, email format and event name.
* **Responsive Design:** The website uses CSS for layout and styling.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* JSON
* Fetch API
* DOM Manipulation
* Visual Studio Code
* Live Server

## Project Structure

```text
event-board/
│
├── Index.html
├── style.css
├── base.css
├── theme-dark.css
├── script.js
├── events.json
├── banner.jpg
├── icon.png
└── README.md
```

## How to Run the Project

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Open `Index.html`.
5. Right-click and select **Open with Live Server**.
6. The Campus Event Board will open in your browser.

**Note:** Run the project using a local web server because the Fetch API is used to load `events.json`.

## Event Data Format

Events are stored in `events.json`.

Each event contains the following properties:

| Property    | Description                           |
| ----------- | ------------------------------------- |
| id          | Unique event ID                       |
| title       | Event name                            |
| date        | Event date in ISO format              |
| seats       | Available seats                       |
| online      | Indicates whether the event is online |
| description | Event description                     |
| location    | Event location                        |

## JavaScript Concepts Implemented

* `const` and `let`
* Data types and conditional statements
* Functions and return values
* Arrow functions
* Array methods such as `filter()` and `find()`
* Loops
* DOM selection and manipulation
* Event listeners and event bubbling
* Event delegation
* Form validation
* Fetch API with async/await
* Error handling using try/catch

## Team Members

| S. No. | Name              | Roll Number |
| ------ | ----------------- | ----------- |
| 1      | Vikram Namdev     | 20261651096 |
| 2      | Pradeep Kumar     | 20261651062 |
| 3      | Anmol Rajput      | 20261651016 |
| 4      | Arun Singh        | 20261651024 |
| 5      | Yogesh Srivastava | 20261651100 |

## Project Links

* **GitHub Repository:** https://github.com/vikramnamdev/event-board
* **Live Website:** https://vikramnamdev.github.io/event-board/

## Academic Information

**Course:** CS445 – Basics of Web Programming
**Assignment:** Lab Assignment 6
**Project:** IIITV Campus Event Board
