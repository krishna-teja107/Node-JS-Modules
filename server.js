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
        serveFile('./public/index.html', 'text/html', res);
    }

    else if (url === '/os') {
        const replacements = {
            'Loading\\.\\.\\.': `${os.platform()}`,
            'Loading\\.\\.\\.': `${os.arch()}`,
            'Loading\\.\\.\\.': `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
            'Loading\\.\\.\\.': `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`
        };
        // Since there are multiple, need to be careful. Better to use specific placeholders.
        let html = fs.readFileSync('./public/os.html', 'utf8');
        html = html.replace('Loading...', os.platform());
        html = html.replace('Loading...', os.arch());
        html = html.replace('Loading...', `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
        html = html.replace('Loading...', `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    else if (url === '/path') {
        const filePath = __filename;
        let html = fs.readFileSync('./public/path.html', 'utf8');
        html = html.replace('Loading...', path.basename(filePath));
        html = html.replace('Loading...', path.dirname(filePath));
        html = html.replace('Loading...', path.extname(filePath));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    }

    else if (url === '/event') {

        // 🔥 Trigger specific event
        eventEmitter.emit('event_page_visited', new Date().toLocaleString());

        serveFile('./public/event.html', 'text/html', res);
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