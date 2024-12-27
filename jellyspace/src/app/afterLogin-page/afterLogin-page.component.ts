import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

interface Section {
  label: string;
  imagePath: string;
  angle: number;
  link: string;
  distanceOffset?: number;
  clickableArea?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  labelConfig?: {
    offsetX: number;
    offsetY: number;
    fontSize: number;
    maxWidth: number;
  };
  additionalImages?: Array<{
    path: string;
    offset: { x: number; y: number; }
    size?: number;
  }>;
  imageOffset?: { x: number; y: number; };
}

@Component({
  selector: 'app-afterLogin-page',
  templateUrl: './afterLogin-page.component.html'
})
export class AfterLoginPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private sectionImages: { [key: string]: HTMLImageElement } = {};
  private hoveredSection: string | null = null;
  private resizeObserver: ResizeObserver;
  private canvas: HTMLCanvasElement | null = null;
  private currentScales: { [key: string]: number } = {};
  private readonly HOVER_ANIMATION_SPEED = 0.15;
  private readonly BASE_IMG_SIZE = 35;
  private readonly NORMAL_HOVER_SCALE = 1.3;
  private readonly SPECIAL_HOVER_SCALE = 1.3;
  private centerX: number = 0;
  private centerY: number = 0;
  private CANVAS_WIDTH: number = 1000;
  private CANVAS_HEIGHT: number = 1000;
  private CIRCLE_RADIUS: number = 200;
  private readonly ROCKET_SPEED = 0.02;

  constructor(private router: Router) {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.canvas) {
        this.updateCanvasSize();
      }
    });
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('visoCanvas') as HTMLCanvasElement;
    if (this.canvas) {
      this.resizeObserver.observe(this.canvas);
      window.addEventListener('resize', this.handleResize.bind(this));
    }
    //.......this.initCanvas();...
  }

  ngOnDestroy(): void {
    if (this.canvas) {
      this.resizeObserver.unobserve(this.canvas);
      window.removeEventListener('resize', this.handleResize.bind(this));
    }
    this.resizeObserver.disconnect();
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('visoCanvas') as HTMLCanvasElement;
    if (!this.canvas) return;

    // Calculate canvas size with more generous padding
    const padding = 200; // Increased padding
    const viewportSize = Math.min(
      (window.innerWidth * 0.6), // Increased from 0.4 to 0.6
      (window.innerHeight * 0.9) // Increased from 0.8 to 0.9
    );
    
    this.CANVAS_WIDTH = viewportSize;
    this.CANVAS_HEIGHT = viewportSize;
    
    // Set canvas dimensions with DPR consideration
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.CANVAS_WIDTH * dpr;
    this.canvas.height = this.CANVAS_HEIGHT * dpr;
    
    // Updated positioning styles
    this.canvas.style.width = `${this.CANVAS_WIDTH}px`;
    this.canvas.style.height = `${this.CANVAS_HEIGHT}px`;
    this.canvas.style.position = 'absolute';
    this.canvas.style.left = '50%';
    this.canvas.style.top = '50%';
    this.canvas.style.transform = 'translate(-50%, -50%)';
    this.canvas.style.minWidth = '800px'; // Increased minimum size
    this.canvas.style.minHeight = '800px';

    // Set center coordinates
    this.centerX = this.CANVAS_WIDTH / 2;
    this.centerY = this.CANVAS_HEIGHT / 2;

    // Make circle radius proportional to canvas size but with a maximum
    this.CIRCLE_RADIUS = Math.min(
      Math.min(this.CANVAS_WIDTH, this.CANVAS_HEIGHT) * 0.35, // Increased from 0.2 to 0.35
      300
    );

    this.initCanvas();
  }

  private handleResize(): void {
    if (!this.canvas) return;
    
    // Recalculate canvas size on resize
    const viewportSize = Math.min(window.innerWidth * 0.4, window.innerHeight * 0.8);
    this.CANVAS_WIDTH = viewportSize;
    this.CANVAS_HEIGHT = viewportSize;
    
    this.canvas.width = this.CANVAS_WIDTH;
    this.canvas.height = this.CANVAS_HEIGHT;
    
    // Update center and radius
    this.centerX = this.CANVAS_WIDTH / 2;
    this.centerY = this.CANVAS_HEIGHT / 2;
    this.CIRCLE_RADIUS = Math.min(this.CANVAS_WIDTH, this.CANVAS_HEIGHT) * 0.2;
    
    // Redraw canvas
    this.initCanvas();
  }

  // Debounce helper function
  private debounce(func: Function, wait: number): () => void {
    let timeout: NodeJS.Timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), wait);
    };
  }

  initCanvas(): void {
    const canvas = document.getElementById('visoCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Add high-DPI support
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Update center position --- the center of the circle things--
    const centerX = rect.width / 2;
    const centerY = (rect.height / 2);
    const radius = 220;
    const innerRadius = 80;

    // Set canvas size accounting for device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set display size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    // Scale context to match device pixel ratio
    ctx.scale(dpr, dpr);

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const sections: Section[] = [
      {
        label: 'Digital Acquisitions',
        imagePath: 'assets/login-page/Digital Acquisitions.png',
        angle: -Math.PI/2,  // Top (0 degrees)
        link: 'dashboard',
        distanceOffset: +13
      },
      {
        label: 'IoT/Satellites',
        imagePath: 'assets/login-page/IoT-Satellites.png',
        imageOffset: { x: -30, y: -0 },  // Negative x value moves left
        additionalImages: [
          {
            path: 'assets/login-page/IoT-Satellites1.png',
            offset: { x: 2, y: 0 },
            size: 0.8
          },
          {
            path: 'assets/login-page/IoT-Satellites2.png',
            offset: { x: 35, y: 4 }
          }
        ],
        angle: -Math.PI/2 + (2*Math.PI/7) + 0.15,  // Added 0.15 to move down
        link: '',
        distanceOffset: +10,
        labelConfig: {
          offsetX: 0,
          offsetY: 10,  // Adjust label position if needed
          fontSize: 12,
          maxWidth: 100
        }
      },
      {
        label: 'PLC Management',
        imagePath: 'assets/login-page/Product Life Cycle Management.png',
        angle: -Math.PI/2 + (4*Math.PI/7),  // ~102.8 degrees
        link: '',
        distanceOffset: 0,  // Add distance offset to move away from arc
        labelConfig: {
          offsetX: 0,
          offsetY: 0,
          fontSize: 10,
          maxWidth: 0  // Ensure text wraps properly
        }
      },
      {
        label: 'Logistics',
        imagePath: 'assets/login-page/Logistics.png',
        angle: -Math.PI/2 + (6*Math.PI/7)+ 0.15 - 0.05,  // ~154.2 degrees
        link: ''
      },
      {
        label: 'Maintenance',
        imagePath: 'assets/login-page/Maintenance.png',
        angle: -Math.PI/2 + (8*Math.PI/7),  // ~205.7 degrees
        link: ''
      },
      {
        label: 'Manufacturing & Robotics',
        imagePath: 'assets/login-page/Manufacturing & Robotics.png',
        angle: -Math.PI/2 + (10*Math.PI/7),  // ~257.1 degrees
        link: ''
      },
      {
        label: 'SCM-AI',
        imagePath: 'assets/login-page/SCM-AI.png',
        angle: -Math.PI/2 + (12*Math.PI/7),  // ~308.5 degrees
        link: 'home',
        distanceOffset: +6
      }
    ];

    let angle = 100;
    let index = 0;

    // Load all section images
    sections.forEach(section => {
      // Load main image
      const img = new Image();
      img.src = section.imagePath;
      this.sectionImages[section.label] = img;

      // Load additional images if they exist
      if (section.additionalImages) {
        section.additionalImages.forEach((img) => {
          const additionalImg = new Image();
          additionalImg.src = img.path;
          this.sectionImages[img.path] = additionalImg;
        });
      }
    });

    const logoImg = new Image();
    logoImg.src = '../../assets/img/jelly1.png';

    const rocketImg = new Image();
    rocketImg.onload = () => {
      requestAnimationFrame(drawDiagram);
    };
    rocketImg.src = 'assets/login-page/logo.png';

    const planetImg = new Image();
    planetImg.src = 'assets/login-page/planet.png';

    const backgroundLayer1 = new Image();
    backgroundLayer1.src = 'assets/login-page/Picture1.png';

    const backgroundLayer2 = new Image();
    backgroundLayer2.src = 'assets/login-page/Picture2.png';

    let imagesLoaded = 0;
    const totalImages = 6; // Update this number based on total images used

    function handleImageLoad() {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        requestAnimationFrame(drawDiagram);
      }
    }

    // Add load event listeners to all images
    [logoImg, rocketImg, planetImg, backgroundLayer1, backgroundLayer2].forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.onload = handleImageLoad;
      }
    });

    const drawCircle = () => {
      // Capture class context
      const self = this;
      
      // Draw the base circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#fff';
      ctx.fill();
      
      // Create a circular clipping path
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.clip();

      // Draw background layer 1 without rotation
      if (backgroundLayer1.complete) {
        const scale = (radius * 1.5) / Math.min(backgroundLayer1.width, backgroundLayer1.height);
        const width = backgroundLayer1.width * scale;
        const height = backgroundLayer1.height * scale;
        
        ctx.drawImage(
          backgroundLayer1,
          centerX - width/2,
          centerY - height/2,
          width,
          height
        );
      }

      // Draw background layer 2 if loaded
      if (backgroundLayer2.complete) {
        const scale = (radius * 2) / Math.min(backgroundLayer2.width, backgroundLayer2.height);
        const width = backgroundLayer2.width * scale;
        const height = backgroundLayer2.height * scale;
        ctx.globalAlpha = 0;// Adjust transparency of layer 2
        ctx.drawImage(
          backgroundLayer2,
          centerX - width/2,
          centerY - height/2,
          width,
          height
        );
        ctx.globalAlpha = 1.0; // Reset transparency
      }

      ctx.restore();

      // Draw circle border
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }

    const drawInnerCircle = () => {
      // Draw background layer 1 first
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
      ctx.clip();

      // Draw background layer 1 if loaded
      if (backgroundLayer1.complete) {
        const scale = (innerRadius * 2) / Math.min(backgroundLayer1.width, backgroundLayer1.height);
        const width = backgroundLayer1.width * scale;
        const height = backgroundLayer1.height * scale;
        ctx.globalAlpha = .8; // Adjust transparency of layer 1
        ctx.drawImage(
          backgroundLayer1,
          centerX - width/2,
          centerY - height/2,
          width,
          height
        );
      }
      ctx.restore();

      // Draw the semi-transparent grey overlay on top  means in the inner circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(128, 128, 128, 0)'; // Very light grey overlay
      ctx.fill();

      // Draw inner circle border
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, false);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'grey';
      ctx.stroke();

      // Replace the single logoSize with separate width and height  -- center jelly logo---
      const logoWidth = innerRadius * 0.9;  // Adjust this multiplier for width
      const logoHeight = innerRadius * 0.8; // Adjust this multiplier for height
      
      // Add offset values to shift the logo
      const offsetX = 2;
      const offsetY = 1;
      const imgX = centerX - (logoWidth / 2) + offsetX;
      const imgY = centerY - (logoHeight / 2) + offsetY;
      ctx.drawImage(logoImg, imgX, imgY, logoWidth, logoHeight);

      // Draw rotating planet
      if (planetImg.complete) {
        const planetSize = 25;
        const planetRadius = innerRadius;
        const planetX = centerX + planetRadius * Math.cos(-angle);
        const planetY = centerY + planetRadius * Math.sin(-angle);
        
        ctx.save();
        ctx.translate(planetX, planetY);
        ctx.rotate(-angle);
        ctx.drawImage(planetImg, -planetSize/2, -planetSize/2, planetSize, planetSize);
        ctx.restore();
      }
    };

    const drawSection = (section: Section) => {
      const baseDistance = innerRadius + (radius - innerRadius) / 2;
      const distance = baseDistance + (section.distanceOffset || 0);
      
      // Initialize scale if not exists
      if (!this.currentScales[section.label]) {
        this.currentScales[section.label] = 1;
      }

      const isSpecialSection = section.label === 'Digital Acquisitions' || section.label === 'SCM-AI';
      
      // Only apply hover scale for special sections
      const targetScale = (isSpecialSection && this.hoveredSection === section.label)
        ? this.SPECIAL_HOVER_SCALE 
        : 1;
      
      this.currentScales[section.label] += (targetScale - this.currentScales[section.label]) * this.HOVER_ANIMATION_SPEED;

      const labelX = centerX + distance * Math.cos(section.angle);
      const labelY = centerY + distance * Math.sin(section.angle);

      // Calculate current size based on animated scale (for image only)
      const currentSize = this.BASE_IMG_SIZE * this.currentScales[section.label];
      
      // Update clickable area to include both image and text area
      const textHeight = 36; // Approximate height for two lines of text
      section.clickableArea = {
        x: labelX - currentSize/2,
        y: labelY - currentSize/2,
        width: currentSize,
        height: currentSize + textHeight
      };

      ctx.save();
      ctx.translate(labelX, labelY);

      if (section.label === 'IoT/Satellites' && section.additionalImages) {
        const baseSize = currentSize * 1.1;
        
        // Draw additional images first
        section.additionalImages.forEach((img) => {
          const bgImg = this.sectionImages[img.path];
          if (bgImg && bgImg.complete) {
            const imgSize = baseSize * (img.size || 1);  // Use size factor if provided
            ctx.drawImage(
              bgImg,
              -imgSize/2 + img.offset.x,
              -imgSize/2 + img.offset.y,
              imgSize,
              imgSize
            );
          }
        });
      }

      // Draw main image with offset
      const img = this.sectionImages[section.label];
      if (img && img.complete) {
        const xOffset = section.imageOffset?.x || 0;
        const yOffset = section.imageOffset?.y || 0;
        ctx.drawImage(
          img, 
          -currentSize/2 + xOffset, 
          -currentSize/2 + yOffset, 
          currentSize, 
          currentSize
        );
      }

      // Update text size and position based on current scale
      ctx.textAlign = 'center';
      if (isSpecialSection && this.hoveredSection === section.label) {
        ctx.fillStyle = '#000000';  // Black for hovered special sections
        ctx.font = `bold 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;
      } else {
        ctx.fillStyle = '#000000';  // Black
        ctx.font = `13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;
      }

      // Add white background shadow for better contrast
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 2;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Text wrapping with adjusted positioning
      const words = section.label.split(' ');
      let line = '';
      let y = currentSize/2 + 12;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 80 && n > 0) {
          ctx.fillText(line, 0, y);
          line = words[n] + ' ';
          const fontSize = 11; // Fixed font size regardless of hover
          y += fontSize + 2; // Fixed line spacing
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 0, y);

      ctx.restore();
    };

    const handleCanvasClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check for logo click
      const logoRadius = 50;
      const dx = x - centerX;
      const dy = y - centerY;
      if (dx * dx + dy * dy < logoRadius * logoRadius) {
        // Handle logo click if needed
        return;
      }

      // Check section clicks
      for (const section of sections) {
        const area = section.clickableArea;
        if (area && x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height) {
          this.router.navigate([section.link]);
        }
      }
    };

    const handleCanvasMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / (rect.width / canvas.width) / dpr;
      const y = (event.clientY - rect.top) / (rect.height / canvas.height) / dpr;

      // Check for logo hover
      const logoRadius = 50;
      const dx = x - centerX;
      const dy = y - centerY;
      
      let newHoveredSection: string | null = null;
      
      if (dx * dx + dy * dy < logoRadius * logoRadius) {
        newHoveredSection = 'logo';
      } else {
        // Check section hovers
        for (const section of sections) {
          const area = section.clickableArea;
          if (area && x >= area.x && x <= area.x + area.width && 
              y >= area.y && y <= area.y + area.height) {
            newHoveredSection = section.label;
            break;
          }
        }
      }

      if (this.hoveredSection !== newHoveredSection) {
        this.hoveredSection = newHoveredSection;
      }
    };

    // Use RAF timestamp for smooth animation
    let lastTime = 0;
    // Add timestamp to trail points for better control
    let trail: { x: number, y: number, time: number }[] = [];

    // Modify drawRocket to use time-based animation
    const drawRocket = (currentTime: number) => {
      // Calculate delta time for smooth movement
      const deltaTime = lastTime ? (currentTime - lastTime) / 16.67 : 1; // 16.67ms is roughly 60fps
      lastTime = currentTime;

      const rocketRadius = radius -5;     // Adjust the rocket radius to be closer to the circle
      const rocketX = centerX + rocketRadius * Math.cos(angle);
      const rocketY = centerY + rocketRadius * Math.sin(angle);

      // Separate trail radius
      const trailRadius = radius ;  // Adjust this value to position trail
      const trailX = centerX + trailRadius * Math.cos(angle);
      const trailY = centerY + trailRadius * Math.sin(angle);

      // Use trail position for trail
      trail.push({ x: trailX, y: trailY, time: currentTime });
      
      // Draw trail
      ctx.beginPath();
      ctx.strokeStyle = '#8ED973';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      
      const cutoffTime = currentTime -200;
      trail = trail.filter(point => point.time > cutoffTime);

      if (trail.length > 1) {
        ctx.beginPath();
        trail.forEach((point, i) => {
          if (i === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
      }

      // Draw rocket at original position
      ctx.save();
      ctx.translate(rocketX, rocketY);
      const tangentAngle = angle + Math.PI / 3.4;
      ctx.rotate(tangentAngle);
      
      const imgWidth = 60;
      const imgHeight = 60;
      ctx.drawImage(rocketImg, -imgWidth/2, -imgHeight/2, imgWidth, imgHeight);
      
      ctx.restore();

      angle += this.ROCKET_SPEED * deltaTime;
    }

    // Update drawDiagram to pass timestamp
    const drawDiagram = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCircle();
      drawInnerCircle();
      drawRocket(timestamp);
      drawAllSections();

      requestAnimationFrame(drawDiagram);
    };

    // Start animation with requestAnimationFrame
    requestAnimationFrame(drawDiagram);

    const drawAllSections = () => {
      for (let i = 0; i < index; i++) {
        drawSection(sections[i]);
      }
    };

    function drawSectionsSequentially() {
      if (index < sections.length) {
        index++;
        setTimeout(drawSectionsSequentially, 500);
      }
    }

    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);

    drawCircle();
    drawInnerCircle();
    drawSectionsSequentially();
    requestAnimationFrame(drawDiagram);
  }

  navigateToSCMAI() {
    this.router.navigate(['home']);
  }

  navigateToDigitalAcquisitions() {
    this.router.navigate(['dashboard']);
  }

  private updateCanvasSize(): void {
    if (!this.canvas) return;
    
    const container = this.canvas.parentElement;
    if (!container) return;
    
    // Get container dimensions
    const rect = container.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);
    
    // Set canvas size with DPR consideration
    const dpr = window.devicePixelRatio || 1;
    this.CANVAS_WIDTH = size;
    this.CANVAS_HEIGHT = size;
    
    // Update canvas dimensions
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    
    // Update center coordinates and circle radius
    this.centerX = size / 2;
    this.centerY = size / 2;
    this.CIRCLE_RADIUS = size * 0.35; // Adjust radius relative to canvas size
    
    // Redraw canvas
    this.initCanvas();
  }
}