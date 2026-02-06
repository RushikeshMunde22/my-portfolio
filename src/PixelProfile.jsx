import React, { useRef, useEffect, useState } from 'react';

const PixelProfile = () => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [forceRender, setForceRender] = useState(0);

  // --- CONFIGURATION --- (ULTRA-FAST 0.5-SECOND REFORMATION)
  const config = {
    // Updated to use your photo from certificates folder
    imageSrc: '/certificates/my-photo.png',
    gap: 3,               // Smaller gap for more particles and better quality
    depth: 35,            // Increased 3D depth for better effect
    focalLength: 400,     // Optimized camera distance
  };

  // Force re-render when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setForceRender(prev => prev + 1);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('PixelProfile: Canvas ref is null!');
      return;
    }
    
    console.log('PixelProfile: Initializing canvas... (render:', forceRender, ')');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let particles = [];
    let animationFrameId;
    let isAnimating = true;

    // Mouse State
    let mouse = { 
      x: 0, y: 0, prevX: 0, prevY: 0, vx: 0, vy: 0,
      smoothedVx: 0, smoothedVy: 0,
      isMoving: false
    };
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let time = 0; // For idle animation
    let explosionIntensity = 0; // For screen shake

    // Set canvas dimensions - extra large size for maximum visibility
    const size = Math.min(1000, window.innerWidth * 0.95, window.innerHeight * 0.95); 
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;

    class Particle3D {
      constructor(x, y, r, g, b, brightness) {
        this.x = x - centerX;
        this.y = y - centerY;
        this.z = (brightness / 255) * -config.depth; 
        this.originX = this.x;
        this.originY = this.y;
        this.originZ = this.z;
        this.r = r;
        this.g = g;
        this.b = b;
        this.size = config.gap;
        
        // Animation properties for explosion effect - ULTRA-FAST 0.5s REFORMATION
        this.targetX = this.x;
        this.targetY = this.y;
        this.targetZ = this.z;
        this.velocityX = 0;
        this.velocityY = 0;
        this.velocityZ = 0;
        this.isExploded = false;
        this.explosionForce = 0;
        this.reformTimer = 0;
        this.reformSpeed = 1.2; // ULTRA-FAST reformation speed for 0.5-second return
        this.maxReformTimer = 30; // Maximum frames for ultra-smooth performance (0.5s at 60fps)
      }

      explode(mouseX, mouseY, force) {
        // Calculate distance from mouse - ultra-fast optimized
        const dx = (this.originX + centerX) - mouseX;
        const dy = (this.originY + centerY) - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100; // Slightly larger explosion radius for better effect
        
        if (distance < maxDistance) {
          const explosionStrength = (1 - distance / maxDistance) * force;
          const angle = Math.atan2(dy, dx);
          
          // ULTRA-FAST explosion velocity for instant reformation
          this.velocityX += Math.cos(angle) * explosionStrength * 6;
          this.velocityY += Math.sin(angle) * explosionStrength * 6;
          this.velocityZ += (Math.random() - 0.5) * explosionStrength * 4;
          
          this.isExploded = true;
          this.explosionForce = explosionStrength;
          this.reformTimer = 2 + Math.random() * 3; // ULTRA-FAST delay (0.03-0.08 seconds)
        }
      }

      update() {
        if (this.isExploded) {
          // Apply physics during explosion - ULTRA-FAST for 0.5s reformation
          this.x += this.velocityX;
          this.y += this.velocityY;
          this.z += this.velocityZ;
          
          // ULTRA-FAST friction for instant settling
          this.velocityX *= 0.88;
          this.velocityY *= 0.88;
          this.velocityZ *= 0.88;
          this.velocityY += 0.12; // Stronger gravity for faster effect
          
          // Countdown to reform
          this.reformTimer--;
          
          // Start reforming after ultra-fast delay
          if (this.reformTimer <= 0) {
            // ULTRA-FAST return to original position with aggressive easing
            const returnForce = this.reformSpeed;
            const dx = this.originX - this.x;
            const dy = this.originY - this.y;
            const dz = this.originZ - this.z;
            
            // ULTRA-FAST easing function with aggressive interpolation
            const easingFactor = 1 - Math.exp(-returnForce * 4); // More aggressive exponential easing
            this.velocityX += dx * easingFactor;
            this.velocityY += dy * easingFactor;
            this.velocityZ += dz * easingFactor;
            
            // ULTRA-FAST snap-back threshold for instant completion
            const distanceToOrigin = Math.sqrt(dx * dx + dy * dy + dz * dz);
            
            if (distanceToOrigin < 15 && Math.abs(this.velocityX) < 3 && Math.abs(this.velocityY) < 3) {
              // INSTANT snap back to original position
              this.x = this.originX;
              this.y = this.originY;
              this.z = this.originZ;
              this.velocityX = 0;
              this.velocityY = 0;
              this.velocityZ = 0;
              this.isExploded = false;
              this.explosionForce = 0;
            }
          }
          
          // Force reformation if taking too long (safety net for ultra-fast performance)
          if (this.reformTimer < -this.maxReformTimer) {
            this.x = this.originX;
            this.y = this.originY;
            this.z = this.originZ;
            this.velocityX = 0;
            this.velocityY = 0;
            this.velocityZ = 0;
            this.isExploded = false;
            this.explosionForce = 0;
          }
        }
      }
      project(rgbOffset = 0) {
        // Use current position (which may be exploded position)
        const currentX = this.x;
        const currentY = this.y;
        const currentZ = this.z;
        
        // Dynamic Offset (The Glitch Stretch) - reduced during explosion
        const glitchMultiplier = this.isExploded ? 0.3 : 0.15;
        const offsetX = mouse.smoothedVx * rgbOffset * glitchMultiplier;
        const offsetY = mouse.smoothedVy * rgbOffset * glitchMultiplier;

        // Apply Position
        const xPos = currentX + offsetX;
        const yPos = currentY + offsetY;

        // 1. Rotate Y (Horizontal)
        const cosY = Math.cos(currentRotationY);
        const sinY = Math.sin(currentRotationY);
        let x1 = xPos * cosY - currentZ * sinY;
        let z1 = currentZ * cosY + xPos * sinY;

        // 2. Rotate X (Vertical)
        const cosX = Math.cos(currentRotationX);
        const sinX = Math.sin(currentRotationX);
        let y2 = yPos * cosX - z1 * sinX;
        let z2 = z1 * cosX + yPos * sinX;

        // 3. Project to 2D
        const scale = config.focalLength / (config.focalLength + z2 + 200); 
        return {
          x: x1 * scale + centerX,
          y: y2 * scale + centerY,
          scale: scale,
          zIndex: z2
        };
      }

      draw() {
        // ULTRA-FAST opacity transitions for maximum performance
        let opacity = 1;
        if (this.isExploded) {
          // Fast opacity fade during explosion and reformation
          const reformProgress = Math.max(0, -this.reformTimer / this.maxReformTimer);
          opacity = 0.6 + (this.explosionForce * 0.2) + (reformProgress * 0.2);
        }

        // ULTRA-FAST RGB split with maximum performance
        const speed = Math.abs(mouse.smoothedVx) + Math.abs(mouse.smoothedVy);
        const isGlitching = speed > 1.0 || this.isExploded;

        if (isGlitching) {
          ctx.globalCompositeOperation = 'screen'; 
          
          // Ultra-fast RGB split intensity for instant rendering
          const splitIntensity = this.isExploded ? 2.0 : 1.2;
          
          // ULTRA-FAST RGB channel rendering
          const pR = this.project(splitIntensity); 
          ctx.fillStyle = `rgba(${this.r}, 0, 0, ${opacity * 0.7})`;
          ctx.fillRect(pR.x, pR.y, this.size * pR.scale, this.size * pR.scale);

          const pB = this.project(-splitIntensity);
          ctx.fillStyle = `rgba(0, 0, ${this.b}, ${opacity * 0.7})`;
          ctx.fillRect(pB.x, pB.y, this.size * pB.scale, this.size * pB.scale);

          const pG = this.project(0);
          ctx.fillStyle = `rgba(0, ${this.g}, 0, ${opacity * 0.7})`;
          ctx.fillRect(pG.x, pG.y, this.size * pG.scale, this.size * pG.scale);

          ctx.globalCompositeOperation = 'source-over'; 
        } else {
          // ULTRA-FAST standard rendering
          const p = this.project(0);
          ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${opacity})`;
          ctx.fillRect(p.x, p.y, this.size * p.scale, this.size * p.scale);
        }
      }
    }

    // --- FALLBACK GENERATOR ---
    const generateFallbackTexture = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = centerX;
      const cy = centerY - 20;

      // Basic Avatar Shape
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(cx, cy + 220, 160, 80, 0, Math.PI, 0); 
      ctx.fill(); 
      
      ctx.fillStyle = '#555'; 
      ctx.beginPath();
      ctx.arc(cx, cy - 25, 60, 0, Math.PI * 2); 
      ctx.fill();

      ctx.fillStyle = '#111';
      ctx.fillRect(cx - 90, cy - 50, 30, 80);
      ctx.fillRect(cx + 60, cy - 50, 30, 80);

      ctx.strokeStyle = '#111';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(cx, cy - 30, 80, Math.PI, 0);
      ctx.stroke();
    };

    const initParticles = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = [];

      // Optimized particle creation with better sampling for performance
      for (let y = 0; y < canvas.height; y += config.gap) {
        for (let x = 0; x < canvas.width; x += config.gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 40) { // Higher threshold for better performance and cleaner edges
            const r = pixels[index];
            const g = pixels[index + 1];
            const b = pixels[index + 2];
            const brightness = (r + g + b) / 3;
            particles.push(new Particle3D(x, y, r, g, b, brightness));
          }
        }
      }
      
      console.log(`Initialized ${particles.length} particles with ULTRA-FAST 0.5-second reformation`);
      setIsLoaded(true);
      animate();
    };

    const loadImage = () => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = config.imageSrc;
      
      console.log('PixelProfile: Loading image from:', config.imageSrc);
      
      img.onload = () => {
        console.log('PixelProfile: Image loaded successfully!');
        const aspect = img.width / img.height;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;

        if (aspect > 1) {
          drawHeight = size / aspect;
          offsetY = (size - drawHeight) / 2;
        } else {
          drawWidth = size * aspect;
          offsetX = (size - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        initParticles();
      };

      img.onerror = (error) => {
        console.error('PixelProfile: Could not load image. Error:', error);
        console.warn(`PixelProfile: Using fallback texture instead.`);
        generateFallbackTexture();
        initParticles();
      };
    };

    const animate = () => {
      if (!isAnimating) return; // Stop animation if component unmounted
      
      // ULTRA-FAST screen shake with instant intensity
      const shakeX = (Math.random() - 0.5) * explosionIntensity * 1.0;
      const shakeY = (Math.random() - 0.5) * explosionIntensity * 1.0;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(shakeX, shakeY);
      
      time += 0.012;
      explosionIntensity *= 0.95; // Faster fade out of screen shake

      // 1. ULTRA-FAST mouse physics for instant response
      const rawVx = mouse.x - mouse.prevX;
      const rawVy = mouse.y - mouse.prevY;
      mouse.smoothedVx += (rawVx - mouse.smoothedVx) * 0.22; // Faster response
      mouse.smoothedVy += (rawVy - mouse.smoothedVy) * 0.22;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // 2. ULTRA-FAST explosion trigger for instant response
      const speed = Math.sqrt(rawVx * rawVx + rawVy * rawVy);
      if (speed > 0.8 && mouse.isMoving) { // Much lower threshold for easier triggering
        explosionIntensity = Math.min(speed / 10, 0.8); // Stronger screen shake intensity
        
        // ULTRA-FAST batch particle explosion
        const explosionForce = Math.min(speed / 10, 1.2);
        for (let i = 0; i < particles.length; i++) {
          particles[i].explode(mouse.x, mouse.y, explosionForce);
        }
      }

      // 3. OPTIMIZED particle updates
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      // 4. Smooth idle animation for natural feel
      let idleRotationY = 0;
      let idleRotationX = 0;
      if (!mouse.isMoving) {
        idleRotationY = Math.sin(time) * 0.03; // Smooth idle movement
        idleRotationX = Math.cos(time * 0.8) * 0.018;
      }

      // 5. ULTRA-FAST rotation blending for instant response
      currentRotationX += ((targetRotationX + idleRotationX) - currentRotationX) * 0.18;
      currentRotationY += ((targetRotationY + idleRotationY) - currentRotationY) * 0.18;

      // 6. OPTIMIZED rendering with smooth transitions
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }
      
      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
      mouse.isMoving = true;

      // User controls rotation
      targetRotationY = ((x - canvas.width / 2) / canvas.width) * 0.6;
      targetRotationX = ((y - canvas.height / 2) / canvas.height) * 0.6;

      // Reset idle timer/flag
      clearTimeout(mouse.idleTimer);
      mouse.idleTimer = setTimeout(() => {
        mouse.isMoving = false;
        targetRotationX = 0; // Return to center for idle
        targetRotationY = 0;
      }, 80); // Faster idle detection
    };

    const handleMouseLeave = () => {
      mouse.isMoving = false;
      targetRotationX = 0;
      targetRotationY = 0;
      // Stop smoothed velocity
      mouse.x = mouse.prevX;
      mouse.y = mouse.prevY;
    };

    loadImage();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      isAnimating = false; // Stop animation loop
      cancelAnimationFrame(animationFrameId);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [forceRender]); // Re-run when forceRender changes

  return (
    <div className="w-full h-full flex items-center justify-center relative bg-transparent">
      <canvas 
        ref={canvasRef}
        className="max-w-full h-auto cursor-crosshair rounded-lg"
        style={{
          filter: 'drop-shadow(0 0 25px rgba(0, 200, 255, 0.1))',
          maxWidth: '100%',
          height: 'auto',
          minHeight: '600px',
          minWidth: '600px'
        }}
      />
      {!isLoaded && (
        <div className="absolute text-slate-500 dark:text-slate-400 font-mono text-xs uppercase tracking-widest animate-pulse">
          Initializing...
        </div>
      )}
    </div>
  );
};

export default PixelProfile;