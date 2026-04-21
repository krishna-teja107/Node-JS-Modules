# 🚀 Node.js Interactive Server

A beautiful, modern Node.js web server that demonstrates core Node.js modules with an aesthetic frontend interface. Built with vanilla JavaScript and featuring responsive design with smooth animations.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## ✨ Features

- **🏠 Modern Homepage**: Welcome page with interactive feature cards
- **💻 OS Information**: Display system platform, architecture, and memory details
- **📁 Path Module Demo**: Explore file paths, directories, and extensions
- **⚡ Event-Driven Programming**: Real-time event triggering and logging
- **🎨 Aesthetic Design**: Beautiful gradient UI with smooth animations
- **📱 Responsive Layout**: Mobile-friendly design that works on all devices
- **🔄 Live Updates**: Dynamic content loading with loading states

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- A modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/nodejs-interactive-server.git
   cd nodejs-interactive-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(Note: This project uses only built-in Node.js modules, so no external dependencies are required)*

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📖 Usage

### Navigation
- **Home (/)**: Overview of all features with interactive cards
- **OS Info (/os)**: View your system's operating system details
- **Path Info (/path)**: Learn about file system paths and structures
- **Event Demo (/event)**: Experience Node.js event-driven architecture

### Server Logs
The server logs all requests and events to the console, allowing you to see the event-driven nature of Node.js in action.

## 🏗️ Project Structure

```
nodejs-interactive-server/
├── server.js              # Main server file
├── public/                # Static web assets
│   ├── index.html        # Homepage
│   ├── os.html          # OS information page
│   ├── path.html        # Path module demo page
│   ├── event.html       # Event demonstration page
│   └── style.css        # Modern CSS styling
└── README.md            # Project documentation
```

## 🛠️ Technologies Used

- **Backend:**
  - Node.js
  - Built-in modules: `http`, `os`, `path`, `fs`, `events`

- **Frontend:**
  - HTML5
  - CSS3 (with modern features like CSS Grid, Flexbox, and animations)
  - Vanilla JavaScript
  - Google Fonts (Poppins)

## 🎨 Design Features

- **Modern UI**: Gradient backgrounds and glassmorphism effects
- **Smooth Animations**: CSS transitions and keyframe animations
- **Interactive Elements**: Hover effects and micro-interactions
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📝 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Homepage with feature overview |
| `/os` | GET | Operating system information |
| `/path` | GET | File path demonstrations |
| `/event` | GET | Event triggering demo |
| `/style.css` | GET | CSS stylesheet |

## 🔧 Development

### Running in Development Mode
```bash
node server.js
```

### Modifying the Server
- Edit `server.js` to add new routes or modify existing functionality
- Update HTML files in the `public/` directory for frontend changes
- Modify `style.css` for design updates

### Adding New Features
1. Create new HTML file in `public/` directory
2. Add corresponding route in `server.js`
3. Update navigation in all HTML files
4. Style the new page in `style.css`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Node.js documentation for module references
- Google Fonts for the beautiful typography
- The open-source community for inspiration

## 📞 Contact

If you have any questions or suggestions, feel free to open an issue or reach out!

---

**Made with ❤️ using Node.js**