# Simple Webpage Change Tracker
Track if a webpage's text content has changed since the first time you checked it.

## Description
You might be watching prices, waiting for tickets to drop, when a new schedule updates, or if a job application page will update.
Add websites to track and check if they've changed.

This is a simple solution that pulls all the text content from a webpage - ignores, scripts, css, and html tags - and checks if it's ever changed. A website that is an updating forum or news site will probably always "change" as would a website with a timer, however a website that is coming soon or expected to have an update like a concert tickets, job application board, or class/extracurricular/sports schedule would be fitting. It won't handle sites that require logins either.

# Setup

## Prerequisites
1. Node.js
2. Some CLI. The instructions provided are for terminal
3. Optional: A lightweight API client like Postman, cURL commands work as well

## All-in-One setup command in terminal
```
git clone https://github.com/kwuzy/webpage-change-tracker.git &&
cd webpage-change-tracker &&
npm run install-all &&
npm start
```
## Step by step
1. Clone the repo
```
git clone https://github.com/kwuzy/webpage-change-tracker.git
```
2. Change directory into the repo
```
cd webpage-change-tracker
```
3. Install all dependencies
```
npm run install-all
```
4. Run client and server
```
npm start
```

Server is running if you see `Server is running on port 8080.` in the terminal

# Server Commands
Endpoint: `http://localhost:8080`

Header: `Content-Type: application/x-www-form-urlencoded`

Body:
| Key  | Value |
| ------------- | ------------- |
| url  | some-site.com  |
## POST - add new sites
### `/add`

Example:
```
curl -X POST 'http://localhost:8080/add' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=example.com'
```

## GET - list your sites, check a site, or check all sites
### `/list`
### `/check?url=domainToTrack.tld`
### `/checkAll`

Examples:

List
```
curl -X GET 'http://localhost:8080/list' \
--header 'Content-Type: application/x-www-form-urlencoded'
```
Check
```
curl --location 'http://localhost:8080/check?url=example.com' \
--header 'Content-Type: application/json'
```
Check All
```
curl -X GET 'http://localhost:8080/checkAll' \
--header 'Content-Type: application/x-www-form-urlencoded'
```

## PUT - add or update an existing site
### `/update`

Example:
Update
```
curl -X PUT 'http://localhost:8080/update' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=example.com'
```

## DELETE - remove a site you're tracking
### `/delete`

Example:
Update
```
curl -X DELETE 'http://localhost:8080/delete' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=example.com'
```

# For the extra curious
This runs a node server locally and lets you use a series of endpoints to update a dictionary. The dictionary is stored as a txt file locally - I didn't want to spin up a database since that would require folks to do extra setup. At it's core I'm grabbing the text content only (no html tags, no scripts, no css) from the `body` and trimming extra spaces. I take that string and I hash it, this is stored into the map as the value for the url. Checking if the page has changed is as simple as checking if the hashes are equal.
