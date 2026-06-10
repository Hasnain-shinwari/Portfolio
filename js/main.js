/**
 * Cybersecurity Portfolio Core Controller & Shell Emulator
 * Dynamic JSON Loader & Terminal Widget Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. MOBILE NAVIGATION & STICKY HEADER ACTIVE LINKS
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const headerLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Mobile navigation drawer toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when link is clicked
    headerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active Link Highlighter on Scroll
  window.addEventListener('scroll', () => {
    let currentSection = '';
    const scrollPosition = window.scrollY + 120; // Offset for sticky header

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    headerLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });


  // ==========================================================================
  // 2. DYNAMIC CONTENT FETCHING & DOM RENDERING (JSON LAYERS)
  // ==========================================================================
  let aboutData = null;
  let contactData = null;
  let projectsData = null;

  async function loadPortfolioData() {
    try {
      // Fetch data files asynchronously
      const [aboutRes, contactRes, projectsRes] = await Promise.all([
        fetch('data/about.json'),
        fetch('data/contact.json'),
        fetch('data/projects.json')
      ]);

      aboutData = await aboutRes.json();
      contactData = await contactRes.json();
      projectsData = await projectsRes.json();

      renderAbout();
      renderContact();
      renderProjects();
      
      // Update Terminal time reference
      document.getElementById('login-time').innerText = new Date().toUTCString();

    } catch (error) {
      console.error("Critical: Error loading portfolio data files", error);
      displayLoadingError();
    }
  }

  function renderAbout() {
    if (!aboutData) return;
    
    // Render Bio Text
    const bioContainer = document.getElementById('about-bio-container');
    if (bioContainer) {
      bioContainer.innerHTML = `
        <p>${aboutData.bio}</p>
        <p>${aboutData.intro}</p>
      `;
    }

    // Render Stats
    const statsContainer = document.getElementById('about-stats-container');
    if (statsContainer && aboutData.stats) {
      statsContainer.innerHTML = aboutData.stats.map(stat => `
        <div class="stat-item">
          <div class="stat-num" data-val="${stat.value}">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('');
    }
  }

  function renderContact() {
    if (!contactData) return;

    const contactLinksContainer = document.getElementById('contact-links-container');
    if (contactLinksContainer) {
      const items = [
        {
          label: 'SECURE_EMAIL',
          val: contactData.email,
          href: `mailto:${contactData.email}`,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
        },
        {
          label: 'COMM_CELL',
          val: contactData.phone,
          href: `tel:${contactData.phone.replace(/\s+/g, '')}`,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`
        },
        {
          label: 'LINKEDIN_ENDPOINT',
          val: 'linkedin.com/in/hasnain-shinwari',
          href: contactData.linkedin,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`
        },
        {
          label: 'GITHUB_REPOS',
          val: 'github.com/hasnain-shinwari',
          href: contactData.github,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`
        },
        {
          label: 'PORTFOLIO_NODE',
          val: 'hasnainshinwari.com',
          href: contactData.portfolio,
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`
        }
      ];

      contactLinksContainer.innerHTML = items.map(item => `
        <div class="contact-method-item">
          <a href="${item.href}" target="_blank" rel="noopener noreferrer" class="contact-icon-wrapper" aria-label="${item.label}">
            ${item.icon}
          </a>
          <div class="contact-details">
            <span class="contact-label">${item.label}</span>
            <span class="contact-val"><a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.val}</a></span>
          </div>
        </div>
      `).join('');
    }
  }

  function renderProjects() {
    if (!projectsData) return;

    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      projectsContainer.innerHTML = projectsData.map(proj => {
        // Prepare tags and links
        const tagsHTML = proj.technologies.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        let linksHTML = '';
        if (proj.links.demo) {
          linksHTML += `
            <a href="${proj.links.demo}" target="_blank" rel="noopener" class="project-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Live Demo
            </a>
          `;
        }
        if (proj.links.github) {
          linksHTML += `
            <a href="${proj.links.github}" target="_blank" rel="noopener" class="project-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              Code
            </a>
          `;
        }

        return `
          <article class="cyber-card project-card reveal-up">
            <div class="card-header-cyber">
              <span class="card-status-dot"></span> PROJ_ID // 0${proj.id}
            </div>
            <div class="card-body-cyber">
              <div class="project-meta">
                <span class="project-cat">${proj.category}</span>
                <h3 class="project-title">${proj.title}</h3>
              </div>
              <p class="project-desc">${proj.description}</p>
              <div class="project-tags">
                ${tagsHTML}
              </div>
              <div class="project-links">
                ${linksHTML}
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Dynamically register hover card spotlights for newly generated cards
      const newCards = projectsContainer.querySelectorAll('.cyber-card');
      newCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
      });
    }
  }

  function displayLoadingError() {
    // Fallback bio render
    const bioContainer = document.getElementById('about-bio-container');
    if (bioContainer) {
      bioContainer.innerHTML = `<p class="terminal-error">SYSTEM_FAILURE: Unable to establish link with SQLite Database assets. Verify filesystem permissions.</p>`;
    }
  }


  // ==========================================================================
  // 3. INTERACTIVE UNIX COMMAND LINE TERMINAL WIDGET
  // ==========================================================================
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');
  const termBody = document.getElementById('terminal-body');
  let cmdHistory = [];
  let historyIndex = -1;

  if (termInput && termOutput) {
    // Prevent focus loss
    termBody.addEventListener('click', () => {
      termInput.focus();
    });

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim();
        termInput.value = '';
        if (cmd) {
          cmdHistory.push(cmd);
          historyIndex = cmdHistory.length;
          processCommand(cmd);
        }
      } else if (e.key === 'ArrowUp') {
        // Command History Navigation Up
        if (historyIndex > 0) {
          historyIndex--;
          termInput.value = cmdHistory[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        // Command History Navigation Down
        if (historyIndex < cmdHistory.length - 1) {
          historyIndex++;
          termInput.value = cmdHistory[historyIndex];
        } else {
          historyIndex = cmdHistory.length;
          termInput.value = '';
        }
        e.preventDefault();
      }
    });
  }

  function printLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    termOutput.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function processCommand(rawCmd) {
    const parts = rawCmd.split(' ');
    const cmd = parts[0].toLowerCase();
    
    // Print user command line entry
    printLine(`<span class="terminal-prompt">guest@hasnain-shinwari:~$</span> ${rawCmd}`);

    switch (cmd) {
      case 'help':
        printLine('Available commands:');
        printLine('  <span class="cmd-highlight">about</span>      - Display personal profile & bio details');
        printLine('  <span class="cmd-highlight">skills</span>     - List technical skills categorized by type');
        printLine('  <span class="cmd-highlight">experience</span> - Show professional experience timeline');
        printLine('  <span class="cmd-highlight">projects</span>   - Print portfolio repository information');
        printLine('  <span class="cmd-highlight">certs</span>      - View professional cybersecurity credentials');
        printLine('  <span class="cmd-highlight">contact</span>    - Print communication endpoints');
        printLine('  <span class="cmd-highlight">clear</span>      - Clear the shell prompt buffer');
        printLine('  <span class="cmd-highlight">matrix</span>     - Toggle binary matrix cyber stream overlay');
        printLine('  <span class="cmd-highlight">hack</span>       - Trigger simulated cybersecurity port diagnostics');
        break;

      case 'about':
        if (aboutData) {
          printLine(`<b>NAME:</b> ${aboutData.name}`, 'terminal-success');
          printLine(`<b>ROLE:</b> ${aboutData.title}`, 'terminal-success');
          printLine(`<b>SUMMARY:</b> ${aboutData.intro}`);
          printLine(`<b>BIO:</b> ${aboutData.bio}`);
        } else {
          printLine('ERR: Data layer is unavailable.', 'terminal-error');
        }
        break;

      case 'skills':
        printLine('TECHNICAL SKILLS MATRIX:', 'terminal-success');
        printLine('----------------------------------------');
        printLine('<b>Languages:</b>  Python, C++, Java, Bash');
        printLine('<b>Databases:</b>  SQL, MySQL');
        printLine('<b>Security:</b>   OWASP Top 10, NIST, MITRE ATT&CK, Pen Testing, Vulnerability Assessment');
        printLine('<b>Networks:</b>   VLANs, TCP/IP, DHCP, RIP v2, Diagnostics');
        printLine('<b>Systems:</b>    Linux, VMware, VirtualBox, SSH, SysAdmin');
        printLine('<b>Tools:</b>      AWS, Wireshark, Burp Suite, Cisco Packet Tracer, Nmap, Apache, Git, Metasploit, Hashcat');
        break;

      case 'experience':
        printLine('PROFESSIONAL EXPERIENCE RECORD:', 'terminal-success');
        printLine('----------------------------------------');
        printLine('<b>Position:</b>    Teaching Assistant');
        printLine('<b>Employer:</b>    Institute of Management Sciences, Peshawar');
        printLine('<b>Duration:</b>    3 Years');
        printLine('<b>Duties:</b>');
        printLine('  - Taught Information Security and Operating Systems labs');
        printLine('  - Guided practical Linux and network virtualization labs');
        printLine('  - Conducted configurations and student troubleshooting sessions');
        break;

      case 'projects':
        if (projectsData) {
          printLine('DYNAMIC PROJECT CATALOG:', 'terminal-success');
          printLine('----------------------------------------');
          projectsData.forEach(p => {
            printLine(`<b>[Proj 0${p.id}] ${p.title}</b> (${p.category})`);
            printLine(`  Desc: ${p.description}`);
            printLine(`  Tech: ${p.technologies.join(', ')}`);
            printLine(`  Link: ${p.links.github}`);
            printLine(' ');
          });
        } else {
          printLine('ERR: Projects data file is unreadable.', 'terminal-error');
        }
        break;

      case 'certs':
        printLine('VERIFIED CREDENTIALS:', 'terminal-success');
        printLine('----------------------------------------');
        printLine('  [+] Certified in Cybersecurity (CC) - ISC2');
        printLine('  [+] CCNAv7: Enterprise Networking, Security and Automation - Cisco');
        printLine('  [+] CCNAv7: Switching, Routing and Wireless Essentials - Cisco');
        printLine('  [+] CCNAv7: Introduction to Networks - Cisco');
        printLine('  [+] Agile with Atlassian Jira - Atlassian');
        printLine('  [+] Improve Your English Communication Skills - Georgia Tech');
        break;

      case 'contact':
        if (contactData) {
          printLine('COMMUNICATION ENCRYPTED CHANNELS:', 'terminal-success');
          printLine('----------------------------------------');
          printLine(`  Email:    ${contactData.email}`);
          printLine(`  Phone:    ${contactData.phone}`);
          printLine(`  LinkedIn: ${contactData.linkedin}`);
          printLine(`  GitHub:   ${contactData.github}`);
        } else {
          printLine('ERR: Contact coordinates unavailable.', 'terminal-error');
        }
        break;

      case 'clear':
        termOutput.innerHTML = '';
        break;

      case 'matrix':
        printLine('Initializing full screen Matrix canvas... Press <span class="cmd-highlight">ESC</span> or click to terminate stream.', 'terminal-success');
        setTimeout(() => {
          startMatrixRain();
        }, 800);
        break;

      case 'hack':
        runCyberSim();
        break;

      default:
        printLine(`bash: command not found: ${cmd}. Type <span class="cmd-highlight">help</span> for commands.`, 'terminal-error');
    }
    
    // Auto-scroll
    termBody.scrollTop = termBody.scrollHeight;
  }

  // Cyber Sim hack scanner
  function runCyberSim() {
    termInput.disabled = true;
    printLine('⚡ INITIALIZING PORTFOLIO CYBER SCAN DIAGNOSTICS...', 'terminal-success');
    
    const lines = [
      { t: '[+] Resolving network host nodes: localhost (127.0.0.1)', d: 600 },
      { t: '[+] Probing active TCP ports: 22, 80, 443, 3306, 8080', d: 1100 },
      { t: '    - Port 22 (SSH) ..... [OPEN] Protocol: OpenSSH 8.9 (Hardened)', d: 1700 },
      { t: '    - Port 80 (HTTP) .... [CLOSED] Redirecting to TLS channel', d: 2200 },
      { t: '    - Port 443 (HTTPS) .. [OPEN] TLSv1.3 cryptographic handshake - PASS', d: 2700 },
      { t: '    - Port 3306 (MySQL) . [CLOSED] Shielded by Local Loopback', d: 3300 },
      { t: '[+] Scanning framework modules against OWASP Top 10 vulnerabilities...', d: 3900 },
      { t: '    - SQLi injection vectors checked ... [SECURE]', d: 4500 },
      { t: '    - Reflected/Stored XSS scripts Checked ... [SECURE]', d: 5000 },
      { t: '    - Broken Cryptographic hash analysis ... [SECURE]', d: 5600 },
      { t: '[+] Auditing Linux kernel modules and process controls...', d: 6200 },
      { t: '    - Virtualization Layer: Ubuntu Kernel 5.15 LPAR - SECURE', d: 6800 },
      { t: '📊 SYSTEM DIAGNOSTIC COMPLETED: ENVIRONMENT FULLY HARDENED.', 'terminal-success', d: 7400 },
      { t: '🛡️ PORTFOLIO STATUS: SECURE (100% Integrity Approved)', 'terminal-success', d: 8000 }
    ];

    lines.forEach((line, index) => {
      setTimeout(() => {
        printLine(line.t, line.className || '');
        if (index === lines.length - 1) {
          termInput.disabled = false;
          termInput.focus();
        }
      }, line.d);
    });
  }


  // ==========================================================================
  // 4. FULL SCREEN MATRIX DIGITAL RAIN SIMULATOR
  // ==========================================================================
  const matrixCanvas = document.getElementById('matrix-canvas');
  let matrixCtx = null;
  let matrixInterval = null;

  function startMatrixRain() {
    if (!matrixCanvas) return;
    matrixCanvas.style.display = 'block';
    matrixCtx = matrixCanvas.getContext('2d');
    
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const columns = Math.floor(matrixCanvas.width / 18);
    const drops = Array(columns).fill(1);
    const alphabet = "01010110011100101101SECURESHINWARIHACKNETNMAPPORTADMIN";
    
    function draw() {
      // Semi-transparent black to create trailing fading effect
      matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      
      matrixCtx.font = '16px var(--font-mono)';
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        
        // Highlight lead character
        const x = i * 18;
        const y = drops[i] * 18;
        
        if (Math.random() > 0.98) {
          matrixCtx.fillStyle = '#00f0ff'; // Cyan accent glow occasionally
        } else {
          matrixCtx.fillStyle = '#00ff66'; // Standard Matrix green
        }
        
        matrixCtx.fillText(char, x, y);
        
        // Reset drops when they hit bottom or randomly
        if (y > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    matrixInterval = setInterval(draw, 33); // ~30 FPS

    // Event listener to close Matrix
    function exitHandler(e) {
      if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Escape')) {
        stopMatrixRain();
        window.removeEventListener('click', exitHandler);
        window.removeEventListener('keydown', exitHandler);
      }
    }

    // Delay listeners to prevent instant closing from mouse triggers
    setTimeout(() => {
      window.addEventListener('click', exitHandler);
      window.addEventListener('keydown', exitHandler);
    }, 200);
  }

  function stopMatrixRain() {
    if (matrixInterval) {
      clearInterval(matrixInterval);
      matrixInterval = null;
    }
    if (matrixCanvas) {
      matrixCanvas.style.display = 'none';
      if (matrixCtx) {
        matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      }
    }
  }


  // ==========================================================================
  // 5. CONTACT FORM SECURITY TRANSMISSION SIMULATOR
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origBtnHTML = submitBtn.innerHTML;
      
      // Validation check
      const senderName = document.getElementById('name').value;
      const senderEmail = document.getElementById('email').value;
      const senderSubject = document.getElementById('subject').value;
      const senderMsg = document.getElementById('message').value;

      if (!senderName || !senderEmail || !senderSubject || !senderMsg) {
        formFeedback.innerText = 'TRANSMISSION ERROR: Empty data blocks identified.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      // Cyber simulation loop for message encryption
      submitBtn.disabled = true;
      formFeedback.style.display = 'block';
      formFeedback.className = 'form-feedback success';
      formFeedback.innerText = '⚡ [IN_PROGRESS] ESTABLISHING SECURE CONNECTION ROUTE...';

      setTimeout(() => {
        formFeedback.innerText = '🔒 [IN_PROGRESS] ENCRYPTING TRANSMISSION PAYLOAD (AES-256)...';
      }, 1000);

      setTimeout(() => {
        formFeedback.innerText = '📡 [IN_PROGRESS] RUNNING SHA-256 INTEGRITY VALIDATION...';
      }, 2200);

      setTimeout(() => {
        formFeedback.innerText = '🌍 [IN_PROGRESS] ROUTING PACKETS THROUGH TARGET NODE PROXIES...';
      }, 3400);

      setTimeout(() => {
        formFeedback.innerText = '✅ [SUCCESS] MESSAGE SENT: ENVELOPE SECURELY TRANSMITTED.';
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnHTML;
        contactForm.reset();
      }, 4500);

    });
  }


  // ==========================================================================
  // 6. INIT RUNS
  // ==========================================================================
  loadPortfolioData();
});
