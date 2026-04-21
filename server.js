// Import core modules
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');

// Create custom event emitter
const eventEmitter = new EventEmitter();

// General request event
eventEmitter.on('request_received', (url) => {
    console.log(`Request received for: ${url}`);
});

// Specific event for /event route
eventEmitter.on('event_page_visited', (time) => {
    console.log(`Event page visited at ${time}`);
});

// Function to serve static files
function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
            return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}
// Function to serve HTML with navigation highlighting
function serveHTMLWithNav(filePath, currentPage, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page Not Found</h1>');
            return;
        }

        // Add active class to current page nav item
        const navReplacements = {
            'href="/">🏠 Home': currentPage === 'home' ? 'href="/" class="active">🏠 Home' : 'href="/">🏠 Home',
            'href="/os">💻 OS Info': currentPage === 'os' ? 'href="/os" class="active">💻 OS Info' : 'href="/os">💻 OS Info',
            'href="/path">📁 Path Info': currentPage === 'path' ? 'href="/path" class="active">📁 Path Info' : 'href="/path">📁 Path Info',
            'href="/event">⚡ Event Demo': currentPage === 'event' ? 'href="/event" class="active">⚡ Event Demo' : 'href="/event">⚡ Event Demo'
        };

        for (const [oldText, newText] of Object.entries(navReplacements)) {
            data = data.replace(oldText, newText);
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}
// Function to serve dynamic HTML with data injection
function serveDynamicHTML(filePath, replacements, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
            return;
        }
        // Replace placeholders
        for (const [placeholder, value] of Object.entries(replacements)) {
            data = data.replace(new RegExp(placeholder, 'g'), value);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

// Create server
const server = http.createServer((req, res) => {

    // Trigger general event
    eventEmitter.emit('request_received', req.url);

    const url = req.url;

    if (url === '/') {
        serveHTMLWithNav('./public/index.html', 'home', res);
    }

    else if (url === '/os') {
        let html = fs.readFileSync('./public/os.html', 'utf8');
        // Add active nav class
        html = html.replace('href="/os">💻 OS Info', 'href="/os" class="active">💻 OS Info');
        html = html.replace('PLATFORM_PLACEHOLDER', os.platform());
        html = html.replace('ARCH_PLACEHOLDER', os.arch());
        html = html.replace('FREEMEM_PLACEHOLDER', `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
        html = html.replace('TOTALMEM_PLACEHOLDER', `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    else if (url === '/path') {
        const filePath = __filename;
        let html = fs.readFileSync('./public/path.html', 'utf8');
        // Add active nav class
        html = html.replace('href="/path">📁 Path Info', 'href="/path" class="active">📁 Path Info');
        html = html.replace('BASENAME_PLACEHOLDER', path.basename(filePath));
        html = html.replace('DIRNAME_PLACEHOLDER', path.dirname(filePath));
        html = html.replace('EXTNAME_PLACEHOLDER', path.extname(filePath));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    else if (url === '/event') {

        // 🔥 Trigger specific event
        eventEmitter.emit('event_page_visited', new Date().toLocaleString());

        let html = fs.readFileSync('./public/event.html', 'utf8');
        // Add active nav class
        html = html.replace('href="/event">⚡ Event Demo', 'href="/event" class="active">⚡ Event Demo');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    else if (url === '/style.css') {
        serveFile('./public/style.css', 'text/css', res);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

// Start server
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});