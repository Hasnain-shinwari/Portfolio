# Cyber Security Portfolio Website

A modern, futuristic, fully responsive cybersecurity-focused portfolio website for **Hasnain Shinwari**. This single-page application is designed to showcase expertise in cybersecurity, Linux administration, virtualization, enterprise networking, and penetration testing.

## Features

- **Futuristic Cyber-Tech Design**: Premium dark mode theme with glowing green (`#00ff66`) and cyan (`#00f0ff`) accents.
- **Glassmorphism Components**: Transparent UI cards with background blur effects and dynamic cursor-following spotlight gradients.
- **Interactive Unix-like Terminal**: An embedded CLI console widget supporting commands like `help`, `whoami`, `skills`, `experience`, `projects`, `certs`, `contact`, `clear`, `matrix` (full-screen digital rain overlay), and `hack` (simulated security audit scanner).
- **Background Animations**: Canvas-based interactive particle network combined with scrolling binary streams that react to cursor movement.
- **Dynamic Content Architecture**: Fully data-driven sections that load information from JSON endpoints dynamically, ensuring zero code changes are required to update bio details or projects.
- **Clickable SVG System**: Lightweight SVG layouts for all contact links and actions for high performance.
- **Responsive Layout**: Designed for optimal readability across desktop screens, tablets, and smartphones.

---

## Folder Structure

```
portfolio/
├── README.md                # Documentation and setup instructions
├── index.html               # Core HTML entry page
├── css/
│   └── style.css            # Stylesheet with layout and neon animations
├── js/
│   ├── main.js              # Business logic, terminal engine, and JSON loads
│   ├── animations.js        # Scroll triggers and cursor offset glows
│   └── particles.js         # Canvas background node simulation
├── data/
│   ├── about.json           # Editable profile bio & statistics
│   ├── contact.json         # Editable phone, email, and social handles
│   └── projects.json        # Editable catalog of projects
├── assets/
│   ├── profile/
│   │   └── profile.jpg      # Profile avatar (circular glowing frame)
│   ├── resume/
│   │   └── resume.pdf       # Printable resume for PDF downloads
│   └── images/              # Repository of image assets
└── favicon/
```

---

## How to Update Personal Information

This website is designed for **maximum maintainability**. You do **not** need to modify HTML, CSS, or JavaScript code to update your data.

### 1. Update Profile Photo
- Replace the image file located at `assets/profile/profile.jpg` with your new photo.
- Keep the filename exactly as `profile.jpg`.

### 2. Update Resume
- Place your updated resume PDF at `assets/resume/resume.pdf` with the filename `resume.pdf`.
- The "Download Resume" button will automatically fetch and serve this new PDF.

### 3. Update About Section
Edit the file [data/about.json](data/about.json):
```json
{
  "name": "Hasnain Shinwari",
  "title": "Cybersecurity Analyst | Linux Administrator | Penetration Tester",
  "intro": "Graduate introduction text...",
  "bio": "Detailed story paragraph...",
  "stats": [
    { "value": "3+", "label": "Years Experience" },
    { "value": "250+", "label": "CTF Flags Captured" }
  ]
}
```

### 4. Update Contact Information
Edit the file [data/contact.json](data/contact.json):
```json
{
  "email": "hasnain.shinwari.sec@gmail.com",
  "phone": "+92 300 1234567",
  "linkedin": "https://linkedin.com/in/hasnain-shinwari",
  "github": "https://github.com/hasnain-shinwari",
  "portfolio": "https://hasnainshinwari.com"
}
```

### 5. Update Projects List
Edit the file [data/projects.json](data/projects.json). You can add, remove, or modify items within the array:
```json
[
  {
    "id": 1,
    "title": "Secure Enterprise Network",
    "category": "Networking",
    "description": "Project summary goes here...",
    "technologies": ["Nmap", "Cisco ASA", "VLANs"],
    "links": {
      "github": "https://github.com/your-username/repo-name",
      "demo": "https://optional-live-demo-link.com"
    }
  }
]
```

---

## Local Development Instructions

Because this website loads content dynamically from JSON files via standard HTTP `fetch` requests, browsers will prevent local fetches due to Cross-Origin Resource Sharing (CORS) security guidelines when opening `index.html` directly from a local disk file system (`file://`).

To preview the website locally, run a lightweight HTTP development server.

### Option A: Using Python (Recommended)
If Python is installed on your system, execute the following command in the root folder:
```bash
python3 -m http.server 8000
```
Then open your web browser and navigate to:
[http://localhost:8000](http://localhost:8000)

### Option B: Using Node.js (npx)
If Node.js is installed, run:
```bash
npx serve .
```
Then visit the terminal-provided address (typically `http://localhost:3000` or `http://localhost:5000`).

---

## Deployment Instructions (GitHub Pages)

Deploying to GitHub Pages is free and takes less than a minute.

1. **Create a GitHub Repository**: Create a new public repository on GitHub (e.g., named `portfolio`).
2. **Commit and Push Files**:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit of cyber portfolio website"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/portfolio.git
   git push -u origin main
   ```
3. **Configure GitHub Pages**:
   - Go to your repository on GitHub.
   - Click on **Settings** in the top navigation menu.
   - Under the left sidebar, click on **Pages** (under the "Code and automation" section).
   - In the "Build and deployment" section under "Source", choose **Deploy from a branch**.
   - Under "Branch", select **main** and set the folder to **/ (root)**.
   - Click **Save**.
4. **Access Your Live Site**: After a minute, your website will be live at:
   `https://<your-github-username>.github.io/portfolio/`
