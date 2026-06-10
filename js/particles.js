/**
 * Cyber Particle Network Background & Binary Stream Simulator
 * Antigravity High-Fidelity Creative Canvas
 */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.binaryStreams = [];
    this.mouse = { x: null, y: null, radius: 120 };
    
    // Configs
    this.maxParticles = 80;
    this.connectionDistance = 110;
    this.colors = {
      primary: 'rgba(0, 255, 102, 0.45)', // Neon Green
      accent: 'rgba(0, 240, 255, 0.45)',  // Neon Cyan
      bgDot: 'rgba(0, 240, 255, 0.15)',
      lineGreen: 'rgba(0, 255, 102, 0.05)',
      lineCyan: 'rgba(0, 240, 255, 0.05)'
    };
    
    this.init();
    this.registerEvents();
    this.animate();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.createBinaryStreams();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Scale particle count with screen width
    if (window.innerWidth < 768) {
      this.maxParticles = 30;
      this.connectionDistance = 80;
    } else {
      this.maxParticles = 80;
      this.connectionDistance = 110;
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? this.colors.primary : this.colors.accent
      });
    }
  }

  createBinaryStreams() {
    this.binaryStreams = [];
    const streamCount = Math.floor(this.canvas.width / 80);
    for (let i = 0; i < streamCount; i++) {
      this.binaryStreams.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height,
        speed: Math.random() * 1.5 + 0.5,
        chars: this.generateStreamChars(),
        fontSize: Math.floor(Math.random() * 4) + 8, // 8px - 12px
        opacity: Math.random() * 0.15 + 0.03
      });
    }
  }

  generateStreamChars() {
    const chars = [];
    const pool = "01010110011100101101SECURESHINWARIHACKNETNMAPPORTADMIN";
    const length = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < length; i++) {
      chars.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return chars;
  }

  registerEvents() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.createParticles();
      this.createBinaryStreams();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  drawParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Boundary checks
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      // Mouse Interaction (Push/repel effect)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          
          p.x += Math.cos(angle) * force * 1.5;
          p.y += Math.sin(angle) * force * 1.5;
        }
      }
      
      // Draw Dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < this.connectionDistance) {
          const alpha = (this.connectionDistance - dist) / this.connectionDistance * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          
          // Use green or cyan gradient/solid stroke based on colors
          this.ctx.strokeStyle = p1.color.includes('255') 
            ? `rgba(0, 255, 102, ${alpha})` 
            : `rgba(0, 240, 255, ${alpha})`;
            
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  drawBinaryStreams() {
    for (let i = 0; i < this.binaryStreams.length; i++) {
      const stream = this.binaryStreams[i];
      
      // Update position
      stream.y += stream.speed;
      
      // Reset stream if off-screen
      if (stream.y > this.canvas.height) {
        stream.y = Math.random() * -150 - 50;
        stream.x = Math.random() * this.canvas.width;
        stream.chars = this.generateStreamChars();
      }
      
      // Draw stream characters vertically
      this.ctx.font = `${stream.fontSize}px var(--font-mono)`;
      for (let j = 0; j < stream.chars.length; j++) {
        const char = stream.chars[j];
        const charY = stream.y + j * (stream.fontSize + 2);
        
        // Skip off-screen characters
        if (charY < 0 || charY > this.canvas.height) continue;
        
        // Highlight the lead character
        if (j === stream.chars.length - 1) {
          this.ctx.fillStyle = `rgba(0, 240, 255, ${stream.opacity * 3.5})`;
        } else {
          this.ctx.fillStyle = `rgba(0, 255, 102, ${stream.opacity})`;
        }
        
        this.ctx.fillText(char, stream.x, charY);
      }
      
      // Occasional character morphing
      if (Math.random() < 0.02) {
        const idx = Math.floor(Math.random() * stream.chars.length);
        stream.chars[idx] = Math.random() > 0.5 ? "0" : "1";
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Render layers
    this.drawBinaryStreams();
    this.drawConnections();
    this.drawParticles();
    
    requestAnimationFrame(() => this.animate());
  }
}

// Instantiate particles when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  new ParticleNetwork('particles-canvas');
});
