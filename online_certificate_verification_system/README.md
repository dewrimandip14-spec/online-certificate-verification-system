# Online Certificate Verification System

A beginner-friendly, front-end-only certificate verification project built with HTML, CSS, and vanilla JavaScript.

## Features

- Public certificate lookup by unique Certificate ID
- Valid, revoked, and not-found verification results
- Admin demo sign-in
- Add, edit, delete, and search certificate records
- Dashboard counts for total and valid records
- Responsive layout for desktop and mobile
- Starter certificate record for testing

## Project files

- `index.html` — public verification page
- `admin.html` — admin login and management dashboard
- `styles.css` — shared styling and responsive layout
- `app.js` — public verification logic
- `admin.js` — demo admin and certificate management logic

## Run the project

1. Extract the ZIP file.
2. Open the project folder.
3. Double-click `index.html` to open it in a modern browser.
4. To manage records, select **Admin** in the top navigation.
5. Sign in with the demo password: `admin123`.
6. Add a certificate with a unique ID, student name, course, issuer, issue date, and status.
7. Return to **Verify Certificate** and search for the ID you added.

You can also use Visual Studio Code with the Live Server extension:
- Open the extracted folder in VS Code.
- Right-click `index.html`.
- Choose **Open with Live Server**.

## Sample certificate

- Certificate ID: `CV-2026-0001`
- Student: Aarav Sharma
- Course: Web Development Fundamentals
- Issuer: Bright Future Learning Institute
- Issue date: 2026-01-15
- Status: Valid

## How data is stored

This version uses the browser's `localStorage`. The public page and admin page share records when opened in the same browser and origin. Clearing browser site data may remove the records. Different browsers or devices do not share the same data.

## Important security and deployment note

This is a learning/demo project, not a secure production verification service.

- The demo password is visible in client-side JavaScript and is not real authentication.
- Browser localStorage can be edited by the browser user. A result from this demo must not be treated as proof of authenticity.
- There is no central database, server-side validation, audit log, or protected admin API.
- Do not enter real students' personal information or use this demo to make official verification decisions.

For a real deployment, build a backend API and database (for example, Node.js/PHP with MySQL), store password hashes server-side, enforce role-based access, validate all inputs on the server, use HTTPS, maintain audit logs, and protect certificate issuance/revocation workflows. A QR code should point to the official server-side verification URL; the server must independently look up the record.

## Suggested future improvements

- Backend API and MySQL database
- Secure admin authentication and roles
- QR code generation and server-side QR verification
- Certificate PDF upload and download
- Audit log for issue, update, and revocation events
- Export records to CSV
