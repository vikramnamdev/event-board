# IIITV Campus Event Board

## About the Project

The **IIITV Campus Event Board** is a responsive website designed to display upcoming campus events and activities at IIIT Vadodara.

The website allows students to:

- View upcoming campus events
    
- See event dates and important information
    
- Submit a new event through a form
    
- View event categories and meeting days
    
- Read frequently asked questions
    
- Access the IIIT Vadodara website
    
- Switch between light and dark themes
    
- Use the website on mobile, tablet, and desktop screens
    

## Features

- Responsive mobile-first layout
    
- Responsive navigation
    
- Event cards using CSS Grid
    
- Responsive images
    
- Fluid typography using `clamp()`
    
- CSS variables for the design system
    
- Light and dark theme support
    
- Accessible form labels and keyboard navigation
    
- Semantic HTML elements
    
- Event information table
    
- FAQ section using `<details>` and `<summary>`
    

## Technologies Used

- HTML5
    
- CSS3
    
- CSS Grid
    
- Flexbox
    
- Responsive Media Queries
    
- CSS Custom Properties
    
- Git and GitHub
    

## Project Files

```text
event-board/
│
├── index.html
├── style.css
├── base.css
├── theme-dark.css
├── banner.jpg
├── icon.png
├── NOTES.pdf
└── README.md
```

## How to Run

No server or additional software is required.

1. Download or clone this repository.
    
2. Keep all CSS and image files in the same project folder as `index.html`.
    
3. Open `index.html` in a web browser.
    

The website can also be hosted using GitHub Pages.

## Responsive Design

The website follows a mobile-first approach.

The base layout is designed for small screens. Larger layouts are added using media queries at approximately:

- `40rem` for the two-column layout
    
- `64rem` for the wider layout with an information sidebar
    

The event cards use CSS Grid with:

```css
grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
```

This allows the cards to automatically reflow according to the available screen width.

## Accessibility

The project includes several accessibility features, including:

- Skip-to-content link
    
- Semantic HTML elements
    
- Labels associated with form controls
    
- Keyboard focus styles
    
- Alternative text for images
    
- Keyboard navigation support
    
- Accessible table headings
    

## Repository

GitHub Repository:

`https://github.com/vikramnamdev/event-board`

GitHub Pages:

`https://vikramnamdev.github.io/event-board/`

## Authors

Developed as part of the web development laboratory coursework at **Indian Institute of Information Technology Vadodara (IIITV)**.

**Team Members:**

- Name: Vikram Namdev | Roll No.: 20261651096
	
- Name: Pradeep Kumar | Roll No.: 20261651062
    
- Name: Anmol Rajput  | Roll No.: 20261651016
    
- Name: Arun Singh | Roll No.: 20261651024
	
- Name: Yogesh Srivastava | Roll No.: 20261651100
