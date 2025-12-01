# Victoria Used Parts Website

This project is a one-page marketing site for Victoria Used Parts, a Victorian LMCT auto recycler specialising in quality recycled car parts. The site highlights the part-request workflow, coverage areas, and contact options for trade and retail customers.

## Project Structure

```
wrecker-service-website
├── index.html        # Main HTML document for the website
├── cash-for-cars.html # Cash for cars landing page
├── styles            # Directory for CSS styles
│   └── styles.css    # Styles for the website
├── scripts           # Directory for JavaScript files
│   ├── script.js     # Form validation + EmailJS submission logic
│   ├── lga.js        # VIC service area accordion data
│   └── brands.js     # Vehicle make/model accordion data
└── README.md         # Documentation for the project
```

## Features

- Responsive design with anchored navigation and strong hero call-to-actions
- Updated hero and lead form to capture used part requests with enhanced validation messaging
- Dynamic accordions listing popular makes, models and Victorian LGAs served
- Dedicated cash for cars page with tailored messaging for vehicle sellers
- Structured data (JSON-LD) for LocalBusiness, FAQPage and map-rich results plus expanded meta tags for SEO
- EmailJS-powered enquiry form with client-side validation and honeypot field

## Setup Instructions

1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser to view the website.
3. Modify the `styles/styles.css` file to customize the appearance.
4. Update the `scripts/script.js` file to adjust form behaviour or integrate with other services.

## Contributing

Feel free to submit issues or pull requests if you have suggestions for improvements or new features.