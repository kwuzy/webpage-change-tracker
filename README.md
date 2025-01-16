# Simple Webpage Change Tracker
Track if a webpage's text content has changed since the first time you checked it.

## Description
You might be watching prices, waiting for tickets to drop, when a new schedule updates, or if a job application page will update.
Add websites to track and check if they've changed.

This is a simple solution that pulls all the text content from a webpage - ignores, scripts, css, and html tags - and checks if it's ever changed. A website that is an updating forum or news site will probably always "change" as would a website with a timer, however a website that is coming soon or expected to have an update like a concert tickets, job application board, or class/extracurricular/sports schedule would be fitting. It won't handle sites that require logins either.

# Setup

## Prerequisites
1. Node
2. Some CLI - Command Prompt or Terminal work
3. Preferred - a lightweight API client like Postman, cURL commands work as well

## All-in-One setup command in terminal
```
git clone https://github.com/kwuzy/webpage-change-tracker.git &&
cd webpage-change-tracker &&
npm i &&
node app.js
```
## Step by step
1. Clone the repo
```
git clone https://github.com/kwuzy/webpage-change-tracker.git
```
2. Cd into the repo
```
cd webpage-change-tracker
```
3. Install node dependencies
```
npm i
```
4. Run server
```
node app.js
```

Server is running if you see `Server is running on port 3000.` in the terminal

# Commands
Endpoint: `http://localhost:3000`

Header: `Content-Type: application/x-www-form-urlencoded`

Body:
| Key  | Value |
| ------------- | ------------- |
| url  | some-site.com  |
## POST - add new sites
### `/add`

Example:
```
curl -X POST 'http://localhost:3000/add' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=example.com'
```

## GET - list your sites, check a site, or check all sites
### `/list`
### `/check`
### `/checkAll`

Examples:

List
```
curl -X GET 'http://localhost:3000/list' \
--header 'Content-Type: application/x-www-form-urlencoded'
```
Check
```
curl -X GET 'http://localhost:3000/check' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=example.com'
```
Check All
```
curl -X GET 'http://localhost:3000/checkAll' \
--header 'Content-Type: application/x-www-form-urlencoded'
```

## PUT - add or update an existing site
### `/update`

Example:
Update
```
curl -X PUT 'http://localhost:3000/update' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=example.com'
```

## DELETE - remove a site you're tracking
### `/delete`

Example:
Update
```
curl -X DELETE 'http://localhost:3000/delete' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=example.com'
```

# For the extra curious
This runs a node server locally and lets you use a series of endpoints to update a dictionary. The dictionary is stored as a txt file locally - I didn't want to spin up a database since that would require folks to do extra setup. At it's core I'm grabbing the text content only (no html tags, no scripts, no css) from the `body` and trimming extra spaces. I take that string and I hash it, this is stored into the map as the value for the url. Checking if the page has changed is as simple as checking if the hashes are equal.
